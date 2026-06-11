# Next.js + Express Starter

A reusable [Turborepo](https://turborepo.dev) monorepo starter with a Next.js frontend, Express API, and shared tooling — clone it and build your next project on top.

## Stack

| Layer    | Tech                                                                    |
| -------- | ----------------------------------------------------------------------- |
| Frontend | [Next.js](https://nextjs.org/) (`apps/web`)                             |
| Backend  | [Express](https://expressjs.com/) + MongoDB (`apps/api`)                |
| Monorepo | [Turborepo](https://turborepo.dev) + [pnpm](https://pnpm.io) workspaces |
| Tooling  | TypeScript, ESLint, Prettier, Husky, lint-staged                        |

## What's inside

### Apps

- `web` — Next.js frontend
- `api` — Express API with health checks (`/health`, `/health/live`, `/health/ready`)

### Shared packages

- `@repo/eslint-config` — ESLint presets (Next.js + Node)
- `@repo/typescript-config` — shared `tsconfig` presets
- `@repo/prettier-config` — shared Prettier rules

## Quick start

```sh
# 1. Clone and install
git clone https://github.com/ayushdixit23/turborepo-starter-express-nextjs
cd turborepo-starter-express-nextjs
pnpm install

# 2. Configure the API
cp apps/api/env.example apps/api/.env

# 3. Run everything
pnpm dev
```

- Web: [http://localhost:3000](http://localhost:3000)
- API: [http://localhost:5001](http://localhost:5001)
- API docs: [http://localhost:5001/api-docs](http://localhost:5001/api-docs)

## Scripts

| Command             | Description                                             |
| ------------------- | ------------------------------------------------------- |
| `pnpm dev`          | Start all apps in dev mode                              |
| `pnpm build`        | Production build                                        |
| `pnpm lint`         | ESLint across the repo                                  |
| `pnpm format`       | `prettier --write` — fixes formatting (mutates files)   |
| `pnpm format:check` | `prettier --check` — verify formatting only (no writes) |
| `pnpm check-types`  | TypeScript type checking                                |
| `pnpm validate`     | lint + format:check + check-types (read-only gate)      |

`format` writes; `format:check` only verifies. Use `pnpm format` manually when you need to fix the whole repo; hooks and `validate` always use `format:check`.

Run a single app:

```sh
pnpm exec turbo dev --filter=web
pnpm exec turbo dev --filter=api
```

## Git hooks (Husky)

Installed automatically via `pnpm install`:

| Hook           | Runs                                                                 |
| -------------- | -------------------------------------------------------------------- |
| **pre-commit** | `lint-staged` (Prettier `--write` on staged files) → `pnpm validate` |
| **pre-push**   | `pnpm build`                                                         |

On commit, staged files are auto-formatted first; then `validate` checks lint, formatting (`format:check`), and types across the repo without writing files. If validate fails, run `pnpm format` to fix formatting repo-wide, fix lint/types, and try again.

## Reusing this starter

1. Clone or fork this repo
2. Rename the root `name` in `package.json` to your project name
3. Update `apps/api/.env` with your MongoDB URI and secrets
4. Build your features in `apps/web` and `apps/api`
5. Add shared code under `packages/` as needed

## Useful links

- [Turborepo tasks](https://turborepo.dev/docs/crafting-your-repository/running-tasks)
- [Turborepo caching](https://turborepo.dev/docs/crafting-your-repository/caching)
- [pnpm workspaces](https://pnpm.io/workspaces)
