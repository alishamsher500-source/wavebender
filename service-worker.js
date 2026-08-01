const CACHE_NAME = 'wavebender-v2';
const ASSETS = [
  './voice-changer.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Only attempt to cache same-origin GET requests. Cross-origin requests (Google
  // Fonts, etc.) and non-GET methods can throw when passed to cache.put(), so we
  // let the network handle those normally instead of intercepting them.
  const isGet = req.method === 'GET';
  const isSameOrigin = new URL(req.url).origin === self.location.origin;

  if(!isGet || !isSameOrigin){
    return; // don't call respondWith — browser falls through to a normal network fetch
  }

  // The HTML page itself is served network-first: while you're actively editing and
  // re-uploading it, this guarantees the phone always gets the newest version when
  // online, and only falls back to the cached copy if there's no connection at all.
  // (A pure cache-first strategy here is what causes a PWA to feel "stuck" on an old
  // build — the phone would keep showing whatever was cached the very first time.)
  const isHtmlPage = req.mode === 'navigate' || req.url.endsWith('voice-changer.html');

  if(isHtmlPage){
    event.respondWith(
      fetch(req).then((response) => {
        if(response && response.ok){
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy)).catch(() => {});
        }
        return response;
      }).catch(() => caches.match(req))
    );
    return;
  }

  // Everything else (icons, manifest) rarely changes, so cache-first is fine and faster.
  event.respondWith(
    caches.match(req).then((cached) => {
      return cached || fetch(req).then((response) => {
        if(response && response.ok){
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy)).catch(() => {});
        }
        return response;
      }).catch(() => cached);
    })
  );
});
