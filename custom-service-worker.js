importScripts("/precache-manifest.0696074e0f8d154c3f3a65f7b16a74ab.js");

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

const bgSyncPlugin = new workbox.backgroundSync.Plugin('todoQueue', {
  maxRetentionTime: 24 * 60
});

workbox.routing.registerNavigationRoute('/index.html');

workbox.routing.registerRoute(
  /\.(?:js|css|html|json)$/,
  workbox.strategies.networkFirst()
)

workbox.routing.registerRoute(
  'http://localhost:3000/',
  workbox.strategies.networkFirst()
)

workbox.routing.registerRoute(
  'https://demobase.github.io/',
  workbox.strategies.networkFirst()
)


workbox.routing.registerRoute(
  new RegExp('^https://jsonserver.github.io/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'json-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      })
    ]
  })
);
