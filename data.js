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
/* Demo language pool — English-only display labels (mock data is English). */
const ZX_LANGS = [
  { code: "en-US", label: "English" }
];

const ZX_I18N = {
  "en-US": { welcome: "Welcome", next_session: "Next Session", live_now: "Live Now", trending: "Trending Topics", agenda: "Agenda", journey: "My Journey", concierge: "AI Concierge", profile: "Profile", announcements: "Announcements", scan_badge: "Scan your badge QR to check-in", ask_anything: "Ask anything about the event", floor: "Floor Guide", checked_in: "Checked In", join: "Join", leave: "Leave", home: "Home", for_you: "For You — based on your interests", my_schedule: "My Schedule", add_journey: "Add to Journey", partners: "Partners", temp_session: "Temporary Guest Session", end_session: "End session & start over", send_details: "Send my details to myself", no_live: "No sessions live right now — next one starts soon!", nothing_scheduled: "Nothing scheduled. Enjoy the expo!" },
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

const ZXSeed = {
  version: 9, // Final Demo schema v9 — English-only demo data, richer mock content, UX enhancements
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
    { id: "sch-1", tenantId: "tenant-wps-2026", podId: "POD-01", title: "AI Governance in Sovereign Law Enforcement", track: "Governance", room: "Hall A1 — Main Stage", tags: ["AI Governance", "Cloud Security"], startTime: "10:00 AM", endTime: "10:45 AM", speakerHost: "Abdullah Al-Mutairi", speakerGuest: "Fatima Al-Zahra", status: "Scheduled" },
    { id: "sch-2", tenantId: "tenant-wps-2026", podId: "POD-02", title: "Edge Inference for Real-Time Border Analytics", track: "Technology", room: "Hall A1 — Zone 2", tags: ["Edge Inference", "Border Analytics"], startTime: "11:00 AM", endTime: "11:45 AM", speakerHost: "Col. Majed Al-Suwaidi", speakerGuest: "Noura Al-Qahtani", status: "Scheduled" },
    { id: "sch-3", tenantId: "tenant-wps-2026", podId: "POD-03", title: "Closing Keynote: National AI Safety Framework", track: "Keynote", room: "Hall B2 — VIP", tags: ["AI Governance", "Smart Cities"], startTime: "12:30 PM", endTime: "01:15 PM", speakerHost: "H.E. Saif Al-Mansouri", speakerGuest: "Khaled Al-Shamsi", status: "Scheduled" },
    { id: "sch-5", tenantId: "tenant-wps-2026", podId: "POD-01", title: "Workshop: Zero-Trust Architecture for Public Safety Networks", track: "Workshop", room: "Hall A2 — Workshops", tags: ["Cybersecurity", "Cloud Security"], startTime: "02:00 PM", endTime: "03:00 PM", speakerHost: "Dr. Aisha Rahman", speakerGuest: "Omar Al-Hosani", status: "Scheduled" },
    { id: "sch-6", tenantId: "tenant-wps-2026", podId: "POD-02", title: "Panel: Digital Twins & Predictive Policing — Ethics at Scale", track: "Panel", room: "Hall A1 — Zone 2", tags: ["Smart Cities", "Big Data"], startTime: "03:30 PM", endTime: "04:15 PM", speakerHost: "Layla Haddad", speakerGuest: "Viktor Petrov", status: "Scheduled" },
    { id: "sch-7", tenantId: "tenant-wps-2026", podId: "POD-03", title: "Fireside Chat: Onboarding the Next 1,000 Delegates", track: "Networking", room: "Hall B2 — VIP", tags: ["IoT", "Generative AI"], startTime: "04:30 PM", endTime: "05:00 PM", speakerHost: "Sarah Mitchell", speakerGuest: "Rashid Al-Falasi", status: "Scheduled" },
    { id: "sch-8", tenantId: "tenant-wps-2026", podId: "POD-01", title: "Opening Briefing: Sovereign Cloud Compliance Matrix", track: "Keynote", room: "Hall A1 — Main Stage", tags: ["Cloud Security", "Blockchain"], startTime: "09:00 AM", endTime: "09:40 AM", speakerHost: "H.E. Saif Al-Mansouri", speakerGuest: "Khaled Al-Shamsi", status: "Completed" },
    { id: "sch-4", tenantId: "tenant-tech-expo", podId: "POD-04", title: "Keynote: The Agentic Enterprise — From Copilots to Coworkers", track: "Keynote", room: "Expo Hall 3 — Startup Stage", tags: ["Generative AI"], startTime: "02:00 PM", endTime: "02:45 PM", speakerHost: "Mariam Al-Ketbi", speakerGuest: "Sultan Al-Dosari", status: "Scheduled" }
  ],

  meetings: [
    {
      id: "mtg-101", tenantId: "tenant-wps-2026", podId: "POD-03",
      title: "Opening Briefing: Sovereign Cloud Compliance Matrix", startTime: "09:00 AM", endTime: "09:40 AM",
      hostName: "H.E. Saif Al-Mansouri", status: "Ended", hitlStatus: "PendingApproval",
      guests: [{ id: "g1", badgeId: "BDG-9941", name: "Fatima Al-Zahra", email: "fatima@zxsprd.ae", phone: "+971500000000", role: "VIP", checkedInAt: "08:55 AM" }],
      rawTranscript: [
        { time: "09:00:12", speaker: "H.E. Saif Al-Mansouri", text: "Good morning everyone. Today we walk through the compliance matrix for the sovereign data cloud." },
        { time: "09:02:45", speaker: "Khaled Al-Shamsi", text: "How is the automated 30-day data destruction enforced against national regulations?" },
        { time: "09:05:10", speaker: "H.E. Saif Al-Mansouri", text: "The system relies on cryptographic shredding — once the retention window closes, the keys are destroyed permanently." },
        { time: "09:08:32", speaker: "Fatima Al-Zahra", text: "Can auditors access immutable logs without exposing the underlying content?" },
        { time: "09:10:05", speaker: "H.E. Saif Al-Mansouri", text: "Yes. Zero-knowledge attestation gives regulators proof of deletion while keeping payload data confidential." }
      ],
      aiSummary: "The session covered sovereign-cloud compliance with a focus on the automated 30-day data-destruction mechanism using cryptographic shredding. Speakers confirmed that regulators can verify deletion through zero-knowledge attestations without exposing payload data.",
      sentimentScore: 85, actionItems: ["Review cryptographic shredding documentation.", "Verify destruction audit logs."]
    },
    {
      id: "mtg-102", tenantId: "tenant-wps-2026", podId: "POD-01",
      title: "Emergency Session: Cross-Border Cybercrime Task Force", startTime: "08:15 AM", endTime: "08:50 AM",
      hostName: "Col. Majed Al-Suwaidi", status: "Ended", hitlStatus: "Approved",
      guests: [],
      rawTranscript: [
        { time: "08:15:40", speaker: "Col. Majed Al-Suwaidi", text: "We need a joint incident-response playbook targeting port infrastructure." },
        { time: "08:22:03", speaker: "Noura Al-Qahtani", text: "Agreed. Let's start piloting real-time threat-indicator sharing between the Dubai and Abu Dhabi operations centres." },
        { time: "08:31:17", speaker: "Khaled Al-Shamsi", text: "Legal clearance for indicator exchange should not block the pilot — we can anonymise payloads at the edge." }
      ],
      aiSummary: "Participants agreed to draft a joint incident-response playbook for port infrastructure and to begin a real-time indicator-sharing pilot between the Dubai and Abu Dhabi operations centres, with payload anonymisation handled at the edge.",
      sentimentScore: 72, actionItems: ["Prepare the joint response playbook.", "Schedule operations-centre integration."]
    },
    {
      id: "mtg-103", tenantId: "tenant-wps-2026", podId: "POD-02",
      title: "Live Demo: Neural Transcription Under Load", startTime: "09:50 AM", endTime: null,
      hostName: "Dr. Aisha Rahman", status: "Recording", hitlStatus: "Draft",
      guests: [{ id: "g2", badgeId: "BDG-4823", name: "Khaled Al-Shamsi", email: "khaled@zxsprd.ae", phone: "+971501112233", role: "Delegate", checkedInAt: "09:48 AM" }],
      rawTranscript: [
        { time: "09:50:22", speaker: "Dr. Aisha Rahman", text: "We are pushing forty concurrent audio channels through the edge node right now." },
        { time: "09:52:41", speaker: "Audience Q&A", text: "What happens to latency if the uplink drops completely?" }
      ],
      aiSummary: "Meeting in progress...", sentimentScore: 0, actionItems: []
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
    // 2D venue map — normalized coordinates (0..1). Zones host the hot-zones & pods.
    venueMap: {
      name: "DWTC — Dubai World Trade Centre",
      zones: [
        { id: "z-hall-a1", label: "Hall A1 — Main Stage", x: 0.05, y: 0.07, w: 0.4, h: 0.4, capacity: 1800 },
        { id: "z-hall-a2", label: "Hall A2 — Workshops", x: 0.05, y: 0.55, w: 0.28, h: 0.36, capacity: 900 },
        { id: "z-hall-b2", label: "Hall B2 — VIP Lounge", x: 0.55, y: 0.55, w: 0.2, h: 0.36, capacity: 500 },
        { id: "z-expo-3", label: "Expo Hall 3 — Startup Zone", x: 0.55, y: 0.07, w: 0.4, h: 0.4, capacity: 1200 },
        { id: "z-concourse", label: "Concourse & Café", x: 0.36, y: 0.5, w: 0.16, h: 0.12, capacity: 600 },
        { id: "z-entrance", label: "Main Gate & Registration", x: 0.81, y: 0.55, w: 0.14, h: 0.36, capacity: 400 }
      ]
    },
    agents: [] // simulated people-flow dots (auto-generated at runtime)
  },

  sponsors: [
    { id: "sp-1", name: "Al Rajhi Bank", tier: "Diamond", booth: "B-42", logoUrl: "", message: "Visit booth 42 to try our AI-powered banking experience." },
    { id: "sp-2", name: "e& (etisalat)", tier: "Platinum", booth: "B-07", logoUrl: "", message: "Exclusive 5G event network covering every hall and concourse." },
    { id: "sp-3", name: "Emirates Air Group", tier: "Gold", booth: "B-15", logoUrl: "", message: "Fly with us — special delegate discounts for all summit attendees." }
  ],

  broadcasts: { internalPod: [], allScreens: [], guestPortal: [], loggedInUsers: [] },

  trendingTopics: [
    { keyword: "Sovereign Cloud", mentions: 142, sentiment: "Positive" },
    { keyword: "Cryptographic Shredding", mentions: 98, sentiment: "Neutral" },
    { keyword: "Edge Inference", mentions: 76, sentiment: "Positive" },
    { keyword: "Data Destruction", mentions: 54, sentiment: "Negative" },
    { keyword: "Cybersecurity", mentions: 61, sentiment: "Positive" },
    { keyword: "AI Governance", mentions: 88, sentiment: "Positive" }
  ],

  guestProfiles: [
    { id: "usr-1", badgeId: "BDG-9941", name: "Fatima Al-Zahra", title: "Director of AI Policy · Smart Dubai", company: "Dubai DDA", email: "fatima@zxsprd.ae", phone: "+971500000000", interests: ["AI Governance", "Cloud Security"], joinedSessions: ["mtg-101"] },
    { id: "usr-2", badgeId: "BDG-4823", name: "Khaled Al-Shamsi", title: "Cyber Threat Analyst · NCIS", company: "NCIS UAE", email: "khaled@zxsprd.ae", phone: "+971501112233", interests: ["Edge Inference", "Cybersecurity"], joinedSessions: ["mtg-102"] },
    { id: "usr-3", badgeId: "BDG-7702", name: "Noura Al-Qahtani", title: "Chief Data Officer · NEOM", company: "NEOM", email: "noura@zxsprd.ae", phone: "+971504445566", interests: ["Border Analytics", "Smart Cities"], joinedSessions: [] },
    { id: "usr-4", badgeId: "BDG-1187", name: "James O'Connor", title: "Deputy Commissioner · INTERPOL", company: "INTERPOL Lyon", email: "james.oconnor@interpol.example", phone: "+33612345678", interests: ["Blockchain", "Big Data"], joinedSessions: [] },
    { id: "usr-5", badgeId: "BDG-6310", name: "Aisha Rahman", title: "ML Professor · Khalifa University", company: "Khalifa University", email: "a.rahman@ku.ac.ae", phone: "+971507778899", interests: ["Generative AI", "IoT"], joinedSessions: [] }
  ],

  tempGuestSessions: [],

  // Predefined topics — guests just click to select (English demo)
  interestTopics: ["AI Governance", "Cybersecurity", "Cloud Security", "Edge Inference", "Border Analytics", "Smart Cities", "Blockchain", "IoT", "Big Data", "Generative AI"],

  documents: [],
  voiceQueries: [],
  auditLog: [
    { ts: "2026-10-15 09:12", actor: "super-admin@zxsprd", action: "Rotated OCI API key for WPS 2026" },
    { ts: "2026-10-16 14:03", actor: "ops@wps2026", action: "Broadcast sent to All Screens channel" }
  ]
};

/* ---------------- STORE ENGINE ---------------- */
const ZXStore = (() => {
  const KEY = "zxsprd-global-state-v7";
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
      channel = new BroadcastChannel("zxsprd-state-v7");
      channel.onmessage = (e) => { if (e.data?.type === "state") { state = e.data.state; notify("cross-tab"); } };
    }
  } catch (e) {}
  window.addEventListener("storage", (e) => {
    if (e.key === KEY && e.newValue) { try { state = JSON.parse(e.newValue); notify("cross-tab"); } catch (_) {} }
  });

  /* ---- Demo guard: mock data is English-only. Normalise legacy saved state,
         then re-apply on any external (cross-tab) update so no view can drift. */
  function enforceEnglishDemo() {
    if (!ZX_LANGS.some(l => l.code === state.uiLang)) state.uiLang = "en-US";
    if (!ZX_LANGS.some(l => l.code === state.voiceLang)) state.voiceLang = "en-US";
    (state.tenants || []).forEach(t => { t.tenantLangs = ZXStore.langPool(t.tenantLangs); });
  }
  enforceEnglishDemo();
  persist();

  function log(actor, action) {
    state.auditLog = [...(state.auditLog || []), { ts: new Date().toISOString().slice(0, 16).replace("T", " "), actor, action }].slice(-100);
  }

  return {
    get state() { return state; },
    get storageOK() { return storageOK; },

    set(patch, source = "local") {
      state = { ...state, ...(typeof patch === "function" ? patch(state) : patch) };
      if (source === "cross-tab") enforceEnglishDemo(); // demo guard: never leave English-only pool
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
    t(key) { const l = ZX_I18N[state.uiLang] || ZX_I18N["en-US"]; return (l && l[key] != null) ? l[key] : ((ZX_I18N["en-US"] || {})[key] != null ? ZX_I18N["en-US"][key] : key); },
    /* Demo language pool — keeps every view English-only even for legacy saved state */
    langPool(codes) { const avail = ZX_LANGS.map(l => l.code); const sel = (codes || []).filter(c => avail.includes(c)); return sel.length ? sel : ["en-US"]; },
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

    /* ===== CROWD ENGINE (v8 — 2D venue map, auto-simulation, graphs) ===== */
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
    crowdStep() {
      const tenant = this.tenant(); if (!tenant) return;
      const cm = state.crowdMetrics || {};
      const zones = (cm.venueMap && cm.venueMap.zones) || [];
      // per-zone density walk
      const hotZones = (cm.hotZones || []).map(z => {
        const d = Math.max(5, Math.min(99, z.density + Math.floor(Math.random() * 13) - 6));
        return { ...z, density: d, status: d > 85 ? "Critical" : d > 55 ? "Moderate" : "Comfortable" };
      });
      // pod headcounts drift
      const pods = state.pods.map(p => {
        if (p.tenantId !== tenant.id) return p;
        const hc = Math.max(0, p.currentHeadcount + Math.floor(Math.random() * 14) - 7);
        return { ...p, currentHeadcount: hc, densityLevel: hc > 100 ? "High" : hc > 50 ? "Medium" : "Low" };
      });
      const delta = Math.floor(Math.random() * 60) - 22;
      const occ = Math.max(0, Math.min(tenant.venueCapacity, (tenant.currentOccupancy || 0) + delta));
      const ing = Math.max(0, (cm.ingressLastHour || 0) + Math.floor(Math.random() * 24) - 10);
      const eg = Math.max(0, (cm.egressLastHour || 0) + Math.floor(Math.random() * 24) - 12);
      const hist = [...(cm.occupancyHistory || []), occ].slice(-48);
      const ingHist = [...(cm.ingressHistory || []), ing].slice(-48);
      // animate agents (people-flow dots) — bounce inside their zone rect
      let agents = (cm.agents && cm.agents.length) ? cm.agents : this._spawnAgents(cm);
      agents = agents.map(a => {
        const z = zones.find(zz => zz.id === a.zone) || zones[0];
        let { x, y, vx, vy } = a;
        x += vx; y += vy;
        if (x < z.x) { x = z.x; vx = Math.abs(vx); } if (x > z.x + z.w) { x = z.x + z.w; vx = -Math.abs(vx); }
        if (y < z.y) { y = z.y; vy = Math.abs(vy); } if (y > z.y + z.h) { y = z.y + z.h; vy = -Math.abs(vy); }
        if (Math.random() < .06) { vx = (Math.random() - .5) * .012; vy = (Math.random() - .5) * .012; }
        return { ...a, x, y, vx, vy };
      });
      this.set({
        tenants: state.tenants.map(t => t.id === tenant.id ? { ...t, currentOccupancy: occ } : t),
        pods,
        crowdMetrics: { ...cm, currentOccupancy: occ, ingressLastHour: ing, egressLastHour: eg, hotZones, occupancyHistory: hist, ingressHistory: ingHist, agents }
      });
    },
    simulateCrowdShift() { this.crowdStep(); },
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
      const sg = { id: `tmp-${Date.now()}`, name: data.name || "Valued Guest", interests: data.interests || [], createdAt: new Date().toISOString(), joinedSessions: [] };
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

    reset() { state = clone(ZXSeed); persist(); try { channel?.postMessage({ type: "state", state }); } catch (_) {} notify("reset"); }
  };
})();

