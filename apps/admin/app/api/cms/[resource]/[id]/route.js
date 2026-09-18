import {deleteResource,isAllowedResource,patchResource,readResource,requireAdminSession} from "../../../../../lib/cms-db";

export const dynamic="force-dynamic";

async function guard(request,params){
  const p=await params;
  if(!isAllowedResource(p.resource)) return {response:Response.json({error:"Resource không hợp lệ."},{status:404})};
  if(!(await requireAdminSession(request))) return {response:Response.json({error:"Chưa đăng nhập."},{status:401})};
  return {p};
}

export async function GET(request,{params}){
  const g=await guard(request,params);if(g.response)return g.response;
  const result=await readResource(g.p.resource,g.p.id);
  return Response.json(result.body,{status:result.status});
}
export async function PATCH(request,{params}){
  const g=await guard(request,params);if(g.response)return g.response;
  const payload=await request.json().catch(()=>null);
  if(!payload||typeof payload!=="object")return Response.json({error:"Payload không hợp lệ."},{status:400});
  const result=await patchResource(g.p.resource,g.p.id,payload);
  return Response.json(result.body,{status:result.status});
}
export async function DELETE(request,{params}){
  const g=await guard(request,params);if(g.response)return g.response;
  const result=await deleteResource(g.p.resource,g.p.id);
  return Response.json(result.body,{status:result.status});
}
