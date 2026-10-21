/**
 * ============================================================
 * Event Intelligence Platform — UNIFIED DATA & STATE ENGINE (Final Demo)
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
  "index":          { key: "launcher",   name: "Event Intelligence Platform — Launcher", short: "EIP Launcher", theme: "#2563EB", hue: 222 },
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
  version: 11, // Demo schema v11 — adds ended-meeting records for Airport Show, HR Summit, Accessabilities, WETEX, Najah and Arablab+ (mtg-103..mtg-108); v9 multi-tenant event portfolio (Airport Show, HR Summit, Accessabilities, WETEX, Najah, Arablab+), long realistic transcripts, per-category demo reset, state import/export
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
      maxPods: 20, assignedPods: 3, status: "Active", createdDate: "2026-01-14", eventDates: "February 9–11, 2026",
      logoUrl: "", primaryColor: "#2563EB", headerText: "WPS 2026 Secure Intelligence Hub", footerText: "© 2026 World Police Summit · Event Intelligence Platform.",
      defaultLlm: "OCI Llama 3 70B (Private)", defaultTts: "ElevenLabs Neural v2", temperature: 0.4, cloudFallback: false,
      venueCapacity: 5000, currentOccupancy: 3420,
      tenantTheme: "dark", tenantLangs: ["en-US", "ar-AE", "fr-FR"], allowTenantTheme: true, allowTenantLangs: true
    },
    {
      id: "tenant-tech-expo", name: "Global Tech Innovation Expo", subdomain: "techexpo", tier: "Pro",
      maxPods: 5, assignedPods: 1, status: "Active", createdDate: "2026-02-02", eventDates: "March 10–12, 2026",
      logoUrl: "", primaryColor: "#10B981", headerText: "Tech Expo Live Intelligence", footerText: "Powered by Event Intelligence Platform AI",
      defaultLlm: "OpenAI GPT-4o", defaultTts: "Azure Neural TTS", temperature: 0.7, cloudFallback: true,
      venueCapacity: 2000, currentOccupancy: 1150,
      tenantTheme: "light", tenantLangs: ["en-US", "es-ES", "zh-CN"], allowTenantTheme: true, allowTenantLangs: false
    },
    {
      id: "tenant-airport-show", name: "Airport Show & Global Airport Leaders Forum", subdomain: "airportshow", tier: "Enterprise",
      maxPods: 12, assignedPods: 2, status: "Active", createdDate: "2026-05-11", eventDates: "October 12–14, 2026",
      logoUrl: "", primaryColor: "#F59E0B", headerText: "Airport Show · Dubai Live Intelligence", footerText: "© 2026 Airport Show & Global Airport Leaders Forum · Event Intelligence Platform.",
      defaultLlm: "Mistral Large (EU Sovereign)", defaultTts: "Azure Neural TTS", temperature: 0.5, cloudFallback: false,
      venueCapacity: 3200, currentOccupancy: 2050,
      tenantTheme: "dark", tenantLangs: ["en-US", "ar-AE"], allowTenantTheme: true, allowTenantLangs: true
    },
    {
      id: "tenant-hr-summit", name: "HR Summit 2026", subdomain: "hrsummit", tier: "Pro",
      maxPods: 8, assignedPods: 2, status: "Active", createdDate: "2026-06-02", eventDates: "October 14–15, 2026",
      logoUrl: "", primaryColor: "#8B5CF6", headerText: "HR Summit 2026 · People Intelligence Hub", footerText: "© 2026 HR Summit · Event Intelligence Platform.",
      defaultLlm: "OpenAI GPT-4o", defaultTts: "Google Cloud TTS Chirp3", temperature: 0.6, cloudFallback: true,
      venueCapacity: 1500, currentOccupancy: 870,
      tenantTheme: "light", tenantLangs: ["en-US", "ar-AE"], allowTenantTheme: true, allowTenantLangs: true
    },
    {
      id: "tenant-accessabilities", name: "Accessabilities Expo", subdomain: "accessabilities", tier: "Standard",
      maxPods: 6, assignedPods: 1, status: "Active", createdDate: "2026-06-18", eventDates: "October 19–21, 2026",
      logoUrl: "", primaryColor: "#EC4899", headerText: "Accessabilities Expo · Inclusive Intelligence", footerText: "© 2026 Accessabilities Expo · Event Intelligence Platform.",
      defaultLlm: "Azure OpenAI GPT-4o-mini", defaultTts: "Amazon Polly Standard", temperature: 0.5, cloudFallback: true,
      venueCapacity: 1200, currentOccupancy: 640,
      tenantTheme: "light", tenantLangs: ["en-US", "ar-AE"], allowTenantTheme: true, allowTenantLangs: true
    },
    {
      id: "tenant-wetex", name: "Water, Energy, Technology, and Environment Exhibition (WETEX)", subdomain: "wetex", tier: "Enterprise",
      maxPods: 15, assignedPods: 2, status: "Active", createdDate: "2026-05-27", eventDates: "October 20–22, 2026",
      logoUrl: "", primaryColor: "#0EA5E9", headerText: "WETEX · Green Intelligence Hub", footerText: "© 2026 WETEX · Dubai DEWA · Event Intelligence Platform.",
      defaultLlm: "OCI Llama 3 70B (Private)", defaultTts: "ElevenLabs Neural v2", temperature: 0.4, cloudFallback: false,
      venueCapacity: 4200, currentOccupancy: 2780,
      tenantTheme: "dark", tenantLangs: ["en-US", "ar-AE", "fr-FR"], allowTenantTheme: true, allowTenantLangs: true
    },
    {
      id: "tenant-najah", name: "Najah Exhibition", subdomain: "najah", tier: "Standard",
      maxPods: 6, assignedPods: 1, status: "Active", createdDate: "2026-07-08", eventDates: "October 25–27, 2026",
      logoUrl: "", primaryColor: "#22C55E", headerText: "Najah · Career Intelligence Zone", footerText: "© 2026 Najah Exhibition · Event Intelligence Platform.",
      defaultLlm: "Anthropic Claude 3.5 Sonnet", defaultTts: "Azure Neural TTS", temperature: 0.6, cloudFallback: true,
      venueCapacity: 1800, currentOccupancy: 930,
      tenantTheme: "dark", tenantLangs: ["ar-AE", "en-US"], allowTenantTheme: true, allowTenantLangs: true
    },
    {
      id: "tenant-arablab", name: "Arablab+", subdomain: "arablab", tier: "Pro",
      maxPods: 10, assignedPods: 2, status: "Active", createdDate: "2026-07-15", eventDates: "October 26–28, 2026",
      logoUrl: "", primaryColor: "#14B8A6", headerText: "Arablab+ · Lab Intelligence Network", footerText: "© 2026 Arablab+ · Event Intelligence Platform.",
      defaultLlm: "Mistral Large (EU Sovereign)", defaultTts: "Google Cloud TTS Chirp3", temperature: 0.5, cloudFallback: false,
      venueCapacity: 2200, currentOccupancy: 1310,
      tenantTheme: "dark", tenantLangs: ["en-US", "ar-AE", "fr-FR"], allowTenantTheme: true, allowTenantLangs: true
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
    { id: "POD-04", tenantId: "tenant-tech-expo", macAddress: "AC:DE:48:00:22:01", location: "Expo Hall 3 — Startup Stage", llmOverride: null, ttsOverride: null, standbyTimeoutMins: 10, status: "Online", currentMeetingId: null, densityLevel: "Medium", currentHeadcount: 60, mic1Role: "Host (Speaker 1)", mic2Role: "Guest (Speaker 2)", mic1Gain: 55, mic2Gain: 55 },
    { id: "POD-05", tenantId: "tenant-airport-show", macAddress: "AC:DE:48:00:31:01", location: "Dubai World Centre — Hall 1, Forum Stage", llmOverride: null, ttsOverride: null, standbyTimeoutMins: 10, status: "Online", currentMeetingId: null, densityLevel: "High", currentHeadcount: 120, mic1Role: "Host (Speaker 1)", mic2Role: "Guest (Speaker 2)", mic1Gain: 60, mic2Gain: 48 },
    { id: "POD-06", tenantId: "tenant-airport-show", macAddress: "AC:DE:48:00:31:02", location: "Dubai World Centre — Hall 2, Leaders Lounge", llmOverride: "Mistral Large (EU Sovereign)", ttsOverride: null, standbyTimeoutMins: 8, status: "Online", currentMeetingId: null, densityLevel: "Medium", currentHeadcount: 55, mic1Role: "Panel Moderator", mic2Role: "Audience Q&A", mic1Gain: 62, mic2Gain: 20 },
    { id: "POD-07", tenantId: "tenant-hr-summit", macAddress: "AC:DE:48:00:32:01", location: "DIFC Conference City — Main Auditorium", llmOverride: null, ttsOverride: null, standbyTimeoutMins: 10, status: "Online", currentMeetingId: null, densityLevel: "Medium", currentHeadcount: 90, mic1Role: "Keynote Speaker", mic2Role: "Guest (Speaker 2)", mic1Gain: 68, mic2Gain: 45 },
    { id: "POD-08", tenantId: "tenant-hr-summit", macAddress: "AC:DE:48:00:32:02", location: "DIFC Conference City — Workshop Room 2", llmOverride: null, ttsOverride: null, standbyTimeoutMins: 12, status: "Standby", currentMeetingId: null, densityLevel: "Low", currentHeadcount: 25, mic1Role: "Host (Speaker 1)", mic2Role: "Guest (Speaker 2)", mic1Gain: 50, mic2Gain: 50 },
    { id: "POD-09", tenantId: "tenant-accessabilities", macAddress: "AC:DE:48:00:33:01", location: "Dubai Festival Arena — Inclusion Pavilion", llmOverride: null, ttsOverride: null, standbyTimeoutMins: 10, status: "Online", currentMeetingId: null, densityLevel: "Medium", currentHeadcount: 48, mic1Role: "Host (Speaker 1)", mic2Role: "Interpreter", mic1Gain: 55, mic2Gain: 55 },
    { id: "POD-10", tenantId: "tenant-wetex", macAddress: "AC:DE:48:00:34:01", location: "Dubbie DEWA HQ — Green Tech Hall A", llmOverride: null, ttsOverride: null, standbyTimeoutMins: 10, status: "Online", currentMeetingId: null, densityLevel: "High", currentHeadcount: 130, mic1Role: "Host (Speaker 1)", mic2Role: "Guest (Speaker 2)", mic1Gain: 64, mic2Gain: 40 },
    { id: "POD-11", tenantId: "tenant-wetex", macAddress: "AC:DE:48:00:34:02", location: "DEWA HQ — Water & Energy Roundtable", llmOverride: null, ttsOverride: null, standbyTimeoutMins: 15, status: "Online", currentMeetingId: null, densityLevel: "Low", currentHeadcount: 18, mic1Role: "Panel Moderator", mic2Role: "Audience Q&A", mic1Gain: 58, mic2Gain: 15 },
    { id: "POD-12", tenantId: "tenant-najah", macAddress: "AC:DE:48:00:35:01", location: "Sharjah Expo Centre — Career Zone", llmOverride: null, ttsOverride: null, standbyTimeoutMins: 10, status: "Online", currentMeetingId: null, densityLevel: "Medium", currentHeadcount: 70, mic1Role: "Host (Speaker 1)", mic2Role: "Guest (Speaker 2)", mic1Gain: 52, mic2Gain: 52 },
    { id: "POD-13", tenantId: "tenant-arablab", macAddress: "AC:DE:48:00:36:01", location: "InterContinental Dubai — Lab Innovation Stage", llmOverride: null, ttsOverride: null, standbyTimeoutMins: 10, status: "Online", currentMeetingId: null, densityLevel: "Medium", currentHeadcount: 65, mic1Role: "Keynote Speaker", mic2Role: "Guest (Speaker 2)", mic1Gain: 66, mic2Gain: 44 },
    { id: "POD-14", tenantId: "tenant-arablab", macAddress: "AC:DE:48:00:36:02", location: "InterContinental Dubai — Regulators Roundtable", llmOverride: null, ttsOverride: null, standbyTimeoutMins: 10, status: "Standby", currentMeetingId: null, densityLevel: "Low", currentHeadcount: 14, mic1Role: "Panel Moderator", mic2Role: "Interpreter", mic1Gain: 50, mic2Gain: 50 }
  ],

  schedule: [
    { id: "sch-1", tenantId: "tenant-wps-2026", podId: "POD-01", title: "حوكمة الذكاء الاصطناعي في إنفاذ القانون السيادي", startTime: "10:00 AM", endTime: "10:45 AM", speakerHost: "عبدالله المطيري", speakerGuest: "فاطمة الظاهري", status: "Scheduled" },
    { id: "sch-2", tenantId: "tenant-wps-2026", podId: "POD-02", title: "الاستدلال على الحافة لتحليلات الحدود الفورية", startTime: "11:00 AM", endTime: "11:45 AM", speakerHost: "العقيد ماجد السويدي", speakerGuest: "نورة القحطاني", status: "Scheduled" },
    { id: "sch-3", tenantId: "tenant-wps-2026", podId: "POD-03", title: "كلمة افتتاحية مغلقة: سلامة الذكاء الاصطناعي الوطنية", startTime: "09:00 AM", endTime: "09:40 AM", speakerHost: "معالي سيف المنصوري", speakerGuest: "خالد الشامسي", status: "Completed" },
    { id: "sch-4", tenantId: "tenant-tech-expo", podId: "POD-04", title: "الكلمة الرئيسية: المؤسسة الوكيلة", startTime: "02:00 PM", endTime: "02:45 PM", speakerHost: "مريم الكتبي", speakerGuest: "سلطان الدوسري", status: "Scheduled" },
    { id: "sch-5", tenantId: "tenant-airport-show", podId: "POD-05", title: "Biometric Corridors: One Digital Identity Across Terminals", startTime: "09:00 AM", endTime: "09:45 AM", speakerHost: "Sarah Whitmore", speakerGuest: "Rashid Al Suwaidi", status: "Completed" },
    { id: "sch-6", tenantId: "tenant-airport-show", podId: "POD-06", title: "Global Airport Leaders Forum: Net-Zero 2030 Commitments", startTime: "11:15 AM", endTime: "12:00 PM", speakerHost: "Daniel Koffi", speakerGuest: "Layla Hassan", status: "Scheduled" },
    { id: "sch-7", tenantId: "tenant-airport-show", podId: "POD-05", title: "Retail & Duty-Free Revenue Intelligence", startTime: "02:00 PM", endTime: "02:40 PM", speakerHost: "Emma Larsen", speakerGuest: "Tarik Mansour", status: "Scheduled" },
    { id: "sch-8", tenantId: "tenant-hr-summit", podId: "POD-07", title: "Emiratisation in a Hybrid World: Metrics that Matter", startTime: "09:30 AM", endTime: "10:15 AM", speakerHost: "Mona Al Zaabi", speakerGuest: "Khalid Bin Sultan", status: "Completed" },
    { id: "sch-9", tenantId: "tenant-hr-summit", podId: "POD-08", title: "Workshop: AI-Assisted Talent Review Without Bias", startTime: "11:00 AM", endTime: "12:30 PM", speakerHost: "Dr. Huda Rashed", speakerGuest: "James O'Connor", status: "Scheduled" },
    { id: "sch-10", tenantId: "tenant-accessabilities", podId: "POD-09", title: "دورة الحياة الرقمية: تقنيات المساعدة لذوي الهمم", startTime: "10:00 AM", endTime: "10:45 AM", speakerHost: "شيخة المنصوري", speakerGuest: "عمر الفيصل", status: "Completed" },
    { id: "sch-11", tenantId: "tenant-wetex", podId: "POD-10", title: "Desalination Decarbonised: Green Hydrogen at Scale", startTime: "09:00 AM", endTime: "09:50 AM", speakerHost: "Dr. Abdulla Al Habtoor", speakerGuest: "Ingrid Solberg", status: "Completed" },
    { id: "sch-12", tenantId: "tenant-wetex", podId: "POD-11", title: "Smart Water Grids and Leak Analytics Roundtable", startTime: "12:00 PM", endTime: "12:45 PM", speakerHost: "Fatima Al Nuaimi", speakerGuest: "Vikram Mehta", status: "Scheduled" },
    { id: "sch-13", tenantId: "tenant-najah", podId: "POD-12", title: "مسار المهنة: من الجامعة إلى سوق العمل", startTime: "10:30 AM", endTime: "11:15 AM", speakerHost: "د. حمدة الشامسي", speakerGuest: "يوسف كارم", status: "Completed" },
    { id: "sch-14", tenantId: "tenant-arablab", podId: "POD-13", title: "Keynote: Lab Automation & AI-assisted Method Validation", startTime: "09:45 AM", endTime: "10:30 AM", speakerHost: "Dr. Nasser Al Qubaisi", speakerGuest: "Claire Dubois", status: "Completed" },
    { id: "sch-16", tenantId: "tenant-wetex", podId: "POD-11", title: "Desalination Meets Green Hydrogen: The Grid Balancing Question", startTime: "11:00 AM", endTime: "11:45 AM", speakerHost: "Fatima Al Nuaimi", speakerGuest: "Vikram Mehta", status: "Completed" },
    { id: "sch-15", tenantId: "tenant-arablab", podId: "POD-14", title: "Regulators Roundtable: ISO 17025 Compliance in the Gulf", startTime: "01:00 PM", endTime: "01:50 PM", speakerHost: "Ahmed Farouk", speakerGuest: "Sara Lindqvist", status: "Scheduled" }
  ],

  meetings: [
    {
      id: "mtg-103", tenantId: "tenant-airport-show", podId: "POD-05",
      title: "Biometric Corridors: One Digital Identity Across Terminals", startTime: "09:00 AM", endTime: "09:45 AM",
      hostName: "Sarah Whitmore", status: "Ended", hitlStatus: "Approved",
      guests: [{ id: "g1", badgeId: "BDG-7710", name: "Rashid Al Suwaidi", email: "rashid@gcaa.gov.ae", phone: "+971501234567", role: "VIP", checkedInAt: "08:52 AM" }],
      rawTranscript: [
        { time: "09:00:14", speaker: "Sarah Whitmore", text: "Good morning everyone. Welcome to the Biometric Corridors session. Today we are looking at how a single digital identity can move a passenger from check-in all the way to the lounge without touching a boarding pass again." },
        { time: "09:01:52", speaker: "Rashid Al Suwaidi", text: "Thank you Sarah. The premise is simple but the engineering is not. We are talking about stitching together airline systems, airport systems and border control under one consented biometric token." },
        { time: "09:03:31", speaker: "Sarah Whitmore", text: "Let us start with adoption numbers. Where does the current corridor actually stand across terminals today?" },
        { time: "09:04:47", speaker: "Rashid Al Suwaidi", text: "Roughly sixty-eight percent of eligible departing passengers have enrolled. But enrollment is not the bottleneck — reuse is. Only about forty-one percent of enrolled passengers actually use the lane on every trip." },
        { time: "09:06:20", speaker: "Sarah Whitmore", text: "That gap usually comes down to trust and friction at first touch. What is being done at the front of the funnel?" },
        { time: "09:07:58", speaker: "Rashid Al Suwaidi", text: "We moved enrollment to app-based pre-capture. Passengers opt in at booking, the face template is encrypted on device, and the airport never stores the raw image — only a matched/unmatched decision per journey." },
        { time: "09:09:33", speaker: "Sarah Whitmore", text: "Privacy by design. That is the phrase regulators keep repeating. How is the retention policy enforced technically?" },
        { time: "09:11:02", speaker: "Rashid Al Suwaidi", text: "Templates live for seventy-two hours after travel completes, then keys are destroyed through crypto-shredding. An independent auditor verifies the destruction logs monthly." },
        { time: "09:12:40", speaker: "Sarah Whitmore", text: "Monthly audits are good, but I would push for continuous attestation. If the destruction pipeline lags, you want to know within minutes, not weeks." },
        { time: "09:14:15", speaker: "Rashid Al Suwaidi", text: "Agreed. We are piloting a canary system — synthetic identities seeded into the store that must disappear on schedule. If a canary survives past its TTL, an alert fires immediately." },
        { time: "09:15:50", speaker: "Attendee — Airlines IT Lead", text: "From the airline side, the question is interoperability. If I enroll with carrier A, can my partner at the same terminal use it for a codeshare flight tomorrow?" },
        { time: "09:17:22", speaker: "Rashid Al Suwaidi", text: "Today, no — tokens are carrier-scoped. The roadmap item for this forum is a shared airport-level token so any participating carrier honours the same enrollment. That requires a common governance board." },
        { time: "09:19:01", speaker: "Sarah Whitmore", text: "Which brings us to cost sharing. Who funds the common infrastructure when benefits accrue mostly to carriers?" },
        { time: "09:20:35", speaker: "Attendee — Finance, Terminal Operator", text: "Our working model is a per-touchpoint transaction fee, capped monthly per carrier. Small carriers get a floor waiver so the economics do not exclude them." },
        { time: "09:22:10", speaker: "Attendee — Border Control Liaison", text: "One caution from our side: any shared token must not blur the legal separation between commercial identity verification and border verification. Two different mandates." },
        { time: "09:23:44", speaker: "Rashid Al Suwaidi", text: "Absolutely. The architecture keeps them as separate verifiers against the same template — the border system issues its own decision and never inherits the commercial one." },
        { time: "09:25:18", speaker: "Sarah Whitmore", text: "What about peak-hour throughput? Sixty-eight percent enrollment means the lanes still mix enrolled and manual travellers." },
        { time: "09:26:55", speaker: "Attendee — Operations Manager", text: "At the 06:30 wave arrivals we saw queue times drop from eleven minutes to four in the pilot terminal. The win came from signage plus staff redirecting unenrolled passengers before the document check." },
        { time: "09:28:30", speaker: "Sarah Whitmore", text: "So half the improvement is process, not technology. That should be the headline for operators who cannot rip out infrastructure." },
        { time: "09:30:05", speaker: "Rashid Al Suwaidi", text: "Exactly. Before buying a single camera, fix the redirect flow and the measurement. We instrumented every touchpoint before changing anything." },
        { time: "09:31:40", speaker: "Attendee — Accessibility Advocate", text: "How do these lanes behave for travellers who cannot present a stable face — post-surgery patients, or neurodivergent children?" },
        { time: "09:33:12", speaker: "Rashid Al Suwaidi", text: "Fair challenge. Every lane has a guaranteed manual fallback within twenty metres, and enrolment staff carry assisted-process training. No traveller may be turned away for failing biometric matching." },
        { time: "09:34:48", speaker: "Attendee — Accessibility Advocate", text: "Then publish that guarantee at the point of enrolment, not buried in policy. Trust collapses when people fear a dead end." },
        { time: "09:36:20", speaker: "Sarah Whitmore", text: "Noted and added to the action list. Let us close on governance timing. When does the shared-token board get chartered?" },
        { time: "09:37:55", speaker: "Rashid Al Suwaidi", text: "Draft charter goes to the GALF steering committee at the end of October. First pilots targeted for Q2 next year, two terminals, three carriers." },
        { time: "09:39:30", speaker: "Sarah Whitmore", text: "And continuous destruction attestation via canaries — that becomes a standing metric reported to the board?" },
        { time: "09:41:02", speaker: "Rashid Al Suwaidi", text: "Yes. Canary survival rate, zero tolerance target, reviewed weekly during pilot phase." },
        { time: "09:42:35", speaker: "Sarah Whitmore", text: "Excellent. To summarise: app-based pre-capture, carrier-scoped tokens moving to an airport-level shared token, transaction-fee funding with small-carrier waivers, guaranteed manual fallback, and canary-based destruction attestation." },
        { time: "09:43:58", speaker: "Attendee — Airlines IT Lead", text: "One addition — please include API latency SLAs in the charter. Our apps cannot block on a slow verifier." },
        { time: "09:44:40", speaker: "Sarah Whitmore", text: "Added. Thank you Rashid, and thank you all. Session recording and summary will follow approval workflow." }
      ],
      aiSummary: "The session mapped the path from carrier-scoped biometric tokens to a shared airport-level digital identity. Key findings: 68% enrollment but only 41% reuse, indicating trust and first-touch friction are the real bottlenecks. Architecture decisions confirmed: on-device encrypted pre-capture at booking, 72-hour template retention with crypto-shredding, and strict separation of commercial vs border verification against the same template. Operational data from the pilot terminal showed queue times falling from 11 to 4 minutes at peak waves, largely through process redesign (redirect + signage) rather than new hardware. New commitments: canary-based continuous destruction attestation reviewed weekly, guaranteed manual fallback published at enrolment for accessibility, a per-touchpoint transaction fee with small-carrier waivers, and a governance board charter going to the GALF steering committee at end of October with two-terminal, three-carrier pilots targeted for Q2.",
      sentimentScore: 84, actionItems: ["Charter the shared-token governance board; submit draft to GALF steering committee by end of October.", "Deploy canary-based destruction attestation and report canary survival weekly during pilot.", "Publish the guaranteed-manual-fallback commitment at every enrolment touchpoint.", "Include API latency SLAs for airline app integrations in the charter.", "Prepare Q2 pilot plan: two terminals, three carriers."]
    },
    {
      id: "mtg-104", tenantId: "tenant-hr-summit", podId: "POD-07",
      title: "Emiratisation Metrics That Actually Predict Retention", startTime: "10:00 AM", endTime: "10:45 AM",
      hostName: "Layla Haddad", status: "Ended", hitlStatus: "PendingApproval",
      guests: [{ id: "g1", badgeId: "BDG-8802", name: "Omar Benali", email: "omar.b@talent.gov.ae", phone: "+971527788990", role: "Speaker", checkedInAt: "09:54 AM" }],
      rawTranscript: [
        { time: "10:00:10", speaker: "Layla Haddad", text: "Welcome back. Our topic this morning is why Emiratisation dashboards measure hiring but fail to predict who stays." },
        { time: "10:01:45", speaker: "Omar Benali", text: "Because compliance metrics reward the intake, not the outcome. Nobody sanctions you for attrition at month fourteen; everybody sanctions you for missing the quarterly hire count." },
        { time: "10:03:20", speaker: "Layla Haddad", text: "So what does predict retention? Your team ran the longitudinal study across forty firms." },
        { time: "10:04:58", speaker: "Omar Benali", text: "Three signals beat everything else. First: whether the new hire's direct manager is also an Emirati with more than three years tenure. That single factor moved twelve-month retention by nineteen points." },
        { time: "10:06:30", speaker: "Attendee — CHRO, Retail Group", text: "Nineteen points is enormous. Was that causation or just good teams having both?" },
        { time: "10:08:05", speaker: "Omar Benali", text: "We controlled for firm, sector and cohort year using a difference-in-differences design around manager transitions. Still roughly fifteen to eighteen points net. Selection effects exist but they do not explain the whole gap." },
        { time: "10:09:40", speaker: "Layla Haddad", text: "Second signal?" },
        { time: "10:11:12", speaker: "Omar Benali", text: "Access to a technical certification within the first six months. Not promised — actually started. Firms that front-loaded certification saw the private-sector retention curve bend from a thirty percent cliff at month nine to something closer to flat." },
        { time: "10:12:50", speaker: "Attendee — HR Director, Banking", text: "We struggle there. Our programmes gate certifications until probation ends at six months. By then half the disengagement has already happened." },
        { time: "10:14:25", speaker: "Omar Benali", text: "That is exactly the finding. Disengagement spikes at months four to six when work feels clerical. Certification gives a visible horizon. Three banks moved exam sponsorship to week two and self-reported engagement jumped immediately." },
        { time: "10:16:00", speaker: "Attendee — HR Director, Banking", text: "Cost was our blocker. Can you quantify it?" },
        { time: "10:17:35", speaker: "Omar Benali", text: "Roughly eight thousand dirhams per certification versus replacement cost studies pegging early attrition at ninety to one hundred twenty thousand. Even a modest retention gain pays for the entire programme twice over." },
        { time: "10:19:10", speaker: "Layla Haddad", text: "And the third signal?" },
        { time: "10:20:42", speaker: "Omar Benali", text: "Mobility transparency. Employees who can see two credible internal next roles stay. Those who cannot see a path leave to find one. It was the strongest predictor of intention-to-leave at survey time." },
        { time: "10:22:20", speaker: "Attendee — Talent Partner, Consultancy", text: "Transparency is cheap. Why does nobody do it?" },
        { time: "10:23:55", speaker: "Omar Benali", text: "Because it forces managers to stop hoarding. Internal mobility cannibalises team stability, so middle management quietly resists. Any policy that ignores the manager's incentive fails." },
        { time: "10:25:30", speaker: "Layla Haddad", text: "Then tie mobility to manager KPIs. Reward successful internal placements like external hires." },
        { time: "10:27:05", speaker: "Omar Benali", text: "Two firms in the sample did exactly that last year. Their placement rate tripled and their compliance numbers improved anyway — the dashboard fear was misplaced." },
        { time: "10:28:40", speaker: "Attendee — Government HR Representative", text: "For public sector entities the constraint is grade structures, not willingness. Mobility across entities breaks seniority calculations." },
        { time: "10:30:15", speaker: "Omar Benali", text: "True, and that needs a policy answer, not an HR-tool answer. But within-entity mobility is fully in your control and covers most of the effect size." },
        { time: "10:31:50", speaker: "Layla Haddad", text: "Let me test a composite metric proposal: a Retention Readiness Index — manager match rate, certification-started rate at month three, and visible-pathway coverage. Publish it alongside the compliance number." },
        { time: "10:33:25", speaker: "Omar Benali", text: "I would support that, with one warning: the moment it is sanctioned, gaming starts. Keep it diagnostic first, punitive later, and audit definitions annually." },
        { time: "10:35:00", speaker: "Attendee — People Analytics Lead", text: "Can we get the de-identified dataset? We want to validate against our own turnover models before endorsing publicly." },
        { time: "10:36:35", speaker: "Omar Benali", text: "It will be available through the summit research portal next week, under a data-use agreement. Methodology appendix included — the diff-in-diff code is in the repo." },
        { time: "10:38:10", speaker: "Layla Haddad", text: "Wonderful. Actions: pilot the index with the five volunteer firms, move certification sponsorship to week two in banking partners, and put manager mobility KPIs into next cycle's scorecards." },
        { time: "10:39:45", speaker: "Attendee — CHRO, Retail Group", text: "Retail volunteers for the index pilot. Our month-nine cliff is exactly the problem you described." },
        { time: "10:41:15", speaker: "Omar Benali", text: "Perfect — high-volume cohorts make the clearest signal. I will reach out after the portal release." },
        { time: "10:42:50", speaker: "Layla Haddad", text: "Recording goes to approval. Thank you Omar — this was the most evidence-dense session we have run here." },
        { time: "10:44:10", speaker: "Omar Benali", text: "Thank you. The data exists; we just have to look at the right months." }
      ],
      aiSummary: "This session examined why Emiratisation dashboards track hiring but fail to predict retention, drawing on a forty-firm longitudinal study. Three signals dominated: (1) having an Emirati direct manager with 3+ years tenure raised 12-month retention by ~19 points (15–18 net after difference-in-differences controls); (2) starting — not merely promising — a technical certification within the first six months flattened the typical month-nine attrition cliff, with costs (~AED 8k per certification) dwarfed by replacement costs (AED 90–120k); (3) visible internal career pathways were the strongest predictor of intention-to-leave, though resisted by middle management due to hoarding incentives. Proposed next steps: a diagnostic 'Retention Readiness Index' (manager match rate, certification-started rate at month three, visible-pathway coverage) published alongside compliance figures, manager mobility KPIs, moving certification sponsorship to week two, and a five-firm pilot including retail and banking volunteers. De-identified dataset and methodology to be released via the summit research portal under a data-use agreement.",
      sentimentScore: 88, actionItems: ["Pilot the Retention Readiness Index with five volunteer firms.", "Move certification sponsorship to week two with banking partners.", "Add internal-mobility KPIs to manager scorecards next cycle.", "Release de-identified dataset and diff-in-diff code via research portal.", "Follow up with retail group on the month-nine attrition cohort."]
    },
    {
      id: "mtg-105", tenantId: "tenant-accessabilities", podId: "POD-09",
      title: "دورة الحياة الرقمية: تقنيات المساعدة لذوي الهمم", startTime: "10:00 AM", endTime: "10:45 AM",
      hostName: "شيخة المنصوري", status: "Ended", hitlStatus: "Approved",
      guests: [{ id: "g1", badgeId: "BDG-6620", name: "عمر الفيصل", email: "omar.faisal@access-expo.ae", phone: "+971553344556", role: "VIP", checkedInAt: "09:53 AM" }],
      rawTranscript: [
        { time: "10:00:15", speaker: "شيخة المنصوري", text: "أهلاً وسهلاً بالحضور الكريم. محور جلستنا اليوم هو دورة الحياة الرقمية الكاملة للأشخاص ذوي الإعاقة، من التعليم إلى العمل إلى الخدمات الحكومية." },
        { time: "10:02:00", speaker: "عمر الفيصل", text: "شكراً شيخة. النقطة الجوهرية: التقنيات المساعدة لا تُقاس بأجهزة تُسلَّم، بل باستقلالية تُبنى. يجب أن نتوقف عن عدّ الأجهزة ونبدأ عدّ النتائج." },
        { time: "10:03:40", speaker: "شيخة المنصوري", text: "ما هي المؤشرات التي تقترحونها لقياس النتائج فعلياً؟" },
        { time: "10:05:25", speaker: "عمر الفيصل", text: "ثلاثة مؤشرات: معدل استخدام التقنية بعد ستة أشهر، ودرجة الرضا التي يعبّر عنها المستخدم نفسه، وأثر الجهاز على الالتحاق بالتعليم أو العمل." },
        { time: "10:07:05", speaker: "حضور — مديرة مركز تأهيل", text: "المؤشر الأول مؤلم بالنسبة لنا. نوزّع أجهزة بتكلفة عالية ثم يتوقف الاستخدام خلال أسابيع لأن التدريب يصاحب التسليم ولا يعقبه." },
        { time: "10:08:50", speaker: "عمر الفيصل", text: "وهذا بالضبط ما أثبتته الدراسات. الجهاز بلا تدريب مستمر يصبح خردة باهظة. الحل نموذج التدريب الممتد: متابعة شهرية لمدة عام كامل بعد التسليم." },
        { time: "10:10:30", speaker: "شيخة المنصوري", text: "هل جُرّب هذا النموذج في المنطقة؟" },
        { time: "10:12:10", speaker: "عمر الفيصل", text: "نعم، في تجريب محدود بأبوظبي: استمرارية الاستخدام ارتفعت من أربعين بالمئة إلى سبعة وسبعين بالمئة خلال عام، مقابل زيادة عشرة بالمئة فقط في التكلفة الكلية." },
        { time: "10:13:55", speaker: "حضور — ممثل هيئة تنظيم الاتصالات", text: "منظّمياً، كيف نلزم مزودي الخدمات الرقمية بمعايير الوصول؟ كثير من التطبيقات الحكومية ما زالت تفحص تلقائياً دون مراجعة بشرية." },
        { time: "10:15:40", speaker: "عمر الفيصل", text: "الفحص الآلي ضروري لكنه غير كافٍ. المعيار الذهبي هو اختبار مع مستخدمين حقيقيين: لجنة وصول تضم أشخاصاً من كل فئة إعاقة ترفض الإطلاق حتى اجتياز السيناريوهات العملية." },
        { time: "10:17:20", speaker: "حضور — مطور تطبيقات", text: "هذا يعني تكلفة وزمناً إضافياً في مرحلة التطوير. هل يوجد إطار زمني واقعي للموردين الحكوميين؟" },
        { time: "10:19:05", speaker: "شيخة المنصوري", text: "الحكومة الرقمية اعتمدت مؤخراً مبدأ إدراج متطلبات الوصول في العقود منذ الطرح، لا كإصلاح لاحق. المورد الذي لم يخطط للاختبار البشري يدفع ثمن عقده." },
        { time: "10:20:45", speaker: "عمر الفيصل", text: "وهذه أقوى رسالة ممكنة: المال قبل التصميم. حين تصبح البنود جزءاً من الدفع تتحرك السوق أسرع من أي ورشة توعوية." },
        { time: "10:22:30", speaker: "حضور — أم لطفل من ضعاف السمع", text: "أرجو ألا ننسَ الأسر. التطبيق موجود لكن الأهل لا يعرفون كيفية تفعيل الترجمة النصية الفورية في المدارس. الفجوة معلوماتية بحتة." },
        { time: "10:24:15", speaker: "عمر الفيصل", text: "نقطة دقيقة جداً. نقترح برنامج سفراء الوصول في كل منطقة سكنية: تدريب مدفوع الأجر لأهل الخبرة، أي لأشخاص ذوي إعاقة أنفسهم يدرّبون الأسر." },
        { time: "10:25:55", speaker: "شيخة المنصوري", text: "وهو حل مزدوج: يبني الكفاءة المجتمعية ويوفر فرص عمل ضمن الاقتصاد الدامج. أؤيده بقوة." },
        { time: "10:27:40", speaker: "حضور — مديرة مركز تأهيل", text: "ماذا عن توحيد واجهات الأجهزة؟ كل مورد له لوحة تحكم مختلفة، والمستخدم ينتقل بين جهاز منزلي ومدرسي وشخصي." },
        { time: "10:29:20", speaker: "عمر الفيصل", text: "مجلس معايير التقنيات المساعدة يعمل على مواصفات واجهة موحدة؛ المسودة الإقليمية ستُعرض هنا قبل نهاية المعرض. من مصلحة الموردين المشاركة الآن لأن التبنّي الحكومي سيُربط بالمواصفة." },
        { time: "10:31:05", speaker: "حضور — ممثل هيئة تنظيم الاتصالات", text: "سنرفع توصية بإدراج المواصفة الموحدة في قائمة المتطلبات الفنية للاستيراد خلال الربع القادم." },
        { time: "10:32:45", speaker: "شيخة المنصوري", text: "ممتاز. لنلخّص الالتزامات: نموذج التدريب الممتد يُدرج في عقود العام القادم، ولجان اختبار الوصول تربط بالإفراج المالي، وبرنامج سفراء الوصول يبدأ بثلاث مناطق تجريبية." },
        { time: "10:34:30", speaker: "عمر الفيصل", text: "وأضيف بنداً قياسياً: تقرير نصف سنوي علني لمؤشرات الاستمرارية والرضا، لأن الشفافية تصحّح السوق أفضل من العقوبات وحدها." },
        { time: "10:36:10", speaker: "حضور — مطور تطبيقات", text: "بصفتي مطوراً، أطلب توثيقاً مفتوحاً لواجهات الاختبار. سنطبّق إن وُجد مرجع واضح." },
        { time: "10:37:50", speaker: "عمر الفيصل", text: "ستُنشر مكتبة أدوات الاختبار مع أمثلة سيناريوهات بالعربية والإنجليزية عبر بوابة المعرض الأسبوع القادم." },
        { time: "10:39:35", speaker: "شيخة المنصوري", text: "إذاً المخرجات واضحة. شكراً عمر، وشكراً لكل من شارك بصوته وتجربته الحية." },
        { time: "10:41:20", speaker: "حضور — أم لطفل من ضعاف السمع", text: "شكراً. أرجو أن يصل برنامج السفراء إلى أولياء أمور الأطفال قبل بداية العام الدراسي." },
        { time: "10:42:55", speaker: "شيخة المنصوري", text: "هذا هدفنا الزمني تحديداً: إطلاق ثلاث مناطق قبل سبتمبر. الجلسة تسجل وتُلخّص وتُرسل للجهات المعنية بعد الاعتماد." },
        { time: "10:44:15", speaker: "عمر الفيصل", text: "الاستقلالية تُقاس بالنتائج لا بالأجهزة. شكراً لكم جميعاً." }
      ],
      aiSummary: "ناقشت الجلسة دورة الحياة الرقمية الكاملة للأشخاص ذوي الإعاقة وانتقلت من عدّ الأجهزة إلى قياس النتائج عبر ثلاثة مؤشرات: معدل الاستخدام بعد ستة أشهر، ورضا المستخدم الذاتي، والأثر على التعليم والعمل. أبرز ما استُعرض: تجربة أبوظبي في نموذج التدريب الممتد التي رفعت استمرارية الاستخدام من ٤٠٪ إلى ٧٧٪ بكلفة إضافية لا تتجاوز ١٠٪، وربط لجان اختبار الوصول بالإفراج المالي في العقود الحكومية بدل الإصلاح اللاحق، واقتراح برنامج سفراء الوصول لتدريب الأسر بقيادة أشخاص ذوي إعاقة بما يجمع بين بناء الكفاءة وخلق فرص عمل. كما أُعلن عن مسودة المواصفة الإقليمية لواجهات الأجهزة الموحدة ونية إدراجها في متطلبات الاستيراد، وعن نشر مكتبة أدوات اختبار رسمية بالعربية والإنجليزية. الالتزامات الختامية: التدريب الممتد في عقود العام القادم، تقرير نصف سنوي علني للمؤشرات، وإطلاق ثلاث مناطق تجريبية للسفراء قبل سبتمبر.",
      sentimentScore: 91, actionItems: ["إدراج نموذج التدريب الممتد في عقود تجهيز الأجهزة للعام القادم", "تشكيل لجان اختبار وصول تربط الإفراج المالي باجتياز السيناريوهات", "إطلاق برنامج سفراء الوصول في ثلاث مناطق قبل سبتمبر", "رفع توصية إدراج المواصفة الموحدة في متطلبات الاستيراد خلال الربع القادم", "نشر مكتبة أدوات الاختبار عبر بوابة المعرض الأسبوع القادم"]
    },
    {
      id: "mtg-106", tenantId: "tenant-wetex", podId: "POD-11",
      title: "Desalination Meets Green Hydrogen: The Grid Balancing Question", startTime: "11:00 AM", endTime: "11:45 AM",
      hostName: "Fatima Al Nuaimi", status: "Ended", hitlStatus: "Approved",
      guests: [{ id: "g1", badgeId: "BDG-3301", name: "Vikram Mehta", email: "v.mehta@masdar.ae", phone: "+971562233445", role: "Speaker", checkedInAt: "10:54 AM" }],
      rawTranscript: [
        { time: "11:00:12", speaker: "Fatima Al Nuaimi", text: "Welcome to WETEX day two. We are asking a deceptively simple question: should mega-scale desalination run on the grid, beside the grid, or instead of the grid when green hydrogen electrolysis is involved?" },
        { time: "11:02:05", speaker: "Vikram Mehta", text: "Deceptively is the right word. Desalination is one of the few loads large enough to matter for grid planning — around fifteen percent of national electricity demand in Gulf states — and electrolysis wants exactly the same cheap surplus hours." },
        { time: "11:03:40", speaker: "Fatima Al Nuaimi", text: "Let us ground this in numbers. What does a modern RO plant actually consume per cubic metre now?" },
        { time: "11:05:15", speaker: "Vikram Mehta", text: "Best-in-class seawater reverse osmosis sits near two point eight kilowatt-hours per cubic metre. Thermal multi-stage distillation is still four to six, but its share falls every year. The efficiency frontier has largely plateaued though — membranes, not dreams, are the constraint now." },
        { time: "11:06:50", speaker: "Attendee — DEWA Planning Engineer", text: "Plateaued or not, load-shifting is where the easy wins are. Our solar curve peaks at midday while residential demand peaks at nine in the evening. If plants run flexibly they eat the daytime surplus directly." },
        { time: "11:08:30", speaker: "Fatima Al Nuaimi", text: "How flexible can a real plant be? Membranes foul if you cycle them hard, correct?" },
        { time: "11:10:05", speaker: "Vikram Mehta", text: "Partially true, mostly overblown. Modern energy-recovery pressure exchangers tolerate deep cycling far better than legacy designs. The genuine constraints are brine stratification in intake outfalls and minimum flow through antiscalant dosing lines. Both are solvable with storage buffering." },
        { time: "11:11:45", speaker: "Attendee — Water Storage Operator", text: "Which brings us to the tank as battery. Dubai already keeps roughly two days of strategic storage. If we treat that reservoir as dispatchable energy, the plant can run flat-out on solar and let the tank cover evening peak." },
        { time: "11:13:20", speaker: "Fatima Al Nuaimi", text: "What is the economics of that versus grid batteries?" },
        { time: "11:14:55", speaker: "Vikram Mehta", text: "Rough order of magnitude: pumped or reservoir water storage costs about one-third per megawatt-hour of lithium for the durations we need here, because water is heavy but free and the infrastructure exists. The catch is round-trip losses when you route through desalination rather than direct pumping." },
        { time: "11:16:35", speaker: "Attendee — Hydrogen Programme Lead", text: "Now the hydrogen angle. Electrolyser capital cost only makes sense at high utilisation, above sixty percent. Midday solar alone gives maybe forty. Do electrolyses and desalination compete for the same surplus?" },
        { time: "11:18:10", speaker: "Vikram Mehta", text: "They do, and that competition is healthy if it is priced. Our recommendation: a marginal-price dispatch signal so plants bid against electrolyser load in real time. Whoever values the kilowatt-hour more takes it; nobody strands assets." },
        { time: "11:19:50", speaker: "Attendee — DEWA Planning Engineer", text: "A spot market for surplus within an hour of forecast error is optimistic for our regulatory environment today." },
        { time: "11:21:25", speaker: "Fatima Al Nuaimi", text: "Then start with a balancing corridor — a negotiated bilateral between one plant cluster and one electrolyser park, shadow-priced first, live after a year of back-testing." },
        { time: "11:23:00", speaker: "Attendee — Hydrogen Programme Lead", text: "We would sign up to shadow-pricing immediately. Our investors need revenue certainty before commissioning, and a demonstrated dispatch rule is worth more than another subsidy." },
        { time: "11:24:40", speaker: "Vikram Mehta", text: "One technical warning: co-location changes water chemistry needs. Electrolysers want ultra-pure feed — double RO plus EDI — which raises specific energy by roughly zero point five kilowatt-hours per cubic metre of product water. Budget it early or the plant retrofit will hurt." },
        { time: "11:26:15", speaker: "Attendee — Researcher, Masdar Institute", text: "And brine. Co-located plants multiply output. There is a lithium-and-magnesium recovery pilot in Abu Dhabi showing thirty percent cost reduction if brine is treated as ore, not waste. That flips the environmental argument entirely." },
        { time: "11:27:55", speaker: "Fatima Al Nuaimi", text: "So the portfolio view: flexible operation, reservoir-as-battery, dispatch signalling, ultrapure budgeting, and mineralised brine. Five levers. Which one unlocks fastest in the UAE context?" },
        { time: "11:29:30", speaker: "Vikram Mehta", text: "Reservoir-as-battery, because the assets exist and no new law is needed. It is an operating-contract change, not a construction project. I would see results within two tariff cycles." },
        { time: "11:31:05", speaker: "Attendee — DEWA Planning Engineer", text: "Agreed on sequencing. We can pilot night-flat/day-surge scheduling on Jebel Ali Plant D's interconnection this winter without touching equipment." },
        { time: "11:32:45", speaker: "Attendee — Researcher, Masdar Institute", text: "Brine mineralisation needs a pilot permit stream. Currently recovered salts fall between industrial waste and product regulation — nobody owns the approval." },
        { time: "11:34:20", speaker: "Fatima Al Nuaimi", text: "That becomes a policy action item for the WETEX regulator roundtable tomorrow afternoon. Vikram, can you draft the dispatch-corridor concept note?" },
        { time: "11:35:55", speaker: "Vikram Mehta", text: "By end of next week, with the shadow-pricing methodology and the electrolyser purity annex attached." },
        { time: "11:37:30", speaker: "Attendee — Hydrogen Programme Lead", text: "Include the utilisation sensitivity too — our lenders will stress anything below fifty-five percent." },
        { time: "11:39:05", speaker: "Fatima Al Nuaimi", text: "Noted. Summary for the record: desalination shifts from baseload to flexible asset; storage buffers absorb solar surplus; a bilateral dispatch corridor is shadow-tested before any market mechanism; brine moves toward ore status pending regulatory ownership; ultrapure requirements are budgeted at design stage." },
        { time: "11:40:40", speaker: "Vikram Mehta", text: "That is the honest version of what was said. Thank you all." },
        { time: "11:42:00", speaker: "Fatima Al Nuaimi", text: "Recording goes through approval; minutes circulate to DEWA planning and the hydrogen office. See you at the regulator roundtable." }
      ],
      aiSummary: "This session reframed mega-scale desalination from fixed baseload to a flexible grid asset capable of absorbing midday solar surplus. Key data: best-in-class seawater RO now runs near 2.8 kWh/m³ (thermal distillation 4–6, declining), efficiency gains have plateaued, and load-shifting is the remaining easy win. Four proposals emerged: (1) treat existing strategic water reservoirs (~2 days of storage) as a low-cost 'tank as battery' — roughly one-third the per-MWh cost of lithium for the durations needed — implementable via operating-contract change within two tariff cycles, with a Jebel Ali Plant D scheduling pilot proposed for this winter; (2) a marginal-price dispatch signal so plants and electrolysers bid for the same surplus hours, starting as a shadow-priced bilateral 'balancing corridor' before any market mechanism; (3) budgeting the +0.5 kWh/m³ penalty for ultrapure (double RO + EDI) feedwater required by co-located electrolysers; and (4) reclassifying brine as ore — an Abu Dhabi recovery pilot shows ~30% cost reductions for lithium/magnesium extraction — which currently lacks a regulatory owner for approvals. Action items: concept note with shadow-pricing methodology and purity annex due next week, utilisation sensitivity for lenders (stress threshold 55%), and a brine-regulation item tabled at tomorrow's regulator roundtable.",
      sentimentScore: 86, actionItems: ["Draft dispatch-corridor concept note with shadow-pricing methodology by end of next week.", "Pilot night-flat/day-surge scheduling on Jebel Ali Plant D interconnection this winter.", "Add electrolyser utilisation sensitivity (55% floor) to investor materials.", "Table brine-recovery regulatory ownership at the WETEX regulator roundtable.", "Budget ultrapure feedwater (+0.5 kWh/m³) in all co-location designs."]
    },
    {
      id: "mtg-107", tenantId: "tenant-najah", podId: "POD-12",
      title: "مسار المهنة: من الجامعة إلى سوق العمل", startTime: "10:30 AM", endTime: "11:15 AM",
      hostName: "د. حمدة الشامسي", status: "Ended", hitlStatus: "PendingApproval",
      guests: [{ id: "g1", badgeId: "BDG-4415", name: "يوسف كارم", email: "yousuf.karim@najah-expo.ae", phone: "+971589900112", role: "Speaker", checkedInAt: "10:24 AM" }],
      rawTranscript: [
        { time: "10:30:20", speaker: "د. حمدة الشامسي", text: "أهلاً بكم في ناجح. سؤال هذه الجلسة مباشر: لماذا يتخرج آلاف الطلبة سنوياً ثم يقضي نصفهم أكثر من عام كامل قبل أول وظيفة ذات معنى؟" },
        { time: "10:32:05", speaker: "يوسف كارم", text: "لأن السوق والجامعة يتحدثان لغتين مختلفتين. الجامعة تقيس الساعات المعتمدة، والسوق يقيس القدرة على إنجاز مهمة حقيقية في أسبوع الأول." },
        { time: "10:33:40", speaker: "د. حمدة الشامسي", text: "هل المشكلة في المناهج أم في التجربة العملية؟" },
        { time: "10:34:55", speaker: "يوسف كارم", text: "في الربط بينهما. لدينا خريجون ببرمجة ممتازة ولا يعرفون قراءة تذكرة خطأ في نظام إنتاج. الفجوة سلوكية إجرائية أكثر منها معرفية." },
        { time: "10:36:30", speaker: "حضور — مرشد أكاديمي", text: "المرشدون الأكاديميون يكتشفون الأمر متأخرين. الطالب لا يبدأ البحث عن عمل إلا في الفصل الأخير، وسوق التدريب الصيفي يكون قد أغلق أبوابه حينها." },
        { time: "10:38:05", speaker: "يوسف كارم", text: "وهذا وحده يفسر جزءاً كبيراً من التأخير. الشركات تغلق باب التدريب في فبراير، والطالب يستيقظ في أبريل. نحتاج تقويماً مهنياً يبدأ من السنة الأولى." },
        { time: "10:39:40", speaker: "د. حمدة الشامسي", text: "من يطبّق هذا التقويم؟ الجامعة أم وزارة التعليم؟" },
        { time: "10:41:15", speaker: "حضور — ممثلة منطقة حرة", text: "القطاع الخاص يستطيع البدء فوراً. مناطقنا الحرة تفتح ثمانين مقعد تدريب مبكر سنوياً لطلبة السنة الثانية والثالثة مقابل التزام الجامعات بساعة معتمدة واحدة." },
        { time: "10:42:50", speaker: "يوسف كارم", text: "هذا نموذج «التدريب المصدّق»: تجربة عملية تُحتسب أكاديمياً وتُوثق رقمياً في سجل الطالب. الشهادة وحدها لم تعد عملة مقبولة في التوظيف." },
        { time: "10:44:25", speaker: "حضور — مدير موارد بشرية", text: "لكن سجلات التدريب اليوم ورقية ومجزأة. كيف نثق بأن المتدرب فعلاً أنجز ما يدّعيه؟" },
        { time: "10:46:00", speaker: "يوسف كارم", text: "توقيع رقمي من مشرف التدريب على مهام محددة، قابل للتحقق من أي جهة توظيف. التقنيات المساعدة التي تسجل جلسات القمة نفسها يمكنها توثيق ساعات التدريب تلقائياً." },
        { time: "10:47:35", speaker: "د. حمدة الشامسي", text: "جميل أن نستخدم منصتنا الذكية كنموذج حي. ماذا عن الطلبة الذين لا تصلهم الفرص أصلاً — خارج المدن الكبرى؟" },
        { time: "10:49:10", speaker: "حضور — مرشد أكاديمي", text: "الفجوة الجغرافية حقيقية. نسبة الحصول على تدريب صيفي في الجامعات الإقليمية نصف نظيرتها في العاصمة تقريباً." },
        { time: "10:50:45", speaker: "يوسف كارم", text: "الحل الجزئي: التدريب المدمج عن بُعد بمهام حقيقية من شركات كبرى، مع يوم حضور شهري واحد للمهارات التي لا تُعلَّم عن بعد." },
        { time: "10:52:20", speaker: "حضور — طالبة هندسة", text: "أرجو ألا ننسَ الجانب النفسي. المقابلات المرعبة تصنع رفضاً للتقديم أصلاً. كثير من زملائي لا يفتحون حتى بوابة التوظيف." },
        { time: "10:53:55", speaker: "د. حمدة الشامسي", text: "نقطة جوهرية. نقترح عيادات مهنة أسبوعية: محاكاة مقابلات مسجلة مع تغذية راجعة، وتلخيص ذكاء اصطناعي لأداء الطالب بعد كل محاولة." },
        { time: "10:55:30", speaker: "يوسف كارم", text: "التلخيص الآلي للمقابلات التجريبية بالضبط ما تفعله منصتنا مع الجلسات. يمكن تشغيل نسخة تجريبية داخل المعرض هذا الأسبوع." },
        { time: "10:57:05", speaker: "حضور — مدير موارد بشرية", text: "من جهة التوظيف أوافق إن قلّل وقت الفرز. اليوم نقضي أربعين دقيقة لكل سيرة ذاتية لأن لا شيء فيها قابل للتحقق." },
        { time: "10:58:40", speaker: "د. حمدة الشامسي", text: "إذاً تتقاطع المصالح: التحقق يوفّر وقت الموظِّف ويكافئ الطالب المنجز. لننتقل للرقم الأصعب — الرواتب الافتتاحية غير المتناسبة مع المؤهلات." },
        { time: "11:00:15", speaker: "يوسف كارم", text: "السوق يعالج ذلك تدريجياً عبر نماذج التدرج: عرض دخول واضح بثلاث محطات مراجعة. المشكلة أن الشركات الصغيرة لا تعرف كيفية تصميمها." },
        { time: "11:01:50", speaker: "حضور — ممثلة منطقة حرة", text: "يمكن نشر قالب مفتوح للتدرج الوظيفي مع المناطق الحرة؛ نستضيف ورشة للشركات متناهية الصغر خلال نوفمبر." },
        { time: "11:03:25", speaker: "د. حمدة الشامسي", text: "ممتاز. ولتفادي تحامل الخوارزميات، يجب تدقيق أي أداة فرز آلية على أساس النوع والمنطقة قبل اعتمادها." },
        { time: "11:05:00", speaker: "يوسف كارم", text: "متفق تماماً. الأدوات بلا تدقيق تنسخ تحيزات الماضي أسرع مما يفعله البشر. التدقيق السنوي يجب أن يكون شرط استخدام." },
        { time: "11:06:35", speaker: "د. حمدة الشامسي", text: "لنلخّص الالتزامات: تقويم مهني من السنة الأولى، ثمانون مقعد تدريب مصدّق، توقيع رقمي موثّق للمهام، عيادة مهنة أسبوعية بنسخة تجريبية هنا هذا الأسبوع، وقالب تدرج وظيفي مفتوح مع ورشة نوفمبر." },
        { time: "11:08:10", speaker: "حضور — طالبة هندسة", text: "وأضيف طلباً شخصياً: انشروا قائمة الشركات الملتزمة بالمقاعد مبكراً كي نعرف وجهتنا الآن." },
        { time: "11:09:45", speaker: "يوسف كارم", text: "ستُنشر على بوابة ناجح خلال يومين مع تحديث ربع سنوي." },
        { time: "11:11:20", speaker: "د. حمدة الشامسي", text: "الجلسة تسجَّل وتُلخَّص وتُرسل للجامعات والمناطق الحرة بعد الاعتماد. شكراً يوسف وشكراً لكل صوت حي في القاعة." },
        { time: "11:12:55", speaker: "يوسف كارم", text: "المسار يُبنى بالتوثيق لا بالشعارات. شكراً لكم." }
      ],
      aiSummary: "بحثت الجلسة فجارة الانتقال من الجامعة إلى العمل وأرجعت سبب تأخر التوظيف إلى اختلاف لغة قياس الجامعة (الساعات المعتمدة) عن لغة السوق (إنجاز مهمة حقيقية)، وإلى التقويم الزمني الخاطئ حيث تغلق الشركات أبواب التدريب في فبراير بينما يبدأ الطلبة البحث في أبريل. أبرز المخرجات: إطلاق تقويم مهني يبدأ من السنة الأولى، وتبنّي نموذج التدريب المصدّق بثمانين مقعداً مبكراً من المناطق الحرة مقابل ساعة معتمدة، مع توقيع رقمي قابل للتحقق من مشرف التدريب على مهام محددة بدل الاعتماد على الشهادات وحدها. كما طُرحت معالجة الفجوة الجغرافية بالتدريب المدمج عن بُعد بمهام حقيقية، ومعالجة الحاجز النفسي بعيادات مهنة أسبوعية تستخدم تلخيصاً آلياً للمقابلات التجريبية (نسخة تجريبية تُشغَّل داخل المعرض)، ونشر قالب تدرج وظيفي مفتوح للشركات الصغيرة مع ورشة في نوفمبر، واشتراط تدقيق سنوي لأي أداة فرز آلية على أساس النوع والمنطقة. الالتزامات الختامية الخمسة ستُتابع عبر بوابة ناجح التي ستنشر قائمة الشركات الملتزمة بالمقاعد خلال يومين بتحديث ربع سنوي.",
      sentimentScore: 89, actionItems: ["إطلاق التقويم المهني من السنة الأولى في الجامعات الشريكة", "تفعيل ٨٠ مقعد تدريب مصدّق مع التوقيع الرقمي للمشرفين", "تشغيل نسخة تجريبية من عيادة المهنة داخل المعرض هذا الأسبوع", "نشر قالب التدرج الوظيفي المفتوح وورشة نوفمبر للشركات الصغيرة", "اشتراط التدقيق الدوري لأدوات الفرز الآلية قبل اعتمادها"]
    },
    {
      id: "mtg-108", tenantId: "tenant-arablab", podId: "POD-13",
      title: "Keynote: Lab Automation & AI-assisted Method Validation", startTime: "09:45 AM", endTime: "10:30 AM",
      hostName: "Dr. Nasser Al Qubaisi", status: "Ended", hitlStatus: "Approved",
      guests: [{ id: "g1", badgeId: "BDG-2277", name: "Claire Dubois", email: "c.dubois@arablab.org", phone: "+971545566778", role: "VIP", checkedInAt: "09:38 AM" }],
      rawTranscript: [
        { time: "09:45:20", speaker: "Dr. Nasser Al Qubaisi", text: "Good morning Arablab. My keynote question is uncomfortable: if an AI validates your test method, who signs the ISO 17025 conformity statement — you or the model?" },
        { time: "09:47:05", speaker: "Claire Dubois", text: "You sign. Always you. But the honest answer is that most labs today cannot explain what the model did, and unexplainable automation is a compliance time bomb." },
        { time: "09:48:40", speaker: "Dr. Nasser Al Qubaisi", text: "So let us start with where automation actually sits in Gulf labs right now." },
        { time: "09:50:15", speaker: "Claire Dubois", text: "Pre-analytical dominates: sample tracking, aliquoting, barcode reconciliation. That is roughly seventy percent of deployed automation because it is deterministic. Analytical automation — method selection, outlier adjudication — is still mostly pilot stage." },
        { time: "09:51:55", speaker: "Attendee — Quality Manager, Food Safety Lab", text: "We run LIMS for six years. The pain is not instruments; it is document control. SOP revisions drown us. Where does AI help there?" },
        { time: "09:53:30", speaker: "Claire Dubois", text: "Document control is the sleeper use case. Diffing SOP versions, flagging training-record mismatches after a revision, drafting change summaries for auditors. Low glamour, high audit value, and fully explainable because the evidence is textual." },
        { time: "09:55:10", speaker: "Dr. Nasser Al Qubaisi", text: "Explainability keeps coming up. What is the minimum viable explanation for a method-validation decision?" },
        { time: "09:56:45", speaker: "Claire Dubois", text: "Three things: which reference materials and datasets the model saw, which statistical tests reproduced its conclusion, and what confidence threshold was applied. If you cannot print those three, do not deploy it in scope." },
        { time: "09:58:20", speaker: "Attendee — Metrology Specialist", text: "There is a subtle trap: AI-assisted validation can hide instrument drift. A model trained on last year's distribution will happily accept this year's biased readings." },
        { time: "09:59:55", speaker: "Claire Dubois", text: "Exactly right, and that gives us a concrete rule: any automated validation must run against fresh certified reference material each cycle, not just historical data. Drift detection stays human-owned." },
        { time: "10:01:30", speaker: "Dr. Nasser Al Qubaisi", text: "Let us talk cost. Mid-size labs hear automation and see million-dirham robots." },
        { time: "10:03:05", speaker: "Claire Dubois", text: "The entry point is integration, not robotics. Instrument-to-LIMS middleware plus one validated AI copilot for report drafting runs under two hundred thousand dirhams and typically pays back in nine months through rework reduction." },
        { time: "10:04:40", speaker: "Attendee — Lab Director, Water Testing", text: "Rework is our number one cost. Roughly twelve percent of reports get amended, usually transcription slips. Report-drafting AI with human sign-off could cut that dramatically." },
        { time: "10:06:15", speaker: "Claire Dubois", text: "Twelve percent amendment rate is typical and very addressable. But keep the human signature mandatory at first — regulators trust workflows where accountability is explicit, and the AI earns latitude over time through audit history." },
        { time: "10:07:50", speaker: "Dr. Nasser Al Qubaisi", text: "What about accreditation bodies themselves? Are they ready?" },
        { time: "10:09:25", speaker: "Attendee — Accreditation Liaison", text: "Cautiously. We are drafting guidance that treats AI as a controlled document: version-pinned, validated like any method, with revalidation triggers when the model updates. Silent model changes are the nightmare scenario." },
        { time: "10:11:00", speaker: "Claire Dubois", text: "Version pinning is the single most important sentence in that draft. A lab must know exactly which model produced which result, five years later, during a dispute." },
        { time: "10:12:35", speaker: "Dr. Nasser Al Qubaisi", text: "Five-year traceability also implies logging every prompt and context window. Storage is cheap; reconstruction of undocumented decisions is priceless." },
        { time: "10:14:10", speaker: "Attendee — Quality Manager, Food Safety Lab", text: "Who audits the AI vendor? Small labs cannot assess model cards properly." },
        { time: "10:15:45", speaker: "Attendee — Accreditation Liaison", text: "Expect supplier-approval schemes to extend to AI vendors within two years, similar to how consumable qualification works now. Until then, buy from vendors who publish evaluation datasets." },
        { time: "10:17:20", speaker: "Claire Dubois", text: "And demand contractual rights to export your data and models' behaviour logs if you leave. Lock-in in a regulated lab is a compliance risk, not just a commercial one." },
        { time: "10:18:55", speaker: "Dr. Nasser Al Qubaisi", text: "Let me propose a regional starting line: a shared benchmark suite for lab-report AI — anonymised real cases from food, water and clinical labs — so every vendor scores against the same bar." },
        { time: "10:20:30", speaker: "Claire Dubois", text: "I would co-sign that today. Arablab+ is the only venue across the region where all three sectors sit in one room. Seed it with twenty cases per sector and publish annually." },
        { time: "10:22:05", speaker: "Attendee — Lab Director, Water Testing", text: "Water lab volunteers ten anonymised amendment cases immediately, provided we can see how our own workflow scores." },
        { time: "10:23:40", speaker: "Dr. Nasser Al Qubaisi", text: "Then the actions write themselves: draft the controlled-document guidance comment period, assemble sixty seed cases by year end, and pilot middleware-plus-copilot in two willing labs with mandatory human sign-off." },
        { time: "10:25:15", speaker: "Claire Dubois", text: "Add one more: a template revalidation trigger list — model update, standard revision, CRM lot change. Labs should never improvise that from scratch." },
        { time: "10:26:50", speaker: "Dr. Nasser Al Qubaisi", text: "Agreed. To close: automation is no longer the frontier; governed automation is. The lab that can explain every machine decision wins both the audit and the efficiency argument." },
        { time: "10:28:25", speaker: "Claire Dubois", text: "Beautifully put. Thank you Arablab." }
      ],
      aiSummary: "The keynote reframed lab automation around governance rather than hardware. Current state: ~70% of deployed automation is deterministic pre-analytical work (sample tracking, aliquoting, barcode reconciliation), while analytical AI (method selection, outlier adjudication) remains pilot-stage. Highest-value near-term use case is SOP/document control — version diffing, training-record mismatch flags, auditor change summaries — because it is textual and explainable. Minimum viable explainability for any AI validation decision was defined as three printable elements: reference materials/datasets seen, reproduced statistical tests, and applied confidence thresholds. A metrology warning was raised that AI validation can mask instrument drift; the countermeasure is fresh certified reference material each cycle with human-owned drift detection. Economics: integration-first stacks (LIMS middleware + report-drafting copilot) cost under AED 200k and pay back in ~9 months against typical 12% report amendment rates, with mandatory human sign-off initially. Accreditation direction: treat AI as a controlled document — version-pinned, method-validated, with explicit revalidation triggers (model update, standard revision, CRM lot change); vendor supply-chain approval schemes expected within two years. Concrete commitments: a shared regional benchmark suite seeded with 60 anonymised cases (food/water/clinical) published annually, a volunteer middleware pilot in two labs, and a revalidation-trigger template.",
      sentimentScore: 87, actionItems: ["Draft controlled-document AI guidance comment period with accreditation liaison.", "Assemble 60 anonymised seed cases (20 per sector) for the regional benchmark by year end.", "Pilot LIMS middleware + report copilot in two labs with mandatory human sign-off.", "Publish revalidation-trigger template (model update, standard revision, CRM lot change).", "Require vendor data/behaviour-log export rights in procurement contracts."]
    },
    {
      id: "mtg-101", tenantId: "tenant-wps-2026", podId: "POD-03",
      title: "كلمة افتتاحية مغلقة: سلامة الذكاء الاصطناعي الوطنية", startTime: "09:00 AM", endTime: "09:40 AM",
      hostName: "معالي سيف المنصوري", status: "Ended", hitlStatus: "PendingApproval",
      guests: [{ id: "g1", badgeId: "BDG-9941", name: "فاطمة الظاهري", email: "fatima@zxsprd.ae", phone: "+971500000000", role: "VIP", checkedInAt: "08:55 AM" }],
      rawTranscript: [
        { time: "09:00:12", speaker: "معالي سيف المنصوري", text: "أهلاً بالجميع. نفتح اليوم الجلسة المغلقة لمراجعة مصفوفة الامتثال للسحابة السيادية قبل رفعها لمجلس الأمن الوطني الأسبوع القادم." },
        { time: "09:01:48", speaker: "فاطمة الظاهري", text: "شكراً معالي الوزير. أبدأ بملاحظة سريعة: ثلاثة من بنود المصفوفة ما تزال تحمل عبارة (قيد المراجعة) منذ دورة يوليو، وهذا يضعف موقفنا أمام المدققين." },
        { time: "09:03:25", speaker: "معالي سيف المنصوري", text: "أتفق تماماً. لذلك طلبت حضور الفرق الفنية اليوم. خالد، كيف يتحقق التدمير الآلي للبيانات خلال ثلاثين يوماً من انتهاء الغرض وفق الأنظمة الوطنية؟" },
        { time: "09:05:10", speaker: "خالد الشامسي", text: "نعتمد التقطيع التشفيري؛ عند إغلاق نافذة الاحتفاظ تُتلف المفاتيح نهائياً فلا تبقى أي نسخة قابلة للفك. لكن لدي تحفّظ: عملية الإتلاف نفسها تحتاج إثباتاً مستقلاً وليس سجلاً داخلياً فقط." },
        { time: "09:07:02", speaker: "فاطمة الظاهري", text: "اقترح مفتاحاً عاماً للإثبات يرسل تقرير إتلاف موقّع إلى الجهة الرقابية خلال أربع وعشرين ساعة من التنفيذ. هذا يرفع عن كاهلنا عبء التدقيق اللاحق." },
        { time: "09:08:55", speaker: "معالي سيف المنصوري", text: "جيد. وماذا عن البيانات الوصفية؟ كثير من التسريبات لا تأتي من المحتوى بل من الميتاداتا: من كلّم من، ومتى، وأين." },
        { time: "09:10:40", speaker: "خالد الشامسي", text: "الميتاداتا تخضع حالياً لنفس سياسة الاحتفاظ، لكن ليس لنفس سياسة الوصول. أنصح بفصل أدوار الضباط: من يكتب التقارير لا يجب أن يرى سجلات الاتصالات الكاملة." },
        { time: "09:12:18", speaker: "فاطمة الظاهري", text: "هذا يقودنا لبند الصلاحيات. لدينا أربعة عشر ضابطاً بصلاحية مدير النظام على العينة السيادية. الرقم مرتفع جداً ولا يوجد مبرر توثيقي لسبعة منهم على الأقل." },
        { time: "09:14:05", speaker: "معالي سيف المنصوري", text: "قلّصوها إلى أربعة خلال أسبوع، والباقي صلاحية قراءة محدودة بالتذكرة. وأريد تقريراً بما تم سحبه ولماذا." },
        { time: "09:15:52", speaker: "خالد الشامسي", text: "مباشرةً سيدي. نقطة ثانية مهمة: نماذج الذكاء الاصطناعي المساعدة التي تجري فرق التحليل اختباراتها — أين تُخزَّن الاستعلامات أثناء التجربة؟" },
        { time: "09:17:38", speaker: "فاطمة الظاهري", text: "الاستعلامات تُسجَّل مؤقتاً في منطقة عازلة داخل الدولة، وتُمسح آلياً بعد سبعة أيام. لكن لا يوجد حتى الآن اعتماد رسمي للنموذج نفسه من هيئة الاعتماد الوطنية." },
        { time: "09:19:20", speaker: "معالي سيف المنصوري", text: "فلا تُوسَّع التجربة قبل الاعتماد. اجعلوا نطاقها الحالي مقصوراً على المسودات غير السرّية، وقدّموا ملف الاعتماد خلال أسبوعين." },
        { time: "09:21:02", speaker: "خالد الشامسي", text: "أؤيد، وأضيف ضماناً تقنياً: حجب إدخال أي رمز سري أو رقم قضية سرّي إلى النموذج عبر مرشح تلقائي قبل الإرسال، مع تنبيه الضابط." },
        { time: "09:22:50", speaker: "فاطمة الظاهري", text: "المرشح سهل التنفيذ على مستوى البوابة. الأهم من ذلك: نتائج النماذج يجب ألا تُستخدم كدليل مباشر في المحاكم، بل كمساعدة تحليلية فقط — وهذا يُكتب صراحة في دليل الاستخدام." },
        { time: "09:24:35", speaker: "معالي سيف المنصوري", text: "سجل هذا كمبدأ أساسي. الآن بند الطوارئ: ماذا لو تعطّلت السحابة السيادية أثناء حدث أمني كبير؟ هل خطة التعافي مجرّبة فعلاً؟" },
        { time: "09:26:20", speaker: "خالد الشامسي", text: "جرّبناها مرة واحدة في مايو على مستوى منطقة واحدة فقط. زمن الاسترجاع كان أربع ساعات وسبع عشرة دقيقة — أعلى بكثير من الهدف المحدد بساعتين." },
        { time: "09:28:05", speaker: "فاطمة الظاهري", text: "السبب كان تسلسل استرجاع قواعد البيانات. أقترح بيئة ساخنة موازية في موقع جغرافي ثانٍ داخل الدولة، مع تحويل تدريبي ربع سنوي كامل بدل الاختزال الجزئي." },
        { time: "09:29:50", speaker: "معالي سيف المنصوري", text: "قدّموا التكلفة والمقارنة مع خيار التحويل اليدوي. إن كانت البيئة الساخنة تعالج فجوة الأربع ساعات فهي تستحق المناقشة مع المالية." },
        { time: "09:31:35", speaker: "خالد الشامسي", text: "عنصر أخير لا يقل حساسية: وصول المقاولين. لدينا أحد عشر حساب مقاول نشط، آخر مراجعة لأعمار كلمات المرور كانت قبل خمسة أشهر." },
        { time: "09:33:22", speaker: "فاطمة الظاهري", text: "أوصي بإلغاء الحسابات الدائمة للمقاولين كلياً والتحول لتفويض جلسة واحد مدته أربع ساعات كحد أقصى، مشروط بموافقة ضابط أمن لكل جلسة." },
        { time: "09:35:08", speaker: "معالي سيف المنصوري", text: "قرّر: لا حسابات دائمة للمقاولين بعد نهاية أكتوبر. ونقطة أخيرة قبل الإغلاق — سجلات الأحداث الحالية تُحفظ تسعين يوماً. أرى أنها قصيرة أمام متطلبات التحقيق الجنائي الرقمي." },
        { time: "09:36:52", speaker: "خالد الشامسي", text: "أوافق، لكن التخزين الكامل مكلف. الحل الوسط: تسعة أشهر للأحداث الحرجة أمنياً، وتسعون يوماً للبقية، مع أرشفة مضغوطة موقّقة." },
        { time: "09:38:30", speaker: "فاطمة الظاهري", text: "مقبول بشرط أن تكون الأرشفة قابلة للبحث مباشرة للنيابة دون عملية استرجاع يدوي تستغرق أياماً." },
        { time: "09:39:45", speaker: "معالي سيف المنصوري", text: "إذاً نُخرج المصفوفة بنسخة نهائية بهذه القرارات. فاطمة، جهّزي ملخصاً تنفيذياً من صفحتين لمجلس الأمن الوطني، وخالد، قائمة المهام التقنية قبل الخميس." },
        { time: "09:40:20", speaker: "فاطمة الظاهري", text: "حاضر معالي الوزير، سيكون الملخص جاهزاً صباح الأحد بإذن الله." },
        { time: "09:40:48", speaker: "معالي سيف المنصوري", text: "شكراً للجميع. تُرفع هذه الجلسة إلى مسار الموافقة النهائية قبل النشر الداخلي." }
      ],
      aiSummary: "ترأس معالي سيف المنصوري جلسة مغلقة لمراجعة مصفوفة الامتثال للسحابة السيادية قبل رفعها لمجلس الأمن الوطني. أبرز القرارات: (1) اعتماد إثبات إتلاف مستقل بتقرير موقّع للجهة الرقابية خلال ٢٤ ساعة بدلاً من السجلات الداخلية فقط؛ (2) فصل أدوار الضباط والحد من صلاحية مدير النظام من أربعة عشر ضابطاً إلى أربعة خلال أسبوع؛ (3) تجميد توسّع تجارب النماذج المساعدة حتى الحصول على اعتماد هيئة الاعتماد الوطنية، مع قصرها على المسودات غير السرّية وكتابة مبدأ عدم استخدام مخرجات النماذج كأدلة محاكم مباشرة في دليل الاستخدام؛ (4) إلزام بوابة بمرشح تلقائي يمنع إدخال الرموز السرية وأرقام القضايا السرّية للنموذج؛ (5) معالجة ضعف خطة التعافي (استرجاع فعلي ٤:١٧ مقابل هدف ساعتين) بدراسة بيئة ساخنة موازية في موقع ثانٍ داخل الدولة مع تحويل تدريبي ربع سنوي كامل؛ (6) إلغاء جميع حسابات المقاولين الدائمة (١١ حساباً نشطاً) والتحول لتفويض جلسة واحد بأربع ساعات بموافقة ضابط أمن؛ (7) تعديل حفظ السجلات إلى تسعة أشهر للأحداث الحرجة أمنياً مع أرشفة مضغوطة قابلة للبحث المباشر من النيابة.",
      sentimentScore: 82, actionItems: ["تقليص صلاحيات مدير النظام إلى أربعة ضباط ورفع تقرير بالسحوبات وأسبابها خلال أسبوع.", "إعداد ملف اعتماد نموذج الذكاء الاصطناعي المساعد لهيئة الاعتماد الوطنية خلال أسبوعين.", "دراسة تكلفة البيئة الساخنة الموازية ومقارنتها بخيار التحويل اليدوي قبل العرض على المالية.", "إلغاء الحسابات الدائمة للمقاولين مع تطبيق تفويض الجلسة الواحد قبل نهاية أكتوبر.", "تحديث سياسة حفظ السجلات (٩ أشهر للحرجة + أرشفة قابلة للبحث) وصياغة دليل استخدام النماذج.", "إعداد ملخص تنفيذي من صفحتين لمجلس الأمن الوطني (فاطمة الظاهري — صباح الأحد)."]
    },
    {
      id: "mtg-102", tenantId: "tenant-wps-2026", podId: "POD-01",
      title: "جلسة طارئة: فريق مكافحة الجرائم السيبرانية العابرة للحدود", startTime: "08:15 AM", endTime: "08:50 AM",
      hostName: "العقيد ماجد السويدي", status: "Ended", hitlStatus: "Approved",
      guests: [],
      rawTranscript: [
        { time: "08:15:40", speaker: "العقيد ماجد السويدي", text: "افتُتحت هذه الجلسة الطارئة بسبب سلسلة هجمات الفدية على ثلاثة مشغّلي موانئ إقليميين خلال أسبوعين. نحتاج دليلاً مشتركاً للاستجابة وخطوات فورية." },
        { time: "08:17:25", speaker: "نورة القحطاني", text: "متفقون. أولاً الأرقام: الهجمات الثلاث استخدمت العينة نفسها — تصيّد عبر رسائل تزعم تحديث جداول الشحن، ثم تسلّل عبر حسابات VPN غير محمية بالمصادقة الثنائية." },
        { time: "08:19:10", speaker: "العقيد ماجد السويدي", text: "وهذا يعني أن الدفاع بسيط نظرياً لكنه مؤسسياً مهمل. كم نسبة الحسابات الإدارية بلا مصادقة ثنائية لدى المشغّلين الثلاثة؟" },
        { time: "08:21:02", speaker: "نورة القحطاني", text: "اثنان من كل ثلاثة تقريباً في المشغّل المتضرر الأول، وربعها في الثاني. الثالث كان مستهدفاً لكن الاعتراض نجح لأن بوابته البريدية طبّقت عزل الروابط." },
        { time: "08:23:00", speaker: "العقيد ماجد السويدي", text: "اذكري ذلك كمعيار ناجح. الخطوة الثالثة: هل رصدتم نمطاً مشتركاً في توقيت التنفيذ؟" },
        { time: "08:24:48", speaker: "نورة القحطاني", text: "أعتذر، أكمل بالعربية: الخطوة الثالثة، نعم — كلها بدأت بعد منتصف الليل بتوقيت المنطقة، خلال مناوبات الوردية الليلية حيث يقل المراقبون البشريون إلى شخصين." },
        { time: "08:26:40", speaker: "العقيد ماجد السويدي", text: "إذاً التوصية التشغيلية الأولى: تعزيز المراقبة الآلية الليلية بكاشفات سلوكية، لا مجرد توقيعيات. متى يمكن تشغيل التجريب؟" },
        { time: "08:28:22", speaker: "نورة القحطاني", text: "جاهز خلال أسبوعين على مشغّل واحد متطوع، شرط أن نتشارك إشارات التهديد فوراً بين مركزَي عمليات دبي وأبوظبي بدل تبادل يومي مؤجل." },
        { time: "08:30:10", speaker: "العقيد ماجد السويدي", text: "موافق على المشاركة الفورية، لكن احرصي على تصنيف الإشارات: بعض المصادر التجارية تسمح بالمشاركة داخل الدولة فقط، والمؤشرات المشتركة دولياً تحتاج إذناً قانونياً." },
        { time: "08:32:05", speaker: "نورة القحطاني", text: "نقطة دقيقة. سأطلب من المستشار القانوني وضع مصفوفة تصنيف ثلاثية المستويات: محلي، خليجي، ودولي، مع قناة إسناد لكل مستوى." },
        { time: "08:34:00", speaker: "العقيد ماجد السويدي", text: "وبخصوص التتبع: هل حددنا الجهة المنفذة؟ تقارير الحوادث تشير لوسيط تفاوض واحد يظهر في الثلاث حالات." },
        { time: "08:36:10", speaker: "نورة القحطاني", text: "نعم، عنوان الدفع ونمط الوسيط يتطابقان بنسبة عالية، لكن هذا لا يعني مجموعة واحدة بالضرورة — قد يكون عدة عملاء يبيعون لنفس الوسيط. لا أستنتج قبل تأكيد السلسلة." },
        { time: "08:38:00", speaker: "العقيد ماجد السويدي", text: "التزم الحذر أمام الإعلام. ماذا عن البلاغات المقدمة للعملة المشفرة؟ كم قيمة فُدية دُفعت فعلياً؟" },
        { time: "08:40:05", speaker: "نورة القحطاني", text: "لم يدفع أي مشغّل. اثنان استعادا من النسخ الاحتياطية خلال ست وثماني ساعات، والثالث ما يزال يعيد بناء بيئات التشغيل — وهذه هي المشكلة الحقيقية: النسخ موجودة لكنها غير مختبرة للاستعادة." },
        { time: "08:42:00", speaker: "العقيد ماجد السويدي", text: "إذاً بند إلزامي في الدليل المشترك: اختبار استيراد دوري موثّق شهرياً، وإلا لا تعتبر منظومة نسخك صالحة. ومن يملك الدليل بعد الاتفاق؟" },
        { time: "08:44:02", speaker: "نورة القحطاني", text: "أقترح لجنة ثلاثية من المركزين وهيئة الموانئ بمسودة مشتركة، ومراجعة كل ستة أشهر. وأضيف تمرين طاولة نصفي سنوي يحاكي هجوم ميناء مزدوج." },
        { time: "08:46:00", speaker: "العقيد ماجد السويدي", text: "جيد. جهّزا مسودة الدليل خلال عشرة أيام لعرضها على قادة الأجهزة. وأي اتصال مباشر بالانتربول عبر قناة التعاون القائمة لإبلاغ الوسيط المشترك." },
        { time: "08:48:05", speaker: "نورة القحطاني", text: "سيُرسل البلاغ اليوم عبر القناة الخضراء مع حزمة الأدلة المجهّلة. وأوصي بتحذير عاجل للمشغّلين الآخرين بنفس نمط رسالة التصيّد." },
        { time: "08:49:40", speaker: "العقيد ماجد السويدي", text: "صدرِا التحذير خلال ساعة بصيغة تشغيلية واضحة. شكراً نورة — الجلسة تُرفع للمسار المعتمد، والحالة Approved." }
      ],
      aiSummary: "عُقدت جلسة طارئة بعد ثلاث هجمات فدية على مشغّلي موانئ إقليميين خلال أسبوعين. كشفت التحقيقات نمطاً موحداً: تصيّد برسائل مزيفة حول تحديث جداول شحن، ثم تسلل عبر حسابات VPN إدارية بلا مصادقة ثنائية (ثلثا الحسابات الإدارية لدى أول مشغّل)، وتنفيذ ليلي خلال مناوبات ضعيفة المراقبة. لم تُدفع أي فدية؛ استعاد مشغّلان الخدمة خلال ٦–٨ ساعات بينما ما يزال الثالث يعيد البناء لأن نسخاته الاحتياطية غير مختبرة الاستعادة. القرارات: تفعيل مشاركة فورية لإشارات التهديد بين مركزَي عمليات دبي وأبوظبي مع مصفوفة تصنيف ثلاثية (محلي/خليجي/دولي) لقواعد الإسناد القانوني؛ تشغيل كاشفات سلوكية آلية ليلاً خلال أسبوعين على مشغّل متطوع؛ إلزام الدليل المشترك باختبار شهري موثّق لاستعادة النسخ؛ ملكية الدليل للجنة ثلاثية (المركزان + هيئة الموانئ) مع تمرين طاولة نصفي سنوي؛ إبلاغ الانتربول عبر قناة التعاون بحزمة أدلة مجهّلة (عنوان الدفع والوسيط يتطابقان لكن لا يُستنتج توحيد المجموعة قبل تأكيد السلسلة)؛ وإصدار تحذير عاجل للمشغّلين بنمط رسالة التصيّد خلال ساعة.",
      sentimentScore: 68, actionItems: ["إصدار تحذير تشغيلي عاجل لجميع مشغّلي الموانئ خلال ساعة.", "تفعيل مشاركة الإشارات الفورية بين مركزَي دبي وأبوظبي مع مصفوفة التصنيف القانوني.", "تشغيل التجريب السلوكي الليلي على مشغّل متطوع خلال أسبوعين.", "مسودة الدليل المشترك للاستجابة خلال عشرة أيام وعرضها على قادة الأجهزة.", "إلزام اختبار شهري موثّق لاستعادة النسخ الاحتياطية ضمن الدليل.", "إبلاغ الانتربول عبر قناة التعاون وحفظ حزمة الأدلة المجهّلة."]
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
    { id: "sp-1", tenantId: "tenant-wps-2026", name: "البنك الأهلي", logoUrl: "", message: "زوروا الجناح ٤٢ لتجربة الحلول المصرفية المدعومة بالذكاء الاصطناعي." },
    { id: "sp-2", tenantId: "tenant-wps-2026", name: "اتصالات", logoUrl: "", message: "شبكة الجيل الخامس الحصرية للفعالية تغطي جميع القاعات." },
    { id: "sp-3", tenantId: "tenant-wps-2026", name: "مجموعة الإمارات الجوية", logoUrl: "", message: "سافر معنا — خصومات خاصة لجميع المشاركين في القمة." },
    { id: "sp-4", tenantId: "tenant-airport-show", name: "SkyLine Retail Group", logoUrl: "", message: "Visit Stand 12 — duty-free revenue intelligence demos hourly." },
    { id: "sp-5", tenantId: "tenant-hr-summit", name: "TalentGate AI", logoUrl: "", message: "Book a live Emiratisation analytics demo at Booth 7." },
    { id: "sp-6", tenantId: "tenant-arablab", name: "GulfLab Instruments", logoUrl: "", message: "New ICP-MS platform launch on Thursday — Hall 5." }
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
    { id: "usr-1", lang: "ar", badgeId: "BDG-9941", name: "فاطمة الظاهري", email: "fatima@zxsprd.ae", phone: "+971500000000", interests: ["حوكمة الذكاء الاصطناعي", "أمن السحابة"], joinedSessions: ["mtg-101"] },
    { id: "usr-2", lang: "ar", badgeId: "BDG-4823", name: "خالد الشامسي", email: "khaled@zxsprd.ae", phone: "+971501112233", interests: ["الاستدلال على الحافة", "الأمن السيبراني"], joinedSessions: ["mtg-102"] },
    { id: "usr-3", lang: "ar", badgeId: "BDG-7702", name: "نورة القحطاني", email: "noura@zxsprd.ae", phone: "+971504445566", interests: ["تحليلات الحدود", "المدن الذكية"], joinedSessions: [] },
    { id: "usr-4", lang: "en", badgeId: "BDG-7710", name: "Rashid Al Suwaidi", email: "rashid@gcaa.gov.ae", phone: "+971501234567", interests: ["Biometrics & Digital Identity", "Smart Airports"], joinedSessions: ["mtg-103"] },
    { id: "usr-5", lang: "en", badgeId: "BDG-8802", name: "Omar Benali", email: "omar.b@talent.gov.ae", phone: "+971527788990", interests: ["AI Governance", "Edge Inference"], joinedSessions: ["mtg-104"] }
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

/* Demo-data language tags: WPS Summit + Accessabilities + Najah are Arabic
   events; everything else in the demo portfolio is English. English interest
   topics mirror the Arabic ones for the English-only reset. */
