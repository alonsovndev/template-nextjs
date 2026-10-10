# ADR-001: Template baseline

- **Status**: Accepted
- **Date**: 2026-10-10

## Context

Projects that need SSR, dynamic SEO, or Next-specific capabilities need a Next.js starting point that already applies the handbook's frontend, testing, and git standards, and that stays consistent with the React + Vite template so feature code moves between them.

## Decision

- Next.js 16.4 App Router, TypeScript 5.9, React 19.3, Ant Design 6, TanStack Query 5, Vitest 3, Playwright 1.58, ESLint 9, created from `create-next-app@16.4.0` and adapted.
- Antd SSR styles through `@ant-design/nextjs-registry` (`AntdRegistry`) in the root layout, with exactly one theme-owning `ConfigProvider` inside `AppProviders`.
- Client-side data fetching with TanStack Query, mirroring the React + Vite template, instead of server-component data fetching. Feature modules (`api/`, `components/`, `types.ts`, `index.ts`) are portable between both templates; this is a platform-standard decision, not an idiomatic-Next.js one.
- **Cache Components disabled** (`cacheComponents: false`, `partialPrefetching: false`). Evidence: `@ant-design/nextjs-registry` inserts styles with `Math.random()` during prerender, which Cache Components rejects on every route (`next build` failed on `/` and `/_not-found` with `blocking-prerender-random-client` pointing at `AntdRegistry` in `src/app/layout.tsx`). Revisit when antd's registry supports Cache Components or the platform adopts antd zero-runtime styles.
- 80% line coverage, per the handbook's coverage-gate ADR.
- CI calls the reusable `pr-title` and `frontend-ci` workflows from the `github-workflows` repository, pinned to an immutable commit SHA (`59c9754`) until that repository cuts a `v1` tag; the caller contract is `make ci`.
- CI builds get `NEXT_PUBLIC_API_BASE_URL` from the `ci` Makefile target default, because a clean CI checkout has no `.env`; deployment builds must still set the variable or `next build` fails on purpose.
- Leave Sentry out of the first version. It is listed in the ecosystem plan but deferred; `docs/development.md` records the intended wiring.
- Ship no deploy workflow; deployment depends on the deployment profile.

## Consequences

### Positive

- A new project gets SSR, hooks, CI, tests, and agent context on day one.
- Feature code and tests are largely interchangeable with the React + Vite template.
- One fix in `github-workflows` improves this repository's CI too.

### Negative

- Projects needing error tracking must add Sentry themselves until the template gains it.
- vitest 3.2.7 depends on a tinypool version with a critical advisory (GHSA-5gmw-xhrv-c9v3, GHSA-85c8-ppgw-ccpr); the fix needs tinypool 2.x, which vitest 3 does not declare. Bumping to vitest 5 deliberately (with its own verification) is the follow-up; the advisory affects the test runner in CI, not shipped application code. Same state as the React + Vite template.
- Server-component data fetching is deliberately unused; a project that wants RSC data fetching deviates from the template and should record it in its own ADR.
- The CI pin is a commit SHA, not a moving branch, but it is also not a release: it will not pick up `github-workflows` fixes automatically. Bump it deliberately, or switch to the `v1` tag once it exists.
- Version pins drift; bump them deliberately and record material changes in a new ADR.

## Alternatives Considered

1. **Server components for data fetching**
   - Why it was considered: idiomatic App Router.
   - Why it was not selected: breaks platform parity with the React + Vite template (feature hooks, MSW-based tests); the platform standard is TanStack Query. Choose Next.js for SSR/SEO needs, not for a different data-fetching model.
2. **Pages Router**
   - Why it was considered: closer to the react-router mental model.
   - Why it was not selected: legacy direction for new Next.js work; App Router is the framework's investment area.
3. **Keep Cache Components enabled (create-next-app default since 16.4)**
   - Why it was considered: recommended model, becomes the default in Next.js 17.
   - Why it was not selected: hard build failure with the antd style registry on every route; antd is the platform's component library.
4. **Self-contained CI (copy the React + Vite workflow)**
   - Why it was considered: no dependency on another repository's tags.
   - Why it was not selected: the ecosystem's Phase 2 direction is reusable workflows ("one fix improves all repositories"); the caller contract is `make ci`.
