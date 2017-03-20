var currentCacheKey = '1.0.32';


function getOldCacheKeys(keyList) {
  return keyList.filter(function(key) {
    return key !== currentCacheKey;
  });
}

function clearCacheKeys(keyList) {
  return keyList.map(caches.delete.bind(caches));
}

function activateHandler(event) {
  const clearOldCaches = caches.keys()
    .then(getOldCacheKeys)
    .then(clearCacheKeys)
    .then(Promise.all.bind(Promise))
  event.waitUntil(clearOldCaches);
}
self.addEventListener('activate', activateHandler);


function installHandler(event) {
  const addFilesToCache = caches.open(currentCacheKey)
    .then(function(cache) {
      return cache.add('/');
    });
  event.waitUntil(addFilesToCache);
}
self.addEventListener('install', installHandler);


function handleRequest(request) {
  return caches.match(request)
    .then(function(cachedRequest) {
      return cachedRequest || fetch(request);
    });
}

function fetchHandler(event) {
  event.respondWith(handleRequest(event.request));
}
self.addEventListener('fetch', fetchHandler);
