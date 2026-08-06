# Colophon — Web Client

The Vue 3 front end for Colophon, built with Vite and Bootstrap 5.

## Requirements

- **Node.js 20+**
- The [Colophon backend](../../backend/README.md) running on `http://localhost:3333` — the service modules in `src/Services/` call that address directly, so the client shows empty or failing views without it.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

Vite serves on `http://localhost:5173` by default.

### Compile and Minify for Production

```sh
npm run build
```

Output goes to `dist/`. Preview the built bundle with `npm run preview`.
