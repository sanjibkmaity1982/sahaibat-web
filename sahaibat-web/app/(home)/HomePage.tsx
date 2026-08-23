"use client";
import React, { useState, useEffect, useRef } from "react";
import { useI18n } from "@/components/sahaibat/LanguageProvider";

// ── Design Tokens ─────────────────────────────────────────────────────────────
const C = {
  teal:"#02C39A", tealDk:"#017367", tealXdk:"#024D42",
  cream:"#F9F5EE", warm:"#EDE8DF", dark:"#0F1F1C", charcoal:"#1E2D2A",
  text:"#2D3B38", muted:"#6B8078", white:"#FFFFFF", gold:"#D4A843",
  pink:"#E91E8C", blue:"#3B82F6", purple:"#8B5CF6", orange:"#F97316",
};

// ── Shared Helpers ─────────────────────────────────────────────────────────────
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
  return <span style={{background:`${color}12`,border:`1px solid ${color}30`,color,fontSize:11,padding:"4px 10px",borderRadius:20,fontWeight:600,whiteSpace:"nowrap" as const}}>{label}</span>;
}
function ComplianceBadge({icon,title,sub,color=C.teal}:{icon:string;title:string;sub:string;color?:string}){
  return(
    <div style={{display:"flex",alignItems:"center",gap:10,background:"rgba(255,255,255,0.04)",border:`1px solid ${color}25`,borderRadius:12,padding:"10px 14px",flex:1,minWidth:160}}>
      <span style={{fontSize:20,flexShrink:0}}>{icon}</span>
      <div><div style={{color:C.white,fontWeight:700,fontSize:12,lineHeight:1.2}}>{title}</div><div style={{color:"rgba(255,255,255,0.4)",fontSize:10,marginTop:2}}>{sub}</div></div>
    </div>
  );
}

