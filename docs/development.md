# Development

## Setup

```bash
nvm use            # Node 22
make install
cp .env.example .env
make dev
```

`npm ci` runs `husky` through the `prepare` script and installs the git hooks.

## Environment variables

| Variable                   | Purpose                 | Default                 |
| -------------------------- | ----------------------- | ----------------------- |
| `NEXT_PUBLIC_API_BASE_URL` | Backend origin, no path | `http://localhost:8080` |

Only `NEXT_PUBLIC_`-prefixed variables reach client code, and they are public. Never put secrets in them. A production `next build` without `NEXT_PUBLIC_API_BASE_URL` fails on purpose (`src/shared/lib/env.ts`); CI builds get the local default through the `ci` Makefile target because a CI build is not a deployment build.

## Day to day

- `make dev` starts Next.js on port 3000.
- `make ci` is the pre-push check; it equals the CI `verify` job.
- `npm run lint:fix` and `make format` fix most style findings.
- Next.js loads `.env` automatically for `next dev` and `next build`.

## Git hooks

| Hook         | Does                                                                                        |
| ------------ | ------------------------------------------------------------------------------------------- |
| `pre-commit` | `.husky/check-secrets.sh` (blocks env and key files, scans added lines), then `lint-staged` |
| `commit-msg` | Enforces the Conventional Commits subject; lets `Merge` and `Revert` messages through       |

Do not bypass hooks with `--no-verify`. Fix the failure.

## Error tracking

Sentry is not included. Adding it is TBD: wire `@sentry/nextjs` behind `NEXT_PUBLIC_SENTRY_DSN` so it stays a no-op locally and in tests, and report from `ErrorBoundary.componentDidCatch` and `src/app/error.tsx`.
