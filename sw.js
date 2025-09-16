// Simple offline-first service worker for Kalkulator BGC
// Cache core assets and serve same-origin requests from cache first.

const VERSION = 'v2';
const CACHE_STATIC = `bgc-static-${VERSION}`;
const CACHE_RUNTIME = `bgc-runtime-${VERSION}`;
const CACHE_FONTS = `bgc-fonts-${VERSION}`;

// Adjust the list if files change names
const CORE_ASSETS = [
  './',
  './index.html',
  './style.css',
  './main.js',
  './tabel.js',
  './manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_STATIC).then((cache) => cache.addAll(CORE_ASSETS)).catch(() => null)
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((k) => ![CACHE_STATIC, CACHE_RUNTIME, CACHE_FONTS].includes(k)).map((k) => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

function isSameOrigin(url) {
  try { return new URL(url).origin === self.location.origin; } catch { return false; }
}

function isHTMLRequest(req) {
  const accept = req.headers.get('accept') || '';
  return accept.includes('text/html');
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Cache Google Fonts with stale-while-revalidate
  if (url.origin.includes('fonts.googleapis.com') || url.origin.includes('fonts.gstatic.com') || url.origin.includes('cdnjs.cloudflare.com')) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_FONTS);
      const cached = await cache.match(req);
      const network = fetch(req).then((res) => { cache.put(req, res.clone()); return res; }).catch(() => null);
      return cached || network || new Response('', { status: 504 });
    })());
    return;
  }

  // Same-origin handling
  if (isSameOrigin(req.url)) {
    // HTML: network-first, fallback to cache and then offline page (index)
    if (isHTMLRequest(req)) {
      event.respondWith((async () => {
        try {
          const res = await fetch(req);
          const cache = await caches.open(CACHE_RUNTIME);
          cache.put(req, res.clone());
          return res;
        } catch (_) {
          const cache = await caches.open(CACHE_RUNTIME);
          const cached = await cache.match(req);
          if (cached) return cached;
          // fallback to cached index.html
          const fallback = await caches.match('./index.html');
          return fallback || new Response('<h1>Offline</h1>', { headers: { 'Content-Type': 'text/html' } });
        }
      })());
      return;
    }

    // Static assets: cache-first, then network
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_STATIC);
      const cached = await cache.match(req);
      if (cached) return cached;
      try {
        const res = await fetch(req);
        // put in runtime cache to avoid polluting static cache with query versions
        const runCache = await caches.open(CACHE_RUNTIME);
        runCache.put(req, res.clone());
        return res;
      } catch (_) {
        // final fallback for non-HTML: nothing
        return new Response('', { status: 504 });
      }
    })());
    return;
  }
});
