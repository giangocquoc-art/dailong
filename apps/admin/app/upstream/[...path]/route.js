import {proxyAsset} from "../../../lib/upstream";
export const dynamic="force-dynamic";
export async function GET(request,{params}){const p=await params;return proxyAsset(request,p.path||[])}