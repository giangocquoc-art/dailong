"use client";
import {useEffect,useState} from "react";
import {Puck} from "@puckeditor/core";
import "@puckeditor/core/puck.css";

const fallbackData={root:{props:{title:"Trang chủ"}},content:[
  {type:"Hero",props:{id:"hero-1",kicker:"Gốm sứ Đại Long",title:"Không gian mang hồn gốm Việt",description:"Chỉnh sửa nội dung, hình ảnh và bố cục trực tiếp bằng kéo thả.",imageUrl:"https://gomsudailong.vn/images/hero-3.jpg"}},
  {type:"RichText",props:{id:"text-1",text:"Bắt đầu bằng cách kéo thêm component từ panel bên trái, chọn từng block để sửa nội dung ở panel bên phải."}},
  {type:"CTA",props:{id:"cta-1",label:"Khám phá sản phẩm",href:"/san-pham"}}
]};

const config={categories:{
  layout:{title:"Bố cục",components:["Section","Columns","Spacer"]},
  content:{title:"Nội dung",components:["Hero","Heading","RichText","Image","CTA"]},
  commerce:{title:"Dữ liệu",components:["ProductGrid","ProjectGrid"]}
},components:{
  Hero:{fields:{kicker:{type:"text"},title:{type:"text"},description:{type:"textarea"},imageUrl:{type:"text"}},defaultProps:{kicker:"Đại Long",title:"Tiêu đề hero",description:"Mô tả",imageUrl:"https://gomsudailong.vn/images/hero-3.jpg"},render:({kicker,title,description,imageUrl})=><section className="puck-preview-section"><div className="puck-hero" style={{backgroundImage:`url("${imageUrl}")`}}><div><div style={{fontSize:12,letterSpacing:".16em",textTransform:"uppercase",fontWeight:800}}>{kicker}</div><h1>{title}</h1><p>{description}</p></div></div></section>},
  Heading:{fields:{text:{type:"text"},level:{type:"select",options:[{label:"H2",value:"h2"},{label:"H3",value:"h3"}]}},defaultProps:{text:"Tiêu đề nội dung",level:"h2"},render:({text,level})=><section className="puck-preview-section">{level==="h3"?<h3 style={{fontSize:28,color:"#102a56"}}>{text}</h3>:<h2 style={{font:"600 40px Georgia,serif",color:"#102a56"}}>{text}</h2>}</section>},
  RichText:{fields:{text:{type:"textarea"}},defaultProps:{text:"Nội dung đoạn văn"},render:({text})=><section className="puck-preview-section"><div className="puck-rich">{text}</div></section>},
  Image:{fields:{src:{type:"text"},alt:{type:"text"},caption:{type:"text"}},defaultProps:{src:"https://gomsudailong.vn/images/hero-3.jpg",alt:"Ảnh Đại Long",caption:""},render:({src,alt,caption})=><section className="puck-preview-section"><img className="puck-image" src={src} alt={alt}/>{caption&&<p className="muted">{caption}</p>}</section>},
  CTA:{fields:{label:{type:"text"},href:{type:"text"}},defaultProps:{label:"Xem thêm",href:"/"},render:({label,href})=><section className="puck-preview-section"><a className="puck-cta" href={href}>{label}</a></section>},
  Section:{fields:{title:{type:"text"},body:{type:"textarea"},background:{type:"select",options:[{label:"Trắng",value:"#fff"},{label:"Xám nhạt",value:"#f6f7fb"},{label:"Xanh nhạt",value:"#eef4ff"}]}},defaultProps:{title:"Section",body:"Nội dung section",background:"#fff"},render:({title,body,background})=><section style={{background}}><div className="puck-preview-section"><h2 style={{font:"600 36px Georgia,serif",color:"#102a56"}}>{title}</h2><div className="puck-rich">{body}</div></div></section>},
  Columns:{fields:{leftTitle:{type:"text"},leftText:{type:"textarea"},rightTitle:{type:"text"},rightText:{type:"textarea"}},defaultProps:{leftTitle:"Cột trái",leftText:"Nội dung",rightTitle:"Cột phải",rightText:"Nội dung"},render:(p)=><section className="puck-preview-section"><div className="puck-columns"><div><h3>{p.leftTitle}</h3><p className="puck-rich">{p.leftText}</p></div><div><h3>{p.rightTitle}</h3><p className="puck-rich">{p.rightText}</p></div></div></section>},
  Spacer:{fields:{height:{type:"number",min:16,max:240}},defaultProps:{height:64},render:({height})=><div style={{height}}/>},
  ProductGrid:{fields:{title:{type:"text"},limit:{type:"number",min:1,max:12},category:{type:"text"}},defaultProps:{title:"Sản phẩm nổi bật",limit:6,category:"all"},render:({title,limit,category})=><section className="puck-preview-section"><h2 style={{font:"600 36px Georgia,serif",color:"#102a56"}}>{title}</h2><p className="muted">Query: category={category}, limit={limit}</p><div className="puck-grid">{Array.from({length:Math.min(limit,6)}).map((_,i)=><div className="puck-tile" key={i}><b>Sản phẩm {i+1}</b><p className="muted">Data binding sẽ dùng CMS query config, không copy dữ liệu sản phẩm vào page JSON.</p></div>)}</div></section>},
  ProjectGrid:{fields:{title:{type:"text"},limit:{type:"number",min:1,max:12}},defaultProps:{title:"Công trình tiêu biểu",limit:3},render:({title,limit})=><section className="puck-preview-section"><h2 style={{font:"600 36px Georgia,serif",color:"#102a56"}}>{title}</h2><div className="puck-grid">{Array.from({length:Math.min(limit,6)}).map((_,i)=><div className="puck-tile" key={i}><b>Công trình {i+1}</b><p className="muted">Project query placeholder.</p></div>)}</div></section>}
}};

