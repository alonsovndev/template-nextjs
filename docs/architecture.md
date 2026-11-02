# Architecture

Server-rendered app on the Next.js App Router with a feature-first client architecture. Rules and rationale follow the handbook's frontend standards; this page records how the template applies them.

## Layout

| Path                      | Holds                                                                                                                         |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `src/app/`                | `layout.tsx` (root layout, `AntdRegistry`, metadata), `page.tsx`, `not-found.tsx`, `error.tsx`, `providers/` (`AppProviders`) |
| `src/features/<feature>/` | `api/` (HTTP and query hooks), `components/`, `types.ts`, `index.ts`                                                          |
| `src/shared/`             | `components/` (AppLayout, PageHeader, LoadingState, EmptyState, ErrorBoundary), `lib/` (env, http), `styles/` (theme)         |
| `src/mocks/`, `src/test/` | MSW handlers, Vitest setup, render helper                                                                                     |

## Rules

- A feature exposes its public surface through `index.ts`. Other code imports from there, never from inside the feature.
- Code moves to `shared/` only after two or three real uses.
- Route files stay thin: a page composes `PageHeader` and feature components. Business logic and API fetching never live in `src/app/`.
- Components that use antd, React state, or browser APIs are client components (`"use client"`); server pages import and compose them. API data is fetched client-side with TanStack Query, keeping the feature code portable across the React + Vite and Next.js templates.
- The `@` alias points at `src/` and is configured in `tsconfig.json` and `vitest.config.ts`. Keep both in sync.

## Provider order

```text
AntdRegistry (SSR style extraction, root layout)
  > ConfigProvider (theme tokens, the only one in the app)
    > antd App (message / notification / modal context)
      > QueryClientProvider
        > AppLayout (ErrorBoundary wraps page content)
          > routes (page.tsx, not-found.tsx, error.tsx)
```

Exactly one `AntdRegistry` and one theme-owning `ConfigProvider`, both mounted only in the root layout. A second themed `ConfigProvider` or registry per page duplicates antd style injection under SSR.

## Data flow

Components call a feature hook (`useStatusQuery`) that calls an API function (`getStatus`) that uses `getJson` from `shared/lib/http.ts`. `getJson` throws `HttpError` on non-2xx responses, which TanStack Query surfaces as `isError`. Every query surface renders loading, empty, and error states.

## Error handling

- `src/app/error.tsx` is the route-level boundary the App Router requires; it offers `reset()`.
- `src/app/global-error.tsx` is the root boundary for errors thrown by the layout itself; it renders its own `html` and `body`.
- `ErrorBoundary` in `AppLayout` catches render errors below the route segment and shows a recovery screen. It is the only class component, because React offers no hook equivalent.
- Reporting to an error tracker is TBD (Sentry is deferred).

## Cache Components

`cacheComponents` is `false` in `next.config.ts`: `@ant-design/nextjs-registry` inserts styles with `Math.random()` during prerender, which Cache Components rejects on every route. Revisit when antd supports it; the decision and evidence are in [adr-001](adr/adr-001-template-baseline.md).
