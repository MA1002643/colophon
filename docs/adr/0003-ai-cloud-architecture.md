# ADR-0003 — AI Cloud Architecture

**Status:** Proposed (ratify in M1) · **Date:** 2026-08-02 · **Refs:** brief §5, ADR-0002, [audit §9](../audit/codebase-audit.md)

## Context

All LLM capability must live behind a cloud service layer: clients never hold provider keys or call providers directly (§5.1.1); the provider must be swappable (§5.1.2); routing, failover, streaming+cancellation, cloud-persisted conversations, RAG over site content, and hard cost/safety controls are required (§5.1–5.3). Every AI feature needs a non-AI fallback (§5.2.6).

## Decision

A single **AI gateway service** inside the API (`/v1/ai/*`), structured as:

```
client (web/PWA/shells)
  └─ SSE stream ─→ /v1/ai/* (auth required, per-user rate limit, spend ledger check)
                     ├─ prompt assembly (versioned prompt registry; retrieved content wrapped as UNTRUSTED DATA)
                     ├─ retrieval: pgvector top-k over article chunks (+ keyword fallback)
                     ├─ model router ─→ AI SDK / AI Gateway ─→ primary provider
                     │                                      └─ automatic failover → secondary provider
                     ├─ moderation (input + output) · schema validation for tool-calls (zod)
                     └─ persistence: conversations, messages, token/latency metrics (Postgres)
```

Key choices:

1. **Provider abstraction = Vercel AI SDK model interface + AI Gateway routing.** Application code depends on a `ModelRouter` port; concrete providers are config. Swapping Claude↔GPT↔open-weights is a config change (§5.1.2). Default policy (documented, configurable): fast/cheap tier (e.g. Haiku-class) for summaries, titles, classification; strong tier (Sonnet/Opus-class) for the assistant and complex tool-calls.
2. **RAG pipeline:** articles chunked (~500-token chunks, heading-aware, overlap 50), embedded on publish/edit (`date_edited` trigger, audit constraint 4), stored in pgvector alongside `article_id`; embeddings cached by content hash — unchanged text is never re-embedded (§5.3.1). Assistant answers must carry citations to source articles.
3. **Streaming & cancellation:** SSE to all platforms (works in webviews); client abort propagates via `AbortSignal` to the provider call.
4. **Conversation state** lives in Postgres keyed to `user_id` ⇒ same conversation on every device (§5.1.6).
5. **Structured outputs:** tool-calls validated against zod schemas before the UI acts on them; invalid → retry-then-fallback (§5.2.5).
6. **Cost & safety controls:** per-user + global rate limits; spend ledger with configurable ceiling that halts + notifies (§5.3.2); AI endpoints require authentication (§5.3.3); token+latency metrics per feature (§5.3.4); prompts version-controlled with an eval regression suite run in CI (§5.3.7); retrieved/user content is always data, never instructions — delimited, with instruction-hierarchy prompts and output filtering (§5.3.5); AI-generated content visibly labelled, with a data-transparency notice (§5.3.8).
7. **Non-AI fallbacks (§5.2.6):** semantic search → Postgres full-text search; summaries → first-N-words excerpt; assistant → search UI + FAQ; NL navigation → normal nav. A feature-flag kill switch degrades to fallbacks instantly if the model layer is down.

## Alternatives considered

| Option | Why rejected |
|---|---|
| Direct provider SDK calls per feature | Re-implements routing/failover/spend tracking N times; provider lock-in in app code (§5.1.2 violation). |
| Client-side AI calls with proxied keys | §5.1.1 violation; uncappable spend; key exfiltration risk. |
| LangChain-style framework layer | Heavy abstraction we'd fight; AI SDK gives streaming/tool-calls/provider swap with far less surface. |
| Separate microservice for AI | Premature; same deploy unit keeps latency and ops low. The `/v1/ai/*` boundary makes later extraction mechanical. |

## Consequences

- One choke point for keys, spend, moderation, logging — the OWASP LLM Top 10 mitigations are implemented once.
- Prompt changes become reviewable diffs with CI evals — prompt regressions block merge like code regressions.
- pgvector keeps RAG inside the existing data-protection boundary (UK-GDPR: one processor fewer).
- The kill switch + fallback matrix means AI outage ≠ product outage (§5.2.6), demoed as an M5 exit criterion.
