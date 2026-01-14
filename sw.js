const CACHE = "pasnm-ui-v1";
const BASE = "/PasNM";

const FILES = [
  `${BASE}/`,
  `${BASE}/index.html`,
  `${BASE}/manifest.json`,
  `${BASE}/css/app.css`,
  `${BASE}/js/app.js`,
  `${BASE}/js/ws.js`,
  `${BASE}/js/state.js`,
  `${BASE}/js/ui.js`,
  `${BASE}/js/actions.js`
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(FILES))
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE)
            .map(k => caches.delete(k))
      )
    )
  );
});

self.addEventListener("fetch", e => {

  // No interceptar WebSocket
  if (e.request.url.startsWith("ws")) return;

  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
