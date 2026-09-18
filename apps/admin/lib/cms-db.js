import {upstreamUrl} from "./upstream";

const TABLES={
  sites:"cms_sites",
  pages:"cms_pages",
  versions:"cms_page_versions",
  navigation:"cms_navigation",
  redirects:"cms_redirects",
  users:"cms_users",
  audit:"cms_audit_logs",
  "publish-jobs":"cms_publish_jobs"
};

export function cmsStorageConfigured(){
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export async function requireAdminSession(request){
  const cookie=request.headers.get("cookie")||"";
  if(!cookie) return false;
  try{
    const r=await fetch(upstreamUrl("/api/admin/settings"),{
      headers:{cookie,accept:"application/json"},
      cache:"no-store"
    });
    return r.ok;
  }catch{
    return false;
  }
}

function baseHeaders(){
  const key=process.env.SUPABASE_SERVICE_ROLE_KEY;
  return {
    apikey:key,
    authorization:`Bearer ${key}`,
    "content-type":"application/json",
    prefer:"return=representation"
  };
}

function tableUrl(resource,search=""){
  const table=TABLES[resource];
  if(!table) throw new Error("Unsupported CMS resource");
  const base=(process.env.NEXT_PUBLIC_SUPABASE_URL||"").replace(/\/$/,"");
  return `${base}/rest/v1/${table}${search}`;
}

function safeQuery(url){
  const out=new URLSearchParams();
  const eqFields=["id","site_id","page_id","key","slug","path","locale","status","email","source","provider"];
  for(const k of eqFields){
    const v=url.searchParams.get(k);
    if(v!==null) out.set(k,`eq.${v}`);
  }
  const select=url.searchParams.get("select");
  out.set("select",select||"*");
  const order=url.searchParams.get("order");
  if(order) out.set("order",order);
  const limit=url.searchParams.get("limit");
  if(limit) out.set("limit",String(Math.min(Math.max(Number(limit)||20,1),200)));
  return out.toString();
}

export async function listResource(resource,request){
  if(!cmsStorageConfigured()) return {status:503,body:{error:"Supabase chưa được cấu hình."}};
  const qs=safeQuery(new URL(request.url));
  const r=await fetch(tableUrl(resource,`?${qs}`),{headers:baseHeaders(),cache:"no-store"});
  const body=await r.json().catch(()=>[]);
  return {status:r.status,body};
}

export async function createResource(resource,payload){
  if(!cmsStorageConfigured()) return {status:503,body:{error:"Supabase chưa được cấu hình."}};
  const r=await fetch(tableUrl(resource),{
    method:"POST",
    headers:baseHeaders(),
    body:JSON.stringify(payload),
    cache:"no-store"
  });
  const body=await r.json().catch(()=>({}));
  return {status:r.status,body};
}

export async function readResource(resource,id){
  if(!cmsStorageConfigured()) return {status:503,body:{error:"Supabase chưa được cấu hình."}};
  const r=await fetch(tableUrl(resource,`?id=eq.${encodeURIComponent(id)}&select=*`),{headers:baseHeaders(),cache:"no-store"});
  const rows=await r.json().catch(()=>[]);
  return {status:r.status,body:Array.isArray(rows)?rows[0]??null:rows};
}

export async function patchResource(resource,id,payload){
  if(!cmsStorageConfigured()) return {status:503,body:{error:"Supabase chưa được cấu hình."}};
  const r=await fetch(tableUrl(resource,`?id=eq.${encodeURIComponent(id)}`),{
    method:"PATCH",
    headers:baseHeaders(),
    body:JSON.stringify(payload),
    cache:"no-store"
  });
  const body=await r.json().catch(()=>({}));
  return {status:r.status,body};
}

export async function deleteResource(resource,id){
  if(!cmsStorageConfigured()) return {status:503,body:{error:"Supabase chưa được cấu hình."}};
  const r=await fetch(tableUrl(resource,`?id=eq.${encodeURIComponent(id)}`),{
    method:"DELETE",
    headers:baseHeaders(),
    cache:"no-store"
  });
  const body=await r.json().catch(()=>[]);
  return {status:r.status,body};
}

export function isAllowedResource(resource){
  return Boolean(TABLES[resource]);
}