// ── HERO ─────────────────────────────────────────────────────────────────────
function HeroSection({lang}:{lang:"en"|"id"}){
  return(
    <section style={{minHeight:"100vh",position:"relative",display:"flex",alignItems:"center",overflow:"hidden",background:`linear-gradient(160deg,${C.dark} 0%,${C.charcoal} 100%)`}}>
      <div style={{position:"absolute",width:700,height:700,background:C.teal,top:-250,right:-150,borderRadius:"50%",filter:"blur(120px)",opacity:0.09,pointerEvents:"none"}}/>
      <div style={{position:"absolute",width:400,height:400,background:"#017367",bottom:-100,left:-100,borderRadius:"50%",filter:"blur(100px)",opacity:0.1,pointerEvents:"none"}}/>
      <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(2,195,154,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(2,195,154,0.04) 1px,transparent 1px)",backgroundSize:"60px 60px",pointerEvents:"none"}}/>
      <div className="section-max" style={{position:"relative",zIndex:1,paddingTop:120,paddingBottom:80,width:"100%"}}>
        <div className="hero-grid">
          {/* Left: Thesis */}
          <div>
            <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(2,195,154,0.1)",border:"1px solid rgba(2,195,154,0.3)",borderRadius:20,padding:"6px 16px",marginBottom:24}}>
              <span style={{width:6,height:6,borderRadius:"50%",background:C.teal,display:"inline-block",animation:"pulse 2s infinite"}}/>
              <span style={{color:C.teal,fontSize:12,fontWeight:600,letterSpacing:1}}>{lang==="en"?"HEALTHCARE CLOSER THAN EVER":"KESEHATAN, KINI LEBIH DEKAT"}</span>
            </div>
            <h1 className="display-font" style={{fontSize:"clamp(34px,4.6vw,58px)",color:C.white,lineHeight:1.15,marginBottom:24}}>
              {lang==="en"
                ?<>From the village Posyandu<br/>to the doctor's desk —<br/><span style={{color:C.teal}}>one connected line of care.</span></>
                :<>Dari Posyandu desa<br/>hingga meja dokter —<br/><span style={{color:C.teal}}>satu jalur perawatan yang terhubung.</span></>}
            </h1>
            <p style={{fontSize:17,color:"rgba(255,255,255,0.6)",lineHeight:1.8,marginBottom:32,maxWidth:500}}>
              {lang==="en"
                ?"SahAIbat gives community health workers, midwives, families, doctors, and hospitals the tools to catch problems earlier, document less, and never lose a patient between visits."
                :"SahAIbat memberi Kader, bidan, keluarga, dokter, dan rumah sakit alat untuk mendeteksi masalah lebih awal, mengurangi dokumentasi, dan tidak pernah kehilangan jejak pasien antar kunjungan."}
            </p>
            {/* Compliance badges */}
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:32}}>
              <div style={{display:"flex",alignItems:"center",gap:6,background:"rgba(118,185,0,0.08)",border:"1px solid rgba(118,185,0,0.25)",borderRadius:10,padding:"6px 12px"}}>
                <img src="/nvidia-inception.png" alt="NVIDIA Inception" style={{height:40,width:"auto",objectFit:"contain",borderRadius:4}}/>
              </div>
              {[
                {t:"PSE Kominfo",s:"NIB 1202260248509"},
                {t:"UU PDP",s:"AES-256-GCM"},
                {t:"SATUSEHAT",s:"HL7 FHIR R4"},
                {t:"AWS Jakarta",s:"ap-southeast-3"},
              ].map(({t,s})=>(<div key={t} style={{display:"flex",alignItems:"center",gap:6,background:"rgba(2,195,154,0.06)",border:"1px solid rgba(2,195,154,0.2)",borderRadius:10,padding:"6px 12px"}}>
                <span style={{color:C.teal,fontWeight:700,fontSize:11}}>{t}</span>
                <span style={{color:"rgba(255,255,255,0.35)",fontSize:10}}>· {s}</span>
              </div>))}
            </div>
            <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
              <a href="#platform" style={{background:C.teal,color:C.dark,padding:"14px 28px",borderRadius:12,fontSize:15,fontWeight:700,textDecoration:"none"}}>{lang==="en"?"See how it works ↓":"Lihat cara kerjanya ↓"}</a>
              <a href="https://www.sahaibatdok.com" target="_blank" rel="noopener noreferrer" style={{border:"1.5px solid rgba(2,195,154,0.4)",color:C.white,padding:"14px 28px",borderRadius:12,fontSize:15,fontWeight:600,textDecoration:"none"}}>{lang==="en"?"Try SahAIbat DoK →":"Coba SahAIbat DoK →"}</a>
            </div>
          </div>
          {/* Right: Hero field photo */}
          <div>
            <div style={{position:"relative",borderRadius:24,overflow:"hidden",boxShadow:"0 32px 80px rgba(0,0,0,0.5)"}}>
              <img
                src="/images/field/kaders-all-phones.jpeg"
                alt={lang==="en"?"Kaders using SahAIbat in NTT, Indonesia":"Kader menggunakan SahAIbat di NTT, Indonesia"}
                style={{width:"100%",height:420,objectFit:"cover",display:"block"}}
                onError={e=>{(e.target as HTMLImageElement).src="/images/hero-kader-family.png";}}
              />
              <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(15,31,28,0.85) 0%,transparent 50%)"}}/>
              <div style={{position:"absolute",bottom:0,left:0,right:0,padding:24}}>
                <div style={{color:C.teal,fontWeight:700,fontSize:11,letterSpacing:1,marginBottom:6}}>{lang==="en"?"🌿 LIVE DEPLOYMENT · NORTH CENTRAL TIMOR, NTT":"🌿 DEPLOYMENT AKTIF · TIMOR TENGAH UTARA, NTT"}</div>
                <div style={{color:C.white,fontSize:15,fontWeight:600,lineHeight:1.5}}>
                  {lang==="en"?"Real Kaders. Real phones. Real data — tracked, structured, and actionable in seconds.":"Kader nyata. Ponsel nyata. Data nyata — terlacak, terstruktur, dan dapat ditindaklanjuti dalam hitungan detik."}
                </div>
              </div>
            </div>
            {/* Live traction strip */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginTop:16}}>
              {[
                {n:320,s:"",label:lang==="en"?"Children Monitored":"Anak Dipantau"},
                {n:376,s:"",label:lang==="en"?"Growth Visits":"Kunjungan Tumbuh"},
                {n:106,s:"",label:"SAM / MAM Flagged"},
              ].map(({n,s,label})=>(<div key={label} style={{background:"rgba(2,195,154,0.07)",border:"1px solid rgba(2,195,154,0.2)",borderRadius:14,padding:"14px 16px",textAlign:"center"}}>
                <div className="display-font" style={{fontSize:28,color:C.teal,fontWeight:900}}><Counter end={n} suffix={s}/></div>
                <div style={{color:"rgba(255,255,255,0.55)",fontSize:11,marginTop:4}}>{label}</div>
              </div>))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── THE PROBLEM ───────────────────────────────────────────────────────────────
function ProblemSection({lang}:{lang:"en"|"id"}){
  const problems=[
    {
      n:"1.4M",
      color:C.teal,
      title:lang==="en"?"Community health workers":"Kader kesehatan komunitas",
      desc:lang==="en"?"Recording every Posyandu visit on paper. WHO growth calculations done by hand. Danger signs missed because the tools don't exist.":"Mencatat setiap kunjungan Posyandu di kertas. Kalkulasi pertumbuhan WHO dilakukan manual. Tanda bahaya terlewat karena alat tidak tersedia.",
      fix:lang==="en"?"SahAIbat Kader — built into every Posyandu.":"SahAIbat Kader — terpasang di setiap Posyandu.",
    },
    {
      n:"300K",
      color:C.pink,
      title:lang==="en"?"Doctors facing a mandate they can't meet":"Dokter menghadapi mandat yang tidak dapat dipenuhi",
      desc:lang==="en"?"Kemenkes requires all clinics to push structured records to SATUSEHAT (PMK 24/2022). No tools exist to do this in Bahasa Indonesia, in under 5 minutes, without a dedicated IT team.":"Kemenkes mewajibkan semua klinik mengirim rekam medis terstruktur ke SATUSEHAT (PMK 24/2022). Tidak ada alat yang bisa melakukan ini dalam Bahasa Indonesia, dalam 5 menit, tanpa tim IT khusus.",
      fix:lang==="en"?"SahAIbat DoK — SOAP in 32 seconds. SATUSEHAT automatic.":"SahAIbat DoK — SOAP dalam 32 detik. SATUSEHAT otomatis.",
    },
    {
      n:"280M",
      color:C.gold,
      title:lang==="en"?"Patients with no connected health record":"Pasien tanpa rekam medis terhubung",
      desc:lang==="en"?"A child screened for stunting by a Kader today has no link to the doctor who sees them tomorrow. No longitudinal record. No data continuity. No clinical AI that understands Indonesian health context.":"Anak yang diskrining stunting oleh Kader hari ini tidak terhubung dengan dokter yang menemuinya besok. Tidak ada rekam medis longitudinal. Tidak ada AI klinis yang memahami konteks kesehatan Indonesia.",
      fix:lang==="en"?"SahAIbat ecosystem — the missing connection layer.":"Ekosistem SahAIbat — lapisan koneksi yang hilang.",
    },
  ];
  return(
    <section style={{background:C.dark,padding:"100px 0"}}>
      <div className="section-max">
        <FadeIn>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(232,72,85,0.1)",border:"1px solid rgba(232,72,85,0.3)",borderRadius:20,padding:"6px 16px",marginBottom:16}}>
            <span style={{color:"#FF6B6B",fontSize:12,fontWeight:600,letterSpacing:1}}>{lang==="en"?"THE OPPORTUNITY":"PELUANGNYA"}</span>
          </div>
          <h2 className="display-font" style={{fontSize:"clamp(30px,4vw,50px)",color:C.white,lineHeight:1.2,marginBottom:16,maxWidth:680}}>
            {lang==="en"?"Indonesia's health workers are remarkable. The tools to match them don't exist yet.":"Tenaga kesehatan Indonesia luar biasa. Alat yang sepadan dengan mereka belum ada."}
          </h2>
          <p style={{color:"rgba(255,255,255,0.5)",fontSize:16,maxWidth:600,lineHeight:1.8,marginBottom:56}}>
            {lang==="en"?"Three critical gaps — in the tools Kaders carry, the documentation doctors face, and the data connecting them. One platform closes all three.":"Tiga kesenjangan kritis — pada alat yang dibawa Kader, dokumentasi yang dihadapi dokter, dan data yang menghubungkan keduanya. Satu platform menutup ketiganya."}
          </p>
        </FadeIn>
        <div className="three-col">
          {problems.map(({n,color,title,desc,fix},i)=>(<FadeIn key={n} delay={i*100}>
            <div style={{background:"rgba(255,255,255,0.02)",border:`1px solid ${color}20`,borderRadius:20,padding:32,height:"100%",position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${color},transparent)`}}/>
              <div className="display-font" style={{fontSize:52,color,fontWeight:900,lineHeight:1,marginBottom:16}}>{n}</div>
              <div style={{color:C.white,fontWeight:700,fontSize:16,marginBottom:12,lineHeight:1.4}}>{title}</div>
              <p style={{color:"rgba(255,255,255,0.45)",fontSize:13,lineHeight:1.7,marginBottom:20}}>{desc}</p>
              <div style={{display:"flex",alignItems:"center",gap:8,background:`${color}10`,border:`1px solid ${color}25`,borderRadius:10,padding:"10px 14px"}}>
                <span style={{color,fontSize:18}}>✓</span>
                <span style={{color,fontWeight:600,fontSize:12}}>{fix}</span>
              </div>
            </div>
          </FadeIn>))}
        </div>
      </div>
    </section>
  );
}

// ── PLATFORM ARCHITECTURE ─────────────────────────────────────────────────────
function PlatformSection({lang}:{lang:"en"|"id"}){
  const surfaces=[
    {icon:"👩🏽‍⚕️",label:"Kader App",who:lang==="en"?"Community health workers":"Kader kesehatan",color:C.teal,live:true,layer:lang==="en"?"COMMUNITY":"KOMUNITAS"},
    {icon:"👶",label:"Kasih",who:lang==="en"?"Families via WhatsApp":"Keluarga via WhatsApp",color:C.pink,live:true,layer:lang==="en"?"FAMILY":"KELUARGA"},
    {icon:"🩺",label:"SahAIbat Bidan",who:lang==="en"?"Midwives — ANC & postnatal":"Bidan — ANC & nifas",color:C.purple,live:true,layer:lang==="en"?"MIDWIFE":"BIDAN"},
    {icon:"🩻",label:"SahAIbat DoK",who:lang==="en"?"Doctors & clinics — EMR + AI scribe":"Dokter & klinik — EMR + AI scribe",color:"#A48BFF",live:true,layer:lang==="en"?"CLINIC":"KLINIK",isCommercial:true},
    {icon:"📖",label:"Konsensus",who:lang==="en"?"Doctors — guideline & formulary support":"Dokter — dukungan panduan & formularium",color:C.gold,live:true,layer:lang==="en"?"DECISION SUPPORT":"DUKUNGAN KEPUTUSAN"},
    {icon:"🏥",label:lang==="en"?"Hospital":"Rumah Sakit",who:lang==="en"?"Coding teams — claim integrity":"Tim koder — integritas klaim",color:C.blue,live:true,layer:lang==="en"?"HOSPITAL":"RUMAH SAKIT"},
  ];
  return(
    <section id="platform" style={{background:C.cream,padding:"100px 0"}}>
      <div className="section-max">
        <FadeIn>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:`${C.tealDk}20`,border:`1px solid ${C.tealDk}40`,borderRadius:20,padding:"6px 16px",marginBottom:16}}>
            <span style={{color:C.tealDk,fontSize:12,fontWeight:600,letterSpacing:1}}>{lang==="en"?"THE PLATFORM":"PLATFORMNYA"}</span>
          </div>
          <h2 className="display-font" style={{fontSize:"clamp(30px,4vw,50px)",color:C.dark,lineHeight:1.2,marginBottom:16,maxWidth:760}}>
            {lang==="en"
              ?<>One clinical AI engine.<br/><span style={{color:C.tealDk}}>Six nodes. Every layer of Indonesian primary care.</span></>
              :<>Satu engine AI klinis.<br/><span style={{color:C.tealDk}}>Enam titik. Setiap lapisan layanan primer Indonesia.</span></>}
          </h2>
          <p style={{color:C.muted,fontSize:16,maxWidth:680,lineHeight:1.8,marginBottom:56}}>
            {lang==="en"?"SahAIbat DoK is not just a product — it is the AI intelligence layer that sits across all six nodes, processing data from every touchpoint in the patient journey to keep one record consistent from Posyandu to hospital discharge.":"SahAIbat DoK bukan sekadar produk — ini adalah lapisan kecerdasan AI yang berada di seluruh enam titik, memproses data dari setiap titik sentuh dalam perjalanan pasien untuk menjaga satu rekam tetap konsisten dari Posyandu hingga pulang rawat rumah sakit."}
          </p>
        </FadeIn>

        {/* Pipeline diagram */}
        <FadeIn delay={80}>
          <div style={{background:C.dark,borderRadius:24,padding:"40px 32px",marginBottom:48,position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${C.teal},${C.purple},${C.pink},${C.teal})`}}/>
            <div style={{textAlign:"center",marginBottom:28}}>
              <span style={{color:C.teal,fontWeight:700,fontSize:11,letterSpacing:1}}>{lang==="en"?"ONE RECORD, SIX NODES":"SATU REKAM, ENAM TITIK"}</span>
            </div>
            {/* Pipeline flow */}
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:0,flexWrap:"wrap",maxWidth:900,margin:"0 auto"}}>
              {[
                {icon:"👩🏽‍⚕️",name:"Kader",sub:lang==="en"?"screens child":"skrining anak",color:C.teal},
                {arrow:"↕",color:"rgba(255,255,255,0.2)"},
                {icon:"🩺",name:"Bidan",sub:lang==="en"?"supervises":"mengawasi",color:C.purple},
                {arrow:"↕",color:"rgba(255,255,255,0.2)"},
                {icon:"🩻",name:"DoK AI",sub:lang==="en"?"diagnoses":"diagnosis",color:"#A48BFF",highlight:true},
                {arrow:"↕",color:"rgba(255,255,255,0.2)"},
                {icon:"📖",name:"Konsensus",sub:lang==="en"?"decision support":"dukungan keputusan",color:C.gold},
                {arrow:"↕",color:"rgba(255,255,255,0.2)"},
                {icon:"❤️‍🩹",name:"Kasih",sub:lang==="en"?"family follow-up":"tindak lanjut keluarga",color:C.pink},
                {arrow:"↕",color:"rgba(255,255,255,0.2)"},
                {icon:"🏥",name:lang==="en"?"Hospital":"RS",sub:lang==="en"?"claim integrity":"integritas klaim",color:C.blue},
              ].map((item,i)=>{
                if ("arrow" in item) return <div key={i} style={{color:item.color,fontSize:20,padding:"0 12px",fontWeight:300}}>→</div>;
                return(
                  <div key={i} style={{textAlign:"center",padding:"16px 20px",borderRadius:16,background:item.highlight?"rgba(164,139,255,0.12)":"rgba(255,255,255,0.04)",border:`1px solid ${item.color}${"highlight" in item && item.highlight?"50":"25"}`,minWidth:100}}>
                    <div style={{fontSize:28,marginBottom:6}}>{item.icon}</div>
                    <div style={{color:item.color,fontWeight:700,fontSize:13}}>{item.name}</div>
                    <div style={{color:"rgba(255,255,255,0.4)",fontSize:10,marginTop:3}}>{item.sub}</div>
                    {"highlight" in item && item.highlight&&<div style={{color:"#A48BFF",fontSize:9,fontWeight:700,letterSpacing:1,marginTop:6,background:"rgba(164,139,255,0.15)",borderRadius:8,padding:"2px 8px"}}>{lang==="en"?"AI LAYER":"LAPISAN AI"}</div>}
                  </div>
                );
              })}
            </div>
            <div style={{marginTop:24,paddingTop:20,borderTop:"1px solid rgba(255,255,255,0.06)",textAlign:"center"}}>
              <p style={{color:"rgba(255,255,255,0.5)",fontSize:13,maxWidth:640,margin:"0 auto",lineHeight:1.7}}>
                {lang==="en"?"Every layer captures data the others can't. Together they create a longitudinal patient record spanning community health, clinical care, and patient behaviour — the only such corpus in Indonesia.":"Setiap lapisan menangkap data yang tidak bisa ditangkap lapisan lain. Bersama mereka menciptakan rekam medis longitudinal yang mencakup kesehatan komunitas, perawatan klinis, dan perilaku pasien — satu-satunya corpus seperti ini di Indonesia."}
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Surface cards */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:16}}>
          {surfaces.map(({icon,label,who,color,live,layer,isCommercial},i)=>(<FadeIn key={label} delay={i*60}>
            <div style={{background:C.white,border:`1px solid ${color}25`,borderRadius:16,padding:22,height:"100%",position:"relative"}}>
              <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${color},transparent)`,borderRadius:"16px 16px 0 0"}}/>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                <span style={{fontSize:28}}>{icon}</span>
                <span style={{fontSize:9,fontWeight:700,letterSpacing:0.5,padding:"3px 8px",borderRadius:20,background:live?"rgba(2,195,154,0.12)":"rgba(0,0,0,0.05)",color:live?C.tealDk:C.muted,border:`1px solid ${live?"rgba(2,195,154,0.25)":"rgba(0,0,0,0.1)"}`}}>{live?(lang==="en"?"LIVE":"AKTIF"):(lang==="en"?"IN DEVELOPMENT":"DIKEMBANGKAN")}</span>
              </div>
              <div style={{color,fontSize:10,fontWeight:700,letterSpacing:1,marginBottom:4}}>{layer}</div>
              <div style={{color:C.dark,fontWeight:700,fontSize:15,marginBottom:4}}>{label}</div>
              <div style={{color:C.muted,fontSize:12,lineHeight:1.5}}>{who}</div>
              {isCommercial&&(
                <div style={{marginTop:12,display:"flex",alignItems:"center",gap:6,background:"rgba(164,139,255,0.08)",border:"1px solid rgba(164,139,255,0.2)",borderRadius:8,padding:"6px 10px"}}>
                  <span style={{color:"#A48BFF",fontSize:10,fontWeight:700}}>💰 {lang==="en"?"COMMERCIAL":"KOMERSIAL"}</span>
                </div>
              )}
            </div>
          </FadeIn>))}
        </div>
      </div>
    </section>
  );
}

// ── Animated WhatsApp Chat Demo ───────────────────────────────────────────────
type ChatMsg={u:boolean;txt:string;delay:number;isAlert?:boolean;isCard?:boolean};

const KASIH_MSGS:ChatMsg[]=[
  {u:true,txt:"Anak saya 8 bulan sudah 3 hari gak mau makan 😢 hanya mau minum susu terus",delay:0},
  {u:false,txt:"Ibu, saya mendengar Anda 💙 Wajar sekali jika merasa khawatir. Boleh saya bantu cek nutrisinya?\n\nApakah bayi masih mau ASI atau sufor?",delay:1200},
  {u:true,txt:"masih mau, bahkan banyak sekali",delay:2600},
  {u:false,txt:"Ini kabar baik, Ibu 🌟 Di usia 8 bulan ASI tetap penting sambil belajar MPASI.\n\nBeberapa tips:\n🥕 Variasi rasa — wortel, labu, pisang\n⏰ Tawarkan 2–3x sehari, porsi kecil\n🎮 Jadikan waktu makan menyenangkan\n\nJika tidak ada perubahan dalam 5 hari, kunjungi Posyandu untuk skrining pertumbuhan 💚",delay:4000},
  {u:true,txt:"terima kasih Bu Kasih, lega sekali rasanya 🙏",delay:5800},
  {u:false,txt:"🔔 Pengingat: Posyandu desa Anda hari Jumat ini.\nJangan lupa bawa Buku KIA ya, Bu 💙",delay:7000,isAlert:true},
];

const BIDAN_MSGS:ChatMsg[]=[
  {u:true,txt:"Bu Bidan, ini laporan ANC Bu Sari K3",delay:0,isCard:true},
  {u:false,txt:"⚠️ PERINGATAN KUALITAS ANC\n\nBu Sari · K3 · 28 minggu · TD: 130/85\n\n✓ T1 Berat Badan\n✓ T2 Tekanan Darah ⚡ batas pra-hipertensi\n✗ T8 Presentasi Janin — belum dilakukan\n✗ T5 Tablet Fe — data kosong\n\nSkor 10T: 7/10 — perlu ditindaklanjuti",delay:1400,isAlert:true},
  {u:true,txt:"Terima kasih. Saya jadwalkan kunjungan rumah minggu ini untuk melengkapi T8 dan cek tablet Fe.",delay:3000},
  {u:false,txt:"✓ Terjadwal. Jika TD mencapai ≥140/90 sebelum kunjungan, segera rujuk ke Puskesmas.\n\nSkor akhir akan otomatis terupdate di Dashboard setelah kunjungan.",delay:4400},
  {u:true,txt:"Siap. Saya sudah koordinasi dengan Kader Sari untuk pantau harian.",delay:5800},
  {u:false,txt:"✓ Pemantauan aktif dicatat.\n📊 Laporan lengkap tersedia di Programme Dashboard.",delay:7000},
];

function AnimatedWhatsAppChat({type,accent}:{type:"kasih"|"bidan";accent:string}){
  const msgs=type==="kasih"?KASIH_MSGS:BIDAN_MSGS;
  const botName=type==="kasih"?"❤️‍🩹 Kasih":"🩺 SahAIbat Bidan";
  const [shown,setShown]=useState(0);
  const [typing,setTyping]=useState(false);
  const [key,setKey]=useState(0);
  const ref=useRef<HTMLDivElement>(null);
  const started=useRef(false);

  const runSequence=React.useCallback(()=>{
    setShown(0);setTyping(false);
    msgs.forEach((m,i)=>{
      setTimeout(()=>{
        if(!m.u){setTyping(true);}
        setTimeout(()=>{setTyping(false);setShown(i+1);},m.u?0:600);
      },m.delay+(m.u?0:0));
    });
  },[msgs]);

  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting&&!started.current){started.current=true;runSequence();}},{threshold:0.3});
    if(ref.current)obs.observe(ref.current);return()=>obs.disconnect();
  },[runSequence]);

  useEffect(()=>{if(key>0)runSequence();},[key,runSequence]);

  return(
    <div ref={ref} style={{background:"#0B1A15",border:`1px solid ${accent}30`,borderRadius:20,overflow:"hidden",boxShadow:"0 16px 48px rgba(0,0,0,0.5)"}}>
      {/* WhatsApp header */}
      <div style={{background:"#1A2E22",padding:"12px 16px",display:"flex",alignItems:"center",gap:12,borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
        <div style={{width:36,height:36,borderRadius:"50%",background:accent,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>
          {type==="kasih"?"❤️":"🩺"}
        </div>
        <div style={{flex:1}}>
          <div style={{color:"#E9EDEF",fontWeight:700,fontSize:14}}>{botName}</div>
          <div style={{color:"#8696A0",fontSize:12}}>{type==="kasih"?"Layanan Kesehatan Keluarga":"Modul Pengawasan Bidan"}</div>
        </div>
        <div style={{display:"flex",gap:16}}>
          <span style={{color:"#8696A0",fontSize:18}}>📞</span>
          <span style={{color:"#8696A0",fontSize:18}}>⋮</span>
        </div>
      </div>
      {/* Chat area */}
      <div style={{padding:"16px 12px",minHeight:320,maxHeight:360,overflowY:"auto",background:"#0B1A15",display:"flex",flexDirection:"column",gap:6}}>
        {/* Date pill */}
        <div style={{textAlign:"center",marginBottom:8}}>
          <span style={{background:"rgba(255,255,255,0.08)",color:"rgba(255,255,255,0.4)",fontSize:11,padding:"3px 12px",borderRadius:20}}>
            {type==="kasih"?"Hari ini · 02:47":"Hari ini · 09:15"}
          </span>
        </div>
        {msgs.slice(0,shown).map((m,i)=>(
          <div key={i} style={{display:"flex",justifyContent:m.u?"flex-end":"flex-start",marginBottom:2}}>
            <div style={{
              maxWidth:"82%",padding:"8px 12px",borderRadius:m.u?"12px 12px 4px 12px":"12px 12px 12px 4px",
              background:m.isAlert?"rgba(255,165,0,0.12)":m.u?"#005C4B":"#1F2C34",
              border:m.isAlert?"1px solid rgba(255,165,0,0.35)":"none",
              color:m.isAlert?"#FFA500":m.u?"#E9EDEF":"#E9EDEF",
              fontSize:12.5,lineHeight:1.55,whiteSpace:"pre-line" as const,
            }}>
              {m.isCard&&(
                <div style={{background:"rgba(255,255,255,0.08)",borderRadius:8,padding:"8px 10px",marginBottom:6,fontSize:11}}>
                  <div style={{color:accent,fontWeight:700,marginBottom:4}}>📋 LAPORAN ANC · Bu Sari</div>
                  <div style={{color:"rgba(255,255,255,0.6)"}}>K3 · 28 minggu · TD: 130/85 · BB: 65kg</div>
                </div>
              )}
              {m.txt}
              <div style={{color:"rgba(255,255,255,0.3)",fontSize:10,textAlign:"right",marginTop:4}}>
                {m.u?"✓✓":""}
              </div>
            </div>
          </div>
        ))}
        {typing&&(
          <div style={{display:"flex",justifyContent:"flex-start"}}>
            <div style={{background:"#1F2C34",borderRadius:"12px 12px 12px 4px",padding:"10px 14px",display:"flex",gap:4,alignItems:"center"}}>
              {[0,1,2].map(i=>(<div key={i} style={{width:6,height:6,borderRadius:"50%",background:accent,animation:"pulse 1s infinite",animationDelay:`${i*0.2}s`}}/>))}
            </div>
          </div>
        )}
      </div>
      {/* Footer */}
      <div style={{background:"#1A2E22",padding:"10px 14px",display:"flex",alignItems:"center",gap:10,borderTop:"1px solid rgba(255,255,255,0.06)"}}>
        <div style={{flex:1,background:"rgba(255,255,255,0.07)",borderRadius:20,padding:"8px 14px",color:"rgba(255,255,255,0.3)",fontSize:13}}>Ketik pesan...</div>
        <div style={{width:36,height:36,borderRadius:"50%",background:accent,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,cursor:"pointer"}} onClick={()=>{started.current=false;setKey(k=>k+1);}}>🎤</div>
      </div>
      <div style={{textAlign:"center",paddingBottom:8}}>
        <button onClick={()=>{started.current=false;setKey(k=>k+1);}} style={{background:"none",border:"none",color:"rgba(255,255,255,0.25)",fontSize:11,cursor:"pointer",padding:"4px 8px"}}>↺ replay</button>
      </div>
    </div>
  );
}


function ProductsSection({lang}:{lang:"en"|"id"}){
  const [active,setActive]=useState(0);
  const tabs=[
    {
      id:0,icon:"👩🏽‍⚕️",label:"Kader",sub:lang==="en"?"Community Node":"Titik Komunitas",accent:C.teal,status:"live",
      businessModel:lang==="en"?"Built into every Posyandu — ILP-aligned, government-grade data layer":"Terpasang di setiap Posyandu — selaras ILP, lapisan data kelas pemerintah",
      headline:lang==="en"?"The paper KMS form. Replaced. In seconds.":"Formulir KMS kertas. Digantikan. Dalam hitungan detik.",
      story:lang==="en"?"Every Posyandu visit, a Kader manually plots a child's weight on a paper KMS chart, estimates their growth category, copies data into registers, and hopes she didn't make a calculation error. SahAIbat Kader digitises this entire flow — WHO growth auto-calculated, danger signs auto-flagged, programme dashboard updated automatically — from a WhatsApp-native interface on the Kader's existing phone.\n\nKader covers all 5 ILP Posyandu life-cycle service packages mandated by Kemenkes: child health (0–60 months), maternal (ANC, postnatal, neonatal), adolescent (6–18 years), adult & elderly, and communicable disease (TB, malaria, dengue). Every visit here becomes part of one longitudinal record — not a form that ends in a drawer.":"Setiap kunjungan Posyandu, Kader secara manual memplot berat badan anak di grafik KMS kertas, memperkirakan kategori pertumbuhan, menyalin data ke register, dan berharap tidak ada kesalahan kalkulasi. Kader SahAIbat mendigitalkan seluruh alur ini — pertumbuhan WHO dihitung otomatis, tanda bahaya diberi tanda otomatis, dasbor program diperbarui otomatis.\n\nKader mencakup 5 paket layanan siklus hidup ILP Posyandu yang diamanatkan Kemenkes: kesehatan anak (0–60 bulan), ibu hamil/nifas/neonatal, remaja (6–18 tahun), usia dewasa & lansia, dan penyakit menular (TB, malaria, dengue). Setiap kunjungan di sini menjadi bagian dari satu rekam longitudinal — bukan formulir yang berakhir di laci.",
      features:lang==="en"?["5 ILP life-cycle packages — child, maternal, adolescent, adult/elderly, communicable disease","WHO growth auto-calculated — BB/U, TB/U, BB/TB in seconds","Fully offline on 2G phones — syncs when signal returns","Danger sign flags → RUJUK alerts → Programme Dashboard","Feeds MoH-grade Puskesmas & health post data metrics in real time","First contact in the record — screens, flags, and opens the case"]:["5 paket siklus hidup ILP — anak, ibu, remaja, dewasa/lansia, penyakit menular","Pertumbuhan WHO dihitung otomatis — BB/U, TB/U, BB/TB dalam detik","Offline penuh di ponsel 2G — sinkron saat sinyal kembali","Tanda bahaya → peringatan RUJUK → Dasbor Program","Mengisi metrik data Puskesmas & poskesdes berkualitas Kemenkes secara real-time","Kontak pertama dalam rekam — skrining, deteksi, dan buka kasus"],
      gif:"/images/demo/kader-demo.gif",
      photo:"/images/field/kader-result-screen.jpeg",
      photoFallback:"/images/hero-kader-family.png",
    },
    {
      id:1,icon:"🩺",label:"SahAIbat Bidan",sub:lang==="en"?"Midwife Node":"Titik Bidan",accent:C.purple,status:"live",
      businessModel:lang==="en"?"Supervision layer between Kader and clinic":"Lapisan pengawasan antara Kader dan klinik",
      headline:lang==="en"?"Her clinical judgment. Extended to every village she can't be in.":"Penilaian klinisnya. Diperluas ke setiap desa yang tidak bisa ia kunjungi.",
      story:lang==="en"?"A Bidan in rural NTT covers 5–10 villages. She cannot be everywhere. SahAIbat Bidan gives her a structured digital companion — ANC visit tracking, postnatal monitoring, high-risk pregnancy flags, Kader performance scoring — so her knowledge reaches patients in villages she visits once a month.\n\nThe Bidan module connects directly to the Programme Dashboard, giving NGO managers and health officials a real-time view of ANC quality scores, high-risk cases, and referral completion rates across their entire network.":"Seorang Bidan di NTT pedesaan mencakup 5–10 desa. Ia tidak bisa hadir di mana-mana. SahAIbat Bidan memberinya pendamping digital terstruktur — pelacakan kunjungan ANC, pemantauan nifas, tanda bahaya kehamilan berisiko tinggi, skor kinerja Kader — sehingga pengetahuannya menjangkau pasien di desa yang ia kunjungi sebulan sekali.",
      features:lang==="en"?["ANC 10T completeness tracking — scored per Bidan","High-risk pregnancy flags (preeclampsia, severe anaemia, placenta praevia)","Postnatal monitoring 0–42 days","Kader performance scoring visible to supervising Bidan","8.7/10 average ANC quality score in live NTT deployment"]:["Pelacakan kelengkapan ANC 10T — dinilai per Bidan","Tanda bahaya kehamilan (preeklampsia, anemia berat, plasenta previa)","Pemantauan nifas 0–42 hari","Skor kinerja Kader terlihat oleh Bidan pengawas","Rata-rata skor kualitas ANC 8,7/10 dalam deployment NTT aktif"],
      chatType:"bidan",
      photo:null,photoFallback:undefined,
    },
    {
      id:2,icon:"❤️‍🩹",label:"Kasih",sub:lang==="en"?"Family Node":"Titik Keluarga",accent:C.pink,status:"live",
      businessModel:lang==="en"?"The family's line into the same record their Kader and doctor see":"Jalur keluarga menuju rekam yang sama dengan yang dilihat Kader dan dokter mereka",
      headline:lang==="en"?"2:47 AM. A mother. A fever. One message.":"Pukul 02:47. Seorang ibu. Demam. Satu pesan.",
      story:lang==="en"?"Kasih is what happens when a worried parent can't reach a doctor at 2am and needs to know: is this an emergency? In 90 seconds, Kasih provides a structured risk assessment in warm, clear Bahasa Indonesia — no app download, no internet required, no clinical training needed.\n\nWhat a family tells Kasih becomes part of the same record their Kader and doctor see — nothing is asked twice.":"Kasih adalah apa yang terjadi ketika orang tua yang khawatir tidak bisa menghubungi dokter jam 2 pagi dan perlu tahu: apakah ini darurat? Dalam 90 detik, Kasih memberikan penilaian risiko terstruktur dalam Bahasa Indonesia yang hangat dan jelas — tidak perlu unduh aplikasi, tidak perlu internet.\n\nApa yang keluarga sampaikan ke Kasih menjadi bagian dari rekam yang sama dengan yang dilihat Kader dan dokter mereka — tidak ada yang ditanyakan dua kali.",
      features:lang==="en"?["WhatsApp-native — no app download, no account","Structured risk triage in Bahasa Indonesia","Works fully offline on any phone","Captures what happens between visits, in the family's own words","The patient-side node in the same connected record"]:["Berbasis WhatsApp — tidak perlu unduh, tidak perlu akun","Triase risiko terstruktur dalam Bahasa Indonesia","Bekerja offline penuh di ponsel apa pun","Menangkap apa yang terjadi antar kunjungan, dalam kata-kata keluarga","Titik sisi pasien dalam rekam terhubung yang sama"],
      chatType:"kasih",
      photo:null,photoFallback:undefined,
    },
    {
      id:3,icon:"🩻",label:"SahAIbat DoK",sub:lang==="en"?"Clinical Node · AI Scribe":"Titik Klinis · AI Scribe",accent:"#A48BFF",status:"commercial",
      businessModel:lang==="en"?"Rp 120K/month per doctor · Enterprise custom pricing":"Rp 120K/bulan per dokter · Harga Enterprise custom",
      headline:lang==="en"?"SOAP note in 32 seconds. SATUSEHAT automatic. BPJS-aligned.":"Catatan SOAP dalam 32 detik. SATUSEHAT otomatis. Selaras BPJS.",
      story:lang==="en"?"Indonesian doctors spend 2–3 hours daily on documentation they hate — writing SOAP notes, manually uploading to SATUSEHAT, cross-referencing BPJS Fornas drug lists, and hoping ICD-10 codes don't get rejected. DoK records the consultation, writes the SOAP, maps ICD-10 with BPJS confidence scores, and auto-posts to SATUSEHAT — in 32 seconds, in Bahasa Indonesia, on data that never leaves Indonesia.\n\nDoK is the clinical node that structures the encounter and closes the loop to SATUSEHAT — the point where the record becomes formal.":"Dokter Indonesia menghabiskan 2–3 jam sehari untuk dokumentasi — menulis catatan SOAP, mengunggah manual ke SATUSEHAT, merujuk silang daftar obat Fornas BPJS, dan berharap kode ICD-10 tidak ditolak. DoK merekam konsultasi, menulis SOAP, memetakan ICD-10 dengan skor kepercayaan BPJS, dan mengirim otomatis ke SATUSEHAT — dalam 32 detik, dalam Bahasa Indonesia, pada data yang tidak pernah meninggalkan Indonesia.\n\nDoK adalah titik klinis yang menyusun konsultasi dan menutup jalur ke SATUSEHAT — titik di mana rekam menjadi resmi.",
      features:lang==="en"?["AI Voice Scribe → SOAP in Bahasa Indonesia · 32 seconds","BPJS Gatekeeper — 144 non-specialist conditions flagged","SATUSEHAT HL7 FHIR R4 auto-sync after doctor approval","MedGemma CDSS + Konsensus Medis (PERKENI, PAPDI, IDAI)","Data 100% in Jakarta — UU PDP · AES-256-GCM","Mission Partner pricing for NGOs in the SahAIbat network"]:["AI Voice Scribe → SOAP dalam Bahasa Indonesia · 32 detik","BPJS Gatekeeper — 144 kondisi non-spesialis ditandai","SATUSEHAT HL7 FHIR R4 sinkron otomatis setelah persetujuan dokter","MedGemma CDSS + Konsensus Medis (PERKENI, PAPDI, IDAI)","Data 100% di Jakarta — UU PDP · AES-256-GCM","Harga Mitra Misi untuk NGO dalam jaringan SahAIbat"],
      externalLink:"https://www.sahaibatdok.com",
      linkLabel:lang==="en"?"See full DoK product site →":"Lihat situs produk DoK lengkap →",
      gif:"/images/demo/dok_demo.gif",
      photo:null,
    },
    {
      id:4,icon:"📖",label:"Konsensus",sub:lang==="en"?"Decision-Support Node":"Titik Dukungan Keputusan",accent:C.gold,status:"live",
      businessModel:lang==="en"?"Built into the same clinical engine behind DoK":"Dibangun di atas mesin klinis yang sama dengan DoK",
      headline:lang==="en"?"Clinical answers, the moment you need them.":"Jawaban klinis, saat Anda membutuhkannya.",
      story:lang==="en"?"Konsensus is SahAIbat's guideline and formulary support layer — PERKENI, PAPDI, IDAI, BPJS Fornas — built into the same clinical engine behind DoK, so every doctor in the network works from the same standard of decision support at the bedside.\n\nIt keeps clinical decisions consistent across every doctor in the network, whether they're in a city clinic or a health post in NTT.":"Konsensus adalah lapisan dukungan panduan dan formularium SahAIbat — PERKENI, PAPDI, IDAI, Fornas BPJS — dibangun di atas mesin klinis yang sama dengan DoK, sehingga setiap dokter dalam jaringan bekerja dengan standar dukungan keputusan yang sama di sisi pasien.\n\nKonsensus menjaga keputusan klinis tetap konsisten di seluruh dokter dalam jaringan, baik di klinik kota maupun poskesdes di NTT.",
      features:lang==="en"?["PERKENI, PAPDI, IDAI clinical guidelines","BPJS Fornas formulary search","Same clinical engine as DoK — one standard of care","Instant lookup at the point of consultation","Keeps decisions consistent across every doctor in the network"]:["Panduan klinis PERKENI, PAPDI, IDAI","Pencarian formularium Fornas BPJS","Mesin klinis yang sama dengan DoK — satu standar perawatan","Pencarian instan di titik konsultasi","Menjaga keputusan tetap konsisten di seluruh dokter dalam jaringan"],
      photo:null,
    },
    {
      id:5,icon:"🏥",label:"Hospital",sub:lang==="en"?"Claim-Integrity Node":"Titik Integritas Klaim",accent:"#3B82F6",status:"live",
      businessModel:lang==="en"?"Advisory only — for hospital coding teams":"Bersifat advisory — untuk tim koder rumah sakit",
      headline:lang==="en"?"Stop claim leakage before it reaches E-Klaim.":"Hentikan kebocoran klaim sebelum sampai ke E-Klaim.",
      story:lang==="en"?"Documented conditions that never make it onto a diagnosis list quietly drop a claim's severity level — and the revenue with it. SahAIbat surfaces the gap while the chart is still open, so coders can act before submission.\n\nThis node protects the record's completeness through to reimbursement — advisory only, your coding team and E-Klaim's grouper always make the final call.":"Kondisi yang terdokumentasi tapi tak masuk daftar diagnosis diam-diam menurunkan tingkat keparahan klaim — dan pendapatan bersamanya. SahAIbat menandai celah itu selagi rekam medis masih terbuka.\n\nTitik ini menjaga kelengkapan rekam hingga ke penggantian biaya — bersifat advisory, keputusan akhir tetap di tangan tim koder dan grouper E-Klaim.",
      features:lang==="en"?["Scans the chart against documented conditions","Flags gaps before submission, not after denial","Advisory only — never submits or alters a claim","iDRG stays on ICD-10-IM, E-Klaim owns grouping"]:["Memindai rekam medis terhadap kondisi terdokumentasi","Menandai celah sebelum pengajuan, bukan setelah ditolak","Bersifat advisory — tidak pernah mengirim atau mengubah klaim","iDRG tetap pada ICD-10-IM, E-Klaim memiliki grouping"],
      externalLink:"/enterprise",
      linkLabel:lang==="en"?"See the Hospital node →":"Lihat Titik Rumah Sakit →",
      photo:null,
    },
  ];
  const p=tabs[active];

  return(
    <section id="network" style={{background:C.dark,padding:"100px 0",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",width:400,height:400,background:C.teal,top:"5%",right:"-5%",borderRadius:"50%",filter:"blur(100px)",opacity:0.08,pointerEvents:"none"}}/>
      <div className="section-max" style={{position:"relative",zIndex:1}}>
        <FadeIn>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(2,195,154,0.1)",border:"1px solid rgba(2,195,154,0.3)",borderRadius:20,padding:"6px 16px",marginBottom:16}}>
            <span style={{color:C.teal,fontSize:12,fontWeight:600,letterSpacing:1}}>{lang==="en"?"THE NETWORK":"JARINGANNYA"}</span>
          </div>
          <h2 className="display-font" style={{fontSize:"clamp(30px,4vw,50px)",color:C.white,lineHeight:1.2,marginBottom:16,maxWidth:700}}>
            {lang==="en"?"One record. Six nodes across the system.":"Satu rekam. Enam titik di seluruh sistem."}
          </h2>
          <p style={{color:"rgba(255,255,255,0.5)",fontSize:16,maxWidth:560,lineHeight:1.8,marginBottom:48}}>
            {lang==="en"?"SahAIbat isn't six separate apps. It's six nodes feeding one connected record — from Posyandu to hospital discharge.":"SahAIbat bukan enam aplikasi terpisah. Ini enam titik yang mengalirkan data ke satu rekam terhubung — dari Posyandu hingga pulang rawat rumah sakit."}
          </p>
        </FadeIn>

        {/* Tabs */}
        <div style={{display:"flex",gap:10,marginBottom:48,flexWrap:"wrap"}}>
          {tabs.map(tab=>(<button key={tab.id} onClick={()=>setActive(tab.id)} style={{display:"flex",alignItems:"center",gap:8,padding:"10px 18px",borderRadius:14,fontSize:13,fontWeight:600,cursor:"pointer",transition:"all 0.25s",background:active===tab.id?tab.accent:"rgba(255,255,255,0.05)",color:active===tab.id?C.dark:"rgba(255,255,255,0.6)",border:active===tab.id?`1.5px solid ${tab.accent}`:"1.5px solid rgba(255,255,255,0.1)"}}>
            <span style={{fontSize:18}}>{tab.icon}</span>
            <div style={{textAlign:"left"}}>
              <div style={{fontWeight:700,lineHeight:1}}>{tab.label}</div>
              <div style={{fontSize:10,opacity:0.7,marginTop:2}}>{tab.sub}</div>
            </div>
            {tab.status==="commercial"&&<span style={{fontSize:9,fontWeight:700,background:"rgba(164,139,255,0.2)",color:"#A48BFF",borderRadius:8,padding:"2px 6px",marginLeft:4}}>💰</span>}
          </button>))}
        </div>

        {/* Active panel */}
        <div key={active}>
          <div className="two-col" style={{alignItems:"start",gap:48}}>
            {/* Left: story */}
            <div>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20,flexWrap:"wrap"}}>
                <div style={{display:"inline-flex",alignItems:"center",gap:8,background:`${p.accent}15`,border:`1px solid ${p.accent}40`,borderRadius:20,padding:"5px 14px"}}>
                  <span style={{color:p.accent,fontSize:12,fontWeight:600}}>{p.icon} {p.sub}</span>
                </div>
                {p.status==="commercial"&&<span style={{fontSize:11,fontWeight:700,background:"rgba(164,139,255,0.12)",color:"#A48BFF",border:"1px solid rgba(164,139,255,0.3)",borderRadius:20,padding:"4px 12px"}}>💰 {lang==="en"?"Commercial Product":"Produk Komersial"}</span>}
                {p.status==="development"&&<span style={{fontSize:11,fontWeight:700,background:`${C.gold}12`,color:C.gold,border:`1px solid ${C.gold}30`,borderRadius:20,padding:"4px 12px"}}>🚀 {lang==="en"?"In Development":"Dalam Pengembangan"}</span>}
              </div>
              <h3 className="display-font" style={{color:C.white,fontSize:"clamp(20px,2.5vw,32px)",lineHeight:1.25,marginBottom:20}}>{p.headline}</h3>
              {p.story.split("\n\n").map((para,i)=>(<p key={i} style={{color:"rgba(255,255,255,0.6)",fontSize:15,lineHeight:1.9,marginBottom:16}}>{para}</p>))}
              {/* Business model callout */}
              <div style={{background:`${p.accent}08`,border:`1px solid ${p.accent}20`,borderRadius:14,padding:"16px 20px",marginTop:8}}>
                <div style={{color:p.accent,fontWeight:700,fontSize:10,letterSpacing:1,marginBottom:6}}>{lang==="en"?"BUSINESS MODEL":"MODEL BISNIS"}</div>
                <div style={{color:C.white,fontSize:14,fontWeight:600}}>{p.businessModel}</div>
              </div>
              {/* Node deep-link (external product site or internal page) */}
              {(p as any).externalLink&&(
                (p as any).externalLink.startsWith("http")
                  ? <a href={(p as any).externalLink} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:8,marginTop:20,background:`${p.accent}12`,border:`1px solid ${p.accent}35`,borderRadius:12,padding:"12px 20px",textDecoration:"none",color:p.accent,fontSize:14,fontWeight:700,transition:"all 0.2s"}}>
                      {p.icon} {(p as any).linkLabel}
                    </a>
                  : <a href={(p as any).externalLink} style={{display:"inline-flex",alignItems:"center",gap:8,marginTop:20,background:`${p.accent}12`,border:`1px solid ${p.accent}35`,borderRadius:12,padding:"12px 20px",textDecoration:"none",color:p.accent,fontSize:14,fontWeight:700,transition:"all 0.2s"}}>
                      {p.icon} {(p as any).linkLabel}
                    </a>
              )}
            </div>
            {/* Right: GIF demo / animated chat / photo / features */}
            <div>
              {/* Animated WhatsApp chat (Kasih & Bidan) */}
              {(p as any).chatType&&(
                <div style={{marginBottom:24}}>
                  <AnimatedWhatsAppChat type={(p as any).chatType} accent={p.accent}/>
                </div>
              )}
              {/* GIF demo in browser frame (Kader + DoK tabs) */}
              {(p as any).gif&&!(p as any).chatType&&(
                <div style={{marginBottom:24,borderRadius:16,overflow:"hidden",border:`1px solid ${p.accent}30`,boxShadow:"0 16px 40px rgba(0,0,0,0.5)"}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,padding:"8px 12px",background:"rgba(255,255,255,0.04)",borderBottom:`1px solid ${p.accent}20`}}>
                    {["#FF5F56","#FFBD2E","#27C93F"].map(c=>(<span key={c} style={{width:8,height:8,borderRadius:"50%",background:c,display:"inline-block"}}/>))}
                    <span style={{marginLeft:6,color:"rgba(255,255,255,0.25)",fontSize:10,fontFamily:"monospace"}}>{p.id===3?"dok.sahaibat.com":"kader.sahaibat.com"}</span>
                    <span style={{marginLeft:"auto",background:`${p.accent}20`,color:p.accent,fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:10}}>● LIVE</span>
                  </div>
                  <img
                    src={(p as any).gif}
                    alt={`${p.label} live demo`}
                    onError={e=>{if(p.photo)(e.target as HTMLImageElement).src=p.photo!;}}
                    style={{width:"100%",display:"block",maxHeight:340,objectFit:"cover",objectPosition:"top"}}
                  />
                </div>
              )}
              {/* Static photo (non-GIF, non-chat tabs) */}
              {p.photo&&!(p as any).gif&&!(p as any).chatType&&(
                <div style={{marginBottom:24,borderRadius:16,overflow:"hidden",border:`1px solid ${p.accent}30`,boxShadow:"0 16px 40px rgba(0,0,0,0.4)"}}>
                  <img src={p.photo} alt={p.label} onError={e=>{if(p.photoFallback)(e.target as HTMLImageElement).src=p.photoFallback;}} style={{width:"100%",height:260,objectFit:"cover",display:"block"}}/>
                </div>
              )}
              <div style={{background:"rgba(255,255,255,0.04)",border:`1px solid ${p.accent}20`,borderRadius:16,padding:22}}>
                <div style={{color:p.accent,fontWeight:700,fontSize:11,letterSpacing:1,marginBottom:14}}>{lang==="en"?"KEY CAPABILITIES":"KEMAMPUAN UTAMA"}</div>
                {p.features.map((f,i)=>(<div key={i} style={{display:"flex",gap:12,marginBottom:10,alignItems:"flex-start"}}>
                  <div style={{width:6,height:6,borderRadius:"50%",background:p.accent,marginTop:7,flexShrink:0}}/>
                  <span style={{color:"rgba(255,255,255,0.7)",fontSize:13,lineHeight:1.6}}>{f}</span>
                </div>))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── DOK COMMERCIAL CALLOUT ─────────────────────────────────────────────────────
function DoKCallout({lang}:{lang:"en"|"id"}){
  return(
    <section style={{background:`linear-gradient(135deg,#0D0B1A,#1A0D2E)`,padding:"80px 0",borderTop:"1px solid rgba(164,139,255,0.15)",borderBottom:"1px solid rgba(164,139,255,0.15)"}}>
      <div className="section-max">
        <FadeIn>
          <div className="two-col" style={{alignItems:"center",gap:48}}>
            <div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(164,139,255,0.12)",border:"1px solid rgba(164,139,255,0.3)",borderRadius:20,padding:"6px 16px",marginBottom:20}}>
                <span style={{color:"#A48BFF",fontSize:12,fontWeight:600,letterSpacing:1}}>🩻 {lang==="en"?"THE CLINICAL NODE":"TITIK KLINIS"}</span>
              </div>
              <h2 className="display-font" style={{color:C.white,fontSize:"clamp(26px,3vw,40px)",lineHeight:1.2,marginBottom:20}}>
                {lang==="en"
                  ?<>Where the record becomes <span style={{color:"#A48BFF"}}>formal — and reaches SATUSEHAT.</span></>
                  :<>Di mana rekam menjadi <span style={{color:"#A48BFF"}}>resmi — dan mencapai SATUSEHAT.</span></>}
              </h2>
              <p style={{color:"rgba(255,255,255,0.55)",fontSize:15,lineHeight:1.8,marginBottom:28}}>
                {lang==="en"?"DoK is our dedicated commercial product — an AI clinical scribe and EMR built specifically for Indonesian doctors. Rp 120K/month. SATUSEHAT auto-sync. BPJS-aligned. Data 100% in Jakarta. Mission Partner pricing available for NGOs already in the SahAIbat network.":"DoK adalah produk komersial khusus kami — AI scribe klinis dan EMR yang dibangun khusus untuk dokter Indonesia. Rp 120K/bulan. SATUSEHAT otomatis. Selaras BPJS. Data 100% di Jakarta. Harga Mitra Misi tersedia untuk NGO yang sudah ada dalam jaringan SahAIbat."}
              </p>
              <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                <a href="https://www.sahaibatdok.com" target="_blank" rel="noopener noreferrer" style={{background:"#A48BFF",color:C.dark,padding:"13px 24px",borderRadius:12,fontSize:14,fontWeight:700,textDecoration:"none"}}>
                  {lang==="en"?"Visit sahaibatdok.com →":"Kunjungi sahaibatdok.com →"}
                </a>
                <a href="mailto:enterprise@sahaibat.com" style={{border:"1.5px solid rgba(164,139,255,0.4)",color:"#A48BFF",padding:"13px 24px",borderRadius:12,fontSize:14,fontWeight:600,textDecoration:"none"}}>
                  {lang==="en"?"Enterprise / NGO pricing":"Harga Enterprise / NGO"}
                </a>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              {[
                {v:"32 sec",l:lang==="en"?"avg SOAP generation":"rata-rata SOAP",c:"#A48BFF"},
                {v:"Rp 120K",l:lang==="en"?"/month per doctor":"/bulan per dokter",c:C.teal},
                {v:"144",l:lang==="en"?"BPJS conditions flagged":"kondisi BPJS ditandai",c:C.gold},
                {v:"100%",l:lang==="en"?"data stays in Indonesia":"data di Indonesia",c:C.pink},
              ].map(({v,l,c})=>(<div key={l} style={{background:"rgba(255,255,255,0.04)",border:`1px solid ${c}25`,borderRadius:14,padding:"20px 16px",textAlign:"center"}}>
                <div className="display-font" style={{color:c,fontSize:26,fontWeight:900,lineHeight:1,marginBottom:8}}>{v}</div>
                <div style={{color:"rgba(255,255,255,0.5)",fontSize:12,lineHeight:1.4}}>{l}</div>
              </div>))}
              <div style={{gridColumn:"1/-1",background:"rgba(164,139,255,0.06)",border:"1px solid rgba(164,139,255,0.2)",borderRadius:12,padding:"14px 16px",display:"flex",gap:10,alignItems:"center"}}>
                <img src="/nvidia-inception.png" alt="NVIDIA Inception" style={{height:36,width:"auto",objectFit:"contain",flexShrink:0,borderRadius:4}}/>
                <span style={{color:"rgba(255,255,255,0.5)",fontSize:12}}>{lang==="en"?"NVIDIA Inception · NIM · Llama 3.1 8B · MedGemma · Triton · GPU credits":"NVIDIA Inception · NIM · Llama 3.1 8B · MedGemma · Triton · GPU credits"}</span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ── LIVE DASHBOARD ────────────────────────────────────────────────────────────
function DashboardSection({lang}:{lang:"en"|"id"}){
  const screens=[
    {src:"/images/dashboard/dashboard-analytics.png",fallback:"/images/art/dash-overview.jpeg",label:lang==="en"?"Kader Performance Scorecard":"Kartu Skor Kinerja Kader",sub:lang==="en"?"Individual Kader activity, completeness rates, SAM case tracking":"Aktivitas Kader individual, tingkat kelengkapan, pelacakan kasus SAM"},
    {src:"/images/dashboard/dashboard-outcomes.png",fallback:"/images/art/dash-ancquality.jpeg",label:lang==="en"?"SAM/MAM Outcomes Funnel":"Funnel Hasil SAM/MAM",sub:lang==="en"?"Detection → monitoring → recovery tracking per child":"Deteksi → pemantauan → pelacakan pemulihan per anak"},
    {src:"/images/dashboard/dashboard-surveillance.png",fallback:"/images/art/dash-anak.jpeg",label:lang==="en"?"Epidemic Surveillance (SKDR-compatible)":"Surveilans Epidemi (kompatibel SKDR)",sub:lang==="en"?"Communicable disease epidemic curve, alert thresholds, 4-week rolling trends":"Kurva epidemi penyakit menular, ambang peringatan, tren 4 minggu bergulir"},
    {src:"/images/dashboard/dashboard-midwife.png",fallback:"/images/art/dash-ibuhamil.jpeg",label:lang==="en"?"Bidan ANC Quality + Pregnancy Cohort":"Kualitas ANC Bidan + Kohort Kehamilan",sub:lang==="en"?"10T completeness by midwife, high-risk pregnancy list, ANC quality trend":"Kelengkapan 10T per bidan, daftar kehamilan berisiko tinggi, tren kualitas ANC"},
  ];
  return(
    <section id="dashboard" style={{background:C.cream,padding:"100px 0"}}>
      <div className="section-max">
        <FadeIn>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:`${C.tealDk}20`,border:`1px solid ${C.tealDk}40`,borderRadius:20,padding:"6px 16px",marginBottom:16}}>
            <span style={{color:C.tealDk,fontSize:12,fontWeight:600,letterSpacing:1}}>{lang==="en"?"LIVE PRODUCTION DATA":"DATA PRODUKSI AKTIF"}</span>
          </div>
          <h2 className="display-font" style={{fontSize:"clamp(30px,4vw,50px)",color:C.dark,lineHeight:1.2,marginBottom:16,maxWidth:700}}>
            {lang==="en"?"This is live. This is NTT. This is today.":"Ini aktif. Ini NTT. Ini hari ini."}
          </h2>
          <p style={{color:C.muted,fontSize:16,maxWidth:620,lineHeight:1.8,marginBottom:16}}>
            {lang==="en"?"These are not mockups. This is production software running in North Central Timor since 2025, tracking real children, real Kaders, real midwives — and generating the kind of public health intelligence that government officials currently produce manually in quarterly Excel reports.":"Ini bukan mockup. Ini adalah perangkat lunak produksi yang berjalan di Timor Tengah Utara sejak 2025, melacak anak-anak nyata, Kader nyata, bidan nyata."}
          </p>
          {/* Live metrics strip */}
          <div style={{display:"flex",gap:16,flexWrap:"wrap",marginBottom:48}}>
            {[
              {n:"320",l:lang==="en"?"Registered Children":"Anak Terdaftar",c:C.teal},
              {n:"376",l:lang==="en"?"Growth Visits":"Kunjungan Tumbuh",c:C.teal},
              {n:"106",l:"SAM/MAM Flagged",c:"#FF6B6B"},
              {n:"318",l:lang==="en"?"Disease Cases Tracked":"Kasus Penyakit Dilacak",c:C.gold},
              {n:"8.7/10",l:lang==="en"?"Avg ANC Quality Score":"Skor Kualitas ANC Rata-rata",c:C.purple},
              {n:"4",l:lang==="en"?"Active Midwives":"Bidan Aktif",c:C.pink},
            ].map(({n,l,c})=>(<div key={l} style={{background:C.dark,borderRadius:12,padding:"12px 20px",textAlign:"center",flex:"0 0 auto"}}>
              <div className="display-font" style={{color:c,fontSize:24,fontWeight:900,lineHeight:1}}>{n}</div>
              <div style={{color:"rgba(255,255,255,0.45)",fontSize:11,marginTop:4,maxWidth:120}}>{l}</div>
            </div>))}
          </div>
        </FadeIn>

        {/* Screenshot grid */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
          {screens.map(({src,fallback,label,sub},i)=>(<FadeIn key={label} delay={i*80}>
            <div style={{background:C.dark,borderRadius:16,overflow:"hidden",border:"1px solid rgba(2,195,154,0.15)",boxShadow:"0 8px 32px rgba(0,0,0,0.3)"}}>
              <div style={{display:"flex",alignItems:"center",gap:6,padding:"8px 12px",background:"rgba(255,255,255,0.03)",borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
                {["#FF5F56","#FFBD2E","#27C93F"].map(c=>(<span key={c} style={{width:8,height:8,borderRadius:"50%",background:c,display:"inline-block"}}/>))}
                <span style={{marginLeft:6,color:"rgba(255,255,255,0.25)",fontSize:10,fontFamily:"monospace"}}>dashboard.sahaibat.com</span>
              </div>
              <img src={src} alt={label} onError={e=>{(e.target as HTMLImageElement).src=fallback;}} style={{width:"100%",height:220,objectFit:"cover",objectPosition:"top",display:"block"}}/>
              <div style={{padding:"14px 16px"}}>
                <div style={{color:C.teal,fontWeight:700,fontSize:13,marginBottom:4}}>{label}</div>
                <div style={{color:"rgba(255,255,255,0.4)",fontSize:11,lineHeight:1.5}}>{sub}</div>
              </div>
            </div>
          </FadeIn>))}
        </div>

        <FadeIn delay={200}>
          <div style={{marginTop:32,background:C.dark,borderRadius:16,padding:"24px 28px",display:"flex",gap:20,alignItems:"center",flexWrap:"wrap",border:"1px solid rgba(2,195,154,0.15)"}}>
            <div style={{fontSize:36}}>🏛️</div>
            <div style={{flex:1,minWidth:240}}>
              <div style={{color:C.teal,fontWeight:700,fontSize:12,marginBottom:6}}>{lang==="en"?"SKDR-COMPATIBLE EPIDEMIC SURVEILLANCE":"SURVEILANS EPIDEMI KOMPATIBEL SKDR"}</div>
              <p style={{color:"rgba(255,255,255,0.55)",fontSize:14,lineHeight:1.7}}>
                {lang==="en"?"The SahAIbat epidemic curve is compatible with Indonesia's national disease surveillance system (SKDR). When fully deployed, this means community-level disease data flows automatically into national surveillance — a capability that currently requires dedicated epidemiology teams and weeks of manual data entry.":"Kurva epidemi SahAIbat kompatibel dengan sistem surveilans penyakit nasional Indonesia (SKDR). Ketika digunakan sepenuhnya, data penyakit tingkat komunitas mengalir otomatis ke surveilans nasional."}
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ── TRACTION ──────────────────────────────────────────────────────────────────
function TractionSection({lang}:{lang:"en"|"id"}){
  const metrics=[
    {n:320,s:"",label:lang==="en"?"Children in monitoring":"Anak dalam pemantauan",sub:lang==="en"?"WHO growth tracking, live":"Pelacakan pertumbuhan WHO, aktif",color:C.teal},
    {n:376,s:"",label:lang==="en"?"Posyandu growth visits":"Kunjungan tumbuh Posyandu",sub:lang==="en"?"Weight & height recorded digitally":"Berat & tinggi tercatat digital",color:C.teal},
    {n:106,s:"",label:"SAM / MAM Flagged",sub:lang==="en"?"Malnutrition cases detected and monitored":"Kasus malnutrisi terdeteksi dan dipantau",color:"#FF6B6B"},
    {n:318,s:"",label:lang==="en"?"Communicable disease cases":"Kasus penyakit menular",sub:lang==="en"?"SKDR-compatible epidemic tracking":"Pelacakan epidemi kompatibel SKDR",color:C.gold},
    {n:3,s:"+",label:lang==="en"?"Active NGO partners":"Mitra NGO aktif",sub:"Pijar Timur · PAPHA · Perdhaki",color:C.blue},
    {n:4,s:"",label:lang==="en"?"Active midwives":"Bidan aktif",sub:lang==="en"?"8.7/10 avg ANC quality score":"Skor kualitas ANC rata-rata 8,7/10",color:C.purple},
  ];
  const credentials=[
    {icon:"🎓",title:"NVIDIA Inception",sub:lang==="en"?"Member — NIM, GPU credits, Triton":"Anggota — NIM, kredit GPU, Triton"},
    {icon:"🏛️",title:"PSE Kominfo",sub:lang==="en"?"Registered · NIB 1202260248509":"Terdaftar · NIB 1202260248509"},
    {icon:"🚀",title:lang==="en"?"Google for Startups SEA":"Google for Startups SEA",sub:lang==="en"?"Application submitted June 2026":"Aplikasi diajukan Juni 2026"},
    {icon:"🇮🇩",title:lang==="en"?"PSE Asing Indonesia":"PSE Asing Indonesia",sub:lang==="en"?"Foreign electronic system operator":"Operator sistem elektronik asing"},
  ];
  return(
    <section style={{background:C.cream,padding:"100px 0"}}>
      <div className="section-max">
        <FadeIn>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:`${C.tealDk}20`,border:`1px solid ${C.tealDk}40`,borderRadius:20,padding:"6px 16px",marginBottom:16}}>
            <span style={{color:C.tealDk,fontSize:12,fontWeight:600,letterSpacing:1}}>{lang==="en"?"IN THE FIELD NOW":"DI LAPANGAN SEKARANG"}</span>
          </div>
          <h2 className="display-font" style={{fontSize:"clamp(30px,4vw,48px)",color:C.dark,lineHeight:1.2,marginBottom:16,maxWidth:600}}>
            {lang==="en"?"Live in the field. Real data. Today.":"Aktif di lapangan. Data nyata. Hari ini."}
          </h2>
          <p style={{color:C.muted,fontSize:16,maxWidth:540,lineHeight:1.8,marginBottom:48}}>
            {lang==="en"?"These aren't mockups or projected impact. These are production dashboards with real names, real children, and real clinical decisions made in North Central Timor.":"Ini bukan mockup atau dampak proyeksi. Ini adalah dasbor produksi dengan nama nyata, anak-anak nyata, dan keputusan klinis nyata yang dibuat di Timor Tengah Utara."}
          </p>
        </FadeIn>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:20,marginBottom:48}}>
          {metrics.map(({n,s,label,sub,color},i)=>(<FadeIn key={label} delay={i*60}>
            <div style={{background:C.white,borderRadius:16,padding:24,border:`1px solid ${color}20`,position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${color},transparent)`}}/>
              <div className="display-font" style={{fontSize:42,color,fontWeight:900,lineHeight:1,marginBottom:8}}><Counter end={n} suffix={s}/></div>
              <div style={{color:C.dark,fontWeight:700,fontSize:14,marginBottom:6}}>{label}</div>
              <div style={{color:C.muted,fontSize:12}}>{sub}</div>
            </div>
          </FadeIn>))}
        </div>

        <FadeIn delay={200}>
          <div style={{background:C.dark,borderRadius:20,padding:"32px 36px"}}>
            <div style={{color:C.teal,fontWeight:700,fontSize:11,letterSpacing:1,marginBottom:20}}>{lang==="en"?"CREDENTIALS & RECOGNITIONS":"KREDENSIAL & PENGAKUAN"}</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:16}}>
              {credentials.map(({icon,title,sub})=>(<div key={title} style={{display:"flex",gap:12,alignItems:"center"}}>
                <span style={{fontSize:24,flexShrink:0}}>{icon}</span>
                <div><div style={{color:C.white,fontWeight:700,fontSize:14}}>{title}</div><div style={{color:"rgba(255,255,255,0.4)",fontSize:12,marginTop:2}}>{sub}</div></div>
              </div>))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ── ILP / GOVERNMENT SIGNAL ───────────────────────────────────────────────────
function ILPSection({lang}:{lang:"en"|"id"}){
  return(
    <section style={{background:C.cream,padding:"80px 0"}}>
      <div className="section-max">
        <FadeIn>
          <div style={{background:C.dark,borderRadius:24,padding:"48px 40px",display:"flex",gap:32,alignItems:"center",flexWrap:"wrap"}}>
            <div style={{fontSize:56}}>🇮🇩</div>
            <div style={{flex:1,minWidth:280}}>
              <div style={{color:C.teal,fontWeight:700,fontSize:11,letterSpacing:1,marginBottom:12}}>{lang==="en"?"BUILT ON INDONESIA'S NATIONAL FRAMEWORK · ILP-ALIGNED":"DIBANGUN DI ATAS KERANGKA NASIONAL INDONESIA · SELARAS ILP"}</div>
              <h3 style={{color:C.white,fontSize:"clamp(20px,2.5vw,30px)",fontWeight:700,marginBottom:16,lineHeight:1.3}}>
                {lang==="en"?"Kader is built into every Posyandu, from day one.":"Kader terpasang di setiap Posyandu, sejak hari pertama."}
              </h3>
              <p style={{color:"rgba(255,255,255,0.55)",fontSize:15,lineHeight:1.8,marginBottom:20}}>
                {lang==="en"?"Indonesia's ILP mandate asks 1.4 million Kaders to deliver life-cycle health screening and report it digitally — on tools they don't have. SahAIbat is built to be that tool. ILP-aligned modules. SKDR-compatible surveillance. WHO growth standards. Zero additional hardware.\n\nEvery visit a Kader records here becomes part of one longitudinal record — not a form that ends in a drawer.":"Mandat ILP Indonesia meminta 1,4 juta Kader untuk melakukan skrining kesehatan siklus hidup dan melaporkannya secara digital — dengan alat yang tidak mereka miliki. SahAIbat dibangun untuk menjadi alat itu. Modul selaras ILP. Surveilans kompatibel SKDR. Standar pertumbuhan WHO. Nol perangkat keras tambahan.\n\nSetiap kunjungan yang dicatat Kader di sini menjadi bagian dari satu rekam longitudinal — bukan formulir yang berakhir di laci."}
              </p>
              <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                {["ILP Life-cycle Modules","SKDR Surveillance","WHO Growth 2006","Permenkes 2/2020"].map(t=>(<span key={t} style={{background:"rgba(2,195,154,0.1)",border:"1px solid rgba(2,195,154,0.25)",color:C.teal,fontSize:11,fontWeight:600,padding:"5px 12px",borderRadius:20}}>{t}</span>))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ── STORY / MISSION ───────────────────────────────────────────────────────────
function StorySection({lang}:{lang:"en"|"id"}){
  return(
    <section id="story" style={{background:C.dark,padding:"80px 0"}}>
      <div className="section-max">
        <div className="two-col" style={{alignItems:"center",gap:56}}>
          <FadeIn>
            <div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(2,195,154,0.1)",border:"1px solid rgba(2,195,154,0.3)",borderRadius:20,padding:"6px 16px",marginBottom:16}}>
                <span style={{color:C.teal,fontSize:12,fontWeight:600,letterSpacing:1}}>{lang==="en"?"WHY WE EXIST":"MENGAPA KAMI ADA"}</span>
              </div>
              <h2 className="display-font" style={{color:C.white,fontSize:"clamp(28px,3.5vw,44px)",lineHeight:1.2,marginBottom:20}}>
                {lang==="en"?"A Kader. A phone. A life that shouldn't have been lost.":"Seorang Kader. Sebuah ponsel. Sebuah nyawa yang tak seharusnya hilang."}
              </h2>
              <p style={{color:"rgba(255,255,255,0.6)",fontSize:15,lineHeight:1.9,marginBottom:16}}>
                {lang==="en"?"In the villages of East Nusa Tenggara, a community health worker called a Kader visits families on foot. She carries a KMS book, a pen, and a weighing scale. She knows every family by name. But when a pregnant mother shows signs of preeclampsia at 2am — she has no way to know what to do next, and no doctor within hours.":"Di desa-desa Nusa Tenggara Timur, seorang Kader mengunjungi keluarga dengan berjalan kaki. Ia membawa buku KMS, pena, dan timbangan. Namun saat seorang ibu hamil menunjukkan tanda preeklampsia jam 2 pagi — ia tidak tahu harus berbuat apa."}
              </p>
              <p style={{color:"rgba(255,255,255,0.6)",fontSize:15,lineHeight:1.9,marginBottom:24}}>
                {lang==="en"?"Indonesia's 1.4 million Kaders are one of the most remarkable public health forces in the world. They show up — every day, in every village, in every condition — driven entirely by care for their community. SahAIbat exists to give that dedication the tools it deserves.":"1,4 juta Kader Indonesia adalah salah satu kekuatan kesehatan masyarakat paling luar biasa di dunia. SahAIbat hadir untuk memberi dedikasi itu alat yang layak."}
              </p>
              <p style={{color:C.teal,fontWeight:700,fontSize:18,fontFamily:"'Playfair Display',serif"}}>{lang==="en"?"SahAIbat was built for her.":"SahAIbat dibangun untuk mereka."}</p>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <div style={{display:"grid",gap:14}}>
              <img src="/images/field/kader-training.jpeg" alt="Kader training session NTT" onError={e=>{(e.target as HTMLImageElement).src="/images/doctor-nurse.png";}} style={{width:"100%",height:200,objectFit:"cover",borderRadius:16,border:"1px solid rgba(2,195,154,0.2)"}}/>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                <img src="/images/field/kader-paperwork.jpeg" alt="Kader with paper records" onError={e=>{(e.target as HTMLImageElement).src="/images/hero-kader-family.png";}} style={{width:"100%",height:160,objectFit:"cover",borderRadius:12,border:"1px solid rgba(255,255,255,0.08)"}}/>
                <img src="/images/field/kader-smile.jpeg" alt="Kader using SahAIbat" onError={e=>{(e.target as HTMLImageElement).src="/images/motherchild.png";}} style={{width:"100%",height:160,objectFit:"cover",borderRadius:12,border:"1px solid rgba(2,195,154,0.2)"}}/>
              </div>
              <div style={{background:"rgba(2,195,154,0.06)",border:"1px solid rgba(2,195,154,0.15)",borderRadius:12,padding:"12px 16px",textAlign:"center"}}>
                <span style={{color:"rgba(255,255,255,0.4)",fontSize:11}}>🌿 {lang==="en"?"Field photos — North Central Timor, NTT, Indonesia · 2025–2026":"Foto lapangan — Timor Tengah Utara, NTT, Indonesia · 2025–2026"}</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ── FIELD PARTNERS ─────────────────────────────────────────────────────────────
function FieldPartnersSection({lang}:{lang:"en"|"id"}){
  const partners=[
    {name:"Yayasan Pijar Timur",region:lang==="en"?"Kefamenanu, North Central Timor, NTT":"Kefamenanu, Timor Tengah Utara, NTT",color:C.teal,focus:lang==="en"?"Child Stunting · Posyandu":"Stunting Anak · Posyandu",story:lang==="en"?"In the highland villages of North Central Timor, Pijar Timur has been doing the community education and nutritional monitoring work that saves children's lives. SahAIbat Kader App runs live with their Kader network — 320 children monitored, 376 growth visits recorded, 106 SAM/MAM cases tracked.":"Di desa-desa dataran tinggi Timor Tengah Utara, Pijar Timur melakukan pendidikan komunitas dan pemantauan gizi. Aplikasi Kader SahAIbat berjalan aktif dengan jaringan Kader mereka — 320 anak dipantau, 376 kunjungan pertumbuhan tercatat.",tags:lang==="en"?["Live Deployment","NTT","WHO Growth","SAM/MAM Tracking"]:["Deployment Aktif","NTT","Pertumbuhan WHO","Pelacakan SAM/MAM"]},
    {name:"PAPHA",region:lang==="en"?"East Nusa Tenggara":"Nusa Tenggara Timur",color:C.gold,focus:lang==="en"?"Child Stunting · Community Advocacy":"Stunting Anak · Advokasi Komunitas",story:lang==="en"?"PAPHA works at the intersection of community advocacy and direct health service in a province where stunting rates in some districts exceed 40%. SahAIbat supports their Kader network with automated WHO growth indicator calculation — removing manual chart-reading burden and catching cases that would otherwise fall through.":"PAPHA bekerja di persimpangan advokasi komunitas dan layanan kesehatan langsung di provinsi di mana angka stunting melebihi 40%. SahAIbat mendukung jaringan Kader mereka dengan kalkulasi indikator pertumbuhan WHO otomatis.",tags:lang==="en"?["NTT","WHO Growth","Community Health","Stunting"]:["NTT","Pertumbuhan WHO","Kesehatan Komunitas","Stunting"]},
    {name:"PERDHAKI",region:lang==="en"?"Indonesia-wide · Eastern Indonesia focus":"Seluruh Indonesia · Fokus Indonesia Timur",color:C.purple,focus:lang==="en"?"Maternal Health · Malaria · Catholic health network since 1971":"Kesehatan Ibu · Malaria · Jaringan kesehatan Katolik sejak 1971",story:lang==="en"?"Since 1971, PERDHAKI has built healthcare systems in communities formal government infrastructure hasn't reached — with strength in Maluku, NTT, and Papua. Their network of licensed physicians and community health workers spans the country. SahAIbat is partnering with PERDHAKI to deploy Kasih for maternal education and structured malaria screening protocols.":"Sejak 1971, PERDHAKI membangun sistem kesehatan di komunitas yang belum sepenuhnya dijangkau pemerintah — dengan kekuatan di Maluku, NTT, dan Papua. SahAIbat bermitra dengan PERDHAKI untuk menyebarkan Kasih dan protokol skrining malaria.",tags:lang==="en"?["Since 1971","National Network","Malaria","Maternal & Child"]:["Sejak 1971","Jaringan Nasional","Malaria","Ibu & Anak"]},
  ];
  return(
    <section id="partners" style={{background:C.cream,padding:"100px 0"}}>
      <div className="section-max">
        <FadeIn>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:`${C.tealDk}20`,border:`1px solid ${C.tealDk}40`,borderRadius:20,padding:"6px 16px",marginBottom:16}}>
            <span style={{color:C.tealDk,fontSize:12,fontWeight:600,letterSpacing:1}}>{lang==="en"?"FIELD PARTNERS":"MITRA LAPANGAN"}</span>
          </div>
          <h2 className="display-font" style={{fontSize:"clamp(30px,4vw,48px)",color:C.dark,lineHeight:1.2,marginBottom:16}}>
            {lang==="en"?"On the ground. Together.":"Di lapangan. Bersama."}
          </h2>
          <p style={{color:C.muted,fontSize:16,maxWidth:560,lineHeight:1.8,marginBottom:56}}>
            {lang==="en"?"SahAIbat doesn't deploy technology into communities — we build it with them. Our partners bring the relationships, trust, and terrain knowledge that no algorithm can replace.":"SahAIbat tidak sekadar menerapkan teknologi ke komunitas — kami membangunnya bersama mereka."}
          </p>
        </FadeIn>
        <div style={{display:"grid",gap:24}}>
          {partners.map(({name,region,color,focus,story,tags},i)=>(<FadeIn key={name} delay={i*100}>
            <div style={{background:C.white,border:`1px solid ${color}20`,borderRadius:20,padding:32,position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${color},transparent)`}}/>
              <div className="two-col" style={{alignItems:"start",gap:32}}>
                <div>
                  <div style={{color,fontWeight:700,fontSize:11,letterSpacing:1,marginBottom:8}}>{focus}</div>
                  <h3 style={{color:C.dark,fontWeight:800,fontSize:20,marginBottom:4}}>{name}</h3>
                  <div style={{color:C.muted,fontSize:12,marginBottom:16}}>{region}</div>
                  <p style={{color:C.muted,fontSize:14,lineHeight:1.8,marginBottom:16}}>{story}</p>
                  <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                    {tags.map(t=>(<Tag key={t} label={t} color={color}/>))}
                  </div>
                </div>
                <div style={{background:`${color}08`,border:`1px solid ${color}20`,borderRadius:14,padding:20,minWidth:180}}>
                  <div style={{color,fontWeight:700,fontSize:11,letterSpacing:1,marginBottom:12}}>{lang==="en"?"ACTIVE MODULES":"MODUL AKTIF"}</div>
                  {(i===0?["Kader App — live","Bidan Module","Dashboard analytics"]:i===1?["Kader App — live","WHO growth screening","Posyandu support"]:["Kasih — family health","Malaria screening","Maternal education"]).map(m=>(<div key={m} style={{display:"flex",gap:8,marginBottom:10,alignItems:"center"}}>
                    <div style={{width:6,height:6,borderRadius:"50%",background:color,flexShrink:0}}/>
                    <span style={{color:C.text,fontSize:13}}>{m}</span>
                  </div>))}
                  <a href="mailto:admin@sahaibat.com?subject=Partnership Inquiry" style={{display:"block",marginTop:16,color:color,fontSize:12,fontWeight:600,textDecoration:"none"}}>{lang==="en"?"Learn more →":"Pelajari lebih →"}</a>
                </div>
              </div>
            </div>
          </FadeIn>))}
        </div>
      </div>
    </section>
  );
}

// ── TEAM ───────────────────────────────────────────────────────────────────────
function TeamSection({lang}:{lang:"en"|"id"}){
  const members=[
    {name:"Sanjib Maity",flag:"🇨🇦",role:lang==="en"?"Founder, CEO & CTO":"Pendiri, CEO & CTO",loc:lang==="en"?"Canada":"Kanada",photo:"/images/sanjib.jpeg",color:C.teal,dark:true,passion:lang==="en"?"15+ years in enterprise IT and application development. Designed and built the full SahAIbat platform — architecture, clinical engine, and every node — and led the company from concept to live field deployment in NTT in under 18 months.":"15+ tahun di bidang IT enterprise dan pengembangan aplikasi. Merancang dan membangun seluruh platform SahAIbat — arsitektur, mesin klinis, dan setiap titik — serta memimpin perusahaan dari konsep hingga deployment lapangan aktif di NTT dalam waktu kurang dari 18 bulan.",tags:["15+ Yrs Enterprise IT","Technical Founder","NTT Field Deployment","NVIDIA Inception"]},
    {name:"Dr. Ratih Rakhmawati, M.Biomed",flag:"🇮🇩",role:lang==="en"?"Clinical Validation Lead":"Pemimpin Validasi Klinis",loc:"Indonesia",photo:"/images/Rathi.jpg",color:C.pink,dark:false,passion:lang==="en"?"20+ years strengthening health systems across Indonesia — leading digital training programmes validated against Kemenkes and WHO standards. Leads clinical validation for every module before it reaches the field.":"20+ tahun memperkuat sistem kesehatan di seluruh Indonesia — memimpin program pelatihan digital yang tervalidasi sesuai standar Kemenkes dan WHO. Memimpin validasi klinis untuk setiap modul sebelum digunakan di lapangan.",tags:["20+ Yrs MCH","Kemenkes · WHO","Digital Health","M.Biomed"]},
    {name:"Stefanus Bere",flag:"🇮🇩",role:lang==="en"?"Programme Manager, Rural Deployment":"Manajer Program, Penerapan Pedesaan",loc:"East Nusa Tenggara",photo:"/images/Stefan.png",color:C.gold,dark:false,passion:lang==="en"?"Nearly 20 years building health systems in NTT and Timor-Leste with USAID, ADB, MoH, and the UN. The field fluency that no dataset replaces. His relationships in NTT are the reason Pijar Timur and PAPHA trusted us enough to put SahAIbat in Kaders' hands.":"Hampir 20 tahun membangun sistem kesehatan di NTT dan Timor-Leste bersama USAID, ADB, Kemenkes, dan PBB.",tags:["USAID · ADB · UN","NTT & Timor-Leste","Health Systems","UQ Alumni"]},
    {name:"Surabhi Das",flag:"🇨🇦",role:lang==="en"?"Healthcare Research & Strategy":"Penelitian Kesehatan & Strategi",loc:lang==="en"?"Canada":"Kanada",photo:null,color:C.purple,dark:false,passion:lang==="en"?"B.PT, MBA, alumni of Deloitte and Egon Zehnder. Combines clinical grounding with strategic rigour across programme research and evidence design.":"B.PT, MBA, alumni Deloitte dan Egon Zehnder. Memadukan landasan klinis dengan ketelitian strategis dalam riset program dan desain bukti.",tags:["B.PT · MBA","ex-Deloitte","ex-Egon Zehnder","Health Research"]},
    {name:"Risti Riana",flag:"🇮🇩",role:lang==="en"?"Content & Community":"Konten & Komunitas",loc:"West Java, Indonesia",photo:null,color:C.teal,dark:false,passion:lang==="en"?"Builds communities that move people — wellness spaces, KOL partnerships, health education programmes. The reason people find SahAIbat, trust it, and stay.":"Membangun komunitas yang menggerakkan orang. Alasan orang menemukan SahAIbat, mempercayainya, dan tetap bersamanya.",tags:["Content Creation","Community Building","KOL Partnerships","Growth"]},
    {name:"Saurav Das",flag:"🇮🇳",role:lang==="en"?"UI Engineer":"UI Engineer",loc:"India",photo:null,color:C.blue,dark:false,passion:lang==="en"?"5+ years building frontend interfaces designed for 2G connections and entry-level phones. The constraint that most UI engineers never think about is SahAIbat's core design brief.":"5+ tahun membangun antarmuka frontend untuk koneksi 2G dan ponsel kelas bawah.",tags:["5+ Yrs Frontend","Low-end Optimisation","React","Accessibility"]},
  ];
  return(
    <section id="team" style={{background:C.dark,padding:"100px 0"}}>
      <div className="section-max">
        <FadeIn>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(2,195,154,0.1)",border:"1px solid rgba(2,195,154,0.3)",borderRadius:20,padding:"6px 16px",marginBottom:16}}>
            <span style={{color:C.teal,fontSize:12,fontWeight:600,letterSpacing:1}}>{lang==="en"?"THE TEAM":"TIM KAMI"}</span>
          </div>
          <h2 className="display-font" style={{fontSize:"clamp(30px,4vw,48px)",color:C.white,lineHeight:1.2,marginBottom:16}}>
            {lang==="en"?"People who refused to accept the status quo.":"Orang-orang yang menolak menerima status quo."}
          </h2>
          <p style={{color:"rgba(255,255,255,0.5)",fontSize:16,maxWidth:560,lineHeight:1.8,marginBottom:56}}>
            {lang==="en"?"Clinicians, field workers, technologists, and strategists — united by one belief: the communities carrying the highest health burden deserve world-class tools.":"Dokter, pekerja lapangan, teknolog, dan ahli strategi — bersatu dalam satu keyakinan."}
          </p>
        </FadeIn>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:20,marginBottom:32}}>
          {members.map((m,i)=>(<FadeIn key={m.name} delay={i*80}>
            <div style={{background:m.dark?"rgba(2,195,154,0.05)":"rgba(255,255,255,0.03)",border:`1px solid ${m.color}20`,borderRadius:20,padding:28,position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${m.color},transparent)`}}/>
              <div style={{display:"flex",gap:16,alignItems:"flex-start",marginBottom:16}}>
                {m.photo
                  ?<img src={m.photo} alt={m.name} style={{width:64,height:64,borderRadius:14,objectFit:"cover",flexShrink:0,border:`2px solid ${m.color}30`}}/>
                  :<div style={{width:64,height:64,borderRadius:14,background:`${m.color}15`,border:`1px solid ${m.color}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0,color:m.color}}>{m.name[0]}</div>}
                <div>
                  <div style={{color:C.white,fontWeight:800,fontSize:16,marginBottom:4}}>{m.name} {m.flag}</div>
                  <div style={{color:m.color,fontWeight:600,fontSize:12}}>{m.role}</div>
                  <div style={{color:"rgba(255,255,255,0.35)",fontSize:11,marginTop:3}}>{m.loc}</div>
                </div>
              </div>
              <p style={{color:"rgba(255,255,255,0.55)",fontSize:13,lineHeight:1.8,marginBottom:16,fontStyle:"italic"}}>"{m.passion}"</p>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{m.tags.map(t=>(<Tag key={t} label={t} color={m.color}/>))}</div>
            </div>
          </FadeIn>))}
        </div>
      </div>
    </section>
  );
}

