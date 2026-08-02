# Migration Path — Static-Feeling Full-Stack App → Cross-Platform AI System

**Date:** 2026-08-02 · **Basis:** [codebase-audit.md](./codebase-audit.md) · **Rule:** the app must run end-to-end (and, once deployed, stay live) after **every** stage. No big-bang rewrite (brief §2.4).

Each stage maps 1:1 to a GitHub milestone (M0–M8). A stage is "done" when its exit criteria hold **and** the API contract tests are green.

---

## Stage 0 — Stabilise what exists (M0)
Fix the defects that block everything else, without changing architecture.

- Fix D1 (article body), D2 (session clobber), D7 (password echo), D8/D9 (status-code mismatches), D15/D16 (broken widgets).
- Public registration route (D3); remove hard-coded admin seed → seed script gated to dev (D4).
- Environment config: `PORT`, `DATABASE_PATH`, `VITE_API_BASE_URL`; delete every `http://localhost:3333` literal (D10).
- Repair CI (D18): per-package jobs, boot server, run contract tests, lint. Purge `db.sqlite` + `screencast.mp4` from history (D19); fix package manifests (D21); truthful README (D20).

**Exit:** contract tests green *in CI*; a stranger can clone, `cp .env.example .env`, and run the app.
**Risk:** history rewrite (D19) invalidates clones → coordinate, do it once, early.

## Stage 1 — Decide before building (M1) — *blocking, per brief §5.4*
- ADR-0001 (platform/shared-codebase strategy) and ADR-0002 (hosting, DB, vector store, cost model, budget ceiling) ratified.
- Threat model + UK-GDPR data map written; security requirements become acceptance criteria on later issues.

**Exit:** every infrastructure issue can name its platform, database and budget. No backend build work starts before this (§5.4).

## Stage 2 — Design system, then reskin in place (M2)
- Token package (`packages/design-tokens`): colour, type scale, spacing, radii, elevation, motion, dark+light — sourced from the existing navy/cyan identity (audit §4).
- Component library (documented, Storybook, WCAG 2.2 AA behaviours) built **alongside** the running app.
- Pages migrate one at a time (Home → Article → Login → Dashboard-as-editor); Bootstrap is removed only when the last consumer dies. Visual regression + Lighthouse + bundle budgets wired into CI as pages land.

**Exit:** zero Bootstrap, zero inline hex values, both themes, AA checks passing, app fully usable throughout.

## Stage 3 — Backend hardening & first deployment (M3)
- TypeScript layered port of the Express app **module-by-module** (routes stay identical; contract tests pin behaviour), DI container, structured errors, structured logs.
- Repository layer → Postgres (ADR-0002) with migrations; SQLite path kept until cut-over; data ported by script.
- Auth overhaul: httpOnly cookie sessions w/ expiry+rotation, rate limiting, RBAC (reader/author/admin), ownership enforcement (fixes D5/D6 for real). API additions (pagination, tags, drafts, profiles, search) land as `/v1` with OpenAPI spec.
- **First production deployment** (per ADR-0002) with TLS, previews, monitoring — the moment "the site stays live" becomes literal.

**Exit:** production URL serving the Vue app + API from managed infra; contract tests run against previews.

## Stage 4 — Installable PWA, offline, sync (M4) — *distribution phase 1, per brief §3.6*
- Manifest + service worker + install UX → satisfies "installable" on desktop & mobile **without store review**.
- Offline article reading (cache-first content store), queued writes (drafts/comments) with sync-on-reconnect and last-write-wins + conflict surfacing for drafts.
- Server-side user state (reading history, preferences) so devices converge.

**Exit:** Lighthouse PWA installable; airplane-mode reading + queued-comment demo; state follows the account across two devices.

## Stage 5 — AI cloud platform (M5)
- AI gateway service (ADR-0003): provider-agnostic model layer, routing policy (cheap↔strong), failover, streaming with cancellation, server-held keys only.
- Embeddings pipeline → pgvector; chunking; re-index triggered by `date_edited`; embedding + completion caching.
- Features on top: grounded assistant with cloud-persisted conversations, semantic search, summaries, NL navigation, personalisation (opt-in), structured tool-calls driving the UI — each with a non-AI fallback path.

**Exit:** assistant answers from site content with citations on web/PWA; kill-switch demo shows graceful non-AI degradation.

## Stage 6 — AI safety, cost & observability (M6)
- Per-user + global rate limits; spend ceiling that halts + notifies; token/latency instrumentation per feature; prompt-injection defences; input/output moderation; prompts version-controlled with an eval regression set; AI-labelling in UI.

**Exit:** simulated budget breach halts generation and notifies; eval suite runs in CI on prompt changes.

## Stage 7 — Native shells (M7) — *distribution phase 2, decoupled from core delivery*
- Desktop: Tauri wrappers (Win/macOS/Linux), auto-update, signing/notarisation.
- Mobile: Capacitor (Android/iOS), platform secure storage (Keychain/Keystore) for credentials, store submissions.
- Parity test matrix (Playwright + device runs) enforcing §3.4 — same features, same UI, everywhere.

**Exit:** installable artifacts for 5 OS targets from one codebase; parity suite green. Store review risk is isolated here and cannot block M0–M6 value.

## Stage 8 — Compliance, performance, launch (M8)
- UK-GDPR: lawful-basis record, privacy policy, data export, full account deletion, log scrubbing.
- Performance: Lighthouse ≥95 all categories, CWV green, bundle budget failing the build.
- Release engineering: semver, changelogs, runbooks; external security review pass.

**Exit:** launch checklist signed off.

---

## Sequencing summary

```
M0 stabilise ─→ M1 decide ─→ M2 design system ─→ M3 backend+deploy ─→ M4 PWA ─→ M5 AI ─→ M6 AI safety ─→ M8 launch
                                                                                  └────────→ M7 native shells (parallel after M4)
```

M7 deliberately trails M4 (PWA-first distribution, §3.6) and can run in parallel with M5/M6 — app-store review never gates AI delivery or launch of the web/PWA product.
