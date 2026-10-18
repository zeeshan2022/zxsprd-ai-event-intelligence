/**
 * ZXSPRD AI - Mock Data Fixtures (v3.0)
 * Expanded for: Guest Portal, Crowd Analytics, Public Display, Dual Broadcasts.
 */

const ZXSeed = {
  version: 3, // Force reset localStorage
  activeRole: "SUPER_ADMIN",
  activeTenantId: "tenant-wps-2026",
  activePodId: "POD-01",

  // --- TENANTS (White-label & Config) ---
  tenants: [
    {
      id: "tenant-wps-2026", name: "World Police Summit 2026", subdomain: "wps2026", tier: "Enterprise",
      maxPods: 20, assignedPods: 5, status: "Active", createdDate: "2026-01-14",
      logoUrl: "https://api.dicebear.com/7.0/identicon/1.svg", primaryColor: "#2563EB",
      headerText: "WPS 2026 Secure Intelligence Hub", footerText: "© 2026 World Police Summit.",
      defaultLlm: "OCI Llama 3 70B (Private)", defaultTts: "ElevenLabs Neural v2",
      venueCapacity: 5000, currentOccupancy: 3420
    },
    {
      id: "tenant-tech-expo", name: "Global Tech Innovation Expo", subdomain: "techexpo", tier: "Pro",
      maxPods: 10, assignedPods: 2, status: "Active", createdDate: "2026-02-02",
      logoUrl: "https://api.dicebear.com/7.0/identicon/2.svg", primaryColor: "#10B981",
      headerText: "Tech Expo Live Intelligence", footerText: "Powered by ZXSPRD AI",
      defaultLlm: "OpenAI GPT-4o", defaultTts: "Azure Neural TTS",
      venueCapacity: 2000, currentOccupancy: 1850
    }
  ],

  // --- PODS (Edge Hardware) ---
  pods: [
    { id: "POD-01", tenantId: "tenant-wps-2026", macAddress: "AC:DE:48:00:11:22", location: "DWTC Hall A1 — Zone 1",
      llmOverride: null, ttsOverride: null, standbyTimeoutMins: 15, status: "Online", currentMeetingId: "mtg-101",
      densityLevel: "High", currentHeadcount: 145 },
    { id: "POD-02", tenantId: "tenant-wps-2026", macAddress: "AC:DE:48:00:11:23", location: "DWTC Hall A1 — Zone 2",
      llmOverride: "OpenAI GPT-4o", ttsOverride: null, standbyTimeoutMins: 5, status: "Online", currentMeetingId: null,
      densityLevel: "Medium", currentHeadcount: 82 }
  ],

  // --- MEETINGS (Intelligence & Raw Data) ---
  meetings: [
    {
      id: "mtg-101", tenantId: "tenant-wps-2026", podId: "POD-01",
      title: "AI Governance in Sovereign Law Enforcement", startTime: "10:00 AM", endTime: "10:45 AM",
      hostName: "Dr. Aris Thorne", status: "Ended", hitlStatus: "PendingApproval",
      guests: [
        { id: "g1", badgeId: "BDG-9941", name: "Elena Rostova", email: "elena@cybersec.gov", phone: "+971500000000", role: "VIP", checkedInAt: "09:55 AM" }
      ],
      rawTranscript: [
        { time: "10:00:12", speaker: "Dr. Aris Thorne", text: "Welcome everyone. Today we are presenting the sovereign data cloud compliance matrix." },
        { time: "10:02:45", speaker: "Elena Rostova", text: "How does the 30-day automated data purge verify compliance with national regulations?" },
        { time: "10:05:10", speaker: "Dr. Aris Thorne", text: "The system utilizes cryptographic shredding. Once the window closes, keys are destroyed." }
      ],
      aiSummary: "The session covered sovereign data cloud compliance, focusing on the 30-day automated data purge mechanism using cryptographic shredding.",
      sentimentScore: 85, actionItems: ["Review cryptographic shredding docs.", "Verify purge logs."]
    }
  ],

  // --- CROWD & SPATIAL ANALYTICS ---
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

  // --- PUBLIC DISPLAY DATA ---
  trendingTopics: [
    { keyword: "Sovereign Cloud", mentions: 142, sentiment: "Positive" },
    { keyword: "Cryptographic Shredding", mentions: 98, sentiment: "Neutral" },
    { keyword: "Edge Inference", mentions: 76, sentiment: "Positive" },
    { keyword: "Data Purge", mentions: 54, sentiment: "Negative" }
  ],

  // --- DUAL BROADCASTS ---
  broadcasts: {
    internal: [ // Staff/Pod only
      { id: "bc-int-1", tenantId: "tenant-wps-2026", message: "Tech check required for POD-03 in 10 mins.", timestamp: "09:30 AM", active: true }
    ],
    public: [ // Guest/Display screens
      { id: "bc-pub-1", tenantId: "tenant-wps-2026", message: "Keynote in Hall A1 starts in 15 minutes. Please take your seats.", timestamp: "09:45 AM", active: true }
    ]
  },

  // --- GUEST PORTAL PROFILES ---
  guestProfiles: [
    { id: "usr-1", badgeId: "BDG-9941", name: "Elena Rostova", email: "elena@cybersec.gov", phone: "+971500000000", interests: ["AI Governance", "Cloud Security"], joinedSessions: ["mtg-101"] },
    { id: "usr-2", badgeId: "BDG-8821", name: "Col. Majid Al Suwaidi", email: "majid@dps.gov", phone: "", interests: ["Forensics", "Smart Policing"], joinedSessions: [] }
  ],

  // --- SPONSORS (For Injection) ---
  sponsors: [
    { id: "sp-1", name: "Oracle Cloud Infrastructure", logoUrl: "https://api.dicebear.com/7.0/identicon/oracle.svg", message: "Visit Booth 42 for a live demo of sovereign edge nodes." }
  ],

  documents: [],
  voiceQueries: []
};

window.ZXSeed = ZXSeed;