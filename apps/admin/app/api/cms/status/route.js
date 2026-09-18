export const dynamic="force-dynamic";
export async function GET(){
  return Response.json({
    ok:true,
    builder:"puck",
    persistence:"existing-cms-backend",
    settingsEndpoint:"/api/admin/settings",
    revisionsEndpoint:"/api/admin/revisions",
    productsEndpoint:"/api/admin/products",
    articlesEndpoint:"/api/admin/articles",
    mediaEndpoint:"/api/admin/media",
    pageSchemaPersistence:"pending-safe-backend-extension"
  });
}
