<div id="top">

<!-- HEADER STYLE: CLASSIC -->
<div align="center">

<h1 align="center">COLOPHON</h1>
<p align="center"><em>Empowering Creators, Inspiring Readers, Unleashing Ideas</em></p>

<!-- BADGES -->
<a href="https://github.com/MA1002643/colophon/blob/main/LICENSE" alt="license">
   <img src="https://img.shields.io/badge/license-MIT-green?style=flat&logo=opensourceinitiative&logoColor=white" alt="MIT License" />
</a>
<img src="https://img.shields.io/github/last-commit/MA1002643/colophon?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
<a href="https://github.com/MA1002643/colophon/discussions" alt="Discussions">
   <img src="https://img.shields.io/github/discussions/MA1002643/colophon" alt="Discussions" />
</a>
<a href="https://github.com/MA1002643/colophon/stargazers">
   <img src="https://custom-icon-badges.demolab.com/github/stars/MA1002643/colophon?logo=star&style=flat" alt="stars" />
</a>
<a href="https://github.com/MA1002643/colophon/issues">
   <img src="https://custom-icon-badges.demolab.com/github/issues-raw/MA1002643/colophon?logo=issue" alt="issues" />
</a>
<br>
<br>
<em>Built with the tools and technologies:</em>
<br>
<br>
<!-- TECH-STACK:START -->

<div align="center" style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;justify-content:center;margin:0 auto;">
<img src="https://img.shields.io/badge/Bootstrap-7952B3.svg?style=flat&logo=bootstrap&logoColor=white" alt="Bootstrap">
<img src="https://img.shields.io/badge/CORS-444444.svg?style=flat&logo=cors&logoColor=white" alt="CORS">
<img src="https://img.shields.io/badge/Vue.js-4FC08D.svg?style=flat&logo=vuedotjs&logoColor=white" alt="Vue.js">
<img src="https://img.shields.io/badge/vue-router-444444.svg?style=flat&logo=vue-router&logoColor=white" alt="vue-router">
<img src="https://img.shields.io/badge/%40types%2Fbootstrap-444444.svg?style=flat&logo=%40types%2Fbootstrap&logoColor=white" alt="@types/bootstrap">
<img src="https://img.shields.io/badge/%40vitejs%2Fplugin-vue-444444.svg?style=flat&logo=%40vitejs%2Fplugin-vue&logoColor=white" alt="@vitejs/plugin-vue">
<img src="https://img.shields.io/badge/Vite-646CFF.svg?style=flat&logo=vite&logoColor=white" alt="Vite">
<img src="https://img.shields.io/badge/bad-words-444444.svg?style=flat&logo=bad-words&logoColor=white" alt="bad-words">
<img src="https://img.shields.io/badge/body-parser-444444.svg?style=flat&logo=body-parser&logoColor=white" alt="body-parser">
<img src="https://img.shields.io/badge/chai-http-444444.svg?style=flat&logo=chai-http&logoColor=white" alt="chai-http">
<img src="https://img.shields.io/badge/Express-000000.svg?style=flat&logo=express&logoColor=white" alt="Express">
<img src="https://img.shields.io/badge/joi-444444.svg?style=flat&logo=joi&logoColor=white" alt="joi">
<img src="https://img.shields.io/badge/jshint-444444.svg?style=flat&logo=jshint&logoColor=white" alt="jshint">
<img src="https://img.shields.io/badge/morgan-444444.svg?style=flat&logo=morgan&logoColor=white" alt="morgan">
<img src="https://img.shields.io/badge/SQLite-003B57.svg?style=flat&logo=sqlite&logoColor=white" alt="SQLite">
<img src="https://img.shields.io/badge/HTML5-E34F26.svg?style=flat&logo=html5&logoColor=white" alt="HTML5">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=javascript&logoColor=white" alt="JavaScript">
</div>

<!-- TECH-STACK:END -->

</div>
<br>

---

## 📄 Table of Contents

