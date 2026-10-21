// components/redesign/flows.js
//
// The live Experience Zone flows for Kader, Bidan, DOK, Code and Kasih. Each one
// is a single AI call (app/api/experience) rendered as five stages with a real
// stopwatch, ending in one click that finishes the job: the Posyandu report for
// Kader, the digital KIA book for Bidan, SATUSEHAT for DOK, e-Klaim for Code,
// WhatsApp for Kasih. The point is the convenience, not the raw output.
//
// Kader growth status and Bidan risk flags are computed on the server in code
// (WHO standards, fixed thresholds); the AI only writes plans and messages.
//
// The stopwatch is real (request start to answer). While waiting, the stage
// list animates as a progress indicator; per-stage times are never invented.

export function createFlows(ctx) {
  var t = ctx.t, E2 = ctx.E2, esc = ctx.esc;
  var $ = function (id) { return document.getElementById(id); };

  var STAGES = {
    kader: [
      E2('Growth status (WHO)', 'Status gizi (standar WHO)'),
      E2('Weight trend', 'Tren berat badan'),
      E2('Follow-up plan', 'Rencana tindak lanjut'),
      E2('Referral', 'Rujukan'),
      E2('Message to the mother', 'Pesan untuk ibu'),
    ],
    bidan: [
      E2('Visit summary', 'Ringkasan kunjungan'),
      E2('10T checklist', 'Daftar periksa 10T'),
      E2('Risk screening', 'Skrining risiko'),
      E2('Next visit and referral', 'Kunjungan berikutnya & rujukan'),
      E2('Message to the mother', 'Pesan untuk ibu'),
    ],
    dok: [
      E2('SOAP note', 'Catatan SOAP'),
      E2('Clinical advice', 'Saran klinis'),
      E2('ICD-10 diagnosis', 'Diagnosis ICD-10'),
      E2('BPJS capitation check', 'Cek kapitasi BPJS'),
      E2('SATUSEHAT bundle', 'Bundle SATUSEHAT'),
    ],
    code: [
      E2('Codes with evidence', 'Kode dengan bukti'),
      E2('Severity level', 'Tingkat keparahan'),
      E2('Documentation queries', 'Query dokumentasi'),
      E2('Audit risk', 'Risiko audit'),
      E2('Claim readiness', 'Kesiapan klaim'),
    ],
    kasih: [
      E2('Care plan in plain words', 'Rencana perawatan sederhana'),
      E2('WhatsApp reminders', 'Pengingat WhatsApp'),
      E2('Family looped in', 'Keluarga ikut mendampingi'),
      E2('Check-in and escalation', 'Cek kondisi dan eskalasi'),
      E2('Warning signs and next visit', 'Tanda bahaya dan kontrol'),
    ],
  };

  var GO = {
    kader: E2('Check growth · 30 seconds', 'Cek pertumbuhan · 30 detik'),
    bidan: E2('Finish the ANC visit · 60 seconds', 'Selesaikan kunjungan ANC · 60 detik'),
    dok: E2('Finish the visit · 60 seconds', 'Selesaikan kunjungan · 60 detik'),
    code: E2('Get claim-ready · 60 seconds', 'Siapkan klaim · 60 detik'),
    kasih: E2('Build the care journey · 60 seconds', 'Buat perjalanan perawatan · 60 detik'),
  };

  var ACTION = {
    kader: { go: E2('Save and send to the Puskesmas', 'Simpan & kirim ke Puskesmas'), done: E2('Recorded in the Posyandu report · Puskesmas notified', 'Tercatat di laporan Posyandu · Puskesmas diberi tahu'),
      next: E2('Discuss a Posyandu programme', 'Diskusikan program Posyandu'), href: '#impact' },
    bidan: { go: E2('Save to the digital KIA book and send to SATUSEHAT', 'Simpan ke Buku KIA digital & kirim ke SATUSEHAT'), done: E2('Saved · next-visit reminder scheduled', 'Tersimpan · pengingat kunjungan berikutnya dijadwalkan'),
      next: E2('Request Bidan access', 'Minta akses Bidan'), href: '#bidan' },
    dok: { go: E2('Sign and send to SATUSEHAT', 'Tanda tangani & kirim ke SATUSEHAT'), done: E2('Sent to SATUSEHAT', 'Terkirim ke SATUSEHAT'),
      next: E2('Start free with DOK · live in 24 hours', 'Mulai gratis dengan DOK · aktif dalam 24 jam'), href: '#dok' },
    code: { go: E2('Send queries to the doctor and export to e-Klaim', 'Kirim query ke DPJP & ekspor ke e-Klaim'), done: E2('Queries sent · claim file prepared for e-Klaim', 'Query terkirim · berkas klaim disiapkan untuk e-Klaim'),
      next: E2('Request a hospital demo', 'Minta demo rumah sakit'), href: '#code' },
    kasih: { go: E2('Activate on WhatsApp', 'Aktifkan di WhatsApp'), done: E2('Active on WhatsApp', 'Aktif di WhatsApp'),
      next: E2('Discover Kasih', 'Kenali Kasih'), href: '#kasih' },
  };

  var NOTE = {
    kader: E2('Growth status is calculated from the WHO Child Growth Standards and Permenkes 2/2020 categories; the plan and message are AI-written for the kader and health worker. Nothing you enter is stored.',
      'Status gizi dihitung dari Standar Pertumbuhan Anak WHO dan kategori Permenkes 2/2020; rencana dan pesan ditulis AI untuk kader dan tenaga kesehatan. Tidak ada yang Anda masukkan disimpan.'),
    bidan: E2('Risk flags come from fixed ANC thresholds, not the AI; the midwife decides. Nothing you type is stored.',
      'Tanda risiko berasal dari ambang batas ANC yang tetap, bukan AI; keputusan tetap di tangan bidan. Tidak ada yang Anda ketik disimpan.'),
    dok: E2('Live AI for the doctor to review and sign. The doctor decides diagnosis and therapy. Nothing you type is stored.',
      'AI langsung untuk ditinjau dan ditandatangani dokter. Diagnosis dan terapi diputuskan dokter. Tidak ada yang Anda ketik disimpan.'),
    code: E2('Live AI suggestions for a certified coder; every decision stays with the coder. Nothing you type is stored.',
      'Saran AI langsung untuk koder bersertifikat; setiap keputusan tetap di tangan koder. Tidak ada yang Anda ketik disimpan.'),
    kasih: E2('Built only from the doctor’s written instructions. Kasih is not an emergency service: in an emergency, go to the nearest IGD. Nothing you type is stored.',
      'Disusun hanya dari instruksi tertulis dokter. Kasih bukan layanan darurat: dalam keadaan darurat, segera ke IGD terdekat. Tidak ada yang Anda ketik disimpan.'),
  };

  var ERR = {
    disabled: E2('The live demo is resting right now. Please try again later.', 'Demo langsung sedang istirahat. Silakan coba lagi nanti.'),
    limit: E2('You have reached today’s live runs. Start free with DOK for the full product.', 'Batas percobaan hari ini tercapai. Mulai gratis dengan DOK untuk produk lengkap.'),
    verify: E2('Please tick “Verify you are human” above if it is shown, then try again.', 'Centang “Verify you are human” di atas jika muncul, lalu coba lagi.'),
    guard: E2('Please remove ID numbers, phone numbers and emails.', 'Mohon hapus NIK, nomor telepon dan email.'),
    rate_limited: E2('Too many requests. Try again in a minute.', 'Terlalu banyak permintaan. Coba lagi sebentar lagi.'),
    invalid_json: E2('The result came back incomplete. Try again.', 'Hasil tidak lengkap. Coba lagi.'),
    refused: E2('That request can’t be processed. Try a sample case.', 'Permintaan itu tidak bisa diproses. Coba kasus contoh.'),
    measure: E2('Check the measurements: age 0–59 months, weight 1–40 kg, length 45–120 cm.', 'Periksa pengukuran: umur 0–59 bulan, berat 1–40 kg, panjang 45–120 cm.'),
    not_clinical: E2('That doesn’t look like a clinical text. Try one of the sample cases.', 'Itu tidak tampak seperti teks klinis. Coba salah satu kasus contoh.'),
  };

  var S = {};
  ['kader', 'bidan', 'dok', 'code', 'kasih'].forEach(function (p) {
    S[p] = { sel: ctx.cases[p][0].id, left: 3, ctl: null, phase: 'idle', res: null, tx: '', t0: 0, ms: 0, timer: null, reveal: 0, sent: false, err: null };
  });

  function clock(ms) { var s = Math.floor(ms / 1000); return ('0' + Math.floor(s / 60)).slice(-2) + ':' + ('0' + (s % 60)).slice(-2); }
  function list(a) { return '<ul>' + a.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>'; }

  // ── stage bodies ──────────────────────────────────────────────────────────
  var LV = { ok: 'ok', watch: 'watch', alert: 'warn', severe: 'warn sev' };
  function zrow(label, v, cat) {
    return '<div class="fl-z"><span>' + t(label) + '</span><b>' + (v > 0 ? '+' : '') + String(v).replace('.', ctx.lang() === 'id' ? ',' : '.') + '</b><em class="' + LV[cat.level] + '">' + esc(t(cat)) + '</em></div>';
  }
  var BODY = {
    kader: [
      function (r) {
        var g = r.growth, len = g.lfa.measure === 'length';
        return '<div class="fl-zs">' + zrow(E2('Weight-for-age', 'BB/U'), g.wfa.z, g.wfa.cat)
          + zrow(len ? E2('Length-for-age', 'PB/U') : E2('Height-for-age', 'TB/U'), g.lfa.z, g.lfa.cat)
          + (g.wfl ? zrow(len ? E2('Weight-for-length', 'BB/PB') : E2('Weight-for-height', 'BB/TB'), g.wfl.z, g.wfl.cat) : '') + '</div>'
          + '<p class="fl-src">' + t(E2('z-scores, WHO Child Growth Standards', 'Skor-z, Standar Pertumbuhan Anak WHO')) + '</p>';
      },
      function (r) {
        var tr = r.growth.trend, m = r.growth.muac, h;
        if (tr.status === 'unknown') h = '<p class="fl-sm">' + t(E2('No weight from last month to compare.', 'Tidak ada berat bulan lalu untuk dibandingkan.')) + '</p>';
        else {
          var up = tr.status === 'up';
          h = '<div class="fl-bpjs"><span class="' + (up ? 'ok' : 'warn') + '">' + t(up ? E2('Gaining (N)', 'Naik (N)') : E2('Not gaining (T)', 'Tidak naik (T)')) + '</span></div>'
            + '<p class="fl-sm">' + (tr.deltaG > 0 ? '+' : '') + tr.deltaG + ' g ' + t(E2('since last month', 'sejak bulan lalu')) + '</p>';
        }
        if (m) h += '<p class="fl-sm"><b>LILA ' + esc(m.cm) + ' cm:</b> ' + esc(t(m.cat)) + '</p>';
        return h;
      },
      function (r) { return '<p class="fl-sm">' + esc(r.summary) + '</p>' + list(r.plan); },
      function (r) {
        var ref = r.growth.referral;
        return '<div class="fl-bpjs"><span class="' + (ref.needed ? 'warn' : 'ok') + '">' + t(ref.needed ? E2('Refer to the Puskesmas', 'Rujuk ke Puskesmas') : E2('No referral needed', 'Tidak perlu rujukan')) + '</span></div>'
          + (ref.reasons.length ? list(ref.reasons.map(function (x) { return t(x); })) : '')
          + (r.referral_note ? '<ul class="fl-q"><li><b>' + t(E2('Note for the Puskesmas', 'Catatan untuk Puskesmas')) + '</b><small>' + esc(r.referral_note) + '</small></li></ul>' : '');
      },
      function (r) {
        return '<div class="fl-wa"><div class="msg"><small>' + t(E2('To the mother', 'Untuk ibu')) + '</small>' + esc(r.message_mother) + '</div></div>'
          + (r.next_posyandu ? '<p class="fl-sm"><b>' + t(E2('Next weighing', 'Penimbangan berikutnya')) + ':</b> ' + esc(r.next_posyandu) + '</p>' : '');
      },
    ],
    bidan: [
      function (r) {
        var f = r.facts, chips = [];
        var dec = function (v) { return String(v).replace('.', ctx.lang() === 'id' ? ',' : '.'); };
        if (f.ga_weeks != null) chips.push(t(E2('Gestation', 'Usia kehamilan')) + ' ' + f.ga_weeks + ' ' + t(E2('wk', 'mg')));
        if (f.bp_systolic != null) chips.push(t(E2('BP', 'TD')) + ' ' + f.bp_systolic + '/' + f.bp_diastolic);
        if (f.hb_g_dl != null) chips.push('Hb ' + dec(f.hb_g_dl));
        if (f.lila_cm != null) chips.push('LILA ' + dec(f.lila_cm) + ' cm');
        if (f.fhr_bpm != null) chips.push(t(E2('FHR', 'DJJ')) + ' ' + f.fhr_bpm);
        return '<p class="fl-sm">' + esc(r.summary) + '</p><div class="fl-chips">' + chips.map(function (c) { return '<span>' + esc(c) + '</span>'; }).join('') + '</div>';
      },
      function (r) {
        var done = r.checklist.filter(function (c) { return c.status === 'done'; }).length;
        return '<p class="fl-sm"><b>' + done + '/' + r.checklist.length + '</b> ' + t(E2('done in this visit', 'sudah dilakukan di kunjungan ini')) + '</p><ul class="fl-check">'
          + r.checklist.map(function (c) { return '<li class="' + c.status + '"><i>' + (c.status === 'done' ? '✓' : '○') + '</i>' + esc(c.item) + '</li>'; }).join('') + '</ul>';
      },
      function (r) {
        if (!r.risks.length) return '<p class="fl-sm fl-okline">' + t(E2('No risk factors in the recorded data.', 'Tidak ada faktor risiko dari data yang dicatat.')) + '</p>';
        return '<ul class="fl-risk">' + r.risks.map(function (x) { return '<li class="' + x.level + '">' + esc(t(x)) + '</li>'; }).join('') + '</ul>'
          + '<p class="fl-src">' + t(E2('Checked against fixed ANC thresholds', 'Diperiksa dengan ambang batas ANC yang tetap')) + '</p>';
      },
      function (r) {
        var nv = r.next_visit, rf = r.referral;
        return '<div class="fl-bpjs"><span class="ok">' + esc(nv.contact) + (nv.with_doctor ? ' · ' + t(E2('with a doctor', 'dengan dokter')) : '') + '</span>'
          + '<span class="' + (rf.needed ? 'warn' : 'ok') + '">' + t(rf.needed ? E2('Refer', 'Rujuk') : E2('No referral needed', 'Tidak perlu rujukan')) + (rf.needed && rf.to ? ' · ' + esc(rf.to) : '') + '</span></div>'
          + '<p class="fl-sm"><b>' + esc(nv.when) + '</b> · ' + esc(nv.reason) + '</p>'
          + (rf.needed && rf.reason ? '<p class="fl-sm">' + esc(rf.reason) + '</p>' : '');
      },
      function (r) {
        return (r.education.length ? '<p class="fl-h">' + t(E2('Counselling', 'Konseling')) + '</p>' + list(r.education) : '')
          + '<div class="fl-wa"><div class="msg"><small>' + t(E2('To the mother', 'Untuk ibu')) + '</small>' + esc(r.message_mother) + '</div></div>';
      },
    ],
    dok: [
      function (r) {
        return '<div class="fl-soap">' + [['S', r.soap.s], ['O', r.soap.o], ['A', r.soap.a], ['P', r.soap.p]].map(function (x) {
          return '<div><b>' + x[0] + '</b><span>' + esc(x[1]) + '</span></div>';
        }).join('') + '</div>';
      },
      function (r) {
        var a = r.advice, h = '';
        if (a.differentials.length) h += '<p class="fl-h">' + t(E2('Differentials', 'Diagnosis banding')) + '</p><ul>' + a.differentials.map(function (d) { return '<li><b>' + esc(d.dx) + '</b> · ' + esc(d.why) + '</li>'; }).join('') + '</ul>';
        if (a.management.length) h += '<p class="fl-h">' + t(E2('Guideline-based management', 'Tata laksana sesuai pedoman')) + '</p>' + list(a.management);
        if (a.tests.length) h += '<p class="fl-h">' + t(E2('Worth testing', 'Pemeriksaan penunjang')) + '</p>' + list(a.tests);
        if (a.red_flags.length) h += '<div class="fl-warn"><b>' + t(E2('Red flags', 'Tanda bahaya')) + '</b>' + list(a.red_flags) + '</div>';
        if (a.follow_up) h += '<p class="fl-sm"><b>' + t(E2('Follow-up', 'Kontrol')) + ':</b> ' + esc(a.follow_up) + '</p>';
        if (a.guideline) h += '<p class="fl-src">' + t(E2('Source', 'Sumber')) + ': ' + esc(a.guideline) + '</p>';
        return h;
      },
      function (r) {
        return '<div class="fl-chips">' + r.icd.map(function (i) { return '<span><code>' + esc(i.code) + '</code>' + esc(i.label) + '</span>'; }).join('') + '</div>';
      },
      function (r) {
        var b = r.bpjs;
        return '<div class="fl-bpjs"><span class="' + (b.fktp_competent ? 'ok' : 'warn') + '">' + t(b.fktp_competent ? E2('Managed at FKTP', 'Tuntas di FKTP') : E2('Beyond FKTP competence', 'Di luar kompetensi FKTP')) + '</span>'
          + '<span class="' + (b.referral_needed ? 'warn' : 'ok') + '">' + t(b.referral_needed ? E2('Referral indicated', 'Perlu rujukan') : E2('No referral needed', 'Tidak perlu rujukan')) + '</span></div>'
          + '<p class="fl-sm">' + esc(b.basis) + '</p><p class="fl-sm fl-cap">' + esc(b.capitation_note) + '</p>';
      },
      function (r, st) {
        var res = [[E2('Encounter', 'Encounter'), E2('Outpatient visit', 'Kunjungan rawat jalan')]];
        r.icd.forEach(function (i) { res.push([E2('Condition', 'Condition'), i.code + ' · ' + i.label]); });
        r.vitals.forEach(function (v) { res.push([E2('Observation', 'Observation'), v.name + ' ' + v.value + ' ' + v.unit]); });
        return '<ul class="fl-bundle">' + res.map(function (x, i) {
          var sent = (st.sent || st.sending) && st.sentAt > i;
          return '<li class="' + (sent ? 'sent' : '') + '"><b>' + t(x[0]) + '</b><span>' + esc(typeof x[1] === 'string' ? x[1] : t(x[1])) + '</span><i>' + (sent ? '✓' : '') + '</i></li>';
        }).join('') + '</ul>';
      },
    ],
    code: [
      function (r, st) {
        var marks = r.codes.map(function (c) { return { q: c.evidence }; }).concat(r.queries.map(function (q) { return { q: q.evidence, cls: 'q' }; }));
        return '<div class="src-doc">' + ctx.markSrc(st.tx, marks) + '</div>' + r.codes.map(function (c) {
          return '<div class="fl-code"><code>' + esc(c.code) + '</code><div><b>' + esc(c.label) + '</b><small>' + esc(c.system) + ' · ' + esc(t(ctx.CROLE[c.role] || E2(c.role, c.role))) + ' · ' + t(E2('confidence', 'keyakinan')) + ' ' + esc(t(ctx.CCONF[c.confidence] || E2(c.confidence, c.confidence))) + '</small><small>“' + esc(c.evidence) + '”</small></div></div>';
        }).join('');
      },
      function (r) {
        var lv = r.severity.level;
        return '<div class="fl-sev"><span class="lv">' + (lv === 'unknown' ? '?' : esc(lv)) + '</span><div><b>' + t(E2('Estimated INA-CBG severity', 'Perkiraan tingkat keparahan INA-CBG')) + '</b>' + (r.severity.drivers.length ? list(r.severity.drivers) : '') + '</div></div>';
      },
      function (r) {
        if (!r.queries.length) return '<p class="fl-sm">' + t(E2('Documentation is complete for this case.', 'Dokumentasi lengkap untuk kasus ini.')) + '</p>';
        return '<ul class="fl-q">' + r.queries.map(function (q) { return '<li><b>' + esc(q.issue) + '</b><small>' + esc(q.impact) + '</small></li>'; }).join('') + '</ul>';
      },
      function (r) {
        if (!r.audit_flags.length) return '<p class="fl-sm fl-okline">' + t(E2('No audit risks found.', 'Tidak ada risiko audit.')) + '</p>';
        return '<div class="fl-warn">' + '<ul>' + r.audit_flags.map(function (f) { return '<li>' + esc(f.flag) + ' <small>“' + esc(f.evidence) + '”</small></li>'; }).join('') + '</ul></div>';
      },
      function (r, st) {
        var sc = r.readiness.score;
        return '<div class="fl-ready"><div class="bar"><i style="width:' + sc + '%"></i></div><b>' + sc + '/100</b></div>'
          + (r.readiness.missing.length ? list(r.readiness.missing) : '')
          + (st.sent ? '<p class="fl-sm fl-okline">' + t(E2('Queries are with the doctor. The claim file updates as they answer, then goes to e-Klaim.', 'Query sudah di DPJP. Berkas klaim diperbarui saat dijawab, lalu siap ke e-Klaim.')) + '</p>' : '');
      },
    ],
    kasih: [
      function (r) { return '<p class="fl-title">' + esc(r.title) + '</p>' + list(r.steps); },
      function (r) {
        return '<div class="fl-wa">' + r.whatsapp.map(function (m) { return '<div class="msg"><small>' + esc(m.when) + '</small>' + esc(m.text) + '</div>'; }).join('') + '</div>';
      },
      function (r) { return '<div class="fl-wa fam"><div class="msg"><small>' + t(E2('To family', 'Untuk keluarga')) + '</small>' + esc(r.family_note) + '</div></div>'; },
      function (r) {
        return '<div class="fl-wa"><div class="msg"><small>' + esc(r.checkin.when) + '</small>' + esc(r.checkin.question) + '</div></div>'
          + (r.checkin.escalate_if.length ? '<p class="fl-h">' + t(E2('Alerts the clinic if', 'Klinik diberi tahu bila')) + '</p>' + list(r.checkin.escalate_if) : '');
      },
      function (r) {
        return (r.warning_signs.length ? '<div class="fl-warn"><b>' + t(E2('Go back straight away if', 'Segera kembali bila')) + '</b>' + list(r.warning_signs) + '</div>' : '')
          + (r.next_visit ? '<p class="fl-sm"><b>' + t(E2('Next visit', 'Kunjungan berikutnya')) + ':</b> ' + esc(r.next_visit) + '</p>' : '');
      },
    ],
  };

  // ── rendering ─────────────────────────────────────────────────────────────
  function render(p) {
    var st = S[p], out = $(p + 'Out');
    if (!out) return;
    var stages = STAGES[p], n = stages.length, running = st.phase === 'run', done = st.phase === 'done';
    var active = running ? Math.min(n - 1, Math.floor((Date.now() - st.t0) / 3000)) : -1;
    var action = '';
    if (done && st.reveal >= n) {
      var A = ACTION[p];
      action = st.sent
        ? '<div class="fl-done"><b>✓ ' + t(A.done) + '</b><a class="b1" href="' + A.href + '">' + t(A.next) + ' →</a></div>'
        : '<button type="button" class="fl-go" data-flow-act="' + p + '"' + (st.sending ? ' disabled>' + t(E2('Sending…', 'Mengirim…')) : '>' + t(A.go)) + '</button>';
    }
    var top = '<div class="fl-top"><span class="fl-clock' + (running ? ' on' : '') + '">' + clock(running ? Date.now() - st.t0 : st.ms) + '</span><span class="fl-status">'
      + (running ? t(E2('Working…', 'Sedang bekerja…'))
        : done ? t(E2('Done in ' + Math.max(1, Math.round(st.ms / 1000)) + ' seconds', 'Selesai dalam ' + Math.max(1, Math.round(st.ms / 1000)) + ' detik'))
          : t(E2('Five steps, one click, under 60 seconds', 'Lima langkah, satu klik, di bawah 60 detik'))) + '</span>' + action + '</div>';
    var h = '<ol class="fl-stages">' + stages.map(function (s, i) {
      var cls = done ? (i < st.reveal ? 'done' : 'wait') : running ? (i < active ? 'pass' : i === active ? 'run' : 'wait') : 'wait';
      var body = done && i < st.reveal ? '<div class="fl-body">' + BODY[p][i](st.res, st) + '</div>' : '';
      return '<li class="fl-st ' + cls + '"><i>' + (cls === 'done' ? '✓' : i + 1) + '</i><div><b>' + t(s) + '</b>' + body + '</div></li>';
    }).join('') + '</ol>';
    var err = st.err ? '<p class="fl-err">' + t(ERR[st.err] || E2('Something went wrong. Try again.', 'Terjadi kendala. Coba lagi.')) + '</p>' : '';
    out.innerHTML = '<div class="fl">' + top + err + h + (done ? '<small class="muted">' + t(NOTE[p]) + '</small>' : '') + '</div>';
  }

  var KF = [['kdAge', 'ageMonths'], ['kdW', 'weightKg'], ['kdL', 'lengthCm'], ['kdPrev', 'prevWeightKg'], ['kdMuac', 'muacCm']];
  function fillKader(d) {
    $('kdSex').value = d.sex;
    KF.forEach(function (f) { $(f[0]).value = d[f[1]] == null ? '' : d[f[1]]; });
  }
  function readKader() {
    var d = { sex: $('kdSex').value };
    KF.forEach(function (f) { var v = $(f[0]).value.trim().replace(',', '.'); d[f[1]] = v === '' ? null : Number(v); });
    var ok = Number.isInteger(d.ageMonths) && d.ageMonths >= 0 && d.ageMonths <= 59 && d.weightKg >= 1 && d.weightKg <= 40 && d.lengthCm >= 45 && d.lengthCm <= 120;
    return ok ? d : null;
  }
  function labelKader() {
    var o = $('kdSex').options;
    o[0].text = t(E2('Girl', 'Perempuan')); o[1].text = t(E2('Boy', 'Laki-laki'));
  }

  function renderCases(p) {
    var st = S[p];
    if (p === 'kader') labelKader();
    $(p + 'Cases').innerHTML = ctx.cases[p].map(function (c) {
      return '<button type="button" role="radio" aria-checked="' + (c.id === st.sel) + '" data-fcase="' + c.id + '"><b>' + t(c.t) + '</b></button>';
    }).join('');
    $(p + 'Left').textContent = t(E2(st.left + ' of 3 live runs left in this session', st.left + ' dari 3 percobaan langsung tersisa di sesi ini'));
    var go = $(p + 'Go');
    go.textContent = t(GO[p]);
    go.disabled = st.left <= 0 || st.phase === 'run';
  }

  async function run(p) {
    var st = S[p], errEl = $(p + 'Err');
    errEl.hidden = true;
    if (st.left <= 0 || st.phase === 'run') return;
    var tx;
    if (p === 'kader') {
      tx = readKader();
      if (!tx) { errEl.textContent = t(ERR.measure); errEl.hidden = false; return; }
    } else {
      var own = $(p + 'Text').value.trim();
      tx = own || ctx.cases[p].filter(function (c) { return c.id === st.sel; })[0].tx;
      if (own) { var g = ctx.guard(own); if (g) { errEl.textContent = t(g); errEl.hidden = false; return; } }
    }
    st.ctl = new AbortController(); st.phase = 'run'; st.res = null; st.sent = false; st.err = null; st.tx = tx; st.t0 = Date.now(); st.reveal = 0;
    $(p + 'Stop').hidden = false; renderCases(p); render(p);
    clearInterval(st.timer);
    st.timer = setInterval(function () { render(p); }, 500);
    try {
      var r = await ctx.api(p, tx, st.ctl.signal);
      st.ms = Date.now() - st.t0;
      if (!r || r.error) { st.phase = 'idle'; st.err = 'not_clinical'; }
      else { st.left--; st.res = r; st.phase = 'done'; }
    } catch (e) {
      st.ms = Date.now() - st.t0; st.phase = 'idle';
      st.err = e && e.code === 'cancelled' ? null : (e && e.code) || 'error';
    } finally {
      clearInterval(st.timer); st.timer = null;
      $(p + 'Stop').hidden = true; renderCases(p);
    }
    if (st.phase === 'done') {
      // reveal the finished stages one after another
      st.timer = setInterval(function () {
        st.reveal++; render(p);
        if (st.reveal >= STAGES[p].length) { clearInterval(st.timer); st.timer = null; }
      }, ctx.reduce ? 0 : 260);
    } else render(p);
  }

  function act(p) {
    var st = S[p];
    if (st.sent || st.sending) return;
    if (p !== 'dok') { st.sent = true; render(p); return; }
    // DOK: tick each resource of the bundle as it goes
    var total = 1 + st.res.icd.length + st.res.vitals.length;
    st.sentAt = 0; st.sending = true; render(p);
    var iv = setInterval(function () {
      st.sentAt++;
      if (st.sentAt >= total) { clearInterval(iv); st.sending = false; st.sent = true; }
      render(p);
    }, ctx.reduce ? 0 : 220);
  }

  function bind(p) {
    $(p + 'Live').addEventListener('click', function (e) {
      var c = e.target.closest('[data-fcase]');
      if (c) {
        S[p].sel = c.dataset.fcase;
        if (p === 'kader') fillKader(ctx.cases.kader.filter(function (x) { return x.id === S[p].sel; })[0].data);
        else $(p + 'Text').value = '';
        renderCases(p); return;
      }
      if (e.target.closest('#' + p + 'Go')) { run(p); return; }
      if (e.target.closest('#' + p + 'Stop') && S[p].ctl) { S[p].ctl.abort(); return; }
      if (e.target.closest('[data-flow-act]')) { act(p); }
    });
  }

  ['kader', 'bidan', 'dok', 'code', 'kasih'].forEach(bind);
  fillKader(ctx.cases.kader[0].data);

  return {
    open: function (p) { renderCases(p); render(p); },
    rerender: function (p) { renderCases(p); render(p); },
    stop: function () {
      Object.keys(S).forEach(function (p) { clearInterval(S[p].timer); if (S[p].ctl) S[p].ctl.abort(); });
    },
  };
}
