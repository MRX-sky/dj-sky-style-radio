/* Minimal PWA worker. Network is always preferred so a live radio site stays current. */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));
