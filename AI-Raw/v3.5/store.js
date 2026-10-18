/**
 * ZXSPRD AI - Global State Engine & Mock Data
 * Vanilla JS implementation mimicking Zustand + Persist + Cross-Tab Sync
 */

const ZXSeed = {
  version: 1,
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
      networkMode: "PRIVATE_OCI_VCN",
      llmProvider: "OCI Llama 3 70B (Private)",
      ttsProvider: "ElevenLabs Neural v2",
      temperature: 0.2,
      fallbackEnabled: false,
      status: "Active",
      primaryColor: "#0F172A",
      createdDate: "2026-01-14"
    },
    {
      id: "tenant-tech-expo",
      name: "Global Tech Innovation Expo",
      subdomain: "techexpo",
      tier: "Pro",
      maxPods: 2,
      assignedPods: 2,
      networkMode: "PUBLIC_SAAS",
      llmProvider: "OpenAI GPT-4o",
      ttsProvider: "Azure Neural TTS",
      temperature: 0.7,
      fallbackEnabled: true,
      status: "Active",
      primaryColor: "#2563EB",
      createdDate: "2026-02-02"
    },
    {
      id: "tenant-civic",
      name: "Smart City Governance Summit",
      subdomain: "smartcity",
      tier: "Standard",
      maxPods: 8,
      assignedPods: 0,
      networkMode: "PUBLIC_SAAS",
      llmProvider: "Anthropic Claude 3.5",
      ttsProvider: "Deepgram Aura",
      temperature: 0.4,
      fallbackEnabled: false,
      status: "Suspended",
      primaryColor: "#475569",
      createdDate: "2026-02-20"
    }
  ],

  pods: [
    { id:"POD-01", tenantId:"tenant-wps-2026", macAddress:"AC:DE:48:00:11:22", location:"DWTC Hall A1 — Zone 1", activeSessionId:"sess-101", pingMs:18, cpuUsage:22, memoryUsageGb:3.8, batteryPct:98, status:"Online", mic1Role:"Host (Speaker 1)", mic2Role:"Guest (Speaker 2)", mic1Gain:65, mic2Gain:42, llmOverride:null },
    { id:"POD-02", tenantId:"tenant-wps-2026", macAddress:"AC:DE:48:00:11:23", location:"DWTC Hall A1 — Zone 2", activeSessionId:"sess-102", pingMs:24, cpuUsage:19, memoryUsageGb:3.5, batteryPct:94, status:"Online", mic1Role:"Host (Speaker 1)", mic2Role:"Audience Q&A", mic1Gain:70, mic2Gain:12, llmOverride:null },
    { id:"POD-03", tenantId:"tenant-wps-2026", macAddress:"AC:DE:48:00:11:24", location:"DWTC Hall B2 — VIP Roundtable", activeSessionId:"sess-103", pingMs:31, cpuUsage:41, memoryUsageGb:4.2, batteryPct:87, status:"Online", mic1Role:"Host (Speaker 1)", mic2Role:"Guest (Speaker 2)", mic1Gain:58, mic2Gain:51, llmOverride:"OCI Llama 3 70B (Private)" },
    { id:"POD-04", tenantId:"tenant-wps-2026", macAddress:"AC:DE:48:00:11:25", location:"DWTC Hall C3 — Workshop", activeSessionId:null, pingMs:27, cpuUsage:14, memoryUsageGb:3.2, batteryPct:96, status:"Online", mic1Role:"Unassigned", mic2Role:"Unassigned", mic1Gain:20, mic2Gain:20, llmOverride:null },
    { id:"POD-05", tenantId:"tenant-wps-2026", macAddress:"AC:DE:48:00:11:26", location:"DWTC Hall A1 — Press Desk", activeSessionId:null, pingMs:112, cpuUsage:71, memoryUsageGb:6.1, batteryPct:62, status:"Degraded", mic1Role:"Audience Q&A", mic2Role:"Unassigned", mic1Gain:35, mic2Gain:10, llmOverride:null },
    { id:"POD-06", tenantId:"tenant-tech-expo", macAddress:"AC:DE:48:00:22:10", location:"Expo Hall 3 — Startup Stage", activeSessionId:"sess-201", pingMs:36, cpuUsage:28, memoryUsageGb:3.9, batteryPct:91, status:"Online", mic1Role:"Host (Speaker 1)", mic2Role:"Guest (Speaker 2)", mic1Gain:60, mic2Gain:48, llmOverride:null },
    { id:"POD-07", tenantId:"tenant-tech-expo", macAddress:"AC:DE:48:00:22:11", location:"Expo Hall 3 — Investor Booth", activeSessionId:null, pingMs:42, cpuUsage:33, memoryUsageGb:4.0, batteryPct:88, status:"Online", mic1Role:"Host (Speaker 1)", mic2Role:"Audience Q&A", mic1Gain:55, mic2Gain:22, llmOverride:null }
  ],

  sessions: [
    { id:"sess-101", tenantId:"tenant-wps-2026", podId:"POD-01", title:"AI Governance in Sovereign Law Enforcement Data Ecosystems", startTime:"10:00 AM", endTime:"10:45 AM", speakerHost:"Dr. Aris Thorne (Chief AI Architect)", speakerGuest:"Elena Rostova (Cyber Security Director)", status:"Live", hitlApproved:false, summaryText:"Key Takeaways: 100% UAE local data residency confirmed on OCI. Automatic 30-day data purge verified. Zero biometric identity tracking enabled." },
    { id:"sess-102", tenantId:"tenant-wps-2026", podId:"POD-02", title:"Edge Inference for Real-Time Border Analytics", startTime:"11:00 AM", endTime:"11:45 AM", speakerHost:"Col. Majid Al Suwaidi", speakerGuest:"Dr. Lena Fischer", status:"Scheduled", hitlApproved:false, summaryText:"Draft AI Summary: Session covered edge inference latency budgets and offline fallback behaviour." },
    { id:"sess-103", tenantId:"tenant-wps-2026", podId:"POD-03", title:"Closed-Door Keynote: National AI Safety Framework", startTime:"09:00 AM", endTime:"09:40 AM", speakerHost:"H.E. Saif Al Mansouri", speakerGuest:"Dr. Aris Thorne", status:"Completed", hitlApproved:false, summaryText:"Executive Briefing: Sovereign model hosting mandated for all classified workloads. Human approval required before any external distribution of keynote summaries." },
    { id:"sess-201", tenantId:"tenant-tech-expo", podId:"POD-06", title:"Scaling Sovereign Cloud Startups", startTime:"02:00 PM", endTime:"02:45 PM", speakerHost:"Nadia Rahman", speakerGuest:"James O'Connor", status:"Scheduled", hitlApproved:false, summaryText:"Draft AI Summary: Panel discussed funding pathways for sovereign infrastructure startups." }
  ],

  documents: [
    { id:"doc-1", tenantId:"tenant-wps-2026", fileName:"WPS_2026_Official_Agenda_Hall_A1.pdf", fileSizeMb:4.2, status:"Ready", progress:100, vectorCount:1890 },
    { id:"doc-2", tenantId:"tenant-wps-2026", fileName:"DWTC_Venue_Map_And_Escalators.pdf", fileSizeMb:2.8, status:"Ready", progress:100, vectorCount:1260 }
  ],

  broadcasts: [
    { id:"bc-1", tenantId:"tenant-wps-2026", message:"Welcome to Hall A1 Intelligence Hub. All pods operational.", timestamp:"09:45:12", active:true }
  ],

  voiceQueries: []
};

