"use client";

import { Eye, EyeOff, ImagePlus, ImageUp, Loader2, LogOut, PackagePlus, Plus, Save, ShieldCheck, Trash2, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import type { Product, ProductTechnicalInfo, SiteSettings } from "@/lib/content";

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
    try {
      const form = new FormData(event.currentTarget);
      const response = await fetch("/api/admin/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ username: form.get("username"), password: form.get("password") }) });
      const data = await response.json() as { error?: string };
      if (!response.ok) throw new Error(data.error ?? "Đăng nhập không thành công.");
      window.location.reload();
    } catch (error) { setError(error instanceof Error ? error.message : "Đăng nhập không thành công."); setLoading(false); }
  }
  return <main className="porcelain-pattern grid min-h-screen place-items-center bg-[#eaf0f8] px-5 py-12"><div className="w-full max-w-md border border-[#163874]/15 bg-white p-8 shadow-2xl shadow-[#163874]/10 sm:p-10"><div className="flex items-center gap-4"><img src="/logo-dai-long.png" alt="Đại Long" className="h-16 w-16 object-contain"/><div><p className="eyebrow text-[#b7803f]">Khu vực nội bộ</p><h1 className="display-font mt-1 text-3xl text-[#163874]">Quản trị nội dung</h1></div></div><p className="mt-6 text-sm leading-6 text-[#667085]">Đăng nhập để thay đổi nội dung, hình nền và hình ảnh sản phẩm trên website.</p><form onSubmit={submit} className="mt-8 space-y-5"><Field label="Tài khoản"><Input name="username" autoComplete="username" required className="h-12"/></Field><Field label="Mật khẩu"><Input name="password" type="password" autoComplete="current-password" required className="h-12"/></Field>{error && <p role="alert" className="bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}<Button type="submit" disabled={loading} className="h-12 w-full rounded-none bg-[#163874] text-base">{loading ? <><Loader2 className="animate-spin"/>Đang kiểm tra</> : <><ShieldCheck/>Đăng nhập quản trị</>}</Button></form></div></main>;
}

export function AdminPanel({ initialSettings, initialProducts }: { initialSettings: SiteSettings; initialProducts: Product[] }) {
  const [settings, setSettings] = useState(initialSettings);
  const [products, setProducts] = useState(initialProducts);
  const [saving, setSaving] = useState("");
  const [notice, setNotice] = useState<Notice>(null);
  const [draft, setDraft] = useState<Product | null>(null);

  function showNotice(type: "success" | "error", text: string) { setNotice({ type, text }); window.setTimeout(() => setNotice(null), 4000); }
  async function saveSettings(event: FormEvent) {
    event.preventDefault(); setSaving("settings");
    try {
      const response = await fetch("/api/admin/settings", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(settings) });
      const data = await response.json() as { error?: string };
      if (!response.ok) throw new Error(data.error ?? "Lưu chưa thành công.");
      showNotice("success", "Đã lưu nội dung website.");
    } catch (error) { showNotice("error", error instanceof Error ? error.message : "Lưu chưa thành công."); }
    finally { setSaving(""); }
  }
  async function saveProduct(product: Product): Promise<boolean> {
    setSaving(product.id);
    try {
      const response = await fetch(`/api/admin/products/${encodeURIComponent(product.id)}`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(product) });
      const data = await response.json() as { error?: string };
      if (!response.ok) throw new Error(data.error ?? "Lưu chưa thành công.");
      setProducts((current) => [...current.filter((item) => item.id !== product.id), product].sort((a, b) => a.sortOrder - b.sortOrder));
      showNotice("success", `Đã lưu “${product.title}”.`);
      return true;
    } catch (error) {
      showNotice("error", error instanceof Error ? error.message : "Lưu chưa thành công.");
      return false;
    } finally { setSaving(""); }
  }
  function updateProduct(product: Product) {
    setProducts((current) => current.map((item) => item.id === product.id ? product : item));
    setDraft((current) => current?.id === product.id ? product : current);
  }
  async function replaceImage(file: File, target: "hero" | string) {
    setSaving(`upload-${target}`);
    try {
      const url = await uploadImage(file);
      if (target === "hero") setSettings((current) => ({ ...current, heroImageUrl: url }));
      else {
        const selected = products.find((product) => product.id === target) ?? draft;
        if (selected?.id === target) updateProduct({ ...selected, imageUrl: url });
      }
      showNotice("success", "Ảnh đã tải lên. Nhấn Lưu để áp dụng.");
    } catch (error) { showNotice("error", error instanceof Error ? error.message : "Không thể tải ảnh."); }
    finally { setSaving(""); }
  }
  async function addProductImages(files: FileList | null, product: Product) {
    if (!files?.length) return;
    const selected = Array.from(files).slice(0, 12 - product.images.length);
    setSaving(`gallery-${product.id}`);
    try {
      let images = product.images;
      for (const file of selected) {
        const url = await uploadImage(file);
        images = [...images, url];
        updateProduct({ ...product, images });
      }
      showNotice("success", `Đã tải ${selected.length} ảnh. Nhấn lưu sản phẩm để áp dụng.`);
    } catch (error) { showNotice("error", error instanceof Error ? error.message : "Không thể tải ảnh."); }
    finally { setSaving(""); }
  }
  async function replaceProductInfoImage(file: File, productId: string, sectionIndex: number) {
    const savingKey = `info-image-${productId}-${sectionIndex}`;
    setSaving(savingKey);
    try {
      const imageUrl = await uploadImage(file);
      const withImage = (product: Product) => ({
        ...product,
        technicalInfo: {
          ...(product.technicalInfo ?? { sections: [], table: null }),
          sections: (product.technicalInfo?.sections ?? []).map((section, index) => index === sectionIndex ? { ...section, imageUrl } : section),
        },
      });
      setProducts((current) => current.map((product) => product.id === productId ? withImage(product) : product));
      setDraft((current) => current?.id === productId ? withImage(current) : current);
      showNotice("success", "Ảnh đã tải lên. Nhấn Lưu sản phẩm để áp dụng.");
    } catch (error) { showNotice("error", error instanceof Error ? error.message : "Không thể tải ảnh."); }
    finally { setSaving(""); }
  }
  function startNewProduct() {
    setDraft({
      id: `san-pham-${crypto.randomUUID().slice(0, 8)}`,
      title: "", category: "", code: "", material: "", dimensions: "", description: "",
      imageUrl: "", images: [], isPublished: 1, featured: 0,
      technicalInfo: { sections: [], table: null },
      sortOrder: products.reduce((largest, product) => Math.max(largest, product.sortOrder), 0) + 1,
    });
  }
  async function logout() {
    try { const response = await fetch("/api/admin/logout", { method: "POST" }); if (!response.ok) throw new Error("Chưa thể đăng xuất. Vui lòng thử lại."); window.location.reload(); }
    catch (error) { showNotice("error", error instanceof Error ? error.message : "Chưa thể đăng xuất."); }
  }

  return <main className="min-h-screen bg-[#f4f6f9]">
    <header className="border-b border-[#dbe2ec] bg-white"><div className="mx-auto flex min-h-[78px] max-w-7xl items-center justify-between gap-5 px-5"><div className="flex items-center gap-3"><img src="/logo-dai-long.png" alt="Đại Long" className="h-12 w-12 object-contain"/><div><p className="font-bold text-[#163874]">Gốm sứ Đại Long</p><p className="text-xs text-[#667085]">Quản trị nội dung website</p></div></div><div className="flex gap-2"><Button asChild variant="outline" className="rounded-none"><a href="/" target="_blank">Xem website</a></Button><Button variant="ghost" onClick={logout}><LogOut/>Thoát</Button></div></div></header>
    <div className="mx-auto max-w-7xl px-5 py-10">
      {notice && <div className={`fixed right-5 top-5 z-50 max-w-sm px-5 py-4 text-sm font-bold shadow-xl ${notice.type === "success" ? "bg-[#163874] text-white" : "bg-red-700 text-white"}`} role="status">{notice.text}</div>}
      <Tabs defaultValue="website">
        <TabsList className="h-auto rounded-none bg-white p-1 shadow-sm"><TabsTrigger value="website" className="rounded-none px-5 py-3">Nội dung chung</TabsTrigger><TabsTrigger value="products" className="rounded-none px-5 py-3">Sản phẩm ({products.length})</TabsTrigger></TabsList>
        <TabsContent value="website" className="mt-6"><form onSubmit={saveSettings} className="grid gap-6 lg:grid-cols-[1fr_0.78fr]"><section className="space-y-5 border border-[#dbe2ec] bg-white p-6 sm:p-8"><div><p className="eyebrow text-[#b7803f]">Trang chủ</p><h2 className="display-font mt-2 text-3xl">Thông tin và hình nền</h2></div><Field label="Tên thương hiệu"><Input value={settings.siteTitle} onChange={(e)=>setSettings({...settings,siteTitle:e.target.value})}/></Field><Field label="Dòng giới thiệu nhỏ"><Input value={settings.heroKicker} onChange={(e)=>setSettings({...settings,heroKicker:e.target.value})}/></Field><Field label="Tiêu đề lớn"><Textarea value={settings.heroTitle} onChange={(e)=>setSettings({...settings,heroTitle:e.target.value})} className="min-h-24"/></Field><Field label="Mô tả đầu trang"><Textarea value={settings.heroDescription} onChange={(e)=>setSettings({...settings,heroDescription:e.target.value})} className="min-h-28"/></Field><Field label="Câu chuyện thương hiệu"><Textarea value={settings.aboutText} onChange={(e)=>setSettings({...settings,aboutText:e.target.value})} className="min-h-40"/></Field><div className="grid gap-4 sm:grid-cols-2"><Field label="Điện thoại / Zalo"><Input value={settings.phone} onChange={(e)=>setSettings({...settings,phone:e.target.value})}/></Field><Field label="Email"><Input type="email" value={settings.email} onChange={(e)=>setSettings({...settings,email:e.target.value})}/></Field></div><Field label="Địa chỉ"><Input value={settings.address} onChange={(e)=>setSettings({...settings,address:e.target.value})}/></Field><Button type="submit" disabled={saving==="settings"} className="h-11 rounded-none bg-[#163874] px-6">{saving==="settings"?<Loader2 className="animate-spin"/>:<Save/>}Lưu nội dung chung</Button></section><aside className="border border-[#dbe2ec] bg-white p-6 sm:p-8"><p className="text-sm font-bold">Ảnh nền đầu trang</p><div className="mt-4 aspect-[16/10] overflow-hidden bg-[#eaf0f8]"><img src={settings.heroImageUrl} alt="Ảnh nền hiện tại" className="image-cover"/></div><p className="mt-4 break-all text-xs text-[#667085]">{settings.heroImageUrl}</p><label className="mt-5 flex cursor-pointer items-center justify-center gap-2 border border-dashed border-[#163874]/35 px-4 py-5 text-sm font-bold text-[#163874]"><ImageUp size={19}/>{saving==="upload-hero"?"Đang tải ảnh...":"Chọn ảnh nền mới"}<Input type="file" accept="image/*" className="hidden" onChange={(e)=>{const file=e.target.files?.[0];if(file) void replaceImage(file,"hero")}}/></label><p className="mt-3 text-xs leading-5 text-[#667085]">Nên dùng ảnh ngang, rõ nét, dung lượng dưới 8 MB.</p></aside></form></TabsContent>
        <TabsContent value="products" className="mt-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border border-[#dbe2ec] bg-white p-4 sm:p-5">
            <div><h2 className="font-bold text-[#17213a]">Danh mục sản phẩm</h2><p className="mt-1 text-sm text-[#667085]">Tạo, chỉnh sửa, thêm ảnh và ẩn/đăng sản phẩm.</p></div>
            <Button type="button" onClick={startNewProduct} disabled={!!draft} className="h-11 rounded-none bg-[#163874]"><PackagePlus/>Thêm sản phẩm</Button>
          </div>
          <div className="space-y-5">
            {draft && <ProductEditor key={draft.id} product={draft} isNew saving={saving} onChange={updateProduct} onSave={async (product) => { const saved = await saveProduct(product); if (saved) setDraft(null); return saved; }} onImage={(file) => replaceImage(file, draft.id)} onImages={(files) => addProductImages(files, draft)} onSectionImage={(file, index) => replaceProductInfoImage(file, draft.id, index)} onCancel={() => setDraft(null)} />}
            {products.map((product) => <ProductEditor key={product.id} product={product} saving={saving} onChange={updateProduct} onSave={saveProduct} onImage={(file) => replaceImage(file, product.id)} onImages={(files) => addProductImages(files, product)} onSectionImage={(file, index) => replaceProductInfoImage(file, product.id, index)} />)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  </main>;
}

function ProductEditor({ product, isNew = false, saving, onChange, onSave, onImage, onImages, onSectionImage, onCancel }: {
  product: Product;
  isNew?: boolean;
  saving: string;
  onChange: (product: Product) => void;
  onSave: (product: Product) => Promise<boolean>;
  onImage: (file: File) => void;
  onImages: (files: FileList | null) => void;
  onSectionImage: (file: File, index: number) => void;
  onCancel?: () => void;
}) {
  const busy = saving !== "";
  return <details className={`group border bg-white ${isNew ? "border-[#163874] shadow-sm" : "border-[#dbe2ec]"}`} open={isNew}>
    <summary className="flex cursor-pointer list-none items-center gap-4 p-4 sm:p-5">
      {product.imageUrl ? <img src={product.imageUrl} alt="" className="h-16 w-16 shrink-0 object-cover"/> : <span className="grid h-16 w-16 shrink-0 place-items-center bg-[#eaf0f8] text-xs text-[#667085]">Chưa có ảnh</span>}
      <div className="min-w-0 flex-1"><p className="truncate font-bold text-[#17213a]">{product.title || "Sản phẩm mới"}</p><p className="mt-1 text-sm text-[#667085]">{product.category || "Chưa chọn danh mục"} · {product.code || "Chưa có mã"}</p></div>
      <span className={`hidden text-xs font-bold sm:inline ${product.isPublished ? "text-emerald-700" : "text-[#667085]"}`}>{product.isPublished ? "Đang hiển thị" : "Đang ẩn"}</span>
      <span className="text-sm font-bold text-[#163874] group-open:hidden">Chỉnh sửa</span><span className="hidden text-sm font-bold text-[#163874] group-open:inline">Thu gọn</span>
    </summary>
    <div className="grid gap-6 border-t border-[#dbe2ec] p-5 lg:grid-cols-[220px_1fr]">
      <div>
        <div className="aspect-square overflow-hidden bg-[#eaf0f8]">{product.imageUrl ? <img src={product.imageUrl} alt={product.title || "Ảnh bìa sản phẩm"} className="image-cover"/> : <div className="grid h-full place-items-center text-sm text-[#667085]">Tải ảnh bìa lên</div>}</div>
        <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 border border-dashed border-[#163874]/35 px-3 py-3 text-sm font-bold text-[#163874]"><ImageUp size={17}/>{saving === `upload-${product.id}` ? "Đang tải..." : "Tải / đổi ảnh bìa"}<Input type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="hidden" disabled={busy} onChange={(event) => { const file = event.target.files?.[0]; if (file) onImage(file); event.currentTarget.value = ""; }}/></label>
        <div className="mt-5"><p className="mb-2 text-sm font-bold text-[#24324a]">Ảnh bổ sung ({product.images.length}/12)</p>
          {product.images.length > 0 && <div className="grid grid-cols-3 gap-2">{product.images.map((url, index) => <div className="relative aspect-square overflow-hidden border border-[#dbe2ec]" key={`${url}-${index}`}><img src={url} alt={`Ảnh bổ sung ${index + 1} · ${product.title}`} className="image-cover"/><button type="button" onClick={() => onChange({ ...product, images: product.images.filter((_, imageIndex) => imageIndex !== index) })} aria-label={`Gỡ ảnh ${index + 1}`} className="absolute right-1 top-1 grid h-7 w-7 place-items-center bg-white/95 text-[#8b3329]"><X size={15}/></button></div>)}</div>}
          <label className="mt-2 flex cursor-pointer items-center justify-center gap-2 border border-dashed border-[#163874]/35 px-3 py-3 text-sm font-bold text-[#163874]"><ImagePlus size={17}/>{saving === `gallery-${product.id}` ? "Đang tải ảnh..." : "Thêm ảnh vào bộ sưu tập"}<Input type="file" multiple accept="image/jpeg,image/png,image/webp,image/avif" className="hidden" disabled={busy || product.images.length >= 12} onChange={(event) => { if (event.currentTarget.files) onImages(event.currentTarget.files); event.currentTarget.value = ""; }}/></label>
        </div>
      </div>
      <div className="grid content-start gap-4 sm:grid-cols-2">
        <Field label="Tên sản phẩm"><Input required value={product.title} onChange={(event) => onChange({ ...product, title: event.target.value })}/></Field>
        <Field label="Danh mục"><Input required value={product.category} onChange={(event) => onChange({ ...product, category: event.target.value })} placeholder="Ví dụ: Ngói âm dương"/></Field>
        <Field label="Mã sản phẩm"><Input required value={product.code} onChange={(event) => onChange({ ...product, code: event.target.value })}/></Field>
        <Field label="Chất liệu"><Input required value={product.material} onChange={(event) => onChange({ ...product, material: event.target.value })}/></Field>
        <Field label="Quy cách / kích thước"><Input required value={product.dimensions} onChange={(event) => onChange({ ...product, dimensions: event.target.value })}/></Field>
        <Field label="Thứ tự hiển thị"><Input type="number" value={product.sortOrder} onChange={(event) => onChange({ ...product, sortOrder: Number(event.target.value) })}/></Field>
        <div className="sm:col-span-2"><Field label="Mô tả sản phẩm"><Textarea value={product.description} onChange={(event) => onChange({ ...product, description: event.target.value })} className="min-h-28" placeholder="Mô tả công dụng, sắc men, cách dùng…"/></Field></div>
        <div className="sm:col-span-2"><ProductTechnicalInfoEditor product={product} saving={saving} onChange={(technicalInfo) => onChange({ ...product, technicalInfo })} onSectionImage={onSectionImage}/></div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 sm:col-span-2">
          <label className="flex min-h-11 items-center gap-2 text-sm font-semibold text-[#24324a]"><input type="checkbox" checked={product.isPublished === 1} onChange={(event) => onChange({ ...product, isPublished: event.target.checked ? 1 : 0 })}/><span>{product.isPublished ? <Eye size={17} className="inline"/> : <EyeOff size={17} className="inline"/>} Đăng sản phẩm trên website</span></label>
          <label className="flex min-h-11 items-center gap-2 text-sm font-semibold text-[#24324a]"><input type="checkbox" checked={product.featured === 1} onChange={(event) => onChange({ ...product, featured: event.target.checked ? 1 : 0 })}/>Ưu tiên trên trang chủ</label>
        </div>
        <div className="flex flex-wrap gap-2 sm:col-span-2"><Button type="button" onClick={() => void onSave(product)} disabled={busy} className="h-11 rounded-none bg-[#163874] px-6">{saving === product.id ? <Loader2 className="animate-spin"/> : <Save/>}{isNew ? "Tạo sản phẩm" : "Lưu sản phẩm"}</Button>{isNew && onCancel && <Button type="button" variant="outline" onClick={onCancel} disabled={busy} className="h-11 rounded-none">Hủy</Button>}</div>
      </div>
    </div>
  </details>;
}

function ProductTechnicalInfoEditor({ product, saving, onChange, onSectionImage }: { product: Product; saving: string; onChange: (info: ProductTechnicalInfo) => void; onSectionImage: (file: File, index: number) => void }) {
  const info = product.technicalInfo ?? { sections: [], table: null };
  function updateColumn(index: number, value: string) {
    const table = info.table;
    if (!table) return;
    const columns = table.columns.map((column, position) => position === index ? value : column);
    onChange({ ...info, table: { ...table, columns } });
  }
  function removeColumn(index: number) {
    const table = info.table;
    if (!table) return;
    onChange({ ...info, table: { ...table, columns: table.columns.filter((_, position) => position !== index), rows: table.rows.map((row) => ({ ...row, values: row.values.filter((_, position) => position !== index) })) } });
  }
  function updateRow(index: number, patch: { label?: string; valueIndex?: number; value?: string }) {
    const table = info.table;
    if (!table) return;
    onChange({ ...info, table: { ...table, rows: table.rows.map((row, position) => {
      if (position !== index) return row;
      const values = patch.valueIndex === undefined ? row.values : row.values.map((value, cell) => cell === patch.valueIndex ? (patch.value ?? "") : value);
      return { ...row, ...(patch.label === undefined ? {} : { label: patch.label }), values };
    }) } });
  }
  return <section className="border-t border-[#dbe2ec] pt-5">
    <div className="mb-4"><h3 className="font-bold text-[#17213a]">Thông tin kỹ thuật theo sản phẩm</h3><p className="mt-1 text-sm leading-6 text-[#667085]">Thêm ảnh cấu tạo, sơ đồ hoặc ghi chú phù hợp với riêng sản phẩm này. Chỉ nhập số liệu đã được Đại Long xác nhận.</p></div>
    <div className="space-y-4">
      {info.sections.map((section, index) => <div key={index} className="grid gap-4 border-y border-[#e5eaf1] py-4 sm:grid-cols-[180px_1fr]">
        <div>{section.imageUrl ? <img src={section.imageUrl} alt={section.title || "Ảnh thông tin sản phẩm"} className="aspect-[4/3] w-full border border-[#dbe2ec] object-cover"/> : <div className="grid aspect-[4/3] place-items-center bg-[#f4f6f9] text-sm text-[#667085]">Chưa có ảnh</div>}
          <label className="mt-2 flex min-h-10 cursor-pointer items-center justify-center gap-2 border border-dashed border-[#163874]/35 px-2 text-xs font-bold text-[#163874]"><ImageUp size={15}/>{saving === `info-image-${product.id}-${index}` ? "Đang tải ảnh..." : section.imageUrl ? "Thay ảnh minh họa" : "Thêm ảnh minh họa"}<Input type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="hidden" disabled={busy} onChange={(event) => { const file = event.currentTarget.files?.[0]; if (file) onSectionImage(file, index); event.currentTarget.value = ""; }}/></label>
        </div>
        <div className="grid content-start gap-3"><Field label="Tiêu đề"><Input value={section.title} maxLength={140} onChange={(event) => onChange({ ...info, sections: info.sections.map((item, position) => position === index ? { ...item, title: event.target.value } : item) })} placeholder="Ví dụ: Cấu tạo thân mái"/></Field><Field label="Nội dung"><Textarea value={section.text} maxLength={1200} onChange={(event) => onChange({ ...info, sections: info.sections.map((item, position) => position === index ? { ...item, text: event.target.value } : item) })} className="min-h-20" placeholder="Mô tả ngắn, đúng với sản phẩm này"/></Field><Button type="button" variant="ghost" onClick={() => onChange({ ...info, sections: info.sections.filter((_, position) => position !== index) })} className="min-h-10 justify-self-start rounded-none px-2 text-[#8b3329]"><Trash2 size={16}/>Gỡ mục này</Button></div>
      </div>)}
      {info.sections.length < 8 && <Button type="button" variant="outline" onClick={() => onChange({ ...info, sections: [...info.sections, { title: "", text: "", imageUrl: "" }] })} className="min-h-11 rounded-none"><Plus size={17}/>Thêm mục ảnh và nội dung</Button>}
    </div>
    <div className="mt-6 border-t border-[#dbe2ec] pt-5">
      <h4 className="font-bold text-[#17213a]">Bảng quy cách</h4>
      {!info.table ? <Button type="button" variant="outline" onClick={() => onChange({ ...info, table: { title: "", columns: [], rows: [] } })} className="mt-3 min-h-11 rounded-none"><Plus size={17}/>Thêm bảng so sánh cỡ / thông số</Button> : <div className="mt-3 space-y-4">
        <Field label="Tên bảng"><Input value={info.table.title} maxLength={140} onChange={(event) => onChange({ ...info, table: { ...info.table!, title: event.target.value } })} placeholder="Ví dụ: Bảng tham khảo quy cách"/></Field>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{info.table.columns.map((column, index) => <div key={index} className="flex items-end gap-2"><div className="min-w-0 flex-1"><Field label={`Cỡ / phiên bản ${index + 1}`}><Input value={column} maxLength={80} onChange={(event) => updateColumn(index, event.target.value)} placeholder="Ví dụ: Cỡ L"/></Field></div><Button type="button" variant="ghost" onClick={() => removeColumn(index)} aria-label={`Gỡ cột ${column || index + 1}`} className="mb-px h-11 w-11 shrink-0 rounded-none px-0 text-[#8b3329]"><X size={17}/></Button></div>)}</div>
        {info.table.columns.length < 6 && <Button type="button" variant="outline" onClick={() => onChange({ ...info, table: { ...info.table!, columns: [...info.table!.columns, ""], rows: info.table!.rows.map((row) => ({ ...row, values: [...row.values, ""] })) } })} className="min-h-10 rounded-none"><Plus size={16}/>Thêm cỡ / phiên bản</Button>}
        {info.table.rows.map((row, index) => <div key={index} className="grid gap-3 border-y border-[#e5eaf1] py-3 sm:grid-cols-2 xl:grid-cols-3"> <div className="flex items-end gap-2 sm:col-span-2 xl:col-span-3"><div className="min-w-0 flex-1"><Field label={`Thông số ${index + 1}`}><Input value={row.label} maxLength={100} onChange={(event) => updateRow(index, { label: event.target.value })} placeholder="Ví dụ: Kích thước ngói âm"/></Field></div><Button type="button" variant="ghost" onClick={() => onChange({ ...info, table: { ...info.table!, rows: info.table!.rows.filter((_, position) => position !== index) } })} aria-label={`Gỡ thông số ${row.label}`} className="mb-px h-11 w-11 shrink-0 rounded-none px-0 text-[#8b3329]"><Trash2 size={16}/></Button></div>{info.table.columns.map((column, cell) => <Field key={cell} label={column || `Giá trị cỡ ${cell + 1}`}><Input value={row.values[cell] ?? ""} maxLength={180} onChange={(event) => updateRow(index, { valueIndex: cell, value: event.target.value })} placeholder="Nhập thông số đã xác nhận"/></Field>)}</div>)}
        {info.table.rows.length < 24 && <Button type="button" variant="outline" onClick={() => onChange({ ...info, table: { ...info.table!, rows: [...info.table!.rows, { label: "", values: info.table!.columns.map(() => "") }] } })} className="min-h-10 rounded-none"><Plus size={16}/>Thêm dòng thông số</Button>}
        <Button type="button" variant="ghost" onClick={() => onChange({ ...info, table: null })} className="min-h-10 rounded-none px-2 text-[#8b3329]"><Trash2 size={16}/>Gỡ bảng quy cách</Button>
      </div>}
    </div>
  </section>;
}
