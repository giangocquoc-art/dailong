# Gốm Sứ Đại Long — Separate Admin Vercel App

This app is the first safe separation layer for the existing production CMS.

## Purpose

- Run on a Vercel project separate from the public site.
- Use `admin.gomsudailong.vn`.
- Keep the current production CMS and API as the upstream source of truth.
- Avoid changing or redeploying the public site while the admin is being separated.
- Keep the admin domain out of search indexes.

The current production deployment already exposes these CMS surfaces:

- `/admin`
- `/admin/editor`
- `/admin/products`
- `/admin/categories`
- `/admin/articles`
- `/admin/media`
- `/admin/revisions`
- `/admin/settings`
- `/admin/account`
- `/api/admin/*`

This app proxies those routes to `https://gomsudailong.vn`.

## Vercel configuration

Create a NEW Vercel project with:

- Project name: `gomsudailong-admin`
- Repository: `giangocquoc-art/dailong`
- Root Directory: `apps/admin`
- Framework: Next.js
- Node.js: 24.x
- Production domain: `admin.gomsudailong.vn`
- Environment variable:
  - `UPSTREAM_ADMIN_ORIGIN=https://gomsudailong.vn`

Do NOT attach `gomsudailong.vn` or `www.gomsudailong.vn` to this project.

## Migration path

This proxy is intentionally phase 1. It gives the admin its own deployment boundary immediately while preserving the working CMS.

Phase 2 moves the admin React/Puck UI into this app while keeping the production API as the source of truth.

Phase 3 moves privileged admin integrations (Vercel deployments, revisions, media, RBAC) server-side into this app and leaves only public read/render APIs on the public site.
