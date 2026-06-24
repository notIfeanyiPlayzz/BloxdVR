const CACHE_NAME = 'bloxdvr-offline-v1';
const ASSETS_TO_CACHE = [
  '404.html',
  'index.html',
  'favicon.ico',
  'https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;600&display=swap'
];

// Install Event: Prefetch and cache core files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate Event: Sweep away deprecated cache architectures
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event: Intercept connections and serve fallbacks
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Handle server-side 404 missing resource errors
        if (response.status === 404) {
          return caches.match('404.html');
        }
        return response;
      })
      .catch(() => {
        // Handle physical offline connection dropouts
        return caches.match('404.html');
      })
  );
});
