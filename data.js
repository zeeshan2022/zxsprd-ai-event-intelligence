/**
 * ============================================================
 * ZXSPRD AI — UNIFIED DATA & STATE ENGINE (Final Demo)
 * Single source of truth for ALL data, variables & actions.
 * Merges every function from v3.5 / v4.2 / v5.6 / v6.9 and adds
 * Final-Demo enhancements: Themes, Multilingual Voice, Feature
 * Flags, API Keys, Impersonation, Approvals, Raw Transcripts.
 * ============================================================
 */

/* ---------------- I18N DICTIONARY (Multilingual UI + Voice) ---------------- */
const ZX_LANGS = [
  { code: "en-US", label: "English" },
  { code: "ar-AE", label: "العربية (Arabic)" },
  { code: "fr-FR", label: "Français (French)" },
  { code: "es-ES", label: "Español (Spanish)" },
  { code: "de-DE", label: "Deutsch (German)" },
  { code: "hi-IN", label: "हिन्दी (Hindi)" },
  { code: "ur-PK", label: "اردو (Urdu)" },
  { code: "zh-CN", label: "中文 (Chinese)" }
];

const ZX_I18N = {
  "en-US": { welcome: "Welcome", next_session: "Next Session", live_now: "Live Now", trending: "Trending Topics", agenda: "Agenda", journey: "My Journey", concierge: "AI Concierge", profile: "Profile", announcements: "Announcements", scan_badge: "Scan your badge QR to check-in", ask_anything: "Ask anything about the event", floor: "Floor Guide", checked_in: "Checked In", join: "Join", leave: "Leave", home: "Home" },
  "ar-AE": { welcome: "مرحباً", next_session: "الجلسة القادمة", live_now: "الآن مباشر", trending: "المواضيع الرائجة", agenda: "جدول الأعمال", journey: "رحلتي", concierge: "المرشد الذكي", profile: "الملف الشخصي", announcements: "الإعلانات", scan_badge: "امسح رمز QR للتحقق من دخولك", ask_anything: "اسأل أي شيء عن الفعالية", floor: "دليل الطوابق", checked_in: "تم تسجيل الدخول", join: "انضمام", leave: "مغادرة", home: "الرئيسية" },
  "fr-FR": { welcome: "Bienvenue", next_session: "Session suivante", live_now: "En direct", trending: "Sujets tendance", agenda: "Programme", journey: "Mon parcours", concierge: "Concierge IA", profile: "Profil", announcements: "Annonces", scan_badge: "Scannez votre QR pour l'enregistrement", ask_anything: "Posez vos questions sur l'événement", floor: "Guide des étages", checked_in: "Enregistré", join: "Rejoindre", leave: "Quitter", home: "Accueil" },
  "es-ES": { welcome: "Bienvenido", next_session: "Próxima sesión", live_now: "En vivo", trending: "Temas destacados", agenda: "Agenda", journey: "Mi recorrido", concierge: "Conserje IA", profile: "Perfil", announcements: "Anuncios", scan_badge: "Escanea tu QR para registrarte", ask_anything: "Pregunta lo que quieras sobre el evento", floor: "Guía de pisos", checked_in: "Registrado", join: "Unirse", leave: "Salir", home: "Inicio" },
  "de-DE": { welcome: "Willkommen", next_session: "Nächste Sitzung", live_now: "Live jetzt", trending: "Beliebte Themen", agenda: "Agenda", journey: "Mein Rundgang", concierge: "KI-Concierge", profile: "Profil", announcements: "Ankündigungen", scan_badge: "QR-Code zum Check-in scannen", ask_anything: "Fragen Sie alles zur Veranstaltung", floor: "Etagenführer", checked_in: "Eingecheckt", join: "Beitreten", leave: "Verlassen", home: "Start" },
  "hi-IN": { welcome: "स्वागत है", next_session: "अगला सत्र", live_now: "अभी लाइव", trending: "ट्रेंडिंग विषय", agenda: "एजेंडा", journey: "मेरी यात्रा", concierge: "एआई कंसीयज", profile: "प्रोफ़ाइल", announcements: "घोषणाएँ", scan_badge: "चेक-इन के लिए अपना QR स्कैन करें", ask_anything: "इवेंट के बारे में कुछ भी पूछें", floor: "फ्लोर गाइड", checked_in: "चेक-इन हो गया", join: "शामिल हों", leave: "छोड़ें", home: "होम" },
  "ur-PK": { welcome: "خوش آمدید", next_session: "اگلا سیشن", live_now: "ابھی براہ راست", trending: "رجھن موضوعات", agenda: "ایجنڈا", journey: "میری راہنمائی", concierge: "اے آئی کونسلیج", profile: "پروفائل", announcements: "اعلانات", scan_badge: "چیک اِن کے لیے QR اسکین کریں", ask_anything: "تقریب کے بارے میں کچھ بھی پوچھیں", floor: "فلور گائیڈ", checked_in: "چیک اِن ہو گیا", join: "شامل ہوں", leave: "چھوڑیں", home: "ہوم" },
  "zh-CN": { welcome: "欢迎", next_session: "下一场会议", live_now: "正在直播", trending: "热门话题", agenda: "议程", journey: "我的行程", concierge: "AI礼宾", profile: "个人资料", announcements: "公告", scan_badge: "扫描您的二维码签到", ask_anything: "询问有关活动的任何问题", floor: "楼层指南", checked_in: "已签到", join: "加入", leave: "离开", home: "首页" }
};

/* ---------------- SEED STATE ---------------- */
/* ---------------- DEMO PASSWORD (date-derived, e.g. Oct18 -> PDt19) ----------------
 * Rule from the demo spec: token MMMDD (e.g. "Oct18"):
 *   O + 1 = P  (Caps)      c + 1 = D  (Caps)      t + t = t  (small — last month letter keeps its case)
 *   day number + 1         (1 -> 2, 10 -> 11, 30 -> 31, 31 -> 32)
 * Generalized: first two letters shift +1 and render UPPERCASE; third letter shifts +1
 * keeping its original case; day increments by one.
 */
function zxDemoPassword(d = new Date()) {
  const MON = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const mmdd = MON[d.getMonth()] + String(d.getDate()).padStart(2, "0"); // e.g. "Oct18"
  const letters = mmdd.match(/[A-Za-z]/g) || [];
  const digits = mmdd.replace(/\D/g, "");
  const shift = (ch) => {
    const code = ch.toLowerCase().charCodeAt(0);
    return String.fromCharCode(((code - 97 + 1) % 26) + 97); // a->b ... z->a
  };
  const out = letters.map((ch, i) => {
    const s = shift(ch);
    if (i < 2) return s.toUpperCase();                       // O->P Caps, c->D Caps
    return ch === ch.toUpperCase() ? s.toUpperCase() : s.toLowerCase(); // t->t small
  }).join("");
  const dayNext = parseInt(digits, 10) + 1;                  // 18 -> 19, 31 -> 32
  return out + String(dayNext);                              // Oct18 -> PDt19
}
window.zxDemoPassword = zxDemoPassword;

/* ---------------- VIEW APP IDENTITY (per-URL installed PWA) ----------------
 * The same codebase is hosted on several servers/URLs. Each view page must
 * install as its OWN app with its OWN name and icon — never pointing back to
 * the generic launcher. The identity is derived from the current URL path,
 * so admin.example.com/super-admin.html installs as "Super Admin Event
 * Intelligence Platform", kiosk.example.com/edge-kiosk.html installs as
 * "Kiosk Event Intelligence Platform", etc. Query params & hash are ignored
 * when detecting the view. */
const ZX_VIEW_APPS = {
  "index":          { key: "launcher",   name: "ZXSPRD AI — Event Intelligence Launcher", short: "ZXSPRD Launcher", theme: "#2563EB", hue: 222 },
  "super-admin":    { key: "superadmin", name: "Super Admin Event Intelligence Platform", short: "Super Admin EIP", theme: "#8B5CF6", hue: 263 },
  "client-admin":   { key: "clientadmin",name: "Admin Event Intelligence Platform",       short: "Admin EIP",       theme: "#10B981", hue: 158 },
  "edge-kiosk":     { key: "kiosk",      name: "Kiosk Event Intelligence Platform",       short: "Kiosk EIP",       theme: "#F59E0B", hue: 38  },
  "public-display": { key: "signage",    name: "Signage Event Intelligence Platform",     short: "Signage EIP",     theme: "#64748B", hue: 215 },
  "guest-portal":   { key: "portal",     name: "Portal Event Intelligence Platform",      short: "Portal EIP",      theme: "#EC4899", hue: 330 }
};
window.zxDetectViewApp = function () {
  let p = "";
  try { p = decodeURIComponent(location.pathname || ""); } catch (_) { p = location.pathname || ""; }
  const base = (p.split("/").pop() || "").replace(/\.html?$/i, "").toLowerCase();
  if (base === "" || base === "index" || base === "default") return ZX_VIEW_APPS["index"];
  return ZX_VIEW_APPS[base] || null;
};
window.zxViewAppIconSvg = function (hue) {
  const h = Number.isFinite(hue) ? hue : 222;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">` +
    `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0" stop-color="hsl(${h},85%,58%)"/><stop offset="1" stop-color="hsl(${(h + 40) % 360},80%,45%)"/>` +
    `</linearGradient></defs>` +
    `<rect width="512" height="512" rx="112" fill="url(#g)"/>` +
    `<path d="M96 300 L170 300 L214 190 L268 380 L306 268 L340 300 L416 300" fill="none" stroke="#fff" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" opacity=".95"/>` +
    `<circle cx="268" cy="380" r="22" fill="#fff"/>` +
    `<circle cx="214" cy="190" r="18" fill="#fff"/></svg>`;
};
window.zxApplyViewAppIdentity = function () {
  try {
    const app = zxDetectViewApp();
    if (!app) return null; // unknown page → keep whatever the HTML declares
    document.title = app.name;
    // dynamic per-view manifest (unique name + unique icon ⇒ separate installed apps).
    // Served same-origin via a Blob URL when possible (Chrome does not accept
    // data: manifests); falls back to a data URI on file:// where blobs can't be fetched.
    const man = {
      name: app.name,
      short_name: app.short,
      description: app.name + " — offline-capable event intelligence view.",
      start_url: location.href.split("?")[0].split("#")[0],
      scope: location.pathname.replace(/[^/]*$/, ""),
      display: "standalone",
      orientation: "any",
      background_color: "#090D16",
      theme_color: app.theme,
      lang: "en", dir: "auto",
      icons: [{ src: "data:image/svg+xml;base64," + btoa(zxViewAppIconSvg(app.hue)), sizes: "any", type: "image/svg+xml", purpose: "any maskable" }]
    };
    let href = "data:application/manifest+json," + encodeURIComponent(JSON.stringify(man));
    try {
      if (location.protocol.startsWith("http")) {
        href = URL.createObjectURL(new Blob([JSON.stringify(man)], { type: "application/manifest+json" }));
      }
    } catch (_) {}
    const link = document.querySelector('link[rel="manifest"]');
    if (link) link.href = href;
    const tc = document.querySelector('meta[name="theme-color"]');
    if (tc) tc.content = app.theme;
    // unique per-view favicon (helps browsers distinguish installed PWAs)
    const ic = document.querySelector('link[rel="icon"]');
    if (ic) ic.href = "data:image/svg+xml," + encodeURIComponent(zxViewAppIconSvg(app.hue));
    return app;
  } catch (_) { return null; }
};
// apply ASAP (data.js loads in <head> of every view), and again once head is parsed
zxApplyViewAppIdentity();
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", zxApplyViewAppIdentity);

