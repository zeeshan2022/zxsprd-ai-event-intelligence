/**
 * ZXSPRD AI - Mock Data Fixtures (v2.0 SaaS Pivot)
 * Updated Schema: White-labeling, Pod Overrides, Meeting Intelligence, Guest Check-in.
 */

const ZXSeed = {
  version: 2, // Bumped version to force reset of localStorage
  activeRole: "SUPER_ADMIN",
  activeTenantId: "tenant-wps-2026",
  activePodId: "POD-01",

  tenants: [
    {
      id: "tenant-wps-2026",
      name: "World Police Summit 2026",
      subdomain: "wps2026",
      tier: "Enterprise",
      maxPods: 20,
      assignedPods: 5,
      status: "Active",
      createdDate: "2026-01-14",
      // --- NEW: White-labeling & Branding ---
      logoUrl: "https://api.dicebear.com/7.0/identicon/1.svg", 
      primaryColor: "#2563EB",
      headerText: "WPS 2026 Secure Intelligence Hub",
      footerText: "© 2026 World Police Summit. All rights reserved.",
      // --- NEW: Global Routing Defaults ---
      defaultLlm: "OCI Llama 3 70B (Private)",
      defaultTts: "ElevenLabs Neural v2"
    },
    {
      id: "tenant-tech-expo",
      name: "Global Tech Innovation Expo",
      subdomain: "techexpo",
      tier: "Pro",
      maxPods: 10,
      assignedPods: 2,
      status: "Active",
      createdDate: "2026-02-02",
      logoUrl: "https://api.dicebear.com/7.0/identicon/2.svg",
      primaryColor: "#10B981",
      headerText: "Tech Expo Live Intelligence",
      footerText: "Powered by ZXSPRD AI",
      defaultLlm: "OpenAI GPT-4o",
      defaultTts: "Azure Neural TTS"
    }
  ],

  pods: [
    {
      id: "POD-01", 
      tenantId: "tenant-wps-2026", 
      macAddress: "AC:DE:48:00:11:22", 
      location: "DWTC Hall A1 — Zone 1",
      // --- NEW: Pod-Level Overrides ---
      llmOverride: null, // Inherits tenant default if null
      ttsOverride: null,
      networkMode: "PRIVATE_OCI_VCN",
      standbyTimeoutMins: 15,
      audioRouting: { mic1: "Host", mic2: "Guest" },
      // Telemetry
      pingMs: 18, cpuUsage: 22, memoryUsageGb: 3.8, batteryPct: 98, status: "Online",
      // Meeting State
      currentMeetingId: "mtg-101" 
    },
    {
      id: "POD-02", 
      tenantId: "tenant-wps-2026", 
      macAddress: "AC:DE:48:00:11:23", 
      location: "DWTC Hall A1 — Zone 2",
      llmOverride: "OpenAI GPT-4o", // Overridden for this specific pod
      ttsOverride: null,
      networkMode: "PUBLIC_SAAS",
      standbyTimeoutMins: 5,
      audioRouting: { mic1: "Host", mic2: "Audience Q&A" },
      pingMs: 24, cpuUsage: 19, memoryUsageGb: 3.5, batteryPct: 94, status: "Online",
      currentMeetingId: null // Idle
    }
  ],

  // --- REPLACED: Sessions are now "Meetings" with Intelligence Data ---
  meetings: [
    {
      id: "mtg-101",
      tenantId: "tenant-wps-2026",
      podId: "POD-01",
      title: "AI Governance in Sovereign Law Enforcement",
      startTime: "10:00 AM",
      endTime: "10:45 AM",
      hostName: "Dr. Aris Thorne",
      status: "Ended", // Idle, Recording, Paused, Ended
      hitlStatus: "PendingApproval", // Draft, PendingApproval, Approved, Rejected
      
      // --- NEW: Guest Check-in Data ---
      guests: [
        { id: "g1", name: "Elena Rostova", email: "elena@cybersec.gov", phone: "+971500000000", role: "Guest", checkedInAt: "09:55 AM" },
        { id: "g2", name: "Col. Majid Al Suwaidi", email: "majid@dps.gov", phone: "", role: "VIP", checkedInAt: "09:58 AM" }
      ],

      // --- NEW: Meeting Intelligence (Raw & AI) ---
      rawTranscript: [
        { time: "10:00:12", speaker: "Dr. Aris Thorne", text: "Welcome everyone. Today we are presenting the sovereign data cloud compliance matrix." },
        { time: "10:02:45", speaker: "Elena Rostova", text: "Thank you. How does the 30-day automated data purge verify compliance with national regulations?" },
        { time: "10:05:10", speaker: "Dr. Aris Thorne", text: "The system utilizes cryptographic shredding. Once the window closes, keys are destroyed." }
      ],
      aiSummary: "The session covered sovereign data cloud compliance, specifically focusing on the 30-day automated data purge mechanism using cryptographic shredding to ensure national regulatory compliance.",
      sentimentScore: 85, // 0-100
      actionItems: [
        "Review cryptographic shredding documentation.",
        "Verify 30-day purge logs with the compliance team."
      ]
    },
    {
      id: "mtg-102",
      tenantId: "tenant-wps-2026",
      podId: "POD-02",
      title: "Ad-Hoc: Quick Sync",
      startTime: "11:15 AM",
      endTime: null,
      hostName: "John Doe",
      status: "Recording",
      hitlStatus: "Draft",
      guests: [],
      rawTranscript: [
        { time: "11:15:30", speaker: "John Doe", text: "Testing the new ad-hoc meeting flow." }
      ],
      aiSummary: "Draft summary generating...",
      sentimentScore: 70,
      actionItems: []
    }
  ],

  documents: [
    { id:"doc-1", tenantId:"tenant-wps-2026", fileName:"WPS_2026_Official_Agenda.pdf", fileSizeMb:4.2, status:"Ready", progress:100, vectorCount:1890 }
  ],

  broadcasts: [
    { id:"bc-1", tenantId:"tenant-wps-2026", message:"Welcome to Hall A1 Intelligence Hub.", timestamp:"09:45:12", active:true }
  ],

  voiceQueries: []
};

window.ZXSeed = ZXSeed;