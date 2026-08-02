# Codebase Audit — Article Server

**Date:** 2026-08-02 · **Auditor:** Claude Code · **Commit:** `7e7ddf6`
**Status:** Baseline for all subsequent architecture decisions (brief §2.5). Every ADR and issue in this programme references this document.

---

## 1. What this repository actually is

The project brief describes "the existing static website". **That description is out of date.** The repository is a small but complete **full-stack blogging platform**:

| Layer | Location | Stack |
|---|---|---|
| REST API | `Article Server Backend/` | Node.js, Express 4, SQLite3, Joi, PBKDF2 auth, Mocha/Chai tests |
| Web client | `frontend-app/vue-project/` | Vue 3 (Options API), Vite 7, vue-router 4, Bootstrap 5 |
| Automation | `.github/` | CI workflow, README auto-update workflows, issue templates, CODEOWNERS |

The backend originated as university assignment starter code ("Blog Engine Starter Code, full-stack web development assignment 22/23" — `Article Server Backend/README.md`); the model/controller implementations and the entire Vue client are the owner's work. There is **no deployed environment**: the client calls `http://localhost:3333` (hard-coded in all three service files), so "the site remains live" in the migration plan means *locally runnable at every stage* plus a first real deployment as an early milestone.

## 2. Inventory

### 2.1 Backend — `Article Server Backend/` (14 source files + 10 test files)

| File | Purpose |
|---|---|
| `server.js` | Express bootstrap: morgan logging, body-parser, CORS (`origin: true`, allows `X-Authorization` header), mounts 3 route modules, 404 fallback, listens on hard-coded port **3333** |
| `database.js` | Opens/creates `db.sqlite`; creates `users`, `articles`, `comments` tables; **seeds admin account `admin@admin.com` / `Admin123!`** on first run |
| `app/routes/articles.routes.js` | `GET/POST /articles`, `GET/PATCH/DELETE /articles/:article_id` (writes require auth) |
| `app/routes/user.routes.js` | `GET/POST /users` (**both require auth**), `POST /login`, `POST /logout` |
| `app/routes/comments.routes.js` | `GET/POST /articles/:article_id/comments` (**both anonymous**), `DELETE /comments/:comment_id` (auth) |
| `app/controllers/*.controllers.js` | Joi validation (rejects unknown fields), status-code mapping, delegates to models |
| `app/models/articles.models.js` | Raw parameterised SQL; dates stored as epoch ms, returned as `toLocaleDateString()` |
| `app/models/user.models.js` | PBKDF2-SHA256 (100k iterations, per-user 64-byte salt); session token = `crypto.randomBytes(16)` hex stored **in the users table**, no expiry, one token per user |
| `app/models/comments.models.js` | Comment CRUD; `bad-words` profanity filter on insert |
| `app/lib/authentication.js` | `isAuthenticated` middleware — looks up `X-Authorization` token in users table |
| `db.sqlite` (126 KB) | **Committed database file** (now `.gitignore`d but still tracked) |
| `tests/` (10 files + 5 mock JSON) | Black-box HTTP contract tests via chai-http against a running server on :3333 — covers users, login/logout, article CRUD, comment CRUD, malformed payloads |

**Database schema:** `users(user_id, first_name, last_name, email UNIQUE, password, salt, session_token)` · `articles(article_id, title, author TEXT, article_text, date_published, date_edited, created_by FK)` · `comments(comment_id, comment_text, date_published, article_id FK)`. Note `author` is a free-text field, distinct from `created_by` (which is **hard-coded to `1`** on insert).

**Dependency note:** `mocha`, `chai`, `chai-http`, `nodemon`, `jshint` sit in `dependencies` instead of `devDependencies`; there is no `start` script (root README says `npm start`, actual is `npm run dev`); no dotenv, no `.env.example` despite README claims.

### 2.2 Frontend — `frontend-app/vue-project/` (16 source files)

