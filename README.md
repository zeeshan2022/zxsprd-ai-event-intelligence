# ZXSPRD AI — Event Intelligence Platform (Interactive Front-End Demo)

An **offline-capable, multi-tenant PWA demo** of an AI-powered event intelligence platform.
Six synchronized views (Launcher, Super Admin, Client Admin, Edge Kiosk, Public Display, Guest Portal)
share one reactive in-browser state store — no backend, no build step, no dependencies.

Open `index.html` over any static server and every view stays in sync across browser tabs in real time.

---

## 🖥️ The Six Views

| View | File | Purpose |
|---|---|---|
| **Launcher** | `index.html` | Role picker + live platform pulse (tenants / pods / meetings / occupancy), tenant context selector, theme & language chrome |
| **Super Admin** | `super-admin.html` | Platform owner: tenants, POD fleet, API keys, feature flags, global broadcast, telemetry, maintenance mode, **Export State** snapshot |
| **Client Admin** | `client-admin.html` | Event organizer: schedule builder, HITL summary approval, transcripts, broadcasts to internal PODs / all screens, branding |
| **Edge Kiosk** | `edge-kiosk.html` | POD operator: start/stop recording, live transcript stream, send-to-internal-pod, offline resilience |
| **Public Display** | `public-display.html` | Signage TV: auto-rotating slides (Live Now → Agenda countdown → Trends → Sponsors → Crowd), ticker, alert override |
| **Guest Portal** | `guest-portal.html` | Attendee mobile web-app: QR badge check-in, personalised agenda/journey, multilingual AI voice concierge, profile & badge tools |

## ✨ Experience & UI Enhancements

- **Dark / light themes** with smooth cross-fade; toggle from any header or press the **T** shortcut (ignored while typing).
- **Stacked toast notifications** — rapid actions queue up instead of replacing each other; success/error colour coding.
- **Skeleton loaders** (`zxSkeleton`) for perceived performance, scroll-reveal card transitions, click-feedback ripple on buttons.
- **Maintenance-mode & offline banner** (`zxPlatformBanner`) auto-mounts under the topbar on every view and reacts to `online`/`offline` events plus Super Admin settings.
- **PWA install prompt** support: floating "Install App" button when the browser fires `beforeinstallprompt`; installed-badge state otherwise.
- **Accessibility**: skip-to-content link, keyboard-operable launcher cards (Enter/Space), `aria-pressed` states, focus-visible rings, full **RTL** support (Arabic / Urdu), and a global `prefers-reduced-motion` kill-switch for animations.
- **Print stylesheet** for transcripts and reports (Ctrl/Cmd+P).

### Public Display (signage) controls
- Arrow Left / Right (or PageUp/PageDown) change slides, **Space** pauses/resumes rotation, clicking the stage advances.
- **Pause-on-hover** freezes the carousel and progress bar for operators; a transient on-screen hint teaches the shortcuts on load.
- Rotation automatically skips slides disabled by feature flags (sponsors / sentiment / crowd card).

### Guest Portal extras
- **AI Concierge typing indicator** (animated dots) before answers for a natural chat feel.
- **Copy Badge ID** (clipboard API with execCommand fallback) and **Download QR** (serialises the badge SVG to `zx-badge-<ID>.svg`) directly on the check-in screen.
- Deterministic decorative QR per badge seed, scan-line animation, journey tickets, email/WhatsApp self-send.

## ⚡ Performance

- Zero frameworks: one shared script (`data.js`) + one stylesheet; pages render via `innerHTML` updates scheduled with `requestAnimationFrame` coalescing (`scheduleRender` pattern) so bursty state updates paint once per frame.
- Cross-tab sync through a single `BroadcastChannel` (`zxsprd-global-state-v8`) + `localStorage` persistence.
- Service worker (`sw.js`) caches the app shell for full offline operation; state survives reloads.
- CSS-only animations (transform/opacity) keep the signage and kiosk views smooth on low-end devices.

## 🧠 Feature Flags (Super Admin → Feature Control)

All views react instantly when these flip: `voiceConcierge`, `crowdAnalytics`, `sponsorInjection`, `sentimentAnalysis`, `actionItemExtraction`, `qrCheckIn`, `multiLanguageVoice`, `publicDisplay`, `guestPortal`, `edgeKiosk`, `offlineMode`, plus `platformSettings.maintenanceMode` and per-tenant `publicDisplayCrowdCard`.

## 🗂 Project Structure

```
index.html            Launcher (start here)
super-admin.html      Platform owner console
client-admin.html     Organizer console
edge-kiosk.html       POD recording kiosk
public-display.html   Signage / TV display
guest-portal.html     Attendee mobile portal
data.js               Shared reactive store + seed data + UI kit (toasts, theme, i18n, venue map, install prompt…)
styles.css            Design system (tokens, components, RTL, print, reduced-motion)
sw.js                 Service worker (app-shell cache)
manifest.webmanifest  PWA manifest
icon.svg / qr.png     Assets
AI-Raw/               Source briefs & blueprint documents
```

## 🚀 Run It

Any static host works. Locally:

```bash
python3 -m http.server 8080
# open http://localhost:8080/index.html
```

> Serve over `http://` (not `file://`) if you want the service worker and PWA install prompt active. Opening files directly still works — everything except SW registration runs.

**Demo flow suggestion:** Launcher → pick tenant → Edge Kiosk *Start Recording* → watch Live slide on Public Display → Client Admin approves the AI summary → Guest Portal receives it in My Journey → Super Admin toggles a flag or maintenance mode and sees every tab react.

## ♻️ Data & Reset

State persists in `localStorage` key `zxsprd-global-state-v8` and broadcasts between tabs. Use **Reset demo data** (Super Admin) to reseed, or **Export State** to download a JSON snapshot. Bumping the schema version forces a clean migration on next load.

## 🛠 Notes for Developers

- Inline `onclick` handlers call globals defined either in `data.js` (shared kit) or the page's own `<script>` block — both are audited and complete.
- `ZXStore` public API used by pages: `set`, `subscribe`, `t`, `tenant`, `feature`, `meetings`, `schedule`, `sendBroadcast`, `approveSummary`, `publishSummary`, `addGuestProfile`, `logGuestInteraction`, `getActiveTempGuest`, `tempGuestJoin`, `reset`, `exportState`.
- No external requests are made anywhere; all AI behaviour is simulated deterministically for demo purposes.

## 📄 License

See `LICENSE`. Demo content (event names, tenants, sponsors) is fictional.
