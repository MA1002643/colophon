# Colophon — Backend

The REST API behind Colophon: an Express 4 service over SQLite that serves articles, comments and user accounts.

> Originally scaffolded from university starter code ("Blog Engine Starter Code", full-stack web development assignment 22/23). The models, controllers and authentication layer are this project's own work. See [`docs/audit/codebase-audit.md`](../docs/audit/codebase-audit.md) for the full baseline assessment.

## Requirements

- **Node.js 20+** ([download](https://nodejs.org/en/download/))
- **npm** (bundled with Node)

## Setup

From the repository root:

```sh
cd backend
npm install
```

`sqlite3` compiles a native binding during install, so the first run takes a little longer than a pure-JS dependency tree.

## Running

```sh
npm run dev     # nodemon server.js — restarts on file change
```

The server listens on **port 3333** and logs `Server running on port: 3333`. Confirm it is up:

```sh
curl http://localhost:3333/
# {"status":"Alive"}
```

> There is no `start` script yet, and the port is hard-coded in [`server.js`](server.js) rather than read from the environment — tracked in issues [#4](https://github.com/MA1002643/colophon/issues/4) and [#6](https://github.com/MA1002643/colophon/issues/6).

### First run and the database

`database.js` creates `db.sqlite` in this directory if it does not exist, builds the `users`, `articles` and `comments` tables, and seeds a single administrator:

| Email | Password |
|---|---|
| `admin@admin.com` | `Admin123!` |

> This seeded account is a development convenience and a known security problem — there is no public registration path, so it is currently the only way in. Removing it is issue [#5](https://github.com/MA1002643/colophon/issues/5). Never deploy this seed.

To reset to a clean database, delete `db.sqlite` and restart the server.

## Testing

```sh
npm test        # mocha ./tests/test.*.js
```

Run the server first — the suite exercises the API over HTTP via `chai-http`.

The tests share one database and **must run in order**. The `test.<letter>.` filename prefix is what produces that order under Mocha's alphabetical glob: `test.a.database.refresh.js` truncates the tables (keeping the admin account), and every later file builds on the state its predecessors left behind. Running a single file in isolation will generally fail.

## Authentication

Protected routes expect a session token in an **`X-Authorization`** header (not the standard `Authorization`). `POST /login` returns the token; CORS is configured in [`server.js`](server.js) to allow the header. Passwords are hashed with PBKDF2-SHA256, 100,000 iterations, per-user salt ([`app/lib/authentication.js`](app/lib/authentication.js)).

## Endpoints

| Method | Path | Auth |
|---|---|:--:|
| `GET` | `/` | — |
| `GET` | `/articles` | — |
| `POST` | `/articles` | ✅ |
| `GET` | `/articles/:article_id` | — |
| `PATCH` | `/articles/:article_id` | ✅ |
| `DELETE` | `/articles/:article_id` | ✅ |
| `GET` | `/articles/:article_id/comments` | — |
| `POST` | `/articles/:article_id/comments` | — |
| `DELETE` | `/comments/:comment_id` | ✅ |
| `GET` | `/users` | ✅ |
| `POST` | `/users` | ✅ |
| `POST` | `/login` | — |
| `POST` | `/logout` | ✅ |

Anything unmatched returns a bare `404`.

## Layout

```
backend/
├── app/
│   ├── controllers/    request handling, validation, response shaping
│   ├── lib/            authentication (PBKDF2 hashing, token checks)
│   ├── models/         SQL against SQLite
│   └── routes/         endpoint → controller wiring
├── tests/              Mocha + Chai contract tests (ordered; see above)
├── database.js         connection, schema creation, admin seed
├── server.js           Express bootstrap, middleware, port
└── package.json
```

Route modules export `function (app) { … }` rather than an `express.Router()`, so `server.js` wires them with `require("./app/routes/articles.routes")(app)`.

## Contributing

See the repository [Contributing Guide](../CONTRIBUTING.md). Known defects and the planned migration are catalogued in [`docs/audit/`](../docs/audit/).
