import AdminClient from "../admin-client";
export const dynamic="force-dynamic";
export default async function AdminPage({params}){const p=await params;return <AdminClient path={p.path||[]}/>} 