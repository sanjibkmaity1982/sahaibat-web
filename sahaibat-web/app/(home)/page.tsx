"use client";
import { useState, useEffect, useRef } from "react";

const C = {
  teal:"#02C39A",tealDk:"#017367",tealXdk:"#024D42",
  cream:"#F9F5EE",warm:"#EDE8DF",dark:"#0F1F1C",charcoal:"#1E2D2A",
  text:"#2D3B38",muted:"#6B8078",white:"#FFFFFF",gold:"#D4A843",
  pink:"#E91E8C",blue:"#3B82F6",purple:"#8B5CF6",orange:"#F97316",
};

const PHOTOS = {
  kaderField:"/images/hero-kader-family.png",
  motherChild:"/images/__motherchild.png",
  posyandu:"/images/doctor-nurse.png",
};

// ── Helpers ────────────────────────────────────────────────────────────────────
function Counter({end,suffix="",prefix=""}:{end:number;suffix?:string;prefix?:string}){
  const [count,setCount]=useState(0);const ref=useRef<HTMLSpanElement>(null);const started=useRef(false);
  useEffect(()=>{const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting&&!started.current){started.current=true;const inc=end/60;let cur=0;const t=setInterval(()=>{cur+=inc;if(cur>=end){setCount(end);clearInterval(t);}else setCount(Math.floor(cur));},33);}},{threshold:0.5});if(ref.current)obs.observe(ref.current);return()=>obs.disconnect();},[end]);
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}
function FadeIn({children,delay=0,className=""}:{children:React.ReactNode;delay?:number;className?:string}){
  const ref=useRef<HTMLDivElement>(null);const [vis,setVis]=useState(false);
  useEffect(()=>{const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setVis(true);obs.disconnect();}},{threshold:0.08});if(ref.current)obs.observe(ref.current);return()=>obs.disconnect();},[]);
  return <div ref={ref} className={className} style={{opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(28px)",transition:`opacity 0.7s ease ${delay}ms,transform 0.7s ease ${delay}ms`}}>{children}</div>;
}
function Tag({label,color}:{label:string;color:string}){
  return <span style={{background:`${color}12`,border:`1px solid ${color}30`,color,fontSize:11,padding:"4px 10px",borderRadius:20,fontWeight:600}}>{label}</span>;
}

// ── Nav ────────────────────────────────────────────────────────────────────────
function Nav({lang,setLang}:{lang:"en"|"id";setLang:(l:"en"|"id")=>void}){
  const [scrolled,setScrolled]=useState(false);const [open,setOpen]=useState(false);
  useEffect(()=>{const fn=()=>setScrolled(window.scrollY>40);window.addEventListener("scroll",fn);return()=>window.removeEventListener("scroll",fn);},[]);
  const links:[string,string][]=lang==="en"
    ?[["#story","Our Story"],["#products","Products"],["#impact","Impact"],["#partners","Partners"],["#team","Team"],["#support","Support"]]
    :[["#story","Cerita"],["#products","Produk"],["#impact","Dampak"],["#partners","Mitra"],["#team","Tim"],["#support","Dukung"]];
  return(
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:scrolled?"rgba(15,31,28,0.96)":"transparent",backdropFilter:scrolled?"blur(14px)":"none",borderBottom:scrolled?"1px solid rgba(2,195,154,0.15)":"none",transition:"all 0.3s",padding:"0 24px"}}>
      <div style={{maxWidth:1200,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:64}}>
        <img src="/images/logo-horizontal@2x.png" alt="SahAIbat" style={{height:36,width:"auto",filter:"brightness(0) invert(1)"}}/>
        <div className="nav-desktop" style={{display:"flex",gap:22,alignItems:"center"}}>
          {links.map(([href,label])=>(<a key={href} href={href} style={{color:"rgba(255,255,255,0.7)",fontSize:13,fontWeight:500,textDecoration:"none",transition:"color 0.2s"}} onMouseEnter={e=>(e.target as HTMLElement).style.color=C.teal} onMouseLeave={e=>(e.target as HTMLElement).style.color="rgba(255,255,255,0.7)"}>{label}</a>))}
          <div style={{display:"flex",gap:3,background:"rgba(255,255,255,0.08)",borderRadius:20,padding:3}}>
            {(["en","id"] as const).map(l=>(<button key={l} onClick={()=>setLang(l)} style={{background:lang===l?C.teal:"transparent",color:lang===l?C.dark:"rgba(255,255,255,0.6)",border:"none",borderRadius:16,padding:"4px 12px",fontSize:12,fontWeight:700,cursor:"pointer",transition:"all 0.2s"}}>{l==="en"?"EN":"ID"}</button>))}
          </div>
          <a href="#support" style={{background:C.teal,color:C.dark,padding:"8px 20px",borderRadius:20,fontSize:13,fontWeight:700,textDecoration:"none"}}>{lang==="en"?"Fuel the Mission":"Dukung Kami"}</a>
        </div>
        <button onClick={()=>setOpen(!open)} className="nav-mobile-btn" style={{background:"none",border:"none",color:C.white,fontSize:24,cursor:"pointer"}}>{open?"✕":"☰"}</button>
      </div>
      {open&&(<div style={{background:C.dark,padding:"20px 24px",borderTop:"1px solid rgba(2,195,154,0.15)"}}>
        {links.map(([href,label])=>(<a key={href} href={href} onClick={()=>setOpen(false)} style={{display:"block",color:"rgba(255,255,255,0.8)",fontSize:16,fontWeight:500,textDecoration:"none",padding:"12px 0",borderBottom:"1px solid rgba(255,255,255,0.05)"}}>{label}</a>))}
        <div style={{marginTop:16,display:"flex",gap:8}}>
          {(["en","id"] as const).map(l=>(<button key={l} onClick={()=>setLang(l)} style={{background:lang===l?C.teal:"rgba(255,255,255,0.08)",color:lang===l?C.dark:"rgba(255,255,255,0.6)",border:"none",borderRadius:16,padding:"6px 16px",fontSize:13,fontWeight:700,cursor:"pointer"}}>{l==="en"?"English":"Bahasa"}</button>))}
        </div>
      </div>)}
    </nav>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
export default function HomePage(){
  const [lang,setLang]=useState<"en"|"id">("en");

  return(<>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
      html{scroll-behavior:smooth}
      body{background:${C.dark};font-family:'Plus Jakarta Sans',sans-serif;color:${C.text};overflow-x:hidden}
      ::selection{background:${C.teal};color:${C.dark}}
      .section-max{max-width:1200px;margin:0 auto;padding:0 24px}
      .display-font{font-family:'Playfair Display',serif}
      .teal-glow{position:absolute;border-radius:50%;filter:blur(100px);pointer-events:none;opacity:0.12}
      .nav-desktop{display:flex!important}.nav-mobile-btn{display:none!important}
      .hero-grid{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center}
      .two-col{display:grid;grid-template-columns:1fr 1fr;gap:40px}
      .three-col{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
      .four-col{display:grid;grid-template-columns:repeat(4,1fr);gap:24px}
      .footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:40px}
      .photo-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
      .social-link{display:flex;align-items:center;gap:8px;color:rgba(255,255,255,0.5);text-decoration:none;font-size:13px;transition:color 0.2s;padding:6px 0}
      .social-link:hover{color:${C.teal}}
      @media(max-width:960px){
        .nav-desktop{display:none!important}.nav-mobile-btn{display:block!important}
        .hero-grid,.two-col{grid-template-columns:1fr!important;gap:32px!important}
        .three-col{grid-template-columns:1fr!important;gap:20px!important}
        .four-col{grid-template-columns:repeat(2,1fr)!important}
        .footer-grid{grid-template-columns:1fr 1fr!important;gap:32px!important}
        .photo-grid{grid-template-columns:1fr 1fr!important}
      }
      @media(max-width:480px){.four-col{grid-template-columns:1fr!important}.section-max{padding:0 16px}.footer-grid{grid-template-columns:1fr!important}}
      @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
    `}</style>

    <Nav lang={lang} setLang={setLang}/>

    {/* ══ HERO ═══════════════════════════════════════════════════════════════ */}
    <section style={{minHeight:"100vh",position:"relative",display:"flex",alignItems:"center",overflow:"hidden",background:`linear-gradient(160deg,${C.dark} 0%,${C.charcoal} 100%)`}}>
      <div className="teal-glow" style={{width:600,height:600,background:C.teal,top:-200,right:-100}}/>
      <div className="teal-glow" style={{width:400,height:400,background:"#017367",bottom:-100,left:-100}}/>
      <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(2,195,154,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(2,195,154,0.05) 1px,transparent 1px)",backgroundSize:"60px 60px",pointerEvents:"none"}}/>
      <div className="section-max" style={{position:"relative",zIndex:1,paddingTop:120,paddingBottom:80,width:"100%"}}>
        <div className="hero-grid">
          <div>
            <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(2,195,154,0.1)",border:"1px solid rgba(2,195,154,0.3)",borderRadius:20,padding:"6px 16px",marginBottom:24}}>
              <span style={{width:6,height:6,borderRadius:"50%",background:C.teal,display:"inline-block",flexShrink:0}}/>
              <span style={{color:C.teal,fontSize:12,fontWeight:600,letterSpacing:1}}>{lang==="en"?"BUILT IN CANADA. FOR INDONESIA.":"DIBANGUN DI KANADA. UNTUK INDONESIA."}</span>
            </div>
            <h1 className="display-font" style={{fontSize:"clamp(40px,5vw,68px)",color:C.white,lineHeight:1.1,marginBottom:24}}>
              {lang==="en"?"When a mother's life depends on":""}{lang==="id"?"Saat nyawa seorang ibu bergantung pada":""}<br/>
              <span style={{color:C.teal}}>{lang==="en"?"one message.":"satu pesan."}</span>
            </h1>
            <p style={{fontSize:18,color:"rgba(255,255,255,0.65)",lineHeight:1.8,marginBottom:32,maxWidth:480}}>
              {lang==="en"
                ?"SahAIbat gives Indonesia's 1.4 million community health workers the tool they deserve — a WhatsApp-first AI triage system that works without internet, without extra cost, and without disrupting the way Kaders already work."
                :"SahAIbat memberi 1,4 juta kader kesehatan Indonesia alat yang layak mereka dapatkan — sistem triase AI berbasis WhatsApp yang bekerja tanpa internet, tanpa biaya tambahan, dan tanpa mengubah cara Kader bekerja."}
            </p>
            <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
              <a href="#story" style={{background:C.teal,color:C.dark,padding:"14px 28px",borderRadius:12,fontSize:15,fontWeight:700,textDecoration:"none"}}>{lang==="en"?"Read Our Story ↓":"Baca Cerita Kami ↓"}</a>
              <a href="#support" style={{border:"1.5px solid rgba(2,195,154,0.4)",color:C.white,padding:"14px 28px",borderRadius:12,fontSize:15,fontWeight:600,textDecoration:"none"}}>{lang==="en"?"Fuel the Mission":"Dukung Misi Kami"}</a>
            </div>
          </div>
          <div>
            <div style={{background:"rgba(2,195,154,0.06)",border:"1px solid rgba(2,195,154,0.2)",borderRadius:24,padding:32,position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(90deg,transparent,#02C39A,transparent)"}}/>
              <div style={{fontFamily:"monospace",fontSize:13}}>
                <div style={{color:C.muted,fontSize:11,textAlign:"center",marginBottom:16}}>💬 SahAIbat · Kasih Module</div>
                {[
                  {msg:"Anak saya 3 thn, demam 39.8 sudah 5 jam",u:true,urg:false},
                  {msg:"❤️‍🩹 Kasih — Panduan Keluarga\n\nApakah masih mau minum?\n1 = Ya  2 = Tidak",u:false,urg:false},
                  {msg:"1, sedikit-sedikit",u:true,urg:false},
                  {msg:"Bagus. Itu tanda yang baik. 💙\n\nApakah ada kejang atau kaku leher?\n1 = Ya  2 = Tidak",u:false,urg:false},
                  {msg:"2",u:true,urg:false},
                  {msg:"🟡 PANTAU KETAT\n\nDemam tinggi tapi aman untuk dipantau di rumah.\n• Kompres hangat\n• Minum sedikit tapi sering\n• Pantau tiap 30 menit\n\nJika >40°C atau kejang → segera ke IGD.",u:false,urg:false},
                  {msg:"Terima kasih... saya lebih tenang 🙏",u:true,urg:false},
                ].map((m,i)=>(<div key={i} style={{display:"flex",justifyContent:m.u?"flex-end":"flex-start",marginBottom:8}}>
                  <div style={{background:m.urg?"rgba(232,72,85,0.15)":m.u?"rgba(2,195,154,0.15)":"rgba(255,255,255,0.06)",border:m.urg?"1px solid rgba(232,72,85,0.3)":m.u?"1px solid rgba(2,195,154,0.3)":"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:"8px 12px",maxWidth:"80%",color:m.urg?"#FF6B6B":m.u?C.teal:"rgba(255,255,255,0.8)",fontSize:12,lineHeight:1.5,whiteSpace:"pre-line"}}>{m.msg}</div>
                </div>))}
              </div>
              <div style={{marginTop:12,paddingTop:12,borderTop:"1px solid rgba(255,255,255,0.06)",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
                <span style={{color:C.muted,fontSize:11}}>✓ {lang==="en"?"Saved locally · Syncs when signal returns":"Tersimpan lokal · Tersinkron saat sinyal kembali"}</span>
                <span style={{color:C.teal,fontSize:11}}>📵 {lang==="en"?"Works offline":"Bekerja offline"}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="four-col" style={{marginTop:64,paddingTop:40,borderTop:"1px solid rgba(255,255,255,0.08)"}}>
          {[
            {n:61000,s:"+",label:lang==="en"?"Community Health Workers":"Kader Kesehatan",sub:lang==="en"?"in our target network":"dalam jaringan target kami"},
            {n:8,s:"+ modules",label:lang==="en"?"Clinical Modules":"Modul Klinis",sub:"maternal · child · TB · dengue · HIV · malaria"},
            {n:3,s:"",label:lang==="en"?"Field Partners":"Mitra Lapangan",sub:lang==="en"?"NTT · Papua · Eastern Indonesia":"NTT · Papua · Indonesia Timur"},
            {n:100,s:"%",label:lang==="en"?"Data Stays in Indonesia":"Data di Indonesia",sub:"AWS Jakarta · AES-256"},
          ].map(({n,s,label,sub})=>(<div key={label} style={{textAlign:"center"}}>
            <div className="display-font" style={{fontSize:36,color:C.teal,fontWeight:900,lineHeight:1}}><Counter end={n} suffix={s}/></div>
            <div style={{color:C.white,fontSize:13,fontWeight:600,marginTop:8}}>{label}</div>
            <div style={{color:C.muted,fontSize:11,marginTop:4}}>{sub}</div>
          </div>))}
        </div>
      </div>
    </section>

    {/* ══ STORY ══════════════════════════════════════════════════════════════ */}
    <section id="story" style={{background:C.cream,padding:"100px 0"}}>
      <div className="section-max">
        <FadeIn>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:`${C.tealDk}20`,border:`1px solid ${C.tealDk}40`,borderRadius:20,padding:"6px 16px",marginBottom:16}}>
            <span style={{color:C.tealDk,fontSize:12,fontWeight:600,letterSpacing:1}}>{lang==="en"?"OUR STORY":"CERITA KAMI"}</span>
          </div>
          <h2 className="display-font" style={{fontSize:"clamp(32px,4vw,52px)",color:C.dark,lineHeight:1.2,marginBottom:24,maxWidth:700}}>
            {lang==="en"?"A Kader. A phone. A life that shouldn't have been lost.":"Seorang Kader. Sebuah ponsel. Sebuah nyawa yang tak seharusnya hilang."}
          </h2>
        </FadeIn>
        <FadeIn delay={100}>
          <div className="photo-grid" style={{marginBottom:48}}>
            {[
              {src:PHOTOS.kaderField,label:lang==="en"?"Kader in the field":"Kader di lapangan"},
              {src:PHOTOS.motherChild,label:lang==="en"?"Mother & child care":"Ibu dan anak"},
              {src:PHOTOS.posyandu,label:lang==="en"?"Posyandu session":"Sesi Posyandu"},
            ].map(({src,label})=>(<div key={label} style={{position:"relative",overflow:"hidden",borderRadius:16}}>
              <img src={src} alt={label} style={{width:"100%",height:200,objectFit:"cover",borderRadius:16,filter:"brightness(0.85)saturate(1.1)"}}/>
              <div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent,rgba(15,31,28,0.7))",padding:"12px 14px",borderRadius:"0 0 16px 16px"}}>
                <span style={{color:C.white,fontSize:11,fontWeight:600}}>🌿 {label}</span>
              </div>
            </div>))}
          </div>
        </FadeIn>
        <div className="two-col">
          <FadeIn delay={100}>
            <div style={{fontSize:16,color:C.text,lineHeight:1.9}}>
              <p style={{marginBottom:20}}>{lang==="en"
                ?"In the villages of East Nusa Tenggara, a community health worker called a Kader visits families on foot. She carries a KMS book, a pen, and a weighing scale. She knows every family by name. But when a pregnant mother shows signs of preeclampsia at 2am — she has no way to know what to do next, and no doctor within hours."
                :"Di desa-desa Nusa Tenggara Timur, seorang Kader mengunjungi keluarga dengan berjalan kaki. Ia membawa buku KMS, pena, dan timbangan. Ia mengenal setiap keluarga dengan nama. Namun saat seorang ibu hamil menunjukkan tanda preeklampsia jam 2 pagi — ia tidak tahu harus berbuat apa, dan tidak ada dokter dalam jangkauan berjam-jam."}</p>
              <p style={{marginBottom:20}}>{lang==="en"
                ?"Indonesia's 1.4 million Kaders are one of the most remarkable public health forces in the world. They show up — every day, in every village, in every condition — driven entirely by care for their community. SahAIbat exists to give that dedication the tools it deserves."
                :"1,4 juta Kader Indonesia adalah salah satu kekuatan kesehatan masyarakat paling luar biasa di dunia. Mereka hadir — setiap hari, di setiap desa, dalam segala kondisi — didorong sepenuhnya oleh kepedulian terhadap komunitas mereka. SahAIbat hadir untuk memberi dedikasi itu alat yang layak."}</p>
              <p style={{fontWeight:700,fontSize:18,color:C.dark}}>{lang==="en"?"SahAIbat was built for her.":"SahAIbat dibangun untuk mereka."}</p>
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <div style={{background:C.dark,borderRadius:20,padding:32,color:C.white}}>
              <div style={{fontSize:48,marginBottom:16}}>🌿</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,lineHeight:1.4,marginBottom:16}}>
                {lang==="en"?<>&ldquo;SahAIbat&rdquo; means <em style={{color:C.teal}}>companion</em> in Bahasa Indonesia.</>:<>&ldquo;SahAIbat&rdquo; berarti <em style={{color:C.teal}}>teman setia</em> dalam Bahasa Indonesia.</>}
              </div>
              <p style={{color:"rgba(255,255,255,0.6)",fontSize:15,lineHeight:1.7}}>
                {lang==="en"?"Not a diagnostic engine. Not a replacement for doctors. A companion — something that walks alongside the Kader, the midwife, the worried parent — giving confidence when it's needed most."
                :"Bukan mesin diagnostik. Bukan pengganti dokter. Sebuah teman — yang berjalan bersama Kader, bidan, orang tua yang khawatir — memberikan keyakinan saat paling dibutuhkan."}
              </p>
              <div style={{marginTop:24,paddingTop:24,borderTop:"1px solid rgba(255,255,255,0.1)",display:"flex",gap:20,flexWrap:"wrap"}}>
                {[{l:"WhatsApp-first",s:lang==="en"?"no app download":"tidak perlu unduh"},{l:lang==="en"?"Offline-capable":"Bisa Offline",s:lang==="en"?"no signal needed":"tanpa sinyal"},{l:lang==="en"?"Free forever":"Gratis Selamanya",s:lang==="en"?"for communities":"untuk komunitas"}].map(({l,s})=>(<div key={l}><div style={{color:C.teal,fontWeight:700,fontSize:15}}>{l}</div><div style={{color:"rgba(255,255,255,0.5)",fontSize:11}}>{s}</div></div>))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>

    {/* ══ PRODUCTS ═══════════════════════════════════════════════════════════ */}
    <ProductsSection lang={lang}/>

    {/* ══ IMPACT ═════════════════════════════════════════════════════════════ */}
    <ImpactSection lang={lang}/>

    {/* ══ FIELD PARTNERS ═════════════════════════════════════════════════════ */}
    <FieldPartnersSection lang={lang}/>

    {/* ══ TEAM ════════════════════════════════════════════════════════════════ */}
    <TeamSection lang={lang}/>

    {/* ══ SUPPORT ════════════════════════════════════════════════════════════ */}
    <section id="support" style={{background:C.dark,padding:"100px 0",position:"relative",overflow:"hidden"}}>
      <div className="teal-glow" style={{width:600,height:600,background:C.teal,bottom:"-20%",right:"-10%"}}/>
      <div className="section-max" style={{position:"relative",zIndex:1}}>
        <FadeIn>
          <div style={{textAlign:"center",marginBottom:64}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(2,195,154,0.1)",border:"1px solid rgba(2,195,154,0.3)",borderRadius:20,padding:"6px 16px",marginBottom:16}}>
              <span style={{color:C.teal,fontSize:12,fontWeight:600,letterSpacing:1}}>{lang==="en"?"FUEL THE MISSION":"DUKUNG MISI KAMI"}</span>
            </div>
            <h2 className="display-font" style={{fontSize:"clamp(32px,4vw,52px)",color:C.white,lineHeight:1.2,marginBottom:16}}>
              {lang==="en"?<>We don&apos;t ask for donations.<br/><span style={{color:C.teal}}>We ask for belief.</span></>:<>Kami tidak meminta donasi.<br/><span style={{color:C.teal}}>Kami meminta kepercayaan.</span></>}
            </h2>
            <p style={{color:"rgba(255,255,255,0.5)",fontSize:16,maxWidth:560,lineHeight:1.8,margin:"0 auto"}}>
              {lang==="en"?"SahAIbat is free for every community it serves. The only way to keep it that way is through people who believe healthcare equity is worth fighting for."
              :"SahAIbat gratis untuk setiap komunitas yang dilayani. Satu-satunya cara mempertahankan ini adalah melalui orang-orang yang percaya bahwa kesetaraan layanan kesehatan layak diperjuangkan."}
            </p>
          </div>
        </FadeIn>
        <div className="three-col" style={{marginBottom:48}}>
          {[
            {icon:"☕",title:lang==="en"?"Buy the team a coffee":"Traktir tim kopi",amount:"$5",desc:lang==="en"?"Keeps the server running for a day. Covers one Kader's WhatsApp session costs for a week.":"Menjaga server berjalan sehari.",cta:lang==="en"?"Support on Ko-fi":"Dukung di Ko-fi",href:"https://ko-fi.com/sahaibat",color:C.teal,featured:false},
            {icon:"🌱",title:lang==="en"?"Sponsor a Posyandu session":"Sponsori sesi Posyandu",amount:"$25",desc:lang==="en"?"Funds AI triage support for an entire Posyandu session — 20+ children, mothers, and newborns screened.":"Mendanai dukungan triase AI untuk seluruh sesi Posyandu.",cta:lang==="en"?"Sponsor a Session":"Sponsori Sesi",href:"https://ko-fi.com/sahaibat",color:C.gold,featured:true},
            {icon:"🤝",title:lang==="en"?"Partner with us":"Bermitra dengan kami",amount:lang==="en"?"Let's talk":"Mari bicara",desc:lang==="en"?"NGO, researcher, funder, or government partner — every partnership expands our reach.":"NGO, peneliti, donatur, atau mitra pemerintah.",cta:lang==="en"?"Get in Touch":"Hubungi Kami",href:"mailto:admin@sahaibat.com?subject=Partnership Inquiry",color:C.pink,featured:false},
          ].map(({icon,title,amount,desc,cta,href,color,featured})=>(<FadeIn key={title} delay={100}>
            <div style={{background:featured?`linear-gradient(135deg,${C.tealXdk},${C.tealDk})`:"rgba(255,255,255,0.03)",border:`1.5px solid ${featured?C.teal:"rgba(255,255,255,0.08)"}`,borderRadius:20,padding:32,display:"flex",flexDirection:"column",height:"100%",transform:featured?"scale(1.03)":"scale(1)"}}>
              {featured&&<div style={{color:C.teal,fontWeight:700,fontSize:11,letterSpacing:1,marginBottom:12}}>⭐ {lang==="en"?"MOST IMPACTFUL":"PALING BERDAMPAK"}</div>}
              <div style={{fontSize:36,marginBottom:12}}>{icon}</div>
              <div className="display-font" style={{color,fontSize:28,fontWeight:900,marginBottom:8}}>{amount}</div>
              <div style={{color:C.white,fontWeight:700,fontSize:16,marginBottom:12}}>{title}</div>
              <p style={{color:"rgba(255,255,255,0.5)",fontSize:13,lineHeight:1.7,flex:1}}>{desc}</p>
              <a href={href} style={{display:"block",marginTop:24,textAlign:"center",padding:"12px 24px",borderRadius:12,background:featured?C.teal:"transparent",border:`1.5px solid ${featured?C.teal:"rgba(255,255,255,0.2)"}`,color:featured?C.dark:C.white,fontWeight:700,fontSize:14,textDecoration:"none"}}>{cta} →</a>
            </div>
          </FadeIn>))}
        </div>
        <FadeIn>
          <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:16,padding:32,display:"flex",gap:24,alignItems:"flex-start",flexWrap:"wrap"}}>
            <div style={{fontSize:40}}>🔍</div>
            <div style={{flex:1,minWidth:240}}>
              <div style={{color:C.white,fontWeight:700,fontSize:18,marginBottom:8}}>{lang==="en"?"Full transparency. Always.":"Transparansi penuh. Selalu."}</div>
              <p style={{color:"rgba(255,255,255,0.5)",fontSize:14,lineHeight:1.7,maxWidth:600}}>{lang==="en"?"Every dollar of support received will be publicly recorded — server costs, team stipends, field visits, clinical validation. You'll always know where your support goes.":"Setiap dukungan yang diterima akan dicatat secara publik — biaya server, tunjangan tim, kunjungan lapangan, validasi klinis."}</p>
              <div style={{marginTop:16,display:"flex",gap:12,flexWrap:"wrap"}}>
                {(lang==="en"?["Server infrastructure","Kader training","Field visits NTT","Clinical validation","Product development"]:["Infrastruktur server","Pelatihan Kader","Kunjungan lapangan NTT","Validasi klinis","Pengembangan produk"]).map(item=>(<span key={item} style={{background:"rgba(2,195,154,0.08)",border:"1px solid rgba(2,195,154,0.15)",color:C.teal,fontSize:12,padding:"4px 12px",borderRadius:20}}>{item}</span>))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>

    {/* ══ FOOTER ═════════════════════════════════════════════════════════════ */}
    <footer style={{background:C.charcoal,borderTop:"1px solid rgba(2,195,154,0.1)",padding:"56px 0 32px"}}>
      <div className="section-max">
        <div className="footer-grid" style={{marginBottom:48}}>
          <div>
            <div style={{marginBottom:16}}><img src="/images/logo-horizontal@2x.png" alt="SahAIbat" style={{height:32,width:"auto",filter:"brightness(0) invert(1)",opacity:0.85}}/></div>
            <p style={{color:"rgba(255,255,255,0.4)",fontSize:13,lineHeight:1.7,maxWidth:280,marginBottom:16}}>{lang==="en"?"WhatsApp-first AI clinical triage for Community Health Workers in Indonesia. Free for communities. Always.":"Triase klinis AI berbasis WhatsApp untuk Kader Kesehatan Indonesia. Gratis untuk komunitas. Selamanya."}</p>
            <p style={{color:"rgba(255,255,255,0.18)",fontSize:11,lineHeight:1.7}}>All IP owned by<br/><strong style={{color:"rgba(255,255,255,0.3)"}}>Vinatra · 11679210 Canada Inc</strong><br/>Terdaftar PSE Lingkup Privat Asing<br/>NIB: 1202260248509</p>
          </div>
          <div>
            <div style={{color:C.teal,fontWeight:700,fontSize:12,letterSpacing:1,marginBottom:16}}>PLATFORM</div>
            {([["#story",lang==="en"?"Our Story":"Cerita Kami"],["#products",lang==="en"?"Products":"Produk"],["#partners",lang==="en"?"Field Partners":"Mitra Lapangan"],["#team",lang==="en"?"Team":"Tim"],["#support",lang==="en"?"Support us":"Dukung kami"]] as [string,string][]).map(([href,label])=>(<a key={label} href={href} style={{display:"block",color:"rgba(255,255,255,0.4)",fontSize:13,textDecoration:"none",marginBottom:9,transition:"color 0.2s"}} onMouseEnter={e=>(e.target as HTMLElement).style.color=C.teal} onMouseLeave={e=>(e.target as HTMLElement).style.color="rgba(255,255,255,0.4)"}>{label}</a>))}
          </div>
          <div>
            <div style={{color:C.teal,fontWeight:700,fontSize:12,letterSpacing:1,marginBottom:16}}>CONNECT</div>
            {([["📧","admin@sahaibat.com","mailto:admin@sahaibat.com"],["📸","sahaibat_health","https://instagram.com/sahaibat_health"],["▶️","@SahaibatHealth","https://youtube.com/@SahaibatHealth"],["🎵","@sahaibat","https://tiktok.com/@sahaibat"],["💼","LinkedIn","https://www.linkedin.com/company/110529968/"],["💬","+62 819 1866 9241","https://wa.me/6281918669241"]] as [string,string,string][]).map(([icon,label,href])=>(<a key={label} href={href} target={href.startsWith("http")?"_blank":"_self"} className="social-link"><span style={{fontSize:14,width:18,textAlign:"center"}}>{icon}</span><span>{label}</span></a>))}
          </div>
          <div>
            <div style={{color:C.teal,fontWeight:700,fontSize:12,letterSpacing:1,marginBottom:16}}>LEGAL</div>
            {([["Privacy Policy","/privacy"],["Terms of Use","/terms"],["Contact","/contact"]] as [string,string][]).map(([label,href])=>(<a key={label} href={href} style={{display:"block",color:"rgba(255,255,255,0.4)",fontSize:13,textDecoration:"none",marginBottom:9}} onMouseEnter={e=>(e.target as HTMLElement).style.color=C.teal} onMouseLeave={e=>(e.target as HTMLElement).style.color="rgba(255,255,255,0.4)"}>{label}</a>))}
          </div>
        </div>
        <div style={{borderTop:"1px solid rgba(255,255,255,0.06)",paddingTop:24,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
          <span style={{color:"rgba(255,255,255,0.2)",fontSize:12}}>© 2026 SahAIbat Foundation · IP owned by Vinatra (11679210 Canada Inc) · All rights reserved</span>
          <span style={{color:"rgba(255,255,255,0.2)",fontSize:12}}>Not a diagnostic tool · Bukan pengganti dokter</span>
        </div>
      </div>
    </footer>
  </>);
}

// ══════════════════════════════════════════════════════════════════════════════
// PRODUCTS — 5 tabs with story
// ══════════════════════════════════════════════════════════════════════════════
function ProductsSection({lang}:{lang:"en"|"id"}){
  const [active,setActive]=useState(0);

  const tabs=[
    {
      id:0,
      icon:"❤️‍🩹",
      label:"Kasih",
      sublabel:lang==="en"?"Family Chat":"Chat Keluarga",
      accent:C.teal,
      headline:lang==="en"?"2:47 AM. A mother. A fever. A phone.":"Pukul 02:47. Seorang ibu. Demam. Sebuah ponsel.",
      story:lang==="en"
        ?"Ibu Dewi is alone. Her husband is working in Surabaya. Rizky — three years old — has had a fever of 39.8°C for five hours and won't stop crying. The nearest clinic opens at 8am.\n\nShe doesn't know if this is dangerous. She opens WhatsApp. She messages Kasih.\n\nIn 90 seconds, she has a structured risk assessment, a care plan, and something she didn't have before: clarity. Kasih told her what to watch for, what to do, and exactly when to go to the emergency room.\n\nBy morning, Rizky's fever had broken. Ibu Dewi had slept, a little. Kasih had been there."
        :"Ibu Dewi sendirian. Suaminya sedang bekerja di Surabaya. Rizky — tiga tahun — sudah demam 39,8°C selama lima jam dan tidak berhenti menangis. Klinik terdekat buka jam 8 pagi.\n\nIa tidak tahu apakah ini berbahaya. Ia membuka WhatsApp. Ia mengirim pesan ke Kasih.\n\nDalam 90 detik, ia mendapat penilaian risiko terstruktur, rencana perawatan, dan sesuatu yang tidak ia miliki sebelumnya: kejelasan. Kasih memberinya tahu apa yang harus diperhatikan, apa yang harus dilakukan, dan kapan harus pergi ke IGD.\n\nPagi harinya, demam Rizky turun. Ibu Dewi sempat tidur, sedikit. Kasih ada di sana.",
      features:lang==="en"
        ?["Responds in Bahasa Indonesia — warm, not clinical","Structured risk levels: Monitor · Watch · Clinic · Emergency","No app download needed — WhatsApp only","Works at 3 AM with zero internet","Designed for parents, grandparents, caregivers"]
        :["Menjawab dalam Bahasa Indonesia — hangat, tidak klinis","Tingkat risiko terstruktur: Pantau · Waspada · Klinik · Darurat","Tidak perlu unduh app — WhatsApp saja","Bekerja pukul 3 pagi tanpa internet","Dirancang untuk orang tua dan pengasuh"],
      messages:[
        {msg:"Anak saya 3 thn, demam 39.8 sudah 5 jam",u:true,urg:false},
        {msg:"❤️‍🩹 Kasih — Panduan Keluarga\n\nSaya mendengar Anda, Ibu. Masih mau minum?\n1=Ya  2=Tidak",u:false,urg:false},
        {msg:"1, sedikit-sedikit",u:true,urg:false},
        {msg:"Bagus, itu tanda baik 💙\n\nAda kejang atau kaku leher?\n1=Ya  2=Tidak",u:false,urg:false},
        {msg:"2",u:true,urg:false},
        {msg:"🟡 PANTAU KETAT\n\nAman dipantau di rumah.\n• Kompres hangat\n• Minum sedikit tapi sering\n• Pantau tiap 30 menit\n\nJika >40°C atau kejang → IGD segera.",u:false,urg:false},
        {msg:"Terima kasih, lebih tenang sekarang 🙏",u:true,urg:false},
      ],
    },
    {
      id:1,
      icon:"📱",
      label:"Kader WhatsApp",
      sublabel:lang==="en"?"Professional Triage":"Triase Profesional",
      accent:C.pink,
      headline:lang==="en"?"The Kader who catches what no chart could.":"Kader yang menangkap apa yang tidak terlihat di KMS.",
      story:lang==="en"
        ?"Bidan Sari has been a Kader for eleven years in Kefamenanu, NTT. She knows every family by name. Today she is with a new mother — three weeks postpartum. Something feels wrong. The mother is pale, barely speaking. No doctor within reach.\n\nShe opens SahAIbat. She types. In seconds, a structured clinical module walks her through the right questions — in the right order.\n\nTwo answers in: 🔴 DARURAT. Sari makes the call. Bu Ani is at the Puskesmas within 40 minutes. Postpartum haemorrhage, early infection. Treated in time.\n\nSari always trusted her instincts. SahAIbat gave her the protocol to act on them."
        :"Bidan Sari sudah menjadi Kader selama sebelas tahun di Kefamenanu, NTT. Ia mengenal setiap keluarga dengan nama. Hari ini ia bersama ibu baru — tiga minggu setelah melahirkan. Ada sesuatu yang terasa tidak beres. Ibu itu pucat, hampir tidak berbicara. Tidak ada dokter dalam jangkauan.\n\nIa membuka SahAIbat. Ia mengetik. Dalam hitungan detik, modul klinis terstruktur membimbingnya melalui pertanyaan yang tepat — dalam urutan yang benar.\n\nDua jawaban: 🔴 DARURAT. Sari membuat panggilan. Bu Ani di Puskesmas dalam 40 menit. Perdarahan postpartum, infeksi awal. Ditangani tepat waktu.\n\nSari selalu mempercayai instingnya. SahAIbat memberinya protokol untuk bertindak.",
      features:lang==="en"
        ?["4 clinical modules: Maternal · Child · Neonatal · Posyandu","Follows Buku KIA (Permenkes 2/2020) exactly","RUJUK alerts with Puskesmas name","Visit records sync to NGO dashboard","Works online and offline"]
        :["4 modul klinis: Maternal · Anak · Neonatal · Posyandu","Mengikuti Buku KIA (Permenkes 2/2020) persis","Peringatan RUJUK dengan nama Puskesmas","Catatan kunjungan tersinkron ke dashboard NGO","Bekerja online dan offline"],
      messages:[
        {msg:"Bu Ani, 24th, 3mgg postpartum, pucat, bicara pelan",u:true,urg:false},
        {msg:"🩺 Modul Ibu Nifas\n\nPerdarahan >2 pembalut/jam?\n1=Ya  2=Tidak",u:false,urg:false},
        {msg:"1",u:true,urg:false},
        {msg:"Darah berbau tidak normal?\n1=Ya  2=Tidak",u:false,urg:false},
        {msg:"1",u:true,urg:false},
        {msg:"🔴 DARURAT — RUJUK SEGERA\n\nPerdarahan postpartum + infeksi nifas.\n\n• Jangan tinggalkan pasien\n• Hubungi Puskesmas Kefamenanu\n• Catat waktu & kondisi ibu",u:false,urg:true},
      ],
    },
    {
      id:2,
      icon:"📵",
      label:"Kader Offline",
      sublabel:lang==="en"?"Zero Network Mode":"Mode Tanpa Jaringan",
      accent:C.gold,
      headline:lang==="en"?"No signal. No WiFi. No problem.":"Tidak ada sinyal. Tidak ada WiFi. Tidak masalah.",
      story:lang==="en"
        ?"In Alor, Flores, and the highlands of Timor — entire districts where 4G is a rumour and 2G drops out by noon — Kaders still make their rounds. Every day. Rain or shine.\n\nStandard digital health tools fail here. They need APIs. They need cloud sync. They need data — and data costs money the Kader doesn't have.\n\nSahAIbat Offline runs the entire WHO growth engine, all KMS danger sign rules, and every referral protocol — locally, on the Kader's phone, with zero network dependency.\n\nWhen signal returns — whether it's an hour or three days later — every visit syncs automatically to the Posyandu dashboard. Nothing is lost."
        :"Di Alor, Flores, dan dataran tinggi Timor — seluruh kabupaten di mana 4G hanya kabar burung dan 2G hilang sebelum siang — para Kader tetap bertugas. Setiap hari. Hujan atau panas.\n\nAlat kesehatan digital standar gagal di sini. Mereka butuh API. Sinkronisasi cloud. Data — dan data membutuhkan biaya yang tidak dimiliki Kader.\n\nSahAIbat Offline menjalankan seluruh engine pertumbuhan WHO, semua aturan tanda bahaya KMS, dan setiap protokol rujukan — secara lokal, di ponsel Kader, tanpa ketergantungan jaringan sama sekali.\n\nKetika sinyal kembali — satu jam atau tiga hari kemudian — setiap kunjungan tersinkron otomatis ke dashboard Posyandu. Tidak ada yang hilang.",
      features:lang==="en"
        ?["100% offline — zero network dependency","WHO growth calculations run locally on device","All danger sign rules hardcoded — no AI API needed","Auto-sync when any signal returns","Works on basic 2G WhatsApp phones"]
        :["100% offline — nol ketergantungan jaringan","Kalkulasi pertumbuhan WHO berjalan lokal di perangkat","Semua aturan tanda bahaya dikodekan tetap","Sinkronisasi otomatis saat sinyal kembali","Bekerja di ponsel 2G sederhana"],
      messages:[
        {msg:"📵 Tidak ada sinyal\nMode Offline: AKTIF\nSemua triase berjalan secara lokal",u:false,urg:false},
        {msg:"Bayi 6 hari, tidak mau menyusu sejak pagi",u:true,urg:false},
        {msg:"🍼 Modul Neonatal (Offline)\n\nBayi tampak kuning (ikterus)?\n1=Ya  2=Tidak",u:false,urg:false},
        {msg:"1",u:true,urg:false},
        {msg:"Kuning sampai ke telapak tangan atau kaki?\n1=Ya  2=Tidak",u:false,urg:false},
        {msg:"1",u:true,urg:false},
        {msg:"🔴 DARURAT — Ikterus Neonatorum Berat\n\nRujuk ke Puskesmas SEGERA.\n\n📱 Catatan tersimpan lokal\n🔄 Tersinkron saat sinyal kembali",u:false,urg:true},
      ],
    },
    {
      id:3,
      icon:"👩‍⚕️",
      label:"Bidan",
      sublabel:lang==="en"?"Midwife Module":"Modul Bidan",
      accent:C.purple,
      headline:lang==="en"?"The midwife who can't be in two villages at once.":"Bidan yang tidak bisa berada di dua desa sekaligus.",
      story:lang==="en"
        ?"A Bidan in rural NTT can serve 5–10 villages. She cannot be everywhere. But her knowledge can be.\n\nThe Bidan module gives community midwives a structured digital companion for antenatal visits, postnatal checks, and high-risk pregnancy monitoring. It doesn't replace her clinical judgment — it extends her reach.\n\nWhen a Kader flags a concern, the Bidan receives a structured summary: the questions asked, the answers given, and a clear risk classification. She can triage remotely — and respond where it matters most.\n\nHer knowledge. Everywhere she can't be."
        :"Seorang Bidan di NTT pedesaan bisa melayani 5–10 desa. Ia tidak bisa hadir di mana-mana. Tapi pengetahuannya bisa.\n\nModul Bidan memberi bidan komunitas pendamping digital terstruktur untuk kunjungan antenatal, pemeriksaan pascamelahirkan, dan pemantauan kehamilan berisiko tinggi. Ini tidak menggantikan penilaian klinisnya — ini memperluas jangkauannya.\n\nKetika Kader melaporkan kekhawatiran, Bidan menerima ringkasan terstruktur: pertanyaan yang diajukan, jawaban yang diberikan, dan klasifikasi risiko yang jelas. Ia bisa melakukan triase dari jarak jauh — dan merespons di tempat yang paling penting.\n\nPengetahuannya. Di mana pun ia tidak bisa hadir.",
      features:lang==="en"
        ?["Antenatal visit tracking — all trimesters","Postnatal monitoring — 0 to 42 days","High-risk flag alerts sent to supervising Bidan","Remote triage review from any location","Integrated with Kader WhatsApp module"]
        :["Pelacakan kunjungan antenatal — semua trimester","Pemantauan pascamelahirkan — 0 sampai 42 hari","Peringatan tanda bahaya dikirim ke Bidan pengawas","Tinjauan triase jarak jauh dari lokasi mana pun","Terintegrasi dengan modul Kader WhatsApp"],
      messages:[
        {msg:"👩‍⚕️ Bidan Dashboard\nKunjungan hari ini: 3\nTanda bahaya terdeteksi: 1",u:false,urg:false},
        {msg:"⚠️ PERINGATAN BARU\n\nKader Sari melaporkan:\nBu Wati, 32th, hamil 36mgg\nTekanan darah tinggi terdeteksi\n\nLihat detail? 1=Ya  2=Nanti",u:false,urg:false},
        {msg:"1",u:true,urg:false},
        {msg:"📋 Ringkasan Kasus\n\nSakit kepala berat: Ya\nPenglihatan kabur: Ya\nProtein urin: Belum diperiksa\n\n→ Preeklampsia dicurigai\n→ RUJUK ke Puskesmas hari ini",u:false,urg:true},
        {msg:"Siap, saya akan hubungi Puskesmas sekarang",u:true,urg:false},
      ],
    },
    {
      id:4,
      icon:"📊",
      label:lang==="en"?"NGO Dashboard":"Dashboard NGO",
      sublabel:lang==="en"?"Impact at scale":"Dampak skala besar",
      accent:C.blue,
      headline:lang==="en"?"See everything. Miss nothing.":"Lihat segalanya. Jangan lewatkan satu pun.",
      story:lang==="en"
        ?"A stunting rate drops from 32% to 24% in two years. A Kader in a remote NTT village makes 47 home visits in a month — all recorded. A high-risk pregnancy is flagged on a Tuesday morning, and a Bidan responds that same afternoon.\n\nThe NGO Dashboard doesn't just show you data. It shows you what your programme is actually doing — in real time, at the village level, across every district you operate in.\n\nFor programme managers, donors, and government partners, the dashboard is the proof. Coverage maps, clinical outcomes, Kader activity, referral rates — all in one place, updated live, exportable in one click.\n\nThis is what accountability looks like."
        :"Angka stunting turun dari 32% menjadi 24% dalam dua tahun. Seorang Kader di desa terpencil NTT membuat 47 kunjungan rumah dalam sebulan — semuanya tercatat. Kehamilan berisiko tinggi ditandai pada Selasa pagi, dan Bidan merespons hari yang sama.\n\nDashboard NGO tidak sekadar menampilkan data. Ia menunjukkan apa yang sebenarnya dilakukan program Anda — secara real-time, di tingkat desa, di setiap kabupaten tempat Anda beroperasi.\n\nBagi manajer program, donor, dan mitra pemerintah, dashboard adalah buktinya. Peta cakupan, hasil klinis, aktivitas Kader, tingkat rujukan — semuanya di satu tempat, diperbarui langsung, bisa diekspor dengan satu klik.\n\nInilah tampilan akuntabilitas.",
      features:lang==="en"
        ?["Real-time Kader activity across all districts","Village-level coverage and outcome maps","Clinical risk trends — by module, by region","One-click export for donor and MoH reporting","Role-based access: Kader · Bidan · NGO · Funder"]
        :["Aktivitas Kader real-time di semua kabupaten","Peta cakupan dan hasil tingkat desa","Tren risiko klinis — per modul, per wilayah","Ekspor satu klik untuk laporan donor dan Kemenkes","Akses berbasis peran: Kader · Bidan · NGO · Donor"],
      messages:[
        {msg:"📊 NGO Dashboard — Yayasan Pijar Timur\nNTT Province · Live",u:false,urg:false},
        {msg:"Kader aktif bulan ini: 142 / 180\nKunjungan total: 1,847\nTanda bahaya terdeteksi: 23\nRujukan berhasil: 21",u:false,urg:false},
        {msg:"⚠️ 2 desa belum dilaporkan minggu ini:\n• Desa Oebola\n• Desa Nunkurus\n\nKirim pengingat ke Kader? 1=Ya",u:false,urg:false},
        {msg:"1",u:true,urg:false},
        {msg:"✓ Pengingat terkirim ke 2 Kader\n\nLaporan bulan ini siap diekspor:\n📄 Export PDF · 📊 Export Excel",u:false,urg:false},
      ],
    },
  ];

  const p=tabs[active];

  return(
    <section id="products" style={{background:C.dark,padding:"100px 0",position:"relative",overflow:"hidden"}}>
      <div className="teal-glow" style={{width:400,height:400,background:C.teal,top:"5%",right:"-5%"}}/>
      <div className="section-max" style={{position:"relative",zIndex:1}}>
        <FadeIn>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(2,195,154,0.1)",border:"1px solid rgba(2,195,154,0.3)",borderRadius:20,padding:"6px 16px",marginBottom:16}}>
            <span style={{color:C.teal,fontSize:12,fontWeight:600,letterSpacing:1}}>{lang==="en"?"OUR PRODUCTS":"PRODUK KAMI"}</span>
          </div>
          <h2 className="display-font" style={{fontSize:"clamp(32px,4vw,52px)",color:C.white,lineHeight:1.2,marginBottom:16,maxWidth:700}}>
            {lang==="en"?"Five tools. Built for the people who show up.":"Lima alat. Dibangun untuk mereka yang selalu hadir."}
          </h2>
          <p style={{color:"rgba(255,255,255,0.5)",fontSize:16,maxWidth:560,lineHeight:1.8,marginBottom:48}}>
            {lang==="en"?"From the worried parent at midnight to the midwife in a mountain village with no internet — SahAIbat meets every user exactly where they are."
            :"Dari orang tua yang khawatir tengah malam hingga bidan di desa pegunungan tanpa internet — SahAIbat hadir untuk setiap pengguna persis di mana mereka berada."}
          </p>
        </FadeIn>

        {/* Tab buttons */}
        <div style={{display:"flex",gap:10,marginBottom:48,flexWrap:"wrap"}}>
          {tabs.map(tab=>(<button key={tab.id} onClick={()=>setActive(tab.id)} style={{display:"flex",alignItems:"center",gap:8,padding:"10px 18px",borderRadius:14,fontSize:13,fontWeight:600,cursor:"pointer",transition:"all 0.25s",background:active===tab.id?tab.accent:"rgba(255,255,255,0.05)",color:active===tab.id?C.dark:"rgba(255,255,255,0.6)",border:active===tab.id?`1.5px solid ${tab.accent}`:"1.5px solid rgba(255,255,255,0.1)"}}>
            <span style={{fontSize:18}}>{tab.icon}</span>
            <div style={{textAlign:"left"}}>
              <div style={{fontWeight:700,lineHeight:1}}>{tab.label}</div>
              <div style={{fontSize:10,opacity:0.7,marginTop:2}}>{tab.sublabel}</div>
            </div>
          </button>))}
        </div>

        {/* Active panel */}
        <div key={active}>
          <div className="hero-grid" style={{alignItems:"start"}}>
            <div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,background:`${p.accent}15`,border:`1px solid ${p.accent}40`,borderRadius:20,padding:"5px 14px",marginBottom:20}}>
                <span style={{color:p.accent,fontSize:12,fontWeight:600}}>{p.icon} {p.sublabel}</span>
              </div>
              <h3 className="display-font" style={{color:C.white,fontSize:"clamp(22px,2.5vw,34px)",lineHeight:1.25,marginBottom:24}}>{p.headline}</h3>
              {p.story.split("\n\n").map((para,i)=>(<p key={i} style={{color:"rgba(255,255,255,0.6)",fontSize:15,lineHeight:1.9,marginBottom:16,fontStyle:i===p.story.split("\n\n").length-1?"italic":"normal"}}>{para}</p>))}
              <div style={{marginTop:32,background:`${p.accent}08`,border:`1px solid ${p.accent}20`,borderRadius:16,padding:24}}>
                <div style={{color:p.accent,fontWeight:700,fontSize:11,letterSpacing:1,marginBottom:12}}>{lang==="en"?"KEY CAPABILITIES":"KEMAMPUAN UTAMA"}</div>
                {p.features.map((f,i)=>(<div key={i} style={{display:"flex",gap:12,marginBottom:10,alignItems:"flex-start"}}><div style={{width:6,height:6,borderRadius:"50%",background:p.accent,marginTop:7,flexShrink:0}}/><span style={{color:"rgba(255,255,255,0.7)",fontSize:13,lineHeight:1.6}}>{f}</span></div>))}
              </div>
            </div>
            <div>
              <div style={{background:"rgba(15,31,28,0.8)",border:`1px solid ${p.accent}30`,borderRadius:24,padding:28,position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,transparent,${p.accent},transparent)`}}/>
                <div style={{color:C.muted,fontSize:11,textAlign:"center",marginBottom:16,fontFamily:"monospace"}}>💬 SahAIbat · {p.label}</div>
                <div style={{fontFamily:"monospace",fontSize:12}}>
                  {p.messages.map((m,i)=>(<div key={i} style={{display:"flex",justifyContent:m.u?"flex-end":"flex-start",marginBottom:10}}>
                    <div style={{background:m.urg?"rgba(232,72,85,0.15)":m.u?`${p.accent}20`:"rgba(255,255,255,0.05)",border:m.urg?"1px solid rgba(232,72,85,0.3)":m.u?`1px solid ${p.accent}40`:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:"8px 12px",maxWidth:"85%",color:m.urg?"#FF6B6B":m.u?p.accent:"rgba(255,255,255,0.75)",fontSize:12,lineHeight:1.55,whiteSpace:"pre-line"}}>{m.msg}</div>
                  </div>))}
                </div>
                <div style={{marginTop:14,paddingTop:14,borderTop:"1px solid rgba(255,255,255,0.06)",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:6}}>
                  <span style={{color:C.muted,fontSize:10}}>✓ {lang==="en"?"Saved locally · Syncs when signal returns":"Tersimpan lokal · Tersinkron saat sinyal kembali"}</span>
                  <span style={{color:p.accent,fontSize:10}}>📵 {lang==="en"?"Works offline":"Bekerja offline"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// IMPACT — emotional storytelling, donor-facing
// ══════════════════════════════════════════════════════════════════════════════
function ImpactSection({lang}:{lang:"en"|"id"}){
  return(
    <section id="impact" style={{background:C.cream,padding:"100px 0"}}>
      <div className="section-max">
        <FadeIn>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:`${C.tealDk}20`,border:`1px solid ${C.tealDk}40`,borderRadius:20,padding:"6px 16px",marginBottom:16}}>
            <span style={{color:C.tealDk,fontSize:12,fontWeight:600,letterSpacing:1}}>{lang==="en"?"IMPACT ON THE GROUND":"DAMPAK DI LAPANGAN"}</span>
          </div>
          <h2 className="display-font" style={{fontSize:"clamp(32px,4vw,52px)",color:C.dark,lineHeight:1.2,marginBottom:16,maxWidth:700}}>
            {lang==="en"?"Behind every number is a family.":"Di balik setiap angka ada sebuah keluarga."}
          </h2>
          <p style={{color:C.muted,fontSize:18,maxWidth:640,lineHeight:1.8,marginBottom:64}}>
            {lang==="en"?"Stunting. Maternal death. A newborn who didn't make it. These aren't statistics in Indonesia — they are neighbours, children, sisters. SahAIbat exists to change what happens when a Kader knocks on that door."
            :"Stunting. Kematian ibu. Bayi baru lahir yang tidak sempat diselamatkan. Ini bukan statistik di Indonesia — mereka adalah tetangga, anak-anak, saudara perempuan. SahAIbat hadir untuk mengubah apa yang terjadi saat Kader mengetuk pintu itu."}
          </p>
        </FadeIn>

        {/* Big emotional stat row */}
        <FadeIn delay={100}>
          <div className="three-col" style={{marginBottom:48}}>
            {[
              {n:"1 in 5",label:lang==="en"?"children in Indonesia is stunted":"anak Indonesia mengalami stunting",sub:lang==="en"?"That's 6.7 million children whose futures are already being shaped by malnutrition before their second birthday.":"Itu 6,7 juta anak yang masa depannya sudah dibentuk oleh kekurangan gizi sebelum ulang tahun kedua mereka.",color:C.teal},
              {n:"3×",label:lang==="en"?"higher maternal mortality in NTT than the national average":"lebih tinggi kematian ibu di NTT dari rata-rata nasional",sub:lang==="en"?"East Nusa Tenggara carries one of the highest maternal mortality burdens in Southeast Asia — in communities already stretched thin.":"Nusa Tenggara Timur menanggung salah satu beban kematian ibu tertinggi di Asia Tenggara.",color:C.pink},
              {n:"90 sec",label:lang==="en"?"is all it takes for SahAIbat to triage a danger sign":"cukup untuk SahAIbat melakukan triase tanda bahaya",sub:lang==="en"?"From first message to structured risk assessment and referral guidance. No training required. No internet required.":"Dari pesan pertama hingga penilaian risiko terstruktur dan panduan rujukan. Tidak butuh pelatihan. Tidak butuh internet.",color:C.gold},
            ].map(({n,label,sub,color})=>(<div key={n} style={{background:C.dark,borderRadius:20,padding:32,position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${color},transparent)`}}/>
              <div className="display-font" style={{fontSize:"clamp(36px,4vw,56px)",color,fontWeight:900,lineHeight:1,marginBottom:12}}>{n}</div>
              <div style={{color:C.white,fontWeight:700,fontSize:15,marginBottom:12,lineHeight:1.4}}>{label}</div>
              <p style={{color:"rgba(255,255,255,0.45)",fontSize:13,lineHeight:1.7}}>{sub}</p>
            </div>))}
          </div>
        </FadeIn>

        {/* What SahAIbat covers */}
        <FadeIn delay={150}>
          <div style={{background:C.dark,borderRadius:24,padding:48,marginBottom:48}}>
            <div style={{color:C.teal,fontWeight:700,fontSize:12,letterSpacing:1,marginBottom:24}}>{lang==="en"?"WHAT SAHAIBAT COVERS":"APA YANG SAHAIBAT TANGANI"}</div>
            <div className="three-col">
              {[
                {icon:"🤱",color:C.pink,title:lang==="en"?"Maternal Health":"Kesehatan Ibu",items:lang==="en"?["Preeclampsia detection","Postpartum haemorrhage","Fetal distress","Infection screening"]:["Deteksi preeklampsia","Perdarahan postpartum","Gawat janin","Skrining infeksi"]},
                {icon:"👶",color:C.teal,title:lang==="en"?"Child & Neonatal":"Anak & Neonatal",items:lang==="en"?["Stunting (WAZ · LAZ · WFH)","Neonatal danger signs 0–28 days","KMS growth monitoring","Adolescent health 6–18 yrs"]:["Stunting (WAZ · LAZ · WFH)","Tanda bahaya neonatal 0–28 hari","Pemantauan tumbuh KMS","Kesehatan remaja 6–18 thn"]},
                {icon:"🦠",color:C.gold,title:lang==="en"?"Communicable Disease":"Penyakit Menular",items:lang==="en"?["TB — symptom screening & contact tracing","Malaria — risk assessment & referral","Dengue — danger sign detection","HIV — community risk screening"]:["TB — skrining gejala & pelacakan kontak","Malaria — penilaian risiko & rujukan","Dengue — deteksi tanda bahaya","HIV — skrining risiko komunitas"]},
              ].map(({icon,color,title,items})=>(<div key={title}>
                <div style={{fontSize:32,marginBottom:12}}>{icon}</div>
                <div style={{color,fontWeight:700,fontSize:14,marginBottom:16}}>{title}</div>
                {items.map(item=>(<div key={item} style={{display:"flex",gap:10,marginBottom:10,alignItems:"flex-start"}}>
                  <div style={{width:5,height:5,borderRadius:"50%",background:color,marginTop:7,flexShrink:0}}/>
                  <span style={{color:"rgba(255,255,255,0.6)",fontSize:13,lineHeight:1.6}}>{item}</span>
                </div>))}
              </div>))}
            </div>
          </div>
        </FadeIn>

        {/* Clinical standards */}
        <FadeIn delay={200}>
          <div style={{background:`linear-gradient(135deg,${C.tealXdk},${C.tealDk})`,borderRadius:20,padding:36,display:"flex",gap:32,alignItems:"center",flexWrap:"wrap"}}>
            <div style={{fontSize:48}}>📗</div>
            <div style={{flex:1,minWidth:240}}>
              <div style={{color:"rgba(255,255,255,0.6)",fontWeight:700,fontSize:12,letterSpacing:1,marginBottom:8}}>{lang==="en"?"BUILT ON INDONESIA'S OWN CLINICAL STANDARDS":"DIBANGUN DI ATAS STANDAR KLINIS INDONESIA"}</div>
              <h3 style={{color:C.white,fontSize:22,fontWeight:700,marginBottom:12}}>{lang==="en"?"Every question comes from Buku KIA.":"Setiap pertanyaan berasal dari Buku KIA."}</h3>
              <p style={{color:"rgba(255,255,255,0.6)",fontSize:14,lineHeight:1.7}}>{lang==="en"?"SahAIbat doesn't invent clinical standards. Every danger sign question, risk threshold, and referral recommendation maps directly to Permenkes No. 2/2020 and WHO Child Growth Standards 2006. We digitise the knowledge that already exists.":"SahAIbat tidak menemukan standar klinis. Setiap pertanyaan tanda bahaya, ambang risiko, dan rekomendasi rujukan dipetakan langsung ke Permenkes No. 2/2020 dan Standar Pertumbuhan Anak WHO 2006."}</p>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {["Permenkes 2/2020","WHO Growth 2006","KMS Standar Nasional","SDIDTK Milestones"].map(tag=>(<span key={tag} style={{background:"rgba(255,255,255,0.1)",color:C.white,fontSize:12,padding:"6px 14px",borderRadius:20,fontWeight:600}}>{tag}</span>))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// FIELD PARTNERS — real partners with stories
// ══════════════════════════════════════════════════════════════════════════════
function FieldPartnersSection({lang}:{lang:"en"|"id"}){
  const partners=[
    {
      name:"Yayasan Pijar Timur",
      region:lang==="en"?"Kefamenanu, East Nusa Tenggara":"Kefamenanu, Nusa Tenggara Timur",
      flag:"🇮🇩",
      color:C.teal,
      focus:lang==="en"?"Child Stunting · NTT":"Stunting Anak · NTT",
      story:lang==="en"
        ?"In the highland villages of North Central Timor, Yayasan Pijar Timur has been quietly doing the work that saves children's lives — community education, family support, and nutritional monitoring. They know the Kaders, they know the families, and they understand what tools actually work in the field.\n\nWith SahAIbat, their Kaders now have structured WHO-aligned growth screening in their hands — available offline, in Bahasa, and without any app to download."
        :"Di desa-desa dataran tinggi Timor Tengah Utara, Yayasan Pijar Timur telah diam-diam melakukan pekerjaan yang menyelamatkan jiwa anak-anak — pendidikan komunitas, dukungan keluarga, dan pemantauan gizi. Mereka mengenal para Kader, mereka mengenal keluarga-keluarganya, dan mereka memahami alat apa yang benar-benar bekerja di lapangan.\n\nDengan SahAIbat, Kader mereka kini memiliki skrining pertumbuhan WHO terstruktur di tangan mereka — tersedia offline, dalam Bahasa Indonesia, tanpa perlu mengunduh aplikasi.",
      tags:lang==="en"?["Child Stunting","NTT","Kader Training","Community Health"]:["Stunting Anak","NTT","Pelatihan Kader","Kesehatan Komunitas"],
      modules:lang==="en"?["Child growth monitoring","Posyandu triage","Neonatal screening"]:["Pemantauan tumbuh anak","Triase Posyandu","Skrining neonatal"],
    },
    {
      name:"PAPHA",
      region:lang==="en"?"East Nusa Tenggara":"Nusa Tenggara Timur",
      flag:"🇮🇩",
      color:C.gold,
      focus:lang==="en"?"Child Stunting · NTT":"Stunting Anak · NTT",
      story:lang==="en"
        ?"PAPHA works at the intersection of community advocacy and direct health service — supporting families most at risk of being left behind by the formal health system. In a province where stunting rates in some districts exceed 40%, their work is urgent.\n\nSahAIbat supports PAPHA's Kader network with automated WHO growth indicator calculation — removing the manual chart-reading burden and catching cases that might otherwise fall through the cracks."
        :"PAPHA bekerja di persimpangan advokasi komunitas dan layanan kesehatan langsung — mendukung keluarga yang paling berisiko ditinggalkan oleh sistem kesehatan formal. Di provinsi di mana angka stunting di beberapa kabupaten melebihi 40%, pekerjaan mereka sangat mendesak.\n\nSahAIbat mendukung jaringan Kader PAPHA dengan kalkulasi indikator pertumbuhan WHO otomatis — menghilangkan beban pembacaan grafik manual dan menangkap kasus yang mungkin terlewat.",
      tags:lang==="en"?["Child Stunting","NTT","WHO Growth","Community Advocacy"]:["Stunting Anak","NTT","Pertumbuhan WHO","Advokasi Komunitas"],
      modules:lang==="en"?["WHO stunting screening","Growth monitoring","Posyandu support"]:["Skrining stunting WHO","Pemantauan pertumbuhan","Dukungan Posyandu"],
    },

    {
      name:"PERDHAKI",
      region:lang==="en"?"Indonesia-wide · Focus: Eastern Indonesia":"Seluruh Indonesia · Fokus: Indonesia Timur",
      flag:"🇮🇩",
      color:C.purple,
      focus:lang==="en"?"Malaria · Maternal & Child Health":"Malaria · Kesehatan Ibu & Anak",
      story:lang==="en"
        ?"Since 1971, PERDHAKI — the Association of Voluntary Health Services of Indonesia — has been building healthcare systems in the communities that formal government infrastructure hasn't fully reached. Their network of Catholic health facilities and community health workers spans the country, with particular strength in Maluku, NTT, and Papua.\n\nSahAIbat is partnering with PERDHAKI to deploy the Kasih module for maternal education and child care, alongside structured malaria screening protocols — tools designed to work in the remote, low-connectivity environments where PERDHAKI's community health workers operate every day."
        :"Sejak 1971, PERDHAKI — Persatuan Karya Dharma Kesehatan Indonesia — telah membangun sistem layanan kesehatan di komunitas yang belum sepenuhnya dijangkau infrastruktur pemerintah formal. Jaringan fasilitas kesehatan Katolik dan kader kesehatan komunitas mereka mencakup seluruh negeri, dengan kekuatan khusus di Maluku, NTT, dan Papua.\n\nSahAIbat bermitra dengan PERDHAKI untuk menyebarkan modul Kasih untuk pendidikan ibu dan perawatan anak, bersama protokol skrining malaria terstruktur.",
      tags:lang==="en"?["Since 1971","Malaria","Maternal & Child","Eastern Indonesia"]:["Sejak 1971","Malaria","Ibu & Anak","Indonesia Timur"],
      modules:lang==="en"?["Kasih maternal education","Child care module","Malaria screening"]:["Pendidikan ibu Kasih","Modul perawatan anak","Skrining malaria"],
    },
  ];

  return(
    <section id="partners" style={{background:C.dark,padding:"100px 0",position:"relative",overflow:"hidden"}}>
      <div className="teal-glow" style={{width:400,height:400,background:C.teal,top:"10%",right:"-8%"}}/>
      <div className="section-max" style={{position:"relative",zIndex:1}}>
        <FadeIn>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(2,195,154,0.1)",border:"1px solid rgba(2,195,154,0.3)",borderRadius:20,padding:"6px 16px",marginBottom:16}}>
            <span style={{color:C.teal,fontSize:12,fontWeight:600,letterSpacing:1}}>{lang==="en"?"FIELD PARTNERS":"MITRA LAPANGAN"}</span>
          </div>
          <h2 className="display-font" style={{fontSize:"clamp(32px,4vw,52px)",color:C.white,lineHeight:1.2,marginBottom:16}}>
            {lang==="en"?"On the ground. Together.":"Di lapangan. Bersama."}
          </h2>
          <p style={{color:"rgba(255,255,255,0.5)",fontSize:16,maxWidth:560,lineHeight:1.8,marginBottom:64}}>
            {lang==="en"?"SahAIbat doesn't deploy technology into communities — we build it with them. Every field partner brings relationships, trust, and terrain knowledge that no platform can replace."
            :"SahAIbat tidak sekadar menerapkan teknologi ke komunitas — kami membangunnya bersama mereka. Setiap mitra lapangan membawa hubungan, kepercayaan, dan pengetahuan wilayah yang tidak dapat digantikan oleh platform mana pun."}
          </p>
        </FadeIn>

        <div style={{display:"grid",gap:32}}>
          {partners.map((p,i)=>(<FadeIn key={p.name} delay={i*100}>
            <div style={{background:"rgba(255,255,255,0.03)",border:`1px solid ${p.color}25`,borderRadius:24,padding:36,position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${p.color},transparent)`}}/>
              <div className="two-col" style={{alignItems:"start"}}>
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
                    <span style={{fontSize:28}}>{p.flag}</span>
                    <div>
                      <div style={{color:p.color,fontWeight:700,fontSize:11,letterSpacing:1,marginBottom:4}}>{p.focus}</div>
                      <h3 style={{color:C.white,fontWeight:800,fontSize:22}}>{p.name}</h3>
                      <div style={{color:"rgba(255,255,255,0.4)",fontSize:12,marginTop:2}}>{p.region}</div>
                    </div>
                  </div>
                  {p.story.split("\n\n").map((para,j)=>(<p key={j} style={{color:"rgba(255,255,255,0.55)",fontSize:14,lineHeight:1.8,marginBottom:12}}>{para}</p>))}
                  <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:16}}>
                    {p.tags.map(tag=>(<Tag key={tag} label={tag} color={p.color}/>))}
                  </div>
                </div>
                <div style={{background:"rgba(255,255,255,0.04)",borderRadius:16,padding:24}}>
                  <div style={{color:p.color,fontWeight:700,fontSize:11,letterSpacing:1,marginBottom:16}}>{lang==="en"?"ACTIVE MODULES":"MODUL AKTIF"}</div>
                  {p.modules.map(m=>(<div key={m} style={{display:"flex",gap:10,marginBottom:12,alignItems:"center"}}>
                    <div style={{width:8,height:8,borderRadius:"50%",background:p.color,flexShrink:0}}/>
                    <span style={{color:"rgba(255,255,255,0.7)",fontSize:13}}>{m}</span>
                  </div>))}
                  <div style={{marginTop:24,paddingTop:16,borderTop:"1px solid rgba(255,255,255,0.06)"}}>
                    <a href="mailto:admin@sahaibat.com?subject=Partnership Inquiry" style={{color:p.color,fontSize:13,fontWeight:600,textDecoration:"none"}}>{lang==="en"?"Learn more about this partnership →":"Pelajari lebih lanjut →"}</a>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>))}
        </div>

        <FadeIn delay={400}>
          <div style={{marginTop:48,background:`linear-gradient(135deg,${C.tealXdk},${C.tealDk})`,borderRadius:20,padding:36,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:24}}>
            <div>
              <div style={{color:C.white,fontWeight:700,fontSize:20,marginBottom:8}}>{lang==="en"?"Ready to bring SahAIbat to your community?":"Siap membawa SahAIbat ke komunitas Anda?"}</div>
              <p style={{color:"rgba(255,255,255,0.7)",fontSize:14,maxWidth:480,lineHeight:1.7}}>{lang==="en"?"Tell us about your programme and we'll respond within 48 hours.":"Ceritakan program Anda dan kami akan membalas dalam 48 jam."}</p>
            </div>
            <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
              <a href="mailto:admin@sahaibat.com?subject=Field Partner Inquiry" style={{background:C.teal,color:C.dark,padding:"13px 28px",borderRadius:12,fontSize:14,fontWeight:700,textDecoration:"none"}}>{lang==="en"?"Email us →":"Email kami →"}</a>
              <a href="https://wa.me/6281918669241" style={{background:"rgba(255,255,255,0.1)",color:C.white,padding:"13px 28px",borderRadius:12,fontSize:14,fontWeight:600,textDecoration:"none"}}>💬 WhatsApp</a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TEAM — 6 members with photo support
