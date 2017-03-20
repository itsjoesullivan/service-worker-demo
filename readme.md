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

1. Browser loads index.html in the usual fashion
2. Browser downloads service-worker.js and registers it (at `index.html`'s request) as a service worker
3. `service-worker.js` receives an `install` event.
4. The install event handler opens a new cache with a key that is the value of `currentCacheKey`
5. `index.html` is added to the cache
6. The browser downloads `index.html` _again_. This time the response is stored in the new cache.
