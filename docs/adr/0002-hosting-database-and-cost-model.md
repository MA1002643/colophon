# ADR-0002 — Hosting Platform, Database, Vector Store & Cost Model

**Status:** Proposed (ratify in M1 — **blocking for all backend build work**, brief §5.4) · **Date:** 2026-08-02 · **Refs:** [audit §9](../audit/codebase-audit.md), ADR-0003

## Context

Nothing is deployed today (audit §1). The system needs: managed hosting for the web app + API, Postgres (Stage 3), a vector store (Stage 5), streaming-capable serverless or long-lived compute for the AI gateway, preview deployments, and predictable cost with an enforced ceiling (§5.3.2). The owner already works in a Vercel-tooled environment, which lowers operational learning cost.

## Decision

| Concern | Choice | Rationale |
|---|---|---|
| Hosting | **Vercel** (Hobby → Pro when limits hit) | Git-integrated previews, edge CDN, streaming function support for SSE token streams, zero-ops; owner familiarity. |
| API runtime | Vercel Functions (Node, Fluid Compute) fronting the Express/TS app | Keeps the Express port (audit §6) deployable without a second refactor; stateless per §5.1.4. |
| Database | **Neon Postgres** (Vercel Marketplace) | Serverless Postgres, branch-per-preview matches preview deploys, generous free tier, scales to zero. |
| Vector store | **pgvector on the same Neon instance** | One datastore to operate/secure/back up; RAG corpus is small (hundreds–thousands of articles ⇒ ≪1 GB of embeddings); dedicated vector DBs (Pinecone etc.) add cost + a second security surface for zero benefit at this scale. |
| Model access | **Vercel AI Gateway + AI SDK** (see ADR-0003) | Provider-agnostic routing/failover/spend tracking without building it. |
| Object storage | Vercel Blob (images/exports) | Same platform, signed URLs. |

**Escape hatch:** the API is a plain Node/Express app and the DB is vanilla Postgres+pgvector — both portable to Fly.io/Railway/AWS with no code changes if Vercel pricing or limits become hostile. This portability is a requirement on implementation issues (no Vercel-proprietary APIs in domain code).

## Cost model (estimates to validate in M1, monthly, USD)

| Tier | Assumption | Hosting | DB | LLM spend (gateway-metered) | Total |
|---|---|---|---|---|---|
| Low | <1k MAU, light AI use | $0 (Hobby) | $0 (Neon free) | $5–20 | **≈ $5–20** |
| Medium | ~10k MAU, AI features popular | $20 (Pro) | $19–25 | $50–150 (caching + routing keep this down) | **≈ $90–195** |
| High | ~100k MAU | $20 + usage ≈ $50–150 | $69+ | $300–800 (ceiling-capped) | **≈ $420–1,040** |

**Budget ceiling:** the system operates within **$50/month until medium traffic is real**, enforced technically: AI Gateway spend limit + in-app spend ledger that **halts generation and notifies** at the ceiling (§5.3.2) — never silent overspend. Ceiling value is config, revisited per tier.

## Alternatives considered

| Option | Why rejected |
|---|---|
| AWS (Lambda/RDS/Bedrock) | Most control, worst ops burden for a solo maintainer; previews/branch DBs are DIY; cost opacity is exactly what §5.4 exists to prevent. |
| Fly.io / Railway (containers) | Good Express fit, but no first-class preview deployments; retained as the documented escape hatch. |
| Supabase (DB+auth+storage) | Strong candidate; rejected to avoid coupling auth to a second vendor while the auth overhaul (Stage 3) is our own; pgvector parity exists on Neon. |
| Dedicated vector DB (Pinecone/Qdrant) | Unjustified at corpus size; adds cost, latency hop, and a second data-protection surface for UK-GDPR. |

## Consequences

- Preview environments (with branch databases) come for free ⇒ the migration-path rule "live at every stage" is testable per-PR.
- Serverless statelessness forces session state into Postgres/signed cookies — aligned with §5.1.4 and the Stage 3 auth design.
- Vercel Hobby has no log drains; observability starts with structured logs + dashboard, upgraded at Pro (tracked in the observability issue).
- All monthly-cost assumptions above are marked *estimate*; M1's ratification task re-prices against current published pricing before any spend.
