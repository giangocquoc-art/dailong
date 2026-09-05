"use client";

import { ImageUp, Loader2, LogOut, Save, ShieldCheck } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import type { Product, SiteSettings } from "@/lib/content";

type Notice = { type: "success" | "error"; text: string } | null;

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-2 block text-sm font-bold text-[#24324a]">{label}</span>{children}</label>;
}

async function uploadImage(file: File) {
  const form = new FormData();
  form.append("file", file);
  const response = await fetch("/api/admin/upload", { method: "POST", body: form });
  const data = await response.json() as { url?: string; error?: string };
  if (!response.ok || !data.url) throw new Error(data.error ?? "Không thể tải ảnh.");
  return data.url;
}

export function LoginPanel() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ username: form.get("username"), password: form.get("password") }) });
    const data = await response.json() as { error?: string };
    if (!response.ok) { setError(data.error ?? "Đăng nhập không thành công."); setLoading(false); return; }
    window.location.reload();
  }
  return <main className="porcelain-pattern grid min-h-screen place-items-center bg-[#eaf0f8] px-5 py-12"><div className="w-full max-w-md border border-[#163874]/15 bg-white p-8 shadow-2xl shadow-[#163874]/10 sm:p-10"><div className="flex items-center gap-4"><img src="/logo-dai-long.png" alt="Đại Long" className="h-16 w-16 object-contain"/><div><p className="eyebrow text-[#b7803f]">Khu vực nội bộ</p><h1 className="display-font mt-1 text-3xl text-[#163874]">Quản trị nội dung</h1></div></div><p className="mt-6 text-sm leading-6 text-[#667085]">Đăng nhập để thay đổi nội dung, hình nền và hình ảnh sản phẩm trên website.</p><form onSubmit={submit} className="mt-8 space-y-5"><Field label="Tài khoản"><Input name="username" autoComplete="username" required className="h-12"/></Field><Field label="Mật khẩu"><Input name="password" type="password" autoComplete="current-password" required className="h-12"/></Field>{error && <p role="alert" className="bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}<Button type="submit" disabled={loading} className="h-12 w-full rounded-none bg-[#163874] text-base">{loading ? <><Loader2 className="animate-spin"/>Đang kiểm tra</> : <><ShieldCheck/>Đăng nhập quản trị</>}</Button></form></div></main>;
}

export function AdminPanel({ initialSettings, initialProducts }: { initialSettings: SiteSettings; initialProducts: Product[] }) {
  const [settings, setSettings] = useState(initialSettings);
  const [products, setProducts] = useState(initialProducts);
  const [saving, setSaving] = useState("");
  const [notice, setNotice] = useState<Notice>(null);

  function showNotice(type: "success" | "error", text: string) { setNotice({ type, text }); window.setTimeout(() => setNotice(null), 4000); }
  async function saveSettings(event: FormEvent) {
    event.preventDefault(); setSaving("settings");
    const response = await fetch("/api/admin/settings", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(settings) });
    const data = await response.json() as { error?: string };
    setSaving(""); showNotice(response.ok ? "success" : "error", response.ok ? "Đã lưu nội dung website." : (data.error ?? "Lưu chưa thành công."));
  }
  async function saveProduct(product: Product) {
    setSaving(product.id);
    const response = await fetch(`/api/admin/products/${product.id}`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(product) });
    const data = await response.json() as { error?: string };
    setSaving(""); showNotice(response.ok ? "success" : "error", response.ok ? `Đã lưu “${product.title}”.` : (data.error ?? "Lưu chưa thành công."));
  }
  async function replaceImage(file: File, target: "hero" | string) {
    setSaving(`upload-${target}`);
    try { const url = await uploadImage(file); if (target === "hero") setSettings((current) => ({ ...current, heroImageUrl: url })); else setProducts((current) => current.map((product) => product.id === target ? { ...product, imageUrl: url } : product)); showNotice("success", "Ảnh đã tải lên. Nhấn Lưu để áp dụng."); } catch (error) { showNotice("error", error instanceof Error ? error.message : "Không thể tải ảnh."); } finally { setSaving(""); }
  }
  async function logout() { await fetch("/api/admin/logout", { method: "POST" }); window.location.reload(); }

  return <main className="min-h-screen bg-[#f4f6f9]">
    <header className="border-b border-[#dbe2ec] bg-white"><div className="mx-auto flex min-h-[78px] max-w-7xl items-center justify-between gap-5 px-5"><div className="flex items-center gap-3"><img src="/logo-dai-long.png" alt="Đại Long" className="h-12 w-12 object-contain"/><div><p className="font-bold text-[#163874]">Gốm sứ Đại Long</p><p className="text-xs text-[#667085]">Quản trị nội dung website</p></div></div><div className="flex gap-2"><Button asChild variant="outline" className="rounded-none"><a href="/" target="_blank">Xem website</a></Button><Button variant="ghost" onClick={logout}><LogOut/>Thoát</Button></div></div></header>
    <div className="mx-auto max-w-7xl px-5 py-10">
      {notice && <div className={`fixed right-5 top-5 z-50 max-w-sm px-5 py-4 text-sm font-bold shadow-xl ${notice.type === "success" ? "bg-[#163874] text-white" : "bg-red-700 text-white"}`} role="status">{notice.text}</div>}
      <Tabs defaultValue="website">
        <TabsList className="h-auto rounded-none bg-white p-1 shadow-sm"><TabsTrigger value="website" className="rounded-none px-5 py-3">Nội dung chung</TabsTrigger><TabsTrigger value="products" className="rounded-none px-5 py-3">Sản phẩm ({products.length})</TabsTrigger></TabsList>
        <TabsContent value="website" className="mt-6"><form onSubmit={saveSettings} className="grid gap-6 lg:grid-cols-[1fr_0.78fr]"><section className="space-y-5 border border-[#dbe2ec] bg-white p-6 sm:p-8"><div><p className="eyebrow text-[#b7803f]">Trang chủ</p><h2 className="display-font mt-2 text-3xl">Thông tin và hình nền</h2></div><Field label="Tên thương hiệu"><Input value={settings.siteTitle} onChange={(e)=>setSettings({...settings,siteTitle:e.target.value})}/></Field><Field label="Dòng giới thiệu nhỏ"><Input value={settings.heroKicker} onChange={(e)=>setSettings({...settings,heroKicker:e.target.value})}/></Field><Field label="Tiêu đề lớn"><Textarea value={settings.heroTitle} onChange={(e)=>setSettings({...settings,heroTitle:e.target.value})} className="min-h-24"/></Field><Field label="Mô tả đầu trang"><Textarea value={settings.heroDescription} onChange={(e)=>setSettings({...settings,heroDescription:e.target.value})} className="min-h-28"/></Field><Field label="Câu chuyện thương hiệu"><Textarea value={settings.aboutText} onChange={(e)=>setSettings({...settings,aboutText:e.target.value})} className="min-h-40"/></Field><div className="grid gap-4 sm:grid-cols-2"><Field label="Điện thoại / Zalo"><Input value={settings.phone} onChange={(e)=>setSettings({...settings,phone:e.target.value})}/></Field><Field label="Email"><Input type="email" value={settings.email} onChange={(e)=>setSettings({...settings,email:e.target.value})}/></Field></div><Field label="Địa chỉ"><Input value={settings.address} onChange={(e)=>setSettings({...settings,address:e.target.value})}/></Field><Button type="submit" disabled={saving==="settings"} className="h-11 rounded-none bg-[#163874] px-6">{saving==="settings"?<Loader2 className="animate-spin"/>:<Save/>}Lưu nội dung chung</Button></section><aside className="border border-[#dbe2ec] bg-white p-6 sm:p-8"><p className="text-sm font-bold">Ảnh nền đầu trang</p><div className="mt-4 aspect-[16/10] overflow-hidden bg-[#eaf0f8]"><img src={settings.heroImageUrl} alt="Ảnh nền hiện tại" className="image-cover"/></div><p className="mt-4 break-all text-xs text-[#667085]">{settings.heroImageUrl}</p><label className="mt-5 flex cursor-pointer items-center justify-center gap-2 border border-dashed border-[#163874]/35 px-4 py-5 text-sm font-bold text-[#163874]"><ImageUp size={19}/>{saving==="upload-hero"?"Đang tải ảnh...":"Chọn ảnh nền mới"}<Input type="file" accept="image/*" className="hidden" onChange={(e)=>{const file=e.target.files?.[0];if(file) void replaceImage(file,"hero")}}/></label><p className="mt-3 text-xs leading-5 text-[#667085]">Nên dùng ảnh ngang, rõ nét, dung lượng dưới 8 MB.</p></aside></form></TabsContent>
        <TabsContent value="products" className="mt-6"><div className="space-y-5">{products.map((product,index)=><ProductEditor key={product.id} product={product} index={index} saving={saving} onChange={(next)=>setProducts((current)=>current.map((item)=>item.id===next.id?next:item))} onSave={saveProduct} onImage={(file)=>replaceImage(file,product.id)}/>)}</div></TabsContent>
      </Tabs>
    </div>
  </main>;
}

