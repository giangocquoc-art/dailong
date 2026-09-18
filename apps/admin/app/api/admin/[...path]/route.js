import {proxyAdminApi} from "../../../../lib/upstream";
export const dynamic="force-dynamic";
async function handle(request,ctx){const params=await ctx.params;return proxyAdminApi(request,params.path||[])}
export const GET=handle;export const POST=handle;export const PUT=handle;export const PATCH=handle;export const DELETE=handle;