**Pages** (`src/pages/`): `Home.vue` (article list), `Login.vue`, `Dashboard.vue` (admin hub composing all CRUD widgets).
**Components** (`src/components/`): `Article.vue` (detail + comments), `CreateArt.vue`, `UpdateArt.vue`, `deleteArt.vue`, `deleteComment.vue`, `usersCreate.vue`, `UsersGetAll.vue` — the five Dashboard widgets are Bootstrap collapse panels operating on raw IDs typed into text fields.
**Services** (`src/Services/`): `article.service.js`, `users.service.js`, `comments.service.js` — fetch wrappers with hard-coded `http://localhost:3333`, session token in `localStorage`, sent as `X-Authorization`.
**Shell:** `src/Views/App.vue` (navbar + `<router-view>`), `src/router/index.js` (4 routes; `/Dashboard` guarded by a localStorage-presence check + `alert()`), `src/main.js` (imports Bootstrap CSS/JS; `.use(bootstrap)` is a no-op — Bootstrap is not a Vue plugin), `index.html` (title still **"Vite App"**, no meta description, no manifest).
**Assets:** `public/favicon.ico` (default Vite icon), `screencast.mp4` (**21 MB binary in git history**). The README references `screenshots/article-list.png` and `screenshots/dashboard.png` — **that directory does not exist**, so README images are broken.
**Dependencies:** vue 3.2, vue-router 4.1, bootstrap 5.2.3 (npm) **plus** Bootstrap 5.1.3 loaded from CDN inside `Dashboard.vue`'s template; `cors` is a server-side package mistakenly installed in the client. Outer `frontend-app/package.json` is a stray manifest containing only `bootstrap`.

### 2.3 Automation & community files

