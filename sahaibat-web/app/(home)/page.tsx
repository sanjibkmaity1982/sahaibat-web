"use client";

import { useState, useEffect, useRef } from "react";

// ── Design tokens ──────────────────────────────────────────────────────────────
const C = {
  teal:    "#02C39A",
  tealDk:  "#017367",
  tealXdk: "#024D42",
  cream:   "#F9F5EE",
  warm:    "#EDE8DF",
  dark:    "#0F1F1C",
  charcoal:"#1E2D2A",
  text:    "#2D3B38",
  muted:   "#6B8078",
  white:   "#FFFFFF",
  gold:    "#D4A843",
  pink:    "#E91E8C",
};

// ── Community photo URLs — using existing images from public/images ───────────
const PHOTOS = {
  kaderField:  "/images/hero-kader-family.png",
  motherChild: "/images/__motherchild.png",
  posyandu:    "/images/doctor-nurse.png",
};

// ── Bilingual strings ──────────────────────────────────────────────────────────
const T = {
  en: {
    badge: "BUILT IN CANADA. FOR INDONESIA.",
    heroH1a: "When a mother's", heroH1b: "life depends on", heroH1c: "one message.",
    heroBody: "SahAIbat gives Indonesia's 1.4 million community health workers the tool they deserve — a WhatsApp-first AI triage system that works without internet, without extra cost, and without disrupting the way Kaders already work.",
    cta1: "Read Our Story", cta2: "Fuel the Mission",
    storyLabel: "OUR STORY",
    storyH2: "A Kader. A phone. A life that shouldn't have been lost.",
    storyP1: "In the villages of East Nusa Tenggara, a community health worker called a Kader visits families on foot. She carries a KMS book, a pen, and a weighing scale. She knows the families. But when a pregnant mother shows signs of preeclampsia, she has no way to know what to do — and no doctor within hours.",
    storyP2: "Indonesia's 1.4 million Kaders are one of the most remarkable public health forces in the world. They show up — every day, in every village, in every condition — driven entirely by care for their community. SahAIbat exists to give that dedication the tools it deserves.",
    storyP3: "SahAIbat was built for her.",
    companionQ: "\"SahAIbat\" means", companionW: "companion", companionR: "in Bahasa Indonesia.",
    companionBody: "Not a diagnostic engine. Not a replacement for doctors. A companion — something that walks alongside the Kader, giving her confidence when she needs it most.",
    whyFree: "Why is SahAIbat free?",
    whyBody: "Because the communities who need it most can least afford to pay. SahAIbat is free to every Kader, every NGO, every rural health program. Our mission is impact — not revenue.",
    productsLabel: "OUR PRODUCTS", productsH2: "Three tools. One mission.",
    productsBody: "SahAIbat meets every user where they are — the worried parent at midnight, the Kader in the field, the village where the internet never came.",
    impactLabel: "IMPACT ON THE GROUND", impactH2: "The numbers tell part of the story.",
    impactBody: "The rest is told by the Kaders, the mothers, and the children in villages across Indonesia.",
    pilotsLabel: "PILOTS IN PROGRESS", pilotsH2: "We are on the ground.",
    pilotsBody: "SahAIbat is actively running pilots across Indonesia. Details will be shared here as partnerships are formalised.",
    ngoLabel: "FOR NGOS & PARTNERS", ngoH2: "Partner with SahAIbat.",
    ngoBody: "We work with NGOs, government programmes, and community organisations as partners — not vendors. SahAIbat is free for every community it serves.",
    fieldLabel: "FIELD PARTNERS", fieldH2: "Our ground network.",
    fieldBody: "SahAIbat works through trusted local organisations who know the communities, the Kaders, and the terrain.",
    fieldComingSoon: "We're building our field partner network.",
    fieldComingSoonBody: "Partner organisations will be listed here as partnerships are formalised. Each partner brings deep local knowledge and trusted relationships with Kader communities.",
    fieldCTA: "Become a Field Partner →",
    teamLabel: "THE TEAM", teamH2: "People who refused to accept the status quo.",
    teamBody: "A small team — clinicians, field workers, and technologists — united by one belief: that the communities with the highest burden deserve the best tools.",
    platformLabel: "OUR APPROACH TO AI", platformH2: "AI with guardrails.\nNot AI instead of humans.",
    platformBody: "We are an AI-powered company. But we don't let AI make clinical decisions.",
    supportLabel: "FUEL THE MISSION", supportH2a: "We don't ask for donations.", supportH2b: "We ask for belief.",
    supportBody: "SahAIbat is free for every community it serves. The only way to keep it that way is through people who believe healthcare equity is worth fighting for.",
    transparencyTitle: "Full transparency. Always.",
    transparencyBody: "Every dollar of support received will be publicly recorded — server costs, team stipends, field visits, clinical validation. You'll always know where your support goes.",
  },
  id: {
    badge: "DIBANGUN DI KANADA. UNTUK INDONESIA.",
    heroH1a: "Saat nyawa seorang", heroH1b: "ibu bergantung pada", heroH1c: "satu pesan.",
    heroBody: "SahAIbat memberi 1,4 juta kader kesehatan Indonesia alat yang layak mereka dapatkan — sistem triase AI berbasis WhatsApp yang bekerja tanpa internet, tanpa biaya tambahan, dan tanpa mengubah cara Kader bekerja.",
    cta1: "Baca Cerita Kami", cta2: "Dukung Misi Kami",
    storyLabel: "CERITA KAMI",
    storyH2: "Seorang Kader. Sebuah ponsel. Sebuah nyawa yang tak seharusnya hilang.",
    storyP1: "Di desa-desa Nusa Tenggara Timur, seorang Kader mengunjungi keluarga dengan berjalan kaki. Ia membawa buku KMS, pena, dan timbangan. Ia mengenal keluarga-keluarga itu. Namun saat seorang ibu hamil menunjukkan tanda preeklampsia, ia tidak tahu harus berbuat apa — dan tidak ada dokter dalam jangkauan berjam-jam.",
    storyP2: "1,4 juta Kader Indonesia adalah salah satu kekuatan kesehatan masyarakat paling luar biasa di dunia. Mereka hadir — setiap hari, di setiap desa, dalam segala kondisi — didorong sepenuhnya oleh kepedulian terhadap komunitas mereka. SahAIbat hadir untuk memberi dedikasi itu alat yang layak.",
    storyP3: "SahAIbat dibangun untuk mereka.",
    companionQ: "\"SahAIbat\" berarti", companionW: "teman setia", companionR: "dalam Bahasa Indonesia.",
    companionBody: "Bukan mesin diagnostik. Bukan pengganti dokter. Sebuah teman — yang berjalan bersama Kader, memberikan keyakinan saat paling dibutuhkan.",
    whyFree: "Mengapa SahAIbat gratis?",
    whyBody: "Karena komunitas yang paling membutuhkannya adalah yang paling tidak mampu membayar. SahAIbat gratis untuk setiap Kader, setiap NGO, setiap program kesehatan pedesaan. Misi kami adalah dampak — bukan pendapatan.",
    productsLabel: "PRODUK KAMI", productsH2: "Tiga alat. Satu misi.",
    productsBody: "SahAIbat hadir untuk setiap pengguna — orang tua yang khawatir tengah malam, Kader di lapangan, desa tanpa sinyal internet.",
    impactLabel: "DAMPAK DI LAPANGAN", impactH2: "Angka-angka ini baru sebagian ceritanya.",
    impactBody: "Sisanya diceritakan oleh para Kader, ibu-ibu, dan anak-anak di desa-desa Indonesia.",
    pilotsLabel: "PILOT SEDANG BERJALAN", pilotsH2: "Kami sudah di lapangan.",
    pilotsBody: "SahAIbat sedang menjalankan pilot bersama mitra di seluruh Indonesia. Detail akan dibagikan di sini setelah kemitraan resmi ditandatangani.",
    ngoLabel: "UNTUK NGO & MITRA", ngoH2: "Bermitra dengan SahAIbat.",
    ngoBody: "Kami bekerja bersama NGO, program pemerintah, dan organisasi komunitas sebagai mitra — bukan vendor. SahAIbat gratis untuk setiap komunitas yang dilayani.",
    fieldLabel: "MITRA LAPANGAN", fieldH2: "Jaringan lapangan kami.",
    fieldBody: "SahAIbat bekerja melalui organisasi lokal terpercaya yang mengenal komunitas, Kader, dan wilayahnya.",
    fieldComingSoon: "Kami sedang membangun jaringan mitra lapangan kami.",
    fieldComingSoonBody: "Organisasi mitra akan terdaftar di sini setelah kemitraan resmi ditandatangani. Setiap mitra membawa pengetahuan lokal yang mendalam dan hubungan tepercaya dengan komunitas Kader.",
    fieldCTA: "Jadilah Mitra Lapangan →",
    teamLabel: "TIM KAMI", teamH2: "Orang-orang yang menolak menerima status quo.",
    teamBody: "Tim kecil — dokter, pekerja lapangan, dan teknolog — yang bersatu dalam satu keyakinan: komunitas dengan beban penyakit tertinggi berhak mendapatkan alat terbaik.",
    platformLabel: "PENDEKATAN KAMI TERHADAP AI", platformH2: "AI dengan batasan.\nBukan AI menggantikan manusia.",
    platformBody: "Kami adalah perusahaan berbasis AI. Namun kami tidak membiarkan AI membuat keputusan klinis.",
    supportLabel: "DUKUNG MISI KAMI", supportH2a: "Kami tidak meminta donasi.", supportH2b: "Kami meminta kepercayaan.",
    supportBody: "SahAIbat gratis untuk setiap komunitas yang dilayani. Satu-satunya cara mempertahankan ini adalah melalui orang-orang yang percaya bahwa kesetaraan layanan kesehatan layak diperjuangkan.",
    transparencyTitle: "Transparansi penuh. Selalu.",
    transparencyBody: "Setiap dukungan yang diterima akan dicatat secara publik — biaya server, tunjangan tim, kunjungan lapangan, validasi klinis. Anda selalu tahu ke mana dukungan Anda pergi.",
  },
};

// ── Helpers ────────────────────────────────────────────────────────────────────
function Counter({ end, suffix="", prefix="" }: { end:number; suffix?:string; prefix?:string }) {
  const [count,setCount]=useState(0);
  const ref=useRef<HTMLSpanElement>(null);
  const started=useRef(false);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{
      if(e.isIntersecting&&!started.current){
        started.current=true;
        const inc=end/60; let cur=0;
        const t=setInterval(()=>{ cur+=inc; if(cur>=end){setCount(end);clearInterval(t);}else setCount(Math.floor(cur)); },33);
      }
    },{threshold:0.5});
    if(ref.current)obs.observe(ref.current);
    return()=>obs.disconnect();
  },[end]);
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

