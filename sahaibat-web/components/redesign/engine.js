/* eslint-disable */
// @ts-nocheck
// Behaviour for the Concept A page, ported from the approved preview. Edit here directly.
// Runs once against the server-rendered markup inside `root`; returns a
// cleanup function. GSAP and ScrollTrigger come from npm (see RedesignPage).
export function initRedesign(root, opts){
  var __subs=[];function __on(t,e,f,o){t.addEventListener(e,f,o);__subs.push([t,e,f,o])}

  var L=opts.lang==='id'?'id':'en';
  var LKG={"kader": ["Kader", "<path d=\"M9.8 14 C9.8 8.6 12.6 5.6 16 5.6 C19.4 5.6 22.2 8.6 22.2 14 V17 C21.2 19.8 18.9 21 16 21 C13.1 21 10.8 19.8 9.8 17 Z\"/><circle class=\"f\" cx=\"13.9\" cy=\"12.8\" r=\"1.05\"/><circle class=\"f\" cx=\"18.1\" cy=\"12.8\" r=\"1.05\"/><path d=\"M14.1 15.6 C15.1 16.6 16.9 16.6 17.9 15.6\"/><path d=\"M5 28 C5.8 23.4 9.6 21 14 21\"/><circle cx=\"24.6\" cy=\"21.6\" r=\"2.5\"/><path d=\"M20.6 28 C21.1 25.7 22.6 24.8 24.6 24.8 C26.6 24.8 28.1 25.7 28.6 28\"/>"], "bidan": ["Bidan", "<path d=\"M9.8 14 C9.8 8.6 12.6 5.6 16 5.6 C19.4 5.6 22.2 8.6 22.2 14 V17 C21.2 19.8 18.9 21 16 21 C13.1 21 10.8 19.8 9.8 17 Z\"/><circle class=\"f\" cx=\"13.9\" cy=\"12.8\" r=\"1.05\"/><circle class=\"f\" cx=\"18.1\" cy=\"12.8\" r=\"1.05\"/><path d=\"M14.1 15.6 C15.1 16.6 16.9 16.6 17.9 15.6\"/><path d=\"M5.5 28.5 C6.4 23.6 10.4 21.2 13.6 21.2 M18.4 21.2 C21.6 21.2 25.6 23.6 26.5 28.5\"/><path class=\"f\" d=\"M16 28.2 C13.9 26.8 13 25.8 13 24.7 C13 23.8 13.7 23.2 14.5 23.2 C15.1 23.2 15.6 23.6 16 24.1 C16.4 23.6 16.9 23.2 17.5 23.2 C18.3 23.2 19 23.8 19 24.7 C19 25.8 18.1 26.8 16 28.2 Z\"/>"], "dok": ["DOK", "<path d=\"M3 17 q2 -6 4 0 t4 0 q2 -9 4 0 C17 17 18.5 10 22 10 H29\"/><path class=\"t\" d=\"M20 17 H29 M20 23 H27\"/>"], "code": ["Code", "<path d=\"M4 8 C11 8 12.5 16 17 16 M4 24 C11 24 12.5 16 17 16 H28\"/><path class=\"f\" d=\"M19.5 12.5 L23 16 L19.5 19.5 L16 16 Z\"/>"], "kasih": ["Kasih", "<path d=\"M3 20 C7 20 8 11 12 11 S17 20 21 20 S26 11 29.5 12.5\"/>"], "aes": ["Aesthetics", "<path class=\"d\" d=\"M4 22 C10 22 12 12 18 12 S25 18 28.5 16\"/><circle cx=\"28.5\" cy=\"16\" r=\"1.8\" class=\"f\"/>"]};
  LKG.comp=["DOK Companion","<rect x=\"3\" y=\"6\" width=\"26\" height=\"20\" rx=\"3.5\"/><path d=\"M3 11.5 H29\"/><path class=\"t\" d=\"M19.5 11.5 V26\"/><path d=\"M22.5 16 H26.5 M22.5 20.5 H25.5\"/>"];LKG.kons=["Konsensus.id","<path d=\"M4 8.5 C9 6.5 13 7.5 16 9.5 C19 7.5 23 6.5 28 8.5 V25 C23 23 19 24 16 26 C13 24 9 23 4 25 Z\"/><path class=\"t\" d=\"M16 9.5 V26\"/><path class=\"f\" d=\"M20.5 13.5 l1.6 1.6 l3.2 -3.4\" style=\"fill:none;stroke:var(--c);stroke-width:2\"/>",{en:"Clinical knowledge",id:"Pengetahuan klinis"}];
  function LK(k,sm){var g=LKG[k];return '<span class="lk p-'+k+(sm?' sm':'')+'"><span class="lk-g" aria-hidden="true"><svg viewBox="0 0 32 32">'+g[1]+'</svg></span><span class="lk-t"><small>'+(g[2]?t(g[2]):'Sah<em>AI</em>bat')+'</small><b>'+g[0]+'</b></span></span>'}
 var body=root; body.dataset.l=L;
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var t=function(o){return typeof o==='string'?o:o[L]};
  function setLang(l){L=l;if(opts.onLang)opts.onLang(l);body.dataset.l=l;document.documentElement.lang=l;document.querySelectorAll('[data-l]').forEach(function(b){if(b.tagName==='BUTTON')b.setAttribute('aria-pressed',b.dataset.l===l)});renderAll();build();}
  document.querySelectorAll('.review [data-l]').forEach(function(b){b.addEventListener('click',function(){setLang(b.dataset.l)})});
  document.getElementById('navLang').addEventListener('click',function(){setLang(L==='en'?'id':'en')});document.getElementById('navLang').textContent=L==='en'?'ID':'EN';
  document.querySelectorAll('[data-n]').forEach(function(b){b.addEventListener('click',function(){body.classList.toggle('notes',b.dataset.n==='1');document.querySelectorAll('[data-n]').forEach(function(x){x.setAttribute('aria-pressed',x===b)})})});
  var nav=root.querySelector('header.nav'),burger=root.querySelector('.burger');burger.setAttribute('aria-expanded','false');
  burger.addEventListener('click',function(){var o=nav.classList.toggle('open');burger.setAttribute('aria-expanded',String(o))});
  nav.addEventListener('click',function(e){if(e.target.closest('a')){nav.classList.remove('open');burger.setAttribute('aria-expanded','false')}});
  function tabKeys(list,sel){list.forEach(function(b,i){b.addEventListener('keydown',function(e){var d=(e.key==='ArrowRight'||e.key==='ArrowDown')?1:(e.key==='ArrowLeft'||e.key==='ArrowUp')?-1:0;if(!d)return;e.preventDefault();var n=list[(i+d+list.length)%list.length];n.focus();n.click();})})}

  // 02 vignettes
  var IM={phones:'/redesign/img/phones.jpg',doctor:'/redesign/img/clinic_u.jpg',paper:'/redesign/img/hospital_u.jpg'};
  var VIG=[{img:'phones',tag:'FIELD PHOTO',b:{en:['Measurements written in a paper register','Re-copied into monthly reports','Hard to see which child is due for follow-up'],id:['Pengukuran ditulis di buku register','Disalin ulang untuk laporan bulanan','Sulit melihat anak mana yang perlu ditindaklanjuti']},a:{en:['Measurement recorded once, at the visit','Visit history for each child in one place','Follow-up list ready for the next home visit'],id:['Pengukuran dicatat sekali, saat kunjungan','Riwayat kunjungan tiap anak di satu tempat','Daftar tindak lanjut siap untuk kunjungan rumah']}},
    {img:'doctor',tag:'AI-GENERATED · ILLUSTRATIVE',b:{en:['Notes typed after the patient leaves','History spread across paper and files','Prescriptions rewritten by hand'],id:['Catatan diketik setelah pasien pulang','Riwayat tersebar di kertas dan berkas','Resep ditulis ulang dengan tangan']},a:{en:['Patient history open before the consultation','AI-assisted draft the doctor reviews and signs','Prescription and follow-up from the same record'],id:['Riwayat pasien terbuka sebelum konsultasi','Draf berbantuan AI yang ditinjau dan ditandatangani dokter','Resep dan tindak lanjut dari rekam medis yang sama']}},
    {img:'paper',tag:'AI-GENERATED · ILLUSTRATIVE',b:{en:['Evidence searched page by page','Inconsistencies found late','Decisions hard to trace afterwards'],id:['Bukti dicari halaman demi halaman','Inkonsistensi baru ditemukan belakangan','Keputusan sulit ditelusuri kembali']},a:{en:['Relevant evidence highlighted in the document','Possible inconsistencies surfaced for review','Coder decision recorded with its reason'],id:['Bukti relevan ditandai dalam dokumen','Potensi inkonsistensi ditampilkan untuk ditinjau','Keputusan koder tercatat beserta alasannya']}}];
  var vig=0;
  function renderVig(){var v=VIG[vig];document.getElementById('vigImg').src=IM[v.img];document.getElementById('vigTag').textContent=v.tag;document.getElementById('vigTag').className='ph-tag ok';
    var li=function(a){return a.map(function(x){return '<li>'+x+'</li>'}).join('')};
    document.getElementById('vigBA').innerHTML='<div class="fade"><h4>'+t({en:'Today',id:'Saat ini'})+'</h4><ul>'+li(v.b[L])+'</ul></div><div class="after fade"><h4>'+t({en:'With SahAIbat',id:'Dengan SahAIbat'})+'</h4><ul>'+li(v.a[L])+'</ul></div>';
    document.querySelectorAll('#vigTabs button').forEach(function(b){b.setAttribute('aria-selected',+b.dataset.v===vig)});}
  var vt=[].slice.call(document.querySelectorAll('#vigTabs button'));vt.forEach(function(b){b.addEventListener('click',function(){vig=+b.dataset.v;renderVig()})});tabKeys(vt);

  // 03 roles
  var ROLES=[
    {k:'solo',l:{en:'Solo doctor',id:'Dokter praktik mandiri'},p:'DOK',th:'dok',h:{en:'Less administration. More attention for your patients.',id:'Lebih sedikit administrasi. Lebih banyak perhatian untuk pasien.'},b:{en:'A complete Intelligent RME for your practice. Try every feature for 30 days, then upgrade or keep the free plan.',id:'RME Cerdas lengkap untuk praktik Anda. Coba semua fitur selama 30 hari, lalu upgrade atau tetap di paket gratis.'},c:[{en:'Start 30-day trial',id:'Mulai uji coba 30 hari'},{en:'Watch the 2-minute demo',id:'Lihat demo 2 menit'}],e:{en:'Direct signup',id:'Daftar langsung'}},
    {k:'clinic',l:{en:'Clinic owner',id:'Pemilik klinik'},p:'DOK',th:'dok',h:{en:'A more intelligent way to run your clinical day.',id:'Cara lebih cerdas menjalankan hari klinis Anda.'},b:{en:'From registration and queue to documentation, prescriptions, pharmacy and cashier, explore how one Intelligent RME can support your clinic.',id:'Dari pendaftaran dan antrean hingga dokumentasi, resep, apotek dan kasir, lihat bagaimana satu RME Cerdas mendukung klinik Anda.'},c:[{en:'Start clinic trial',id:'Mulai uji coba klinik'},{en:'Request a walkthrough',id:'Minta panduan langsung'}],e:{en:'Trial or demo',id:'Uji coba atau demo'}},
    {k:'rme',l:{en:'Already use an EMR',id:'Sudah memakai RME'},p:'DOK Companion',th:'comp',h:{en:'Add clinical AI to the EMR you already use.',id:'Tambahkan AI klinis ke RME yang sudah Anda pakai.'},b:{en:'DOK Companion is a Chrome extension that drafts notes beside your web-based EMR. When you are ready, move your practice to DOK.',id:'DOK Companion adalah ekstensi Chrome yang menyusun draf catatan di samping RME berbasis web Anda. Saat siap, pindahkan praktik Anda ke DOK.'},c:[{en:'Add to Chrome',id:'Tambahkan ke Chrome'},{en:'Plan your move to DOK',id:'Rencanakan pindah ke DOK'}],e:{en:'Chrome Web Store',id:'Chrome Web Store'}},
    {k:'evidence',l:{en:'Looking for clinical evidence',id:'Mencari bukti klinis'},p:'Konsensus.id',th:'kons',h:{en:'Clinical knowledge when you need it.',id:'Pengetahuan klinis saat Anda butuhkan.'},b:{en:'Search Konsensus.id, an open evidence-based knowledge base: 5 free searches a day, unlimited with your DOK account.',id:'Cari di Konsensus.id, basis pengetahuan berbasis bukti yang terbuka: 5 pencarian gratis per hari, tanpa batas dengan akun DOK.'},c:[{en:'Search Konsensus.id',id:'Cari di Konsensus.id'},{en:'Get unlimited with DOK',id:'Akses tanpa batas dengan DOK'}],e:{en:'Open access',id:'Akses terbuka'}},
    {k:'kader',l:{en:'Community health lead',id:'Pengelola kesehatan komunitas'},p:'Kader',th:'kader',h:{en:'Better tools for the people closest to communities.',id:'Alat yang lebih baik bagi mereka yang paling dekat dengan masyarakat.'},b:{en:'Give kader teams a clearer way to document Posyandu services, child growth and follow-up.',id:'Bantu tim kader mencatat layanan Posyandu, tumbuh kembang anak dan tindak lanjut dengan lebih jelas.'},c:[{en:'Discuss a community programme',id:'Diskusikan program komunitas'},{en:'Explore Kader',id:'Jelajahi Kader'}],e:{en:'Programme inquiry',id:'Pertanyaan program'}},
    {k:'bidan',l:{en:'Midwife',id:'Bidan'},p:'Bidan',th:'bidan',h:{en:'Supporting every important maternal visit.',id:'Mendukung setiap kunjungan penting ibu.'},b:{en:'Practical digital tools for midwives throughout the maternal and early-childhood care journey.',id:'Alat digital yang praktis untuk bidan sepanjang perjalanan kesehatan ibu dan anak usia dini.'},c:[{en:'Request access',id:'Minta akses'},{en:'Explore Bidan',id:'Jelajahi Bidan'}],e:{en:'Access request',id:'Permintaan akses'}},
    {k:'code',l:{en:'Hospital coding team',id:'Tim koding rumah sakit'},p:'Code',th:'code',h:{en:'Intelligence for documentation and coding review.',id:'Kecerdasan untuk review dokumentasi dan koding.'},b:{en:'Help hospital coding teams review clinical evidence and potential inconsistencies with greater clarity.',id:'Bantu tim koding rumah sakit meninjau bukti klinis dan potensi inkonsistensi dengan lebih jelas.'},c:[{en:'Request a hospital demo',id:'Minta demo rumah sakit'},{en:'Explore Code',id:'Jelajahi Code'}],e:{en:'Enterprise demo',id:'Demo enterprise'}},
    {k:'family',l:{en:'Patient or family',id:'Pasien atau keluarga'},p:'Kasih',th:'kasih',h:{en:'Care that continues beyond the consultation.',id:'Perawatan yang berlanjut setelah konsultasi.'},b:{en:'Make everyday follow-up and understandable health information easier to navigate.',id:'Tindak lanjut harian dan informasi kesehatan yang mudah dipahami.'},c:[{en:'Discover Kasih',id:'Kenali Kasih'},{en:'Ask if your provider offers it',id:'Tanyakan ke penyedia layanan Anda'}],e:{en:'Product discovery',id:'Kenali produk'}},
    {k:'aes',l:{en:'Aesthetic clinic',id:'Klinik estetika'},p:'Aesthetics',th:'aes',soon:1,h:{en:'Personalised aesthetic care, thoughtfully reimagined.',id:'Perawatan estetika personal, dirancang ulang dengan cermat.'},b:{en:'An upcoming SahAIbat experience exploring consultations, care journeys and aftercare in aesthetics.',id:'Pengalaman SahAIbat yang akan datang untuk konsultasi, perjalanan perawatan dan perawatan lanjutan di bidang estetika.'},c:[{en:'Register your interest',id:'Daftarkan minat Anda'},{en:'Preview the concept',id:'Lihat konsepnya'}],e:{en:'Waitlist',id:'Daftar tunggu'}}];
  var MINI={comp:'M10 50 q8 -26 16 0 t16 0 C80 50 110 22 160 22 H600',kons:'M10 60 C150 60 200 20 320 20 S520 40 600 30',dok:'M10 50 q8 -26 16 0 t16 0 t16 0 q8 -34 16 0 t16 0 C120 50 150 22 200 22 H600',kader:'M10 62 C120 50 220 36 320 28 S500 14 600 10',bidan:'M10 40 H520',code:'M10 14 C120 14 150 40 260 40 M10 66 C120 66 150 40 260 40 H600',kasih:'M10 50 C80 50 100 16 170 16 S270 50 340 50 S440 16 510 16 S590 40 600 40',aes:'M10 52 C160 52 200 26 320 26 S500 52 600 40'};
  var role='solo';
  function renderRoles(focus){var list=document.getElementById('rfList');list.innerHTML='';
    ROLES.forEach(function(r,i){var b=document.createElement('button');b.type='button';b.setAttribute('role','radio');b.setAttribute('aria-checked',r.k===role);b.tabIndex=r.k===role?0:-1;b.textContent=t(r.l);
      b.addEventListener('click',function(){role=r.k;renderRoles(true)});
      b.addEventListener('keydown',function(e){var d=(e.key==='ArrowDown'||e.key==='ArrowRight')?1:(e.key==='ArrowUp'||e.key==='ArrowLeft')?-1:0;if(!d)return;e.preventDefault();role=ROLES[(i+d+ROLES.length)%ROLES.length].k;renderRoles(true)});
      list.appendChild(b)});
    if(focus)list.querySelector('[aria-checked="true"]').focus();
    var r=ROLES.filter(function(x){return x.k===role})[0];var stroke=r.soon?'#DC937F" stroke-dasharray="6 7':'#12705A';
    document.getElementById('rfOut').innerHTML='<div class="fade" style="display:flex;flex-direction:column;gap:14px;height:100%"><span class="prod">'+LK(r.th)+(r.soon?' <span class="soon-dot p-aes" style="--c:var(--pcd)">'+t({en:'Coming soon',id:'Segera hadir'})+'</span>':'')+'</span><h3>'+t(r.h)+'</h3><p>'+t(r.b)+'</p><svg viewBox="0 0 610 76" preserveAspectRatio="none" aria-hidden="true"><path d="'+MINI[r.th]+'" fill="none" stroke="'+stroke+'" stroke-width="2.5" stroke-linecap="round"/></svg><div class="btns"><a class="b1" href="'+({comp:'https://chromewebstore.google.com/detail/sahaibat-dok-companion-%E2%80%93/ipcfmeffihchgoajigaiipkcdmhpeada',kons:'https://konsensus.id'}[r.th]||'#'+({dok:'dok'}[r.th]||'experience'))+'"'+((r.th==='comp'||r.th==='kons')?' target="_blank" rel="noopener"':'')+'>'+t(r.c[0])+'</a><a class="b2" href="#experience">'+t(r.c[1])+'</a></div></div>';}
  document.querySelectorAll('.roles-strip a').forEach(function(a){a.addEventListener('click',function(){role=a.dataset.role;renderRoles()})});

  // 04 kader visits
  var VIS=[['12 Mei','8,9 kg','76,0 cm',{en:'—',id:'—'}],['10 Jun','9,1 kg','77,2 cm',{en:'—',id:'—'}],['8 Jul','9,1 kg','78,1 cm',{en:'Weight unchanged',id:'Berat tetap'}],['12 Agu','9,0 kg','78,9 cm',{en:'Home visit planned',id:'Kunjungan rumah'}]];
  var vis=3;
  function renderVisits(){var box=document.getElementById('visits');box.querySelectorAll('button').forEach(function(b){b.remove()});
    VIS.forEach(function(v,i){var b=document.createElement('button');b.type='button';b.setAttribute('aria-pressed',i===vis);b.innerHTML='<span class="d">'+v[0]+'</span><span class="n">'+v[1]+'</span><span class="n">'+v[2]+'</span><span>'+t(v[3])+'</span>';b.addEventListener('click',function(){touched.vis=1;vis=i;renderVisits()});box.appendChild(b)});
    var f=vis===3?t({en:'<b>Follow-up recorded.</b> Weight has not increased across three visits, so the kader schedules a home visit and refers to the puskesmas team for assessment.',id:'<b>Tindak lanjut tercatat.</b> Berat badan tidak naik dalam tiga kunjungan, sehingga kader menjadwalkan kunjungan rumah dan merujuk ke tim puskesmas untuk penilaian.'}):vis===2?t({en:'<b>Noted for next visit.</b> The kader adds a reminder to recheck next month.',id:'<b>Dicatat untuk kunjungan berikutnya.</b> Kader menambahkan pengingat untuk cek ulang bulan depan.'}):t({en:'<b>Routine visit.</b> Measurements recorded; nothing flagged.',id:'<b>Kunjungan rutin.</b> Pengukuran tercatat; tidak ada catatan khusus.'});
    document.getElementById('kfoot').innerHTML='<span>'+f+'</span><span style="font-size:.78rem;color:var(--ink-3)">'+t({en:'Classification is made by health workers using official growth standards.',id:'Penilaian status gizi dilakukan tenaga kesehatan dengan standar pertumbuhan resmi.'})+'</span>';}

  // 05 bidan
  var TL=[['K1',{en:'First trimester',id:'Trimester 1'}],['K2',{en:'First trimester',id:'Trimester 1'}],['K3',{en:'Second trimester',id:'Trimester 2'}],['K4',{en:'Third trimester',id:'Trimester 3'}],['K5',{en:'Third trimester',id:'Trimester 3'}],['K6',{en:'Third trimester',id:'Trimester 3'}],['birth',{en:'Birth',id:'Persalinan'}],['KF',{en:'Postnatal',id:'Nifas'}]];
  var CK={en:['Blood pressure','Weight and fundal height','Fetal heart rate','Iron tablets given','Birth plan discussed','Next visit agreed'],id:['Tekanan darah','Berat badan dan tinggi fundus','Denyut jantung janin','Tablet tambah darah diberikan','Rencana persalinan dibahas','Jadwal kunjungan berikutnya']};
  var tl=4;
  function renderTL(){var tr=document.getElementById('tlTrack');tr.innerHTML='';TL.forEach(function(v,i){var b=document.createElement('button');b.type='button';b.className=v[0]==='birth'?'birth':v[0]==='KF'?'pn':'';b.setAttribute('aria-pressed',i===tl);b.innerHTML='<i></i>'+(v[0]==='birth'?t({en:'Birth',id:'Lahir'}):v[0]);b.addEventListener('click',function(){touched.tl=1;tl=i;renderTL()});tr.appendChild(b)});
    var v=TL[tl],h;
    if(v[0]==='birth')h='<h4>'+t({en:'Birth',id:'Persalinan'})+'</h4><p style="color:var(--ink-2)">'+t({en:'Delivery details and newborn record are added by the midwife.',id:'Detail persalinan dan catatan bayi baru lahir diisi oleh bidan.'})+'</p>';
    else if(v[0]==='KF')h='<h4>'+t({en:'Postnatal follow-up',id:'Kunjungan nifas'})+'</h4><p style="color:var(--ink-2)">'+t({en:'Planned visits for mother and baby after birth.',id:'Kunjungan terjadwal untuk ibu dan bayi setelah persalinan.'})+'</p>';
    else{var done=tl<4?6:4;h='<div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap"><h4>'+v[0]+' · '+t(v[1])+'</h4><span class="status sim">'+t({en:'Ibu Wulan, 27',id:'Ibu Wulan, 27'})+'</span></div><ul class="check">'+CK[L].map(function(c,i){return '<li class="'+(i<done?'done':'')+'">'+c+'</li>'}).join('')+'</ul><p style="font-size:.85rem;color:var(--ink-2)">'+t(tl<4?{en:'Visit complete.',id:'Kunjungan selesai.'}:{en:'Two items left before this visit is complete.',id:'Dua hal lagi sebelum kunjungan ini selesai.'})+'</p>';}
    document.getElementById('tlCard').innerHTML='<div class="fade" style="display:flex;flex-direction:column;gap:12px">'+h+'</div>';setB(tl);}

  // 06 DOK flow
  var dm='solo';
  var FLOW={solo:[[{en:'Patient record',id:'Rekam medis pasien'},{en:'History, allergies and medication open before the visit.',id:'Riwayat, alergi dan obat terbuka sebelum kunjungan.'},'RME'],[{en:'Consultation',id:'Konsultasi'},{en:'AI-assisted documentation listens with patient consent.',id:'Dokumentasi berbantuan AI dengan persetujuan pasien.'},'AI'],[{en:'SOAP draft',id:'Draf SOAP'},{en:'Each line traceable to what was said.',id:'Setiap baris dapat ditelusuri ke percakapan.'},'AI'],[{en:'Doctor review',id:'Tinjauan dokter'},{en:'You accept, edit and sign. Nothing saves without you.',id:'Anda menerima, mengubah dan menandatangani. Tidak ada yang tersimpan tanpa Anda.'},'H'],[{en:'Prescription and follow-up',id:'Resep dan tindak lanjut'},{en:'Written by you, from the same record.',id:'Ditulis oleh Anda, dari rekam medis yang sama.'},'H']],
    clinic:[[{en:'Registration and queue',id:'Pendaftaran dan antrean'},{en:'Front desk registers; nurse records vitals.',id:'Petugas mendaftarkan; perawat mencatat tanda vital.'},'RME'],[{en:'Consultation and SOAP draft',id:'Konsultasi dan draf SOAP'},{en:'AI-assisted documentation for every doctor in the clinic.',id:'Dokumentasi berbantuan AI untuk setiap dokter di klinik.'},'AI'],[{en:'Doctor review',id:'Tinjauan dokter'},{en:'Each doctor signs their own records.',id:'Setiap dokter menandatangani rekam medisnya sendiri.'},'H'],[{en:'Pharmacy and cashier',id:'Apotek dan kasir'},{en:'Prescription moves to pharmacy, then billing.',id:'Resep diteruskan ke apotek, lalu kasir.'},'RME'],[{en:'Management reports',id:'Laporan manajemen'},{en:'Daily visits and activity for the clinic owner.',id:'Kunjungan harian dan aktivitas untuk pemilik klinik.'},'RME']]};
  var dsIdx=4,TH={solo:[.12,.4,.6,.85],clinic:[.12,.6,.85,.93]};
  function setDok(i){dsIdx=i;var s=FLOW[dm][i];document.getElementById('dsN').textContent='0'+(i+1);document.getElementById('dsT').textContent=t(s[0]);document.getElementById('dsD').textContent=t(s[1]);var tg=document.getElementById('dsTag');tg.className=s[2]==='H'?'h':'';tg.textContent=s[2]==='H'?t({en:'Doctor',id:'Dokter'}):s[2]==='AI'?t({en:'AI-assisted',id:'Berbantuan AI'}):'RME';document.querySelectorAll('#dsSteps i').forEach(function(x,j){x.classList.toggle('on',j<=i)});}
  function renderFlow(){setDok(dsIdx);document.querySelectorAll('#dokSeg button').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.m===dm)});}
  document.querySelectorAll('#dokSeg button').forEach(function(b){b.addEventListener('click',function(){dm=b.dataset.m;renderFlow()})});

  // 07 Code
  var EVT=[{en:'Source evidence',id:'Bukti sumber'},{en:'Suggested coding',id:'Saran koding'},{en:'Discrepancy',id:'Ketidaksesuaian'},{en:'Coder resolution',id:'Keputusan koder'}];
  var ev=0;
  function renderEv(){var tabs=document.getElementById('evTabs');tabs.innerHTML='';EVT.forEach(function(x,i){var b=document.createElement('button');b.type='button';b.setAttribute('role','tab');b.setAttribute('aria-selected',i===ev);b.textContent=(i+1)+'. '+t(x);b.addEventListener('click',function(){touched.ev=1;ev=i;renderEv()});tabs.appendChild(b)});tabKeys([].slice.call(tabs.children));
    var head='<div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;font-size:.8rem;color:var(--ink-3)"><span style="font-family:var(--mono)">CASE DEMO-IP-118 · '+t({en:'Inpatient, 4 days',id:'Rawat inap, 4 hari'})+'</span></div>';
    var doc='<div class="doc">'+t({en:'Discharge summary: Admitted with fever and productive cough. Chest X-ray: <mark>right lower lobe consolidation</mark>. Treated with IV antibiotics. <mark class="w">Blood glucose 248 mg/dL on admission</mark>; patient known to have <mark>type 2 diabetes</mark>.',id:'Resume medis: Masuk dengan demam dan batuk berdahak. Rontgen dada: <mark>konsolidasi lobus kanan bawah</mark>. Diberi antibiotik IV. <mark class="w">Gula darah 248 mg/dL saat masuk</mark>; pasien diketahui <mark>diabetes melitus tipe 2</mark>.'})+'</div>';
    var h;
    if(ev===0)h=doc+'<p style="color:var(--ink-2);font-size:.88rem">'+t({en:'Evidence relevant to coding is highlighted in the source document.',id:'Bukti yang relevan untuk koding ditandai di dokumen sumber.'})+'</p>';
    if(ev===1)h='<div class="coderow"><code>J18.9</code><span>'+t({en:'Pneumonia, unspecified organism',id:'Pneumonia, organisme tidak spesifik'})+'<small>'+t({en:'From: consolidation on X-ray, IV antibiotics',id:'Dari: konsolidasi pada rontgen, antibiotik IV'})+'</small></span><span class="pill s">'+t({en:'Suggestion',id:'Saran'})+'</span></div><div class="coderow"><code>E11.9</code><span>'+t({en:'Type 2 diabetes without complications',id:'DM tipe 2 tanpa komplikasi'})+'<small>'+t({en:'From: history in discharge summary',id:'Dari: riwayat pada resume medis'})+'</small></span><span class="pill s">'+t({en:'Suggestion',id:'Saran'})+'</span></div>';
    if(ev===2)h=doc+'<div class="coderow"><code>E11.9</code><span>'+t({en:'Documentation mentions elevated glucose on admission. Check whether the record supports a more specific code.',id:'Dokumentasi menyebut gula darah tinggi saat masuk. Periksa apakah rekam medis mendukung kode yang lebih spesifik.'})+'</span><span class="pill w">'+t({en:'For review',id:'Perlu ditinjau'})+'</span></div>';
    if(ev===3)h='<div class="coderow"><code>J18.9</code><span>'+t({en:'Accepted by coder',id:'Diterima koder'})+'</span><span class="pill ok">'+t({en:'Confirmed',id:'Dikonfirmasi'})+'</span></div><div class="coderow"><code>E11.9</code><span>'+t({en:'Coder queries the attending doctor for clarification before finalising.',id:'Koder meminta klarifikasi dokter penanggung jawab sebelum final.'})+'<small>'+t({en:'Reason recorded: documentation incomplete',id:'Alasan tercatat: dokumentasi belum lengkap'})+'</small></span><span class="pill w">'+t({en:'Query sent',id:'Klarifikasi'})+'</span></div><p style="font-size:.85rem;color:var(--ink-2)">'+t({en:'The coder makes the final decision. Every step is traceable.',id:'Koder membuat keputusan akhir. Setiap langkah dapat ditelusuri.'})+'</p>';
    document.getElementById('evBody').innerHTML='<div class="fade" style="display:flex;flex-direction:column;gap:12px">'+head+h+'</div>';var dc=document.querySelector('#evBody .doc');if(dc&&motion&&!reduce){dc.classList.add('sweep');requestAnimationFrame(function(){requestAnimationFrame(function(){dc.classList.remove('sweep')})})}}

  // 08 Kasih
  document.querySelectorAll('.kc').forEach(function(c){c.addEventListener('click',function(){var o=c.getAttribute('aria-expanded')==='true';c.setAttribute('aria-expanded',!o)})});

  // 09 waitlist
  document.getElementById('wl').addEventListener('submit',function(e){e.preventDefault();var m=document.getElementById('wlMsg');m.hidden=false;location.href='mailto:admin@sahaibat.com?subject='+encodeURIComponent('SahAIbat Aesthetics waitlist')+'&body='+encodeURIComponent(document.getElementById('wlEmail').value);m.textContent=t({en:'Opening your email app to join the Aesthetics waitlist.',id:'Membuka aplikasi email Anda untuk mendaftar ke daftar tunggu Aesthetics.'})});

  // 10 experience zone
  var XZ=[['Kader','M6 38 C80 30 150 20 220 14 S330 6 400 4',0,{en:'Select a child, open a visit, compare measurements, inspect follow-up.',id:'Pilih anak, buka kunjungan, bandingkan pengukuran, lihat tindak lanjut.'},{en:'Discover Kader',id:'Kenali Kader'},{en:'Simulation',id:'Simulasi'}],
    ['Bidan','M6 24 H360',0,{en:'Open a maternal profile, choose an ANC visit, review the checklist and follow-up.',id:'Buka profil ibu, pilih kunjungan ANC, tinjau daftar periksa dan tindak lanjut.'},{en:'Request Bidan access',id:'Minta akses Bidan'},{en:'Simulation',id:'Simulasi'}],
    ['DOK','M6 26 q6 -18 12 0 t12 0 q6 -24 12 0 t12 0 C80 26 100 10 140 10 H400',0,{en:'Choose solo or clinic, follow a patient from arrival to a signed record.',id:'Pilih praktik mandiri atau klinik, ikuti pasien dari datang hingga rekam medis ditandatangani.'},{en:'Start 30-day trial',id:'Mulai uji coba 30 hari'},{en:'Simulation',id:'Simulasi'}],
    ['DOK Companion','M6 30 q6 -18 12 0 t12 0 C70 30 90 12 130 12 H400',0,{en:'Watch Companion draft a note beside an EMR, then fill selected fields.',id:'Lihat Companion menyusun catatan di samping RME, lalu mengisi kolom terpilih.'},{en:'Add to Chrome',id:'Tambahkan ke Chrome'},{en:'Simulation',id:'Simulasi'}],
    ['Code','M6 8 C80 8 100 24 180 24 M6 40 C80 40 100 24 180 24 H400',0,{en:'Open an inpatient case, inspect evidence, resolve one discrepancy.',id:'Buka kasus rawat inap, periksa bukti, selesaikan satu ketidaksesuaian.'},{en:'Request a hospital demo',id:'Minta demo rumah sakit'},{en:'Simulation',id:'Simulasi'}],
    ['Kasih','M6 30 C50 30 60 10 110 10 S180 30 230 30 S300 10 350 10 S395 24 400 24',0,{en:'Pick a family scenario, read the plan, see a reminder, learn when to reconnect.',id:'Pilih skenario keluarga, baca rencana, lihat pengingat, pahami kapan menghubungi kembali.'},{en:'Explore Kasih',id:'Jelajahi Kasih'},{en:'Simulation',id:'Simulasi'}],
    ['Konsensus.id','M6 40 C120 40 160 10 250 10 S360 26 400 20',0,{en:'Run an example search and see how evidence is summarised with sources.',id:'Coba contoh pencarian dan lihat cara bukti dirangkum beserta sumbernya.'},{en:'Search Konsensus.id',id:'Cari di Konsensus.id'},{en:'Live',id:'Tersedia'}],
    ['Aesthetics','M6 32 C100 32 130 12 210 12 S330 32 400 24',1,{en:'Choose a treatment goal, view a proposed consultation, aftercare concept.',id:'Pilih tujuan perawatan, lihat konsep konsultasi dan perawatan lanjutan.'},{en:'Join the waitlist',id:'Daftar tunggu'},{en:'Concept preview',id:'Pratinjau konsep'}]];
  var XK={Kader:'kader',Bidan:'bidan',DOK:'dok','DOK Companion':'comp',Code:'code',Kasih:'kasih','Konsensus.id':'kons',Aesthetics:'aes'};
  function renderXZ(){document.getElementById('xz').innerHTML=XZ.map(function(x){var k=XK[x[0]];return '<a href="#xzPlayer" data-demo="'+k+'" class="p-'+k+'"><div class="xz-top">'+LK(k)+(x[2]?'<span class="soon-dot">'+t({en:'Coming soon',id:'Segera hadir'})+'</span>':'<span class="live">'+t({en:'Live',id:'Tersedia'})+'</span>')+'</div><svg viewBox="0 0 406 48" preserveAspectRatio="none" aria-hidden="true"><path class="'+(x[2]?'d':'')+'" d="'+x[1]+'"/></svg><p>'+t(x[3])+'</p><div class="xz-foot"><span class="demo-meta"><i></i>'+t(x[2]?{en:'Concept preview',id:'Pratinjau konsep'}:{en:'Guided demo',id:'Demo terpandu'})+'</span><span class="go">'+t(x[4])+' →</span></div></a>'}).join('')}

  // 11 pillars
  var PIL=[[{en:'Human-centred workflows',id:'Alur kerja berpusat pada manusia'},{en:'Designed around the person delivering care',id:'Dirancang untuk orang yang memberi layanan'},{en:'We start from the work itself: the Posyandu table, the home visit, the consultation room, the coding desk.',id:'Kami mulai dari pekerjaannya: meja Posyandu, kunjungan rumah, ruang praktik, meja koding.'},{en:['Fewer steps for routine tasks','Interfaces in clear Bahasa Indonesia','Training and support for each care setting'],id:['Langkah lebih sedikit untuk tugas rutin','Antarmuka dalam Bahasa Indonesia yang jelas','Pelatihan dan dukungan untuk setiap layanan']}],
    [{en:'Purposeful AI',id:'AI yang tepat guna'},{en:'AI where it helps, never in charge',id:'AI saat membantu, bukan pengambil keputusan'},{en:'AI drafts, highlights and organises. Healthcare professionals review, decide and stay accountable.',id:'AI menyusun draf, menandai dan merapikan. Tenaga kesehatan meninjau, memutuskan dan tetap bertanggung jawab.'},{en:['Drafts are labelled as drafts','Suggestions show their source','Nothing clinical is saved without human review'],id:['Draf selalu ditandai sebagai draf','Saran menunjukkan sumbernya','Tidak ada data klinis tersimpan tanpa tinjauan manusia']}],
    [{en:'Local context',id:'Konteks lokal'},{en:'Built for how Indonesia actually works',id:'Dibangun sesuai cara kerja di Indonesia'},{en:'Indonesian clinical terminology, local programmes and the realities of connectivity and staffing.',id:'Terminologi klinis Indonesia, program lokal, serta realitas koneksi internet dan tenaga kerja.'},{en:['RME, Posyandu, BPJS and SATUSEHAT named as people know them','Works for small practices and large facilities','Integrations listed only when verified'],id:['RME, Posyandu, BPJS dan SATUSEHAT disebut sebagaimana dikenal','Cocok untuk praktik kecil dan fasilitas besar','Integrasi hanya dicantumkan jika terverifikasi']}],
    [{en:'Responsible design',id:'Desain yang bertanggung jawab'},{en:'Trust is designed in',id:'Kepercayaan dirancang sejak awal'},{en:'Clear product boundaries, careful handling of health information and honest labels for what is live and what is coming.',id:'Batas produk yang jelas, pengelolaan informasi kesehatan yang cermat dan label yang jujur untuk fitur yang sudah tersedia maupun yang akan datang.'},{en:['Live, pilot and coming-soon labels everywhere','Access controls for each role','Public demos never use real patient data'],id:['Label tersedia, uji coba dan segera hadir di semua tempat','Kontrol akses untuk setiap peran','Demo publik tidak pernah memakai data pasien asli']}]];
  var pil=1;
  function renderPil(){var tabs=document.getElementById('pilTabs');tabs.innerHTML='';PIL.forEach(function(p,i){var b=document.createElement('button');b.type='button';b.setAttribute('role','tab');b.setAttribute('aria-selected',i===pil);b.textContent=t(p[0]);b.addEventListener('click',function(){pil=i;renderPil()});tabs.appendChild(b)});tabKeys([].slice.call(tabs.children));
    var p=PIL[pil];document.getElementById('pilBody').innerHTML='<div class="fade" style="display:flex;flex-direction:column;gap:14px"><span class="k">'+t(p[0])+'</span><h3>'+t(p[1])+'</h3><p>'+t(p[2])+'</p><ul>'+p[3][L].map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul></div>'}

  // 12 closing selector
  var cs='solo';
  function renderClose(){var s=document.getElementById('closeSel');s.innerHTML=ROLES.map(function(r){return '<option value="'+r.k+'"'+(r.k===cs?' selected':'')+'>'+t(r.l)+'</option>'}).join('');
    var r=ROLES.filter(function(x){return x.k===cs})[0];document.getElementById('closeOut').innerHTML='<div class="ch-brand">'+LK(r.th,1)+'<span class="k">'+t(r.e)+'</span></div><p>'+t(r.b)+'</p><div class="btns"><a class="b1" href="#">'+t(r.c[0])+'</a></div>'}
  document.getElementById('closeSel').addEventListener('change',function(e){cs=e.target.value;renderClose()});

  function renderAll(){calc();if(!document.getElementById('dokLive').hidden){dlRenderCases();dlRenderDraft()}['code','kasih'].forEach(function(p){if(!document.getElementById(p+'Live').hidden){mxCases(p);p==='code'?codeRender():kasihRender()}});renderPlayer();renderVig();renderRoles();renderVisits();renderTL();renderFlow();renderEv();renderXZ();renderPil();renderClose();}


  // ---------- pages ----------
  var view='home';
  function show(v,anchor,fromNav){if(!fromNav&&opts.onView){opts.onView(v,anchor);return}view=v;document.getElementById('viewHome').hidden=v!=='home';document.getElementById('viewImpact').hidden=v!=='impact';
    document.querySelectorAll('.review [data-v]').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.v===v)});
    build();var el=anchor&&document.querySelector(anchor);window.scrollTo({top:el?el.getBoundingClientRect().top+scrollY-76:0,behavior:'instant'});}
  document.querySelectorAll('.review [data-v]').forEach(function(b){b.addEventListener('click',function(){show(b.dataset.v)})});
  __on(document,'click',function(e){var a=e.target.closest('[data-go]');if(!a)return;e.preventDefault();var h=a.getAttribute('href');show(a.dataset.go,a.dataset.go==='home'&&h&&h!=='#top'?h:null);});
  var fil={p:'all',t:'all'};
  document.querySelectorAll('#stFilters .grp').forEach(function(g){g.querySelectorAll('button').forEach(function(b){b.addEventListener('click',function(){fil[g.dataset.f]=b.dataset.v;g.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed',x===b)});var n=0;document.querySelectorAll('#ipGrid .st-card').forEach(function(c){var ok=(fil.p==='all'||c.dataset.p===fil.p)&&(fil.t==='all'||c.dataset.t===fil.t);c.hidden=!ok;if(ok)n++});document.getElementById('stEmpty').hidden=n>0;})})});
  var csLinks=[].slice.call(document.querySelectorAll('#csNav a'));
  __on(window,'scroll',function(){if(view!=='impact')return;var cur=null;csLinks.forEach(function(a){var s=document.querySelector(a.getAttribute('href'));if(s&&s.getBoundingClientRect().top<200)cur=a});csLinks.forEach(function(a){a.classList.toggle('on',a===cur)})},{passive:true});
  document.getElementById('pForm').addEventListener('submit',function(e){e.preventDefault();var v=function(id){return document.getElementById(id).value};var m=document.getElementById('pfMsgOut');m.hidden=false;location.href='mailto:admin@sahaibat.com?subject='+encodeURIComponent('Partnership inquiry · '+v('pfType'))+'&body='+encodeURIComponent('Organisation type: '+v('pfType')+'\nRegion: '+v('pfRegion')+'\nInterested in: '+v('pfProd')+'\nEmail: '+v('pfEmail')+'\n\n'+v('pfMsg'));m.textContent=t({en:'Opening your email app to send the inquiry to our partnerships team.',id:'Membuka aplikasi email Anda untuk mengirim permintaan ke tim kemitraan.'})});

  // ---------- experience zone player ----------
  var E2=function(en,id){return {en:en,id:id}};
  function rows(a){return a.map(function(r){return '<div class="dm-row'+(r[3]?' on':'')+'"><b>'+r[0]+'</b><span>'+t(r[1])+'</span>'+(r[2]?'<span class="dm-tag '+(r[2][1]||'')+'">'+t(r[2][0])+'</span>':'<span></span>')+'</div>'}).join('')}
  function dmc(head,body){return '<div class="dm">'+(head?'<div class="dm-h">'+head+'</div>':'')+body+'</div>'}
  var FIC=function(){return ''};
  var DEMOS={
    kader:{steps:[
      [E2('Pick a child','Pilih anak'),E2('Two children are due at today’s Posyandu.','Dua anak dijadwalkan di Posyandu hari ini.'),function(){return dmc('<b>Posyandu Melati</b>'+FIC(),rows([['P',E2('Putri A. · 18 months','Putri A. · 18 bulan'),[E2('Due today','Jadwal hari ini')],1],['L',E2('Bima S. · 9 months','Bima S. · 9 bulan'),[E2('Due today','Jadwal hari ini')]]]))}],
      [E2('Open her visit history','Buka riwayat kunjungan'),E2('Every measurement, recorded once at the visit.','Setiap pengukuran, dicatat sekali saat kunjungan.'),function(){return dmc('<b>Putri A.</b>'+FIC(),rows([['Mei',E2('8,9 kg · 76,0 cm','8,9 kg · 76,0 cm')],['Jun',E2('9,1 kg · 77,2 cm','9,1 kg · 77,2 cm')],['Jul',E2('9,1 kg · 78,1 cm','9,1 kg · 78,1 cm')],['Agu',E2('9,0 kg · 78,9 cm','9,0 kg · 78,9 cm'),0,1]]))}],
      [E2('See who needs follow-up','Lihat siapa perlu ditindaklanjuti'),E2('Weight has not increased across three visits, so a home visit is planned.','Berat badan tidak naik dalam tiga kunjungan, jadi kunjungan rumah dijadwalkan.'),function(){return dmc('<b>'+t(E2('Follow-up list','Daftar tindak lanjut'))+'</b>',rows([['P',E2('Putri A. · home visit','Putri A. · kunjungan rumah'),[E2('Planned','Dijadwalkan'),'w'],1]]))}]],
      lock:{items:[E2('Visit registration for the whole Posyandu','Registrasi kunjungan untuk seluruh Posyandu'),E2('Follow-up workflows across the village','Alur tindak lanjut di seluruh desa'),E2('Monthly reporting','Laporan bulanan')],cta:E2('Discuss a community programme','Diskusikan program komunitas'),href:'#solutions'}},
    bidan:{steps:[
      [E2('Open a maternal profile','Buka profil ibu'),E2('One record for the whole pregnancy.','Satu catatan untuk seluruh kehamilan.'),function(){return dmc('<b>Ibu Wulan, 27</b>'+FIC(),rows([['G1',E2('First pregnancy · 28 weeks','Kehamilan pertama · 28 minggu'),0,1],['K3',E2('Last visit 4 weeks ago','Kunjungan terakhir 4 minggu lalu')]]))}],
      [E2('Choose today’s visit','Pilih kunjungan hari ini'),E2('The timeline shows where she is in her journey.','Garis waktu menunjukkan posisinya dalam perjalanan kehamilan.'),function(){return dmc('<b>K1 → K6</b>','<div class="dm-dots"><i></i><i></i><i></i><i class="on"></i><i></i><i></i></div><small style="color:#6B7D79">'+t(E2('K4 · third trimester','K4 · trimester 3'))+'</small>')}],
      [E2('Work through the checklist','Isi daftar periksa'),E2('Nothing important is missed.','Tidak ada hal penting yang terlewat.'),function(){return dmc('<b>K4</b>',rows([['✓',E2('Blood pressure','Tekanan darah'),[E2('Done','Selesai'),'ok']],['✓',E2('Fetal heart rate','Denyut jantung janin'),[E2('Done','Selesai'),'ok']],['○',E2('Birth plan discussed','Rencana persalinan'),[E2('Open','Belum')],1]]))}]],
      lock:{items:[E2('Home visits and referrals','Kunjungan rumah dan rujukan'),E2('Full maternal history','Riwayat lengkap ibu'),E2('Postpartum tracking','Pemantauan nifas')],cta:E2('Request Bidan access','Minta akses Bidan'),href:'#bidan'}},
    dok:{steps:[
      [E2('Your patient arrives','Pasien datang'),E2('History and medication are open before you start.','Riwayat dan obat sudah terbuka sebelum Anda mulai.'),function(){return dmc('<b>Bpk. Hendra S. · 41</b>'+FIC(),rows([['Rx',E2('Amlodipine 5 mg daily','Amlodipin 5 mg 1×1')],['BP',E2('128/82 · today','128/82 · hari ini'),0,1]]))}],
      [E2('The consultation becomes a draft','Konsultasi menjadi draf'),E2('Each line is traceable to what was said.','Setiap baris dapat ditelusuri ke percakapan.'),function(){return dmc('<b>SOAP</b>',rows([['S',E2('Cough 4 days, fever since yesterday','Batuk 4 hari, demam sejak kemarin'),[E2('Draft','Draf'),'d'],1],['O',E2('T 37.9 °C · BP 128/82','Suhu 37,9 °C · TD 128/82'),[E2('Draft','Draf'),'d']]]))}],
      [E2('You review and accept','Anda tinjau dan terima'),E2('Nothing is saved without you.','Tidak ada yang tersimpan tanpa Anda.'),function(){return dmc('<b>SOAP</b>',rows([['S',E2('Cough 4 days, fever since yesterday','Batuk 4 hari, demam sejak kemarin'),[E2('Accepted','Diterima'),'ok'],1],['O',E2('T 37.9 °C · BP 128/82','Suhu 37,9 °C · TD 128/82'),[E2('Accepted','Diterima'),'ok'],1]]))}]],
      lock:{items:[E2('Assessment, plan and prescriptions','Diagnosis, rencana dan resep'),E2('Registration, queue, pharmacy and cashier','Pendaftaran, antrean, apotek dan kasir'),E2('Clinic reports','Laporan klinik'),E2('Unlimited Konsensus.id','Konsensus.id tanpa batas')],cta:E2('Start your 30-day trial','Mulai uji coba gratis 30 hari'),href:'#dok'}},
    comp:{steps:[
      [E2('Your EMR, as usual','RME Anda, seperti biasa'),E2('Companion opens beside it in Chrome.','Companion terbuka di sampingnya di Chrome.'),function(){return dmc('<b>'+t(E2('Clinic EMR','RME klinik'))+'</b>',rows([['1',E2('Complaint','Keluhan'),[E2('Empty','Kosong')]],['2',E2('Examination','Pemeriksaan'),[E2('Empty','Kosong')]]]))}],
      [E2('Companion drafts the note','Companion menyusun draf'),E2('Drafted from the consultation, ready for review.','Disusun dari konsultasi, siap ditinjau.'),function(){return dmc('<b>DOK Companion</b>',rows([['S',E2('Cough 4 days, fever since yesterday','Batuk 4 hari, demam sejak kemarin'),[E2('Draft','Draf'),'d'],1],['O',E2('T 37.9 °C · BP 128/82','Suhu 37,9 °C · TD 128/82'),[E2('Draft','Draf'),'d']]]))}],
      [E2('You choose what to fill','Anda memilih yang diisi'),E2('Select fields. Nothing is submitted for you.','Pilih kolom. Tidak ada yang dikirim otomatis.'),function(){return dmc('<b>'+t(E2('Fill selected fields','Isi kolom terpilih'))+'</b>',rows([['☑',E2('Complaint','Keluhan'),0,1],['☑',E2('Examination','Pemeriksaan'),0,1],['☐',E2('Plan · you write it','Rencana · Anda tulis')]]))}]],
      lock:{items:[E2('Filling fields happens in the Chrome extension','Pengisian kolom dilakukan di ekstensi Chrome'),E2('Works beside web-based EMRs','Bekerja di samping RME berbasis web'),E2('A clear path to move your practice to DOK','Jalur jelas untuk pindah ke DOK')],cta:E2('Add to Chrome','Tambahkan ke Chrome'),href:'https://chromewebstore.google.com/detail/sahaibat-dok-companion-%E2%80%93/ipcfmeffihchgoajigaiipkcdmhpeada'}},
    code:{steps:[
      [E2('Open a case','Buka kasus'),E2('An inpatient discharge summary.','Resume medis rawat inap.'),function(){return dmc('<b>DEMO-IP-118</b>'+FIC(),'<p style="margin:0;line-height:1.6">'+t(E2('Admitted with fever and productive cough. Chest X-ray: right lower lobe consolidation. Treated with IV antibiotics.','Masuk dengan demam dan batuk berdahak. Rontgen dada: konsolidasi lobus kanan bawah. Diberi antibiotik IV.'))+'</p>')}],
      [E2('Evidence is highlighted','Bukti ditandai'),E2('What matters for coding stands out.','Yang penting untuk koding langsung terlihat.'),function(){return dmc('<b>DEMO-IP-118</b>','<p style="margin:0;line-height:1.6">'+t(E2('Admitted with fever and productive cough. Chest X-ray: <mark>right lower lobe consolidation</mark>. Treated with <mark>IV antibiotics</mark>.','Masuk dengan demam dan batuk berdahak. Rontgen dada: <mark>konsolidasi lobus kanan bawah</mark>. Diberi <mark>antibiotik IV</mark>.'))+'</p>')}],
      [E2('One suggestion, with its source','Satu saran, dengan sumbernya'),E2('The coder decides.','Koder yang memutuskan.'),function(){return dmc('<b>'+t(E2('Suggestion','Saran'))+'</b>',rows([['J18.9',E2('Pneumonia, unspecified organism','Pneumonia, organisme tidak spesifik'),[E2('For review','Ditinjau'),'d'],1]]))}]],
      lock:{items:[E2('Discrepancy review across the record','Telaah ketidaksesuaian di seluruh rekam medis'),E2('Coder decisions with reasons, fully traceable','Keputusan koder beserta alasannya, dapat ditelusuri'),E2('Claim preparation support','Dukungan persiapan klaim')],cta:E2('Request a hospital demo','Minta demo rumah sakit'),href:'#code'}},
    kasih:{steps:[
      [E2('Choose a family','Pilih keluarga'),E2('A family after a clinic visit.','Keluarga setelah kunjungan klinik.'),function(){return dmc('',  '<div class="dm-pick"><span class="on">'+t(E2('Grandmother recovering from a chest cold','Nenek pulih dari batuk pilek'))+'</span><span>'+t(E2('Child with a fever','Anak demam'))+'</span></div>')}],
      [E2('Read the care plan','Baca rencana perawatan'),E2('Clear instructions, in plain Bahasa.','Petunjuk jelas, dalam bahasa sehari-hari.'),function(){return dmc('<b>'+t(E2('Care plan','Rencana perawatan'))+'</b>',rows([['1',E2('Rest and drink plenty of water','Istirahat dan perbanyak minum')],['2',E2('Medicine as written on the label','Obat sesuai petunjuk label'),0,1]]))}],
      [E2('Get the evening reminder','Terima pengingat malam'),E2('Families can follow along.','Keluarga dapat ikut memantau.'),function(){return dmc('<b>19.00</b>',rows([['💊',E2('Evening medicine · 1 tablet after dinner','Obat malam · 1 tablet setelah makan'),[E2('Done','Selesai'),'ok'],1]]))}]],
      lock:{items:[E2('When to contact the care team','Kapan menghubungi tim perawatan'),E2('Supervised escalation','Eskalasi dengan pendampingan'),E2('Plans from your own clinic','Rencana dari klinik Anda sendiri')],cta:E2('Discover Kasih','Kenali Kasih'),href:'#kasih'}},
    kons:{steps:[
      [E2('Ask a clinical question','Ajukan pertanyaan klinis'),E2('In Bahasa or English.','Dalam Bahasa Indonesia atau Inggris.'),function(){return dmc('<b>Konsensus.id</b>','<div class="dm-row on"><b>?</b><span>tatalaksana awal hipertensi dewasa</span><span></span></div>')}],
      [E2('See the top result','Lihat hasil teratas'),E2('A summary with its source and date.','Ringkasan beserta sumber dan tanggalnya.'),function(){return dmc('<b>'+t(E2('Top result','Hasil teratas'))+'</b>',rows([['1',E2('Guideline summary: initial treatment of adult hypertension','Ringkasan pedoman: tatalaksana awal hipertensi dewasa'),[E2('Guideline','Pedoman'),'ok'],1]]))}]],
      lock:{items:[E2('Every result, with full summaries and sources','Semua hasil, dengan ringkasan dan sumber lengkap'),E2('5 free searches a day for anyone, no signup needed','5 pencarian gratis per hari untuk siapa saja, tanpa daftar'),E2('Unlimited with your DOK account','Tanpa batas dengan akun DOK')],cta:E2('Search Konsensus.id','Cari di Konsensus.id'),href:'https://konsensus.id'}},
    aes:{steps:[
      [E2('Choose a goal','Pilih tujuan'),E2('A concept preview of a treatment journey.','Pratinjau konsep perjalanan perawatan.'),function(){return dmc('',  '<div class="dm-pick"><span class="on">'+t(E2('Skin quality','Kualitas kulit'))+'</span><span>'+t(E2('Acne care','Perawatan jerawat'))+'</span><span>'+t(E2('Pigmentation','Pigmentasi'))+'</span></div>')}]],
      lock:{items:[E2('Consultation and treatment plan','Konsultasi dan rencana perawatan'),E2('Progress over time','Progres dari waktu ke waktu'),E2('Aftercare between visits','Perawatan lanjutan di antara kunjungan')],cta:E2('Join the waitlist','Daftar tunggu'),href:'#aesthetics',soon:1}}
  };
  var cur=null,ci=0;
  var LIVE={dok:1,code:1,kasih:1};
  function liveBtn(k){if(LIVE[k])return ' <button type="button" class="xzp-live" data-sbx="'+k+'">'+t(E2('Try it live','Coba langsung'))+'</button>';
    if(k==='kons')return ' <a class="xzp-live" href="https://konsensus.id" target="_blank" rel="noopener">'+t(E2('Try it live','Coba langsung'))+' ↗</a>';return ''}
  function renderPlayer(){if(!cur)return;var d=DEMOS[cur],n=d.steps.length;ci=Math.min(ci,n-1);
    document.getElementById('xzPlayer').className='xzp p-'+cur;
    document.getElementById('xzpBrand').innerHTML=LK(cur,1)+liveBtn(cur);
    document.getElementById('xzpSteps').innerHTML=d.steps.map(function(s,i){return '<li><button type="button" data-st="'+i+'"'+(i===ci?' aria-current="step"':'')+(i<ci?' class="done"':'')+'><i>'+(i<ci?'✓':i+1)+'</i><span>'+t(s[0])+'</span></button></li>'}).join('');
    var st=document.getElementById('xzpStage');
    st.innerHTML='<div class="fade" style="display:flex;flex-direction:column;gap:14px"><h4>'+t(d.steps[ci][0])+'</h4><p style="color:var(--on-teal-2)">'+t(d.steps[ci][1])+'</p>'+d.steps[ci][2]()+'</div>';
    document.getElementById('xzpBack').disabled=ci===0;var nx=document.getElementById('xzpNext'),last=ci===n-1;
    if(last){var ext=d.lock.href.indexOf('http')===0;nx.outerHTML='<a class="pri" id="xzpNext" href="'+d.lock.href+'"'+(ext?' target="_blank" rel="noopener"':'')+'>'+t(d.lock.cta)+(ext?' ↗':' →')+'</a>'}
    else{if(nx.tagName==='A')nx.outerHTML='<button type="button" class="pri" id="xzpNext"></button>';document.getElementById('xzpNext').textContent=t(E2('Next','Lanjut'))}
    document.getElementById('xzpCount').textContent=(ci+1)+' / '+n;
    document.querySelectorAll('#xz a').forEach(function(a){a.classList.toggle('sel',a.dataset.demo===cur)});}
  function openDemo(k){cur=k;ci=0;var p=document.getElementById('xzPlayer');p.hidden=false;renderPlayer();p.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});if(window.ScrollTrigger)ScrollTrigger.refresh();}
  __on(document,'click',function(e){var a=e.target.closest('[data-demo]');if(!a)return;e.preventDefault();openDemo(a.dataset.demo)});
  document.getElementById('xzPlayer').addEventListener('click',function(e){var b=e.target.closest('[data-st]');if(b){ci=+b.dataset.st;renderPlayer();return}
    if(e.target.closest('#xzpBack')&&ci>0){ci--;renderPlayer()}if(e.target.closest('button#xzpNext')){ci++;renderPlayer()}
    if(e.target.id==='xzpClose'){document.getElementById('xzPlayer').hidden=true;cur=null;document.querySelectorAll('#xz a').forEach(function(a){a.classList.remove('sel')});if(window.ScrollTrigger)ScrollTrigger.refresh();}});

  // ---------- light video loops (panorama) ----------
  var lpObs=null,saveData=!!(navigator.connection&&navigator.connection.saveData);
  function loops(){var vids=[].slice.call(document.querySelectorAll('video.lp'));if(lpObs){lpObs.disconnect();lpObs=null}
    if(!motion||reduce||saveData||!('IntersectionObserver' in window)){vids.forEach(function(v){v.pause();v.classList.remove('on')});return}
    lpObs=new IntersectionObserver(function(es){es.forEach(function(e){var v=e.target;if(e.isIntersecting){if(!v.src)v.src=v.dataset.src;var pr=v.play();if(pr&&pr.then)pr.then(function(){v.classList.add('on')}).catch(function(){})}else{v.pause()}})},{rootMargin:'200px'});
    vids.forEach(function(v){lpObs.observe(v)})}
  __on(document,'visibilitychange',function(){if(document.hidden)document.querySelectorAll('video.lp').forEach(function(v){v.pause()});else loops()});

  // ---------- live sandbox (planned) ----------
  // ---------- live mini experiences: open straight into the tool ----------
  var SBX={dok:[E2('Start free · live in 24 hours','Mulai gratis · aktif dalam 24 jam'),'#dok'],code:[E2('Request a hospital demo','Minta demo rumah sakit'),'#code'],kasih:[E2('Discover Kasih','Kenali Kasih'),'#kasih']};
  function openSbx(k){var c=SBX[k];if(!c)return;var b=document.getElementById('sbx');b.hidden=false;b.className='sbx p-'+k;
    document.getElementById('sbxName').innerHTML=LK(k,1);var cta=document.getElementById('sbxCta');cta.href=c[1];cta.textContent=t(c[0])+' →';
    ['dok','code','kasih'].forEach(function(x){document.getElementById(x+'Live').hidden=x!==k});
    if(k==='dok')dlRenderCases();else mxCases(k);if(opts.onGate)opts.onGate();
    b.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});if(window.ScrollTrigger)ScrollTrigger.refresh();}
  document.getElementById('sbxClose').addEventListener('click',function(){document.getElementById('sbx').hidden=true;if(window.ScrollTrigger)ScrollTrigger.refresh();});
  __on(document,'click',function(e){var a=e.target.closest('[data-sbx]');if(a){e.preventDefault();openSbx(a.dataset.sbx)}});

  // ---------- switch & save calculator ----------
  function rp(n){return 'Rp'+Math.round(n).toLocaleString(L==='id'?'id-ID':'en-US')}
  function calc(){var sel=document.getElementById('calcSel'),cu=document.getElementById('calcCustom'),isC=sel.value==='custom';cu.hidden=!isC;document.getElementById('calcCustomL').hidden=!isC;
    var cur=isC?(+cu.value||0):+sel.value,paid=Math.max(0,(cur-60000)*12),free=cur*12,out=document.getElementById('calcSave'),note=document.getElementById('calcNote');
    if(cur>60000){out.textContent=rp(paid)+t({en:' a year',id:' per tahun'});note.textContent=t({en:'At the Rp60K starting price, with AI scribe and image analysis included, plus 3 months extra when you switch from a monthly plan. On the free plan you save '+rp(free)+' a year.',id:'Dengan harga mulai Rp60 ribu, sudah termasuk AI scribe dan analisis gambar, plus 3 bulan ekstra jika pindah dari paket bulanan. Dengan paket gratis Anda hemat '+rp(free)+' per tahun.'})}
    else{out.textContent=rp(free)+t({en:' a year',id:' per tahun'});note.textContent=t({en:'On the free plan. Move to an all-inclusive plan from Rp60K when your practice grows.',id:'Dengan paket gratis. Pindah ke paket semua termasuk mulai Rp60 ribu saat praktik Anda berkembang.'})}}
  document.getElementById('calcSel').addEventListener('change',calc);document.getElementById('calcCustom').addEventListener('input',calc);

  // ---------- live mini DOK (real AI, controlled) ----------
  var DL_CASES=[
    {id:'cough',t:E2('Cough and fever · adult','Batuk dan demam · dewasa'),tx:'Pasien laki-laki 41 tahun.\nDokter: Sudah berapa lama batuknya, Pak?\nPasien: Sudah empat hari, Dok. Demam sejak kemarin.\nDokter: Ada sesak napas atau nyeri dada?\nPasien: Tidak, cuma tenggorokan sakit.\nDokter: Obat darah tinggi masih diminum rutin?\nPasien: Masih, Dok, amlodipin tiap pagi.\nPerawat: Suhu 37,9, tensi 128/82, nadi 84, saturasi 98.'},
    {id:'diarrhoea',t:E2('Diarrhoea · child, 2 years','Diare · anak 2 tahun'),tx:'Anak perempuan 2 tahun diantar ibunya.\nIbu: Anak saya mencret sejak kemarin, kira-kira lima kali sehari, cair, tidak ada darah.\nDokter: Muntah?\nIbu: Muntah sekali tadi pagi.\nDokter: Masih mau minum? Masih kencing?\nIbu: Masih mau minum, kencing agak jarang.\nDokter: Demam?\nIbu: Sumeng sedikit.\nPerawat: Suhu 37,8, berat 11,2 kg.'},
    {id:'htn',t:E2('Headache · hypertension follow-up','Sakit kepala · kontrol hipertensi'),tx:'Pasien perempuan 56 tahun, riwayat hipertensi.\nPasien: Kepala belakang sakit sudah tiga hari, Dok.\nDokter: Obatnya rutin?\nPasien: Seminggu ini lupa minum amlodipinnya.\nDokter: Ada lemah sebelah badan, bicara pelo, atau pandangan kabur?\nPasien: Tidak ada, Dok.\nPerawat: Tensi 162/98, nadi 88.'}];
  var dlSel='cough',dlLeft=3,dlCtl=null,dlDraft=null,dlOk={};
  function dlRenderCases(){document.getElementById('dlCases').innerHTML=DL_CASES.map(function(c){return '<button type="button" role="radio" aria-checked="'+(c.id===dlSel)+'" data-case="'+c.id+'"><b>'+t(c.t)+'</b></button>'}).join('');
    document.getElementById('dlLeft').textContent=t(E2(dlLeft+' of 3 live drafts left in this session',dlLeft+' dari 3 draf langsung tersisa di sesi ini'));document.getElementById('dlGo').disabled=dlLeft<=0;}
  function dlGuard(txt){if(/\b\d{16}\b/.test(txt.replace(/[\s.-]/g,' ')))return E2('Remove the 16-digit ID number.','Hapus nomor 16 digit (NIK).');
    if(/(\+62|\b0)8\d{7,11}\b/.test(txt.replace(/[\s-]/g,'')))return E2('Remove the phone number.','Hapus nomor telepon.');
    if(/[\w.+-]+@[\w-]+\.[\w.]+/.test(txt))return E2('Remove the email address.','Hapus alamat email.');
    if(txt.trim().length<40)return E2('Describe the case in a few sentences.','Jelaskan kasus dalam beberapa kalimat.');return null}
  async function apiJson(product,text,signal){
    var token=opts.getToken?await opts.getToken():null,r;
    try{r=await fetch('/api/experience/'+product,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({text:text,lang:L,token:token}),signal:signal})}
    catch(e){throw {code:e&&e.name==='AbortError'?'cancelled':'network'}}
    var d=await r.json().catch(function(){return null});
    if(!r.ok||!d)throw {code:(d&&d.code)||'error'};
    return d.result}
  function esc(x){return String(x==null?'':x).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function dlRenderDraft(){var o=document.getElementById('dlOut');if(!dlDraft)return;var d=dlDraft;
    var secs=[['S',d.s],['O',d.o],['A',d.a+(Array.isArray(d.icd)&&d.icd.length?'\n'+d.icd.map(function(i){return esc(i.code)+' · '+esc(i.label)}).join('\n'):'')],['P',d.p]];
    var all=secs.every(function(x){return dlOk[x[0]]});
    o.innerHTML=secs.map(function(x){var ok=dlOk[x[0]];return '<div class="dl-row'+(ok?' ok':'')+'"><b>'+x[0]+'</b><div><div data-sec="'+x[0]+'" style="white-space:pre-line">'+esc(x[1])+'</div>'+(ok||dlSigned?'':'<div class="dl-acts"><button type="button" class="pri" data-acc="'+x[0]+'">'+t(E2('Accept','Terima'))+'</button><button type="button" data-edit="'+x[0]+'">'+t(E2('Edit','Ubah'))+'</button></div>')+'</div><span class="dl-tag'+(ok?' ok':'')+'">'+t(ok?E2('Accepted','Diterima'):E2('AI draft','Draf AI'))+'</span></div>'}).join('')
      +(Array.isArray(d.red_flags)&&d.red_flags.length?'<div class="dl-box flag"><b>'+t(E2('Red flags to check','Tanda bahaya yang perlu dicek'))+'</b><ul>'+d.red_flags.slice(0,4).map(function(r){return '<li>'+esc(r)+'</li>'}).join('')+'</ul></div>':'')
      +(Array.isArray(d.questions)&&d.questions.length?'<div class="dl-box q"><b>'+t(E2('Worth asking','Perlu ditanyakan'))+'</b><ul>'+d.questions.slice(0,3).map(function(r){return '<li>'+esc(r)+'</li>'}).join('')+'</ul></div>':'')
      +(dlSigned?'<div class="dl-lock"><b>'+t(E2('Signed by you. Record saved in this demo only.','Ditandatangani Anda. Tersimpan hanya di demo ini.'))+'</b><span>'+t(E2('Prescriptions, queue, pharmacy, cashier, reports and SATUSEHAT sync are waiting in the full product.','Resep, antrean, apotek, kasir, laporan dan sinkron SATUSEHAT ada di produk lengkap.'))+'</span><a class="b1" href="#dok">'+t(E2('Start free · live in 24 hours','Mulai gratis · aktif dalam 24 jam'))+' →</a></div>'
        :'<button type="button" class="dl-sign" id="dlSign"'+(all?'':' disabled')+'>'+t(E2('Sign record','Tanda tangani'))+'</button>')
      +'<small class="muted">'+t(E2('Live AI draft for clinician review. Not a diagnosis. Nothing typed here is stored.','Draf AI langsung untuk ditinjau dokter. Bukan diagnosis. Tidak ada yang diketik di sini disimpan.'))+'</small>';}
  var dlSigned=false;
  async function dlGenerate(){var err=document.getElementById('dlErr');err.hidden=true;if(dlLeft<=0)return;
    var own=document.getElementById('dlText').value.trim(),tx=own||DL_CASES.filter(function(c){return c.id===dlSel})[0].tx;
    if(own){var g=dlGuard(own);if(g){err.textContent=t(g);err.hidden=false;return}}
    var out=document.getElementById('dlOut');
    
    dlCtl=new AbortController();var go=document.getElementById('dlGo'),stop=document.getElementById('dlStop');go.disabled=true;stop.hidden=false;dlDraft=null;dlOk={};dlSigned=false;
    out.innerHTML='<p class="dl-think">'+t(E2('Thinking… drafting from the consultation','Berpikir… menyusun dari konsultasi'))+'</p>';
    try{var d=await apiJson('dok',tx,dlCtl.signal);
      if(!d||d.error||typeof d.s!=='string'){out.innerHTML='<p class="muted">'+t(E2('That doesn’t look like a consultation. Try one of the sample cases.','Itu tidak tampak seperti konsultasi. Coba salah satu kasus contoh.'))+'</p>'}
      else{dlLeft--;dlDraft=d;dlRenderDraft()}}
    catch(e){var m={disabled:E2('The live demo is resting right now. Try the guided demo above.','Demo langsung sedang istirahat. Coba demo terpandu di atas.'),limit:E2('You have reached today’s live runs. Start free with DOK for the full product.','Batas percobaan hari ini tercapai. Mulai gratis dengan DOK untuk produk lengkap.'),verify:E2('Checking you are not a bot. Try again in a moment.','Memastikan Anda bukan bot. Coba lagi sebentar.'),guard:E2('Please remove ID numbers, phone numbers and emails.','Mohon hapus NIK, nomor telepon dan email.'),not_granted:E2('Live AI was not allowed for this page.','AI langsung tidak diizinkan untuk halaman ini.'),rate_limited:E2('Too many requests. Try again in a minute.','Terlalu banyak permintaan. Coba lagi sebentar lagi.'),invalid_json:E2('The draft came back incomplete. Try again.','Draf tidak lengkap. Coba lagi.'),refused:E2('That request can’t be drafted. Try a sample case.','Permintaan itu tidak bisa disusun. Coba kasus contoh.')};
      out.innerHTML=e&&e.code==='cancelled'?'<p class="muted">'+t(E2('Stopped.','Dihentikan.'))+'</p>':'<p class="muted">'+t(m[e&&e.code]||E2('Something went wrong. Try again.','Terjadi kendala. Coba lagi.'))+'</p>'}
    finally{stop.hidden=true;dlRenderCases()}}
  document.getElementById('dokLive').addEventListener('click',function(e){var c=e.target.closest('[data-case]');if(c){dlSel=c.dataset.case;document.getElementById('dlText').value='';dlRenderCases();return}
    if(e.target.closest('#dlGo')){dlGenerate();return}if(e.target.closest('#dlStop')&&dlCtl){dlCtl.abort();return}
    var a=e.target.closest('[data-acc]');if(a){var el=document.querySelector('#dlOut [data-sec="'+a.dataset.acc+'"]');if(el&&el.isContentEditable&&dlDraft){var k={S:'s',O:'o',A:'a',P:'p'}[a.dataset.acc];if(k!=='a')dlDraft[k]=el.innerText}dlOk[a.dataset.acc]=1;dlRenderDraft();return}
    var ed=e.target.closest('[data-edit]');if(ed){var el2=document.querySelector('#dlOut [data-sec="'+ed.dataset.edit+'"]');if(el2){el2.contentEditable='true';el2.focus()}return}
    var sg=e.target.closest('#dlSign');if(sg&&!sg.disabled){dlSigned=true;dlRenderDraft()}});

  // ---------- live mini Code + Kasih ----------
  var CODE_CASES=[
    {id:'pneu',t:E2('Pneumonia with diabetes · 4 days','Pneumonia dengan diabetes · 4 hari'),tx:'Resume medis. Pasien laki-laki 63 tahun, rawat inap 4 hari. Keluhan: demam dan batuk berdahak 5 hari. Rontgen dada: konsolidasi lobus kanan bawah. Gula darah sewaktu 248 mg/dL saat masuk. Riwayat diabetes melitus tipe 2, minum metformin. Terapi: antibiotik intravena, insulin selama rawat. Diagnosis akhir: pneumonia. Pulang dengan kondisi membaik.'},
    {id:'dengue',t:E2('Dengue · 3 days','Demam berdarah · 3 hari'),tx:'Resume medis. Perempuan 19 tahun, rawat inap 3 hari. Demam tinggi 3 hari, nyeri otot, mimisan satu kali. Trombosit 62.000/uL pada hari ke-2, hematokrit naik 20 persen. NS1 positif. Terapi cairan intravena. Diagnosis: demam berdarah dengue. Pulang dengan trombosit 128.000/uL.'},
    {id:'sc',t:E2('Caesarean delivery · 3 days','Persalinan sesar · 3 hari'),tx:'Resume medis. Perempuan 31 tahun G2P1, usia kehamilan 39 minggu, riwayat seksio sesarea sebelumnya. Dilakukan seksio sesarea elektif, bayi lahir hidup 3.100 g. Perdarahan 600 mL. Hb pasca operasi 9,1 g/dL. Diagnosis: persalinan dengan seksio sesarea. Pulang hari ke-3.'}];
  var KASIH_CASES=[
    {id:'ispa',t:E2('Chest cold · grandmother, 68','Batuk pilek · nenek 68 tahun'),tx:'Ringkasan kunjungan. Pasien perempuan 68 tahun dengan ISPA. Instruksi dokter: istirahat cukup, minum air hangat minimal 8 gelas sehari. Parasetamol 500 mg 3 kali sehari bila demam. Kontrol 3 hari lagi bila belum membaik. Segera kembali bila sesak napas atau demam lebih dari 3 hari.'},
    {id:'diare',t:E2('Diarrhoea · child, 2','Diare · anak 2 tahun'),tx:'Ringkasan kunjungan. Anak 2 tahun dengan diare akut tanpa dehidrasi berat. Instruksi dokter: beri oralit setengah gelas setiap kali mencret, zinc 1 tablet sehari selama 10 hari, tetap beri ASI dan makan seperti biasa. Segera kembali bila anak lemas, tidak mau minum, ada darah di tinja, atau tidak kencing selama 6 jam.'},
    {id:'ht',t:E2('High blood pressure · 56','Darah tinggi · 56 tahun'),tx:'Ringkasan kunjungan. Pasien perempuan 56 tahun dengan hipertensi tidak terkontrol karena lupa minum obat. Instruksi dokter: amlodipin 5 mg satu kali setiap pagi, jangan terlewat. Kurangi garam, jalan kaki 30 menit setiap hari. Cek tensi minggu depan di posbindu. Segera ke IGD bila nyeri kepala hebat, lemah sebelah badan, atau bicara pelo.'}];
  var MX={code:{cases:CODE_CASES,sel:'pneu',left:3,ctl:null,res:null,st:{}},kasih:{cases:KASIH_CASES,sel:'ispa',left:3,ctl:null,res:null}};
  function mxCases(p){var m=MX[p];document.getElementById(p+'Cases').innerHTML=m.cases.map(function(c){return '<button type="button" role="radio" aria-checked="'+(c.id===m.sel)+'" data-mcase="'+c.id+'"><b>'+t(c.t)+'</b></button>'}).join('');
    document.getElementById(p+'Left').textContent=t(E2(m.left+' of 3 live runs left in this session',m.left+' dari 3 percobaan langsung tersisa di sesi ini'));document.getElementById(p+'Go').disabled=m.left<=0;}
  function markSrc(tx,items){var h=esc(tx);(items||[]).forEach(function(it){var q=it&&it.q?String(it.q).trim():'';if(q.length<3)return;var e=esc(q);var i=h.indexOf(e);if(i>=0)h=h.slice(0,i)+'<mark'+(it.cls?' class="'+it.cls+'"':'')+'>'+e+'</mark>'+h.slice(i+e.length)});return h}
  var CROLE={primary:E2('primary','utama'),secondary:E2('secondary','sekunder'),procedure:E2('procedure','prosedur')},CCONF={high:E2('high','tinggi'),medium:E2('medium','sedang'),low:E2('low','rendah')};
  function codeRender(){var m=MX.code,r=m.res,o=document.getElementById('codeOut');if(!r)return;var tx=m.tx;
    var marks=(r.codes||[]).map(function(c){return {q:c.evidence}}).concat((r.queries||[]).map(function(q){return {q:q.evidence,cls:'q'}}));
    var rows=(r.codes||[]).slice(0,5).map(function(c,i){var st=m.st[i]||'';return '<div class="cd-row '+(st==='ok'?'ok':st==='no'?'no':st==='qy'?'qy':'')+'"><code>'+esc(c.code)+'</code><div>'+esc(c.label)+'<small>'+esc(c.system)+' · '+esc(t(CROLE[c.role]||c.role))+' · '+t(E2('confidence','keyakinan'))+' '+esc(t(CCONF[c.confidence]||c.confidence))+'</small><small>“'+esc(c.evidence)+'”</small>'+(st?'':'<div class="dl-acts"><button type="button" class="pri" data-cst="'+i+':ok">'+t(E2('Accept','Terima'))+'</button><button type="button" data-cst="'+i+':no">'+t(E2('Reject','Tolak'))+'</button><button type="button" data-cst="'+i+':qy">'+t(E2('Query doctor','Tanya dokter'))+'</button></div>')+'</div><span class="dl-tag'+(st==='ok'?' ok':'')+'">'+t(st==='ok'?E2('Accepted','Diterima'):st==='no'?E2('Rejected','Ditolak'):st==='qy'?E2('Query sent','Klarifikasi'):E2('Suggestion','Saran'))+'</span></div>'}).join('');
    var done=(r.codes||[]).slice(0,5).every(function(c,i){return m.st[i]});
    o.innerHTML='<div class="src-doc">'+markSrc(tx,marks)+'</div>'+(r.summary?'<p style="font-size:.82rem;color:#4B605C">'+esc(r.summary)+'</p>':'')+rows
      +((r.queries||[]).length?'<div class="dl-box flag"><b>'+t(E2('Documentation to query','Dokumentasi untuk diklarifikasi'))+'</b><ul>'+r.queries.slice(0,3).map(function(q){return '<li>'+esc(q.issue)+'</li>'}).join('')+'</ul></div>':'')
      +(done?'<div class="dl-lock"><b>'+t(E2('Review complete. Every decision is yours and traceable.','Telaah selesai. Setiap keputusan milik Anda dan dapat ditelusuri.'))+'</b><span>'+t(E2('Claim preparation, case grouping, audit trail and team workflow are in the full product.','Persiapan klaim, pengelompokan kasus, jejak audit dan alur kerja tim ada di produk lengkap.'))+'</span><a class="b1" href="#code">'+t(E2('Request a hospital demo','Minta demo rumah sakit'))+' →</a></div>':'')
      +'<small class="muted">'+t(E2('Live AI suggestions for a certified coder. Nothing is stored.','Saran AI langsung untuk koder bersertifikat. Tidak ada yang disimpan.'))+'</small>';}
  function kasihRender(){var r=MX.kasih.res,o=document.getElementById('kasihOut');if(!r)return;
    o.innerHTML='<div class="kphone"><div class="top"><span>Kasih</span><span>'+t(E2('Demo','Demo'))+'</span></div>'
      +'<div class="kc2"><small>'+t(E2('Your care plan','Rencana perawatan'))+'</small><b>'+esc(r.title)+'</b><ul>'+(r.steps||[]).slice(0,5).map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul></div>'
      +((r.reminders||[]).length?'<div class="kc2"><small>'+t(E2('Reminders','Pengingat'))+'</small>'+r.reminders.slice(0,4).map(function(x){return '<div class="rm"><b>'+esc(x.time)+'</b><span>'+esc(x.text)+'</span></div>'}).join('')+'</div>':'')
      +((r.warning_signs||[]).length?'<div class="kc2 warn"><small>'+t(E2('When to contact the care team','Kapan menghubungi tim perawatan'))+'</small><ul>'+r.warning_signs.slice(0,4).map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul><span style="font-size:.74rem;color:#7A3324">'+t(E2('In an emergency, go to the nearest IGD. Kasih is not an emergency service.','Dalam keadaan darurat, segera ke IGD terdekat. Kasih bukan layanan darurat.'))+'</span></div>':'')
      +(r.next_visit?'<div class="kc2"><small>'+t(E2('Next visit','Kunjungan berikutnya'))+'</small>'+esc(r.next_visit)+'</div>':'')+'</div>'
      +'<div class="dl-lock"><b>'+t(E2('Sending reminders on WhatsApp and sharing with family happen in the full product.','Pengingat lewat WhatsApp dan berbagi dengan keluarga ada di produk lengkap.'))+'</b><a class="b1" href="#kasih">'+t(E2('Discover Kasih','Kenali Kasih'))+' →</a></div>'
      +'<small class="muted">'+t(E2('Live AI from the doctor’s written instructions only. Nothing is stored.','AI langsung hanya dari instruksi tertulis dokter. Tidak ada yang disimpan.'))+'</small>';}
  async function mxRun(p){var m=MX[p],err=document.getElementById(p+'Err');err.hidden=true;if(m.left<=0)return;
    var own=document.getElementById(p+'Text').value.trim(),tx=own||m.cases.filter(function(c){return c.id===m.sel})[0].tx;
    if(own){var g=dlGuard(own);if(g){err.textContent=t(g);err.hidden=false;return}}
    var out=document.getElementById(p+'Out');
    
    m.ctl=new AbortController();var go=document.getElementById(p+'Go'),stop=document.getElementById(p+'Stop');go.disabled=true;stop.hidden=false;m.res=null;m.st={};m.tx=tx;
    out.innerHTML='<p class="dl-think">'+t(p==='code'?E2('Thinking… reading the case for evidence','Berpikir… membaca kasus untuk mencari bukti'):E2('Thinking… writing the plan in plain words','Berpikir… menulis rencana dengan bahasa sederhana'))+'</p>';
    try{var r=await apiJson(p,tx,m.ctl.signal);
      var bad=!r||r.error||(p==='code'?!Array.isArray(r.codes):!Array.isArray(r.steps));
      if(bad){out.innerHTML='<p class="muted">'+t(E2('That doesn’t look like a clinical text. Try one of the sample cases.','Itu tidak tampak seperti teks klinis. Coba salah satu kasus contoh.'))+'</p>'}
      else{m.left--;m.res=r;p==='code'?codeRender():kasihRender()}}
    catch(e){var mm={disabled:E2('The live demo is resting right now. Try the guided demo above.','Demo langsung sedang istirahat. Coba demo terpandu di atas.'),limit:E2('You have reached today’s live runs. Start free with DOK for the full product.','Batas percobaan hari ini tercapai. Mulai gratis dengan DOK untuk produk lengkap.'),verify:E2('Checking you are not a bot. Try again in a moment.','Memastikan Anda bukan bot. Coba lagi sebentar.'),guard:E2('Please remove ID numbers, phone numbers and emails.','Mohon hapus NIK, nomor telepon dan email.'),not_granted:E2('Live AI was not allowed for this page.','AI langsung tidak diizinkan untuk halaman ini.'),rate_limited:E2('Too many requests. Try again in a minute.','Terlalu banyak permintaan. Coba lagi sebentar lagi.'),invalid_json:E2('The result came back incomplete. Try again.','Hasil tidak lengkap. Coba lagi.'),refused:E2('That request can’t be processed. Try a sample case.','Permintaan itu tidak bisa diproses. Coba kasus contoh.')};
      out.innerHTML=e&&e.code==='cancelled'?'<p class="muted">'+t(E2('Stopped.','Dihentikan.'))+'</p>':'<p class="muted">'+t(mm[e&&e.code]||E2('Something went wrong. Try again.','Terjadi kendala. Coba lagi.'))+'</p>'}
    finally{stop.hidden=true;mxCases(p)}}
  ['code','kasih'].forEach(function(p){document.getElementById(p+'Live').addEventListener('click',function(e){var c=e.target.closest('[data-mcase]');if(c){MX[p].sel=c.dataset.mcase;document.getElementById(p+'Text').value='';mxCases(p);return}
    if(e.target.closest('#'+p+'Go')){mxRun(p);return}if(e.target.closest('#'+p+'Stop')&&MX[p].ctl){MX[p].ctl.abort();return}
    var cs=e.target.closest('[data-cst]');if(cs){var a=cs.dataset.cst.split(':');MX.code.st[+a[0]]=a[1];codeRender()}})});
  // ---------- motion storytelling ----------
  var motion=true,mm=null,touched={vis:0,tl:0,ev:0};
  function setB(i,p){var ring=document.getElementById('btRing');if(!ring)return;var f=p==null?i/7:p;ring.style.left='calc(5px + (100% - 10px) * '+f.toFixed(3)+')';document.querySelectorAll('#bTrack i').forEach(function(d,j){d.classList.toggle('on',j<=i)});var v=TL[i];document.getElementById('btLabel').textContent=(v[0]==='birth'?'':v[0]==='KF'?'KF · ':v[0]+' · ')+t(v[1]);}
  function storyDots(p){var i=Math.min(5,Math.round(p*5));document.querySelectorAll('#storyDots i').forEach(function(d,j){d.classList.toggle('on',j<=i)});}
  document.getElementById('storyScroll').addEventListener('scroll',function(e){var el=e.currentTarget,m=el.scrollWidth-el.clientWidth;if(m>0)storyDots(el.scrollLeft/m)},{passive:true});
  function syncVis(p){if(touched.vis)return;var i=Math.min(3,Math.floor(p*4));if(i!==vis){vis=i;renderVisits();}}
  function syncTL(p){var i=Math.min(7,Math.floor(p*8));setB(i,Math.min(1,p));if(!touched.tl&&i!==tl){tl=i;renderTL();}}
  function syncEv(p){if(touched.ev)return;var i=Math.min(3,Math.floor(p*4));if(i!==ev){ev=i;renderEv();}}
  function dokProg(p){var th=TH[dm],i=0;while(i<4&&p>=th[i])i++;if(i!==dsIdx)setDok(i);document.getElementById('dsM').textContent=p>.9?4:3;}
  function kasihTime(p){document.getElementById('kTime').textContent=p<.4?'08.00':p<.75?'19.00':t({en:'Day 3',id:'Hari 3'});}
  function fmtN(n){return n.toLocaleString(L==='id'?'id-ID':'en-US')}
  function fixCounts(){document.querySelectorAll('.cnt').forEach(function(el){el.textContent=fmtN(+el.dataset.n)+(el.dataset.s||'')})}
  function build(){
    if(mm){mm.revert();mm=null;}
    fixCounts();loops();
    body.classList.toggle('nomo',!motion);
    if(!motion||!window.gsap||!window.ScrollTrigger){var kq0=document.getElementById('ksQ');if(kq0)kq0.textContent='tatalaksana awal hipertensi dewasa';vis=touched.vis?vis:3;ev=touched.ev?ev:0;tl=touched.tl?tl:4;dsIdx=4;renderVisits();renderEv();renderTL();setDok(4);document.getElementById('dsM').textContent=4;document.getElementById('kTime').textContent='19.00';return;}
    gsap.registerPlugin(ScrollTrigger);
    mm=gsap.matchMedia();
    mm.add({desk:'(min-width:900px)',pinOk:'(min-width:900px) and (min-height:700px)',rm:'(prefers-reduced-motion: reduce)'},function(ctx){
      var c=ctx.conditions;if(c.rm)return;
      function st(trg,o){return c.desk?Object.assign({trigger:trg,start:'top 78%',end:'bottom 40%',scrub:.6},o||{}):{trigger:trg,start:'top 75%',toggleActions:'play none none none'}}
      // hero: slow push-in, record card arrives, gentle parallax
      gsap.fromTo('#heroImg',{scale:1.12},{scale:1,duration:2.6,ease:'power2.out'});
      gsap.from('#heroFloat',{opacity:0,y:18,duration:.8,delay:1.5,ease:'power2.out'});
      if(c.desk)gsap.to('#heroKb',{yPercent:8,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
      // story panorama: pinned horizontal film, thread draws as the day moves
      var tr=document.getElementById('storyTrack');
      if(c.pinOk){var dist=function(){return Math.max(0,tr.scrollWidth-window.innerWidth)};
        gsap.timeline({scrollTrigger:{trigger:'#story',pin:true,scrub:.6,start:'top top',end:function(){return '+='+dist()},invalidateOnRefresh:true,onUpdate:function(s){storyDots(s.progress)}}})
          .to(tr,{x:function(){return -dist()},ease:'none'},0)
          .fromTo('#storyThread',{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0% 0 0)',ease:'none'},0)
          .fromTo('.sp .im img, .sp .im video',{scale:1.14},{scale:1,ease:'none'},0);
      }else{
        gsap.fromTo('#storyThread',{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0% 0 0)',duration:2.4,ease:'power1.inOut',scrollTrigger:{trigger:'#story',start:'top 70%'}});
      }
      // photographs breathe as they pass
      gsap.utils.toArray('.scene img.bg, .imp-photos .photo img').forEach(function(im){gsap.fromTo(im,{scale:1.16,yPercent:-4},{scale:1.02,yPercent:4,ease:'none',scrollTrigger:{trigger:im.parentNode,start:'top bottom',end:'bottom top',scrub:true}})});
      // kader: record card rises from the point of care, growth plotted visit by visit
      var kt=gsap.timeline({scrollTrigger:st('#kScene'),onUpdate:function(){syncVis(kt.progress())}});
      kt.from('#kFloat',{opacity:0,y:28,duration:.5})
        .fromTo('.kc-line',{strokeDasharray:1,strokeDashoffset:1},{strokeDashoffset:0,duration:1.6,ease:'none'},.5)
        .from('.kc-pts circle',{scale:0,duration:.25,stagger:.5,ease:'back.out(2)'},.45)
        .from('.kc-chip',{opacity:0,y:8,duration:.4},2.2);
      // bidan: the journey advances from K1 to postnatal
      var bt=gsap.timeline({scrollTrigger:st('#bScene'),onUpdate:function(){syncTL(bt.progress())}});
      bt.from('#bFloat',{opacity:0,y:24,duration:.4}).to({},{duration:3.2});
      // dok: conversation becomes a reviewed, signed record
      var dt=gsap.timeline({scrollTrigger:c.desk?{trigger:'#dScene',start:'top 80%',end:'bottom 20%',scrub:.6}:{trigger:'#dScene',start:'top 70%',toggleActions:'play none none none'},onUpdate:function(){dokProg(dt.progress())}});
      dt.set('.ds-wave',{opacity:1},0).set('.ds-tx',{opacity:1},0).set('.ds-soap em.d',{opacity:1},0).set('.ds-soap em.a',{opacity:0},0).set('.ds-stamp',{opacity:0,scale:1.5},0).set('#dsBar',{width:'20%'},0)
        .fromTo('.ds-tx p',{opacity:0,y:14},{opacity:1,y:0,duration:.4,stagger:.4},.4)
        .to('.ds-wave',{opacity:0,duration:.4},2.0)
        .to('.ds-tx p',{opacity:0,y:-16,scale:.94,duration:.4,stagger:.06},2.2)
        .fromTo('.ds-soap .r',{opacity:0,x:18},{opacity:1,x:0,duration:.4,stagger:.25},2.5)
        .to('.ds-soap em.d',{opacity:0,duration:.25,stagger:.25},3.8)
        .to('.ds-soap em.a',{opacity:1,duration:.25,stagger:.25},3.8)
        .to('.ds-stamp',{opacity:1,scale:1,duration:.35,ease:'back.out(2)'},5.0)
        .to('#dsBar',{width:'26.7%',duration:.5},5.4);
      // companion: fields fill from the side panel
      var cp=gsap.timeline({scrollTrigger:st('#compScene')});
      cp.from('#compScene .cpanel .row',{opacity:0,x:16,duration:.35,stagger:.3})
        .from('#compScene .emr .fld .fv',{opacity:0,duration:.3,stagger:.4},1.2)
        .from('#compScene .emr .fld',{borderColor:'#D7DEDC',backgroundColor:'#ffffff',duration:.3,stagger:.4},1.2);
      // konsensus: query types, evidence arrives
      var kq=document.getElementById('ksQ'),kqt=kq.textContent;
      var ks=gsap.timeline({scrollTrigger:c.desk?{trigger:'#ksScene',start:'top 80%',end:'center 45%',scrub:.5}:{trigger:'#ksScene',start:'top 75%',toggleActions:'play none none none'},onUpdate:function(){var p=Math.min(1,ks.progress()/.45);kq.textContent=kqt.slice(0,Math.round(p*kqt.length))}});
      ks.to({},{duration:1.2}).from('.ks-r',{opacity:0,y:16,duration:.4,stagger:.3}).from('.ks-dok',{opacity:0,y:10,duration:.4});
      // code: tabs advance with the reader; highlights sweep the source
      gsap.from('#code .ev',{y:30,opacity:0,duration:.7,scrollTrigger:{trigger:'#code .ev',start:'top 88%'}});
      ScrollTrigger.create({trigger:'#code .ev',start:'top 65%',end:'bottom 15%',onUpdate:function(s){syncEv(s.progress)}});
      // kasih: a day passes from morning plan to evening reminder to day 3
      var ka=gsap.timeline({scrollTrigger:st('#kStage',{end:'bottom 55%'}),onUpdate:function(){kasihTime(ka.progress())}});
      ka.from('.kasih-phone',{y:40,opacity:0,duration:.6}).from('.kc',{opacity:0,y:20,duration:.4,stagger:.8},.5).fromTo('#kNight',{opacity:0},{opacity:1,duration:2.4,ease:'none'},.5);
      // aesthetics, experience zone, settings, closing
      gsap.from('.aes-path > div',{opacity:0,x:-18,duration:.5,stagger:.3,scrollTrigger:{trigger:'.aes-path',start:'top 80%'}});
      gsap.from('#xz a',{opacity:0,y:30,duration:.6,stagger:.1,scrollTrigger:{trigger:'#xz',start:'top 82%'}});
      gsap.fromTo('#xz svg',{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0% 0 0)',duration:1.2,stagger:.12,ease:'power1.inOut',scrollTrigger:{trigger:'#xz',start:'top 82%'}});
      gsap.fromTo('#setThread',{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0% 0 0)',ease:'none',scrollTrigger:{trigger:'.settings',start:'top 90%',end:'top 50%',scrub:.5}});
      gsap.from('.settings div',{opacity:0,y:16,stagger:.15,duration:.5,scrollTrigger:{trigger:'.settings',start:'top 88%'}});
      // counters count up once
      gsap.utils.toArray('.cnt').forEach(function(el){if(el.offsetParent===null)return;var n=+el.dataset.n,o={v:0};gsap.to(o,{v:n,duration:1.8,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 88%'},onUpdate:function(){el.textContent=fmtN(Math.round(o.v))+(el.dataset.s||'')},onComplete:function(){el.textContent=fmtN(n)+(el.dataset.s||'')}})});
      // stories: cards rise in, partnership thread draws, case timeline grows
      gsap.utils.toArray('.st-grid').forEach(function(g){if(g.offsetParent===null)return;gsap.from(g.querySelectorAll('.st-card'),{opacity:0,y:30,duration:.6,stagger:.12,scrollTrigger:{trigger:g,start:'top 82%'}})});
      gsap.utils.toArray('.st-thread').forEach(function(sv){gsap.fromTo(sv,{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0% 0 0)',duration:1.4,ease:'power1.inOut',scrollTrigger:{trigger:sv,start:'top 85%'}})});
      if(document.getElementById('csMil').offsetParent){gsap.fromTo('.mil-line',{scaleY:0},{scaleY:1,ease:'none',scrollTrigger:{trigger:'#csMil',start:'top 75%',end:'bottom 55%',scrub:.5}});
        gsap.from('#csMil > div',{opacity:0,x:-12,duration:.4,stagger:.15,scrollTrigger:{trigger:'#csMil',start:'top 75%'}});
        gsap.from('.fig',{opacity:0,y:24,duration:.6,stagger:.12,scrollTrigger:{trigger:'.figs',start:'top 85%'}});}
    });
    requestAnimationFrame(function(){ScrollTrigger.refresh()});
  }
  document.querySelectorAll('[data-mo]').forEach(function(b){b.addEventListener('click',function(){motion=b.dataset.mo==='1';document.querySelectorAll('[data-mo]').forEach(function(x){x.setAttribute('aria-pressed',x===b)});build();})});
  renderAll();
  build();
  __on(window,'load',function(){if(window.ScrollTrigger)ScrollTrigger.refresh()});
  if(opts.view==='impact')show('impact',null,true);
  if(opts.onReady)opts.onReady({show:show,setLang:setLang,openGate:function(){if(opts.onGate)opts.onGate()}});

  return function(){
    __subs.forEach(function(s){s[0].removeEventListener(s[1],s[2],s[3])});
    if(mm)mm.revert();if(lpObs)lpObs.disconnect();if(dlCtl)dlCtl.abort();
  };
}