// ══════════════════════════════════════════════════════════════════════════════
function TeamSection({lang}:{lang:"en"|"id"}){
  const members=[
    {
      name:"Sanjib Maity",
      flag:"🇨🇦",
      role:lang==="en"?"Founder & Product Developer":"Pendiri & Pengembang Produk",
      loc:lang==="en"?"Canada":"Kanada",
      photo:"/images/sanjib.jpeg",
      color:C.teal,
      bg:C.dark,
      passion:lang==="en"
        ?"Sanjib has 15+ years of experience in IT infrastructure and application development — building systems that move at scale. He left a comfortable career to answer a question that kept him awake: why do the communities with the highest disease burden have the least digital support? SahAIbat is his answer."
        :"Sanjib memiliki pengalaman 15+ tahun dalam infrastruktur IT dan pengembangan aplikasi — membangun sistem yang bergerak dalam skala besar. Ia meninggalkan karier yang nyaman untuk menjawab pertanyaan yang terus mengganggunya: mengapa komunitas dengan beban penyakit tertinggi mendapat dukungan digital paling sedikit? SahAIbat adalah jawabannya.",
      tags:["15+ Years IT","Product Development","Health Equity","Founder"],
    },
    {
      name:"Dr. Ratih Rakhmawati, M.Biomed",
      flag:"🇮🇩",
      role:lang==="en"?"Clinical Validation Lead":"Pemimpin Validasi Klinis",
      loc:"Indonesia",
      photo:"/images/____Rathi.jpg",
      color:C.pink,
      bg:C.white,
      passion:lang==="en"
        ?"Dr. Ratih has spent 20+ years strengthening health systems across Indonesia — leading large-scale digital training programmes validated against Kemenkes and WHO standards. She has trained thousands of health cadres and providers across multiple provinces. At SahAIbat, she is the reason every clinical module can be trusted."
        :"Dr. Ratih telah menghabiskan 20+ tahun memperkuat sistem kesehatan di seluruh Indonesia — memimpin program pelatihan digital skala besar yang divalidasi terhadap standar Kemenkes dan WHO. Ia telah melatih ribuan kader dan tenaga kesehatan di berbagai provinsi. Di SahAIbat, ia adalah alasan setiap modul klinis dapat dipercaya.",
      tags:["20+ Years MCH","Kemenkes · WHO Validation","Digital Health Training","M.Biomed"],
    },
    {
      name:"Stefanus Bere",
      flag:"🇮🇩",
      role:lang==="en"?"Programme Manager, Rural Deployment":"Manajer Program, Penerapan Pedesaan",
      loc:"East Nusa Tenggara",
      photo:"/images/__Stefan.png",
      color:C.gold,
      bg:C.white,
      passion:lang==="en"
        ?"Nearly 20 years building health systems in NTT and Timor-Leste — with USAID, ADB, MoH, and the UN. Stefanus led district-level reforms under the DFAT maternal health partnership and has worked with IOM and CARE International. He brings the field fluency that no dataset can replace."
        :"Hampir 20 tahun membangun sistem kesehatan di NTT dan Timor-Leste — bersama USAID, ADB, Kemenkes, dan PBB. Stefanus memimpin reformasi tingkat kabupaten di bawah kemitraan kesehatan ibu DFAT dan telah bekerja dengan IOM dan CARE International. Ia membawa kelancaran lapangan yang tidak dapat digantikan oleh dataset mana pun.",
      tags:["USAID · ADB · DFAT · UN","NTT & Timor-Leste","Health Systems","UQ Alumni"],
    },
    {
      name:"Risti Riana",
      flag:"🇮🇩",
      role:lang==="en"?"Content Creator & Community Support":"Kreator Konten & Dukungan Komunitas",
      loc:"West Java, Indonesia",
      photo:null,
      color:C.teal,
      bg:C.white,
      passion:lang==="en"
        ?"Risti builds communities that actually move people. From wellness spaces to KOL partnerships to health learning programmes — she has always believed the right message, delivered the right way, changes behaviour. At SahAIbat, she is the reason people find us, trust us, and stay."
        :"Risti membangun komunitas yang benar-benar menggerakkan orang. Dari komunitas wellness hingga kemitraan KOL dan program pembelajaran kesehatan — ia selalu percaya pesan yang tepat, disampaikan dengan cara yang tepat, mengubah perilaku. Di SahAIbat, ia adalah alasan orang menemukan kami, mempercayai kami, dan tetap bersama kami.",
      tags:["Content Creation","Community Building","KOL Partnerships","Growth"],
    },
    {
      name:"Saurav Das",
      flag:"🇮🇳",
      role:lang==="en"?"UI Engineer":"UI Engineer",
      loc:"India",
      photo:null,
      color:C.blue,
      bg:C.white,
      passion:lang==="en"
        ?"Saurav has 5+ years building frontend interfaces with a specific focus most UI engineers never think about: what happens when your user has a 2G connection, an entry-level phone, and needs to make a critical health decision right now? At SahAIbat, that constraint is the design brief. He builds for it."
        :"Saurav memiliki 5+ tahun pengalaman membangun antarmuka frontend dengan fokus khusus yang jarang dipikirkan UI engineer kebanyakan: apa yang terjadi ketika pengguna Anda memiliki koneksi 2G, ponsel kelas bawah, dan perlu membuat keputusan kesehatan kritis sekarang juga? Di SahAIbat, kendala itu adalah brief desainnya. Ia membangun untuk itu.",
      tags:["5+ Years UI/Frontend","Accessibility","Low-end Device Optimization","React"],
    },
    {
      name:"Surabhi Das",
      flag:"🇨🇦",
      role:lang==="en"?"Healthcare Research & Strategy":"Penelitian Kesehatan & Strategi",
      loc:"Canada",
      photo:null,
      color:C.purple,
      bg:C.white,
      passion:lang==="en"
        ?"B.PT, MBA, and alumni of Deloitte and Egon Zehnder — Surabhi brings the rare combination of clinical grounding and strategic rigour to SahAIbat's evidence base. She leads our research into nationwide maternal and child health data, builds the frameworks that make our outcomes measurable, and shapes the grant strategy that keeps SahAIbat funded and free."
        :"B.PT, MBA, dan alumni Deloitte serta Egon Zehnder — Surabhi membawa kombinasi langka antara landasan klinis dan rigor strategis ke basis bukti SahAIbat. Ia memimpin penelitian kami tentang data kesehatan ibu dan anak nasional, membangun kerangka kerja yang membuat hasil kami terukur, dan membentuk strategi hibah yang membuat SahAIbat tetap didanai dan gratis.",
      tags:["B.PT · MBA","ex-Deloitte · ex-Egon Zehnder","Health Research","Grant Strategy"],
    },
  ];

  const Avatar=({m,size=72}:{m:typeof members[0];size?:number})=>(
    m.photo
      ?<img src={m.photo} alt={m.name} style={{width:size,height:size,borderRadius:16,objectFit:"cover",flexShrink:0,border:`2px solid ${m.color}30`}}/>
      :<div style={{width:size,height:size,borderRadius:16,background:`${m.color}15`,border:`1px solid ${m.color}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0,fontWeight:800,color:m.color}}>{m.name[0]}</div>
  );

  return(
    <section id="team" style={{background:C.cream,padding:"100px 0"}}>
      <div className="section-max">
        <FadeIn>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:`${C.tealDk}15`,border:`1px solid ${C.tealDk}30`,borderRadius:20,padding:"6px 16px",marginBottom:16}}>
            <span style={{color:C.tealDk,fontSize:12,fontWeight:600,letterSpacing:1}}>{lang==="en"?"THE TEAM":"TIM KAMI"}</span>
          </div>
          <h2 className="display-font" style={{fontSize:"clamp(32px,4vw,52px)",color:C.dark,lineHeight:1.2,marginBottom:16}}>
            {lang==="en"?"People who refused to accept the status quo.":"Orang-orang yang menolak menerima status quo."}
          </h2>
          <p style={{color:C.muted,fontSize:16,maxWidth:560,lineHeight:1.8,marginBottom:64}}>
            {lang==="en"?"Clinicians, field workers, technologists, and strategists — united by one belief: the communities carrying the highest health burden deserve world-class tools."
            :"Dokter, pekerja lapangan, teknolog, dan ahli strategi — bersatu dalam satu keyakinan: komunitas dengan beban kesehatan tertinggi berhak mendapatkan alat terbaik di dunia."}
          </p>
        </FadeIn>

        {/* Row 1: Sanjib + Dr. Ratih */}
        <div className="two-col" style={{marginBottom:24}}>
          {members.slice(0,2).map(m=>(<FadeIn key={m.name} delay={100}>
            <div style={{background:m.bg,borderRadius:24,padding:36,position:"relative",overflow:"hidden",border:`1px solid ${m.color}20`,minHeight:320}}>
              <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${m.color},transparent)`}}/>
              <div style={{display:"flex",gap:20,alignItems:"flex-start",marginBottom:20}}>
                <Avatar m={m}/>
                <div>
                  <div style={{fontWeight:800,fontSize:20,color:m.bg===C.dark?C.white:C.dark,marginBottom:4}}>{m.name} {m.flag}</div>
                  <div style={{color:m.color,fontWeight:600,fontSize:13}}>{m.role}</div>
                  <div style={{color:m.bg===C.dark?"rgba(255,255,255,0.4)":C.muted,fontSize:12,marginTop:4}}>{m.loc}</div>
                </div>
              </div>
              <p style={{color:m.bg===C.dark?"rgba(255,255,255,0.65)":C.muted,fontSize:14,lineHeight:1.85,marginBottom:20,fontStyle:"italic"}}>&ldquo;{m.passion}&rdquo;</p>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{m.tags.map(tag=>(<Tag key={tag} label={tag} color={m.color}/>))}</div>
            </div>
          </FadeIn>))}
        </div>

        {/* Row 2: Stefanus + Risti */}
        <div className="two-col" style={{marginBottom:24}}>
          {members.slice(2,4).map(m=>(<FadeIn key={m.name} delay={200}>
            <div style={{background:m.bg,borderRadius:24,padding:36,position:"relative",overflow:"hidden",border:`1px solid ${m.color}20`,minHeight:300}}>
              <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${m.color},transparent)`}}/>
              <div style={{display:"flex",gap:20,alignItems:"flex-start",marginBottom:20}}>
                <Avatar m={m}/>
                <div>
                  <div style={{fontWeight:800,fontSize:20,color:C.dark,marginBottom:4}}>{m.name} {m.flag}</div>
                  <div style={{color:m.color,fontWeight:600,fontSize:13}}>{m.role}</div>
                  <div style={{color:C.muted,fontSize:12,marginTop:4}}>{m.loc}</div>
                </div>
              </div>
              <p style={{color:C.muted,fontSize:14,lineHeight:1.85,marginBottom:20,fontStyle:"italic"}}>&ldquo;{m.passion}&rdquo;</p>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{m.tags.map(tag=>(<Tag key={tag} label={tag} color={m.color}/>))}</div>
            </div>
          </FadeIn>))}
        </div>

        {/* Row 3: Saurav + Surabhi */}
        <div className="two-col" style={{marginBottom:48}}>
          {members.slice(4,6).map(m=>(<FadeIn key={m.name} delay={300}>
            <div style={{background:m.bg,borderRadius:24,padding:36,position:"relative",overflow:"hidden",border:`1px solid ${m.color}20`,minHeight:300}}>
              <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${m.color},transparent)`}}/>
              <div style={{display:"flex",gap:20,alignItems:"flex-start",marginBottom:20}}>
                <Avatar m={m}/>
                <div>
                  <div style={{fontWeight:800,fontSize:20,color:C.dark,marginBottom:4}}>{m.name} {m.flag}</div>
                  <div style={{color:m.color,fontWeight:600,fontSize:13}}>{m.role}</div>
                  <div style={{color:C.muted,fontSize:12,marginTop:4}}>{m.loc}</div>
                </div>
              </div>
              <p style={{color:C.muted,fontSize:14,lineHeight:1.85,marginBottom:20,fontStyle:"italic"}}>&ldquo;{m.passion}&rdquo;</p>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{m.tags.map(tag=>(<Tag key={tag} label={tag} color={m.color}/>))}</div>
            </div>
          </FadeIn>))}
        </div>

        {/* Foundation note */}
        <FadeIn delay={400}>
          <div style={{background:C.dark,borderRadius:20,padding:32,display:"flex",gap:20,alignItems:"center",flexWrap:"wrap"}}>
            <div style={{fontSize:36}}>🏛️</div>
            <div style={{flex:1,minWidth:240}}>
              <div style={{color:C.teal,fontWeight:700,fontSize:12,letterSpacing:1,marginBottom:6}}>{lang==="en"?"ABOUT THE FOUNDATION":"TENTANG YAYASAN"}</div>
              <p style={{color:"rgba(255,255,255,0.55)",fontSize:14,lineHeight:1.7}}>
                {lang==="en"?"SahAIbat Foundation is the community-facing identity of SahAIbat Health. All intellectual property, technology, and platform infrastructure is owned by Vinatra (11679210 Canada Inc). The Foundation exists to serve communities — not to generate profit."
                :"SahAIbat Foundation adalah identitas yang menghadap komunitas dari SahAIbat Health. Semua kekayaan intelektual, teknologi, dan infrastruktur platform dimiliki oleh Vinatra (11679210 Canada Inc). Foundation ini ada untuk melayani komunitas — bukan untuk menghasilkan keuntungan."}
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
