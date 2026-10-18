/**
 * ZXSPRD AI - Global State Engine (v3.0)
 * Handles Multi-Tenancy, Pod Lifecycle, Meeting Intelligence, 
 * Crowd Analytics, Guest Portal, and Dual Broadcasts.
 */

const ZXStore = (() => {
  const KEY = "zxsprd-global-state-v3";
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
        if (parsed && parsed.version === (window.ZXSeed?.version || 3)) return { ...clone(window.ZXSeed), ...parsed };
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
      channel = new BroadcastChannel("zxsprd-state-v3");
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
    meetings(tenantId = state.activeTenantId) { return state.meetings.filter(m => m.tenantId === tenantId); },
    
    // --- CONTEXT SWITCHING ---
    setRole(role) { this.set({ activeRole: role }); },
    setTenant(id) {
      if (!this.state.tenants.some(t => t.id === id)) return false;
      const firstPod = this.state.pods.find(p => p.tenantId === id);
      this.set({ activeTenantId: id, activePodId: firstPod ? firstPod.id : "" });
      return true;
    },

    // --- SUPER ADMIN ACTIONS ---
    updateTenantBranding(tenantId, brandingData) {
      this.set({ tenants: state.tenants.map(t => t.id === tenantId ? { ...t, ...brandingData } : t) });
    },
    updateTenantQuota(tenantId, newMax) {
      this.set({ tenants: state.tenants.map(t => t.id === tenantId ? { ...t, maxPods: newMax } : t) });
    },

    // --- CLIENT ADMIN: POD LIFECYCLE ---
    addPod(podData) {
      const tenant = this.tenant(podData.tenantId);
      if (tenant.assignedPods >= tenant.maxPods) return false; // Quota enforced
      
      const newPod = { ...podData, id: `POD-${String(state.pods.length + 1).padStart(2, '0')}`, status: "Online", densityLevel: "Low", currentHeadcount: 0 };
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

    // --- CLIENT ADMIN: MEETING & HITL ---
    deleteMeeting(meetingId) {
      this.set({ meetings: state.meetings.filter(m => m.id !== meetingId) });
    },
    approveSummary(meetingId, editedSummary) {
      this.set({
        meetings: state.meetings.map(m => m.id === meetingId ? { ...m, hitlStatus: "Approved", aiSummary: editedSummary || m.aiSummary } : m)
      });
    },
    rejectSummary(meetingId) {
      this.set({ meetings: state.meetings.map(m => m.id === meetingId ? { ...m, hitlStatus: "Rejected" } : m) });
    },

    // --- EDGE KIOSK: MEETING FLOW ---
    startMeeting(podId, hostName) {
      const newMeeting = {
        id: `mtg-${Date.now()}`, tenantId: state.activeTenantId, podId,
        title: `Ad-Hoc Meeting - ${new Date().toLocaleDateString()}`,
        startTime: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        endTime: null, hostName, status: "Recording", hitlStatus: "Draft",
        guests: [], rawTranscript: [], aiSummary: "Meeting in progress...", sentimentScore: 0, actionItems: []
      };
      this.set({
        meetings: [...state.meetings, newMeeting],
        pods: state.pods.map(p => p.id === podId ? { ...p, currentMeetingId: newMeeting.id } : p)
      });
      return newMeeting.id;
    },
    endMeeting(meetingId) {
      this.set({
        meetings: state.meetings.map(m => m.id === meetingId ? { 
          ...m, status: "Ended", endTime: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
          hitlStatus: "PendingApproval", aiSummary: m.aiSummary === "Meeting in progress..." ? "Draft summary generated by AI. Awaiting approval." : m.aiSummary
        } : m),
        pods: state.pods.map(p => p.currentMeetingId === meetingId ? { ...p, currentMeetingId: null } : p)
      });
    },
    checkInGuest(meetingId, guestData) {
      const newGuest = { ...guestData, id: `g-${Date.now()}`, checkedInAt: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
      this.set({ meetings: state.meetings.map(m => m.id === meetingId ? { ...m, guests: [...m.guests, newGuest] } : m) });
    },

    // --- DUAL BROADCASTS ---
    sendInternalBroadcast(message) {
      const tid = state.activeTenantId;
      const bc = { id: `bc-int-${Date.now()}`, tenantId: tid, message, timestamp: new Date().toLocaleTimeString(), active: true };
      this.set({ broadcasts: { ...state.broadcasts, internal: [...state.broadcasts.internal.map(b => b.tenantId === tid ? { ...b, active: false } : b), bc] } });
    },
    sendPublicBroadcast(message) {
      const tid = state.activeTenantId;
      const bc = { id: `bc-pub-${Date.now()}`, tenantId: tid, message, timestamp: new Date().toLocaleTimeString(), active: true };
      this.set({ broadcasts: { ...state.broadcasts, public: [...state.broadcasts.public.map(b => b.tenantId === tid ? { ...b, active: false } : b), bc] } });
    },
    clearBroadcasts(type = 'all') {
      const tid = state.activeTenantId;
      const update = (arr) => arr.map(b => b.tenantId === tid ? { ...b, active: false } : b);
      this.set({ 
        broadcasts: { 
          internal: type === 'all' || type === 'internal' ? update(state.broadcasts.internal) : state.broadcasts.internal,
          public: type === 'all' || type === 'public' ? update(state.broadcasts.public) : state.broadcasts.public
        } 
      });
    },

    // --- CROWD ANALYTICS SIMULATION ---
    simulateCrowdShift() {
      const delta = Math.floor(Math.random() * 40) - 15; // -15 to +25
      const newOcc = Math.max(0, Math.min(state.tenants[0].venueCapacity, state.crowdMetrics.currentOccupancy + delta));
      
      // Shift pod densities randomly
      const updatedPods = state.pods.map(p => {
        const headcountDelta = Math.floor(Math.random() * 10) - 3;
        const newHeadcount = Math.max(0, p.currentHeadcount + headcountDelta);
        const density = newHeadcount > 100 ? "High" : newHeadcount > 50 ? "Medium" : "Low";
        return { ...p, currentHeadcount: newHeadcount, densityLevel: density };
      });

      this.set({
        crowdMetrics: { ...state.crowdMetrics, currentOccupancy: newOcc },
        pods: updatedPods
      });
    },

    // --- GUEST PORTAL ---
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

    // --- SPONSORS ---
    addSponsor(sponsorData) {
      this.set({ sponsors: [...state.sponsors, { ...sponsorData, id: `sp-${Date.now()}` }] });
    },
    removeSponsor(sponsorId) {
      this.set({ sponsors: state.sponsors.filter(s => s.id !== sponsorId) });
    },

    // --- RESET ---
    reset() {
      state = clone(window.ZXSeed);
      persist();
      try { channel?.postMessage({ type:"state", state }); } catch (_) {}
      notify("reset");
    }
  };
})();

window.ZXStore = ZXStore;