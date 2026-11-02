# Deployment

The template builds a server-rendered Next.js app (`next build` writes `.next/`) and ships no deploy workflow, because the target depends on the project's deployment profile. Unlike the React + Vite template, the output is a Node server app, not static files; that is the point of choosing Next.js. Infrastructure for each profile lives in [terraform-modules](https://github.com/alonsovndev/terraform-modules); the profile READMEs there are the runbooks.

| Profile    | Candidate target                                                                             | Status             |
| ---------- | -------------------------------------------------------------------------------------------- | ------------------ |
| enterprise | Docker (`output: "standalone"`) on ECS behind ALB                                            | TBD, not validated |
| lean       | Cloudflare via OpenNext (`@opennextjs/cloudflare`)                                           | TBD, not validated |
| static     | Not applicable — prefer the Astro or React + Vite template when the site can be fully static | —                  |

No target has been deployed or validated; do not treat the rows above as a runbook until a real project exercises them.

## Build

```sh
NEXT_PUBLIC_API_BASE_URL=https://api.example.com npm run build
```

- `NEXT_PUBLIC_API_BASE_URL` is the API origin (no path, no trailing slash). It is inlined into the client bundle at build time, so each environment needs its own build. A production build without it fails on purpose; CI builds get the local default through the `ci` Makefile target.
- `next start` serves the build; container targets should set `output: "standalone"` in `next.config.ts` when adopted.
- The API must allow the site's origin (`CORS_ALLOWED_ORIGINS` in `template-api-python`).

## Rules for any target

- Build in CI from a tagged commit on `main`.
- Authenticate to cloud providers with OIDC where the provider supports it; keep Cloudflare API tokens in GitHub Actions secrets, scoped to the one account and zone.
- Revisit Cache Components (`next.config.ts`) per project; it is disabled here because of the antd style registry (ADR-001).

See the handbook's deployment profiles and CI/CD sections.
