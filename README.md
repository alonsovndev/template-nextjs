# template-nextjs

Production-ready starting point for Next.js apps that need SSR, dynamic SEO, or Next-specific capabilities: TypeScript, App Router, Ant Design, TanStack Query, Vitest, Testing Library, MSW, Playwright, ESLint, Prettier, Husky, and GitHub Actions CI. It implements the frontend, testing, and git standards of the [engineering handbook](https://github.com/alonsovndev/engineering-handbook).

Use it only when the project needs what Next.js is for. For SaaS, dashboards, and admin apps use the React + Vite template; for content sites use the Astro template.

## Use the template

1. Create a repository from this template (or copy it) and rename the package in `package.json`, the `name`/`description` in `src/app/layout.tsx` metadata, and the header title in `src/shared/components/AppLayout.tsx`.
2. `cp .env.example .env` and set `NEXT_PUBLIC_API_BASE_URL`.
3. `make install && make dev`, then open http://localhost:3000.
4. Replace `src/features/status` with your first feature; keep its structure.

Requires Node 22 (`.nvmrc`).

## Commands

| Command            | Purpose                                                     |
| ------------------ | ----------------------------------------------------------- |
| `make install`     | `npm ci`                                                    |
| `make dev`         | Next.js dev server (port 3000)                              |
| `make test`        | Vitest with the 80% line coverage gate                      |
| `make lint`        | ESLint, zero warnings                                       |
| `make format`      | Prettier                                                    |
| `make ci`          | Format check, lint, type-check, tests, build (what CI runs) |
| `npm run test:e2e` | Playwright (chromium)                                       |

## What's included

- Feature-first layout with an example `status` feature: query hook, loading/empty/error states, MSW-backed tests.
- App Router wiring: root layout with the antd style registry, `AppProviders` (ConfigProvider + antd App + TanStack Query), route-level `error.tsx` and `not-found.tsx`.
- Conventional Commits `commit-msg` hook, secret scan, and lint-staged `pre-commit` hook.
- CI: reusable `frontend-ci` and `pr-title` workflows from [github-workflows](https://github.com/alonsovndev/github-workflows).
- `AGENTS.md` plus `docs/` for humans and agents.

Not included: Sentry (deferred), authentication, deployment workflow. See [docs/deployment.md](docs/deployment.md).

## Docs

[Architecture](docs/architecture.md) · [Development](docs/development.md) · [Testing](docs/testing.md) · [Deployment](docs/deployment.md) · [Verification](docs/verification.md) · [ADRs](docs/adr/adr-001-template-baseline.md)

## License

MIT. See [LICENSE](LICENSE).
