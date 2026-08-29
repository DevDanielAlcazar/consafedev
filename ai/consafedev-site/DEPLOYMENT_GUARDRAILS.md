# ConSafeDev — Deployment Guardrails

## Critical production rule

Build 01 is an application/experience redesign. It is **not** a deployment redesign.

## Current production source of truth

For production behavior, `deploy.sh` is authoritative.

Current script assumptions include:
- application directory: `/opt/consafedev/app`;
- local health URL: `http://127.0.0.1:3002`;
- public URL: `https://consafedev.qzz.io`;
- process service: `consafedev.service`;
- temporary Git worktree build;
- `npm ci`;
- `npm run build`;
- Next.js standalone promotion;
- local health check;
- static asset health check;
- public Cloudflare health check;
- automatic rollback path.

`next.config.ts` currently requires `output: 'standalone'`.

## Forbidden changes

Do not:
- edit `deploy.sh`;
- change port 3002;
- change production service topology;
- introduce PM2;
- introduce Docker;
- introduce Nginx/Apache;
- migrate hosting provider;
- alter Cloudflare Tunnel assumptions;
- remove standalone output;
- add a second runtime service for Build 01.

## Important documentation warning

The existing `despliegue.md` describes an older PM2/port-3000 approach and does **not** match the current production deployment script.

Until a dedicated documentation update is explicitly authorized:
- do not use `despliegue.md` as implementation authority;
- do not “fix” production to match that document;
- use `deploy.sh` as the source of truth.

A later task should reconcile the documentation with actual deployment without changing production behavior.

## Public domain

Current production canonical host for this phase:
`https://consafedev.qzz.io`

Future `.com` migration must be configuration-driven and handled as a separate migration task.

## Build 01 expected deployment impact

**None.**