const ZXSeed = {
  version: 8, // Final Demo schema v8 — Arabic demo data, venue map, crowd history, temp sessions
  activeRole: "SUPER_ADMIN",
  activeTenantId: "tenant-wps-2026",
  activePodId: "POD-01",
  impersonating: false,          // Super Admin → Client Admin impersonation flag
  theme: "dark",                 // "dark" | "light"
  uiLang: "en-US",               // interface language
  voiceLang: "en-US",            // STT/TTS language (multilingual voice)

  /* ===== SUPER ADMIN SCOPE (Platform Owner) ===== */
  platformSettings: {
    globalThemeLock: false,       // if true, tenants cannot change theme
    maintenanceMode: false,
    registrationsOpen: true,
    hitlRequired: true,           // force human approval before publishing summaries
    autoPurgeDays: 30,
    maxTenants: 50,
    crowdAutoSimulate: true,      // client admin toggle — auto movement simulation on crowd map
    publicDisplayCrowdCard: true, // super admin controls whether Crowd card shows on Public Display
    demoPasswordHint: true        // show the date-derived password hint on the launcher gate
  },

  featureFlags: {
    voiceConcierge: true,
    crowdAnalytics: true,
    sponsorInjection: true,
    publicDisplay: true,
    guestPortal: true,
    edgeKiosk: true,
    qrCheckIn: true,
    multiLanguageVoice: true,
    sentimentAnalysis: true,
    actionItemExtraction: true,
    offlineMode: true
  },

  apiKeys: [
    { id: "ak-1", tenantId: "tenant-wps-2026", provider: "OCI Generative AI (Llama 3 70B)", keyMasked: "sk-oci-****-****-7f3a", region: "uk-london-1 (Sovereign)", status: "Active", lastRotated: "2026-09-12" },
    { id: "ak-2", tenantId: "tenant-wps-2026", provider: "ElevenLabs Neural TTS v2", keyMasked: "sk-el-****-****-b21c", region: "EU Edge", status: "Active", lastRotated: "2026-08-01" },
    { id: "ak-3", tenantId: "tenant-tech-expo", provider: "OpenAI GPT-4o", keyMasked: "sk-oai-****-****-9d44", region: "US-Central", status: "Active", lastRotated: "2026-07-22" },
    { id: "ak-4", tenantId: "tenant-tech-expo", provider: "Deepgram STT", keyMasked: "sk-dg-****-****-11e0", region: "US-East", status: "Revoked", lastRotated: "2026-05-10" }
  ],

  tenants: [
    {
      id: "tenant-wps-2026", name: "World Police Summit 2026", subdomain: "wps2026", tier: "Enterprise",
      maxPods: 20, assignedPods: 3, status: "Active", createdDate: "2026-01-14",
      logoUrl: "", primaryColor: "#2563EB", headerText: "WPS 2026 Secure Intelligence Hub", footerText: "© 2026 World Police Summit.",
      defaultLlm: "OCI Llama 3 70B (Private)", defaultTts: "ElevenLabs Neural v2", temperature: 0.4, cloudFallback: false,
      venueCapacity: 5000, currentOccupancy: 3420,
      tenantTheme: "dark", tenantLangs: ["en-US", "ar-AE", "fr-FR"], allowTenantTheme: true, allowTenantLangs: true
    },
    {
      id: "tenant-tech-expo", name: "Global Tech Innovation Expo", subdomain: "techexpo", tier: "Pro",
      maxPods: 5, assignedPods: 1, status: "Active", createdDate: "2026-02-02",
      logoUrl: "", primaryColor: "#10B981", headerText: "Tech Expo Live Intelligence", footerText: "Powered by ZXSPRD AI",
      defaultLlm: "OpenAI GPT-4o", defaultTts: "Azure Neural TTS", temperature: 0.7, cloudFallback: true,
      venueCapacity: 2000, currentOccupancy: 1150,
      tenantTheme: "light", tenantLangs: ["en-US", "es-ES", "zh-CN"], allowTenantTheme: true, allowTenantLangs: false
    }
  ],

  llmCatalog: ["OCI Llama 3 70B (Private)", "OpenAI GPT-4o", "Anthropic Claude 3.5 Sonnet", "Mistral Large (EU Sovereign)", "Azure OpenAI GPT-4o-mini"],
  ttsCatalog: ["ElevenLabs Neural v2", "Azure Neural TTS", "Amazon Polly Standard", "Google Cloud TTS Chirp3"],

  /* ===== CLIENT ADMIN SCOPE (Event Organizer) ===== */
  tenantSettings: {
    "tenant-wps-2026": { crowdAutoSimulate: true, publicDisplayCrowdCard: true },
    "tenant-tech-expo": { crowdAutoSimulate: false, publicDisplayCrowdCard: true }
  },

  pods: [
    { id: "POD-01", tenantId: "tenant-wps-2026", macAddress: "AC:DE:48:00:11:22", location: "DWTC Hall A1 — Zone 1", llmOverride: null, ttsOverride: null, standbyTimeoutMins: 15, status: "Online", currentMeetingId: null, densityLevel: "High", currentHeadcount: 145, mic1Role: "Host (Speaker 1)", mic2Role: "Guest (Speaker 2)", mic1Gain: 65, mic2Gain: 42 },
    { id: "POD-02", tenantId: "tenant-wps-2026", macAddress: "AC:DE:48:00:11:23", location: "DWTC Hall A1 — Zone 2", llmOverride: "OpenAI GPT-4o", ttsOverride: null, standbyTimeoutMins: 5, status: "Online", currentMeetingId: null, densityLevel: "Medium", currentHeadcount: 82, mic1Role: "Host (Speaker 1)", mic2Role: "Audience Q&A", mic1Gain: 70, mic2Gain: 12 },
    { id: "POD-03", tenantId: "tenant-wps-2026", macAddress: "AC:DE:48:00:11:24", location: "DWTC Hall B2 — VIP", llmOverride: null, ttsOverride: null, standbyTimeoutMins: 10, status: "Online", currentMeetingId: "mtg-101", densityLevel: "Low", currentHeadcount: 12, mic1Role: "Host (Speaker 1)", mic2Role: "Guest (Speaker 2)", mic1Gain: 50, mic2Gain: 50 },
    { id: "POD-04", tenantId: "tenant-tech-expo", macAddress: "AC:DE:48:00:22:01", location: "Expo Hall 3 — Startup Stage", llmOverride: null, ttsOverride: null, standbyTimeoutMins: 10, status: "Online", currentMeetingId: null, densityLevel: "Medium", currentHeadcount: 60, mic1Role: "Host (Speaker 1)", mic2Role: "Guest (Speaker 2)", mic1Gain: 55, mic2Gain: 55 }
  ],

  schedule: [
    { id: "sch-1", tenantId: "tenant-wps-2026", podId: "POD-01", title: "حوكمة الذكاء الاصطناعي في إنفاذ القانون السيادي", startTime: "10:00 AM", endTime: "10:45 AM", speakerHost: "عبدالله المطيري", speakerGuest: "فاطمة الظاهري", status: "Scheduled" },
    { id: "sch-2", tenantId: "tenant-wps-2026", podId: "POD-02", title: "الاستدلال على الحافة لتحليلات الحدود الفورية", startTime: "11:00 AM", endTime: "11:45 AM", speakerHost: "العقيد ماجد السويدي", speakerGuest: "نورة القحطاني", status: "Scheduled" },
    { id: "sch-3", tenantId: "tenant-wps-2026", podId: "POD-03", title: "كلمة افتتاحية مغلقة: سلامة الذكاء الاصطناعي الوطنية", startTime: "09:00 AM", endTime: "09:40 AM", speakerHost: "معالي سيف المنصوري", speakerGuest: "خالد الشامسي", status: "Completed" },
    { id: "sch-4", tenantId: "tenant-tech-expo", podId: "POD-04", title: "الكلمة الرئيسية: المؤسسة الوكيلة", startTime: "02:00 PM", endTime: "02:45 PM", speakerHost: "مريم الكتبي", speakerGuest: "سلطان الدوسري", status: "Scheduled" }
  ],

  meetings: [
    {
      id: "mtg-101", tenantId: "tenant-wps-2026", podId: "POD-03",
      title: "كلمة افتتاحية مغلقة: سلامة الذكاء الاصطناعي الوطنية", startTime: "09:00 AM", endTime: "09:40 AM",
      hostName: "معالي سيف المنصوري", status: "Ended", hitlStatus: "PendingApproval",
      guests: [{ id: "g1", badgeId: "BDG-9941", name: "فاطمة الظاهري", email: "fatima@zxsprd.ae", phone: "+971500000000", role: "VIP", checkedInAt: "08:55 AM" }],
      rawTranscript: [
        { time: "09:00:12", speaker: "معالي سيف المنصوري", text: "أهلاً بالجميع. نستعرض اليوم مصفوفة الامتثال للسحابة السيادية للبيانات." },
        { time: "09:02:45", speaker: "خالد الشامسي", text: "كيف يتحقق التدمير الآلي للبيانات خلال ثلاثين يوماً من الامتثال للأنظمة الوطنية؟" },
        { time: "09:05:10", speaker: "معالي سيف المنصوري", text: "يعتمد النظام على التقطيع التشفيري؛ بمجرد إغلاق النافذة تُتلف المفاتيح نهائياً." }
      ],
      aiSummary: "تناولت الجلسة امتثال السحابة السيادية للبيانات مع التركيز على آلية التدمير الآلي للبيانات خلال ثلاثين يوماً باستخدام التقطيع التشفيري لضمان الامتثال للأنظمة الوطنية.",
      sentimentScore: 85, actionItems: ["مراجعة وثائق التقطيع التشفيري.", "التحقق من سجلات الإتلاف."]
    },
    {
      id: "mtg-102", tenantId: "tenant-wps-2026", podId: "POD-01",
      title: "جلسة طارئة: فريق مكافحة الجرائم السيبرانية العابرة للحدود", startTime: "08:15 AM", endTime: "08:50 AM",
      hostName: "العقيد ماجد السويدي", status: "Ended", hitlStatus: "Approved",
      guests: [],
      rawTranscript: [
        { time: "08:15:40", speaker: "العقيد ماجد السويدي", text: "نحتاج دليل استجابة مشترك للحوادث يستهدف البنية التحتية للموانئ." },
        { time: "08:22:03", speaker: "نورة القحطاني", text: "متفقون. لنبدأ تجريب مشاركة الإشارات الفورية بين مراكز العمليات في دبي وأبوظبي." }
      ],
      aiSummary: "اتفق المشاركون على صياغة دليل مشترك للاستجابة لحوادث البنية التحتية للموانئ، وعلى بدء تجربة مشاركة الإشارات الفورية بين مركزي عمليات دبي وأبوظبي.",
      sentimentScore: 72, actionItems: ["إعداد الدليل المشترك.", "جدولة تكامل مراكز العمليات."]
    }
  ],

  crowdMetrics: {
    totalVenueCapacity: 5000, currentOccupancy: 3420, ingressLastHour: 450, egressLastHour: 120, peakHour: "11:00 AM - 12:00 PM",
    hotZones: [
      { zone: "Hall A1 - Main Stage", density: 92, status: "Critical" },
      { zone: "Hall B2 - VIP Lounge", density: 65, status: "Moderate" },
      { zone: "Expo Hall 3 - Startup", density: 40, status: "Comfortable" }
    ],
    occupancyHistory: (function () { const a = []; let v = 2100; for (let i = 0; i < 24; i++) { v = Math.max(800, Math.min(4800, v + Math.round(Math.sin(i / 3.2) * 220 + (i % 5) * 30))); a.push(v); } return a; })(),
    ingressHistory: (function () { const a = []; for (let i = 0; i < 24; i++) a.push(180 + Math.round(Math.abs(Math.sin(i / 2.4)) * 320)); return a; })(),
    // 2D venue map — normalized coordinates (0..1). Realistic floor plan:
    // halls + concourse + registration, main entrance (bottom-left), east
    // entrance (right), emergency exit (top-right) and 10 numbered meeting pods.
    venueMap: {
      name: "DWTC — Dubai World Trade Centre · Hall Complex (2D Floor Map)",
      zones: [
        { id: "z-hall-a1", label: "Hall A1 — Main Stage", x: 0.04, y: 0.06, w: 0.42, h: 0.42, capacity: 1800 },
        { id: "z-hall-a2", label: "Hall A2 — Workshops", x: 0.04, y: 0.56, w: 0.28, h: 0.38, capacity: 900 },
        { id: "z-hall-b2", label: "Hall B2 — VIP Lounge", x: 0.58, y: 0.56, w: 0.22, h: 0.38, capacity: 500 },
        { id: "z-expo-3", label: "Expo Hall 3 — Startups", x: 0.54, y: 0.06, w: 0.42, h: 0.42, capacity: 1200 },
        { id: "z-concourse", label: "Concourse & Café", x: 0.34, y: 0.5, w: 0.22, h: 0.14, capacity: 600 },
        { id: "z-registration", label: "Registration Gate", x: 0.04, y: 0.5, w: 0.28, h: 0.04, capacity: 400 }
      ],
      entrances: [
        { id: "ent-main", label: "Main Entrance", x: 0.12, y: 0.985, side: "S" },
        { id: "ent-east", label: "East Entrance", x: 0.985, y: 0.72, side: "E" }
      ],
      exits: [
        { id: "ex-emg", label: "Emergency Exit", x: 0.955, y: 0.015, side: "N" }
      ],
      pods: [
        { id: "pod-1", zone: "z-hall-a1", x: 0.10, y: 0.13 },
        { id: "pod-2", zone: "z-hall-a1", x: 0.24, y: 0.13 },
        { id: "pod-3", zone: "z-hall-a1", x: 0.38, y: 0.13 },
        { id: "pod-4", zone: "z-hall-a1", x: 0.10, y: 0.38 },
        { id: "pod-5", zone: "z-hall-a1", x: 0.24, y: 0.38 },
        { id: "pod-6", zone: "z-expo-3", x: 0.62, y: 0.13 },
        { id: "pod-7", zone: "z-expo-3", x: 0.76, y: 0.13 },
        { id: "pod-8", zone: "z-expo-3", x: 0.90, y: 0.13 },
        { id: "pod-9", zone: "z-hall-b2", x: 0.64, y: 0.70 },
        { id: "pod-10", zone: "z-hall-a2", x: 0.12, y: 0.66 }
      ]
    },
    agents: [], // simulated attendees: auto enter via entrances, wander, exit every tick
    flowLog: { entries: 0, exits: 0, samples: [] }, // rolling per-tick entry/exit counts
    aiAnalytics: null // computed by ZXStore.computeCrowdAI() on every sim tick
  },

  sponsors: [
    { id: "sp-1", name: "البنك الأهلي", logoUrl: "", message: "زوروا الجناح ٤٢ لتجربة الحلول المصرفية المدعومة بالذكاء الاصطناعي." },
    { id: "sp-2", name: "اتصالات", logoUrl: "", message: "شبكة الجيل الخامس الحصرية للفعالية تغطي جميع القاعات." },
    { id: "sp-3", name: "مجموعة الإمارات الجوية", logoUrl: "", message: "سافر معنا — خصومات خاصة لجميع المشاركين في القمة." }
  ],

  broadcasts: { internalPod: [], allScreens: [], guestPortal: [], loggedInUsers: [] },

  trendingTopics: [
    { keyword: "السحابة السيادية", mentions: 142, sentiment: "Positive" },
    { keyword: "التقطيع التشفيري", mentions: 98, sentiment: "Neutral" },
    { keyword: "الاستدلال على الحافة", mentions: 76, sentiment: "Positive" },
    { keyword: "إتلاف البيانات", mentions: 54, sentiment: "Negative" },
    { keyword: "الأمن السيبراني", mentions: 61, sentiment: "Positive" }
  ],

  guestProfiles: [
    { id: "usr-1", badgeId: "BDG-9941", name: "فاطمة الظاهري", email: "fatima@zxsprd.ae", phone: "+971500000000", interests: ["حوكمة الذكاء الاصطناعي", "أمن السحابة"], joinedSessions: ["mtg-101"] },
    { id: "usr-2", badgeId: "BDG-4823", name: "خالد الشامسي", email: "khaled@zxsprd.ae", phone: "+971501112233", interests: ["الاستدلال على الحافة", "الأمن السيبراني"], joinedSessions: ["mtg-102"] },
    { id: "usr-3", badgeId: "BDG-7702", name: "نورة القحطاني", email: "noura@zxsprd.ae", phone: "+971504445566", interests: ["تحليلات الحدود", "المدن الذكية"], joinedSessions: [] }
  ],

  tempGuestSessions: [],

  // Predefined topics — guests just click to select (Arabic demo)
  interestTopics: ["حوكمة الذكاء الاصطناعي", "الأمن السيبراني", "أمن السحابة", "الاستدلال على الحافة", "تحليلات الحدود", "المدن الذكية", "البلوك تشين", "إنترنت الأشياء", "البيانات الضخمة", "الذكاء الاصطناعي التوليدي"],

  documents: [],
  voiceQueries: [],
  auditLog: [
    { ts: "2026-10-15 09:12", actor: "super-admin@zxsprd", action: "Rotated OCI API key for WPS 2026" },
    { ts: "2026-10-16 14:03", actor: "ops@wps2026", action: "Broadcast sent to All Screens channel" }
  ]
};

