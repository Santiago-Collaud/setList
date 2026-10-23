const CACHE_NAME = "quesigue-v2";

const urlsToCache = [
  "/",
  "/manifest.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key.startsWith("quesigue-") && key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );

  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // La API siempre debe consultar al servidor.
  if (
    url.origin === "https://www.santiagocollaud.com.ar" &&
    url.pathname.startsWith("/api/queSigue/")
  ) {
    event.respondWith(fetch(request, { cache: "no-store" }));
    return;
  }

  // No interceptar recursos externos ni otras API.
  if (url.origin !== self.location.origin) return;

  // Para navegación, intentar primero la red.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(async () => {
        const cached = await caches.match("/");
        if (cached) return cached;
        return Response.error();
      })
    );
    return;
  }

  // Para los recursos locales, usar caché como respaldo.
  event.respondWith(
    caches.match(request).then((cached) => {
      return cached || fetch(request);
    })
  );
});
