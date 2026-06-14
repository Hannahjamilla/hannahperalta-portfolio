const CACHE_NAME = 'hannah-portfolio-v3-bypass'

self.addEventListener('install', (event) => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      // Delete ALL caches immediately to fix the corrupted state
      return Promise.all(
        cacheNames.map((cacheName) => caches.delete(cacheName))
      )
    }).then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  // Pass all traffic directly to network without caching to fix Vite hot-reloading
  event.respondWith(fetch(event.request).catch(() => new Response('Network error occurred.', { status: 408 })))
})

// end of file