const AR_TENANTS = ["tenant-wps-2026", "tenant-accessabilities", "tenant-najah"];
const EN_INTEREST_TOPICS = ["AI Governance", "Cybersecurity", "Cloud Security", "Edge Inference", "Border Analytics", "Smart Cities", "Blockchain", "IoT", "Big Data", "Generative AI", "Biometrics & Digital Identity", "Smart Airports"];

/* ---------------- STORE ENGINE ---------------- */
const ZXStore = (() => {
  const KEY = "zxsprd-global-state-v11";
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const listeners = new Set();
  let channel = null, storageOK = true;

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          // Overlay the saved snapshot on the LATEST seed shape so that fields
          // added in newer schema versions always exist (fixes stale-cache gaps).
          const merged = { ...clone(ZXSeed), ...parsed, version: ZXSeed.version };
          return merged;
        }
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
      channel = new BroadcastChannel("zxsprd-state-v11");
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
    sponsors(tid = state.activeTenantId) { return (state.sponsors || []).filter(sp => !sp.tenantId || sp.tenantId === tid); },
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

    reset() { this.resetDemoCategory("all"); },

        /* ---- DEMO DATA LANGUAGE ENGINE (single source of truth) ----
       Every user-addable demo record carries lang: "ar" | "en", or inherits it
       from its tenant (AR_TENANTS above). The three Reset Demo Data buttons just
       re-seed EVERYTHING — meetings & transcripts, schedule, sponsors, guest
       profiles / demo users (e.g. فاطمة الظاهري), interest topics, API keys and
       tenant settings — filtered to one language:
         "ar" → Arabic only   "en" → English only   "all" → Arabic + English */
    _langOf(rec) { return rec.lang || (AR_TENANTS.includes(rec.tenantId) ? "ar" : "en"); },
    _seedFor(category) {
      const fresh = clone(ZXSeed);
      if (category === "all") return fresh;
      const want = category; // "ar" or "en"
      const meetings = fresh.meetings.filter(m => this._langOf(m) === want);
      return {
        ...fresh,
        meetings,
        schedule: fresh.schedule.filter(x => this._langOf(x) === want),
        sponsors: fresh.sponsors.filter(x => this._langOf(x) === want),
        guestProfiles: fresh.guestProfiles.filter(g => this._langOf(g) === want),
        interestTopics: want === "ar" ? fresh.interestTopics : EN_INTEREST_TOPICS,
        apiKeys: fresh.apiKeys.filter(k => this._langOf(k) === want),
        tenantSettings: Object.fromEntries(Object.entries(fresh.tenantSettings).filter(([tid]) => (AR_TENANTS.includes(tid) ? "ar" : "en") === want)),
        tempGuestSessions: [],
        activeTenantId: want === "ar" ? "tenant-wps-2026" : "tenant-airport-show",
        activePodId: want === "ar" ? "POD-01" : "POD-05"
      };
    },
    resetDemoCategory(category) {
      try { sessionStorage.removeItem("zx-temp-guest"); } catch (_) {}
      state = this._seedFor(category);
      persist();
      try { channel?.postMessage({ type: "state", state }); } catch (_) {}
      log("admin", `Reset demo data (${category})`);
      notify("reset");
    },
    clearAllDemoData() {
      try { sessionStorage.removeItem("zx-temp-guest"); } catch (_) {}
      const fresh = clone(ZXSeed);
      state = { ...fresh,
        meetings: [], schedule: [], sponsors: [], guestProfiles: [], tempGuestSessions: [], documents: [], voiceQueries: [],
        auditLog: [{ ts: new Date().toISOString().slice(0, 16).replace("T", " "), actor: "admin", action: "Cleared all demo data" }]
      };
      persist();
      try { channel?.postMessage({ type: "state", state }); } catch (_) {}
      notify("reset");
    },

    addSponsor(data) { this.set({ sponsors: [...state.sponsors, { tenantId: state.activeTenantId, ...data, id: `sp-${Date.now()}` }] }); },
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
    },

    /* Import a previously exported JSON snapshot — restores ALL saved data
       (tenants, pods, meetings & transcripts, sponsors, approvals, interests /
       guest profiles, schedule, crowd metrics, API keys, logs). Accepts the raw
       JSON string or a parsed object. Returns true on success. */
    importState(jsonOrObj) {
      try {
        const obj = typeof jsonOrObj === "string" ? JSON.parse(jsonOrObj) : jsonOrObj;
        if (!obj || typeof obj !== "object") return false;
        // sanity: must look like one of our snapshots (version is not enforced —
        // any export from this app can be imported, then re-stamped to current)
        if (!obj.tenants && !obj.meetings && !obj.version) return false;
        state = { ...clone(ZXSeed), ...obj, version: ZXSeed.version };
        persist();
        try { channel?.postMessage({ type: "state", state }); } catch (_) {}
        log("admin", "Imported state snapshot (all data restored)");
        notify("import");
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
        zxToast(res.outcome === "accepted" ? "Installing Event Intelligence Platform 🎉" : "Install dismissed", res.outcome === "accepted" ? "success" : "info");
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
