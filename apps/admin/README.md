# Gốm Sứ Đại Long — Admin CMS

Standalone admin app deployed separately from the public website.

## Current decision

The CMS keeps the **existing production backend/database**. Supabase is not part of the target architecture.

Existing production endpoints remain the source of truth:

- `/api/admin/settings`
- `/api/admin/products/*`
- `/api/admin/articles/*`
- `/api/admin/media`
- `/api/admin/upload`
- `/api/admin/revisions`
- `/api/admin/preview`

The existing backend already supports draft/publish and revision restore for settings, products and articles.

## Admin architecture

```
admin.gomsudailong.vn
  ├─ Dashboard
  ├─ Puck visual builder (layout draft layer)
  ├─ Existing live visual editor
  ├─ Products / Categories
  ├─ Articles / Media
  ├─ Revisions / Settings
  └─ Existing CMS API/database
         │
         └─ gomsudailong.vn
```

## Important safety rule

Puck Page Schema is **not** written into `/api/admin/settings` until the backend source is recovered and the settings write path is extended safely. The legacy client sends the complete settings object on save, so sending a partial object could overwrite current production settings.

Until that extension exists:

- Puck layout drafts are local-only.
- Real production content changes continue through the existing CMS editor/API.
- No Supabase project or migration is required.
- Public production remains untouched by the separated admin deployment.

## Environment

```
UPSTREAM_ADMIN_ORIGIN=https://gomsudailong.vn
CMS_PREVIEW_SECRET=
CMS_REVALIDATE_SECRET=
```
