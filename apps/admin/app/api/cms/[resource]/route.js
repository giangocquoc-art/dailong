import {createResource,isAllowedResource,listResource,requireAdminSession} from "../../../../lib/cms-db";

export const dynamic="force-dynamic";

export async function GET(request,{params}){
  const p=await params;
  if(!isAllowedResource(p.resource)) return Response.json({error:"Resource không hợp lệ."},{status:404});
  if(!(await requireAdminSession(request))) return Response.json({error:"Chưa đăng nhập."},{status:401});
  const result=await listResource(p.resource,request);
  return Response.json(result.body,{status:result.status});
}

export async function POST(request,{params}){
  const p=await params;
  if(!isAllowedResource(p.resource)) return Response.json({error:"Resource không hợp lệ."},{status:404});
  if(!(await requireAdminSession(request))) return Response.json({error:"Chưa đăng nhập."},{status:401});
  const payload=await request.json().catch(()=>null);
  if(!payload||typeof payload!=="object") return Response.json({error:"Payload không hợp lệ."},{status:400});
  const result=await createResource(p.resource,payload);
  return Response.json(result.body,{status:result.status});
}