/* ---------------- STORE ENGINE ---------------- */
const ZXStore = (() => {
  const KEY = "zxsprd-global-state-v8";
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const listeners = new Set();
  let channel = null, storageOK = true;

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.version === ZXSeed.version) return { ...clone(ZXSeed), ...parsed };
      }
    } catch (e) { storageOK = false; }
    return clone(ZXSeed);
  }

  let state = load();

  function persist() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); storageOK = true; }
    catch (e) { storageOK = false; }
  }
  function notify(source) { listeners.forEach(fn => fn(state, source)); }

  try {
    if ("BroadcastChannel" in window) {
      channel = new BroadcastChannel("zxsprd-state-v8");
      channel.onmessage = (e) => { if (e.data?.type === "state") { state = e.data.state; notify("cross-tab"); } };
    }
  } catch (e) {}
  window.addEventListener("storage", (e) => {
    if (e.key === KEY && e.newValue) { try { state = JSON.parse(e.newValue); notify("cross-tab"); } catch (_) {} }
  });
  persist();

  function log(actor, action) {
    state.auditLog = [...(state.auditLog || []), { ts: new Date().toISOString().slice(0, 16).replace("T", " "), actor, action }].slice(-100);
  }

  return {
    get state() { return state; },
    get storageOK() { return storageOK; },

    set(patch, source = "local") {
      state = { ...state, ...(typeof patch === "function" ? patch(state) : patch) };
      persist();
      if (source !== "cross-tab") { try { channel?.postMessage({ type: "state", state }); } catch (_) {} }
      notify(source);
    },
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },

    /* GETTERS */
    tenant(id = state.activeTenantId) { return state.tenants.find(t => t.id === id); },
    pods(tid = state.activeTenantId) { return state.pods.filter(p => p.tenantId === tid); },
    schedule(tid = state.activeTenantId) { return state.schedule.filter(s => s.tenantId === tid); },
    meetings(tid = state.activeTenantId) { return state.meetings.filter(m => m.tenantId === tid); },
    apiKeys(tid = state.activeTenantId) { return state.apiKeys.filter(k => k.tenantId === tid); },
    t(key) { return (ZX_I18N[state.uiLang] || ZX_I18N["en-US"])[key] || ZX_I18N["en-US"][key] || key; },
    feature(name) { return !!state.featureFlags[name]; },

    /* CONTEXT / THEME / LANGUAGE */
    setRole(role) { this.set({ activeRole: role }); },
    setTenant(id) {
      if (!state.tenants.some(t => t.id === id)) return false;
      const firstPod = state.pods.find(p => p.tenantId === id);
      this.set({ activeTenantId: id, activePodId: firstPod ? firstPod.id : "" });
      return true;
    },
    setTheme(theme) { this.set({ theme }); },
    setUiLang(lang) { this.set({ uiLang: lang }); },
    setVoiceLang(lang) { this.set({ voiceLang: lang }); },
    startImpersonate(tenantId) { this.set({ impersonating: true, activeTenantId: tenantId, activeRole: "CLIENT_ADMIN" }); log("super-admin@zxsprd", `Started impersonating client admin of ${tenantId}`); },
    stopImpersonate() { this.set({ impersonating: false, activeRole: "SUPER_ADMIN" }); log("super-admin@zxsprd", "Stopped impersonation"); },

    /* ===== SUPER ADMIN ACTIONS ===== */
    addTenant(data) {
      const t = { ...data, id: `tnt-${Date.now()}`, assignedPods: 0, status: "Active", createdDate: new Date().toISOString().split("T")[0], currentOccupancy: 0 };
      this.set({ tenants: [...state.tenants, t] });
      log("super-admin@zxsprd", `Provisioned tenant ${t.name}`);
      return t.id;
    },
    updateTenant(tid, updates) { this.set({ tenants: state.tenants.map(t => t.id === tid ? { ...t, ...updates } : t) }); },
    toggleTenantStatus(tid) { this.updateTenant(tid, { status: state.tenants.find(t => t.id === tid)?.status === "Active" ? "Suspended" : "Active" }); },
    updateTenantQuota(tid, max) { this.updateTenant(tid, { maxPods: max }); },
    setFeatureFlag(name, val) { this.set({ featureFlags: { ...state.featureFlags, [name]: val } }); log("super-admin@zxsprd", `Feature flag ${name} = ${val}`); },
    setPlatformSettings(patch) { this.set({ platformSettings: { ...state.platformSettings, ...patch } }); },
    addApiKey(provider, keyRaw, region) {
      const masked = keyRaw.slice(0, 7) + "-****-****-" + keyRaw.slice(-4);
      const rec = { id: `ak-${Date.now()}`, tenantId: state.activeTenantId, provider, keyMasked: masked, region, status: "Active", lastRotated: new Date().toISOString().split("T")[0] };
      this.set({ apiKeys: [...state.apiKeys, rec] });
      log("super-admin@zxsprd", `Added API key for ${provider}`);
    },
    rotateApiKey(id) {
      this.set({ apiKeys: state.apiKeys.map(k => k.id === id ? { ...k, status: "Active", lastRotated: new Date().toISOString().split("T")[0], keyMasked: k.keyMasked.slice(0, 7) + "-****-****-" + Math.random().toString(16).slice(2, 6) } : k) });
      log("super-admin@zxsprd", `Rotated API key ${id}`);
    },
    revokeApiKey(id) { this.set({ apiKeys: state.apiKeys.map(k => k.id === id ? { ...k, status: "Revoked" } : k) }); },

    /* ===== CLIENT ADMIN ACTIONS ===== */
    addPod(data) {
      const tenant = this.tenant(data.tenantId || state.activeTenantId);
      if (!tenant || tenant.assignedPods >= tenant.maxPods) return false;
      const pod = { ...data, id: `POD-${String(state.pods.length + 1).padStart(2, "0")}`, status: "Online", densityLevel: "Low", currentHeadcount: 0, currentMeetingId: null, mic1Role: "Host (Speaker 1)", mic2Role: "Guest (Speaker 2)", mic1Gain: 50, mic2Gain: 50 };
      this.set({
        pods: [...state.pods, pod],
        tenants: state.tenants.map(t => t.id === pod.tenantId ? { ...t, assignedPods: t.assignedPods + 1 } : t)
      });
      log("client-admin", `Provisioned ${pod.id} @ ${pod.location}`);
      return true;
    },
    deletePod(pid) {
      const pod = state.pods.find(p => p.id === pid); if (!pod) return;
      this.set({
        pods: state.pods.filter(p => p.id !== pid),
        tenants: state.tenants.map(t => t.id === pod.tenantId ? { ...t, assignedPods: Math.max(0, t.assignedPods - 1) } : t)
      });
    },
    updatePodOverrides(pid, overrides) { this.set({ pods: state.pods.map(p => p.id === pid ? { ...p, ...overrides } : p) }); },
    updateMicMapping(pid, mic1Role, mic2Role, mic1Gain, mic2Gain) { this.set({ pods: state.pods.map(p => p.id === pid ? { ...p, mic1Role, mic2Role, mic1Gain, mic2Gain } : p) }); },
    setPodStatus(pid, status) { this.set({ pods: state.pods.map(p => p.id === pid ? { ...p, status } : p) }); },

    addSession(data) { const s = { ...data, id: `sch-${Date.now()}`, status: "Scheduled" }; this.set({ schedule: [...state.schedule, s] }); return s.id; },
    updateSessionStatus(sid, status) { this.set({ schedule: state.schedule.map(s => s.id === sid ? { ...s, status } : s) }); },
    deleteSession(sid) { this.set({ schedule: state.schedule.filter(s => s.id !== sid) }); },

    startMeeting(pid, hostName, title = null) {
      const pod = state.pods.find(p => p.id === pid); if (!pod) return null;
      const m = {
        id: `mtg-${Date.now()}`, tenantId: state.activeTenantId, podId: pid,
        title: title || `Ad-Hoc Meeting — ${new Date().toLocaleDateString()}`,
        startTime: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), endTime: null,
        hostName, status: "Recording", hitlStatus: "Draft", guests: [], rawTranscript: [],
        aiSummary: "Meeting in progress...", sentimentScore: 0, actionItems: []
      };
      this.set({ meetings: [...state.meetings, m], pods: state.pods.map(p => p.id === pid ? { ...p, currentMeetingId: m.id } : p) });
      return m.id;
    },
    appendTranscriptLine(mid, line) { this.set({ meetings: state.meetings.map(m => m.id === mid ? { ...m, rawTranscript: [...m.rawTranscript, line] } : m) }); },
    endMeeting(mid) {
      this.set({
        meetings: state.meetings.map(m => m.id === mid ? { ...m, status: "Ended", endTime: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), hitlStatus: "PendingApproval", aiSummary: m.aiSummary === "Meeting in progress..." ? "Draft summary generated by AI. Awaiting human approval." : m.aiSummary } : m),
        pods: state.pods.map(p => p.currentMeetingId === mid ? { ...p, currentMeetingId: null } : p)
      });
    },
    checkInGuest(mid, guestData) {
      const g = { ...guestData, id: `g-${Date.now()}`, checkedInAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
      this.set({ meetings: state.meetings.map(m => m.id === mid ? { ...m, guests: [...m.guests, g] } : m) });
    },
    approveSummary(mid, edited) { this.set({ meetings: state.meetings.map(m => m.id === mid ? { ...m, hitlStatus: "Approved", aiSummary: edited || m.aiSummary } : m) }); log("client-admin", `Approved summary for ${mid}`); },
    rejectSummary(mid) { this.set({ meetings: state.meetings.map(m => m.id === mid ? { ...m, hitlStatus: "Rejected" } : m) }); },
    deleteMeeting(mid) { this.set({ meetings: state.meetings.filter(m => m.id !== mid) }); },

    sendBroadcast(channelName, message) {
      const bc = { id: `bc-${Date.now()}`, tenantId: state.activeTenantId, message, timestamp: new Date().toLocaleTimeString(), active: true };
      this.set({ broadcasts: { ...state.broadcasts, [channelName]: state.broadcasts[channelName].map(b => b.tenantId === state.activeTenantId ? { ...b, active: false } : b).concat(bc) } });
      log("client-admin", `Broadcast → ${channelName}: ${message.slice(0, 40)}`);
    },
    clearBroadcast(channelName) {
      this.set({ broadcasts: { ...state.broadcasts, [channelName]: state.broadcasts[channelName].map(b => b.tenantId === state.activeTenantId ? { ...b, active: false } : b) } });
    },

    /* ===== CROWD ENGINE (v8.3 — realistic 2D floor map, auto entry/exit sim every 2s, AI analytics) ===== */
    _spawnAgents(cm) {
      // generate moving people-flow dots across the venue map (normalized coords)
      const zones = (cm.venueMap && cm.venueMap.zones) || [];
      if (!zones.length) return [];
      const n = 90;
      const agents = [];
      for (let i = 0; i < n; i++) {
        const z = zones[i % zones.length];
        agents.push({ x: z.x + Math.random() * z.w, y: z.y + Math.random() * z.h, vx: (Math.random() - .5) * .012, vy: (Math.random() - .5) * .012, zone: z.id });
      }
      return agents;
    },
    _zoneAt(vm, x, y) {
      const zs = vm.zones || [];
      return zs.find(z => x >= z.x && x <= z.x + z.w && y >= z.y && y <= z.y + z.h) || null;
    },
    _weightedPick(items, wf) {
      // items: array; wf(item): weight >= 0
      let tot = 0; const ws = items.map(it => { const w = Math.max(0, wf(it) || 0); tot += w; return w; });
      if (tot <= 0) return items[Math.floor(Math.random() * items.length)];
      let r = Math.random() * tot;
      for (let i = 0; i < items.length; i++) { r -= ws[i]; if (r <= 0) return items[i]; }
      return items[items.length - 1];
    },
    _spawnAgent(vm) {
      // an attendee enters through a random entrance and heads to a weighted zone
      const ents = vm.entrances || [{ x: 0.1, y: 0.98 }];
      const e = ents[Math.floor(Math.random() * ents.length)];
      const target = ZXStore._weightedPick(vm.zones || [], z => Math.max(40, (z.capacity || 500) * (1 - ((z.x - e.x) ** 2 + (z.y - e.y) ** 2))));
      if (!target) return null;
      const tx = target.x + Math.random() * target.w, ty = target.y + Math.random() * target.h;
      const dx = tx - e.x, dy = ty - e.y, d = Math.hypot(dx, dy) || 1, sp = 0.02 + Math.random() * 0.015;
      return { x: e.x, y: e.y, vx: (dx / d) * sp, vy: (dy / d) * sp, zone: target.id, state: "in", ttl: 6 + Math.floor(Math.random() * 24), dwell: 0 };
    },
    computeCrowdAI() {
      // lightweight on-device "AI" analytics over the crowd data (recomputed each tick)
      const s = state, cm = s.crowdMetrics || {}, vm = cm.venueMap || {};
      const zones = vm.zones || [];
      const hz = cm.hotZones || [];
      const densByZone = {};
      zones.forEach(z => {
        const key = z.label.split("—")[0].trim().toLowerCase();
        const hit = hz.find(h => { const hk = String(h.zone || "").split(/[-—]/)[0].trim().toLowerCase(); return hk && (key.includes(hk) || hk.includes(key.slice(0, 6))); });
        densByZone[z.id] = hit ? hit.density : null;
      });
      const known = Object.values(densByZone).filter(v => v !== null);
      const avgDensity = known.length ? Math.round(known.reduce((a, b) => a + b, 0) / known.length) : 0;
      const critical = hz.filter(z => z.status === "Critical").map(z => z.zone);
      const occHist = cm.occupancyHistory || [];
      const ingHist = cm.ingressHistory || [];
      const flow = (cm.flowLog && cm.flowLog.samples) || [];
      const take = (arr, n) => arr.slice(-n);
      const mean = arr => arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
      const slope = arr => { const a = take(arr, 8); if (a.length < 2) return 0; const n = a.length; const mx = (n - 1) / 2; const my = mean(a); let num = 0, den = 0; a.forEach((v, i) => { num += (i - mx) * (v - my); den += (i - mx) ** 2; }); return den ? num / den : 0; };
      const occSlope = Math.round(slope(occHist));
      const trend = occSlope > 12 ? "Rising" : occSlope < -12 ? "Falling" : "Stable";
      const cap = (s.tenants.find(t => t.id === s.activeTenantId) || {}).venueCapacity || cm.totalVenueCapacity || 5000;
      const occRatio = (cm.currentOccupancy || 0) / cap;
      const etaFullMin = (trend === "Rising" && occSlope > 0) ? Math.max(1, Math.round(((cap - (cm.currentOccupancy || 0)) / occSlope) * 2 / 60)) : null;
      // per-zone predicted density (next window) from agent counts + momentum
      const agentCount = {};
      (cm.agents || []).forEach(a => { agentCount[a.zone] = (agentCount[a.zone] || 0) + 1; });
      const projections = zones.map(z => {
        const cur = densByZone[z.id];
        const share = (agentCount[z.id] || 0) / Math.max(1, (cm.agents || []).length);
        const pred = cur === null ? null : Math.max(3, Math.min(99, Math.round(cur + (share * 100 - (cur || 0)) * 0.25 + (Math.random() * 6 - 3))));
        return { zone: z.label, current: cur, predicted: pred, risk: pred === null ? "Unknown" : pred > 85 ? "High" : pred > 60 ? "Medium" : "Low" };
      }).sort((a, b) => (b.predicted || 0) - (a.predicted || 0));
      const netFlow = mean(take(flow.map(f => f.in - f.out), 10));
      const loadPct = Math.round(occRatio * 100);
      const insights = [];
      insights.push(`${trend === "Rising" ? "📈 Occupancy is climbing (~" + Math.abs(occSlope) + " ppl/tick). " : trend === "Falling" ? "📉 Occupancy is easing off (" + Math.abs(occSlope) + "/tick). " : "➡️ Footfall is holding steady. "}Venue load is ${loadPct}% of capacity.`);
      if (critical.length) insights.push(`🚨 Hot-zone alert: ${critical.join(", ")} exceeded the 85% comfort threshold — open overflow routing now.`);
      else insights.push(`✅ No zone is in the critical band right now (max ${Math.max(...known, 0)}%).`);
      if (etaFullMin) insights.push(`⏳ At the current ingress rate the venue reaches full capacity in ~${etaFullMin} min — pre-stage door metering.`);
      if (projections[0]) insights.push(`🔮 Next-window prediction: "${projections[0].zone}" trends to ${projections[0].predicted ?? "—"}% density (risk: ${projections[0].risk}).`);
      insights.push(netFlow > 2 ? `🚶 Net inflow positive (+${Math.round(netFlow)}/tick) — staff the Main Entrance scanners.` : netFlow < -2 ? `🚪 Net outflow (${Math.round(netFlow)}/tick) — session just ended; push next-agenda content to signage.` : `⚖️ Entry/exit balanced — good window for pod maintenance rotation.`);
      const score = Math.max(0, Math.min(100, Math.round(loadPct * 0.45 + avgDensity * 0.35 + (critical.length ? 20 : 0) + (trend === "Rising" ? 8 : 0))));
      const level = score > 75 ? "Critical" : score > 55 ? "Elevated" : score > 35 ? "Moderate" : "Comfortable";
      const recs = [];
      if (critical.length) recs.push("Activate overflow wayfinding & redirect traffic to Concourse.");
      if (projections.some(p => p.risk === "High")) recs.push("Pre-assign stewards to projected high-risk zones.");
      if (netFlow > 5) recs.push("Open a second check-in lane at the busiest entrance.");
      if (!recs.length) recs.push("Maintain current staffing levels; re-check in 10 minutes.");
      const ai = { generatedAt: new Date().toLocaleTimeString(), avgDensity, trend, occSlope, etaFullMin, netFlow: Math.round(netFlow), critical, projections, insights, score, level, recommendations: recs };
      ZXStore.set({ crowdMetrics: { ...cm, aiAnalytics: ai } });
      return ai;
    },
    crowdStep() {
      const tenant = this.tenant(); if (!tenant) return;
      const cm = state.crowdMetrics || {};
      const vm = cm.venueMap || {};
      const zones = vm.zones || [];
      // ---- automatic entry/exit simulation (called every 2 seconds) ----
      let agents = (cm.agents && cm.agents.length) ? cm.agents.slice() : this._spawnAgents(cm);
      let entered = 0, exited = 0;
      // spawn 1–4 new attendees at entrances each tick
      const nIn = 1 + Math.floor(Math.random() * 4);
      for (let i = 0; i < nIn; i++) { const a = this._spawnAgent(vm); if (a) { agents.push(a); entered++; } }
      // move all agents
      agents.forEach(a => {
        if (a.state === "out") { // heading to an exit marker
          const ex = (vm.exits || [])[0] || { x: 0.95, y: 0.02 };
          const dx = ex.x - a.x, dy = ex.y - a.y, d = Math.hypot(dx, dy) || 1;
          a.vx = (dx / d) * 0.028; a.vy = (dy / d) * 0.028;
          a.x += a.vx; a.y += a.vy;
          if (d < 0.03) { a.dead = true; exited++; }
          return;
        }
        const z = zones.find(zz => zz.id === a.zone) || zones[0];
        if (!z) { a.dead = true; return; }
        // inside own zone → gentle wander; otherwise walk toward it
        if (a.x >= z.x && a.x <= z.x + z.w && a.y >= z.y && a.y <= z.y + z.h) {
          a.dwell = (a.dwell || 0) + 1;
          if (Math.random() < 0.25) { const sp = 0.006 + Math.random() * 0.006, th = Math.random() * Math.PI * 2; a.vx = Math.cos(th) * sp; a.vy = Math.sin(th) * sp; }
          a.x += a.vx; a.y += a.vy;
          a.x = Math.max(z.x, Math.min(z.x + z.w, a.x));
          a.y = Math.max(z.y, Math.min(z.y + z.h, a.y));
          // decide to leave (stay elsewhere or exit venue) after dwelling
          if (a.dwell > 2 && (--a.ttl) <= 0) {
            if (Math.random() < 0.35) { a.state = "out"; }
            else {
              const nz = ZXStore._weightedPick(zones, zz => Math.max(30, (zz.capacity || 500) / (1 + Math.hypot(zz.x - a.x, zz.y - a.y))));
              a.zone = nz.id; a.ttl = 5 + Math.floor(Math.random() * 20); a.dwell = 0;
            }
          }
        } else {
          const tx = z.x + z.w / 2, ty = z.y + z.h / 2, dx = tx - a.x, dy = ty - a.y, d = Math.hypot(dx, dy) || 1, sp = 0.025;
          a.vx = (dx / d) * sp; a.vy = (dy / d) * sp; a.x += a.vx; a.y += a.vy;
        }
      });
      agents = agents.filter(a => !a.dead);
      // keep population bounded (visual clarity)
      if (agents.length > 260) agents.splice(0, agents.length - 260);
      // ---- derive metrics from the simulated crowd ----
      const countIn = {};
      agents.forEach(a => { if (a.state !== "out") countIn[a.zone] = (countIn[a.zone] || 0) + 1; });
      const hotZones = (cm.hotZones || []).map(z => {
        const zn = (zones || []).find(x => { const k = x.label.split("—")[0].trim().toLowerCase(); return String(z.zone).toLowerCase().includes(k.slice(0, 6)) || k.includes(String(z.zone).split(/[-—]/)[0].trim().toLowerCase().slice(0, 6)); });
        const base = zn ? Math.min(99, Math.round(((countIn[zn.id] || 0) / 30) * 100)) : z.density;
        const d = Math.max(5, Math.min(99, Math.round(base + (Math.random() * 10 - 5))));
        return { ...z, density: d, status: d > 85 ? "Critical" : d > 55 ? "Moderate" : "Comfortable" };
      });
      // pod headcounts drift with the agents gathered around each pod's zone
      const pods = state.pods.map(p => {
        if (p.tenantId !== tenant.id) return p;
        const hc = Math.max(0, p.currentHeadcount + Math.floor(Math.random() * 14) - 7);
        return { ...p, currentHeadcount: hc, densityLevel: hc > 100 ? "High" : hc > 50 ? "Medium" : "Low" };
      });
      const delta = entered * 6 - exited * 5 + Math.floor(Math.random() * 20) - 8;
      const occ = Math.max(0, Math.min(tenant.venueCapacity, (tenant.currentOccupancy || 0) + delta));
      const ing = Math.max(0, entered * 60 + Math.floor(Math.random() * 40));
      const eg = Math.max(0, exited * 60 + Math.floor(Math.random() * 30));
      const hist = [...(cm.occupancyHistory || []), occ].slice(-48);
      const ingHist = [...(cm.ingressHistory || []), ing].slice(-48);
      const fl = cm.flowLog || { entries: 0, exits: 0, samples: [] };
      const flowLog = { entries: (fl.entries || 0) + entered, exits: (fl.exits || 0) + exited, samples: [...(fl.samples || []), { in: entered, out: exited }].slice(-40) };
      this.set({
        tenants: state.tenants.map(t => t.id === tenant.id ? { ...t, currentOccupancy: occ } : t),
        pods,
        crowdMetrics: { ...cm, currentOccupancy: occ, ingressLastHour: ing, egressLastHour: eg, hotZones, occupancyHistory: hist, ingressHistory: ingHist, agents, flowLog }
      });
      this.computeCrowdAI();
    },
    simulateCrowdShift() { this.crowdStep(); },
    startAutoCrowdSim(intervalMs = 2000) {
      // one shared engine per tab; views call this when their crowd panel is visible
      if (this._crowdT && document.visibilityState !== "hidden") return this._crowdT;
      clearInterval(this._crowdT);
      this._crowdT = setInterval(() => {
        if (document.visibilityState === "hidden") return;
        const t = this.tenant();
        const on = this.state.platformSettings.crowdAutoSimulate || (t && this.tenantSetting("crowdAutoSimulate", t.id, false));
        if (on) this.crowdStep();
      }, intervalMs);
      return this._crowdT;
    },
    setTenantSetting(key, val, tid = state.activeTenantId) {
      this.set({ tenantSettings: { ...(state.tenantSettings || {}), [tid]: { ...(state.tenantSettings || {})[tid], [key]: val } } });
      log("client-admin", `Event setting ${key} = ${val}`);
    },
    tenantSetting(key, tid = state.activeTenantId, fallback = false) {
      const s = (state.tenantSettings || {})[tid] || {};
      return key in s ? s[key] : fallback;
    },

    /* ===== TEMPORARY GUEST SESSIONS (interest-based, no badge) ===== */
    createTempGuestSession(data) {
      const sg = { id: `tmp-${Date.now()}`, name: data.name || "ضيف", interests: data.interests || [], createdAt: new Date().toISOString(), joinedSessions: [] };
      this.set({ tempGuestSessions: [...(state.tempGuestSessions || []), sg] });
      return sg;
    },
    setActiveTempGuest(id) { try { sessionStorage.setItem("zx-temp-guest", id); } catch (_) {} },
    getActiveTempGuest() {
      let id = null; try { id = sessionStorage.getItem("zx-temp-guest"); } catch (_) {}
      return (state.tempGuestSessions || []).find(s => s.id === id) || null;
    },
    tempGuestJoin(sgId, refId) {
      this.set({ tempGuestSessions: (state.tempGuestSessions || []).map(s => s.id === sgId ? { ...s, joinedSessions: [...new Set([...s.joinedSessions, refId])] } : s) });
    },

    reset() { try { sessionStorage.removeItem("zx-temp-guest"); } catch (_) {} state = clone(ZXSeed); persist(); try { channel?.postMessage({ type: "state", state }); } catch (_) {} notify("reset"); },

    addSponsor(data) { this.set({ sponsors: [...state.sponsors, { ...data, id: `sp-${Date.now()}` }] }); },
    removeSponsor(id) { this.set({ sponsors: state.sponsors.filter(s => s.id !== id) }); },

    addGuestProfile(data) {
      const exists = state.guestProfiles.find(g => g.badgeId === data.badgeId);
      if (exists) this.set({ guestProfiles: state.guestProfiles.map(g => g.badgeId === data.badgeId ? { ...g, ...data } : g) });
      else this.set({ guestProfiles: [...state.guestProfiles, { ...data, id: `usr-${Date.now()}`, joinedSessions: [] }] });
    },
    logGuestInteraction(badgeId, mid) {
      this.set({ guestProfiles: state.guestProfiles.map(g => g.badgeId === badgeId ? { ...g, joinedSessions: [...new Set([...g.joinedSessions, mid])] } : g) });
    },

    /* NOTE: previous duplicate reset() removed — single canonical reset above. */
    publishSummary(mid) { this.approveSummary(mid); },

    /* Export current state as a downloadable JSON snapshot (Super/Client Admin) */
    exportState() {
      try {
        const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `zxsprd-state-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 4000);
        log("admin", "Exported state snapshot");
        return true;
      } catch (e) { return false; }
    }
  };
})();

window.ZXSeed = ZXSeed;
window.ZXStore = ZXStore;
window.ZX_LANGS = ZX_LANGS;
window.ZX_I18N = ZX_I18N;

/* ---------------- SHARED UI HELPERS (theme, menus, toast, PWA) ---------------- */
(function installSharedUI() {
  // Apply theme ASAP to avoid flash
  function applyTheme() {
    const th = ZXStore.state.theme || "dark";
    document.documentElement.setAttribute("data-theme", th);
    document.documentElement.style.setProperty("--tenant-accent", ZXStore.tenant()?.primaryColor || "#3B82F6");
  }
  applyTheme();
  ZXStore.subscribe(applyTheme);

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  window.zx$ = $; window.zx$$ = $$;
  window.zxesc = (s) => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // Toast — stacked container so rapid toasts never overwrite each other
  window.zxToast = function (msg, kind = "info") {
    let wrap = $("#zxToastWrap");
    if (!wrap) { wrap = document.createElement("div"); wrap.id = "zxToastWrap"; wrap.className = "toast-wrap"; document.body.appendChild(wrap); }
    const t = document.createElement("div");
    t.className = "toast-item toast-" + kind;
    t.textContent = msg;
    wrap.appendChild(t);
    requestAnimationFrame(() => t.classList.add("show"));
    setTimeout(() => { t.classList.remove("show"); setTimeout(() => t.remove(), 300); }, 2800);
    while (wrap.children.length > 4) wrap.firstChild.remove();
  };

  // Skeleton loaders for perceived performance during async renders
  window.zxSkeleton = function (rows = 3) {
    return `<div class="skel-stack">${`<div class="skel skel-row"></div>`.repeat(rows)}</div>`;
  };

  // Maintenance-mode / offline awareness banner (non-blocking)
  window.zxPlatformBanner = function () {
    let mount = document.getElementById("platformNotice");
    if (!mount) { // auto-mount under the topbar so every view benefits from maintenance/offline notices
      const tb = document.querySelector(".topbar, .app-header, header");
      if (!tb || !document.body) return;
      mount = document.createElement("div");
      mount.id = "platformNotice";
      tb.after(mount);
    }
    const paint = () => {
      const ps = ZXStore.state.platformSettings || {};
      if (ps.maintenanceMode) {
        mount.innerHTML = `<div class="broadcast-banner" style="background:var(--red);color:#fff">🛠️ Platform under maintenance — live features may be limited.</div>`;
      } else if (!navigator.onLine) {
        mount.innerHTML = `<div class="broadcast-banner" style="background:var(--panel-2);color:var(--muted)">📡 Offline mode — serving from local cache. Everything keeps working.</div>`;
      } else mount.innerHTML = "";
    };
    paint();
    ZXStore.subscribe(paint);
    window.addEventListener("online", paint);
    window.addEventListener("offline", paint);
  };

  // Sidebar menu builder: ZXMenu.build(container, items, onSelect)
  // Bullet-proof version (fixes "Platform Menu is Empty" in Super Admin):
  // • retries until the mount element exists (MutationObserver + timers)
  // • defensively filters items; inline fallback icons when a sprite symbol is missing
  // • wires its own click handler so buttons always work
  // • never leaves an empty sidebar silently — shows an error chip with Retry
  window.ZXMenu = {
    _bound: new WeakSet(),
    _items: {},
    _cb: {},
    _retryTimers: {},
    _fallbackIcon(id) {
      const map = {
        dashboard: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
        tenants: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5M3 12a9 3 0 0 0 18 0"/>',
        api: '<circle cx="7.5" cy="15.5" r="4.5"/><path d="m10.7 12.3 8.3-8.3 3 3-2 2-2-2-2 2 2 2-3 3"/>',
        features: '<rect x="2" y="7" width="20" height="10" rx="5"/><circle cx="16" cy="12" r="3"/>',
        router: '<rect x="2" y="14" width="20" height="8" rx="2"/><path d="M6.01 18h.01M10.01 18h.01M15 10v4M9 10v4M12 2v8"/>',
        telemetry: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/>',
        themes: '<circle cx="12" cy="12" r="10"/><path d="M12 22a3 3 0 0 1-3-3c0-2 3-2.5 3-5a2 2 0 0 1 4 0c0 1 1 1.5 2 1.5A5 5 0 0 1 12 22z"/>',
        languages: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"/>',
        impersonate: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
        crowd: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>'
      };
      return map[id] || '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18M9 21V9"/>';
    },
    _iconMarkup(it) {
      const sym = it.icon ? document.getElementById(it.icon) : null;
      if (sym) return `<svg class="icon"><use href="#${it.icon}"/></svg>`;
      return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ZXMenu._fallbackIcon(it.id)}</svg>`;
    },
    _render(cid) {
      const c = document.getElementById(cid);
      const items = ZXMenu._items[cid] || [];
      if (!c) return false;
      let list = c.querySelector(".side-list");
      if (!list) { list = document.createElement("div"); list.className = "side-list"; c.appendChild(list); }
      list.innerHTML = items.map((it, i) => `
        <button type="button" class="side-link ${i === 0 ? "active" : ""}" data-view="${it.id}" aria-current="${i === 0 ? "page" : "false"}">
          ${ZXMenu._iconMarkup(it)}<span>${it.label}</span>
          ${it.badge ? `<em class="side-badge" ${it.badgeId ? `data-badge-id="${it.badgeId}"` : ""}>${it.badge}</em>` : (it.badgeId ? `<em class="side-badge" data-badge-id="${it.badgeId}" hidden></em>` : "")}
        </button>`).join("");
      if (!list.children.length) {
        list.innerHTML = `<div class="dim" style="padding:10px;font-size:12px">Menu is empty — <button type="button" class="btn btn-ghost btn-sm" onclick="ZXMenu.rebuild('${cid}')">Retry</button></div>`;
      } else {
        clearInterval(ZXMenu._retryTimers[cid]); delete ZXMenu._retryTimers[cid];
      }
      if (!ZXMenu._bound.has(c)) {
        ZXMenu._bound.add(c);
        c.addEventListener("click", e => {
          const b = e.target.closest(".side-link"); if (!b) return;
          $$(".side-link", c).forEach(x => { x.classList.toggle("active", x === b); x.setAttribute("aria-current", x === b ? "page" : "false"); });
          const cb = ZXMenu._cb[cid]; cb && cb(b.dataset.view);
        });
      }
      return !!list.querySelector(".side-link");
    },
    rebuild(cid) {
      const c = typeof cid === "string" ? $(cid) : cid;
      if (!c || !c.id) return false;
      return ZXMenu._render(c.id);
    },
    build(containerSel, items, onSelect) {
      const c = typeof containerSel === "string" ? $(containerSel) : containerSel;
      if (!c) {
        // mount not in the DOM yet — retry for up to ~10s (timers + MutationObserver)
        const sel = containerSel;
        let tries = 0;
        const attempt = () => {
          const el = typeof sel === "string" ? $(sel) : sel;
          if (!el) return false;
          if (++tries > 200) { observer?.disconnect(); clearInterval(iv); return false; }
          const ok = ZXMenu.build(sel, items, onSelect);
          if (ok) { observer?.disconnect(); clearInterval(iv); }
          return ok;
        };
        const observer = (typeof MutationObserver === "function" && document.body) ? new MutationObserver(attempt) : null;
        observer?.observe(document.body, { childList: true, subtree: true });
        const iv = setInterval(attempt, 100);
        setTimeout(() => { observer?.disconnect(); clearInterval(iv); }, 10000);
        attempt();
        return false;
      }
      const cid = c.id || (c.id = String(containerSel).replace(/^#/, "") || "zxmenu-" + Math.random().toString(36).slice(2, 8));
      const safe = (Array.isArray(items) ? items : []).filter(it => it && it.id && it.label);
      ZXMenu._items[cid] = safe;
      ZXMenu._cb[cid] = onSelect;
      const ok = ZXMenu._render(cid);
      if (!ok && !ZXMenu._retryTimers[cid]) {
        // sidebar exists but render failed (e.g. transient DOM state) — auto-retry a few times
        let n = 0;
        ZXMenu._retryTimers[cid] = setInterval(() => {
          if (++n > 20 || ZXMenu._render(cid)) { clearInterval(ZXMenu._retryTimers[cid]); delete ZXMenu._retryTimers[cid]; }
        }, 300);
      }
      return ok;
    },
    show(viewId) {
      const panels = $$("[data-panel]");
      panels.forEach(p => p.hidden = p.dataset.panel !== viewId);
      // If nothing matched (e.g. a stale state restored a removed panel id), open the first panel so the UI is never blank.
      if (panels.length && !panels.some(p => !p.hidden)) { panels[0].hidden = false; }
    },
    setBadge(badgeId, value) {
      const el = document.querySelector(`.side-badge[data-badge-id="${badgeId}"]`);
      if (!el) return;
      if (value === null || value === undefined || value === 0 || value === "") { el.hidden = true; }
      else { el.hidden = false; el.textContent = value; }
    }
  };

  // Theme + Language toolbar injection
  // opts.chromeLangs: restrict language dropdowns to a tenant pool (array of codes)
  // opts.hideLang: hide both language selects (e.g. Public Display → theme switch only)
  window.zxInitChrome = function (opts = {}) {
    // re-apply the per-view PWA identity (name/manifest/icon) once the page is live
    if (typeof zxApplyViewAppIdentity === "function") zxApplyViewAppIdentity();
    const tb = $("#chromeControls");
    if (!tb) return;
    // Preserve statically-authored controls (e.g. Super Admin's Export / Publish to GitHub
    // buttons) instead of wiping them when the injected toolbar HTML replaces innerHTML.
    const preserved = (opts.preserveControls || [])
      .map(id => (typeof id === "string" ? document.getElementById(id) : id))
      .filter(Boolean)
      .map(el => el.cloneNode(true));
    const langs = (opts.chromeLangs && opts.chromeLangs.length ? ZX_LANGS.filter(l => opts.chromeLangs.includes(l.code)) : ZX_LANGS);
    tb.innerHTML = `
      ${preserved.map(el => el.outerHTML).join("")}
      <button id="btnTheme" class="icon-btn" title="Toggle Dark / Light theme"><svg class="icon"><use href="#i-moon"/></svg></button>
      ${opts.hideLang ? "" : `
      <select id="selUiLang" class="mini-select" title="Interface language">${langs.map(l => `<option value="${l.code}">${l.label}</option>`).join("")}</select>
      <select id="selVoiceLang" class="mini-select" title="Voice language (STT/TTS)">${langs.map(l => `<option value="${l.code}">🎤 ${l.label}</option>`).join("")}</select>`}
      <button id="btnOffline" class="icon-btn" title="Offline / connection status"><svg class="icon"><use href="#i-wifi"/></svg></button>`;
    if (!opts.hideLang) {
      $("#selUiLang").value = ZXStore.state.uiLang;
      $("#selVoiceLang").value = ZXStore.state.voiceLang;
      $("#selUiLang").onchange = (e) => ZXStore.setUiLang(e.target.value);
      $("#selVoiceLang").onchange = (e) => { ZXStore.setVoiceLang(e.target.value); zxToast("Voice language set to " + e.target.selectedOptions[0].text); };
    }
    $("#btnTheme").onclick = () => { zxStoreSetTheme(ZXStore.state.theme === "dark" ? "light" : "dark"); };
    const offBtn = $("#btnOffline");
    // keep the theme button icon in sync with current theme (moon in dark, sun in light)
    const paintThemeIcon = () => {
      const isDark = ZXStore.state.theme !== "light";
      $("#btnTheme").innerHTML = `<svg class="icon"><use href="#${isDark ? "i-moon" : "i-sun"}"/></svg>`;
      $("#btnTheme").title = isDark ? "Switch to Light theme (or press T)" : "Switch to Dark theme (or press T)";
    };
    paintThemeIcon();
    ZXStore.subscribe(paintThemeIcon);
    // keyboard shortcut: T toggles theme (ignored while typing in inputs)
    window.addEventListener("keydown", (e) => {
      if ((e.key === "t" || e.key === "T") && !/input|select|textarea/i.test(document.activeElement?.tagName || "")) {
        zxStoreSetTheme(ZXStore.state.theme === "dark" ? "light" : "dark");
      }
    });
    const paintNet = () => { offBtn.innerHTML = `<svg class="icon"><use href="#${navigator.onLine ? "i-wifi" : "i-wifi-off"}"/></svg>`; offBtn.title = navigator.onLine ? "Online (cached assets served offline-ready)" : "OFFLINE — app still works from cache"; };
    paintNet(); window.addEventListener("online", paintNet); window.addEventListener("offline", paintNet);
  };
  window.zxStoreSetTheme = (th) => ZXStore.setTheme(th);

  /* ---------------- CHART HELPERS (dependency-free SVG, theme-aware) ---------------- */
  window.zxSparkline = function (data, opts = {}) {
    const w = opts.w || 320, h = opts.h || 70, pad = 4;
    if (!data || !data.length) return "";
    const min = Math.min(...data), max = Math.max(...data), span = (max - min) || 1;
    const pts = data.map((v, i) => `${pad + (i / (data.length - 1)) * (w - pad * 2)},${h - pad - ((v - min) / span) * (h - pad * 2)}`).join(" ");
    const color = opts.color || "var(--tenant-accent, #3B82F6)";
    const last = pts.split(" ").pop().split(",");
    return `<svg viewBox="0 0 ${w} ${h}" style="width:100%;height:${h}px;display:block">
      <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2" stroke-linejoin="round"/>
      <polygon points="${pad},${h - pad} ${pts} ${w - pad},${h - pad}" fill="${color}" opacity="0.12"/>
      <circle cx="${last[0]}" cy="${last[1]}" r="3" fill="${color}"/></svg>`;
  };
  window.zxBarChart = function (data, opts = {}) {
    const w = opts.w || 320, h = opts.h || 90, pad = 2;
    if (!data || !data.length) return "";
    const max = Math.max(...data) || 1;
    const bw = (w - pad * 2) / data.length;
    const color = opts.color || "var(--tenant-accent, #3B82F6)";
    let bars = "";
    data.forEach((v, i) => {
      const bh = Math.max(2, (v / max) * (h - pad * 2));
      bars += `<rect x="${(pad + i * bw + bw * 0.15).toFixed(1)}" y="${(h - pad - bh).toFixed(1)}" width="${(bw * 0.7).toFixed(1)}" height="${bh.toFixed(1)}" rx="1.5" fill="${color}" opacity="${0.45 + 0.55 * (v / max)}"/>`;
    });
    return `<svg viewBox="0 0 ${w} ${h}" style="width:100%;height:${h}px;display:block">${bars}</svg>`;
  };

  /* ---------- Shared 2D venue floor-map renderer (Public Display + Client Admin) ----------
   * Realistic top-down floor plan: hall outlines with door gaps, corridors, marked
   * Entrances / Exit, 10 numbered pods, density heat per zone and red crowd dots whose
   * size reflects local density. */
  window.zxVenueMapHTML = function (opts = {}) {
    const cm = ZXStore.state.crowdMetrics || {};
    const vm = cm.venueMap || { zones: [] };
    const W = opts.w || 640, H = opts.h || 360;
    const fs = opts.fs || 13;
    // map hot-zone densities onto floor-plan zones by name prefix
    const densFor = (z) => {
      const key = String(z.label).split("—")[0].trim().toLowerCase();
      const hz = (cm.hotZones || []).find(h => {
        const hk = String(h.zone || "").split(/[-—]/)[0].trim().toLowerCase();
        return hk && (key.includes(hk) || hk.includes(key.slice(0, 6)));
      });
      return hz ? hz.density : null;
    };
    const colFor = d => d === null ? "var(--tenant-accent)" : d > 85 ? "#ef4444" : d > 55 ? "#f59e0b" : "#22c55e";
    let svg = `<svg viewBox="0 0 ${W} ${H}" style="position:absolute;inset:0;width:100%;height:100%">`;
    svg += `<defs><pattern id="zxgrid" width="26" height="26" patternUnits="userSpaceOnUse"><path d="M26 0H0V26" fill="none" stroke="var(--line-soft)" stroke-width="1"/></pattern></defs>`;
    svg += `<rect x="0" y="0" width="${W}" height="${H}" fill="url(#zxgrid)" opacity=".5"/>`;
    // building outline
    svg += `<rect x="${W*0.02}" y="${H*0.03}" width="${W*0.96}" height="${H*0.94}" rx="14" fill="none" stroke="var(--line)" stroke-width="2"/>`;
    // corridors
    svg += `<path d="M ${W*0.18} ${H*0.97} L ${W*0.18} ${H*0.52} M ${W*0.48} ${H*0.05} L ${W*0.48} ${H*0.95} M ${W*0.5} ${H*0.57} L ${W*0.8} ${H*0.57} M ${W*0.97} ${H*0.72} L ${W*0.82} ${H*0.72}" stroke="var(--line)" stroke-width="3" stroke-dasharray="6 5" fill="none" opacity=".7"/>`;
    // zones (halls) — heat fill + door gap on the corridor side
    (vm.zones || []).forEach(z => {
      const d = densFor(z);
      const col = colFor(d);
      const op = d === null ? .10 : 0.12 + (d / 100) * 0.35;
      const x = z.x * W, y = z.y * H, w = z.w * W, h = z.h * H;
      svg += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" rx="8" fill="${col}" fill-opacity="${op.toFixed(2)}" stroke="${col}" stroke-width="1.5"/>`;
      // doorway marker (gap arc at bottom-center of each hall)
      if (h > 40) svg += `<path d="M ${(x + w/2 - 10).toFixed(1)} ${(y+h).toFixed(1)} A 10 10 0 0 1 ${(x + w/2 + 10).toFixed(1)} ${(y+h).toFixed(1)}" fill="none" stroke="var(--muted)" stroke-width="1.5" stroke-dasharray="2 2"/>`;
      svg += `<text x="${(x+8).toFixed(1)}" y="${(y+16).toFixed(1)}" font-size="${fs}" fill="var(--text)" font-weight="700">${zxesc(z.label)}</text>`;
      if (d !== null) svg += `<text x="${(x+8).toFixed(1)}" y="${(y+32).toFixed(1)}" font-size="${fs-2}" fill="${col}" font-weight="800">${d}% · cap ${z.capacity||""}</text>`;
    });
    // pods (10 numbered meeting pods)
    const pods = (vm.pods && vm.pods.length) ? vm.pods : ZXStore.pods().map((p, i) => ({ id: p.id, x: 0.1 + (i % 5) * 0.2, y: 0.2 + Math.floor(i / 5) * 0.5 }));
    pods.forEach(p => {
      const px = p.x * W, py = p.y * H;
      const num = String(p.id).replace(/[^0-9]/g, "") || "?";
      svg += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="9" fill="var(--panel)" stroke="var(--tenant-accent)" stroke-width="2"/>`;
      svg += `<text x="${px.toFixed(1)}" y="${(py+3.5).toFixed(1)}" font-size="${fs-2}" text-anchor="middle" fill="var(--tenant-accent)" font-weight="800">P${num}</text>`;
    });
    // entrances & exit markers
    (vm.entrances || []).forEach(e => {
      const ex = e.x * W, ey = e.y * H;
      svg += `<g transform="translate(${ex.toFixed(1)} ${ey.toFixed(1)})">` +
        `<rect x="-34" y="-11" width="68" height="22" rx="6" fill="#16a34a"/>` +
        `<path d="M -26 0 h 14 m -5 -5 l 5 5 l -5 5" stroke="#fff" stroke-width="2" fill="none"/>` +
        `<text x="2" y="4" font-size="${fs-3}" fill="#fff" font-weight="800">IN</text></g>`;
      svg += `<text x="${ex.toFixed(1)}" y="${(ey + (e.side === "S" ? 22 : -14)).toFixed(1)}" font-size="${fs-3}" text-anchor="middle" fill="#16a34a" font-weight="700">${zxesc(e.label)}</text>`;
    });
    (vm.exits || []).forEach(x0 => {
      const ex = x0.x * W, ey = x0.y * H;
      svg += `<g transform="translate(${ex.toFixed(1)} ${ey.toFixed(1)})">` +
        `<rect x="-34" y="-11" width="68" height="22" rx="6" fill="#dc2626"/>` +
        `<path d="M -14 0 h 26 m -5 -5 l 5 5 l -5 5" stroke="#fff" stroke-width="2" fill="none"/>` +
        `<text x="-2" y="4" font-size="${fs-3}" fill="#fff" font-weight="800" text-anchor="end">OUT</text></g>`;
      svg += `<text x="${ex.toFixed(1)}" y="${(ey + 22).toFixed(1)}" font-size="${fs-3}" text-anchor="middle" fill="#dc2626" font-weight="700">${zxesc(x0.label)}</text>`;
    });
    svg += `</svg>`;
    // crowd dots — density-driven count & colour (red where congested), smooth CSS motion
    const agents = cm.agents || [];
    const perZone = {};
    agents.forEach(a => { perZone[a.zone] = (perZone[a.zone] || 0) + 1; });
    const dots = agents.map(a => {
      const zn = (vm.zones || []).find(z => z.id === a.zone);
      const d = zn ? densFor(zn) : null;
      const crowd = d === null ? 40 : d;
      const col = crowd > 85 ? "#ef4444" : crowd > 55 ? "#f97316" : "#fbbf24";
      const sz = crowd > 85 ? 7 : crowd > 55 ? 6 : 5;
      return `<span class="agent-dot${a.state === "out" ? " agent-out" : ""}" style="left:${(a.x*100).toFixed(2)}%;top:${(a.y*100).toFixed(2)}%;width:${sz}px;height:${sz}px;background:${col};box-shadow:0 0 ${sz}px ${col}"></span>`;
    }).join("");
    return svg + dots;
  };

  /* ---------------- GLOBAL KEYBOARD SHORTCUTS (admins: "/" jumps to a section) ---------------- */
  window.zxEnableShortcuts = function () {
    document.addEventListener("keydown", (e) => {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      const ae = document.activeElement;
      if (/input|select|textarea/i.test(ae ? ae.tagName : "") || (ae && ae.isContentEditable)) return;
      const links = Array.from(document.querySelectorAll(".side-link"));
      if (!links.length) return;
      e.preventDefault();
      let wrap = document.getElementById("zxQuickNav");
      if (wrap) { wrap.remove(); return; }
      wrap = document.createElement("div");
      wrap.id = "zxQuickNav";
      wrap.className = "quicknav";
      wrap.innerHTML = `<div class="quicknav-card"><input class="form-input quicknav-input" placeholder="Jump to section… (Esc to close)" aria-label="Jump to section"><div class="quicknav-list">${links.map((l, i) => `<button type="button" class="quicknav-item" data-i="${i}">${l.textContent.trim()}</button>`).join("")}</div></div>`;
      document.body.appendChild(wrap);
      const input = wrap.querySelector(".quicknav-input");
      const items = Array.from(wrap.querySelectorAll(".quicknav-item"));
      const close = () => wrap.remove();
      const pick = (i) => { close(); const el = links[i]; if (el) { el.click(); el.focus(); } };
      input.focus();
      let cur = 0;
      const paintSel = () => items.forEach((it, i) => it.classList.toggle("sel", i === cur));
      paintSel();
      const filtered = () => items.forEach(it => { it.hidden = !it.textContent.toLowerCase().includes(input.value.toLowerCase()); });
      input.addEventListener("input", () => { filtered(); const vis = items.filter(x => !x.hidden); cur = 0; if (vis[0]) { cur = items.indexOf(vis[0]); } paintSel(); });
      input.addEventListener("keydown", (ev) => {
        if (ev.key === "Escape") { close(); return; }
        if (ev.key === "ArrowDown" || ev.key === "ArrowUp") {
          ev.preventDefault();
          const vis = items.filter(x => !x.hidden);
          if (!vis.length) return;
          const pos = vis.indexOf(items[cur]);
          const np = ev.key === "ArrowDown" ? Math.min(vis.length - 1, pos + 1) : Math.max(0, pos - 1);
          cur = items.indexOf(vis[np]); paintSel();
          items[cur].scrollIntoView({ block: "nearest" });
        } else if (ev.key === "Enter") { ev.preventDefault(); pick(cur); }
      });
      items.forEach(it => it.addEventListener("click", () => pick(+it.dataset.i)));
      wrap.addEventListener("click", (ev) => { if (ev.target === wrap) close(); });
    });
  };

  // Service worker registration (graceful when opened via file://)
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    });
  }
})();

/* ---------------- SHARED ENHANCEMENT HELPERS (v8.2) ---------------- */
(function installEnhancements() {
  // PWA install prompt → floating "Install App" button + badge state.
  // Works on http(s) AND file:// (demo mode): when no native beforeinstallprompt
  // event exists, the button still appears and explains manual installation.
  // opts.autoHideMs: show the button for N ms then fade away (views use 10000).
  // opts.force: show the button even without a native beforeinstallprompt event.
  window.zxEnableInstallPrompt = function (opts) {
    opts = opts || {};
    let deferred = null;
    let hideTimer = null;
    const setBadge = (txt, cls) => {
      const b = document.getElementById("pwaBadge");
      if (b) { b.textContent = txt; b.className = "badge " + cls; }
    };
    const isHttp = location.protocol.startsWith("http");
    const makeBtn = () => {
      if (document.getElementById("btnInstallPwa")) return document.getElementById("btnInstallPwa");
      const btn = document.createElement("button");
      btn.id = "btnInstallPwa";
      btn.type = "button";
      btn.className = "btn btn-blue install-fab";
      btn.setAttribute("aria-label", "Install this app on your device");
      btn.innerHTML = `<svg class="icon"><use href="#i-download"/></svg> Install App`;
      btn.onclick = async () => {
        clearTimeout(hideTimer); // don't vanish mid-interaction
        if (!deferred) { zxToast('To install: open browser menu → "Install app / Add to Home screen"', "info"); return; }
        deferred.prompt();
        const res = await deferred.userChoice.catch(() => ({ outcome: "dismissed" }));
        zxToast(res.outcome === "accepted" ? "Installing ZXSPRD AI 🎉" : "Install dismissed", res.outcome === "accepted" ? "success" : "info");
        deferred = null;
        btn.remove();
        setBadge("Installed / Offline-ready", "badge-green");
      };
      document.body.appendChild(btn);
      if (opts.autoHideMs) {
        hideTimer = setTimeout(() => {
          btn.classList.add("fade-out");
          setTimeout(() => btn.remove(), 450);
        }, opts.autoHideMs);
      }
      return btn;
    };
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferred = e;
      setBadge("Installable · tap Install", "badge-blue");
      makeBtn();
    });
    // Demo fallback: browsers only fire beforeinstallprompt in real installable contexts,
    // so on the view pages we surface the button anyway (it explains manual install if tapped).
    if (opts.force) {
      if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", makeBtn);
      else makeBtn();
    }
    window.addEventListener("appinstalled", () => {
      clearTimeout(hideTimer);
      document.getElementById("btnInstallPwa")?.remove();
      setBadge("Installed ✓", "badge-green");
      zxToast("App installed — launch it from your home screen!", "success");
    });
  };

  // Subtle click feedback on every button (never blocks existing handlers)
  document.addEventListener("click", (e) => {
    const el = e.target.closest("button:not(.no-ripple), .launch-card, .entry-btn, .ctrl-btn, .idle-btn");
    if (!el || el.disabled) return;
    el.classList.remove("clicked");
    void el.offsetWidth; // restart animation
    el.classList.add("clicked");
  }, true);

  // Respect reduced-motion preferences globally
  try {
    if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.classList.add("reduce-motion");
    }
  } catch (_) {}
})();
