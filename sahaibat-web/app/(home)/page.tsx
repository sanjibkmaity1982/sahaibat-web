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
  motherChild:"/images/motherchild.png",
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
    ?[["#story","Our Story"],["#products","Products"],["#impact","Impact"],["#partners","Partners"],["#team","Team"],["#support","Partner With Us"]]
    :[["#story","Cerita"],["#products","Produk"],["#impact","Dampak"],["#partners","Mitra"],["#team","Tim"],["#support","Bermitra"]];
  return(
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:scrolled?"rgba(15,31,28,0.96)":"transparent",backdropFilter:scrolled?"blur(14px)":"none",borderBottom:scrolled?"1px solid rgba(2,195,154,0.15)":"none",transition:"all 0.3s",padding:"0 24px"}}>
      <div style={{maxWidth:1200,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:64}}>
        <img src="/images/art/logo-horizontal-white@2x.png" alt="SahAIbat" style={{height:36,width:"auto"}}/>
        <div className="nav-desktop" style={{display:"flex",gap:22,alignItems:"center"}}>
          {links.map(([href,label])=>(<a key={href} href={href} style={{color:"rgba(255,255,255,0.7)",fontSize:13,fontWeight:500,textDecoration:"none",transition:"color 0.2s"}} onMouseEnter={e=>(e.target as HTMLElement).style.color=C.teal} onMouseLeave={e=>(e.target as HTMLElement).style.color="rgba(255,255,255,0.7)"}>{label}</a>))}
          <div style={{display:"flex",gap:3,background:"rgba(255,255,255,0.08)",borderRadius:20,padding:3}}>
            {(["en","id"] as const).map(l=>(<button key={l} onClick={()=>setLang(l)} style={{background:lang===l?C.teal:"transparent",color:lang===l?C.dark:"rgba(255,255,255,0.6)",border:"none",borderRadius:16,padding:"4px 12px",fontSize:12,fontWeight:700,cursor:"pointer",transition:"all 0.2s"}}>{l==="en"?"EN":"ID"}</button>))}
          </div>
          <a href="#support" style={{background:C.teal,color:C.dark,padding:"8px 20px",borderRadius:20,fontSize:13,fontWeight:700,textDecoration:"none"}}>{lang==="en"?"Request a Pilot":"Ajukan Pilot"}</a>
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
        .hero-grid,.two-col,.invest-grid{grid-template-columns:1fr!important;gap:32px!important}
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
              <a href="#support" style={{border:"1.5px solid rgba(2,195,154,0.4)",color:C.white,padding:"14px 28px",borderRadius:12,fontSize:15,fontWeight:600,textDecoration:"none"}}>{lang==="en"?"Partner With Us":"Bermitra Dengan Kami"}</a>
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
                {[{l:"WhatsApp-first",s:lang==="en"?"no app download":"tidak perlu unduh"},{l:lang==="en"?"Offline-capable":"Bisa Offline",s:lang==="en"?"no signal needed":"tanpa sinyal"},{l:lang==="en"?"Built to last":"Berkelanjutan",s:lang==="en"?"sustainable by design":"berkelanjutan sejak awal"}].map(({l,s})=>(<div key={l}><div style={{color:C.teal,fontWeight:700,fontSize:15}}>{l}</div><div style={{color:"rgba(255,255,255,0.5)",fontSize:11}}>{s}</div></div>))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>

    {/* ══ INVESTOR SNAPSHOT ══════════════════════════════════════════════════ */}
    <InvestorBand lang={lang}/>

    {/* ══ PRODUCTS ═══════════════════════════════════════════════════════════ */}
    <ProductsSection lang={lang}/>

    {/* ══ NATIONAL FRAMEWORK (ILP) ═══════════════════════════════════════════ */}
    <ILPSection lang={lang}/>

    {/* ══ ECOSYSTEM STACK ════════════════════════════════════════════════════ */}
    <EcosystemSection lang={lang}/>

    {/* ══ IN-DEVELOPMENT PRODUCTS (DoK + Sehat) ══════════════════════════════ */}
    <NextProductsSection lang={lang}/>

    {/* ══ FLYWHEEL ═══════════════════════════════════════════════════════════ */}
    <FlywheelSection lang={lang}/>

    {/* ══ VOICES FROM THE FIELD (video) ══════════════════════════════════════ */}
    <FieldVoicesSection lang={lang}/>

    {/* ══ IMPACT ═════════════════════════════════════════════════════════════ */}
    <ImpactSection lang={lang}/>

    {/* ══ FIELD PARTNERS ═════════════════════════════════════════════════════ */}
    <FieldPartnersSection lang={lang}/>

    {/* ══ TEAM ════════════════════════════════════════════════════════════════ */}
    <TeamSection lang={lang}/>

    {/* ══ PARTNER WITH US ════════════════════════════════════════════════════ */}
    <section id="support" style={{background:C.dark,padding:"100px 0",position:"relative",overflow:"hidden"}}>
      <div className="teal-glow" style={{width:600,height:600,background:C.teal,bottom:"-20%",right:"-10%"}}/>
      <div className="section-max" style={{position:"relative",zIndex:1}}>
        <FadeIn>
          <div style={{textAlign:"center",marginBottom:64}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(2,195,154,0.1)",border:"1px solid rgba(2,195,154,0.3)",borderRadius:20,padding:"6px 16px",marginBottom:16}}>
              <span style={{color:C.teal,fontSize:12,fontWeight:600,letterSpacing:1}}>{lang==="en"?"PARTNER WITH US":"BERMITRA DENGAN KAMI"}</span>
            </div>
            <h2 className="display-font" style={{fontSize:"clamp(32px,4vw,52px)",color:C.white,lineHeight:1.2,marginBottom:16}}>
              {lang==="en"?<>Bring SahAIbat to<br/><span style={{color:C.teal}}>your community.</span></>:<>Bawa SahAIbat ke<br/><span style={{color:C.teal}}>komunitas Anda.</span></>}
            </h2>
            <p style={{color:"rgba(255,255,255,0.5)",fontSize:16,maxWidth:580,lineHeight:1.8,margin:"0 auto"}}>
              {lang==="en"?"We work with NGOs, health programmes, researchers, and government partners to deploy SahAIbat where it's needed most. Tell us about your Kaders and your districts — we'll design a pilot around them."
              :"Kami bekerja dengan NGO, program kesehatan, peneliti, dan mitra pemerintah untuk menerapkan SahAIbat di tempat yang paling membutuhkan. Ceritakan tentang Kader dan wilayah Anda — kami akan merancang pilot di sekitarnya."}
            </p>
          </div>
        </FadeIn>
        <div className="three-col" style={{marginBottom:48}}>
          {[
            {icon:"🚀",title:lang==="en"?"Run a pilot":"Jalankan pilot",amount:lang==="en"?"Pilot":"Pilot",desc:lang==="en"?"Deploy SahAIbat with a cohort of your Kaders across one or more districts. We handle setup, training, and clinical alignment.":"Terapkan SahAIbat dengan sekelompok Kader Anda di satu atau beberapa wilayah. Kami menangani penyiapan, pelatihan, dan penyelarasan klinis.",cta:lang==="en"?"Request a Pilot":"Ajukan Pilot",href:"mailto:admin@sahaibat.com?subject=Pilot Request",color:C.teal,featured:true},
            {icon:"🤝",title:lang==="en"?"Partner with us":"Bermitra",amount:lang==="en"?"Partnership":"Kemitraan",desc:lang==="en"?"NGO, health programme, researcher, or government partner — let's talk about deploying SahAIbat at scale across your network.":"NGO, program kesehatan, peneliti, atau mitra pemerintah — mari bicara tentang penerapan SahAIbat dalam skala besar di jaringan Anda.",cta:lang==="en"?"Start a Conversation":"Mulai Percakapan",href:"mailto:admin@sahaibat.com?subject=Partnership Inquiry",color:C.pink,featured:false},
            {icon:"📊",title:lang==="en"?"Fund a deployment":"Danai penerapan",amount:lang==="en"?"Sponsor":"Sponsor",desc:lang==="en"?"Funders and CSR partners can sponsor a full district rollout — infrastructure, training, and impact reporting included.":"Donatur dan mitra CSR dapat mensponsori penerapan satu wilayah penuh — infrastruktur, pelatihan, dan pelaporan dampak termasuk.",cta:lang==="en"?"Talk to Us":"Hubungi Kami",href:"mailto:admin@sahaibat.com?subject=Deployment Sponsorship",color:C.gold,featured:false},
          ].map(({icon,title,amount,desc,cta,href,color,featured})=>(<FadeIn key={title} delay={100}>
            <div style={{background:featured?`linear-gradient(135deg,${C.tealXdk},${C.tealDk})`:"rgba(255,255,255,0.03)",border:`1.5px solid ${featured?C.teal:"rgba(255,255,255,0.08)"}`,borderRadius:20,padding:32,display:"flex",flexDirection:"column",height:"100%",transform:featured?"scale(1.03)":"scale(1)"}}>
              {featured&&<div style={{color:C.teal,fontWeight:700,fontSize:11,letterSpacing:1,marginBottom:12}}>⭐ {lang==="en"?"MOST COMMON":"PALING UMUM"}</div>}
              <div style={{fontSize:36,marginBottom:12}}>{icon}</div>
              <div className="display-font" style={{color,fontSize:24,fontWeight:900,marginBottom:8}}>{amount}</div>
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
              <div style={{color:C.white,fontWeight:700,fontSize:18,marginBottom:8}}>{lang==="en"?"Transparency, built in.":"Transparansi, sejak awal."}</div>
              <p style={{color:"rgba(255,255,255,0.5)",fontSize:14,lineHeight:1.7,maxWidth:600}}>{lang==="en"?"With every partner, we report clearly on what was deployed, where, and what it delivered — infrastructure, training, field visits, and clinical validation. You always know exactly what your investment delivers on the ground.":"Dengan setiap mitra, kami melaporkan secara jelas apa yang diterapkan, di mana, dan apa hasilnya — infrastruktur, pelatihan, kunjungan lapangan, dan validasi klinis. Anda selalu tahu persis apa yang dihasilkan investasi Anda di lapangan."}</p>
              <div style={{marginTop:16,display:"flex",gap:12,flexWrap:"wrap"}}>
                {(lang==="en"?["Server infrastructure","Kader training","Field visits NTT","Clinical validation","Impact reporting"]:["Infrastruktur server","Pelatihan Kader","Kunjungan lapangan NTT","Validasi klinis","Pelaporan dampak"]).map(item=>(<span key={item} style={{background:"rgba(2,195,154,0.08)",border:"1px solid rgba(2,195,154,0.15)",color:C.teal,fontSize:12,padding:"4px 12px",borderRadius:20}}>{item}</span>))}
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
            <div style={{marginBottom:16}}><img src="/images/art/logo-horizontal-white@2x.png" alt="SahAIbat" style={{height:32,width:"auto",opacity:0.85}}/></div>
            <p style={{color:"rgba(255,255,255,0.4)",fontSize:13,lineHeight:1.7,maxWidth:280,marginBottom:16}}>{lang==="en"?"WhatsApp-first AI clinical triage for Community Health Workers in Indonesia. Built to strengthen frontline care.":"Triase klinis AI berbasis WhatsApp untuk Kader Kesehatan Indonesia. Dibangun untuk memperkuat layanan garis depan."}</p>
            <p style={{color:"rgba(255,255,255,0.18)",fontSize:11,lineHeight:1.7}}>All IP owned by<br/><strong style={{color:"rgba(255,255,255,0.3)"}}>Vinatra · 11679210 Canada Inc</strong><br/>Terdaftar PSE Lingkup Privat Asing<br/>NIB: 1202260248509</p>
          </div>
          <div>
            <div style={{color:C.teal,fontWeight:700,fontSize:12,letterSpacing:1,marginBottom:16}}>PLATFORM</div>
            {([["#story",lang==="en"?"Our Story":"Cerita Kami"],["#products",lang==="en"?"Products":"Produk"],["#partners",lang==="en"?"Field Partners":"Mitra Lapangan"],["#team",lang==="en"?"Team":"Tim"],["#support",lang==="en"?"Partner with us":"Bermitra dengan kami"]] as [string,string][]).map(([href,label])=>(<a key={label} href={href} style={{display:"block",color:"rgba(255,255,255,0.4)",fontSize:13,textDecoration:"none",marginBottom:9,transition:"color 0.2s"}} onMouseEnter={e=>(e.target as HTMLElement).style.color=C.teal} onMouseLeave={e=>(e.target as HTMLElement).style.color="rgba(255,255,255,0.4)"}>{label}</a>))}
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
          <span style={{color:"rgba(255,255,255,0.2)",fontSize:12}}>© 2026 SahAIbat · IP owned by Vinatra (11679210 Canada Inc) · All rights reserved</span>
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
      shots:["/images/art/kasih-chat-1.jpeg","/images/art/kasih-chat-2.jpeg","/images/art/kasih-chat-3.jpeg"],
      shotKind:"phone" as const,
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
      icon:"🩺",
      label:lang==="en"?"Kader App":"Aplikasi Kader",
      sublabel:lang==="en"?"Life-cycle Triage":"Triase Siklus Hidup",
      accent:C.pink,
      shots:["/images/art/kader-menu.jpeg","/images/art/kader-tb.jpeg","/images/art/kader-growth.jpeg"],
      shotKind:"phone" as const,
      headline:lang==="en"?"Every life stage. Every Posyandu. In seconds, not minutes.":"Setiap tahap hidup. Setiap Posyandu. Dalam detik, bukan menit.",
      story:lang==="en"
        ?"One app for the whole community. The Kader App digitises the complete ILP life-cycle service package — child, maternal, adolescent, adult, elderly, and communicable disease — so one Kader can screen every age group from a single WhatsApp-native tool.\n\nWhat used to take minutes per person at the Posyandu — reading the KMS chart by hand, plotting growth, copying numbers onto paper — now takes seconds, fully offline, syncing to the Programme Dashboard when signal returns."
        :"Satu aplikasi untuk seluruh komunitas. Aplikasi Kader mendigitalkan paket layanan siklus hidup ILP secara lengkap — anak, ibu, remaja, dewasa, lansia, dan penyakit menular — sehingga satu Kader dapat melakukan skrining setiap kelompok usia dari satu alat berbasis WhatsApp.\n\nYang dulu memakan menit per orang di Posyandu — membaca grafik KMS dengan tangan, memplot pertumbuhan, menyalin angka ke kertas — kini hanya butuh hitungan detik, sepenuhnya offline, tersinkron ke Dasbor Program saat sinyal kembali.",
      features:lang==="en"
        ?["ILP-aligned life-cycle modules — child, maternal, adolescent, adult/elderly, TB & malaria","WHO growth auto-calculation — BB/U, TB/U, BB/TB plotted instantly","Seconds per record, not minutes — a full Posyandu session captured fast","Works fully offline on basic 2G phones — syncs when signal returns","Danger-sign flags with RUJUK alerts — every visit feeds the Programme Dashboard"]
        :["Modul siklus hidup selaras ILP — anak, ibu, remaja, dewasa/lansia, TB & malaria","Kalkulasi pertumbuhan WHO otomatis — BB/U, TB/U, BB/TB langsung terplot","Hitungan detik per catatan, bukan menit — sesi Posyandu penuh tercatat cepat","Bekerja sepenuhnya offline di ponsel 2G — tersinkron saat sinyal kembali","Penanda tanda bahaya dengan peringatan RUJUK — setiap kunjungan mengisi Dasbor Program"],
      messages:[
        {msg:"Bu Ani, 24th, 3mgg postpartum, pucat, bicara pelan",u:true,urg:false},
        {msg:"🩺 Modul Ibu Nifas\n\nPerdarahan >2 pembalut/jam?\n1=Ya  2=Tidak",u:false,urg:false},
        {msg:"1",u:true,urg:false},
        {msg:"🔴 DARURAT — RUJUK SEGERA\n\nPerdarahan postpartum + infeksi nifas.\n\n• Jangan tinggalkan pasien\n• Hubungi Puskesmas Kefamenanu",u:false,urg:true},
      ],
    },
    {
      id:2,
      icon:"👩‍⚕️",

      label:"Bidan",
      sublabel:lang==="en"?"Midwife Module":"Modul Bidan",
      accent:C.purple,
      headline:lang==="en"?"The midwife who can't be in two villages at once.":"Bidan yang tidak bisa berada di dua desa sekaligus.",
      story:lang==="en"
        ?"A Bidan in rural NTT can serve 5–10 villages. She cannot be everywhere. But her knowledge can be.\n\nThe Bidan module gives community midwives a structured digital companion for antenatal visits, postnatal checks, and high-risk pregnancy monitoring. It doesn't replace her clinical judgment — it extends her reach.\n\nWhen a Kader flags a concern, the Bidan receives a structured summary: the questions asked, the answers given, and a clear risk classification. She can triage remotely — and respond where it matters most.\n\nHer knowledge. Everywhere she can't be."
        :"Seorang Bidan di NTT pedesaan bisa melayani 5–10 desa. Ia tidak bisa hadir di mana-mana. Tapi pengetahuannya bisa.\n\nModul Bidan memberi bidan komunitas pendamping digital terstruktur untuk kunjungan antenatal, pemeriksaan pascamelahirkan, dan pemantauan kehamilan berisiko tinggi. Ini tidak menggantikan penilaian klinisnya — ini memperluas jangkauannya.\n\nKetika Kader melaporkan kekhawatiran, Bidan menerima ringkasan terstruktur: pertanyaan yang diajukan, jawaban yang diberikan, dan klasifikasi risiko yang jelas. Ia bisa melakukan triase dari jarak jauh — dan merespons di tempat yang paling penting.\n\nPengetahuannya. Di mana pun ia tidak bisa hadir.",
      features:lang==="en"
        ?["Antenatal visit tracking — all trimesters","Postnatal monitoring — 0 to 42 days","High-risk flag alerts sent to supervising Bidan","Remote triage review from any location","Integrated with the Kader App"]
        :["Pelacakan kunjungan antenatal — semua trimester","Pemantauan pascamelahirkan — 0 sampai 42 hari","Peringatan tanda bahaya dikirim ke Bidan pengawas","Tinjauan triase jarak jauh dari lokasi mana pun","Terintegrasi dengan Aplikasi Kader"],
      messages:[
        {msg:"👩‍⚕️ Bidan Dashboard\nKunjungan hari ini: 3\nTanda bahaya terdeteksi: 1",u:false,urg:false},
        {msg:"⚠️ PERINGATAN BARU\n\nKader Sari melaporkan:\nBu Wati, 32th, hamil 36mgg\nTekanan darah tinggi terdeteksi\n\nLihat detail? 1=Ya  2=Nanti",u:false,urg:false},
        {msg:"1",u:true,urg:false},
        {msg:"📋 Ringkasan Kasus\n\nSakit kepala berat: Ya\nPenglihatan kabur: Ya\nProtein urin: Belum diperiksa\n\n→ Preeklampsia dicurigai\n→ RUJUK ke Puskesmas hari ini",u:false,urg:true},
        {msg:"Siap, saya akan hubungi Puskesmas sekarang",u:true,urg:false},
      ],
    },
    {
      id:3,
      icon:"📊",
      label:lang==="en"?"Programme Dashboard":"Dasbor Program",
      sublabel:lang==="en"?"Impact at scale":"Dampak skala besar",
      accent:C.blue,
      shots:["/images/art/dash-overview.jpeg","/images/art/dash-ancquality.jpeg","/images/art/dash-anak.jpeg","/images/art/dash-ibuhamil.jpeg"],
      shotKind:"browser" as const,
      headline:lang==="en"?"See everything. Miss nothing.":"Lihat segalanya. Jangan lewatkan satu pun.",
      story:lang==="en"
        ?"The Programme Dashboard shows what your programme is actually doing — in real time, at the village level, across every district you operate in.\n\nFor managers, donors, and government partners, it's the proof: coverage, clinical outcomes, Kader activity, and referral rates in one place, updated live and exportable in one click."
        :"Dasbor Program menunjukkan apa yang sebenarnya dilakukan program Anda — secara real-time, di tingkat desa, di setiap kabupaten tempat Anda beroperasi.\n\nBagi manajer, donor, dan mitra pemerintah, inilah buktinya: cakupan, hasil klinis, aktivitas Kader, dan tingkat rujukan dalam satu tempat, diperbarui langsung dan bisa diekspor dengan satu klik.",
      features:lang==="en"
        ?["Real-time Kader activity across all districts","Village-level coverage and outcome maps","Clinical risk trends — by module, by region","One-click export for donor and MoH reporting","Role-based access: Kader · Bidan · NGO · Funder"]
        :["Aktivitas Kader real-time di semua kabupaten","Peta cakupan dan hasil tingkat desa","Tren risiko klinis — per modul, per wilayah","Ekspor satu klik untuk laporan donor dan Kemenkes","Akses berbasis peran: Kader · Bidan · NGO · Donor"],
      messages:[
        {msg:"📊 Programme Dashboard — Yayasan Pijar Timur\nNTT Province · Live",u:false,urg:false},
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
            {lang==="en"?"Four tools. Built for the people who show up.":"Empat alat. Dibangun untuk mereka yang selalu hadir."}
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
              {(p as any).shots ? (
                (p as any).shotKind==="phone" ? (
                  <div>
                    <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
                      {((p as any).shots as string[]).map((src,i)=>(
                        <div key={i} style={{position:"relative",width:172,height:430,borderRadius:24,overflow:"hidden",border:"7px solid #0a1513",boxShadow:"0 18px 44px rgba(0,0,0,0.45)",background:"#0a1513"}}>
                          <img src={src} alt={`${p.label} ${i+1}`} loading="lazy" style={{display:"block",width:"100%",height:"auto"}}/>
                          <div style={{position:"absolute",left:0,right:0,bottom:0,height:90,background:"linear-gradient(to bottom,transparent,#0a1513)",pointerEvents:"none"}}/>
                        </div>
                      ))}
                    </div>
                    <div style={{color:C.muted,fontSize:11,textAlign:"center",fontStyle:"italic",marginTop:18}}>{lang==="en"?"Real screens — Bahasa Indonesia":"Tampilan nyata — Bahasa Indonesia"}</div>
                  </div>
                ) : (
                  <div>
                    <div style={{borderRadius:14,overflow:"hidden",border:`1px solid ${p.accent}30`,boxShadow:"0 16px 44px rgba(0,0,0,0.45)",background:"#0d1a18"}}>
                      <div style={{display:"flex",alignItems:"center",gap:6,padding:"9px 12px",background:"rgba(255,255,255,0.04)",borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
                        <span style={{width:9,height:9,borderRadius:"50%",background:"#FF5F56",display:"inline-block"}}/>
                        <span style={{width:9,height:9,borderRadius:"50%",background:"#FFBD2E",display:"inline-block"}}/>
                        <span style={{width:9,height:9,borderRadius:"50%",background:"#27C93F",display:"inline-block"}}/>
                        <span style={{marginLeft:8,color:"rgba(255,255,255,0.35)",fontSize:11,fontFamily:"monospace"}}>dashboard.sahaibat.com</span>
                      </div>
                      <div style={{position:"relative",height:470,overflow:"hidden"}}>
                        <img src={((p as any).shots as string[])[0]} alt={`${p.label}`} loading="lazy" style={{display:"block",width:"100%",height:"auto"}}/>
                        <div style={{position:"absolute",left:0,right:0,bottom:0,height:120,background:"linear-gradient(to bottom,transparent,#0d1a18)",pointerEvents:"none"}}/>
                      </div>
                    </div>
                    <div style={{color:C.muted,fontSize:11,textAlign:"center",fontStyle:"italic",marginTop:14}}>{lang==="en"?"Live dashboard — demonstration data":"Dasbor langsung — data demonstrasi"}</div>
                  </div>
                )
              ) : (
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
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// IMPACT — emotional storytelling, partner-facing
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
      role:lang==="en"?"Founder, CEO & CTO":"Pendiri, CEO & CTO",
      loc:lang==="en"?"Canada":"Kanada",
      photo:"/images/sanjib.jpeg",
      color:C.teal,
      bg:C.dark,
      passion:lang==="en"
        ?"Sanjib brings over 15 years of expertise in IT infrastructure and enterprise-scale application development to his role as Founder, CEO, and CTO of SahAIbat. Driven by a critical question — why the communities facing the highest disease burden have the least digital support — he built SahAIbat to bridge that gap. As CTO he architected the platform to scale seamlessly; as CEO he leads the mission to deploy high-impact, life-saving digital infrastructure where it is needed most."
        :"Sanjib membawa lebih dari 15 tahun keahlian dalam infrastruktur IT dan pengembangan aplikasi skala enterprise ke perannya sebagai Pendiri, CEO, dan CTO SahAIbat. Didorong oleh satu pertanyaan penting — mengapa komunitas dengan beban penyakit tertinggi justru memiliki dukungan digital paling sedikit — ia membangun SahAIbat untuk menjembatani kesenjangan itu. Sebagai CTO ia merancang platform agar dapat berkembang dengan mulus; sebagai CEO ia memimpin misi untuk menghadirkan infrastruktur digital berdampak tinggi yang menyelamatkan nyawa di tempat yang paling membutuhkannya.",
      tags:["15+ Years IT","Enterprise Architecture","Founder · CEO · CTO","Health Equity"],
    },
    {
      name:"Dr. Ratih Rakhmawati, M.Biomed",
      flag:"🇮🇩",
      role:lang==="en"?"Clinical Validation Lead":"Pemimpin Validasi Klinis",
      loc:"Indonesia",
      photo:"/images/Rathi.jpg",
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
      photo:"/images/Stefan.png",
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
      loc:lang==="en"?"India":"India",
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
      loc:lang==="en"?"Canada":"Kanada",
      photo:null,
      color:C.purple,
      bg:C.white,
      passion:lang==="en"
        ?"B.PT, MBA, and alumni of Deloitte and Egon Zehnder — Surabhi brings the rare combination of clinical grounding and strategic rigour to SahAIbat's evidence base. She leads our research into nationwide maternal and child health data, builds the frameworks that make our outcomes measurable, and shapes the strategy that keeps SahAIbat growing sustainably."
        :"B.PT, MBA, dan alumni Deloitte serta Egon Zehnder — Surabhi membawa kombinasi langka antara landasan klinis dan rigor strategis ke basis bukti SahAIbat. Ia memimpin penelitian kami tentang data kesehatan ibu dan anak nasional, membangun kerangka kerja yang membuat hasil kami terukur, dan membentuk strategi yang membuat SahAIbat tumbuh berkelanjutan.",
      tags:["B.PT · MBA","ex-Deloitte · ex-Egon Zehnder","Health Research","Strategy"],
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
              <div style={{color:C.teal,fontWeight:700,fontSize:12,letterSpacing:1,marginBottom:6}}>{lang==="en"?"ABOUT SAHAIBAT":"TENTANG SAHAIBAT"}</div>
              <p style={{color:"rgba(255,255,255,0.55)",fontSize:14,lineHeight:1.7}}>
                {lang==="en"?"SahAIbat is a mission-driven venture. All intellectual property, technology, and platform infrastructure is owned by Vinatra (11679210 Canada Inc). We build sustainable, commercially-sound products so the communities who need them most are reached — and kept reached, long after any grant cycle would end."
                :"SahAIbat adalah usaha yang digerakkan oleh misi. Semua kekayaan intelektual, teknologi, dan infrastruktur platform dimiliki oleh Vinatra (11679210 Canada Inc). Kami membangun produk yang berkelanjutan dan sehat secara komersial agar komunitas yang paling membutuhkan dapat dijangkau — dan tetap terlayani, jauh setelah siklus hibah berakhir."}
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ILP — NATIONAL FRAMEWORK
// ══════════════════════════════════════════════════════════════════════════════
function ILPSection({lang}:{lang:"en"|"id"}){
  const clusters=[
    {cluster:lang==="en"?"CHILD TRIAGE":"TRIASE ANAK",color:C.teal,items:lang==="en"?["Posyandu Anak — growth & development, 0–60 months","Immunisation & supplements — vaccines, Vitamin A, deworming"]:["Posyandu Anak — tumbuh kembang, 0–60 bulan","Imunisasi & suplemen — vaksin, Vitamin A, obat cacing"]},
    {cluster:lang==="en"?"MATERNAL TRIAGE":"TRIASE IBU",color:C.pink,items:lang==="en"?["Ibu Hamil — antenatal danger-sign triage","Ibu Nifas — postpartum, 0–42 days","Bayi Baru Lahir — neonatal, 0–28 days"]:["Ibu Hamil — triase tanda bahaya antenatal","Ibu Nifas — pascamelahirkan, 0–42 hari","Bayi Baru Lahir — neonatal, 0–28 hari"]},
    {cluster:lang==="en"?"SCHOOL AGE & ADOLESCENT":"USIA SEKOLAH & REMAJA",color:C.blue,items:lang==="en"?["Remaja — adolescent health screening, 6–18 years"]:["Remaja — skrining kesehatan, 6–18 tahun"]},
    {cluster:lang==="en"?"ADULT & ELDERLY":"USIA DEWASA & LANSIA",color:C.gold,items:lang==="en"?["Usia Dewasa — NCD early detection, 18–59 years","Lanjut Usia — geriatric screening, 60+ years"]:["Usia Dewasa — deteksi dini PTM, 18–59 tahun","Lanjut Usia — skrining lansia, 60+ tahun"]},
    {cluster:lang==="en"?"COMMUNICABLE DISEASE":"PENYAKIT MENULAR",color:"#FF6B6B",items:lang==="en"?["TBC — tuberculosis screening, all ages","Malaria — screening in endemic regions"]:["TBC — skrining tuberkulosis, semua usia","Malaria — skrining di daerah endemis"]},
  ];
  return(
    <section style={{background:C.dark,padding:"100px 0",position:"relative",overflow:"hidden"}}>
      <div className="teal-glow" style={{width:600,height:600,background:C.teal,top:"10%",right:"-15%"}}/>
      <div className="section-max" style={{position:"relative",zIndex:1}}>
        <FadeIn>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(2,195,154,0.1)",border:"1px solid rgba(2,195,154,0.3)",borderRadius:20,padding:"6px 16px",marginBottom:16}}>
            <span style={{color:C.teal,fontSize:12,fontWeight:600,letterSpacing:1}}>{lang==="en"?"BUILT ON THE NATIONAL FRAMEWORK":"DIBANGUN DI ATAS KERANGKA NASIONAL"}</span>
          </div>
          <h2 className="display-font" style={{fontSize:"clamp(32px,4vw,52px)",color:C.white,lineHeight:1.2,marginBottom:20,maxWidth:760}}>
            {lang==="en"?<>Most health apps digitise one disease.<br/><span style={{color:C.teal}}>We digitise the entire life cycle.</span></>:<>Sebagian besar aplikasi kesehatan mendigitalkan satu penyakit.<br/><span style={{color:C.teal}}>Kami mendigitalkan seluruh siklus hidup.</span></>}
          </h2>
          <p style={{color:"rgba(255,255,255,0.55)",fontSize:16,maxWidth:680,lineHeight:1.8,marginBottom:56}}>
            {lang==="en"?"Indonesia's Ministry of Health is rolling out Integrasi Layanan Primer (ILP) — a nationwide mandate that reorganises every Posyandu around the citizen's life cycle (siklus hidup) instead of isolated programmes. SahAIbat's interface maps to the complete ILP Posyandu service package — birth to elderly — in a single WhatsApp-native flow the Kader already knows how to use."
            :"Kementerian Kesehatan Indonesia sedang menerapkan Integrasi Layanan Primer (ILP) — mandat nasional yang menata ulang setiap Posyandu berdasarkan siklus hidup warga, bukan program yang terpisah-pisah. Antarmuka SahAIbat memetakan paket layanan Posyandu ILP secara lengkap — dari lahir hingga lansia — dalam satu alur berbasis WhatsApp yang sudah dikenal Kader."}
          </p>
        </FadeIn>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:20,marginBottom:48}}>
          {clusters.map(({cluster,color,items})=>(<FadeIn key={cluster} delay={80}>
            <div style={{background:"rgba(255,255,255,0.03)",border:`1px solid ${color}30`,borderRadius:16,padding:24,height:"100%"}}>
              <div style={{color,fontWeight:700,fontSize:11,letterSpacing:1,marginBottom:16}}>{cluster}</div>
              {items.map(item=>(<div key={item} style={{display:"flex",gap:10,marginBottom:12}}>
                <div style={{width:5,height:5,borderRadius:"50%",background:color,marginTop:7,flexShrink:0}}/>
                <div style={{color:"rgba(255,255,255,0.6)",fontSize:13,lineHeight:1.5}}>{item}</div>
              </div>))}
            </div>
          </FadeIn>))}
        </div>
        <FadeIn>
          <div style={{background:`linear-gradient(135deg,${C.tealXdk},${C.tealDk})`,borderRadius:20,padding:40,display:"flex",gap:28,alignItems:"center",flexWrap:"wrap"}}>
            <div style={{fontSize:48}}>🇮🇩</div>
            <div style={{flex:1,minWidth:280}}>
              <h3 style={{color:C.white,fontSize:22,fontWeight:700,marginBottom:10}}>{lang==="en"?"One Kader. Every life stage. Zero new hardware.":"Satu Kader. Setiap tahap kehidupan. Tanpa perangkat baru."}</h3>
              <p style={{color:"rgba(255,255,255,0.75)",lineHeight:1.7,fontSize:14}}>
                {lang==="en"?"ILP asks 1.4 million Kaders to deliver life-cycle screening and report it digitally — on tools most of them don't have. SahAIbat is the missing layer: it runs on the WhatsApp already in the Kader's hand, works offline, and produces the structured data the framework requires."
                :"ILP meminta 1,4 juta Kader untuk melakukan skrining siklus hidup dan melaporkannya secara digital — dengan alat yang sebagian besar tidak mereka miliki. SahAIbat adalah lapisan yang hilang: berjalan di WhatsApp yang sudah ada di tangan Kader, bekerja offline, dan menghasilkan data terstruktur yang dibutuhkan kerangka ini."}
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ECOSYSTEM — one engine, six surfaces
// ══════════════════════════════════════════════════════════════════════════════
function EcosystemSection({lang}:{lang:"en"|"id"}){
  const surfaces=[
    {layer:lang==="en"?"VILLAGE":"DESA",icon:"👩🏽‍⚕️",name:lang==="en"?"Kader App":"Aplikasi Kader",who:lang==="en"?"Community health workers":"Kader kesehatan",color:C.teal,live:true},
    {layer:lang==="en"?"MIDWIFE":"BIDAN",icon:"🩺",name:lang==="en"?"Bidan Module":"Modul Bidan",who:lang==="en"?"Midwives — ANC quality & docs":"Bidan — kualitas ANC & dokumentasi",color:C.purple,live:true},
    {layer:lang==="en"?"RURAL CITIZEN":"WARGA PEDESAAN",icon:"❤️‍🩹",name:"Kasih",who:lang==="en"?"Families, on WhatsApp":"Keluarga, lewat WhatsApp",color:C.pink,live:true},
    {layer:lang==="en"?"URBAN CITIZEN":"WARGA URBAN",icon:"🌟",name:"Sehat",who:lang==="en"?"Urban families & individuals":"Keluarga & individu urban",color:C.gold,live:false},
    {layer:lang==="en"?"CLINIC":"KLINIK",icon:"🩻",name:"SahAIbat DoK",who:lang==="en"?"Doctors & small clinics":"Dokter & klinik kecil",color:"#7C5CFC",live:false},
    {layer:lang==="en"?"OVERSIGHT":"PENGAWASAN",icon:"📊",name:lang==="en"?"Programme Dashboard":"Dasbor Program",who:lang==="en"?"Programme managers & health offices":"Manajer program & dinas kesehatan",color:C.blue,live:true},
  ];
  return(
    <section style={{background:C.cream,padding:"100px 0"}}>
      <div className="section-max">
        <FadeIn>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:`${C.tealDk}15`,border:`1px solid ${C.tealDk}30`,borderRadius:20,padding:"6px 16px",marginBottom:16}}>
            <span style={{color:C.tealDk,fontSize:12,fontWeight:600,letterSpacing:1}}>{lang==="en"?"THE FULL STACK":"EKOSISTEM LENGKAP"}</span>
          </div>
          <h2 className="display-font" style={{fontSize:"clamp(32px,4vw,52px)",color:C.dark,lineHeight:1.2,marginBottom:20,maxWidth:780}}>
            {lang==="en"?<>Most companies build one app for one problem.<br/><span style={{color:C.tealDk}}>We built the layer that connects the whole system.</span></>:<>Kebanyakan perusahaan membangun satu aplikasi untuk satu masalah.<br/><span style={{color:C.tealDk}}>Kami membangun lapisan yang menghubungkan seluruh sistem.</span></>}
          </h2>
          <p style={{color:C.muted,fontSize:16,maxWidth:720,lineHeight:1.8,marginBottom:48}}>
            {lang==="en"?"One clinical engine and one data backbone power six surfaces — reaching every actor in Indonesian primary care, from the volunteer in the village to the doctor in the clinic to the official at the ministry. Each surface is useful on its own. Together, they're an ecosystem."
            :"Satu engine klinis dan satu tulang punggung data menggerakkan enam antarmuka — menjangkau setiap aktor dalam layanan primer Indonesia, dari relawan di desa, dokter di klinik, hingga pejabat di kementerian. Setiap antarmuka berguna sendiri. Bersama, mereka adalah sebuah ekosistem."}
          </p>
        </FadeIn>
        <FadeIn delay={80}>
          <div style={{borderRadius:20,overflow:"hidden",border:`1px solid ${C.tealDk}20`,marginBottom:40,maxWidth:720,marginLeft:"auto",marginRight:"auto"}}>
            <img src="/images/art/ecosystem-network.png" alt={lang==="en"?"SahAIbat connected ecosystem":"Ekosistem terhubung SahAIbat"} loading="lazy" style={{display:"block",width:"100%",height:"auto"}}/>
          </div>
        </FadeIn>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",gap:16,marginBottom:32}}>
          {surfaces.map(({layer,icon,name,who,color,live})=>(<FadeIn key={name} delay={60}>
            <div style={{background:C.white,border:`1px solid ${color}30`,borderRadius:16,padding:22,height:"100%"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                <div style={{fontSize:28}}>{icon}</div>
                <span style={{fontSize:9,fontWeight:700,letterSpacing:0.5,padding:"3px 8px",borderRadius:20,background:live?"rgba(2,195,154,0.12)":"rgba(0,0,0,0.05)",color:live?C.tealDk:C.muted,border:`1px solid ${live?"rgba(2,195,154,0.25)":"rgba(0,0,0,0.1)"}`}}>{live?(lang==="en"?"LIVE":"AKTIF"):(lang==="en"?"IN DEVELOPMENT":"DALAM PENGEMBANGAN")}</span>
              </div>
              <div style={{color,fontSize:10,fontWeight:700,letterSpacing:1,marginBottom:4}}>{layer}</div>
              <div style={{color:C.dark,fontWeight:700,fontSize:16,marginBottom:4}}>{name}</div>
              <div style={{color:C.muted,fontSize:12.5,lineHeight:1.5}}>{who}</div>
            </div>
          </FadeIn>))}
        </div>
        <FadeIn delay={200}>
          <div style={{background:C.dark,borderRadius:20,padding:40}}>
            <h3 style={{color:C.white,fontSize:22,fontWeight:700,marginBottom:12}}>{lang==="en"?"Why a stack beats an app.":"Mengapa ekosistem mengungguli satu aplikasi."}</h3>
            <p style={{color:"rgba(255,255,255,0.65)",lineHeight:1.8,fontSize:14,maxWidth:760}}>
              {lang==="en"?"The same WHO growth engine a Kader uses at a Posyandu also charts a child's growth inside the family's Sehat app. The same danger-sign logic Kasih shares with a mother is what a doctor's notes are checked against in DoK. Build one rigorous clinical core, expose it through the interface each user already lives in, and connect them with a shared, sovereign data layer — that's how you cover an entire health system."
              :"Engine pertumbuhan WHO yang sama yang digunakan Kader di Posyandu juga memetakan pertumbuhan anak di dalam aplikasi Sehat keluarga. Logika tanda bahaya yang sama yang dibagikan Kasih kepada seorang ibu adalah acuan pemeriksaan catatan dokter di DoK. Bangun satu inti klinis yang ketat, hadirkan melalui antarmuka yang sudah digunakan setiap pengguna, dan hubungkan dengan lapisan data yang berdaulat — begitulah cara menjangkau seluruh sistem kesehatan."}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// NEXT PRODUCTS — DoK + Sehat (in development)
// ══════════════════════════════════════════════════════════════════════════════
function NextProductsSection({lang}:{lang:"en"|"id"}){
  return(
    <section style={{background:C.dark,padding:"100px 0",position:"relative",overflow:"hidden"}}>
      <div className="teal-glow" style={{width:500,height:500,background:"#7C5CFC",bottom:"-12%",right:"-10%"}}/>
      <div className="section-max" style={{position:"relative",zIndex:1}}>
        <FadeIn>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(124,92,252,0.12)",border:"1px solid rgba(124,92,252,0.35)",borderRadius:20,padding:"6px 16px",marginBottom:16}}>
            <span style={{color:"#A48BFF",fontSize:12,fontWeight:600,letterSpacing:1}}>{lang==="en"?"ON THE HORIZON":"DALAM PENGEMBANGAN"}</span>
          </div>
          <h2 className="display-font" style={{fontSize:"clamp(32px,4vw,52px)",color:C.white,lineHeight:1.2,marginBottom:20,maxWidth:720}}>
            {lang==="en"?"Two more surfaces, in active development.":"Dua antarmuka lagi, sedang dikembangkan."}
          </h2>
          <p style={{color:"rgba(255,255,255,0.55)",fontSize:16,maxWidth:680,lineHeight:1.8,marginBottom:48}}>
            {lang==="en"?"The same clinical engine, reaching two more parts of the system: the urban family, and the clinic. Both are being built on the foundation already serving rural communities today."
            :"Engine klinis yang sama, menjangkau dua bagian sistem lainnya: keluarga urban, dan klinik. Keduanya dibangun di atas fondasi yang sudah melayani komunitas pedesaan hari ini."}
          </p>
        </FadeIn>
        <div className="two-col">
          {/* Sehat */}
          <FadeIn delay={80}>
            <div style={{background:"rgba(255,255,255,0.03)",border:`1px solid ${C.gold}30`,borderRadius:24,padding:36,height:"100%",position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${C.gold},transparent)`}}/>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
                <div style={{fontSize:36}}>🌟</div>
                <span style={{fontSize:9,fontWeight:700,letterSpacing:0.5,padding:"4px 10px",borderRadius:20,background:"rgba(212,168,67,0.12)",color:C.gold,border:`1px solid ${C.gold}40`}}>{lang==="en"?"IN DEVELOPMENT":"DALAM PENGEMBANGAN"}</span>
              </div>
              <h3 style={{color:C.white,fontWeight:800,fontSize:22,marginBottom:6}}>Sehat by SahAIbat</h3>
              <div style={{color:C.gold,fontWeight:600,fontSize:13,marginBottom:16}}>{lang==="en"?"For urban families":"Untuk keluarga urban"}</div>
              <p style={{color:"rgba(255,255,255,0.6)",fontSize:14,lineHeight:1.8,marginBottom:20}}>
                {lang==="en"?"The internet gives every Indonesian the same generic article. Sehat gives each person a plan generated from their own age, conditions, and measurements — for the whole family, under one account. Symptom triage, pregnancy & milestone tracking, vaccines, and personalised wellness plans."
                :"Internet memberi setiap orang Indonesia artikel umum yang sama. Sehat memberi setiap orang rencana yang dihasilkan dari usia, kondisi, dan pengukuran mereka sendiri — untuk seluruh keluarga, dalam satu akun. Triase gejala, pelacakan kehamilan & tumbuh kembang, vaksin, dan rencana wellness personal."}
              </p>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {(lang==="en"?["Symptom triage","Mom & Baby","Wellness Hub","Vaccines & clinics","One family account"]:["Triase gejala","Ibu & Bayi","Wellness Hub","Vaksin & klinik","Satu akun keluarga"]).map(t=>(<Tag key={t} label={t} color={C.gold}/>))}
              </div>
            </div>
          </FadeIn>
          {/* DoK */}
          <FadeIn delay={160}>
            <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(124,92,252,0.3)",borderRadius:24,padding:36,height:"100%",position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(90deg,#7C5CFC,transparent)"}}/>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
                <div style={{fontSize:36}}>🩻</div>
                <span style={{fontSize:9,fontWeight:700,letterSpacing:0.5,padding:"4px 10px",borderRadius:20,background:"rgba(124,92,252,0.12)",color:"#A48BFF",border:"1px solid rgba(124,92,252,0.4)"}}>{lang==="en"?"IN DEVELOPMENT":"DALAM PENGEMBANGAN"}</span>
              </div>
              <h3 style={{color:C.white,fontWeight:800,fontSize:22,marginBottom:6}}>SahAIbat DoK</h3>
              <div style={{color:"#A48BFF",fontWeight:600,fontSize:13,marginBottom:16}}>{lang==="en"?"For doctors & small clinics":"Untuk dokter & klinik kecil"}</div>
              <p style={{color:"rgba(255,255,255,0.6)",fontSize:14,lineHeight:1.8,marginBottom:20}}>
                {lang==="en"?"Indonesia's small clinics face a national mandate (PMK 24/2022) to feed structured records into SATUSEHAT — with no tools to comply. DoK turns a spoken consultation into a SOAP note with ICD-10 codes, checks decisions against accredited national guidelines, and bridges the result into SATUSEHAT — with the doctor in final control."
                :"Klinik kecil Indonesia menghadapi mandat nasional (PMK 24/2022) untuk mengirim rekam medis terstruktur ke SATUSEHAT — tanpa alat untuk memenuhinya. DoK mengubah konsultasi lisan menjadi catatan SOAP dengan kode ICD-10, memeriksa keputusan terhadap pedoman nasional terakreditasi, dan menjembatani hasilnya ke SATUSEHAT — dengan dokter sebagai pengendali akhir."}
              </p>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {(lang==="en"?["Clinical voice scribe","ICD-10 coding","Accredited CDSS","SATUSEHAT-ready","Consent-based referral"]:["Scribe suara klinis","Pengkodean ICD-10","CDSS terakreditasi","Siap SATUSEHAT","Rujukan berbasis persetujuan"]).map(t=>(<Tag key={t} label={t} color="#A48BFF"/>))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// FLYWHEEL
// ══════════════════════════════════════════════════════════════════════════════
function FlywheelSection({lang}:{lang:"en"|"id"}){
  const steps=[
    {step:"01",title:lang==="en"?"The free products build trust":"Produk gratis membangun kepercayaan",desc:lang==="en"?"Kader, Kasih, the midwife tools and the dashboard serve the frontline at no cost — earning the confidence of health workers, mothers, and communities.":"Kader, Kasih, alat bidan, dan dasbor melayani garis depan tanpa biaya — meraih kepercayaan tenaga kesehatan, ibu, dan komunitas."},
    {step:"02",title:lang==="en"?"Trust creates a data moat":"Kepercayaan menciptakan keunggulan data",desc:lang==="en"?"Every screening and journey becomes structured community-health data — a continuous, ground-level picture of a population's health that no competitor has.":"Setiap skrining dan perjalanan menjadi data kesehatan komunitas terstruktur — gambaran kesehatan populasi tingkat akar rumput yang berkelanjutan, yang tidak dimiliki pesaing."},
    {step:"03",title:lang==="en"?"The clinical layer turns it into revenue":"Lapisan klinis mengubahnya menjadi pendapatan",desc:lang==="en"?"SahAIbat DoK takes that same localised, compliant AI into private clinics as a paid product — recurring subscriptions plus referral and enterprise revenue.":"SahAIbat DoK membawa AI lokal yang patuh itu ke klinik swasta sebagai produk berbayar — langganan berulang plus pendapatan rujukan dan enterprise."},
    {step:"04",title:lang==="en"?"Revenue funds the mission":"Pendapatan mendanai misi",desc:lang==="en"?"DoK's commercial layer pays for the infrastructure that keeps the community products free — so reaching the last village doesn't depend on the next grant cycle.":"Lapisan komersial DoK membayar infrastruktur yang menjaga produk komunitas tetap gratis — agar menjangkau desa terjauh tidak bergantung pada siklus hibah berikutnya."},
  ];
  return(
    <section style={{background:C.cream,padding:"100px 0"}}>
      <div className="section-max">
        <FadeIn>
          <div style={{textAlign:"center",marginBottom:56}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:8,background:`${C.tealDk}15`,border:`1px solid ${C.tealDk}30`,borderRadius:20,padding:"6px 16px",marginBottom:16}}>
              <span style={{color:C.tealDk,fontSize:12,fontWeight:600,letterSpacing:1}}>{lang==="en"?"HOW IT ALL HOLDS TOGETHER":"BAGAIMANA SEMUANYA TERHUBUNG"}</span>
            </div>
            <h2 className="display-font" style={{fontSize:"clamp(32px,4vw,52px)",color:C.dark,lineHeight:1.2,marginBottom:16,maxWidth:720,margin:"0 auto 16px"}}>
              {lang==="en"?"The flywheel: trust on one side, sustainability on the other.":"Roda gila: kepercayaan di satu sisi, keberlanjutan di sisi lain."}
            </h2>
            <p style={{color:C.muted,fontSize:16,maxWidth:620,lineHeight:1.8,margin:"0 auto"}}>
              {lang==="en"?"The pieces aren't separate bets. They turn each other.":"Bagian-bagiannya bukan taruhan terpisah. Mereka saling memutar."}
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={80}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:20,marginBottom:32}}>
            {steps.map(({step,title,desc})=>(<div key={step} style={{background:C.white,borderRadius:16,padding:28,border:"1px solid rgba(2,195,154,0.15)"}}>
              <div style={{color:C.teal,fontWeight:800,fontSize:22,marginBottom:10}}>{step}</div>
              <div style={{color:C.dark,fontWeight:700,fontSize:16,marginBottom:8}}>{title}</div>
              <p style={{color:C.muted,fontSize:13.5,lineHeight:1.7}}>{desc}</p>
            </div>))}
          </div>
        </FadeIn>
        <FadeIn delay={160}>
          <div style={{background:C.dark,borderRadius:20,padding:40,textAlign:"center"}}>
            <p style={{color:"rgba(255,255,255,0.8)",fontSize:18,lineHeight:1.7,maxWidth:720,margin:"0 auto",fontFamily:"'Playfair Display',serif"}}>
              {lang==="en"?"\u201CThe free products earn the trust and build the data. The clinical product funds the infrastructure. Each turn of the wheel makes the next one stronger.\u201D":"\u201CProduk gratis meraih kepercayaan dan membangun data. Produk klinis mendanai infrastruktur. Setiap putaran roda membuat putaran berikutnya lebih kuat.\u201D"}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// VOICES FROM THE FIELD — video
// ══════════════════════════════════════════════════════════════════════════════
function FieldVoicesSection({lang}:{lang:"en"|"id"}){
  return(
    <section style={{background:C.dark,padding:"100px 0",position:"relative",overflow:"hidden"}}>
      <div className="teal-glow" style={{width:500,height:500,background:C.teal,top:"15%",right:"-12%"}}/>
      <div className="section-max" style={{position:"relative",zIndex:1}}>
        <FadeIn>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(2,195,154,0.1)",border:"1px solid rgba(2,195,154,0.3)",borderRadius:20,padding:"6px 16px",marginBottom:16}}>
            <span style={{color:C.teal,fontSize:12,fontWeight:600,letterSpacing:1}}>{lang==="en"?"VOICES FROM THE FIELD":"SUARA DARI LAPANGAN"}</span>
          </div>
          <h2 className="display-font" style={{fontSize:"clamp(32px,4vw,52px)",color:C.white,lineHeight:1.2,marginBottom:16,maxWidth:680}}>
            {lang==="en"?"See it where it matters most.":"Lihat langsung di tempat yang paling penting."}
          </h2>
          <p style={{color:"rgba(255,255,255,0.55)",fontSize:16,maxWidth:640,lineHeight:1.8,marginBottom:48}}>
            {lang==="en"?"From a quick look at what SahAIbat is, to the voices of the Kaders who use it — straight from the communities we serve."
            :"Dari sekilas tentang apa itu SahAIbat, hingga suara para Kader yang menggunakannya — langsung dari komunitas yang kami layani."}
          </p>
        </FadeIn>
        <div className="two-col" style={{alignItems:"start"}}>
          <FadeIn delay={80}>
            <div>
              <div style={{position:"relative",width:"100%",paddingTop:"56.25%",borderRadius:16,overflow:"hidden",border:"1px solid rgba(2,195,154,0.2)"}}>
                <iframe src="https://www.youtube-nocookie.com/embed/yXAWOXlAeGk" title="SahAIbat" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",border:0}}/>
              </div>
              <p style={{color:"rgba(255,255,255,0.45)",fontSize:13,marginTop:12,lineHeight:1.6}}>{lang==="en"?"A short introduction to SahAIbat (in Bahasa Indonesia).":"Perkenalan singkat tentang SahAIbat (dalam Bahasa Indonesia)."}</p>
            </div>
          </FadeIn>
          <FadeIn delay={160}>
            <div>
              <div style={{position:"relative",width:"100%",maxWidth:300,margin:"0 auto",paddingTop:"min(177.78%,533px)",borderRadius:16,overflow:"hidden",border:"1px solid rgba(233,30,140,0.25)"}}>
                <iframe src="https://www.youtube-nocookie.com/embed/9aEZtKVp8sQ" title="Kader feedback" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",border:0}}/>
              </div>
              <p style={{color:"rgba(255,255,255,0.45)",fontSize:13,marginTop:12,lineHeight:1.6,textAlign:"center"}}>{lang==="en"?"A Kader shares her experience using SahAIbat (in Bahasa Indonesia).":"Seorang Kader berbagi pengalamannya menggunakan SahAIbat (dalam Bahasa Indonesia)."}</p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// INVESTOR BAND — tight, one-glance thesis near the top
// ══════════════════════════════════════════════════════════════════════════════
function InvestorBand({lang}:{lang:"en"|"id"}){
  const flywheel=[
    {n:"01",t:lang==="en"?"Free frontline tools build trust":"Alat garis depan gratis membangun kepercayaan"},
    {n:"02",t:lang==="en"?"Trust creates a unique data layer":"Kepercayaan menciptakan lapisan data unik"},
    {n:"03",t:lang==="en"?"A clinical product turns it into revenue":"Produk klinis mengubahnya jadi pendapatan"},
    {n:"04",t:lang==="en"?"Revenue sustains the mission":"Pendapatan menopang misi"},
  ];
  const stats=[
    {v:"1.4M",l:lang==="en"?"Kaders nationwide":"Kader se-Indonesia"},
    {v:"6",l:lang==="en"?"connected surfaces":"antarmuka terhubung"},
    {v:"100%",l:lang==="en"?"data sovereign (AWS Jakarta)":"data berdaulat (AWS Jakarta)"},
  ];
  return(
    <section style={{background:`linear-gradient(135deg,${C.tealXdk},${C.dark})`,padding:"64px 0",borderTop:"1px solid rgba(2,195,154,0.15)",borderBottom:"1px solid rgba(2,195,154,0.15)"}}>
      <div className="section-max">
        <FadeIn>
          <div style={{display:"grid",gridTemplateColumns:"1.1fr 1fr",gap:48,alignItems:"center"}} className="invest-grid">
            <div>
              <div style={{color:C.teal,fontSize:12,fontWeight:700,letterSpacing:1,marginBottom:14}}>{lang==="en"?"THE SHORT VERSION":"RINGKASNYA"}</div>
              <h2 className="display-font" style={{color:C.white,fontSize:"clamp(24px,2.6vw,34px)",lineHeight:1.3,marginBottom:18}}>
                {lang==="en"?<>Free products earn the trust and build the data. A clinical product funds the infrastructure. <span style={{color:C.teal}}>Each turn of the wheel powers the next.</span></>:<>Produk gratis meraih kepercayaan dan membangun data. Produk klinis mendanai infrastruktur. <span style={{color:C.teal}}>Setiap putaran roda menggerakkan putaran berikutnya.</span></>}
              </h2>
              <div style={{display:"flex",gap:28,flexWrap:"wrap",marginTop:24}}>
                {stats.map(({v,l})=>(<div key={l}>
                  <div className="display-font" style={{color:C.teal,fontSize:30,fontWeight:900,lineHeight:1}}>{v}</div>
                  <div style={{color:"rgba(255,255,255,0.5)",fontSize:12,marginTop:4,maxWidth:130}}>{l}</div>
                </div>))}
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              {flywheel.map(({n,t})=>(<div key={n} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(2,195,154,0.18)",borderRadius:14,padding:"18px 18px"}}>
                <div style={{color:C.teal,fontWeight:800,fontSize:18,marginBottom:6}}>{n}</div>
                <div style={{color:"rgba(255,255,255,0.8)",fontSize:13.5,lineHeight:1.5}}>{t}</div>
              </div>))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