async function jsonFetch(url,options){
  const r=await fetch(url,{...options,headers:{"content-type":"application/json",...(options?.headers||{})},cache:"no-store"});
  const body=await r.json().catch(()=>null);
  if(!r.ok){const e=new Error(body?.error||`HTTP ${r.status}`);e.status=r.status;throw e}
  return body;
}

export default function PuckBuilder(){
  const [data,setData]=useState(null);
  const [page,setPage]=useState(null);
  const [site,setSite]=useState(null);
  const [mode,setMode]=useState("loading");
  const [message,setMessage]=useState("");

  useEffect(()=>{void load()},[]);

  async function load(){
    try{
      let sites=await jsonFetch("/api/cms/sites?key=gomsudailong");
      let currentSite=Array.isArray(sites)?sites[0]:null;
      if(!currentSite){
        const created=await jsonFetch("/api/cms/sites",{method:"POST",body:JSON.stringify({key:"gomsudailong",name:"Gốm sứ Đại Long",primary_domain:"gomsudailong.vn",locales:["vi","en"],default_locale:"vi"})});
        currentSite=Array.isArray(created)?created[0]:created;
      }
      let pages=await jsonFetch(`/api/cms/pages?site_id=${encodeURIComponent(currentSite.id)}&path=${encodeURIComponent("/")}&locale=vi`);
      let currentPage=Array.isArray(pages)?pages[0]:null;
      if(!currentPage){
        const created=await jsonFetch("/api/cms/pages",{method:"POST",body:JSON.stringify({site_id:currentSite.id,title:"Trang chủ",slug:"",path:"/",locale:"vi",status:"draft",template:"default",data:fallbackData,seo:{}})});
        currentPage=Array.isArray(created)?created[0]:created;
      }
      setSite(currentSite);setPage(currentPage);setData(currentPage.data||fallbackData);setMode("supabase");setMessage("Đã kết nối CMS storage.");
    }catch(error){
      let local=fallbackData;
      try{const raw=localStorage.getItem("dailong:puck:home");if(raw)local=JSON.parse(raw)}catch{}
      setData(local);setMode("local");setMessage(error?.status===503?"Supabase chưa có env trên Vercel — đang dùng local draft.":"Storage chưa sẵn sàng — đang dùng local draft.");
    }
  }

  function onChange(next){
    setData(next);
    try{localStorage.setItem("dailong:puck:home",JSON.stringify(next))}catch{}
  }

  async function persist(status){
    if(!data)return;
    if(mode!=="supabase"||!page){
      try{localStorage.setItem("dailong:puck:home",JSON.stringify(data));setMessage("Đã lưu local draft. Chưa ghi vào Supabase.")}catch{setMessage("Không lưu được local draft.")}
      return;
    }
    try{
      setMessage("Đang lưu…");
      const nextVersion=(page.version||0)+1;
      const payload={data,status,version:nextVersion,updated_by:"legacy-admin"};
      if(status==="published")payload.published_at=new Date().toISOString();
      const rows=await jsonFetch(`/api/cms/pages/${page.id}`,{method:"PATCH",body:JSON.stringify(payload)});
      const updated=Array.isArray(rows)?rows[0]:rows;
      setPage(updated||{...page,...payload});
      await jsonFetch("/api/cms/versions",{method:"POST",body:JSON.stringify({page_id:page.id,version:nextVersion,status,data,seo:page.seo||{},created_by:"legacy-admin"})});
      setMessage(status==="published"?"Đã publish vào CMS store. Public renderer sẽ được nối ở bước tiếp theo.":"Đã lưu draft vào Supabase.");
    }catch(error){setMessage(error?.message||"Không thể lưu CMS.")}
  }

  if(!data)return <div style={{padding:30}}>Đang mở visual builder…</div>;
  return <div className="builder-shell">
    <div className="builder-banner"><b>Puck visual builder</b><span>{mode==="supabase"?"Persistence: Supabase":"Persistence: local fallback"}</span><button className="ghost" onClick={()=>persist("draft")}>Lưu nháp</button>{message&&<span style={{marginLeft:"auto"}}>{message}</span>}</div>
    <Puck config={config} data={data} onChange={onChange} onPublish={()=>persist("published")}/>
  </div>;
}
