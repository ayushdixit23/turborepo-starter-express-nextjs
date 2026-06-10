# testing

A [Turborepo](https://turborepo.dev) monorepo with a Next.js frontend and Express API backend.

## What's inside?

### Apps and Packages

- `web`: a [Next.js](https://nextjs.org/) app
- `api`: an [Express](https://expressjs.com/) + MongoDB API
- `@repo/ui`: a shared React component library used by `web`
- `@repo/eslint-config`: shared ESLint configurations
- `@repo/typescript-config`: shared `tsconfig.json` presets
- `@repo/prettier-config`: shared Prettier configuration

Each package/app is written in [TypeScript](https://www.typescriptlang.org/).

### Utilities

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [pnpm](https://pnpm.io) for package management

## Getting started

Install dependencies from the repo root:

```sh
pnpm install
```

## Build

Build all apps and packages:

```sh
pnpm build
```

Build a specific app:

```sh
pnpm exec turbo build --filter=web
pnpm exec turbo build --filter=api
```

## Develop

Run all apps in dev mode:

```sh
pnpm dev
```

Run a specific app:

```sh
pnpm exec turbo dev --filter=web
pnpm exec turbo dev --filter=api
```

## Lint, format, and type check

```sh
pnpm lint
pnpm format
pnpm format:check
pnpm check-types
pnpm validate   # lint + format:check + check-types (same as pre-commit hook)
```

## Git hooks (Husky)

Hooks run automatically after `pnpm install` (via the `prepare` script):

| Hook | Runs |
|------|------|
| **pre-commit** | `pnpm validate` → lint, format:check, check-types |
| **pre-push** | `pnpm build` |

## Useful Links

- [Tasks](https://turborepo.dev/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.dev/docs/crafting-your-repository/caching)
- [Filtering](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.dev/docs/reference/configuration)
- [CLI Usage](https://turborepo.dev/docs/reference/command-line-reference)
