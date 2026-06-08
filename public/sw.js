/*
 * Self-destroying service worker.
 *
 * An earlier build of this site shipped a PWA (vite-plugin-pwa) which registered
 * a service worker at /sw.js. The PWA has since been removed, but service workers
 * already registered in visitors' browsers stay put and keep serving a stale,
 * cached copy of the app — which surfaces as "loading an old cache" / Internal
 * Server Error after a deploy, with no automatic way out.
 *
 * Browsers re-fetch the service worker script itself from the network on
 * navigation, so serving THIS file at /sw.js lets it take over from the stale
 * worker, delete every cache, unregister itself, and reload open tabs onto the
 * current build. Once it has reached returning visitors, this file can be removed.
 */
self.addEventListener('install', () => {
  // Activate immediately instead of waiting for old tabs to close.
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // 1. Delete every Cache Storage entry the old worker created.
      try {
        const keys = await caches.keys();
        await Promise.all(keys.map((key) => caches.delete(key)));
      } catch (e) { /* ignore */ }

      // 2. Unregister this worker so no service worker controls the site anymore.
      try {
        await self.registration.unregister();
      } catch (e) { /* ignore */ }

      // 3. Reload any open tabs so they fetch the fresh app from the network.
      try {
        const clients = await self.clients.matchAll({ type: 'window' });
        for (const client of clients) {
          client.navigate(client.url);
        }
      } catch (e) { /* ignore */ }
    })()
  );
});
