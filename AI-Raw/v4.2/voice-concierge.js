/**
 * ZXSPRD AI - Voice Concierge Engine
 * Manages the 5-state interactive voice assistant lifecycle 
 * and HTML5 Web Speech API (TTS) integration.
 */

const ZXConcierge = (() => {
  // --- Configuration & Mock Data ---
  const QUERY = "Where is the VIP networking lounge located?";
  const RESPONSE = "The VIP Networking Lounge is located on Level 2, directly across from Escalator B in Hall A1.";
  
  const STATES = {
    IDLE: 'IDLE',
    LISTENING: 'LISTENING',
    TRANSCRIBING: 'TRANSCRIBING',
    PROCESSING: 'PROCESSING',
    RESPONDING: 'RESPONDING'
  };

  let activeTimers = [];
  let typeInterval = null;
  let isInitialized = false;

  // --- DOM References ---
  let modal, card, triggerBtn;

  // --- Utility: Typewriter Effect ---
  function typeText(element, text, speed = 40) {
    let i = 0;
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    element.appendChild(cursor);

    typeInterval = setInterval(() => {
      if (i < text.length) {
        element.insertBefore(document.createTextNode(text.charAt(i)), cursor);
        i++;
      } else {
        clearInterval(typeInterval);
        typeInterval = null;
        setTimeout(() => cursor.remove(), 500);
      }
    }, speed);
    
    activeTimers.push(typeInterval);
  }

  // --- Utility: Web Speech API (TTS) with Chrome Resume Hack ---
  function speakText(text) {
    if (!('speechSynthesis' in window)) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.lang = 'en-US';

    // Chrome bug workaround: Speech synthesis pauses after ~15 seconds.
    // This interval forces it to resume.
    const resumeInterval = setInterval(() => {
      if (!window.speechSynthesis.speaking) {
        clearInterval(resumeInterval);
      } else {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    }, 10000);

    utterance.onend = () => clearInterval(resumeInterval);
    utterance.onerror = () => clearInterval(resumeInterval);

    window.speechSynthesis.speak(utterance);
  }

  // --- State Renderers ---
  function renderListening() {
    card.className = 'concierge-card state-listening';
    card.innerHTML = `
      <div class="state-icon"><svg class="icon" style="width:36px;height:36px"><use href="#i-mic"/></svg></div>
      <div class="state-title">Listening...</div>
      <div class="state-subtitle">Speak naturally into the pod boundary microphone.</div>
    `;
  }

  function renderTranscribing() {
    card.className = 'concierge-card state-transcribing';
    card.innerHTML = `
      <div class="state-icon"><svg class="icon" style="width:36px;height:36px"><use href="#i-message"/></svg></div>
      <div class="state-title">Transcribing...</div>
      <div class="transcript-bubble" id="typeTarget"></div>
    `;
    typeText(document.getElementById('typeTarget'), QUERY);
  }

  function renderProcessing() {
    card.className = 'concierge-card state-processing';
    card.innerHTML = `
      <div class="state-icon"><div class="loader"></div></div>
      <div class="state-title">Searching Vector Index...</div>
      <div class="state-subtitle">Querying OCI Sovereign Knowledge Base for spatial data...</div>
    `;
  }

  function renderResponding() {
    card.className = 'concierge-card state-responding';
    card.innerHTML = `
      <div class="state-icon"><svg class="icon" style="width:36px;height:36px"><use href="#i-volume"/></svg></div>
      <div class="state-title">AI Concierge Response</div>
      <div class="transcript-bubble">"${RESPONSE}"</div>
      <button class="close-modal-btn" id="btnCloseConcierge">Close & Return</button>
    `;

    // Trigger TTS
    speakText(RESPONSE);

    // Log to Global Store
    if (window.ZXStore) {
      const newLog = {
        id: `log-${Date.now()}`,
        tenantId: window.ZXStore.state.activeTenantId,
        podId: window.ZXStore.state.activePodId,
        queryText: QUERY,
        responseText: RESPONSE,
        language: 'en',
        latencyMs: 420,
        timestamp: new Date().toLocaleTimeString()
      };
      window.ZXStore.set({ 
        voiceQueries: [newLog, ...window.ZXStore.state.voiceQueries] 
      });
    }

    // Bind close button
    const closeBtn = document.getElementById('btnCloseConcierge');
    if (closeBtn) closeBtn.addEventListener('click', close);
  }

  // --- Core Lifecycle ---
  function clearTimers() {
    activeTimers.forEach(t => clearTimeout(t));
    if (typeInterval) clearInterval(typeInterval);
    activeTimers = [];
    typeInterval = null;
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  function startInteraction() {
    if (!isInitialized) return;
    
    clearTimers();
    modal.classList.add('active');

    // State 1: LISTENING (0s - 3s)
    renderListening();

    // State 2: TRANSCRIBING (3s - 6.5s)
    activeTimers.push(setTimeout(renderTranscribing, 3000));

    // State 3: PROCESSING (6.5s - 9s)
    activeTimers.push(setTimeout(renderProcessing, 6500));

    // State 4: RESPONDING (9s+)
    activeTimers.push(setTimeout(renderResponding, 9000));
  }

  function close() {
    clearTimers();
    if (modal) modal.classList.remove('active');
  }

  // --- Public API ---
  return {
    init: () => {
      if (isInitialized) return;
      
      modal = document.getElementById('conciergeModal');
      card = document.getElementById('conciergeCard');
      triggerBtn = document.getElementById('btnConcierge');

      if (triggerBtn) {
        triggerBtn.addEventListener('click', startInteraction);
      }

      // Close on backdrop click
      if (modal) {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) close();
        });
      }

      // Cleanup on page unload
      window.addEventListener('beforeunload', clearTimers);

      isInitialized = true;
      console.log('[ZXConcierge] Initialized successfully.');
    },
    start: startInteraction,
    close: close
  };
})();

// Expose globally
window.ZXConcierge = ZXConcierge;