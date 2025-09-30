// Simple offline-first service worker for Kalkulator BGC
// Cache core assets and serve same-origin requests from cache first.

const VERSION = 'v3';
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
  './manifest.webmanifest',
  './icons/favicon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_STATIC).then((cache) => cache.addAll(CORE_ASSETS)).catch(() => null)
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => ![CACHE_STATIC, CACHE_RUNTIME, CACHE_FONTS].includes(k)).map((k) => caches.delete(k)));
      // Enable navigation preload where supported for faster HTML responses
      if ('navigationPreload' in self.registration) {
        try { await self.registration.navigationPreload.enable(); } catch (_) {}
      }
      await self.clients.claim();
    })()
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
    // HTML: stale-while-revalidate with timeout fallback for resilient loads on poor networks
    if (isHTMLRequest(req)) {
      event.respondWith((async () => {
        const runCache = await caches.open(CACHE_RUNTIME);
        const cached = await runCache.match(req) || await caches.match('./index.html');

        // Kick off network fetch in background to refresh cache
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 2000);
        fetch(req, { signal: controller.signal }).then((res) => {
          clearTimeout(timeout);
          if (res && res.ok) runCache.put(req, res.clone());
          return res;
        }).catch(() => { /* ignore network errors */ });

        // Serve cached immediately (fast), fallback to minimal offline page if nothing
        if (cached) return cached;
        return new Response('<!doctype html><meta charset="utf-8"><title>Offline</title><h1>Offline</h1>', { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
      })());
      return;
    }

    // Static assets: cache-first, then network with small offline fallback
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
        // final fallback for non-HTML: a tiny empty response with 204 to reduce error noise
        return new Response('', { status: 204 });
      }
    })());
    return;
  }
});
