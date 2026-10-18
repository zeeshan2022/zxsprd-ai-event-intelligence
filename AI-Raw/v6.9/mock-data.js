/**
 * ZXSPRD AI - Mock Data Fixtures (v4.0)
 * Corrected Architecture: Strict separation of SaaS Owner (Super Admin) 
 * and Event Organizer (Client Admin) responsibilities.
 */

const ZXSeed = {
  version: 4, // Force reset localStorage for new schema
  activeRole: "SUPER_ADMIN",
  activeTenantId: "tenant-wps-2026",
  activePodId: "POD-01",

  // ==========================================
  // SUPER ADMIN SCOPE: Tenants & Global Config
  // ==========================================
  tenants: [
    {
      id: "tenant-wps-2026",
      name: "World Police Summit 2026",
      subdomain: "wps2026",
      tier: "Enterprise",
      maxPods: 20,
      assignedPods: 3, // Currently using 3 out of 20
      status: "Active",
      createdDate: "2026-01-14",
      // White-labeling
      logoUrl: "https://api.dicebear.com/7.0/identicon/police.svg",
      primaryColor: "#2563EB",
      headerText: "WPS 2026 Secure Intelligence Hub",
      footerText: "© 2026 World Police Summit.",
      // Global Routing Defaults
      defaultLlm: "OCI Llama 3 70B (Private)",
      defaultTts: "ElevenLabs Neural v2",
      // Venue Config (Used by Client Admin Crowd Analytics)
      venueCapacity: 5000,
      currentOccupancy: 3420
    },
    {
      id: "tenant-tech-expo",
      name: "Global Tech Innovation Expo",
      subdomain: "techexpo",
      tier: "Pro",
      maxPods: 5,
      assignedPods: 1,
      status: "Active",
      createdDate: "2026-02-02",
      logoUrl: "https://api.dicebear.com/7.0/identicon/tech.svg",
      primaryColor: "#10B981",
      headerText: "Tech Expo Live Intelligence",
      footerText: "Powered by ZXSPRD AI",
      defaultLlm: "OpenAI GPT-4o",
      defaultTts: "Azure Neural TTS",
      venueCapacity: 2000,
      currentOccupancy: 1150
    }
  ],

  // ==========================================
  // CLIENT ADMIN SCOPE: Event Operations
  // ==========================================
  
  // Pods (Includes Mic Setup & Hardware Config)
  pods: [
    { 
      id: "POD-01", tenantId: "tenant-wps-2026", macAddress: "AC:DE:48:00:11:22", location: "DWTC Hall A1 — Zone 1",
      llmOverride: null, ttsOverride: null, standbyTimeoutMins: 15, status: "Online", currentMeetingId: null,
      densityLevel: "High", currentHeadcount: 145,
      // Mic Mapping (Moved to Pod level for Client Admin control)
      mic1Role: "Host (Speaker 1)", mic2Role: "Guest (Speaker 2)", mic1Gain: 65, mic2Gain: 42 
    },
    { 
      id: "POD-02", tenantId: "tenant-wps-2026", macAddress: "AC:DE:48:00:11:23", location: "DWTC Hall A1 — Zone 2",
      llmOverride: "OpenAI GPT-4o", ttsOverride: null, standbyTimeoutMins: 5, status: "Online", currentMeetingId: null,
      densityLevel: "Medium", currentHeadcount: 82,
      mic1Role: "Host (Speaker 1)", mic2Role: "Audience Q&A", mic1Gain: 70, mic2Gain: 12
    },
    { 
      id: "POD-03", tenantId: "tenant-wps-2026", macAddress: "AC:DE:48:00:11:24", location: "DWTC Hall B2 — VIP",
      llmOverride: null, ttsOverride: null, standbyTimeoutMins: 10, status: "Online", currentMeetingId: "mtg-101",
      densityLevel: "Low", currentHeadcount: 12,
      mic1Role: "Host (Speaker 1)", mic2Role: "Guest (Speaker 2)", mic1Gain: 50, mic2Gain: 50
    }
  ],

  // Schedule Builder (Planned Sessions)
  schedule: [
    { id: "sch-1", tenantId: "tenant-wps-2026", podId: "POD-01", title: "AI Governance in Sovereign Law Enforcement", startTime: "10:00 AM", endTime: "10:45 AM", speakerHost: "Dr. Aris Thorne", speakerGuest: "Elena Rostova", status: "Scheduled" },
    { id: "sch-2", tenantId: "tenant-wps-2026", podId: "POD-02", title: "Edge Inference for Real-Time Border Analytics", startTime: "11:00 AM", endTime: "11:45 AM", speakerHost: "Col. Majid Al Suwaidi", speakerGuest: "Dr. Lena Fischer", status: "Scheduled" },
    { id: "sch-3", tenantId: "tenant-wps-2026", podId: "POD-03", title: "Closed-Door Keynote: National AI Safety", startTime: "09:00 AM", endTime: "09:40 AM", speakerHost: "H.E. Saif Al Mansouri", speakerGuest: "Dr. Aris Thorne", status: "Completed" }
  ],

  // Meeting Intelligence (Recorded Sessions & HITL)
  meetings: [
    {
      id: "mtg-101", tenantId: "tenant-wps-2026", podId: "POD-03",
      title: "Closed-Door Keynote: National AI Safety", startTime: "09:00 AM", endTime: "09:40 AM",
      hostName: "H.E. Saif Al Mansouri", status: "Ended", hitlStatus: "PendingApproval",
      guests: [
        { id: "g1", badgeId: "BDG-9941", name: "Elena Rostova", email: "elena@cybersec.gov", phone: "+971500000000", role: "VIP", checkedInAt: "08:55 AM" }
      ],
      rawTranscript: [
        { time: "09:00:12", speaker: "H.E. Saif Al Mansouri", text: "Welcome everyone. Today we are presenting the sovereign data cloud compliance matrix." },
        { time: "09:02:45", speaker: "Dr. Aris Thorne", text: "How does the 30-day automated data purge verify compliance with national regulations?" },
        { time: "09:05:10", speaker: "H.E. Saif Al Mansouri", text: "The system utilizes cryptographic shredding. Once the window closes, keys are destroyed." }
      ],
      aiSummary: "The session covered sovereign data cloud compliance, focusing on the 30-day automated data purge mechanism using cryptographic shredding to ensure national regulatory compliance.",
      sentimentScore: 85, actionItems: ["Review cryptographic shredding docs.", "Verify purge logs."]
    }
  ],

  // Crowd & Spatial Analytics (Client Admin View)
  crowdMetrics: {
    totalVenueCapacity: 5000,
    currentOccupancy: 3420,
    ingressLastHour: 450,
    egressLastHour: 120,
    peakHour: "11:00 AM - 12:00 PM",
    hotZones: [
      { zone: "Hall A1 - Main Stage", density: 92, status: "Critical" },
      { zone: "Hall B2 - VIP Lounge", density: 65, status: "Moderate" },
      { zone: "Expo Hall 3 - Startup", density: 40, status: "Comfortable" }
    ]
  },

  // Sponsors & Partner Content (Client Admin Injection)
  sponsors: [
    { id: "sp-1", name: "Oracle Cloud Infrastructure", logoUrl: "https://api.dicebear.com/7.0/identicon/oracle.svg", message: "Visit Booth 42 for a live demo of sovereign edge nodes." },
    { id: "sp-2", name: "Deepgram AI", logoUrl: "https://api.dicebear.com/7.0/identicon/deepgram.svg", message: "Powering real-time neural transcription across all pods." }
  ],

  // 4-Channel Announcement Engine (Client Admin Broadcasts)
  broadcasts: {
    internalPod: [],      // 1. Internal Pod (Staff/Edge Kiosk only)
    allScreens: [],       // 2. All Screens (Public Signage/TVs)
    guestPortal: [],      // 3. Guest Portal (General mobile PWA banner)
    loggedInUsers: []     // 4. Logged-in Users (Targeted based on interests/badge)
  },

  // Public Display Data (Trends)
  trendingTopics: [
    { keyword: "Sovereign Cloud", mentions: 142, sentiment: "Positive" },
    { keyword: "Cryptographic Shredding", mentions: 98, sentiment: "Neutral" },
    { keyword: "Edge Inference", mentions: 76, sentiment: "Positive" },
    { keyword: "Data Purge", mentions: 54, sentiment: "Negative" }
  ],

  // Guest Portal Profiles
  guestProfiles: [
    { id: "usr-1", badgeId: "BDG-9941", name: "Elena Rostova", email: "elena@cybersec.gov", phone: "+971500000000", interests: ["AI Governance", "Cloud Security"], joinedSessions: ["mtg-101"] }
  ],

  documents: [],
  voiceQueries: []
};

window.ZXSeed = ZXSeed;