/**
 * ZXSPRD AI - Global State Engine (v4.0)
 * Corrected Architecture: Strict separation of SaaS Owner (Super Admin) 
 * and Event Organizer (Client Admin) responsibilities.
 * All mutations are fully functional and cross-tab synced.
 */

const ZXStore = (() => {
  const KEY = "zxsprd-global-state-v4";
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const listeners = new Set();
  let channel = null;
  let storageOK = true;

  // Load initial state from LocalStorage or Seed
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.version === (window.ZXSeed?.version || 4)) return { ...clone(window.ZXSeed), ...parsed };
      }
    } catch (e) { storageOK = false; }
    return clone(window.ZXSeed);
  }

  let state = load();

  function persist() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); storageOK = true; }
    catch (e) { storageOK = false; }
  }

  function notify(source) { listeners.forEach(fn => fn(state, source)); }

  // Cross-tab synchronization
  try {
    if ("BroadcastChannel" in window) {
      channel = new BroadcastChannel("zxsprd-state-v4");
      channel.onmessage = (e) => {
        if (e.data?.type === "state") { state = e.data.state; notify("cross-tab"); }
      };
    }
  } catch (e) {}

  window.addEventListener("storage", (e) => {
    if (e.key === KEY && e.newValue) {
      try { state = JSON.parse(e.newValue); notify("cross-tab"); } catch (_) {}
    }
  });

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

    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },

    // --- GETTERS ---
    tenant(id = state.activeTenantId) { return state.tenants.find(t => t.id === id); },
    pods(tenantId = state.activeTenantId) { return state.pods.filter(p => p.tenantId === tenantId); },
    schedule(tenantId = state.activeTenantId) { return state.schedule.filter(s => s.tenantId === tenantId); },
    meetings(tenantId = state.activeTenantId) { return state.meetings.filter(m => m.tenantId === tenantId); },
    
    // --- CONTEXT SWITCHING ---
    setRole(role) { this.set({ activeRole: role }); },
    setTenant(id) {
      if (!this.state.tenants.some(t => t.id === id)) return false;
      const firstPod = this.state.pods.find(p => p.tenantId === id);
      this.set({ activeTenantId: id, activePodId: firstPod ? firstPod.id : "" });
      return true;
    },

    // ==========================================
    // SUPER ADMIN ACTIONS (SaaS Platform Owner)
    // ==========================================
    addTenant(tenantData) {
      const newTenant = {
        ...tenantData,
        id: `tnt-${Date.now()}`,
        assignedPods: 0,
        status: "Active",
        createdDate: new Date().toISOString().split('T')[0]
      };
      this.set({ tenants: [...state.tenants, newTenant] });
      return newTenant.id;
    },
    updateTenant(tenantId, updates) {
      this.set({ tenants: state.tenants.map(t => t.id === tenantId ? { ...t, ...updates } : t) });
    },
    toggleTenantStatus(tenantId) {
      this.set({
        tenants: state.tenants.map(t => t.id === tenantId ? { ...t, status: t.status === 'Active' ? 'Suspended' : 'Active' } : t)
      });
    },
    updateTenantQuota(tenantId, newMax) {
      this.set({ tenants: state.tenants.map(t => t.id === tenantId ? { ...t, maxPods: newMax } : t) });
    },

    // ==========================================
    // CLIENT ADMIN ACTIONS (Event Organizer)
    // ==========================================
    
    // Pod Lifecycle & Mic Setup
    addPod(podData) {
      const tenant = this.tenant(podData.tenantId);
      if (!tenant || tenant.assignedPods >= tenant.maxPods) return false; // Quota strictly enforced
      
      const newPod = { 
        ...podData, 
        id: `POD-${String(state.pods.length + 1).padStart(2, '0')}`, 
        status: "Online", 
        densityLevel: "Low", 
        currentHeadcount: 0,
        currentMeetingId: null,
        mic1Role: "Host (Speaker 1)",
        mic2Role: "Guest (Speaker 2)",
        mic1Gain: 50,
        mic2Gain: 50
      };
      this.set({
        pods: [...state.pods, newPod],
        tenants: state.tenants.map(t => t.id === podData.tenantId ? { ...t, assignedPods: t.assignedPods + 1 } : t)
      });
      return true;
    },
    deletePod(podId) {
      const pod = state.pods.find(p => p.id === podId);
      if (!pod) return;
      this.set({
        pods: state.pods.filter(p => p.id !== podId),
        tenants: state.tenants.map(t => t.id === pod.tenantId ? { ...t, assignedPods: Math.max(0, t.assignedPods - 1) } : t)
      });
    },
    updatePodOverrides(podId, overrides) {
      this.set({ pods: state.pods.map(p => p.id === podId ? { ...p, ...overrides } : p) });
    },
    updateMicMapping(podId, mic1Role, mic2Role) {
      this.set({ 
        pods: state.pods.map(p => p.id === podId ? { ...p, mic1Role, mic2Role } : p) 
      });
    },

    // Schedule Builder
    addSession(sessionData) {
      const newSession = {
        ...sessionData,
        id: `sch-${Date.now()}`,
        status: "Scheduled"
      };
      this.set({ schedule: [...state.schedule, newSession] });
      return newSession.id;
    },
    updateSessionStatus(sessionId, status) {
      this.set({ schedule: state.schedule.map(s => s.id === sessionId ? { ...s, status } : s) });
    },
    deleteSession(sessionId) {
      this.set({ schedule: state.schedule.filter(s => s.id !== sessionId) });
    },

    // Meeting Intelligence & HITL
    startMeeting(podId, hostName, title = null) {
      const pod = state.pods.find(p => p.id === podId);
      if (!pod) return null;
      
      const newMeeting = {
        id: `mtg-${Date.now()}`,
        tenantId: state.activeTenantId,
        podId,
        title: title || `Ad-Hoc Meeting - ${new Date().toLocaleDateString()}`,
        startTime: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        endTime: null,
        hostName,
        status: "Recording",
        hitlStatus: "Draft",
        guests: [],
        rawTranscript: [],
        aiSummary: "Meeting in progress...",
        sentimentScore: 0,
        actionItems: []
      };
      this.set({
        meetings: [...state.meetings, newMeeting],
        pods: state.pods.map(p => p.id === podId ? { ...p, currentMeetingId: newMeeting.id } : p)
      });
      return newMeeting.id;
    },
    endMeeting(meetingId) {
      const meeting = state.meetings.find(m => m.id === meetingId);
      if (!meeting) return;
      
      this.set({
        meetings: state.meetings.map(m => m.id === meetingId ? { 
          ...m, 
          status: "Ended", 
          endTime: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
          hitlStatus: "PendingApproval",
          aiSummary: m.aiSummary === "Meeting in progress..." ? "Draft summary generated by AI. Awaiting approval." : m.aiSummary
        } : m),
        pods: state.pods.map(p => p.currentMeetingId === meetingId ? { ...p, currentMeetingId: null } : p)
      });
    },
    checkInGuest(meetingId, guestData) {
      const newGuest = { ...guestData, id: `g-${Date.now()}`, checkedInAt: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
      this.set({ meetings: state.meetings.map(m => m.id === meetingId ? { ...m, guests: [...m.guests, newGuest] } : m) });
    },
    approveSummary(meetingId, editedSummary) {
      this.set({
        meetings: state.meetings.map(m => m.id === meetingId ? { ...m, hitlStatus: "Approved", aiSummary: editedSummary || m.aiSummary } : m)
      });
    },
    rejectSummary(meetingId) {
      this.set({ meetings: state.meetings.map(m => m.id === meetingId ? { ...m, hitlStatus: "Rejected" } : m) });
    },
    deleteMeeting(meetingId) {
      this.set({ meetings: state.meetings.filter(m => m.id !== meetingId) });
    },

    // 4-Channel Announcement Engine
    sendBroadcast(channel, message) {
      const tid = state.activeTenantId;
      const bc = { id: `bc-${Date.now()}`, tenantId: tid, message, timestamp: new Date().toLocaleTimeString(), active: true };
      
      const updatedChannel = state.broadcasts[channel].map(b => b.tenantId === tid ? { ...b, active: false } : b).concat(bc);
      
      this.set({ 
        broadcasts: { ...state.broadcasts, [channel]: updatedChannel } 
      });
    },
    clearBroadcast(channel) {
      const tid = state.activeTenantId;
      this.set({ 
        broadcasts: { 
          ...state.broadcasts, 
          [channel]: state.broadcasts[channel].map(b => b.tenantId === tid ? { ...b, active: false } : b)
        } 
      });
    },

    // Crowd Analytics Simulation
    simulateCrowdShift() {
      const tenant = this.tenant();
      if (!tenant) return;
      
      const delta = Math.floor(Math.random() * 40) - 15;
      const newOcc = Math.max(0, Math.min(tenant.venueCapacity, (tenant.currentOccupancy || 0) + delta));
      
      const updatedPods = state.pods.map(p => {
        if (p.tenantId !== tenant.id) return p;
        const headcountDelta = Math.floor(Math.random() * 10) - 3;
        const newHeadcount = Math.max(0, p.currentHeadcount + headcountDelta);
        const density = newHeadcount > 100 ? "High" : newHeadcount > 50 ? "Medium" : "Low";
        return { ...p, currentHeadcount: newHeadcount, densityLevel: density };
      });

      this.set({
        tenants: state.tenants.map(t => t.id === tenant.id ? { ...t, currentOccupancy: newOcc } : t),
        pods: updatedPods,
        crowdMetrics: { 
          ...state.crowdMetrics, 
          currentOccupancy: newOcc,
          ingressLastHour: Math.max(0, state.crowdMetrics.ingressLastHour + Math.floor(Math.random() * 10) - 5),
          egressLastHour: Math.max(0, state.crowdMetrics.egressLastHour + Math.floor(Math.random() * 10) - 5)
        }
      });
    },

    // Sponsors
    addSponsor(sponsorData) {
      this.set({ sponsors: [...state.sponsors, { ...sponsorData, id: `sp-${Date.now()}` }] });
    },
    removeSponsor(sponsorId) {
      this.set({ sponsors: state.sponsors.filter(s => s.id !== sponsorId) });
    },

    // Guest Portal
    addGuestProfile(profileData) {
      const exists = state.guestProfiles.find(g => g.badgeId === profileData.badgeId);
      if (exists) {
        this.set({ guestProfiles: state.guestProfiles.map(g => g.badgeId === profileData.badgeId ? { ...g, ...profileData } : g) });
      } else {
        this.set({ guestProfiles: [...state.guestProfiles, { ...profileData, id: `usr-${Date.now()}`, joinedSessions: [] }] });
      }
    },
    logGuestInteraction(badgeId, meetingId) {
      this.set({
        guestProfiles: state.guestProfiles.map(g => g.badgeId === badgeId ? { ...g, joinedSessions: [...new Set([...g.joinedSessions, meetingId])] } : g)
      });
    },

    // Reset
    reset() {
      state = clone(window.ZXSeed);
      persist();
      try { channel?.postMessage({ type:"state", state }); } catch (_) {}
      notify("reset");
    }
  };
})();

window.ZXStore = ZXStore;