function FadeIn({ children, delay=0, className="" }: { children:React.ReactNode; delay?:number; className?:string }) {
  const ref=useRef<HTMLDivElement>(null);
  const [vis,setVis]=useState(false);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{ if(e.isIntersecting){setVis(true);obs.disconnect();} },{threshold:0.08});
    if(ref.current)obs.observe(ref.current);
    return()=>obs.disconnect();
  },[]);
  return(
    <div ref={ref} className={className} style={{ opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(28px)", transition:`opacity 0.7s ease ${delay}ms,transform 0.7s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

function Tag({ label, color }: { label:string; color:string }) {
  return <span style={{ background:`${color}12`,border:`1px solid ${color}30`,color,fontSize:11,padding:"4px 10px",borderRadius:20,fontWeight:600 }}>{label}</span>;
}

// ── Nav ────────────────────────────────────────────────────────────────────────
function Nav({ lang, setLang }: { lang:"en"|"id"; setLang:(l:"en"|"id")=>void }) {
  const [scrolled,setScrolled]=useState(false);
  const [open,setOpen]=useState(false);
  useEffect(()=>{ const fn=()=>setScrolled(window.scrollY>40); window.addEventListener("scroll",fn); return()=>window.removeEventListener("scroll",fn); },[]);
  const links:[string,string][] = lang==="en"
    ?[["#story","Our Story"],["#products","Products"],["#impact","Impact"],["#ngo","For NGOs"],["#team","Team"],["#support","Support"]]
    :[["#story","Cerita"],["#products","Produk"],["#impact","Dampak"],["#ngo","Untuk NGO"],["#team","Tim"],["#support","Dukung"]];
  return(
    <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:100, background:scrolled?"rgba(15,31,28,0.96)":"transparent", backdropFilter:scrolled?"blur(14px)":"none", borderBottom:scrolled?"1px solid rgba(2,195,154,0.15)":"none", transition:"all 0.3s",padding:"0 24px" }}>
      <div style={{ maxWidth:1200,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:64 }}>
        <div style={{ display:"flex",alignItems:"center" }}>
          <img
            src="/images/logo-horizontal@2x.png"
            alt="SahAIbat Foundation"
            style={{ height:36,width:"auto",filter:"brightness(0) invert(1)" }}
          />
        </div>
        <div className="nav-desktop" style={{ display:"flex",gap:22,alignItems:"center" }}>
          {links.map(([href,label])=>(
            <a key={href} href={href} style={{ color:"rgba(255,255,255,0.7)",fontSize:13,fontWeight:500,textDecoration:"none",transition:"color 0.2s" }}
              onMouseEnter={e=>(e.target as HTMLElement).style.color=C.teal}
              onMouseLeave={e=>(e.target as HTMLElement).style.color="rgba(255,255,255,0.7)"}>{label}</a>
          ))}
          <div style={{ display:"flex",gap:3,background:"rgba(255,255,255,0.08)",borderRadius:20,padding:3 }}>
            {(["en","id"] as const).map(l=>(
              <button key={l} onClick={()=>setLang(l)} style={{ background:lang===l?C.teal:"transparent",color:lang===l?C.dark:"rgba(255,255,255,0.6)",border:"none",borderRadius:16,padding:"4px 12px",fontSize:12,fontWeight:700,cursor:"pointer",transition:"all 0.2s" }}>{l==="en"?"EN":"ID"}</button>
            ))}
          </div>
          <a href="#support" style={{ background:C.teal,color:C.dark,padding:"8px 20px",borderRadius:20,fontSize:13,fontWeight:700,textDecoration:"none" }}>{lang==="en"?"Fuel the Mission":"Dukung Kami"}</a>
        </div>
        <button onClick={()=>setOpen(!open)} className="nav-mobile-btn" style={{ background:"none",border:"none",color:C.white,fontSize:24,cursor:"pointer" }}>{open?"✕":"☰"}</button>
      </div>
      {open&&(
        <div style={{ background:C.dark,padding:"20px 24px",borderTop:"1px solid rgba(2,195,154,0.15)" }}>
          {links.map(([href,label])=>(<a key={href} href={href} onClick={()=>setOpen(false)} style={{ display:"block",color:"rgba(255,255,255,0.8)",fontSize:16,fontWeight:500,textDecoration:"none",padding:"12px 0",borderBottom:"1px solid rgba(255,255,255,0.05)" }}>{label}</a>))}
          <div style={{ marginTop:16,display:"flex",gap:8 }}>
            {(["en","id"] as const).map(l=>(<button key={l} onClick={()=>setLang(l)} style={{ background:lang===l?C.teal:"rgba(255,255,255,0.08)",color:lang===l?C.dark:"rgba(255,255,255,0.6)",border:"none",borderRadius:16,padding:"6px 16px",fontSize:13,fontWeight:700,cursor:"pointer" }}>{l==="en"?"English":"Bahasa"}</button>))}
          </div>
        </div>
      )}
    </nav>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
export default function HomePage() {
  const [lang,setLang]=useState<"en"|"id">("en");
  const t=T[lang];

  return(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{background:${C.dark};font-family:'Plus Jakarta Sans',sans-serif;color:${C.text};overflow-x:hidden}
        ::selection{background:${C.teal};color:${C.dark}}
        .section-max{max-width:1200px;margin:0 auto;padding:0 24px}
        .display-font{font-family:'Playfair Display',serif}
        .grain-overlay{position:fixed;inset:0;pointer-events:none;z-index:0;opacity:0.025;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")}
        .teal-glow{position:absolute;border-radius:50%;filter:blur(100px);pointer-events:none;opacity:0.12}
        .nav-desktop{display:flex!important}.nav-mobile-btn{display:none!important}
        .hero-grid{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center}
        .two-col{display:grid;grid-template-columns:1fr 1fr;gap:48px}
        .three-col{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
        .four-col{display:grid;grid-template-columns:repeat(4,1fr);gap:24px}
        .footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:40px}
        .photo-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
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
        .photo-img{width:100%;height:200px;object-fit:cover;border-radius:16px;filter:brightness(0.85)saturate(1.1)}
        .social-link{display:flex;align-items:center;gap:8px;color:rgba(255,255,255,0.5);text-decoration:none;font-size:13px;transition:color 0.2s;padding:6px 0}
        .social-link:hover{color:${C.teal}}
      `}</style>

      <div className="grain-overlay"/>
      <Nav lang={lang} setLang={setLang}/>

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section style={{ minHeight:"100vh",position:"relative",display:"flex",alignItems:"center",overflow:"hidden",background:`linear-gradient(160deg,${C.dark} 0%,${C.charcoal} 100%)` }}>
        <div className="teal-glow" style={{ width:600,height:600,background:C.teal,top:-200,right:-100 }}/>
        <div className="teal-glow" style={{ width:400,height:400,background:"#017367",bottom:-100,left:-100 }}/>
        <div style={{ position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(2,195,154,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(2,195,154,0.05) 1px,transparent 1px)",backgroundSize:"60px 60px",pointerEvents:"none" }}/>
        <div className="section-max" style={{ position:"relative",zIndex:1,paddingTop:120,paddingBottom:80,width:"100%" }}>
          <div className="hero-grid">
            <div>
              <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:"rgba(2,195,154,0.1)",border:"1px solid rgba(2,195,154,0.3)",borderRadius:20,padding:"6px 16px",marginBottom:24 }}>
                <span style={{ width:6,height:6,borderRadius:"50%",background:C.teal,display:"inline-block",flexShrink:0 }}/>
                <span style={{ color:C.teal,fontSize:12,fontWeight:600,letterSpacing:1 }}>{t.badge}</span>
              </div>
              <h1 className="display-font" style={{ fontSize:"clamp(40px,5vw,68px)",color:C.white,lineHeight:1.1,marginBottom:24 }}>
                {t.heroH1a}<br/>{t.heroH1b}<br/><span style={{ color:C.teal }}>{t.heroH1c}</span>
              </h1>
              <p style={{ fontSize:18,color:"rgba(255,255,255,0.65)",lineHeight:1.8,marginBottom:32,maxWidth:480 }}>{t.heroBody}</p>
              <div style={{ display:"flex",gap:16,flexWrap:"wrap" }}>
                <a href="#story" style={{ background:C.teal,color:C.dark,padding:"14px 28px",borderRadius:12,fontSize:15,fontWeight:700,textDecoration:"none",display:"inline-flex",alignItems:"center",gap:8 }}>{t.cta1} ↓</a>
                <a href="#support" style={{ border:"1.5px solid rgba(2,195,154,0.4)",color:C.white,padding:"14px 28px",borderRadius:12,fontSize:15,fontWeight:600,textDecoration:"none" }}>{t.cta2}</a>
              </div>
            </div>
            <div>
              <div style={{ background:"rgba(2,195,154,0.06)",border:"1px solid rgba(2,195,154,0.2)",borderRadius:24,padding:32,position:"relative",overflow:"hidden" }}>
                <div style={{ position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(90deg,transparent,#02C39A,transparent)" }}/>
                <div style={{ fontFamily:"monospace",fontSize:13 }}>
                  <div style={{ color:C.muted,fontSize:11,textAlign:"center",marginBottom:16 }}>💬 SahAIbat WhatsApp Triage</div>
                  {[
                    {msg:"Sari, 28, P, hamil",u:true,urg:false},
                    {msg:"🤰 Modul Ibu Hamil\n\nUsia kehamilan berapa minggu?",u:false,urg:false},
                    {msg:"32",u:true,urg:false},
                    {msg:"Apakah ada sakit kepala berat?\n1=Ya  2=Tidak",u:false,urg:false},
                    {msg:"1",u:true,urg:false},
                    {msg:"🔴 DARURAT — Rujuk ke Puskesmas SEGERA\n\nTanda preeklampsia terdeteksi.\nDampingi ibu sekarang.",u:false,urg:true},
                  ].map((m,i)=>(
                    <div key={i} style={{ display:"flex",justifyContent:m.u?"flex-end":"flex-start",marginBottom:10 }}>
                      <div style={{ background:m.urg?"rgba(232,72,85,0.15)":m.u?"rgba(2,195,154,0.15)":"rgba(255,255,255,0.06)", border:m.urg?"1px solid rgba(232,72,85,0.3)":m.u?"1px solid rgba(2,195,154,0.3)":"1px solid rgba(255,255,255,0.08)", borderRadius:12,padding:"8px 12px",maxWidth:"80%", color:m.urg?"#FF6B6B":m.u?C.teal:"rgba(255,255,255,0.8)", fontSize:12,lineHeight:1.5,whiteSpace:"pre-line" }}>{m.msg}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop:16,paddingTop:16,borderTop:"1px solid rgba(255,255,255,0.06)",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8 }}>
                  <span style={{ color:C.muted,fontSize:11 }}>✓ {lang==="en"?"Saved locally · Syncs when signal returns":"Tersimpan lokal · Tersinkron saat sinyal kembali"}</span>
                  <span style={{ color:C.teal,fontSize:11 }}>📵 {lang==="en"?"Works offline":"Bekerja offline"}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="four-col" style={{ marginTop:64,paddingTop:40,borderTop:"1px solid rgba(255,255,255,0.08)" }}>
            {[
              {n:61000,s:"+",label:lang==="en"?"Community Health Workers":"Kader Kesehatan",sub:lang==="en"?"in our target network":"dalam jaringan target kami"},
              {n:8,s:"+ modules",label:lang==="en"?"Clinical Modules":"Modul Klinis",sub:lang==="en"?"maternal · child · TB · dengue · HIV · malaria":"maternal · anak · TB · dengue · HIV · malaria"},
              {n:0,s:"",label:lang==="en"?"Cost to Communities":"Biaya ke Komunitas",sub:lang==="en"?"always free":"selalu gratis"},
              {n:100,s:"%",label:lang==="en"?"Data Stays in Indonesia":"Data di Indonesia",sub:"AWS Jakarta · AES-256"},
            ].map(({n,s,label,sub})=>(
              <div key={label} style={{ textAlign:"center" }}>
                <div className="display-font" style={{ fontSize:36,color:C.teal,fontWeight:900,lineHeight:1 }}>{n===0?"Rp 0":<Counter end={n} suffix={s}/>}</div>
                <div style={{ color:C.white,fontSize:13,fontWeight:600,marginTop:8 }}>{label}</div>
                <div style={{ color:C.muted,fontSize:11,marginTop:4 }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ STORY ═════════════════════════════════════════════════════════════ */}
      <section id="story" style={{ background:C.cream,padding:"100px 0" }}>
        <div className="section-max">
          <FadeIn>
            <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:`${C.tealDk}20`,border:`1px solid ${C.tealDk}40`,borderRadius:20,padding:"6px 16px",marginBottom:16 }}>
              <span style={{ color:C.tealDk,fontSize:12,fontWeight:600,letterSpacing:1 }}>{t.storyLabel}</span>
            </div>
            <h2 className="display-font" style={{ fontSize:"clamp(32px,4vw,52px)",color:C.dark,lineHeight:1.2,marginBottom:24,maxWidth:700 }}>{t.storyH2}</h2>
          </FadeIn>

          {/* Community photo strip */}
          <FadeIn delay={100}>
            <div className="photo-grid" style={{ marginBottom:48 }}>
              <div style={{ position:"relative",overflow:"hidden",borderRadius:16 }}>
                <img src={PHOTOS.kaderField} alt="Community health worker in the field" className="photo-img"/>
                <div style={{ position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent,rgba(15,31,28,0.7))",padding:"12px 14px",borderRadius:"0 0 16px 16px" }}>
                  <span style={{ color:C.white,fontSize:11,fontWeight:600 }}>🌿 {lang==="en"?"Kader in the field":"Kader di lapangan"}</span>
                </div>
              </div>
              <div style={{ position:"relative",overflow:"hidden",borderRadius:16 }}>
                <img src={PHOTOS.motherChild} alt="Mother and child at health check" className="photo-img"/>
                <div style={{ position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent,rgba(15,31,28,0.7))",padding:"12px 14px",borderRadius:"0 0 16px 16px" }}>
                  <span style={{ color:C.white,fontSize:11,fontWeight:600 }}>🤱 {lang==="en"?"Mother & child care":"Ibu dan anak"}</span>
                </div>
              </div>
              <div style={{ position:"relative",overflow:"hidden",borderRadius:16 }}>
                <img src={PHOTOS.posyandu} alt="Posyandu health session" className="photo-img"/>
                <div style={{ position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent,rgba(15,31,28,0.7))",padding:"12px 14px",borderRadius:"0 0 16px 16px" }}>
                  <span style={{ color:C.white,fontSize:11,fontWeight:600 }}>🏥 {lang==="en"?"Posyandu session":"Sesi Posyandu"}</span>
                </div>
              </div>
            </div>
          </FadeIn>

          <div className="two-col">
            <FadeIn delay={100}>
              <div style={{ fontSize:16,color:C.text,lineHeight:1.9 }}>
                <p style={{ marginBottom:20 }}>{t.storyP1}</p>
                <p style={{ marginBottom:20 }}>{t.storyP2}</p>
                <p style={{ fontWeight:700,fontSize:18,color:C.dark }}>{t.storyP3}</p>
              </div>
            </FadeIn>
            <FadeIn delay={200}>
              <div style={{ background:C.dark,borderRadius:20,padding:32,color:C.white }}>
                <div style={{ fontSize:48,marginBottom:16 }}>🌿</div>
                <div style={{ fontFamily:"'Playfair Display',serif",fontSize:22,lineHeight:1.4,marginBottom:16 }}>
                  {t.companionQ} <em style={{ color:C.teal }}>{t.companionW}</em> {t.companionR}
                </div>
                <p style={{ color:"rgba(255,255,255,0.6)",fontSize:15,lineHeight:1.7 }}>{t.companionBody}</p>
                <div style={{ marginTop:24,paddingTop:24,borderTop:"1px solid rgba(255,255,255,0.1)",display:"flex",gap:20,flexWrap:"wrap" }}>
                  {[{l:"WhatsApp-first",s:lang==="en"?"no app download":"tidak perlu unduh"},{l:lang==="en"?"Offline-capable":"Bisa Offline",s:lang==="en"?"no signal needed":"tanpa sinyal"},{l:lang==="en"?"Free forever":"Gratis Selamanya",s:lang==="en"?"for communities":"untuk komunitas"}].map(({l,s})=>(
                    <div key={l}><div style={{ color:C.teal,fontWeight:700,fontSize:15 }}>{l}</div><div style={{ color:"rgba(255,255,255,0.5)",fontSize:11 }}>{s}</div></div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={200}>
            <div style={{ marginTop:64,background:`linear-gradient(135deg,${C.tealXdk},${C.tealDk})`,borderRadius:24,padding:48,position:"relative",overflow:"hidden" }}>
              <div style={{ position:"absolute",top:-40,right:-40,width:200,height:200,borderRadius:"50%",background:"rgba(255,255,255,0.04)",pointerEvents:"none" }}/>
              <div className="two-col" style={{ position:"relative",zIndex:1,alignItems:"center" }}>
                <div>
                  <h3 className="display-font" style={{ fontSize:32,color:C.white,marginBottom:16 }}>{t.whyFree}</h3>
                  <p style={{ color:"rgba(255,255,255,0.7)",lineHeight:1.8,fontSize:15 }}>{t.whyBody}</p>
                </div>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
                  {[{i:"🏥",tl:lang==="en"?"Puskesmas-aligned":"Sesuai Puskesmas",d:lang==="en"?"Follows MoH standards":"Standar Kemenkes"},{i:"📱",tl:lang==="en"?"No smartphone needed":"Tanpa smartphone",d:lang==="en"?"Any WhatsApp phone":"Semua HP WhatsApp"},{i:"🔒",tl:lang==="en"?"Data in Indonesia":"Data di Indonesia",d:"Jakarta · AES-256"},{i:"🤝",tl:lang==="en"?"NGO-owned data":"Data milik NGO",d:lang==="en"?"Your data, your control":"Kendali Anda"}].map(({i,tl,d})=>(
                    <div key={tl} style={{ background:"rgba(255,255,255,0.07)",borderRadius:12,padding:16 }}>
                      <div style={{ fontSize:22,marginBottom:8 }}>{i}</div>
                      <div style={{ color:C.white,fontWeight:600,fontSize:13,marginBottom:4 }}>{tl}</div>
                      <div style={{ color:"rgba(255,255,255,0.5)",fontSize:12,lineHeight:1.5 }}>{d}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══ PRODUCTS ══════════════════════════════════════════════════════════ */}
      <ProductsSection lang={lang}/>

      {/* ══ IMPACT ════════════════════════════════════════════════════════════ */}
      <section id="impact" style={{ background:C.dark,padding:"100px 0",position:"relative",overflow:"hidden" }}>
        <div className="teal-glow" style={{ width:500,height:500,background:C.teal,top:"20%",left:"-10%" }}/>
        <div className="section-max" style={{ position:"relative",zIndex:1 }}>
          <FadeIn>
            <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:"rgba(2,195,154,0.1)",border:"1px solid rgba(2,195,154,0.3)",borderRadius:20,padding:"6px 16px",marginBottom:16 }}>
              <span style={{ color:C.teal,fontSize:12,fontWeight:600,letterSpacing:1 }}>{t.impactLabel}</span>
            </div>
            <h2 className="display-font" style={{ fontSize:"clamp(32px,4vw,52px)",color:C.white,lineHeight:1.2,marginBottom:16,maxWidth:600 }}>{t.impactH2}</h2>
            <p style={{ color:"rgba(255,255,255,0.5)",fontSize:16,maxWidth:500,lineHeight:1.7,marginBottom:64 }}>{t.impactBody}</p>
          </FadeIn>

          <div className="three-col" style={{ marginBottom:64 }}>
            {[
              {icon:"🤱",color:C.pink,title:lang==="en"?"Maternal Health":"Kesehatan Ibu",stat:"4 danger signs",desc:lang==="en"?"preeclampsia, hemorrhage, fetal distress, infection — in under 3 minutes":"preeklampsia, perdarahan, gawat janin, infeksi — dalam 3 menit",detail:lang==="en"?"Maternal mortality in NTT is 3× the national average. SahAIbat detects the top 4 killers of pregnant women before it's too late.":"Kematian ibu di NTT 3× rata-rata nasional. SahAIbat mendeteksi 4 penyebab kematian ibu hamil teratas sebelum terlambat."},
              {icon:"👶",color:C.teal,title:lang==="en"?"Child Stunting":"Stunting Anak",stat:"WHO 2006",desc:lang==="en"?"WAZ · LAZ · WFH — all 4 indicators in every Posyandu visit":"WAZ · LAZ · WFH — semua 4 indikator di setiap kunjungan Posyandu",detail:lang==="en"?"1 in 5 Indonesian children is stunted. SahAIbat calculates WHO growth indicators automatically.":"1 dari 5 anak Indonesia stunting. SahAIbat menghitung indikator pertumbuhan WHO secara otomatis."},
              {icon:"🍼",color:C.gold,title:lang==="en"?"Neonatal Care":"Perawatan Neonatal",stat:"0–28 days",desc:lang==="en"?"danger sign detection for newborns — the most critical window":"deteksi tanda bahaya bayi baru lahir — jendela paling kritis",detail:lang==="en"?"Most neonatal deaths happen in the first 7 days. SahAIbat screens every newborn for 9 KMS danger signs.":"Sebagian besar kematian neonatal terjadi dalam 7 hari pertama. SahAIbat memeriksa 9 tanda bahaya KMS."},
              {icon:"🫁",color:"#E8A838",title:lang==="en"?"Tuberculosis (TB)":"Tuberkulosis (TB)",stat:lang==="en"?"Early detection":"Deteksi Dini",desc:lang==="en"?"symptom screening · contact tracing · treatment adherence support":"skrining gejala · pelacakan kontak · dukungan kepatuhan pengobatan",detail:lang==="en"?"Indonesia has the second highest TB burden in the world. SahAIbat helps Kaders screen household contacts and support treatment compliance in the community.":"Indonesia memiliki beban TB tertinggi kedua di dunia. SahAIbat membantu Kader memeriksa kontak rumah tangga dan mendukung kepatuhan pengobatan di komunitas."},
              {icon:"🦟",color:"#F97316",title:lang==="en"?"Dengue Fever":"Demam Berdarah",stat:lang==="en"?"Warning signs":"Tanda Peringatan",desc:lang==="en"?"early danger sign detection · referral guidance · household surveillance":"deteksi tanda bahaya dini · panduan rujukan · surveilans rumah tangga",detail:lang==="en"?"Dengue is endemic across Indonesia. SahAIbat guides Kaders through structured dengue screening and alerts them to warning signs requiring urgent referral.":"Dengue endemik di seluruh Indonesia. SahAIbat membimbing Kader melalui skrining dengue terstruktur dan memberi peringatan tanda bahaya yang memerlukan rujukan segera."},
              {icon:"🔴",color:"#EF4444",title:lang==="en"?"HIV & Malaria":"HIV & Malaria",stat:lang==="en"?"Community screening":"Skrining Komunitas",desc:lang==="en"?"risk assessment · referral pathways · follow-up support for rural communities":"penilaian risiko · jalur rujukan · dukungan tindak lanjut untuk komunitas pedesaan",detail:lang==="en"?"From Papua to NTT, HIV and malaria remain high-burden in remote communities. SahAIbat supports Kaders with structured risk screening and clear referral protocols.":"Dari Papua hingga NTT, HIV dan malaria tetap menjadi beban tinggi di komunitas terpencil. SahAIbat mendukung Kader dengan skrining risiko terstruktur dan protokol rujukan yang jelas."},
            ].map(({icon,color,title,stat,desc,detail})=>(
              <FadeIn key={title} delay={100}>
                <div style={{ background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:20,padding:28,height:"100%",transition:"border-color 0.2s" }}
                  onMouseEnter={e=>(e.currentTarget as HTMLElement).style.borderColor=`${color}60`}
                  onMouseLeave={e=>(e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.08)"}>
                  <div style={{ fontSize:36,marginBottom:16 }}>{icon}</div>
                  <div style={{ color,fontWeight:700,fontSize:13,marginBottom:8 }}>{title}</div>
                  <div className="display-font" style={{ color:C.white,fontSize:22,marginBottom:8 }}>{stat}</div>
                  <div style={{ color:"rgba(255,255,255,0.5)",fontSize:13,lineHeight:1.6,marginBottom:16 }}>{desc}</div>
                  <p style={{ color:"rgba(255,255,255,0.35)",fontSize:12,lineHeight:1.7,borderTop:"1px solid rgba(255,255,255,0.06)",paddingTop:16 }}>{detail}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* ── PILOTS IN PROGRESS ───────────────────────────────────────────
              To update: tell Claude the partner name, region, focus, and any
              key stats and ask it to populate this section.
          ─────────────────────────────────────────────────────────────────── */}
          <FadeIn>
            <div style={{ background:"rgba(2,195,154,0.04)",border:"1px dashed rgba(2,195,154,0.25)",borderRadius:20,padding:40,textAlign:"center" }}>
              <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:"rgba(2,195,154,0.1)",border:"1px solid rgba(2,195,154,0.2)",borderRadius:20,padding:"5px 14px",marginBottom:20 }}>
                <span style={{ width:8,height:8,borderRadius:"50%",background:C.teal,display:"inline-block",animation:"pulse 1.5s infinite" }}/>
                <span style={{ color:C.teal,fontSize:12,fontWeight:700,letterSpacing:1 }}>{t.pilotsLabel}</span>
              </div>
              <h3 className="display-font" style={{ color:C.white,fontSize:"clamp(20px,2.5vw,30px)",marginBottom:12,lineHeight:1.3 }}>{t.pilotsH2}</h3>
              <p style={{ color:"rgba(255,255,255,0.45)",fontSize:15,lineHeight:1.8,maxWidth:520,margin:"0 auto" }}>{t.pilotsBody}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══ FOR NGOs ══════════════════════════════════════════════════════════ */}
      <NgoSection lang={lang}/>

      {/* ══ FIELD PARTNERS ════════════════════════════════════════════════════ */}
      <FieldPartnersSection lang={lang}/>

      {/* ══ PLATFORM ══════════════════════════════════════════════════════════ */}
      <section id="platform" style={{ background:C.warm,padding:"100px 0" }}>
        <div className="section-max">
          <FadeIn>
            <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:`${C.tealDk}15`,border:`1px solid ${C.tealDk}30`,borderRadius:20,padding:"6px 16px",marginBottom:16 }}>
              <span style={{ color:C.tealDk,fontSize:12,fontWeight:600,letterSpacing:1 }}>{t.platformLabel}</span>
            </div>
            <h2 className="display-font" style={{ fontSize:"clamp(32px,4vw,52px)",color:C.dark,lineHeight:1.2,marginBottom:16,maxWidth:700,whiteSpace:"pre-line" }}>{t.platformH2}</h2>
            <p style={{ color:C.muted,fontSize:16,maxWidth:560,lineHeight:1.8,marginBottom:64 }}>{t.platformBody}</p>
          </FadeIn>
          <div className="two-col" style={{ marginBottom:48 }}>
            <FadeIn delay={100}>
              <div style={{ background:C.white,borderRadius:20,padding:32,border:`1px solid rgba(2,195,154,0.15)` }}>
                <div style={{ color:C.teal,fontWeight:700,fontSize:12,letterSpacing:1,marginBottom:16 }}>✅ {lang==="en"?"WHAT AI DOES":"APA YANG AI LAKUKAN"}</div>
                {[[lang==="en"?"Natural language understanding":"Memahami bahasa alami",lang==="en"?"Kader types freely — AI understands informal Bahasa Indonesia":"Kader mengetik bebas — AI memahami Bahasa Indonesia informal"],[lang==="en"?"Smart routing":"Perutean cerdas",lang==="en"?"Complaint text routed to the right clinical module":"Teks keluhan diarahkan ke modul klinis yang tepat"],[lang==="en"?"Contextual guidance":"Panduan kontekstual",lang==="en"?"After rules run, AI adds warm practical guidance":"Setelah aturan dijalankan, AI menambah panduan praktis"],[lang==="en"?"Report generation":"Pembuatan laporan",lang==="en"?"Structured clinical summaries for nurse/doctor review":"Ringkasan klinis terstruktur untuk ditinjau tenaga medis"]].map(([ti,de])=>(
                  <div key={ti} style={{ display:"flex",gap:12,marginBottom:20 }}>
                    <div style={{ width:6,height:6,borderRadius:"50%",background:C.teal,marginTop:8,flexShrink:0 }}/>
                    <div><div style={{ fontWeight:600,fontSize:14,color:C.dark,marginBottom:4 }}>{ti}</div><div style={{ fontSize:13,color:C.muted,lineHeight:1.6 }}>{de}</div></div>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={200}>
              <div style={{ background:C.dark,borderRadius:20,padding:32 }}>
                <div style={{ color:"#FF6B6B",fontWeight:700,fontSize:12,letterSpacing:1,marginBottom:16 }}>🚫 {lang==="en"?"WHAT AI NEVER DOES":"APA YANG AI TIDAK PERNAH LAKUKAN"}</div>
                {[[lang==="en"?"Diagnose":"Mendiagnosis",lang==="en"?"AI never outputs a diagnosis. The rules engine classifies risk.":"AI tidak pernah menghasilkan diagnosis."],[lang==="en"?"Prescribe":"Meresepkan",lang==="en"?"No drug names, no dosages — only triage guidance":"Tidak ada nama obat, tidak ada dosis"],[lang==="en"?"Override WHO/KMS standards":"Mengesampingkan standar WHO/KMS",lang==="en"?"Clinical thresholds come from WHO 2006 and Permenkes 2/2020":"Ambang batas dari WHO 2006 dan Permenkes 2/2020"],[lang==="en"?"Make final decisions":"Membuat keputusan akhir",lang==="en"?"Every output is guidance — the Kader or doctor decides":"Setiap output adalah panduan — Kader atau dokter yang memutuskan"]].map(([ti,de])=>(
                  <div key={ti} style={{ display:"flex",gap:12,marginBottom:20 }}>
                    <div style={{ width:6,height:6,borderRadius:"50%",background:"#FF6B6B",marginTop:8,flexShrink:0 }}/>
                    <div><div style={{ fontWeight:600,fontSize:14,color:C.white,marginBottom:4 }}>{ti}</div><div style={{ fontSize:13,color:"rgba(255,255,255,0.4)",lineHeight:1.6 }}>{de}</div></div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
          <FadeIn>
            <div style={{ background:C.dark,borderRadius:20,padding:40,display:"flex",gap:32,alignItems:"center",flexWrap:"wrap" }}>
              <div style={{ fontSize:56 }}>⚖️</div>
              <div style={{ flex:1,minWidth:240 }}>
                <div style={{ color:C.teal,fontWeight:700,fontSize:12,letterSpacing:1,marginBottom:8 }}>{lang==="en"?"THE RULES ENGINE IS THE SOURCE OF TRUTH":"RULES ENGINE ADALAH SUMBER KEBENARAN"}</div>
                <h3 style={{ color:C.white,fontSize:22,fontWeight:700,marginBottom:12 }}>{lang==="en"?"Deterministic logic. Not probabilistic guessing.":"Logika deterministik. Bukan tebakan probabilistik."}</h3>
                <p style={{ color:"rgba(255,255,255,0.5)",lineHeight:1.7,fontSize:14 }}>
                  {lang==="en"?"SahAIbat's triage outcomes are calculated by a deterministic rules engine — not a language model. WHO growth standards and KMS danger sign thresholds are hardcoded. AI only adds context after the rules run.":"Hasil triase SahAIbat dihitung oleh rules engine deterministik — bukan model bahasa. Standar WHO dan ambang batas KMS dikodekan secara tetap. AI hanya menambah konteks setelah aturan dijalankan."}
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══ TEAM ══════════════════════════════════════════════════════════════ */}
      <TeamSection lang={lang}/>

      {/* ══ SUPPORT ═══════════════════════════════════════════════════════════ */}
      <section id="support" style={{ background:C.dark,padding:"100px 0",position:"relative",overflow:"hidden" }}>
        <div className="teal-glow" style={{ width:600,height:600,background:C.teal,bottom:"-20%",right:"-10%" }}/>
        <div className="section-max" style={{ position:"relative",zIndex:1 }}>
          <FadeIn>
            <div style={{ textAlign:"center",marginBottom:64 }}>
              <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:"rgba(2,195,154,0.1)",border:"1px solid rgba(2,195,154,0.3)",borderRadius:20,padding:"6px 16px",marginBottom:16 }}>
                <span style={{ color:C.teal,fontSize:12,fontWeight:600,letterSpacing:1 }}>{t.supportLabel}</span>
              </div>
              <h2 className="display-font" style={{ fontSize:"clamp(32px,4vw,52px)",color:C.white,lineHeight:1.2,marginBottom:16 }}>
                {t.supportH2a}<br/><span style={{ color:C.teal }}>{t.supportH2b}</span>
              </h2>
              <p style={{ color:"rgba(255,255,255,0.5)",fontSize:16,maxWidth:560,lineHeight:1.8,margin:"0 auto" }}>{t.supportBody}</p>
            </div>
          </FadeIn>
          <div className="three-col" style={{ marginBottom:48 }}>
            {[
              {icon:"☕",title:lang==="en"?"Buy the team a coffee":"Traktir tim kopi",amount:"$5",desc:lang==="en"?"Keeps the server running for a day. Covers one Kader's WhatsApp session costs for a week.":"Menjaga server berjalan sehari.",cta:lang==="en"?"Support on Ko-fi":"Dukung di Ko-fi",href:"https://ko-fi.com/sahaibat",color:C.teal,featured:false},
              {icon:"🌱",title:lang==="en"?"Sponsor a Posyandu session":"Sponsori sesi Posyandu",amount:"$25",desc:lang==="en"?"Funds AI triage support for an entire Posyandu session — 20+ children, mothers, and newborns screened.":"Mendanai dukungan triase AI untuk seluruh sesi Posyandu.",cta:lang==="en"?"Sponsor a Session":"Sponsori Sesi",href:"https://ko-fi.com/sahaibat",color:C.gold,featured:true},
              {icon:"🤝",title:lang==="en"?"Partner with us":"Bermitra dengan kami",amount:lang==="en"?"Let's talk":"Mari bicara",desc:lang==="en"?"NGO, researcher, funder, or government partner — every partnership expands our reach.":"NGO, peneliti, donatur, atau mitra pemerintah.",cta:lang==="en"?"Get in Touch":"Hubungi Kami",href:"mailto:admin@sahaibat.com?subject=Partnership Inquiry",color:C.pink,featured:false},
            ].map(({icon,title,amount,desc,cta,href,color,featured})=>(
              <FadeIn key={title} delay={100}>
                <div style={{ background:featured?`linear-gradient(135deg,${C.tealXdk},${C.tealDk})`:"rgba(255,255,255,0.03)", border:`1.5px solid ${featured?C.teal:"rgba(255,255,255,0.08)"}`, borderRadius:20,padding:32,display:"flex",flexDirection:"column",height:"100%",transform:featured?"scale(1.03)":"scale(1)" }}>
                  {featured&&<div style={{ color:C.teal,fontWeight:700,fontSize:11,letterSpacing:1,marginBottom:12 }}>⭐ {lang==="en"?"MOST IMPACTFUL":"PALING BERDAMPAK"}</div>}
                  <div style={{ fontSize:36,marginBottom:12 }}>{icon}</div>
                  <div className="display-font" style={{ color,fontSize:28,fontWeight:900,marginBottom:8 }}>{amount}</div>
                  <div style={{ color:C.white,fontWeight:700,fontSize:16,marginBottom:12 }}>{title}</div>
                  <p style={{ color:"rgba(255,255,255,0.5)",fontSize:13,lineHeight:1.7,flex:1 }}>{desc}</p>
                  <a href={href} style={{ display:"block",marginTop:24,textAlign:"center",padding:"12px 24px",borderRadius:12,background:featured?C.teal:"transparent",border:`1.5px solid ${featured?C.teal:"rgba(255,255,255,0.2)"}`,color:featured?C.dark:C.white,fontWeight:700,fontSize:14,textDecoration:"none" }}>{cta} →</a>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <div style={{ background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:16,padding:32,display:"flex",gap:24,alignItems:"flex-start",flexWrap:"wrap" }}>
              <div style={{ fontSize:40 }}>🔍</div>
              <div style={{ flex:1,minWidth:240 }}>
                <div style={{ color:C.white,fontWeight:700,fontSize:18,marginBottom:8 }}>{t.transparencyTitle}</div>
                <p style={{ color:"rgba(255,255,255,0.5)",fontSize:14,lineHeight:1.7,maxWidth:600 }}>{t.transparencyBody}</p>
                <div style={{ marginTop:16,display:"flex",gap:12,flexWrap:"wrap" }}>
                  {(lang==="en"?["Server infrastructure","Kader training materials","Field visits to NTT","Clinical validation","Product development"]:["Infrastruktur server","Materi pelatihan Kader","Kunjungan lapangan NTT","Validasi klinis","Pengembangan produk"]).map(item=>(
                    <span key={item} style={{ background:"rgba(2,195,154,0.08)",border:"1px solid rgba(2,195,154,0.15)",color:C.teal,fontSize:12,padding:"4px 12px",borderRadius:20 }}>{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══ FOOTER ════════════════════════════════════════════════════════════ */}
      <footer style={{ background:C.charcoal,borderTop:"1px solid rgba(2,195,154,0.1)",padding:"56px 0 32px" }}>
        <div className="section-max">
          <div className="footer-grid" style={{ marginBottom:48 }}>
            {/* Brand */}
            <div>
              <div style={{ marginBottom:16 }}>
                <img
                  src="/images/logo-horizontal@2x.png"
                  alt="SahAIbat Foundation"
                  style={{ height:32,width:"auto",filter:"brightness(0) invert(1)",opacity:0.85 }}
                />
              </div>
              <p style={{ color:"rgba(255,255,255,0.4)",fontSize:13,lineHeight:1.7,maxWidth:280,marginBottom:16 }}>
                {lang==="en"?"WhatsApp-first AI clinical triage for Community Health Workers in Indonesia. Free for communities. Always.":"Triase klinis AI berbasis WhatsApp untuk Kader Kesehatan Indonesia. Gratis untuk komunitas. Selamanya."}
              </p>
              <p style={{ color:"rgba(255,255,255,0.18)",fontSize:11,lineHeight:1.7 }}>
                All intellectual property owned by<br/>
                <strong style={{ color:"rgba(255,255,255,0.3)" }}>Vinatra · 11679210 Canada Inc</strong><br/>
                Terdaftar PSE Lingkup Privat Asing<br/>NIB: 1202260248509
              </p>
            </div>
            {/* Platform links */}
            <div>
              <div style={{ color:C.teal,fontWeight:700,fontSize:12,letterSpacing:1,marginBottom:16 }}>PLATFORM</div>
              {([["#story",lang==="en"?"How it works":"Cara kerja"],["#products",lang==="en"?"Our products":"Produk kami"],["#ngo",lang==="en"?"For NGOs":"Untuk NGO"],["#platform",lang==="en"?"AI approach":"Pendekatan AI"],["#support",lang==="en"?"Support us":"Dukung kami"]] as [string,string][]).map(([href,label])=>(
                <a key={label} href={href} style={{ display:"block",color:"rgba(255,255,255,0.4)",fontSize:13,textDecoration:"none",marginBottom:9,transition:"color 0.2s" }}
                  onMouseEnter={e=>(e.target as HTMLElement).style.color=C.teal}
                  onMouseLeave={e=>(e.target as HTMLElement).style.color="rgba(255,255,255,0.4)"}>{label}</a>
              ))}
            </div>
            {/* Social */}
            <div>
              <div style={{ color:C.teal,fontWeight:700,fontSize:12,letterSpacing:1,marginBottom:16 }}>CONNECT</div>
              {([
                ["📧","admin@sahaibat.com","mailto:admin@sahaibat.com"],
                ["📸","sahaibat_health","https://instagram.com/sahaibat_health"],
                ["▶️","@SahaibatHealth","https://youtube.com/@SahaibatHealth"],
                ["🎵","@sahaibat","https://tiktok.com/@sahaibat"],
                ["💼","LinkedIn","https://www.linkedin.com/company/110529968/"],
                ["💬","+62 819 1866 9241","https://wa.me/6281918669241"],
              ] as [string,string,string][]).map(([icon,label,href])=>(
                <a key={label} href={href} target={href.startsWith("http")?"_blank":"_self"} className="social-link">
                  <span style={{ fontSize:14,width:18,textAlign:"center" }}>{icon}</span>
                  <span>{label}</span>
                </a>
              ))}
            </div>
            {/* Legal */}
            <div>
              <div style={{ color:C.teal,fontWeight:700,fontSize:12,letterSpacing:1,marginBottom:16 }}>LEGAL</div>
              {([["Privacy Policy","/privacy"],["Terms of Use","/terms"],["Contact","/contact"]] as [string,string][]).map(([label,href])=>(
                <a key={label} href={href} style={{ display:"block",color:"rgba(255,255,255,0.4)",fontSize:13,textDecoration:"none",marginBottom:9,transition:"color 0.2s" }}
                  onMouseEnter={e=>(e.target as HTMLElement).style.color=C.teal}
                  onMouseLeave={e=>(e.target as HTMLElement).style.color="rgba(255,255,255,0.4)"}>{label}</a>
              ))}
            </div>
          </div>
          <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)",paddingTop:24,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:12 }}>
            <span style={{ color:"rgba(255,255,255,0.2)",fontSize:12 }}>© 2026 SahAIbat Foundation · IP owned by Vinatra (11679210 Canada Inc) · All rights reserved</span>
            <span style={{ color:"rgba(255,255,255,0.2)",fontSize:12 }}>Not a diagnostic tool · Bukan pengganti dokter</span>
          </div>
        </div>
      </footer>
    </>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PRODUCTS SECTION
// ══════════════════════════════════════════════════════════════════════════════
function ProductsSection({ lang }: { lang:"en"|"id" }) {
  const [active,setActive]=useState(0);
  type Msg={msg:string;user:boolean;urgent:boolean};
  type P={id:number;icon:string;label:string;tagline:string;accent:string;headline:string;paras:string[];chatTitle:string;messages:Msg[];after:string;features:string[]};

  const products:P[]=[
    { id:0,icon:"👩‍👦",label:lang==="en"?"Parent / User Chat":"Chat Orang Tua",tagline:lang==="en"?"For worried families, any time of night.":"Untuk keluarga yang khawatir, kapan saja.",accent:C.teal,
      headline:lang==="en"?"2:47 AM. Her son's fever won't break.":"Pukul 02:47. Demam anaknya tidak turun.",
      paras:lang==="en"?["Ibu Dewi is alone. Her husband is working in Surabaya. Her son Rizky — three years old — has been burning with fever for five hours. 39.8°C. He won't stop crying. The nearest clinic opens at 8.","She doesn't know if this is dangerous. She doesn't want to wake anyone at this hour. She doesn't know what to do.","She opens WhatsApp — the only app she trusts at 3 in the morning — and messages SahAIbat."]:["Ibu Dewi sendirian. Suaminya sedang bekerja di Surabaya. Anaknya Rizky — tiga tahun — sudah demam tinggi selama lima jam. 39,8°C. Tidak berhenti menangis. Klinik terdekat buka jam 8.","Ia tidak tahu apakah ini berbahaya. Tidak ingin membangunkan siapa pun jam segini.","Ia membuka WhatsApp — satu-satunya aplikasi yang ia percaya dini hari — dan mengirim pesan ke SahAIbat."],
      chatTitle:"SahAIbat · Family Health Triage",
      messages:[{msg:"Anak saya 3 tahun, demam 39.8, sudah 5 jam, nangis terus",user:true,urgent:false},{msg:"Saya mendengar Anda, Ibu. Mari kita periksa bersama. 💙\n\nApakah Rizky masih mau minum?\n1 = Ya  2 = Tidak",user:false,urgent:false},{msg:"1, sedikit-sedikit",user:true,urgent:false},{msg:"Bagus sekali, itu tanda yang baik.\n\nApakah ada kejang atau kaku leher?\n1 = Ya  2 = Tidak",user:false,urgent:false},{msg:"2",user:true,urgent:false},{msg:"🟡 PANTAU KETAT\n\nDemam tinggi tapi tanda bahaya tidak ada.\n\n• Kompres hangat di dahi\n• Beri minum sedikit tapi sering\n• Pantau setiap 30 menit\n\nJika demam >40°C atau ada kejang → segera ke IGD.",user:false,urgent:false},{msg:"Terima kasih... saya lebih tenang sekarang 🙏",user:true,urgent:false}],
      after:lang==="en"?"Ibu Dewi didn't go to the emergency room that night. She didn't need to. She had a plan, a checklist, and something that understood her fear and answered in her language.\n\nBy morning, Rizky's fever had broken. She had slept, a little. SahAIbat had been there.":"Ibu Dewi tidak pergi ke IGD malam itu. Ia tidak perlu. Ia punya rencana, checklist, dan sesuatu yang memahami ketakutannya.\n\nPagi harinya, demam Rizky turun. Ia sempat tidur, sedikit. SahAIbat ada di sana.",
      features:lang==="en"?["Responds in Bahasa Indonesia or English","Structured risk levels: Monitor / Watch / Clinic / Emergency","No app download — WhatsApp only","Calm, warm tone — not a cold chatbot","Works at 3 AM with zero internet"]:["Menjawab dalam Bahasa Indonesia atau Inggris","Tingkat risiko: Pantau / Waspada / Klinik / Darurat","Tidak perlu unduh app — WhatsApp saja","Nada hangat — bukan chatbot dingin","Bekerja pukul 3 pagi tanpa internet"],
    },
    { id:1,icon:"👩‍⚕️",label:lang==="en"?"Kader Professional Chat":"Chat Profesional Kader",tagline:lang==="en"?"Structured clinical guidance for frontline health workers.":"Panduan klinis terstruktur untuk kader garis depan.",accent:C.pink,
      headline:lang==="en"?"The Kader who catches what no chart could.":"Kader yang menangkap apa yang tidak bisa dilihat KMS.",
      paras:lang==="en"?["Bidan Sari has been a Kader for eleven years in Kefamenanu, NTT. She knows the families by name, by face, by history.","Today she is with a new mother — three weeks postpartum. Something feels wrong. The mother looks pale, barely spoken. No doctor within reach.","She opens SahAIbat's Kader module."]:["Bidan Sari sudah menjadi Kader selama sebelas tahun di Kefamenanu, NTT. Ia mengenal keluarga-keluarga itu dengan nama, wajah, riwayat.","Hari ini ia bersama ibu baru — tiga minggu setelah melahirkan. Ada sesuatu yang terasa tidak beres. Ibu itu tampak pucat, hampir tidak berbicara. Tidak ada dokter dalam jangkauan.","Ia membuka modul Kader SahAIbat."],
      chatTitle:"SahAIbat · Kader Clinical Module",
      messages:[{msg:"Bu Ani, 24th, 3 minggu postpartum, tampak pucat, bicara pelan",user:true,urgent:false},{msg:"🩺 Modul Ibu Nifas\n\nApakah ada perdarahan lebih dari 2 pembalut per jam?\n1 = Ya  2 = Tidak",user:false,urgent:false},{msg:"1",user:true,urgent:false},{msg:"Apakah darah berbau tidak normal?\n1 = Ya  2 = Tidak",user:false,urgent:false},{msg:"1",user:true,urgent:false},{msg:"🔴 DARURAT — RUJUK SEGERA\n\nTanda perdarahan postpartum + infeksi nifas.\n\n• Jangan tinggalkan pasien\n• Hubungi Puskesmas Kefamenanu\n• Catat waktu & kondisi ibu",user:false,urgent:true}],
      after:lang==="en"?"Sari made the call. Bu Ani was at the Puskesmas within 40 minutes. The doctor confirmed postpartum haemorrhage with early infection — treated in time.\n\nSari had always trusted her instincts. SahAIbat gave her the words — and the protocol — to act on them.":"Sari membuat panggilan itu. Bu Ani di Puskesmas dalam 40 menit. Dokter mengkonfirmasi perdarahan postpartum dengan infeksi awal — ditangani tepat waktu.\n\nSari selalu mempercayai instingnya. SahAIbat memberinya kata-kata — dan protokol — untuk bertindak.",
      features:lang==="en"?["4 clinical modules: Maternal · Child · Neonatal · Posyandu","Follows Buku KIA (Permenkes 2/2020) exactly","RUJUK recommendations with Puskesmas name","Visit record synced to Posyandu dashboard","Works without internet"]:["4 modul klinis: Maternal · Anak · Neonatal · Posyandu","Mengikuti Buku KIA (Permenkes 2/2020) persis","Rekomendasi RUJUK dengan nama Puskesmas","Catatan kunjungan tersinkron ke dashboard Posyandu","Bekerja tanpa internet"],
    },
    { id:2,icon:"📵",label:lang==="en"?"Offline Triage Mode":"Mode Triase Offline",tagline:lang==="en"?"Built for places where the internet never came.":"Dibangun untuk tempat-tempat yang tak pernah terjangkau internet.",accent:C.gold,
      headline:lang==="en"?"No signal. No WiFi. No problem.":"Tidak ada sinyal. Tidak ada WiFi. Tidak masalah.",
      paras:lang==="en"?["In Alor, Flores, and the highlands of Timor — entire districts where 4G is a rumour and 2G drops out by noon — Kaders still make their rounds.","Standard digital health tools fail here. They require API calls, cloud sync, data — and data costs money the Kader doesn't have.","SahAIbat Offline Mode was built for these places. Zero network dependency. Full clinical logic. Runs entirely on the Kader's phone."]:["Di Alor, Flores, dan dataran tinggi Timor — seluruh kabupaten di mana 4G hanya kabar burung dan 2G hilang sebelum siang — para Kader tetap bertugas.","Alat kesehatan digital standar gagal di sini. Mereka membutuhkan API call, sinkronisasi cloud, data — dan data membutuhkan biaya yang tidak dimiliki Kader.","Mode Offline SahAIbat dibangun untuk tempat-tempat ini. Nol ketergantungan jaringan. Logika klinis penuh. Berjalan sepenuhnya di ponsel Kader."],
      chatTitle:"SahAIbat · Offline Mode Active",
      messages:[{msg:"📵 Tidak ada sinyal terdeteksi\nMode Offline: AKTIF\nSemua triase berjalan secara lokal",user:false,urgent:false},{msg:"Bayi 6 hari, tidak mau menyusu sejak tadi pagi",user:true,urgent:false},{msg:"🍼 Modul Neonatal (Offline)\n\nApakah bayi tampak kuning (ikterus)?\n1 = Ya  2 = Tidak",user:false,urgent:false},{msg:"1",user:true,urgent:false},{msg:"Apakah kuning sampai ke telapak tangan atau kaki?\n1 = Ya  2 = Tidak",user:false,urgent:false},{msg:"1",user:true,urgent:false},{msg:"🔴 DARURAT — Ikterus Neonatorum Berat\n\nRujuk ke Puskesmas SEGERA.\n\n📱 Catatan tersimpan lokal\n🔄 Tersinkron saat sinyal kembali",user:false,urgent:true}],
      after:lang==="en"?"Zero API calls. Zero cloud dependency. The entire WHO growth engine, KMS danger sign rules, referral logic — running on the Kader's phone, even three mountains from the nearest cell tower.\n\nWhen signal returns, every visit syncs automatically to the Posyandu dashboard.":"Nol API call. Nol ketergantungan cloud. Seluruh engine pertumbuhan WHO, aturan KMS, logika rujukan — berjalan di ponsel Kader, bahkan di balik tiga gunung dari menara seluler terdekat.\n\nKetika sinyal kembali, setiap kunjungan otomatis tersinkron ke dashboard Posyandu.",
      features:lang==="en"?["100% offline — zero network dependency","WHO growth calculations run locally on device","Danger sign rules hardcoded — no AI API needed offline","Auto-sync when any signal returns","Works on 2G feature phones"]:["100% offline — nol ketergantungan jaringan","Kalkulasi pertumbuhan WHO berjalan lokal","Aturan tanda bahaya dikodekan tetap","Sinkronisasi otomatis saat sinyal kembali","Bekerja di ponsel 2G"],
    },
  ];

  const p=products[active];
  return(
    <section id="products" style={{ background:C.dark,padding:"100px 0",position:"relative",overflow:"hidden" }}>
      <div className="teal-glow" style={{ width:400,height:400,background:C.teal,top:"5%",right:"-5%" }}/>
      <div className="section-max" style={{ position:"relative",zIndex:1 }}>
        <FadeIn>
          <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:"rgba(2,195,154,0.1)",border:"1px solid rgba(2,195,154,0.3)",borderRadius:20,padding:"6px 16px",marginBottom:16 }}>
            <span style={{ color:C.teal,fontSize:12,fontWeight:600,letterSpacing:1 }}>{lang==="en"?"OUR PRODUCTS":"PRODUK KAMI"}</span>
          </div>
          <h2 className="display-font" style={{ fontSize:"clamp(32px,4vw,52px)",color:C.white,lineHeight:1.2,marginBottom:16,maxWidth:700 }}>{lang==="en"?"Three tools. One mission.":"Tiga alat. Satu misi."}</h2>
          <p style={{ color:"rgba(255,255,255,0.5)",fontSize:16,maxWidth:560,lineHeight:1.8,marginBottom:48 }}>{lang==="en"?"SahAIbat meets every user where they are — the worried parent at midnight, the Kader in the field, the village where the internet never came.":"SahAIbat hadir untuk setiap pengguna — orang tua yang khawatir tengah malam, Kader di lapangan, desa tanpa sinyal internet."}</p>
        </FadeIn>
        <div style={{ display:"flex",gap:12,marginBottom:48,flexWrap:"wrap" }}>
          {products.map(pr=>(
            <button key={pr.id} onClick={()=>setActive(pr.id)} style={{ display:"flex",alignItems:"center",gap:10,padding:"12px 22px",borderRadius:14,fontSize:14,fontWeight:600,cursor:"pointer",transition:"all 0.25s", background:active===pr.id?pr.accent:"rgba(255,255,255,0.05)", color:active===pr.id?C.dark:"rgba(255,255,255,0.6)", border:active===pr.id?`1.5px solid ${pr.accent}`:"1.5px solid rgba(255,255,255,0.1)" }}>
              <span style={{ fontSize:20 }}>{pr.icon}</span><span>{pr.label}</span>
            </button>
          ))}
        </div>
        <div key={active}>
          <div className="hero-grid" style={{ alignItems:"start" }}>
            <div>
              <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:`${p.accent}15`,border:`1px solid ${p.accent}40`,borderRadius:20,padding:"5px 14px",marginBottom:20 }}>
                <span style={{ color:p.accent,fontSize:12,fontWeight:600 }}>{p.tagline}</span>
              </div>
              <h3 className="display-font" style={{ color:C.white,fontSize:"clamp(22px,2.5vw,34px)",lineHeight:1.25,marginBottom:24 }}>{p.headline}</h3>
              {p.paras.map((para,i)=>(<p key={i} style={{ color:"rgba(255,255,255,0.6)",fontSize:15,lineHeight:1.9,marginBottom:16 }}>{para}</p>))}
              <div style={{ marginTop:32,background:`${p.accent}08`,border:`1px solid ${p.accent}20`,borderRadius:16,padding:24 }}>
                <div style={{ color:p.accent,fontWeight:700,fontSize:11,letterSpacing:1,marginBottom:12 }}>{lang==="en"?"KEY CAPABILITIES":"KEMAMPUAN UTAMA"}</div>
                {p.features.map((f,i)=>(<div key={i} style={{ display:"flex",gap:12,marginBottom:10,alignItems:"flex-start" }}><div style={{ width:6,height:6,borderRadius:"50%",background:p.accent,marginTop:7,flexShrink:0 }}/><span style={{ color:"rgba(255,255,255,0.7)",fontSize:13,lineHeight:1.6 }}>{f}</span></div>))}
              </div>
            </div>
            <div>
              <div style={{ background:"rgba(15,31,28,0.8)",border:`1px solid ${p.accent}30`,borderRadius:24,padding:28,position:"relative",overflow:"hidden",marginBottom:24 }}>
                <div style={{ position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,transparent,${p.accent},transparent)` }}/>
                <div style={{ color:C.muted,fontSize:11,textAlign:"center",marginBottom:16,fontFamily:"monospace" }}>💬 {p.chatTitle}</div>
                <div style={{ fontFamily:"monospace",fontSize:12 }}>
                  {p.messages.map((m,i)=>(
                    <div key={i} style={{ display:"flex",justifyContent:m.user?"flex-end":"flex-start",marginBottom:10 }}>
                      <div style={{ background:m.urgent?"rgba(232,72,85,0.15)":m.user?`${p.accent}20`:"rgba(255,255,255,0.05)", border:m.urgent?"1px solid rgba(232,72,85,0.3)":m.user?`1px solid ${p.accent}40`:"1px solid rgba(255,255,255,0.08)", borderRadius:12,padding:"8px 12px",maxWidth:"85%", color:m.urgent?"#FF6B6B":m.user?p.accent:"rgba(255,255,255,0.75)", fontSize:12,lineHeight:1.55,whiteSpace:"pre-line" }}>{m.msg}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop:14,paddingTop:14,borderTop:"1px solid rgba(255,255,255,0.06)",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:6 }}>
                  <span style={{ color:C.muted,fontSize:10 }}>✓ {lang==="en"?"Saved locally · Syncs when signal returns":"Tersimpan lokal · Tersinkron saat sinyal kembali"}</span>
                  <span style={{ color:p.accent,fontSize:10 }}>📵 {lang==="en"?"Works offline":"Bekerja offline"}</span>
                </div>
              </div>
              <div style={{ background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:16,padding:24 }}>
                <div style={{ color:p.accent,fontWeight:700,fontSize:11,letterSpacing:1,marginBottom:12 }}>— {lang==="en"?"WHAT HAPPENED NEXT":"APA YANG TERJADI SELANJUTNYA"}</div>
                {p.after.split("\n\n").map((para,i,arr)=>(<p key={i} style={{ color:"rgba(255,255,255,0.55)",fontSize:13,lineHeight:1.85,marginBottom:i<arr.length-1?12:0,fontStyle:i===arr.length-1?"italic":"normal" }}>{para}</p>))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// NGO SECTION
// ══════════════════════════════════════════════════════════════════════════════
function NgoSection({ lang }: { lang:"en"|"id" }) {
  const t=T[lang];
  return(
    <section id="ngo" style={{ background:C.cream,padding:"80px 0" }}>
      <div className="section-max">
        <FadeIn>
          <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:`${C.tealDk}15`,border:`1px solid ${C.tealDk}30`,borderRadius:20,padding:"6px 16px",marginBottom:16 }}>
            <span style={{ color:C.tealDk,fontSize:12,fontWeight:600,letterSpacing:1 }}>{t.ngoLabel}</span>
          </div>
          <h2 className="display-font" style={{ fontSize:"clamp(28px,3.5vw,44px)",color:C.dark,lineHeight:1.2,marginBottom:16,maxWidth:600 }}>{t.ngoH2}</h2>
          <p style={{ color:C.muted,fontSize:16,maxWidth:540,lineHeight:1.8,marginBottom:48 }}>{t.ngoBody}</p>
        </FadeIn>

        <div className="three-col" style={{ marginBottom:40 }}>
          {[
            {icon:"🆓",title:lang==="en"?"Free for all communities":"Gratis untuk semua komunitas",desc:lang==="en"?"No licence fees, no per-Kader charges, no hidden costs. SahAIbat is free to deploy for any NGO working in community health.":"Tidak ada biaya lisensi, tidak ada biaya per-Kader, tidak ada biaya tersembunyi. SahAIbat gratis untuk semua NGO yang bekerja di bidang kesehatan komunitas."},
            {icon:"🔧",title:lang==="en"?"Customisable to your programme":"Dapat disesuaikan dengan program Anda",desc:lang==="en"?"We work with your team to align clinical modules, referral pathways, and reporting to your existing programme structure — not the other way around.":"Kami bekerja bersama tim Anda untuk menyesuaikan modul klinis, jalur rujukan, dan pelaporan dengan struktur program yang sudah ada."},
            {icon:"📊",title:lang==="en"?"Data stays yours":"Data tetap milik Anda",desc:lang==="en"?"All community health data collected through SahAIbat is owned by your organisation. Hosted in Jakarta. Never sold, never shared without consent.":"Semua data kesehatan komunitas yang dikumpulkan melalui SahAIbat dimiliki oleh organisasi Anda. Dihosting di Jakarta. Tidak pernah dijual atau dibagikan tanpa persetujuan."},
          ].map(({icon,title,desc})=>(
            <FadeIn key={title} delay={100}>
              <div style={{ background:C.white,borderRadius:20,padding:28,border:"1px solid rgba(2,195,154,0.12)",height:"100%" }}>
                <div style={{ fontSize:36,marginBottom:16 }}>{icon}</div>
                <div style={{ fontWeight:700,fontSize:16,color:C.dark,marginBottom:10 }}>{title}</div>
                <p style={{ color:C.muted,fontSize:13,lineHeight:1.7 }}>{desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* 1000 Days Fund pilot — coming soon
            ── UPDATE THIS BLOCK when MOU is signed ──────────────────────────
            Ask Claude: "The 1000 Days Fund MOU is signed. Update the NGO
            pilot block with [details, region, programme info]"
        ─────────────────────────────────────────────────────────────────── */}
        <FadeIn>
          <div style={{ background:C.dark,borderRadius:20,padding:36,display:"flex",gap:28,alignItems:"center",flexWrap:"wrap" }}>
            <div style={{ fontSize:56 }}>🤝</div>
            <div style={{ flex:1,minWidth:240 }}>
              <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:"rgba(2,195,154,0.1)",border:"1px solid rgba(2,195,154,0.2)",borderRadius:20,padding:"4px 12px",marginBottom:12 }}>
                <span style={{ width:7,height:7,borderRadius:"50%",background:C.teal,display:"inline-block",animation:"pulse 1.5s infinite" }}/>
                <span style={{ color:C.teal,fontSize:11,fontWeight:700,letterSpacing:1 }}>{lang==="en"?"PILOT COMING SOON":"PILOT SEGERA HADIR"}</span>
              </div>
              <div style={{ color:C.white,fontWeight:800,fontSize:22,marginBottom:8 }}>1000 Days Fund</div>
              <p style={{ color:"rgba(255,255,255,0.5)",fontSize:14,lineHeight:1.7,maxWidth:520 }}>
                {lang==="en"
                  ?"SahAIbat is entering a formal pilot partnership with 1000 Days Fund, Indonesia's leading 1000 Hari Pertama Kehidupan programme. Full details will be published here once the partnership is live."
                  :"SahAIbat akan memasuki kemitraan pilot resmi dengan 1000 Days Fund, program 1000 Hari Pertama Kehidupan terkemuka Indonesia. Detail lengkap akan dipublikasikan di sini setelah kemitraan berjalan."}
              </p>
            </div>
            <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
              <div style={{ background:"rgba(2,195,154,0.1)",borderRadius:8,padding:"8px 16px",color:C.teal,fontSize:13,fontWeight:600 }}>61K+ CHWs in network</div>
              <div style={{ background:"rgba(2,195,154,0.1)",borderRadius:8,padding:"8px 16px",color:C.teal,fontSize:13,fontWeight:600 }}>NTT · Bali · 22 districts</div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div style={{ marginTop:32,background:`linear-gradient(135deg,${C.tealXdk},${C.tealDk})`,borderRadius:20,padding:36,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:24 }}>
            <div>
              <div style={{ color:C.white,fontWeight:700,fontSize:20,marginBottom:8 }}>{lang==="en"?"Ready to explore a pilot?":"Siap menjajaki pilot?"}</div>
              <p style={{ color:"rgba(255,255,255,0.7)",fontSize:14,maxWidth:480,lineHeight:1.7 }}>
                {lang==="en"?"Tell us about your programme and we'll respond within 48 hours with a simple next step.":"Ceritakan tentang program Anda dan kami akan membalas dalam 48 jam dengan langkah sederhana."}
              </p>
            </div>
            <div style={{ display:"flex",gap:12,flexWrap:"wrap" }}>
              <a href="mailto:admin@sahaibat.com?subject=NGO Partnership Inquiry" style={{ background:C.teal,color:C.dark,padding:"13px 28px",borderRadius:12,fontSize:14,fontWeight:700,textDecoration:"none" }}>
                {lang==="en"?"Email us directly →":"Email kami langsung →"}
              </a>
              <a href="https://wa.me/6281918669241" style={{ background:"rgba(255,255,255,0.1)",color:C.white,padding:"13px 28px",borderRadius:12,fontSize:14,fontWeight:600,textDecoration:"none" }}>
                💬 WhatsApp
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// FIELD PARTNERS
// ── ADD PARTNERS to FIELD_PARTNERS array below when ready ────────────────────
// Format: { name, region, country, flag, focus, tags[], contact? }
// Ask Claude: "Add [Org Name] as a field partner — region: [x], focus: [y]"
// ══════════════════════════════════════════════════════════════════════════════
const FIELD_PARTNERS: { name:string;region:string;country:string;flag:string;focus:string;tags:string[];contact?:string; }[] = [];

function FieldPartnersSection({ lang }: { lang:"en"|"id" }) {
  const t=T[lang];
  return(
    <section style={{ background:C.dark,padding:"80px 0",borderTop:`1px solid rgba(2,195,154,0.1)` }}>
      <div className="section-max">
        <FadeIn>
          <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:"rgba(2,195,154,0.1)",border:"1px solid rgba(2,195,154,0.3)",borderRadius:20,padding:"6px 16px",marginBottom:16 }}>
            <span style={{ color:C.teal,fontSize:12,fontWeight:600,letterSpacing:1 }}>{t.fieldLabel}</span>
          </div>
          <h2 className="display-font" style={{ fontSize:"clamp(28px,3.5vw,44px)",color:C.white,lineHeight:1.2,marginBottom:16 }}>{t.fieldH2}</h2>
          <p style={{ color:"rgba(255,255,255,0.5)",fontSize:16,maxWidth:520,lineHeight:1.8,marginBottom:48 }}>{t.fieldBody}</p>
        </FadeIn>
        {FIELD_PARTNERS.length>0?(
          <div className="three-col">
            {FIELD_PARTNERS.map(fp=>(
              <FadeIn key={fp.name} delay={100}>
                <div style={{ background:C.charcoal,borderRadius:20,padding:28,border:"1px solid rgba(2,195,154,0.15)",height:"100%" }}>
                  <div style={{ fontSize:32,marginBottom:12 }}>{fp.flag}</div>
                  <div style={{ color:C.teal,fontWeight:700,fontSize:12,marginBottom:6 }}>{fp.region} · {fp.country}</div>
                  <div style={{ fontWeight:800,fontSize:18,color:C.white,marginBottom:10 }}>{fp.name}</div>
                  <p style={{ color:"rgba(255,255,255,0.5)",fontSize:13,lineHeight:1.7,marginBottom:16 }}>{fp.focus}</p>
                  <div style={{ display:"flex",gap:8,flexWrap:"wrap",marginBottom:fp.contact?16:0 }}>
                    {fp.tags.map(tag=>(<span key={tag} style={{ background:"rgba(2,195,154,0.1)",border:"1px solid rgba(2,195,154,0.2)",color:C.teal,fontSize:11,padding:"3px 10px",borderRadius:20,fontWeight:600 }}>{tag}</span>))}
                  </div>
                  {fp.contact&&<a href={fp.contact} style={{ color:C.teal,fontSize:13,fontWeight:600,textDecoration:"none" }}>{lang==="en"?"Get in touch →":"Hubungi →"}</a>}
                </div>
              </FadeIn>
            ))}
          </div>
        ):(
          <FadeIn>
            <div style={{ background:C.charcoal,borderRadius:24,padding:64,textAlign:"center",border:"2px dashed rgba(2,195,154,0.2)",position:"relative",overflow:"hidden" }}>
              <div style={{ position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(2,195,154,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(2,195,154,0.02) 1px,transparent 1px)",backgroundSize:"32px 32px",pointerEvents:"none" }}/>
              <div style={{ position:"relative",zIndex:1 }}>
                <div style={{ fontSize:64,marginBottom:20 }}>🗺️</div>
                <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:"rgba(2,195,154,0.1)",border:"1px solid rgba(2,195,154,0.2)",borderRadius:20,padding:"6px 16px",marginBottom:20 }}>
                  <span style={{ width:8,height:8,borderRadius:"50%",background:C.teal,display:"inline-block",animation:"pulse 1.5s infinite" }}/>
                  <span style={{ color:C.teal,fontSize:12,fontWeight:700,letterSpacing:1 }}>{lang==="en"?"COMING SOON":"SEGERA HADIR"}</span>
                </div>
                <h3 className="display-font" style={{ color:C.white,fontSize:"clamp(20px,2.5vw,30px)",marginBottom:16,lineHeight:1.3 }}>{t.fieldComingSoon}</h3>
                <p style={{ color:"rgba(255,255,255,0.4)",fontSize:15,lineHeight:1.8,maxWidth:480,margin:"0 auto 36px" }}>{t.fieldComingSoonBody}</p>
                <a href="mailto:admin@sahaibat.com?subject=Field Partner Inquiry" style={{ background:C.teal,color:C.dark,padding:"13px 32px",borderRadius:12,fontSize:14,fontWeight:700,textDecoration:"none" }}>{t.fieldCTA}</a>
              </div>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TEAM SECTION — passion-driven, not CV-recitation
// ══════════════════════════════════════════════════════════════════════════════
function TeamSection({ lang }: { lang:"en"|"id" }) {
  const t=T[lang];

  const members = [
    {
      name: "Sanjib Maity",
      role: lang==="en" ? "Founder · SahAIbat Foundation / Vinatra" : "Pendiri · SahAIbat Foundation / Vinatra",
      loc: lang==="en" ? "Canada 🇨🇦" : "Kanada 🇨🇦",
      photo: "/images/sanjib.jpeg",
      color: C.teal,
      bg: C.dark,
      tc: C.white,
      passion: lang==="en"
        ? "Sanjib spent a decade building enterprise automation systems — and couldn't stop asking the same question: why do the communities with the highest disease burden have the least digital support? He left a comfortable career to build the answer. SahAIbat is what happens when a technologist refuses to look away."
        : "Sanjib menghabiskan satu dekade membangun sistem otomasi enterprise — dan tidak bisa berhenti bertanya: mengapa komunitas dengan beban penyakit tertinggi mendapat dukungan digital paling sedikit? Ia meninggalkan karier yang nyaman untuk membangun jawabannya. SahAIbat adalah hasil dari seorang teknolog yang menolak untuk berpaling.",
      tags: ["AI Systems","Health Equity","Founder","Canada → Indonesia"],
    },
    {
      name: "Dr. Ratih Rakhmawati, M.Biomed",
      role: lang==="en" ? "Clinical & Digital Health Lead" : "Pemimpin Klinis & Kesehatan Digital",
      loc: "Indonesia 🇮🇩",
      photo: "/images/____Rathi.jpg",
      color: C.pink,
      bg: C.white,
      tc: C.dark,
      passion: lang==="en"
        ? "Dr. Ratih has spent over 20 years strengthening health systems across Indonesia — leading digital training programmes that reached thousands of cadres and providers across multiple provinces. She believes the future of community health is built on people who are well-equipped, not just well-meaning. At SahAIbat, she ensures every clinical module is grounded in national standards and designed to actually work in the hands of the people using it."
        : "Dr. Ratih telah menghabiskan lebih dari 20 tahun memperkuat sistem kesehatan di seluruh Indonesia — memimpin program pelatihan digital yang menjangkau ribuan kader dan tenaga kesehatan di berbagai provinsi. Ia percaya masa depan kesehatan komunitas dibangun di atas orang-orang yang benar-benar dibekali, bukan sekadar berniat baik. Di SahAIbat, ia memastikan setiap modul klinis berakar pada standar nasional dan dirancang untuk benar-benar bekerja di tangan penggunanya.",
      tags: ["20+ Years Health Systems","Digital Training","LMS · Blended Learning","WHO Standards"],
    },
    {
      name: "Stefanus Bere",
      role: lang==="en" ? "Programme Director · Health Systems & Community" : "Direktur Program · Sistem Kesehatan & Komunitas",
      loc: "East Nusa Tenggara 🇮🇩",
      photo: "/images/__Stefan.png",
      color: C.gold,
      bg: C.white,
      tc: C.dark,
      passion: lang==="en"
        ? "Stefanus has spent nearly 20 years working where the need is greatest — building health systems in NTT and Timor-Leste that are equitable, accountable, and community-driven. He led district-level reforms under the DFAT-funded Australia-Indonesia maternal health partnership, and has worked with USAID, the UN, IOM, and CARE International. A University of Queensland alumnus, he brings the rare combination of policy depth and field fluency that SahAIbat needs to reach communities that systems often miss."
        : "Stefanus telah menghabiskan hampir 20 tahun bekerja di tempat yang paling membutuhkan — membangun sistem kesehatan di NTT dan Timor-Leste yang setara, akuntabel, dan berbasis komunitas. Ia memimpin reformasi tingkat kabupaten di bawah kemitraan kesehatan ibu Australia-Indonesia yang didanai DFAT, dan telah bekerja bersama USAID, PBB, IOM, dan CARE International. Alumni Universitas Queensland, ia membawa kombinasi langka antara kedalaman kebijakan dan kelancaran lapangan yang dibutuhkan SahAIbat untuk menjangkau komunitas yang sering terlewatkan.",
      tags: ["USAID · DFAT · UN","NTT & Timor-Leste","Health Systems","UQ Alumni"],
    },
    {
      name: "Risti Riana",
      role: lang==="en" ? "Community & Growth Lead · SahAIbat Foundation" : "Pemimpin Komunitas & Pertumbuhan · SahAIbat Foundation",
      loc: "West Java, Indonesia 🇮🇩",
      photo: null,
      color: C.teal,
      bg: C.white,
      tc: C.dark,
      passion: lang==="en"
        ? "Risti has spent her career doing one thing: building communities that actually move people. From growing wellness spaces to managing KOL partnerships to expanding health learning programmes — she has always believed that the right message, delivered the right way, changes behaviour. At SahAIbat, she brings that conviction to the communities who need it most. She is the reason people find us, trust us, and stay."
        : "Risti menghabiskan kariernya melakukan satu hal: membangun komunitas yang benar-benar menggerakkan orang. Dari membangun komunitas wellness hingga mengelola kemitraan KOL dan memperluas program pembelajaran kesehatan — ia selalu percaya bahwa pesan yang tepat, disampaikan dengan cara yang tepat, mengubah perilaku. Di SahAIbat, ia membawa keyakinan itu kepada komunitas yang paling membutuhkannya. Ia adalah alasan orang menemukan kami, mempercayai kami, dan tetap bersama kami.",
      tags: ["Community Building","Growth & Marketing","Partnerships","Brand Strategy"],
    },
  ];

  // Reusable avatar — shows photo if available, otherwise teal initial circle
  const Avatar = ({ m, size=72 }: { m: typeof members[0]; size?: number }) => (
    m.photo
      ? <img src={m.photo} alt={m.name} style={{ width:size,height:size,borderRadius:16,objectFit:"cover",flexShrink:0,border:`2px solid ${m.color}30` }}/>
      : <div style={{ width:size,height:size,borderRadius:16,background:`${m.color}15`,border:`1px solid ${m.color}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,flexShrink:0,fontWeight:800,color:m.color }}>{m.name[0]}</div>
  );

  return(
    <section id="team" style={{ background:C.cream,padding:"100px 0" }}>
      <div className="section-max">
        <FadeIn>
          <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:`${C.tealDk}15`,border:`1px solid ${C.tealDk}30`,borderRadius:20,padding:"6px 16px",marginBottom:16 }}>
            <span style={{ color:C.tealDk,fontSize:12,fontWeight:600,letterSpacing:1 }}>{t.teamLabel}</span>
          </div>
          <h2 className="display-font" style={{ fontSize:"clamp(32px,4vw,52px)",color:C.dark,lineHeight:1.2,marginBottom:16 }}>{t.teamH2}</h2>
          <p style={{ color:C.muted,fontSize:16,maxWidth:560,lineHeight:1.8,marginBottom:64 }}>{t.teamBody}</p>
        </FadeIn>

        {/* Top row */}
        <div className="two-col" style={{ marginBottom:24 }}>
          {members.slice(0,2).map(m=>(
            <FadeIn key={m.name} delay={100}>
              <div style={{ background:m.bg,borderRadius:24,padding:36,position:"relative",overflow:"hidden",border:`1px solid ${m.color}20`,minHeight:320 }}>
                <div style={{ position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${m.color},transparent)` }}/>
                <div style={{ display:"flex",gap:20,alignItems:"flex-start",marginBottom:20 }}>
                  <Avatar m={m}/>
                  <div>
                    <div style={{ fontWeight:800,fontSize:20,color:m.tc,marginBottom:4 }}>{m.name}</div>
                    <div style={{ color:m.color,fontWeight:600,fontSize:13 }}>{m.role}</div>
                    <div style={{ color:m.bg===C.dark?"rgba(255,255,255,0.4)":C.muted,fontSize:12,marginTop:4 }}>{m.loc}</div>
                  </div>
                </div>
                <p style={{ color:m.bg===C.dark?"rgba(255,255,255,0.65)":C.muted,fontSize:14,lineHeight:1.85,marginBottom:20,fontStyle:"italic" }}>&ldquo;{m.passion}&rdquo;</p>
                <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
                  {m.tags.map(tag=>(<Tag key={tag} label={tag} color={m.color}/>))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Bottom row */}
        <div className="two-col">
          {members.slice(2,4).map(m=>(
            <FadeIn key={m.name} delay={200}>
              <div style={{ background:m.bg,borderRadius:24,padding:36,position:"relative",overflow:"hidden",border:`1px solid ${m.color}20`,minHeight:300 }}>
                <div style={{ position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${m.color},transparent)` }}/>
                <div style={{ display:"flex",gap:20,alignItems:"flex-start",marginBottom:20 }}>
                  <Avatar m={m}/>
                  <div>
                    <div style={{ fontWeight:800,fontSize:20,color:C.dark,marginBottom:4 }}>{m.name}</div>
                    <div style={{ color:m.color,fontWeight:600,fontSize:13 }}>{m.role}</div>
                    <div style={{ color:C.muted,fontSize:12,marginTop:4 }}>{m.loc}</div>
                  </div>
                </div>
                <p style={{ color:C.muted,fontSize:14,lineHeight:1.85,marginBottom:20,fontStyle:"italic" }}>&ldquo;{m.passion}&rdquo;</p>
                <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
                  {m.tags.map(tag=>(<Tag key={tag} label={tag} color={m.color}/>))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Foundation note */}
        <FadeIn delay={300}>
          <div style={{ marginTop:48,background:C.dark,borderRadius:20,padding:32,display:"flex",gap:20,alignItems:"center",flexWrap:"wrap" }}>
            <div style={{ fontSize:36 }}>🏛️</div>
            <div style={{ flex:1,minWidth:240 }}>
              <div style={{ color:C.teal,fontWeight:700,fontSize:12,letterSpacing:1,marginBottom:6 }}>{lang==="en"?"ABOUT THE FOUNDATION":"TENTANG YAYASAN"}</div>
              <p style={{ color:"rgba(255,255,255,0.55)",fontSize:14,lineHeight:1.7 }}>
                {lang==="en"
                  ?"SahAIbat Foundation is the community-facing identity of SahAIbat Health. All intellectual property, technology, and platform infrastructure is owned by Vinatra (11679210 Canada Inc). The Foundation exists to serve communities — not to generate profit."
                  :"SahAIbat Foundation adalah identitas yang menghadap komunitas dari SahAIbat Health. Semua kekayaan intelektual, teknologi, dan infrastruktur platform dimiliki oleh Vinatra (11679210 Canada Inc). Foundation ini ada untuk melayani komunitas — bukan untuk menghasilkan keuntungan."}
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