// ── PARTNER WITH US ───────────────────────────────────────────────────────────
function PartnerSection({lang}:{lang:"en"|"id"}){
  return(
    <section id="support" style={{background:C.dark,padding:"100px 0",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",width:600,height:600,background:C.teal,bottom:"-20%",right:"-10%",borderRadius:"50%",filter:"blur(120px)",opacity:0.08,pointerEvents:"none"}}/>
      <div className="section-max" style={{position:"relative",zIndex:1}}>
        <FadeIn>
          <div style={{textAlign:"center",marginBottom:56}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(2,195,154,0.1)",border:"1px solid rgba(2,195,154,0.3)",borderRadius:20,padding:"6px 16px",marginBottom:16}}>
              <span style={{color:C.teal,fontSize:12,fontWeight:600,letterSpacing:1}}>{lang==="en"?"WORK WITH US":"BEKERJA DENGAN KAMI"}</span>
            </div>
            <h2 className="display-font" style={{fontSize:"clamp(30px,4vw,48px)",color:C.white,lineHeight:1.2,marginBottom:16}}>
              {lang==="en"?<>Bring SahAIbat to<br/><span style={{color:C.teal}}>your community or clinic.</span></>:<>Bawa SahAIbat ke<br/><span style={{color:C.teal}}>komunitas atau klinik Anda.</span></>}
            </h2>
          </div>
        </FadeIn>
        <div className="three-col" style={{marginBottom:40}}>
          {[
            {icon:"🚀",title:lang==="en"?"Run a Pilot":"Jalankan Pilot",sub:lang==="en"?"NGO / Health Programme":"NGO / Program Kesehatan",desc:lang==="en"?"Deploy SahAIbat Kader App and Bidan Module with your community health workers across one or more districts. We handle setup, training, and clinical alignment.":"Terapkan Aplikasi Kader dan Modul Bidan SahAIbat dengan petugas kesehatan komunitas Anda di satu atau lebih kabupaten.",href:"mailto:admin@sahaibat.com?subject=Pilot Request",cta:lang==="en"?"Request a Pilot":"Ajukan Pilot",color:C.teal,featured:true},
            {icon:"🩻",title:lang==="en"?"DoK for Your Clinic":"DoK untuk Klinik Anda",sub:lang==="en"?"Doctors & Clinic Owners":"Dokter & Pemilik Klinik",desc:lang==="en"?"90-day trial of SahAIbat DoK — AI clinical scribe, SATUSEHAT auto-sync, BPJS-aligned. Mission Partner pricing for NGO-affiliated clinics.":"Uji coba 90 hari SahAIbat DoK. Harga Mitra Misi untuk klinik NGO.",href:"https://www.sahaibatdok.com",cta:lang==="en"?"Start 90-Day Trial":"Mulai Uji Coba 90 Hari",color:"#A48BFF",featured:false,external:true},
            {icon:"🏛️",title:lang==="en"?"Government & NGO Programmes":"Program Pemerintah & NGO",sub:lang==="en"?"Dinas Kesehatan · NGOs":"Dinas Kesehatan · NGO",desc:lang==="en"?"Deploy the Programme Dashboard across your districts — SKDR-compatible surveillance, SAM/MAM outcome tracking, Kader and Bidan performance scoring. Talk to us about your programme.":"Terapkan Dasbor Program di seluruh kabupaten Anda — surveilans kompatibel SKDR, pelacakan hasil SAM/MAM, skor kinerja Kader dan Bidan.",href:"mailto:admin@sahaibat.com?subject=Government%20%2F%20NGO%20Programme",cta:lang==="en"?"Talk to Us":"Hubungi Kami",color:C.gold,featured:false},
          ].map(({icon,title,sub,desc,href,cta,color,featured,external})=>(<FadeIn key={title} delay={100}>
            <div style={{background:featured?`linear-gradient(135deg,${C.tealXdk},${C.tealDk})`:"rgba(255,255,255,0.03)",border:`1.5px solid ${featured?C.teal:"rgba(255,255,255,0.08)"}`,borderRadius:20,padding:28,display:"flex",flexDirection:"column",height:"100%",transform:featured?"scale(1.02)":"none"}}>
              <div style={{fontSize:32,marginBottom:12}}>{icon}</div>
              <div style={{color,fontWeight:700,fontSize:12,marginBottom:4}}>{sub}</div>
              <div style={{color:C.white,fontWeight:800,fontSize:18,marginBottom:12}}>{title}</div>
              <p style={{color:"rgba(255,255,255,0.5)",fontSize:13,lineHeight:1.7,flex:1,marginBottom:20}}>{desc}</p>
              <a href={href} target={external?"_blank":"_self"} rel={external?"noopener noreferrer":undefined} style={{display:"block",textAlign:"center",padding:"12px 20px",borderRadius:12,background:featured?C.teal:"transparent",border:`1.5px solid ${featured?C.teal:color}`,color:featured?C.dark:color,fontWeight:700,fontSize:14,textDecoration:"none"}}>{cta} →</a>
            </div>
          </FadeIn>))}
        </div>
      </div>
    </section>
  );
}

// ── GROUND-LEVEL HEALTH IMPACT ────────────────────────────────────────────────
function GroundImpactSection({lang}:{lang:"en"|"id"}){
  const cycles=[
    {icon:"👶",title:lang==="en"?"Child Health · 0–60 months":"Kesehatan Anak · 0–60 bulan",color:C.teal,
      impact:lang==="en"?"WHO growth screening at every Posyandu visit. BB/U, TB/U, BB/TB auto-calculated. SAM and MAM cases flagged within seconds — catching the malnutrition that leads to stunting before it becomes irreversible.":"Skrining pertumbuhan WHO di setiap kunjungan Posyandu. BB/U, TB/U, BB/TB dihitung otomatis. Kasus SAM dan MAM terdeteksi dalam hitungan detik — menangkap malnutrisi yang menyebabkan stunting sebelum tidak dapat dipulihkan."},
    {icon:"🤱",title:lang==="en"?"Maternal · ANC, Postnatal & Neonatal":"Ibu · ANC, Nifas & Neonatal",color:C.pink,
      impact:lang==="en"?"Preeclampsia signs, postpartum haemorrhage, and neonatal danger signs flagged by Kaders — before they become emergencies. The Bidan receives a structured alert and can triage remotely. The referral is made with complete clinical context attached.":"Tanda preeklampsia, perdarahan postpartum, dan tanda bahaya neonatal dideteksi Kader — sebelum menjadi darurat. Bidan menerima peringatan terstruktur dan bisa melakukan triase jarak jauh."},
    {icon:"🧒",title:lang==="en"?"Adolescent · 6–18 years":"Remaja · 6–18 tahun",color:C.blue,
      impact:lang==="en"?"School-age and adolescent health screening often falls entirely outside formal health services in rural Indonesia. SahAIbat Kader closes that gap — nutritional status, developmental milestones, and health risk screening in the same Posyandu session.":"Skrining kesehatan remaja sering kali berada di luar layanan kesehatan formal di Indonesia pedesaan. SahAIbat Kader menutup kesenjangan itu — status gizi, tonggak perkembangan, dan skrining risiko kesehatan dalam satu sesi Posyandu."},
    {icon:"👴",title:lang==="en"?"Adult & Elderly · NCD Detection":"Dewasa & Lansia · Deteksi PTM",color:C.gold,
      impact:lang==="en"?"Hypertension, diabetes, and other non-communicable disease early detection at the community level — feeding directly into Puskesmas NCD registers and national health data metrics required by Kemenkes.":"Deteksi dini hipertensi, diabetes, dan penyakit tidak menular lainnya di tingkat komunitas — langsung masuk ke register PTM Puskesmas dan metrik data kesehatan nasional yang dibutuhkan Kemenkes."},
    {icon:"🦠",title:lang==="en"?"Communicable Disease · TB, Malaria, Dengue":"Penyakit Menular · TB, Malaria, Dengue",color:"#FF6B6B",
      impact:lang==="en"?"Symptom screening, contact tracing initiation, and epidemic surveillance in the same tool — generating an SKDR-compatible disease curve that health officials currently produce manually from quarterly reports.":"Skrining gejala, inisiasi pelacakan kontak, dan surveilans epidemi dalam satu alat — menghasilkan kurva penyakit kompatibel SKDR yang pejabat kesehatan saat ini buat secara manual dari laporan kuartalan."},
  ];
  return(
    <section style={{background:C.cream,padding:"100px 0"}}>
      <div className="section-max">
        <FadeIn>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:`${C.tealDk}20`,border:`1px solid ${C.tealDk}40`,borderRadius:20,padding:"6px 16px",marginBottom:16}}>
            <span style={{color:C.tealDk,fontSize:12,fontWeight:600,letterSpacing:1}}>{lang==="en"?"HOW IT SAVES LIVES AT GROUND LEVEL":"BAGAIMANA INI MENYELAMATKAN NYAWA DI LAPANGAN"}</span>
          </div>
          <h2 className="display-font" style={{fontSize:"clamp(30px,4vw,50px)",color:C.dark,lineHeight:1.2,marginBottom:16,maxWidth:760}}>
            {lang==="en"?"A Kader. A Bidan. A family on WhatsApp. Three tools that change what happens in the most critical moments.":"Seorang Kader. Seorang Bidan. Sebuah keluarga di WhatsApp. Tiga alat yang mengubah apa yang terjadi di saat-saat paling kritis."}
          </h2>
          <p style={{color:C.muted,fontSize:16,maxWidth:680,lineHeight:1.8,marginBottom:56}}>
            {lang==="en"?"Indonesia's community health challenges aren't caused by a lack of caring — they're caused by a lack of tools. When a Kader has SahAIbat, a child's declining growth is caught before stunting sets in. When a Bidan has SahAIbat, a high-risk pregnancy doesn't fall through the cracks between visits. When a family has Kasih, a mother at 2am knows whether to go to the emergency room. These aren't features. These are the difference between outcomes.":"Tantangan kesehatan komunitas Indonesia bukan karena kurangnya kepedulian — melainkan kurangnya alat. Ketika Kader memiliki SahAIbat, penurunan pertumbuhan anak terdeteksi sebelum stunting terjadi. Ketika Bidan memiliki SahAIbat, kehamilan berisiko tinggi tidak terlewatkan di antara kunjungan."}
          </p>
        </FadeIn>

        {/* 5 ILP Life Cycles */}
        <div style={{display:"grid",gap:16,marginBottom:56}}>
          {cycles.map(({icon,title,color,impact},i)=>(
            <FadeIn key={title} delay={i*60}>
              <div style={{background:C.white,border:`1px solid ${color}20`,borderRadius:16,padding:"24px 28px",display:"grid",gridTemplateColumns:"auto 1fr",gap:24,alignItems:"start",position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",left:0,top:0,bottom:0,width:4,background:color,borderRadius:"16px 0 0 16px"}}/>
                <div style={{width:52,height:52,borderRadius:14,background:`${color}12`,border:`1px solid ${color}25`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>{icon}</div>
                <div>
                  <div style={{color,fontWeight:700,fontSize:11,letterSpacing:1,marginBottom:6}}>{lang==="en"?"ILP LIFE CYCLE":"SIKLUS HIDUP ILP"}</div>
                  <div style={{color:C.dark,fontWeight:800,fontSize:16,marginBottom:10}}>{title}</div>
                  <p style={{color:C.muted,fontSize:14,lineHeight:1.7}}>{impact}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* How the three tools connect */}
        <FadeIn delay={100}>
          <div style={{background:C.dark,borderRadius:24,padding:"40px 36px"}}>
            <div style={{color:C.teal,fontWeight:700,fontSize:11,letterSpacing:1,marginBottom:24}}>{lang==="en"?"THE CONNECTED CARE CHAIN":"RANTAI PERAWATAN TERHUBUNG"}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr auto 1fr",gap:0,alignItems:"center",marginBottom:28}} className="care-chain">
              {[
                {icon:"👩🏽‍⚕️",name:"Kader App",color:C.teal,role:lang==="en"?"Screens. Flags. Records.":"Skrining. Deteksi. Catat."},
                {arrow:true},
                {icon:"🩺",name:"SahAIbat Bidan",color:C.purple,role:lang==="en"?"Supervises. Triages remotely.":"Mengawasi. Triase jarak jauh."},
                {arrow:true},
                {icon:"❤️‍🩹",name:"Kasih",color:C.pink,role:lang==="en"?"Supports families 24/7.":"Mendukung keluarga 24/7."},
              ].map((item,i)=>{
                if("arrow" in item) return <div key={i} style={{textAlign:"center",color:"rgba(255,255,255,0.2)",fontSize:24,padding:"0 8px"}}>→</div>;
                return(
                  <div key={i} style={{background:"rgba(255,255,255,0.04)",border:`1px solid ${item.color}25`,borderRadius:16,padding:"20px 16px",textAlign:"center"}}>
                    <div style={{fontSize:28,marginBottom:8}}>{item.icon}</div>
                    <div style={{color:item.color,fontWeight:700,fontSize:13,marginBottom:6}}>{item.name}</div>
                    <div style={{color:"rgba(255,255,255,0.4)",fontSize:12,lineHeight:1.4}}>{item.role}</div>
                  </div>
                );
              })}
            </div>
            <p style={{color:"rgba(255,255,255,0.5)",fontSize:14,lineHeight:1.8,maxWidth:700}}>
              {lang==="en"?"When all three work together, a danger sign detected by a Kader at a Posyandu triggers a Bidan alert, generates a structured referral, and automatically follows up with the family via Kasih — closing a loop that previously existed only on paper, if at all.":"Ketika ketiganya bekerja bersama, tanda bahaya yang terdeteksi Kader di Posyandu memicu peringatan Bidan, menghasilkan rujukan terstruktur, dan secara otomatis menindaklanjuti keluarga melalui Kasih — menutup loop yang sebelumnya hanya ada di atas kertas."}
            </p>
          </div>
        </FadeIn>
      </div>
      <style>{`.care-chain{display:grid;grid-template-columns:1fr auto 1fr auto 1fr}@media(max-width:700px){.care-chain{grid-template-columns:1fr!important;gap:12px!important}.care-chain>div[style*="fontSize:24"]{transform:rotate(90deg);padding:4px 0!important}}`}</style>
    </section>
  );
}

// ── NGO PARTNER SECTION ────────────────────────────────────────────────────────
function NGOPartnerSection({lang}:{lang:"en"|"id"}){
  const useCases=[
    {icon:"🌱",title:lang==="en"?"Child Stunting":"Stunting Anak",color:C.teal,
      desc:lang==="en"?"Deploy SahAIbat Kader across your Posyandu network. WHO growth auto-calculated at every visit. SAM/MAM cases flagged instantly. Monthly stunting trend reports — zero manual data entry.":"Terapkan SahAIbat Kader di jaringan Posyandu Anda. Pertumbuhan WHO dihitung otomatis di setiap kunjungan. Kasus SAM/MAM ditandai seketika. Laporan tren stunting bulanan — tanpa entri data manual.",
      gets:lang==="en"?["Kader — community screening node","Programme Dashboard","WHO-aligned growth reports","MoH Puskesmas data metrics"]:["Kader — titik skrining komunitas","Dasbor Program","Laporan pertumbuhan selaras WHO","Metrik data Puskesmas Kemenkes"]},
    {icon:"🤱",title:lang==="en"?"Maternal Health":"Kesehatan Ibu",color:C.pink,
      desc:lang==="en"?"Give your Bidans a structured ANC quality tool and your Kaders a maternal danger-sign protocol. High-risk pregnancies surface automatically. Referrals are tracked from flag to facility.":"Beri Bidan Anda alat kualitas ANC terstruktur dan Kader Anda protokol tanda bahaya maternal. Kehamilan berisiko tinggi terdeteksi otomatis. Rujukan dilacak dari deteksi hingga fasilitas.",
      gets:lang==="en"?["SahAIbat Bidan — midwife node","ANC 10T quality scoring","High-risk pregnancy alerts","Postnatal monitoring 0–42 days"]:["SahAIbat Bidan — titik bidan","Skor kualitas ANC 10T","Peringatan kehamilan berisiko tinggi","Pemantauan nifas 0–42 hari"]},
    {icon:"🏘️",title:lang==="en"?"Rural Health Education":"Edukasi Kesehatan Pedesaan",color:C.gold,
      desc:lang==="en"?"Kasih gives every family in your catchment area a health companion on WhatsApp — in Bahasa Indonesia, offline-capable, available at 2am.":"Kasih memberi setiap keluarga di wilayah kerja Anda pendamping kesehatan di WhatsApp — dalam Bahasa Indonesia, bisa offline, tersedia jam 2 pagi.",
      gets:lang==="en"?["Kasih — family node on WhatsApp","Symptom triage in Bahasa Indonesia","24/7 danger-sign guidance","No smartphone or app required"]:["Kasih — titik keluarga di WhatsApp","Triase gejala dalam Bahasa Indonesia","Panduan tanda bahaya 24/7","Tidak perlu smartphone atau aplikasi"]},
  ];
  return(
    <section style={{background:C.dark,padding:"100px 0",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",width:500,height:500,background:C.teal,bottom:"-15%",left:"-8%",borderRadius:"50%",filter:"blur(120px)",opacity:0.07,pointerEvents:"none"}}/>
      <div className="section-max" style={{position:"relative",zIndex:1}}>
        <FadeIn>
          <div style={{textAlign:"center",marginBottom:64}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(2,195,154,0.1)",border:"1px solid rgba(2,195,154,0.3)",borderRadius:20,padding:"6px 16px",marginBottom:20}}>
              <span style={{color:C.teal,fontSize:12,fontWeight:600,letterSpacing:1}}>{lang==="en"?"PARTNER WITH SAHAIBAT":"BERMITRA DENGAN SAHAIBAT"}</span>
            </div>
            <h2 className="display-font" style={{fontSize:"clamp(32px,4vw,54px)",color:C.white,lineHeight:1.1,marginBottom:20}}>
              {lang==="en"
                ?<>Bring better healthcare to your community.<br/><span style={{color:C.teal}}>We bring the technology.</span></>
                :<>Bawa layanan kesehatan lebih baik ke komunitas Anda.<br/><span style={{color:C.teal}}>Kami membawa teknologinya.</span></>}
            </h2>
            <p style={{color:"rgba(255,255,255,0.5)",fontSize:17,maxWidth:640,lineHeight:1.8,margin:"0 auto"}}>
              {lang==="en"?"SahAIbat's community nodes are built into NGO, health programme, and government health post workflows. We're looking for field partners who know their communities.":"Titik komunitas SahAIbat terpasang di alur kerja NGO, program kesehatan, dan poskesdes pemerintah. Kami mencari mitra lapangan yang mengenal komunitas mereka."}
            </p>
          </div>
        </FadeIn>

        {/* Three use cases */}
        <div className="three-col" style={{marginBottom:48}}>
          {useCases.map(({icon,title,color,desc,gets},i)=>(
            <FadeIn key={title} delay={i*80}>
              <div style={{background:"rgba(255,255,255,0.03)",border:`1px solid ${color}25`,borderRadius:20,padding:28,height:"100%",position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${color},transparent)`}}/>
                <div style={{fontSize:36,marginBottom:16}}>{icon}</div>
                <div style={{color,fontWeight:700,fontSize:11,letterSpacing:1,marginBottom:8}}>{lang==="en"?"USE CASE":"KASUS PENGGUNAAN"}</div>
                <h3 style={{color:C.white,fontWeight:800,fontSize:20,marginBottom:14}}>{title}</h3>
                <p style={{color:"rgba(255,255,255,0.5)",fontSize:13,lineHeight:1.8,marginBottom:20}}>{desc}</p>
                <div style={{borderTop:"1px solid rgba(255,255,255,0.06)",paddingTop:16}}>
                  <div style={{color,fontWeight:700,fontSize:10,letterSpacing:1,marginBottom:10}}>{lang==="en"?"WHAT'S INCLUDED":"YANG TERMASUK"}</div>
                  {gets.map(g=>(<div key={g} style={{display:"flex",gap:8,marginBottom:8,alignItems:"flex-start"}}>
                    <span style={{color,fontSize:12,flexShrink:0,marginTop:1}}>✓</span>
                    <span style={{color:"rgba(255,255,255,0.6)",fontSize:12,lineHeight:1.5}}>{g}</span>
                  </div>))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* MoH data metrics callout */}
        <FadeIn delay={100}>
          <div style={{background:`linear-gradient(135deg,${C.tealXdk},${C.charcoal})`,border:"1px solid rgba(2,195,154,0.25)",borderRadius:20,padding:"36px 40px",marginBottom:40,display:"flex",gap:32,alignItems:"center",flexWrap:"wrap"}}>
            <div style={{fontSize:48,flexShrink:0}}>🏛️</div>
            <div style={{flex:1,minWidth:260}}>
              <div style={{color:C.teal,fontWeight:700,fontSize:11,letterSpacing:1,marginBottom:12}}>{lang==="en"?"SUPPORTING PUSKESMAS & MINISTRY OF HEALTH DATA REQUIREMENTS":"MENDUKUNG KEBUTUHAN DATA PUSKESMAS & KEMENTERIAN KESEHATAN"}</div>
              <h3 style={{color:C.white,fontSize:20,fontWeight:700,marginBottom:12}}>
                {lang==="en"?"SahAIbat generates the data your Puskesmas needs to report — automatically.":"SahAIbat menghasilkan data yang dibutuhkan Puskesmas Anda untuk pelaporan — secara otomatis."}
              </h3>
              <p style={{color:"rgba(255,255,255,0.55)",fontSize:14,lineHeight:1.7}}>
                {lang==="en"?"Every Kader visit, every Bidan ANC session, and every Kasih conversation feeds into a Programme Dashboard that produces ILP-aligned reports, SKDR-compatible epidemic surveillance, and Posyandu performance metrics — exactly the data your Puskesmas, Dinas Kesehatan, and MoH need, without any additional reporting burden on your team.":"Setiap kunjungan Kader, setiap sesi ANC Bidan, dan setiap percakapan Kasih mengisi Dasbor Program yang menghasilkan laporan selaras ILP, surveilans epidemi kompatibel SKDR, dan metrik kinerja Posyandu — tepat data yang dibutuhkan Puskesmas, Dinas Kesehatan, dan Kemenkes Anda, tanpa beban pelaporan tambahan bagi tim Anda."}
              </p>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:8,flexShrink:0}}>
              {["ILP Life-cycle Reports","SKDR Surveillance","Posyandu Performance Ranking","Kader Activity Scorecard","SAM/MAM Outcome Funnel","F/III Rekap Trend"].map(t=>(
                <span key={t} style={{background:"rgba(2,195,154,0.1)",border:"1px solid rgba(2,195,154,0.2)",color:C.teal,fontSize:11,fontWeight:600,padding:"5px 12px",borderRadius:20}}>{t}</span>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn delay={150}>
          <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(2,195,154,0.2)",borderRadius:20,padding:"40px",textAlign:"center"}}>
            <div style={{fontSize:48,marginBottom:16}}>🤝</div>
            <h3 className="display-font" style={{color:C.white,fontSize:"clamp(24px,3vw,36px)",marginBottom:16,lineHeight:1.2}}>
              {lang==="en"?"Ready to partner? The process is simple.":"Siap bermitra? Prosesnya sederhana."}
            </h3>
            <p style={{color:"rgba(255,255,255,0.5)",fontSize:15,lineHeight:1.8,maxWidth:560,margin:"0 auto 32px"}}>
              {lang==="en"?"Tell us about your Kaders, your districts, and what health outcomes matter most to your programme. We'll design a deployment around your community — and handle setup, training, and clinical alignment.":"Ceritakan tentang Kader Anda, kabupaten Anda, dan hasil kesehatan apa yang paling penting bagi program Anda. Kami akan merancang deployment seputar komunitas Anda — dan menangani penyiapan, pelatihan, dan penyelarasan klinis."}
            </p>
            <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
              <a href="mailto:partner@sahaibat.com?subject=Field Partnership — SahAIbat" style={{background:C.teal,color:C.dark,padding:"15px 32px",borderRadius:14,fontSize:15,fontWeight:700,textDecoration:"none"}}>
                {lang==="en"?"Apply to Partner →":"Ajukan Kemitraan →"}
              </a>
              <a href="https://wa.me/6281918669241" target="_blank" rel="noopener noreferrer" style={{border:"1.5px solid rgba(2,195,154,0.4)",color:C.white,padding:"15px 32px",borderRadius:14,fontSize:15,fontWeight:600,textDecoration:"none"}}>
                💬 WhatsApp
              </a>
            </div>
            <p style={{color:"rgba(255,255,255,0.2)",fontSize:12,marginTop:20}}>
              {lang==="en"?"partner@sahaibat.com · Response within 48 hours":"partner@sahaibat.com · Respons dalam 48 jam"}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ── ROOT PAGE ─────────────────────────────────────────────────────────────────
export default function HomePage({initialLang="id"}:{initialLang?:"en"|"id"}){
  const lang = initialLang;
  // Keep the shared LanguageProvider context (used by SiteNav/SiteFooter) in
  // sync with this route's language — / and /en are real, separately
  // server-rendered pages, not client-toggled, so this only mirrors state.
  const { setLang } = useI18n();
  useEffect(()=>{ setLang(initialLang); }, [initialLang, setLang]);

  return(
    <>
      <HeroSection lang={lang}/>
      <ProblemSection lang={lang}/>
      <PlatformSection lang={lang}/>
      <ProductsSection lang={lang}/>
      <DoKCallout lang={lang}/>
      <DashboardSection lang={lang}/>
      <TractionSection lang={lang}/>
      <GroundImpactSection lang={lang}/>
      <ILPSection lang={lang}/>
      <StorySection lang={lang}/>
      <FieldPartnersSection lang={lang}/>
      <TeamSection lang={lang}/>
      <NGOPartnerSection lang={lang}/>
      <PartnerSection lang={lang}/>
    </>
  );
}