/**
 * Global Store (Zustand-like Vanilla Implementation)
 * Features: LocalStorage persistence, Cross-Tab synchronization, Immutable updates.
 */
const ZXStore = (() => {
  const KEY = "zxsprd-global-state-v1";
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const listeners = new Set();
  let channel = null;
  let storageOK = true;

  // Load initial state
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

  // Persist to LocalStorage
  function persist() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); storageOK = true; }
    catch (e) { storageOK = false; }
  }

  // Notify UI subscribers
  function notify(source) {
    listeners.forEach(fn => fn(state, source));
  }

  // Cross-tab synchronization via BroadcastChannel
  try {
    if ("BroadcastChannel" in window) {
      channel = new BroadcastChannel("zxsprd-state");
      channel.onmessage = (e) => {
        if (e.data && e.data.type === "state") {
          state = e.data.state;
          notify("cross-tab");
        }
      };
    }
  } catch (e) { /* Fallback handled by storage event */ }

  // Fallback cross-tab sync for older browsers / strict file:// contexts
  window.addEventListener("storage", (e) => {
    if (e.key === KEY && e.newValue) {
      try { 
        state = JSON.parse(e.newValue); 
        notify("cross-tab"); 
      } catch (_) {}
    }
  });

  // Initial persist to ensure storage is primed
  persist();

  return {
    get state() { return state; },
    get storageOK() { return storageOK; },

    // Core mutation method
    set(patch, source = "local") {
      state = { ...state, ...(typeof patch === "function" ? patch(state) : patch) };
      persist();
      if (source !== "cross-tab") {
        try { channel?.postMessage({ type:"state", state }); } catch (_) {}
      }
      notify(source);
    },

    // Subscribe to state changes
    subscribe(fn) { 
      listeners.add(fn); 
      return () => listeners.delete(fn); 
    },

    // Helper getters
    tenant(id = state.activeTenantId) { return state.tenants.find(t => t.id === id); },
    pods(tenantId = state.activeTenantId) { return state.pods.filter(p => p.tenantId === tenantId); },
    sessions(tenantId = state.activeTenantId) { return state.sessions.filter(s => s.tenantId === tenantId); },
    docs(tenantId = state.activeTenantId) { return state.documents.filter(d => d.tenantId === tenantId); },

    // Context setters
    setRole(role) { this.set({ activeRole: role }); },
    setTenant(id) {
      if (!this.state.tenants.some(t => t.id === id)) return false;
      const firstPod = this.state.pods.find(p => p.tenantId === id);
      this.set({ activeTenantId: id, activePodId: firstPod ? firstPod.id : "" });
      return true;
    },

    // Reset to factory defaults
    reset() {
      state = clone(ZXSeed);
      persist();
      try { channel?.postMessage({ type:"state", state }); } catch (_) {}
      notify("reset");
    }
  };
})();

// Expose globally for HTML files
window.ZXSeed = ZXSeed;
window.ZXStore = ZXStore;