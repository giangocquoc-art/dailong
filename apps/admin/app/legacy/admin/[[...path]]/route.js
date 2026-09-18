import {proxyHtml} from "../../../../lib/upstream";
export const dynamic="force-dynamic";
export async function GET(request,{params}){const p=await params;const suffix=(p.path||[]).join("/");return proxyHtml(request,"/admin"+(suffix?"/"+suffix:""))}