`ci.yml` (PR-triggered build/test — **broken**, see D18), three README auto-update workflows (contributors, project index, tech badges — these explain the README's polish), `update-project-structure.yml`, issue templates (bug/feature YAML forms), PR template, CODEOWNERS, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, MIT `LICENSE`. 66 commits, single contributor.

## 3. What the site does today

A visitor can: browse the article list (Home), open an article and read its body + comments, and post an **anonymous comment** (profanity-filtered). A logged-in user (only the seeded admin, in practice — see D3) can: log in/out, and from the Dashboard create/update/delete articles by ID, delete comments by ID, create users, and list all users (names + emails). Search, tags, profiles, drafts, markdown rendering, pagination — all absent (despite README claims, see D20).

## 4. Design language today

Dark navy gradients (`#141e30→#243b55` navbar, `#0f2027→#2c5364` body), panel colour `#252b37`, **aqua/cyan accent** (brand link colour, a `20px` cyan box-shadow on the login card), white text, Bootstrap utility classes, rounded-pill outline-light buttons, floating-label form fields. Brand name in the navbar: **"Blogs"**. It is a coherent "dark blog" identity in embryo — worth formalising into tokens rather than discarding — but it is applied via inline styles and unscoped `<style>` blocks that leak globally (`body`, `.navbar` styles).

## 5. Defect register

Severity: ● critical · ◐ major · ○ minor. Each becomes (part of) a tracked issue.

| # | Sev | Location | Defect |
|---|---|---|---|
| D1 | ● | `articles.models.js:60` | `getSingleArticle` returns `article_text: row.article_id` — **every article page shows a number instead of the body**. The flagship read path is broken. |
| D2 | ● | `article.service.js:63-66,124-127` | After create/update article, client writes `resJson.user_id`/`session_token` (absent from those responses) into localStorage — **clobbers the session token with `"undefined"`, silently logging the user out**. |
| D3 | ● | `user.routes.js:7-8` | `POST /users` requires authentication — **no public registration exists**; only a logged-in user can create accounts. Combined with D4, the seeded admin is the only practical entry point. |
| D4 | ● | `database.js:32-53` | Hard-coded admin credentials `admin@admin.com` / `Admin123!` seeded at startup and printed in source. |
| D5 | ● | `articles.routes.js`, `articles.models.js:37` | No ownership/authorisation: any authenticated user can edit/delete **any** article; `created_by` is hard-coded to `1`. No roles despite README's RBAC claim. |
| D6 | ◐ | `user.models.js:93-101` | Session tokens never expire, are stored in plaintext in the `users` table, one per user (second login invalidates none/reuses), and live in `localStorage` (XSS-exfiltratable). |
| D7 | ● | `Login.vue:39` | `<p>{{ email + " " + password }}</p>` — **the typed password is rendered on screen** (debug leftover). |
| D8 | ◐ | `article.service.js`, `comments.service.js:53` | Status-code mismatches: update expects 201 (server sends 200), delete expects a JSON body on 200 (`sendStatus` sends none), deleteComment expects 201 — **successful operations report as failures** in the UI. |
| D9 | ◐ | `comments.controllers.js:9` | `res.sendStatus(err)` passes an arbitrary error object as an HTTP status code → Express throws on real errors. |
| D10 | ◐ | `server.js:8`, all services | Port 3333 and `http://localhost:3333` hard-coded; no environment configuration anywhere; CORS `origin: true`. **The app cannot be deployed without code edits.** |
| D11 | ○ | `Home.vue`, `UsersGetAll.vue`, `Article.vue` | Invalid HTML (`<div>` inside `<thead>`, `<th>` outside `<tr>`); `articles` initialised as `{}` then used with `.length`; `article` initialised as `[]` then treated as object. |
| D12 | ◐ | `Dashboard.vue:2-7` | Loads Bootstrap **5.1.3 from CDN inside the template** while 5.2.3 is bundled — double CSS payload, version skew, future CSP blocker. |
| D13 | ○ | `main.js:8` | `.use(bootstrap)` — not a Vue plugin; dead code. |
| D14 | ○ | `router/index.js:8-16` | Guard calls `next("/login")` then `alert()`; checks token *presence* only, never validity; path `/Dashboard` vs navbar link `/dashboard`. |
| D15 | ○ | `deleteArt.vue:29` | Article-ID input is `v-model`ed to a variable named `title`; validation checks the never-set `article_id`. |
| D16 | ◐ | `Article.vue` | Comment form has **no submit button** (Enter-only); validation references undefined `title`; nested `.then` pyramid. |
| D17 | ○ | models | Dates formatted server-side with `toLocaleDateString()` — output depends on the server's locale; clients cannot re-format or sort reliably. |
| D18 | ● | `.github/workflows/ci.yml:11` | CI runs `npm ci` at the repo **root, where no `package.json` exists — every PR check fails**. Tests also need a running server + fresh DB, which the workflow never starts. |
| D19 | ◐ | git history | `db.sqlite` (126 KB, contains admin hash+salt) tracked in git; `screencast.mp4` (21 MB) in history; `.gitignore` added later so the DB remains tracked. |
| D20 | ◐ | `README.md` | Claims features that do not exist: tags, markdown/WYSIWYG editor, JWT, RBAC roles, Axios, dotenv, `.env.example`, ESLint, screenshots. Misleads contributors and any future audit. |
| D21 | ○ | `Article Server Backend/package.json` | Test/dev tooling in `dependencies`; no `start` script; `body-parser` redundant (Express ≥4.16 built-ins). |
| D22 | ◐ | `comments.routes.js` | Anonymous, unauthenticated, un-rate-limited comment POST — spam/abuse vector; `bad-words` filter is English-only and trivially bypassed. |

## 6. Keep / Refactor / Replace

### Keep (build on)
- **The domain model** (`users`/`articles`/`comments`, REST resource shapes) — sound, simple, matches the product. All future schema work extends it.
- **The API contract test suite** (`tests/`, 10 files) — a genuine asset: black-box HTTP tests that don't care how the server is implemented. They become the **regression harness that proves each migration stage preserved behaviour**. Keep the contract (including `X-Authorization` semantics) until an explicit, versioned API change.
- **Vue 3 + Vite + vue-router** — modern, healthy ecosystem, and the owner's demonstrated stack. The cross-platform strategy (ADR-0001) is built around keeping it.
- **The service-layer pattern** in the frontend (components never fetch directly) — correct instinct; formalise into a typed API client.
- **MVC separation** in the backend (routes → controllers → models) — correct layering to grow into services/repositories.
- **Password hashing approach** (PBKDF2-SHA256, 100k iterations, per-user salt) — acceptable primitive; will migrate parameters/algorithm behind an interface.
- **Dark/cyan visual identity and "Blogs" brand seed** — formalise into design tokens rather than restyle from scratch.
- **Community & repo hygiene** (LICENSE, CoC, CONTRIBUTING, SECURITY, templates, README automation) — already better than most small projects; keep and extend.

### Refactor (preserve behaviour, change the internals)
- **Backend** → TypeScript, layered (routes → controllers → services → repositories), dependency injection, structured errors, config from environment. Contract tests must stay green throughout. *Reason: the logic is small enough to port safely, and the test suite makes it cheap; rewriting the API surface from scratch would discard the one strong asset.*
- **Frontend pages/components** → rebuild on the design system with script-setup + composables, replace ID-typing Dashboard widgets with in-context actions (edit/delete on the article you're viewing). *Reason: the flows are right, the implementations are course-work grade.*
- **Session auth** → keep token-based auth conceptually, move to httpOnly cookies + expiry + rotation server-side. *Reason: D6; localStorage tokens are incompatible with the security requirements (§7 of the brief).*
- **SQLite → Postgres** behind a repository interface (ADR-0002), keeping SQLite for local dev/tests if useful. *Reason: multi-device sync, concurrent writes, pgvector for RAG.*

### Replace / remove
- **Bootstrap (both copies)** → token-driven design system with a headless component base. *Reason: brief §4.2 bans hard-coded values and per-OS restyling; two Bootstrap versions is unmaintainable; Bootstrap's design ceiling conflicts with the "jaw-dropping" goal.*
- **Hard-coded URLs/ports, CDN link in `Dashboard.vue`, `alert()` guard, debug `console.log`s / password echo** → environment config, router guards with redirect state, toast system. *(D7, D10, D12, D14)*
- **Committed binaries** (`db.sqlite`, `screencast.mp4`) → purge from history; screencast moves to a GitHub Release or README-linked hosting. *(D19)*
- **`ci.yml`** → per-package CI matrix that installs, lints, boots the server, runs the contract tests. *(D18)*
- **Stray `frontend-app/package.json`** and the extra nesting level (`frontend-app/vue-project/`) → flattened workspace layout (staged, git-mv, in the migration plan).
- **README feature claims** → rewritten to describe reality + roadmap. *(D20)*

## 7. Security posture snapshot

Positives: parameterised SQL throughout (no injection found), Joi validation rejecting unknown fields, PBKDF2 with per-user salt, profanity filtering. Gaps mapped to OWASP Top 10 (2021): A01 broken access control (D3, D5), A02 crypto failures (D6 plaintext tokens), A05 misconfiguration (D4 default creds, CORS `*`, D10), A07 identification/auth failures (no expiry, no rate limiting, D7), A09 logging failures (no structured logs; `console.log` of PII/comment IDs). No HTTPS/TLS anywhere (local only). These findings seed the threat-model issue; nothing here is exploitable in production **because there is no production** — the risk activates at first deployment, so security hardening is sequenced before/with deployment in the migration path.

## 8. Test suite assessment

The 10 Mocha files execute alphabetically (`test.a…` → `test.k…`), sharing state via a fresh server + `rm db.sqlite` (manual). Good: thorough happy/sad-path coverage of every endpoint, including auth gating and malformed payloads. Bad: no automation to boot the server (CI can't run them, D18), order-dependent, no frontend tests at all, no lint config despite `jshint` being installed. Verdict: **keep as the contract harness; wrap in automation; add frontend/unit/E2E layers in the programme.**

## 9. Constraints this audit imposes on the architecture

1. Every migration stage must keep `npm run dev` (backend) + `npm run dev` (frontend) working and the contract tests green — no big-bang rewrite (brief §2.4).
2. The platform strategy must have Vue at its core (ADR-0001), or it forfeits the existing code and violates §2.3's "preserve and build on".
3. First deployment requires D4, D7, D10, D18 fixed as prerequisites — they are Milestone 0, before any feature work.
4. The AI/RAG layer indexes the `articles` table — the embeddings pipeline (ADR-0003) keys on `article_id` + `date_edited`, which already exist.