- [Overview](#overview)
- [UI Preview](#ui-preview)
- [Features](#features)
- [Project Structure](#project-structure)
  - [Project Index](#project-index)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Testing](#testing)
- [Learning Outcomes](#learning-outcomes)
- [Roadmap](#roadmap)
- [Contributors](#contributors)
- [Acknowledgments](#acknowledgments)
- [License](#license)

---

<a id="overview"></a>

## ✨ Overview

**Colophon** is an open-source publishing platform featuring a **Vue 3 + Vite** frontend and a **Node.js + Express** backend. The repository provides a clear full-stack structure for building, testing, and running blogging-style applications using a modern JavaScript ecosystem.

### 📚 Summary

- 🟢 **Frontend:** Vue 3 + Vite with Bootstrap styling
- 🔵 **Backend:** Express + Node.js with SQLite database
- 🟣 **Testing:** Mocha + Chai unit tests included
- 🟠 **Structure:** Two distinct folders for frontend and backend separation
- ⚪ **Database:** Local SQLite integration for lightweight persistence

---

<a id="ui-preview"></a>

## 🎨 UI Preview

|                  Frontend View                   |               Admin / Dashboard View               |
| :----------------------------------------------: | :------------------------------------------------: |
| ![Article listing](screenshots/article-list.png) | ![Dashboard Screenshot](screenshots/dashboard.png) |

---

<a id="key-features"></a>

## 📌 Features

|     | Component              | Details                                                                                                                                                                                                                                                       |
| :-- | :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ⚙️  | **Architecture**       | <ul><li>Full-stack **MVC pattern**</li><li>Frontend: **Vue.js**</li><li>Backend: **Express.js** REST API</li><li>Database: **SQLite** (local-file storage)</li></ul>                                                                                          |
| 📰  | **Core Features**      | <ul><li>Blog article management — **Create, Read, Update, Delete (CRUD)**</li><li>Tag-based article categorisation & filtering</li><li>Markdown-style or WYSIWYG editor for writing posts</li><li>Responsive UI optimised for both desktop & mobile</li></ul> |
| 👤  | **User & Auth System** | <ul><li>User registration & login (JWT / cookie-based authentication)</li><li>Author profile page displaying bio & authored posts</li><li>Role-based access control (Standard User / Author / Admin)</li></ul>                                                |
| 🔌  | **Integrations**       | <ul><li>**Vue Router** for smooth client-side navigation</li><li>**Axios** (or Fetch API) for RESTful communication</li><li>**dotenv** for environment variable configuration</li><li>Custom **npm/Yarn scripts** for dev, build & testing</li></ul>          |
| 🧩  | **Modularity**         | <ul><li>Reusable **Vue components** (e.g., `PostList.vue`, `PostEditor.vue`, `Navbar.vue`)</li><li>Backend routes modularised by domain (Auth, Posts, Users)</li><li>Shared utility modules for validation, sanitisation & helpers</li></ul>                  |
| 🔩  | **Code Quality**       | <ul><li>Consistent linting with **ESLint / JSHint**</li><li>Clean and readable folder structure for scalability</li><li>Inline code comments and clear documentation blocks</li></ul>                                                                         |
| 🧪  | **Testing**            | <ul><li>Backend **unit tests** with **Mocha** & **Chai**</li><li>HTTP integration tests via **chai-http**</li><li>Automated test scripts in `package.json` (`npm test`)</li></ul>                                                                             |
| ⚡️ | **Performance**        | <ul><li>Fast builds using **Vite** bundler</li><li>Optimised **SQLite queries** for lightweight operations</li><li>Client-side performance tuning with code-splitting & lazy loading</li></ul>                                                                |
| 🛡️  | **Security**           | <ul><li>Input validation using **Joi**</li><li>Basic sanitisation and profanity filtering</li><li>**CORS** middleware enabled</li><li>Protected routes & authentication middleware for content editing</li></ul>                                              |
| 📄  | **Documentation**      | <ul><li>Comprehensive **README** with setup, usage & contribution guide</li><li>Inline API documentation within backend routes</li><li>Example environment config (`.env.example`)</li></ul>                                                                  |
| 📦  | **Dependencies**       | <ul><li>**Frontend:** Vue.js, Vue Router, Axios, Vite</li><li>**Backend:** Express, SQLite3, body-parser, Joi, dotenv</li><li>**Dev Tools:** @vitejs/plugin-vue, ESLint, JSHint, Mocha, Chai</li></ul>                                                        |

---

<a id="project-structure"></a>

## 📁 Project Structure

```sh
└── colophon/
├── Article Server Backend/
│   ├── app/
│   │   ├── controllers/
│   │   │   ├── articles.controllers.js
│   │   │   ├── comments.controllers.js
│   │   │   └── user.controllers.js
│   │   ├── lib/
│   │   │   └── authentication.js
│   │   ├── models/
│   │   │   ├── articles.models.js
│   │   │   ├── comments.models.js
│   │   │   └── user.models.js
│   │   └── routes/
│   │       ├── articles.routes.js
│   │       ├── comments.routes.js
│   │       └── user.routes.js
│   ├── database.js
│   ├── db.sqlite
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── server.js
├── frontend-app/
│   ├── vue-project/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── Article.vue
│   │   │   │   ├── CreateArt.vue
│   │   │   │   ├── deleteArt.vue
│   │   │   │   ├── deleteComment.vue
│   │   │   │   ├── UpdateArt.vue
│   │   │   │   ├── usersCreate.vue
│   │   │   │   └── UsersGetAll.vue
│   │   │   ├── pages/
│   │   │   │   ├── Dashboard.vue
│   │   │   │   ├── Home.vue
│   │   │   │   └── Login.vue
│   │   │   ├── router/
│   │   │   │   └── index.js
│   │   │   ├── Services/
│   │   │   │   ├── article.service.js
│   │   │   │   ├── comments.service.js
│   │   │   │   └── users.service.js
│   │   │   ├── Views/
│   │   │   │   └── App.vue
│   │   │   └── main.js
│   │   ├── .gitignore
│   │   ├── index.html
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── README.md
│   │   └── vite.config.js
│   ├── package-lock.json
│   ├── package.json
│   └── screencast.mp4
├── .gitignore
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
├── README.md
└── SECURITY.md
```

---

<a id="project-index"></a>

### 📑 Project Index

<details open>
   <summary><b>COLOPHON/</b></summary>
   <details>
      <summary><b>__root__</b></summary>
      <ul>
         <li><b><a href="./.gitignore">.gitignore</a></b> — File.</li>
         <li><b><a href="./CODE_OF_CONDUCT.md">CODE_OF_CONDUCT.md</a></b> — File.</li>
         <li><b><a href="./CONTRIBUTING.md">CONTRIBUTING.md</a></b> — File.</li>
         <li><b><a href="./LICENSE">LICENSE</a></b> — File.</li>
         <li><b><a href="./README.md">README.md</a></b> — Project documentation, overview and setup instructions.</li>
         <li><b><a href="./SECURITY.md">SECURITY.md</a></b> — File.</li>
      </ul>
   </details>
   <details>
      <summary><b>.github</b></summary>
      <ul>
         <li><b><a href=".github/CODEOWNERS">CODEOWNERS</a></b> — File.</li>
      </ul>
      <details>
         <summary><b>ISSUE_TEMPLATE</b></summary>
      <ul>
         <li><b><a href=".github/ISSUE_TEMPLATE/bug_report.yml">bug_report.yml</a></b> — File.</li>
         <li><b><a href=".github/ISSUE_TEMPLATE/config.yml">config.yml</a></b> — File.</li>
         <li><b><a href=".github/ISSUE_TEMPLATE/feature_request.yml">feature_request.yml</a></b> — File.</li>
      </ul>
      </details>
      <details>
         <summary><b>PULL_REQUEST_TEMPLATE</b></summary>
      <ul>
         <li><b><a href=".github/PULL_REQUEST_TEMPLATE/pull_request_template.yml">pull_request_template.yml</a></b> — File.</li>
      </ul>
      </details>
      <details>
         <summary><b>scripts</b></summary>
      <ul>
         <li><b><a href=".github/scripts/update-contributors.js">update-contributors.js</a></b> — JavaScript file.</li>
      </ul>
      </details>
      <details>
         <summary><b>workflows</b></summary>
      <ul>
         <li><b><a href=".github/workflows/ci.yml">ci.yml</a></b> — File.</li>
         <li><b><a href=".github/workflows/update-contributors.yml">update-contributors.yml</a></b> — File.</li>
         <li><b><a href=".github/workflows/update-project-index.yml">update-project-index.yml</a></b> — File.</li>
         <li><b><a href=".github/workflows/update-project-structure.yml">update-project-structure.yml</a></b> — File.</li>
         <li><b><a href=".github/workflows/update-tech-badges-single-repo.yml">update-tech-badges-single-repo.yml</a></b> — File.</li>
      </ul>
      </details>
   </details>

   <details>
      <summary><b>Article Server Backend</b></summary>
      <ul>
         <li><b><a href="Article Server Backend/database.js">database.js</a></b> — JavaScript file.</li>
         <li><b><a href="Article Server Backend/db.sqlite">db.sqlite</a></b> — File.</li>
         <li><b><a href="Article Server Backend/package-lock.json">package-lock.json</a></b> — Lockfile with exact dependency versions.</li>
         <li><b><a href="Article Server Backend/package.json">package.json</a></b> — Npm manifest (dependencies & scripts).</li>
         <li><b><a href="Article Server Backend/README.md">README.md</a></b> — Project documentation, overview and setup instructions.</li>
         <li><b><a href="Article Server Backend/server.js">server.js</a></b> — Server-side JavaScript.</li>
      </ul>
      <details>
         <summary><b>app</b></summary>
      <details>
         <summary><b>controllers</b></summary>
      <ul>
         <li><b><a href="Article Server Backend/app/controllers/articles.controllers.js">articles.controllers.js</a></b> — WebSocket-related JavaScript.</li>
         <li><b><a href="Article Server Backend/app/controllers/comments.controllers.js">comments.controllers.js</a></b> — JavaScript file.</li>
         <li><b><a href="Article Server Backend/app/controllers/user.controllers.js">user.controllers.js</a></b> — WebSocket-related JavaScript.</li>
      </ul>
      </details>
      <details>
         <summary><b>lib</b></summary>
      <ul>
         <li><b><a href="Article Server Backend/app/lib/authentication.js">authentication.js</a></b> — JavaScript file.</li>
      </ul>
      </details>
      <details>
         <summary><b>models</b></summary>
      <ul>
         <li><b><a href="Article Server Backend/app/models/articles.models.js">articles.models.js</a></b> — WebSocket-related JavaScript.</li>
         <li><b><a href="Article Server Backend/app/models/comments.models.js">comments.models.js</a></b> — JavaScript file.</li>
         <li><b><a href="Article Server Backend/app/models/user.models.js">user.models.js</a></b> — WebSocket-related JavaScript.</li>
      </ul>
      </details>
      <details>
         <summary><b>routes</b></summary>
      <ul>
         <li><b><a href="Article Server Backend/app/routes/articles.routes.js">articles.routes.js</a></b> — JavaScript file.</li>
         <li><b><a href="Article Server Backend/app/routes/comments.routes.js">comments.routes.js</a></b> — JavaScript file.</li>
         <li><b><a href="Article Server Backend/app/routes/user.routes.js">user.routes.js</a></b> — JavaScript file.</li>
      </ul>
      </details>
      </details>
      <details>
         <summary><b>tests</b></summary>
      <ul>
         <li><b><a href="Article Server Backend/tests/test.a.database.refresh.js">test.a.database.refresh.js</a></b> — JavaScript file.</li>
         <li><b><a href="Article Server Backend/tests/test.b.users.creation.js">test.b.users.creation.js</a></b> — JavaScript file.</li>
         <li><b><a href="Article Server Backend/tests/test.c.users.retrieval.js">test.c.users.retrieval.js</a></b> — JavaScript file.</li>
         <li><b><a href="Article Server Backend/tests/test.d.users.login.and.logout.js">test.d.users.login.and.logout.js</a></b> — JavaScript file.</li>
         <li><b><a href="Article Server Backend/tests/test.e.articles.creation.js">test.e.articles.creation.js</a></b> — JavaScript file.</li>
         <li><b><a href="Article Server Backend/tests/test.f.articles.retrieval.js">test.f.articles.retrieval.js</a></b> — JavaScript file.</li>
         <li><b><a href="Article Server Backend/tests/test.g.articles.edit.and.delete.js">test.g.articles.edit.and.delete.js</a></b> — JavaScript file.</li>
         <li><b><a href="Article Server Backend/tests/test.i.comments.creation.js">test.i.comments.creation.js</a></b> — JavaScript file.</li>
         <li><b><a href="Article Server Backend/tests/test.j.comments.retrieval.js">test.j.comments.retrieval.js</a></b> — JavaScript file.</li>
         <li><b><a href="Article Server Backend/tests/test.k.comments.delete.js">test.k.comments.delete.js</a></b> — JavaScript file.</li>
      </ul>
      <details>
         <summary><b>data</b></summary>
      <ul>
         <li><b><a href="Article Server Backend/tests/data/mock_articles_bad.json">mock_articles_bad.json</a></b> — File.</li>
         <li><b><a href="Article Server Backend/tests/data/mock_articles_good.json">mock_articles_good.json</a></b> — File.</li>
         <li><b><a href="Article Server Backend/tests/data/mock_comments_good.json">mock_comments_good.json</a></b> — File.</li>
         <li><b><a href="Article Server Backend/tests/data/mock_users_bad.json">mock_users_bad.json</a></b> — File.</li>
         <li><b><a href="Article Server Backend/tests/data/mock_users_good.json">mock_users_good.json</a></b> — File.</li>
      </ul>
      </details>
      </details>
   </details>

   <details>
      <summary><b>docs</b></summary>
      <details>
         <summary><b>adr</b></summary>
      <ul>
         <li><b><a href="docs/adr/0001-cross-platform-shared-codebase-strategy.md">0001-cross-platform-shared-codebase-strategy.md</a></b> — File.</li>
         <li><b><a href="docs/adr/0002-hosting-database-and-cost-model.md">0002-hosting-database-and-cost-model.md</a></b> — File.</li>
         <li><b><a href="docs/adr/0003-ai-cloud-architecture.md">0003-ai-cloud-architecture.md</a></b> — File.</li>
      </ul>
      </details>
      <details>
         <summary><b>audit</b></summary>
      <ul>
         <li><b><a href="docs/audit/codebase-audit.md">codebase-audit.md</a></b> — File.</li>
         <li><b><a href="docs/audit/migration-path.md">migration-path.md</a></b> — File.</li>
      </ul>
      </details>
   </details>

   <details>
      <summary><b>frontend-app</b></summary>
      <ul>
         <li><b><a href="frontend-app/package-lock.json">package-lock.json</a></b> — Lockfile with exact dependency versions.</li>
         <li><b><a href="frontend-app/package.json">package.json</a></b> — Npm manifest (dependencies & scripts).</li>
         <li><b><a href="frontend-app/screencast.mp4">screencast.mp4</a></b> — File.</li>
      </ul>
      <details>
         <summary><b>vue-project</b></summary>
      <ul>
         <li><b><a href="frontend-app/vue-project/.gitignore">.gitignore</a></b> — File.</li>
         <li><b><a href="frontend-app/vue-project/index.html">index.html</a></b> — HTML page.</li>
         <li><b><a href="frontend-app/vue-project/package-lock.json">package-lock.json</a></b> — Lockfile with exact dependency versions.</li>
         <li><b><a href="frontend-app/vue-project/package.json">package.json</a></b> — Npm manifest (dependencies & scripts).</li>
         <li><b><a href="frontend-app/vue-project/README.md">README.md</a></b> — Project documentation, overview and setup instructions.</li>
         <li><b><a href="frontend-app/vue-project/vite.config.js">vite.config.js</a></b> — JavaScript file.</li>
      </ul>
      <details>
         <summary><b>public</b></summary>
      <ul>
         <li><b><a href="frontend-app/vue-project/public/favicon.ico">favicon.ico</a></b> — File.</li>
      </ul>
      </details>
      <details>
         <summary><b>src</b></summary>
      <ul>
         <li><b><a href="frontend-app/vue-project/src/main.js">main.js</a></b> — WebSocket-related JavaScript.</li>
      </ul>
      <details>
         <summary><b>components</b></summary>
      <ul>
         <li><b><a href="frontend-app/vue-project/src/components/Article.vue">Article.vue</a></b> — File.</li>
         <li><b><a href="frontend-app/vue-project/src/components/CreateArt.vue">CreateArt.vue</a></b> — File.</li>
         <li><b><a href="frontend-app/vue-project/src/components/deleteArt.vue">deleteArt.vue</a></b> — File.</li>
         <li><b><a href="frontend-app/vue-project/src/components/deleteComment.vue">deleteComment.vue</a></b> — File.</li>
         <li><b><a href="frontend-app/vue-project/src/components/UpdateArt.vue">UpdateArt.vue</a></b> — File.</li>
         <li><b><a href="frontend-app/vue-project/src/components/usersCreate.vue">usersCreate.vue</a></b> — File.</li>
         <li><b><a href="frontend-app/vue-project/src/components/UsersGetAll.vue">UsersGetAll.vue</a></b> — File.</li>
      </ul>
      </details>
      <details>
         <summary><b>pages</b></summary>
      <ul>
         <li><b><a href="frontend-app/vue-project/src/pages/Dashboard.vue">Dashboard.vue</a></b> — File.</li>
         <li><b><a href="frontend-app/vue-project/src/pages/Home.vue">Home.vue</a></b> — File.</li>
         <li><b><a href="frontend-app/vue-project/src/pages/Login.vue">Login.vue</a></b> — File.</li>
      </ul>
      </details>
      <details>
         <summary><b>router</b></summary>
      <ul>
         <li><b><a href="frontend-app/vue-project/src/router/index.js">index.js</a></b> — Main server entrypoint that wires HTTP and WebSocket servers.</li>
      </ul>
      </details>
      <details>
         <summary><b>Services</b></summary>
      <ul>
         <li><b><a href="frontend-app/vue-project/src/Services/article.service.js">article.service.js</a></b> — JavaScript file.</li>
         <li><b><a href="frontend-app/vue-project/src/Services/comments.service.js">comments.service.js</a></b> — JavaScript file.</li>
         <li><b><a href="frontend-app/vue-project/src/Services/users.service.js">users.service.js</a></b> — JavaScript file.</li>
      </ul>
      </details>
      <details>
         <summary><b>Views</b></summary>
      <ul>
         <li><b><a href="frontend-app/vue-project/src/Views/App.vue">App.vue</a></b> — File.</li>
      </ul>
      </details>
      </details>
      </details>
   </details>


</details>

---

## 🚀 Getting Started

### 📋 Prerequisites

This project requires the following dependencies:

- **Programming Language:** JavaScript
- **Package Manager:** Npm

<a id="installation"></a>

### ⚙️ Installation

Build colophon from the source and install dependencies:

1. **Clone the repository:**

   ```sh
   ❯ git clone https://github.com/MA1002643/colophon
   ```

2. **Navigate to the project directory:**

   ```sh
   ❯ cd colophon
   ```

3. **Install the dependencies:**

**Using [npm](https://www.npmjs.com/):**

```sh
❯ npm install
```

<a id="usage"></a>

### 💻 Usage

Run the project with:

**Using [npm](https://www.npmjs.com/):**

```sh
npm start
```

### 🧪 Testing

Colophon uses the **Mocha + Chai (chai-http)** test framework for its backend contract tests. Run the test suite with:

**Using [npm](https://www.npmjs.com/):**

```sh
npm test
```

---

<a id="learning-outcomes"></a>

## 🎓 Learning Outcomes

- Designed and implemented a **full-stack blogging platform** using **Vue.js**, **Express.js**, and **SQLite**, following the MVC pattern.
- Strengthened understanding of **RESTful API development**, **client–server communication**, and **state management** in modern web apps.
- Gained hands-on experience in **authentication and authorization**, including protected routes and JWT-based sessions.
- Improved proficiency with **frontend frameworks (Vue.js)** and **backend technologies (Node.js/Express)** for real-world production setups.
- Practiced **database design and integration** with SQLite, including CRUD operations, schema management, and relational logic.
- Applied **modular software architecture principles** to achieve maintainable, scalable, and testable code across both frontend and backend.
- Developed and executed **unit and integration tests** using **Mocha**, **Chai**, and **chai-http** to ensure system reliability.
- Enhanced understanding of **secure web application development**, implementing input validation, sanitisation, and CORS protection.
- Experienced complete **Dev–Build–Test workflow** using modern tooling (Vite, ESLint, npm scripts) and CI-friendly practices.
- Strengthened teamwork and professional GitHub practices through **version control**, **branching strategies**, and **clear documentation**.

---

<a id="roadmap"></a>

## 📈 Roadmap

- [ ] **`Task 1`**: Implement feature one.
- [ ] **`Task 2`**: Implement feature two.
- [ ] **`Task 3`**: Implement feature three.

---

<a id="contributors"></a>

## 🤝 Contributors

<!-- CONTRIBUTORS:START -->
<p align="left">
<a href="https://github.com/MA1002643" title="MA1002643"><img src="https://images.weserv.nl/?url=avatars.githubusercontent.com%2Fu%2F87866666%3Fv%3D4%26s%3D96&w=48&h=48&fit=cover&mask=circle&border=white&borderwidth=2" alt="MA1002643" width="48" height="48" style="border-radius: 50%;"/></a>
</p>
<!-- CONTRIBUTORS:END -->

---

<a id="acknowledgments"></a>

## ✨ Acknowledgments

- Inspired by modern publishing platforms such as **Medium**, **Hashnode**, and **Dev.to**, which influenced the app’s clean design and user-centric experience.
- Developed as part of a **full-stack software engineering initiative**, focused on mastering scalable web architecture and practical project delivery.
- Grateful to the **open-source community** behind **Node.js**, **Express.js**, **Vue.js**, and **SQLite** for providing the tools and frameworks that made this project possible.
- Appreciation to **mentors, peers, and online contributors** whose feedback and shared resources helped refine both technical and architectural decisions.
- Created to demonstrate **industry-relevant full-stack development skills** — including REST API design, authentication systems, modular architecture, and end-to-end testing.

---

<a id="license"></a>

## 📜 License

This project is licensed under the **[MIT License](https://github.com/MA1002643/colophon/blob/main/LICENSE)**. See the **[LICENSE](https://choosealicense.com/licenses/)** file for full details.

#

<p align="center">
  <strong>© 2025 Muhammad Abdullah</strong><br>
  Developed with 💙 using Vue 3, Vite, Vue Router, Bootstrap, Express (Node.js) & SQLite<br>
  <a href="#top"><img alt="Back to Top" src="https://img.shields.io/badge/Back_to_Top-0A0A0A?style=for-the-badge">
</a>
</p>
