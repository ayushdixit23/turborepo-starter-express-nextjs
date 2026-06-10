# AGENTS.md — Next.js + Express Starter

**Monorepo (Turborepo + pnpm workspaces):** `apps/*` and `packages/*`.

## Essential Commands (run from root)

| Command | What it does |
|---|---|
| `pnpm dev` | Start all apps (web + api) |
| `pnpm build` | Production build everything |
| `pnpm lint` | ESLint (flat config, strict TypeScript rules) |
| `pnpm format` | Prettier write (no cache) |
| `pnpm format:check` | Prettier check (for CI) |
| `pnpm check-types` | `tsc --noEmit` across all packages |
| `pnpm validate` | lint → format:check → check-types (runs pre-commit) |
| `pnpm exec turbo dev --filter=web` | Web only |
| `pnpm exec turbo dev --filter=api` | API only |

**Pre-commit hook** runs `pnpm validate` (can be slow). **Pre-push hook** runs `pnpm build`.

## Architecture

```
apps/web/       Next.js 16 (App Router, React 19, Tailwind CSS v4)
apps/api/       Express 5 + Mongoose 8 + Zod 4 — entry: src/index.ts
packages/
  eslint-config/  @repo/eslint-config — base, node, next presets
  prettier-config/ @repo/prettier-config — semi, singleQuote, trailingComma:all, printWidth:100
  typescript-config/ @repo/typescript-config — base, nextjs, nodejs presets
```

- **All ESM** (`"type": "module"`) — imports use `.js` extensions (NodeNext convention).
- **API port**: 5001 (not 3000 or 5000). **Web port**: 3000.
- API docs (dev only): `http://localhost:5001/api-docs`

## Setup

1. `pnpm install` (auto-runs `husky` via `prepare` script to install git hooks)
2. `cp apps/api/env.example apps/api/.env`
3. Update `MONGO_URI` in `.env` — must point to a running MongoDB instance.
4. `pnpm dev`

## Key Conventions

### API (see `apps/api/AGENTS.md` for full detail)
- **Express 5.x** — `req.query` and `req.params` are **read-only** (do not reassign).
- **Zod 4.x** — use `.parse()`, not `.parseAsync()` (different from Zod 3).
- `tsx` for dev (not ts-node): `tsx watch src/index.ts`.
- `pnpm clean` removes `dist` + `tsconfig.tsbuildinfo`.
- `NODE_ENV=production`: trust proxy, security monitoring, JSON logging.
- `NODE_ENV=development`: Swagger UI at `/api-docs`, pretty logging (pino-pretty).
- Error codes in `src/core/errors/errorCodes.ts` (~50 codes like `VALIDATION_FAILED`, `RESOURCE_NOT_FOUND`).

### Web
- **Tailwind CSS v4** — `@import "tailwindcss"` in `app/globals.css`, PostCSS via `@tailwindcss/postcss` in `postcss.config.mjs`.
- Design tokens in `:root` / `@theme`; use `bg-(--token)` / `text-(--token)` syntax.
- **Agent workflow** — `.cursor/rules/web-development.mdc` requires reading React, Next.js, frontend-design, web-design-guidelines, and tailwind-4-docs skills before writing web code.
- `pnpm check-types` runs `next typegen && tsc --noEmit` — typegen runs first to generate `.next/types/**/*.ts`.

### Code style
- ESLint 9 flat config with `typescript-eslint/strict` + `strictTypeChecked` + `projectService: true`.
- `simple-import-sort` enforced (both imports and exports).
- Complexity limits: max 250 lines/file, 60 lines/function, complexity 15, max-depth 4, max-params 5.
- Prettier: `semi: true`, `singleQuote: true`, `trailingComma: "all"`, `printWidth: 100`, `tabWidth: 2`.
- TypeScript strict mode with `noUncheckedIndexedAccess: true`.
- Unused variables allowed only with `_` prefix (Node config — API only).
- `.cursor/rules/` — agents should follow: `code-quality` (always on), `api-architecture` (API), `web-development` + `web-structure` (web/React/Next.js).

## Gotchas

- **No test framework** — no Jest, Vitest, Playwright. Add one before writing tests.
- **No CI** — no GitHub Actions workflows exist.
- `packages/eslint-config/README.md` still mentions `@turbo/eslint-config` (outdated) instead of `@repo/eslint-config`.
- `pnpm validate` is the **pre-merge gate** — runs lint, format check, and type checking together. Any of these failing blocks commits.
- `turbo.json`: `build` depends on `^build`, `lint` on `^lint`, `check-types` on `^check-types` — upstream packages build/check first.
- **Generated files** (do not edit): `next-env.d.ts`, `.next/types/**/*.ts`, `apps/api/dist/`, `apps/web/.next/`.
- `.npmrc` is empty — no custom npm config.
