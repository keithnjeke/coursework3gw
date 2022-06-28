const cacheName = 'after-school-lesson-v1'
const cacheFiles = [
  'index.html',
  'after-school-lessons.webmanifest',
  'styles.css',
  'images/AfterSchool.png',
  'images/background.png',
  'images/basketball.png',
  'images/chess.png',
  'images/cooking.png',
  'images/dancing.png',
  'images/football.png',
  'images/icon192.png',
  'images/icon512.png',
  'images/karate.png',
  'images/painting.png',
  'images/scrabble.png',
  'images/surfing.png',
  'images/swimming.png'
]

// CACHING THE FILES IN THE SERVICE WORKER [cacheFiles] ARRAY
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install')
  e.waitUntil (caches.open(cacheName).then((cache) => {
    console.log('[Service Worker] Caching all files')
    return cache.addAll(cacheFiles)
  }))
})

// CACHING NEW FILES
self.addEventListener('fetch', function (e) {
  e.respondWith(caches.match(e.request).then(function (r) {
    // Download the file if it is not in the cache
    return r || fetch(e.request).then(function (response) {
      // add the new file to cache
      return caches.open(cacheName).then(function (cache) {
        cache.put(e.request, response.clone())
        return response;
      })
    })
  }))
})
