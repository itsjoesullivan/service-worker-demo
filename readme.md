# Service Worker Demo

This repo is demonstrates [service workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) in the most basic way that I could imagine. It uses service workers to cache a page that does nothing but display its own version.

## Deployment

I've included a `firebase.json` file here, which you could easily use to deploy this repo live and experiment with it:

1. Ensure that you have `npm install firebase-tools`
2. Clone this repo and navigate to it
3. `firebase deploy`
4. It should ask you to authenticate (maybe you'll need to sign up), and you will need to create an app to which to deploy it to. But shortly you will have a live page to see your 

If you're wondering why there's a server component to this demo, investigate the `firebase.json` file. All it does is ensure that neither the index page or the service worker are cached by the browser. Because a service worker is willing to fill its cache with a browser cache, it's important to keep those caches clear.

## First load lifecycle

1. Browser loads `/` with a request to the server
2. Browser downloads service-worker.js and registers it (at `index.html`'s request) as a service worker
3. `service-worker.js` receives an `install` event.
4. The install event handler opens a new cache with a key that is the value of `currentCacheKey`
5. `/` is added to the cache.
6. The browser downloads `/` _again_. This time the response is stored in the new cache.

## Second load lifecycle

1. When the browser requests `/`, the service worker supplies the response.
2. The browser downloads `service-worker.js` in the usual way. __The browser is willing to retrieve `service-worker.js` from the browser cache__.
3. There is no step 3

## Upgrade lifecycle

Say you upgrade the app to a new version. In the case of this repo that would entail changing the version number in two places: in `index.html` and in the `currentCacheKey` variable of `service-worker.js`. The following will happen:

1. When the browser requests `/`, the service worker supplies the response.
2. The browser downloads `service-worker.js` in the usual way. Because (in this demo) it is not cached by the browser, the new version of service-worker.js is downloaded and installed. This includes opening a new cache, as above, with a new key, and downloading the new version of `/`.
3. The new service worker is "waiting to activate", meaning that it's waiting for there to be no current tabs open at this page. __Simply refreshing the page is not sufficient to activate a new service worker.__ You need to close the tab and open a new one.
4. At the moment that all tabs running the previous version of the page are closed, the service worker is activated.
5. The service worker receives an "activate" event. The activate event handler clears out the old caches.
6. Visiting the page again follows the "Second load lifecycle" (above) exactly.
