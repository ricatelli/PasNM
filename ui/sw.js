const CACHE = "pasnm-ui-0.1.0";

const FILES = [
  "./index.html",
  "./app.js",
  "./ws.js",
  "./state.js",
  "./ui.css",
  "./manifest.json"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(FILES))
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
