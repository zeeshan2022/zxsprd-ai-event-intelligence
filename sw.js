/**
 * Event Intelligence Platform — Service Worker (Offline-First PWA)
 * Strategy:
 *  - Precache all app shell assets on install.
 *  - cache-first for same-origin static files, network-first with cache fallback
 *    for navigations, stale-while-revalidate for everything else.
 */
const CACHE = "zxsprd-ai-v8";
const SHELL = [
  "./",
  "index.html",
  "super-admin.html",
  "client-admin.html",
  "edge-kiosk.html",
  "public-display.html",
  "guest-portal.html",
  "data.js",
  "styles.css",
  "manifest.webmanifest",
  "icon.svg"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Navigations: network-first, fall back to cached page (offline demo mode)
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then(m => m || caches.match("index.html")))
    );
    return;
  }

  // Same-origin static: cache-first
  if (url.origin === location.origin) {
    e.respondWith(
      caches.match(req).then((hit) => hit || fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
        return res;
      }))
    );
    return;
  }

  // Cross-origin (fonts etc.): stale-while-revalidate
  e.respondWith(
    caches.match(req).then((hit) => {
      const net = fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
});
