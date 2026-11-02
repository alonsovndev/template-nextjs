# Verification

The Next.js baseline is implemented and locally verified on `feature/nextjs-template-baseline`.

## Environment

- Node 23.10.0 locally (the project targets Node 22 through `.nvmrc`, which the reusable CI workflow reads); npm 11.4.2
- Next.js 16.4.0, React and React DOM 19.3.0, Ant Design 6.6.5, TanStack Query 5.104.1, TypeScript 5.9.3
- Vitest 3.2.7 and Playwright 1.64.0 with Chromium; ESLint 9.39.5
- Exact dependency versions recorded in `package.json` and `package-lock.json`

## Results

| Check                                                | Result                                                             |
| ---------------------------------------------------- | ------------------------------------------------------------------ |
| Clean `npm ci --ignore-scripts --no-audit --no-fund` | Passed; matches the reusable CI installation mode                  |
| `make ci`                                            | Passed: format check, lint, type-check, coverage, production build |
| ESLint                                               | Zero warnings (`--max-warnings 0`)                                 |
| TypeScript                                           | `tsc --noEmit` passed for the app and `tsconfig.e2e.json`          |
| Vitest                                               | 15 tests passed across 6 files; 100% line coverage (gate is 80%)   |
| `next build`                                         | Passed; `/` and `/_not-found` prerendered as static content        |
| `npm run test:e2e`                                   | 2 Chromium tests passed against the production build               |
| `git diff --check`                                   | Passed                                                             |

The end-to-end suite covers the home page rendering service status from the API and unknown routes falling back to the not-found page. Playwright runs against a production `next build`/`next start`, so prerender and environment-guard regressions fail here too.

## Limits and follow-up

- No deploy workflow, no target deployed, and no infrastructure provisioned. `docs/deployment.md` records the candidate targets per profile as TBD.
- Sentry is not wired in; `docs/development.md` records the intended wiring.
- CI calls the reusable `github-workflows` workflows pinned to an immutable commit SHA, not a release tag; switch to `v1` when it exists.
- Running on Node 23 emits an `EBADENGINE` warning because Next.js 16 supports `^20.19`/`^22.13`/`>=24`; use the `.nvmrc` Node 22. This does not affect CI, which reads `.nvmrc`.
- vitest 3.2.7 carries a critical tinypool advisory (test runner only, not shipped application code); the fix is a deliberate vitest 5 bump, tracked in [adr-001](adr/adr-001-template-baseline.md).
- Browser checks cover Chromium only; other browsers and physical devices remain unverified.
- Dependency vulnerability auditing beyond the install warnings was not run.