function ProductEditor({ product, index, saving, onChange, onSave, onImage }: { product: Product; index: number; saving: string; onChange: (product: Product)=>void; onSave:(product:Product)=>void; onImage:(file:File)=>void }) {
  return <details className="group border border-[#dbe2ec] bg-white" open={index===0}><summary className="flex cursor-pointer list-none items-center gap-4 p-4 sm:p-5"><img src={product.imageUrl} alt="" className="h-16 w-16 shrink-0 object-cover"/><div className="min-w-0 flex-1"><p className="truncate font-bold text-[#17213a]">{product.title}</p><p className="mt-1 text-sm text-[#667085]">{product.category} · {product.code}</p></div><span className="text-sm font-bold text-[#163874] group-open:hidden">Chỉnh sửa</span><span className="hidden text-sm font-bold text-[#163874] group-open:inline">Thu gọn</span></summary><div className="grid gap-6 border-t border-[#dbe2ec] p-5 lg:grid-cols-[220px_1fr]"><div><div className="aspect-square overflow-hidden bg-[#eaf0f8]"><img src={product.imageUrl} alt={product.title} className="image-cover"/></div><label className="mt-3 flex cursor-pointer items-center justify-center gap-2 border border-dashed border-[#163874]/35 px-3 py-3 text-sm font-bold text-[#163874]"><ImageUp size={17}/>{saving===`upload-${product.id}`?"Đang tải...":"Đổi ảnh"}<Input type="file" accept="image/*" className="hidden" onChange={(e)=>{const file=e.target.files?.[0];if(file)onImage(file)}}/></label></div><div className="grid gap-4 sm:grid-cols-2"><Field label="Tên sản phẩm"><Input value={product.title} onChange={(e)=>onChange({...product,title:e.target.value})}/></Field><Field label="Danh mục"><Input value={product.category} onChange={(e)=>onChange({...product,category:e.target.value})}/></Field><Field label="Mã sản phẩm"><Input value={product.code} onChange={(e)=>onChange({...product,code:e.target.value})}/></Field><Field label="Chất liệu"><Input value={product.material} onChange={(e)=>onChange({...product,material:e.target.value})}/></Field><Field label="Quy cách / kích thước"><Input value={product.dimensions} onChange={(e)=>onChange({...product,dimensions:e.target.value})}/></Field><Field label="Thứ tự hiển thị"><Input type="number" value={product.sortOrder} onChange={(e)=>onChange({...product,sortOrder:Number(e.target.value)})}/></Field><div className="sm:col-span-2"><Field label="Mô tả sản phẩm"><Textarea value={product.description} onChange={(e)=>onChange({...product,description:e.target.value})} className="min-h-28"/></Field></div><div className="sm:col-span-2"><Button type="button" onClick={()=>onSave(product)} disabled={saving===product.id} className="h-11 rounded-none bg-[#163874] px-6">{saving===product.id?<Loader2 className="animate-spin"/>:<Save/>}Lưu sản phẩm</Button></div></div></div></details>;
}
