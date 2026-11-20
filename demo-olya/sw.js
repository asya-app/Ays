const C = 'demoolya-7a41f643';
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(C).then(c => c.addAll(['./', 'manifest.webmanifest', 'icon.svg']))); });
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => { if (e.request.method !== 'GET') return; const u = new URL(e.request.url); if (u.origin !== location.origin) return;
  e.respondWith(fetch(e.request, {cache: 'no-cache'}).then(r => { const cp = r.clone(); caches.open(C).then(c => c.put(e.request, cp)); return r; })
    .catch(() => caches.match(e.request, {ignoreSearch: true}).then(r => r || caches.match('./')))); });
self.addEventListener('push', e => { let d = {}; try { d = e.data.json(); } catch { d = {body: e.data ? e.data.text() : ''}; }
  e.waitUntil(self.registration.showNotification(d.title || '', {body: d.body || '', icon: 'icon-180.png', badge: 'icon-180.png', tag: d.tag || 'pf', data: {url: d.url || './'}})); });
self.addEventListener('notificationclick', e => { e.notification.close(); e.waitUntil(clients.matchAll({type: 'window'}).then(ws => ws.length ? ws[0].focus() : clients.openWindow(e.notification.data.url))); });
