# ADR-0001 — Cross-Platform Shared-Codebase Strategy

**Status:** Proposed (ratify in M1) · **Date:** 2026-08-02 · **Refs:** brief §3, [audit §6/§9](../audit/codebase-audit.md)

## Context

The product must run in any modern browser, install on Windows/macOS/Linux desktop and Android/iOS mobile, with **full functional parity** (§3.4) and **identical styling/behaviour** (§4.1), from a **single source of truth** for business logic, data models and UI (§3.5). Distribution is phased: installable PWA first, store wrappers later (§3.6). The audit (constraint 2) requires the existing Vue 3 codebase to remain the core — discarding it violates the brief's "preserve and build on" mandate.

## Decision

**One Vue 3 + TypeScript web application is the entire product. Platform shells wrap it; they never reimplement it.**

- **Core:** monorepo packages — `packages/design-tokens`, `packages/ui` (component library), `packages/core` (domain types, API client, offline/sync logic, AI client), `apps/web` (the Vue app, evolved from `frontend-app/vue-project`).
- **Web + installable (phase 1):** the Vue app ships as a **PWA** (manifest, service worker, offline cache) — this alone satisfies §3.1–3.3 with zero store-review dependency.
- **Desktop (phase 2):** **Tauri 2** shells loading the same built app; Rust core gives small binaries (~10 MB vs Electron's ~150 MB), OS keychain access, auto-update.
- **Mobile (phase 2):** **Capacitor 7** shells embedding the same built app; plugins for secure storage (Keychain/Android Keystore), share sheet, push.
- **Parity enforcement:** one Playwright suite runs against web, Tauri and Capacitor builds; a feature merges only with parity green (§3.4). No platform-conditional UI branches except capability shims (e.g. secure storage adapter with a web-crypto fallback).

## Alternatives considered

| Option | Why rejected |
|---|---|
| Flutter or React Native + separate web app | Two UI codebases (or three); discards all existing Vue work; per-OS widget styling fights §4.4's "never restyled per OS". |
| Electron (desktop) | Mature, but 10–15× binary size and RAM of Tauri; Tauri's webview risk is acceptable because the UI is already browser-first and CI tests real webviews. |
| Quasar framework | Single-vendor lock-in for shells + UI kit; conflicts with our own design system being the single source of truth. |
| PWA only (no shells ever) | Fails §3.2/3.3's "downloadable and installable via stores" long-term expectation and iOS PWA limitations (push, storage eviction). Hence phased, not skipped. |

## Consequences

- One rendering engine everywhere ⇒ §4.1 pixel-consistency is structural, not aspirational; the cost is accepting webview performance ceilings (mitigated by §4.9 budgets).
- Business logic lives in `packages/core` as framework-agnostic TS ⇒ testable without a browser; shells stay under ~200 LoC each.
- Monorepo restructure is staged (audit constraint 1): packages are extracted from the existing tree with `git mv`, no rewrite.
- Native-API needs (filesystem, keychain, notifications) go through a **capability interface** defined in `packages/core`, implemented per shell — the only sanctioned platform divergence.
