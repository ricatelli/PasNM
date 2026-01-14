// sw.js
const CACHE_NAME = "esp8266-domotica-v1";

const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/css/app.css",
  "/js/app.js",
  "/js/ws.js",
  "/js/state.js",
  "/js/ui.js",
  "/js/actions.js",
  "/manifest.json"
];

// Instalación
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Activación
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME)
            .map(k => caches.delete(k))
      )
    )
  );
});

// Intercepción fetch
self.addEventListener("fetch", event => {

  // ⚠️ NO tocar WebSocket
  if (event.request.url.startsWith("ws")) return;

  event.respondWith(
    caches.match(event.request).then(resp => {
      return resp || fetch(event.request);
    })
  );
});
