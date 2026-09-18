# Gốm Sứ Đại Long — Admin CMS

Standalone CMS deployed as a separate Vercel project.

## Target

- Project: `gomsudailong-admin`
- Domain: `admin.gomsudailong.vn`
- Public site remains: `gomsudailong.vn`
- Visual editor: Puck
- Persistent CMS: Supabase
- Existing production CMS/API remains connected during migration.
- Admin is always `noindex, nofollow, noarchive`.

## Architecture

```
admin.gomsudailong.vn
  ├─ Dashboard
  ├─ Puck visual page builder
  ├─ Pages / Sites
  ├─ Products / Categories / Projects
  ├─ Articles / Media
  ├─ Navigation
  ├─ SEO / Redirects
  ├─ Versions / Audit
  ├─ Users / RBAC
  └─ Deployments
       │
       ├─ Supabase CMS store
       └─ gomsudailong.vn legacy API bridge
```

## Environment

```
UPSTREAM_ADMIN_ORIGIN=https://gomsudailong.vn
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
CMS_PREVIEW_SECRET=
CMS_REVALIDATE_SECRET=
```

Never expose the service-role key in client-side code.

## Migration

`supabase/migrations/20260918_cms_core.sql` defines Sites, Pages, page versions, Navigation, Redirects, CMS users, audit log and publish jobs.

The old production CMS remains available through `/legacy/admin/*` until the public app can render the new Page Schema directly.
