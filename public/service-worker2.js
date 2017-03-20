var CACHE_NAME = '0.0.5';
var files = [
  '/',
]

// Upon installing a service worker
self.addEventListener('install', function (event) {

  // Cache specified under the cache name specified above
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(files)
    })
  )
})

// When a request occurs within the scope of this service worker
self.addEventListener('fetch', function (event) {
  
  // Attempt to respond (return request)...
  // otherwise actually execute the network request.
  event.respondWith(
    caches.match(event.request).then(function (request) {
      return request || fetch(event.request)
    })
  );
});


// When this service worker is activated
self.addEventListener('activate', function (event) {

  // Look for out-of-date caches and delete them
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key, i) {
        if (key !== CACHE_NAME) {
          return caches.delete(keyList[i])
        }
      }))
    })
  )
})