window.ZXSeed = ZXSeed;
window.ZXStore = ZXStore;
window.ZX_LANGS = ZX_LANGS;
window.ZX_I18N = ZX_I18N;

/* ---------------- SHARED UI HELPERS (theme, menus, toast, PWA) ---------------- */
(function installSharedUI() {
  // Apply theme ASAP to avoid flash. Tenant language pool is English-only for the demo;
  // tenant theme follows Super Admin policy unless a global theme lock is set.
  function applyTheme() {
    const s = ZXStore.state;
    let th = s.theme || "dark";
    if (!s.platformSettings?.globalThemeLock) {
      const tt = ZXStore.tenant()?.tenantTheme;
      if (tt === "light" || tt === "dark") th = tt;
    }
    document.documentElement.setAttribute("data-theme", th);
    document.documentElement.style.setProperty("--tenant-accent", ZXStore.tenant()?.primaryColor || "#3B82F6");
  }
  applyTheme();
  ZXStore.subscribe(applyTheme);

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  window.zx$ = $; window.zx$$ = $$;
  window.zxesc = (s) => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // Toast
  window.zxToast = function (msg, kind = "info") {
    let t = $("#zxToast");
    if (!t) { t = document.createElement("div"); t.id = "zxToast"; t.className = "toast"; document.body.appendChild(t); }
    t.textContent = msg;
    t.style.borderColor = kind === "error" ? "var(--red)" : kind === "success" ? "var(--green)" : "#334155";
    t.classList.add("show");
    clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("show"), 2600);
  };

  // Sidebar menu builder: ZXMenu.build(container, items, onSelect)
  window.ZXMenu = {
    build(containerSel, items, onSelect) {
      const c = $(containerSel); if (!c) return;
      c.innerHTML = items.map((it, i) => `
        <button class="side-link ${i === 0 ? "active" : ""}" data-view="${it.id}">
          <svg class="icon"><use href="#${it.icon || "i-grid"}"/></svg><span>${it.label}</span>
          ${it.badge ? `<em class="side-badge">${it.badge}</em>` : ""}
        </button>`).join("");
      c.addEventListener("click", e => {
        const b = e.target.closest(".side-link"); if (!b) return;
        $$(".side-link", c).forEach(x => x.classList.toggle("active", x === b));
        onSelect && onSelect(b.dataset.view);
      });
    },
    show(viewId) {
      $$("[data-panel]").forEach(p => p.hidden = p.dataset.panel !== viewId);
    }
  };

  // Theme + Language toolbar injection
  // opts.chromeLangs: restrict language dropdowns to a tenant pool (array of codes)
  // opts.hideLang: hide both language selects (e.g. Public Display → theme switch only)
  window.zxInitChrome = function (opts = {}) {
    const tb = $("#chromeControls");
    if (!tb) return;
    const langs = (opts.chromeLangs && opts.chromeLangs.length ? ZX_LANGS.filter(l => opts.chromeLangs.includes(l.code)) : ZX_LANGS);
    tb.innerHTML = `
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

  /* ---------- Shared 2D venue map renderer (used by Public Display + Client Admin) ---------- */
  window.zxVenueMapHTML = function (opts = {}) {
    const cm = ZXStore.state.crowdMetrics || {};
    const vm = cm.venueMap || { zones: [] };
    const W = opts.w || 640, H = opts.h || 360;
    const densFor = (label) => { const hz = (cm.hotZones || []).find(z => label.includes(z.zone.split(" - ")[0]) || z.zone.includes(label.split(" — ")[0])); return hz ? hz.density : null; };
    let svg = `<svg viewBox="0 0 ${W} ${H}" style="position:absolute;inset:0;width:100%;height:100%">`;
    // corridors between zones
    svg += `<path d="M ${W*0.25} ${H*0.47} L ${W*0.25} ${H*0.53} M ${W*0.5} ${H*0.1} L ${W*0.5} ${H*0.9} M ${W*0.53} ${H*0.5} L ${W*0.81} ${H*0.5}" stroke="var(--line)" stroke-width="3" stroke-dasharray="6 5" fill="none" opacity=".7"/>`;
    (vm.zones || []).forEach(z => {
      const d = densFor(z.label);
      const col = d === null ? "var(--tenant-accent)" : d > 85 ? "#ef4444" : d > 55 ? "#f59e0b" : "#22c55e";
      const op = d === null ? .10 : 0.12 + (d / 100) * 0.35;
      svg += `<rect x="${(z.x*W).toFixed(1)}" y="${(z.y*H).toFixed(1)}" width="${(z.w*W).toFixed(1)}" height="${(z.h*H).toFixed(1)}" rx="10" fill="${col}" fill-opacity="${op.toFixed(2)}" stroke="${col}" stroke-width="1.5"/>`;
      svg += `<text x="${(z.x*W+8).toFixed(1)}" y="${(z.y*H+18).toFixed(1)}" font-size="${opts.fs||13}" fill="var(--text)" font-weight="700">${zxesc(z.label)}</text>`;
      if (d !== null) svg += `<text x="${(z.x*W+8).toFixed(1)}" y="${(z.y*H+36).toFixed(1)}" font-size="${(opts.fs||13)-2}" fill="${col}" font-weight="800">${d}% · ${z.capacity||""}</text>`;
    });
    // pods markers
    ZXStore.pods().forEach((p, i) => {
      const z = (vm.zones || [])[i % (vm.zones || []).length];
      if (!z) return;
      const px = (z.x + z.w * 0.8) * W, py = (z.y + z.h * 0.85) * H;
      svg += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="7" fill="var(--tenant-accent)" stroke="#fff" stroke-width="2"/>`;
      svg += `<text x="${px.toFixed(1)}" y="${(py-12).toFixed(1)}" font-size="${(opts.fs||13)-2}" text-anchor="middle" fill="var(--muted)">${p.id} (${p.currentHeadcount})</text>`;
    });
    svg += `</svg>`;
    // animated people-flow dots (CSS transition for smooth movement)
    const agents = (cm.agents || []).map(a =>
      `<span class="agent-dot" style="left:${(a.x*100).toFixed(2)}%;top:${(a.y*100).toFixed(2)}%"></span>`).join("");
    return svg + agents;
  };

  // Service worker registration (graceful when opened via file://)
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    });
  }
})();
