// Selipar Rumble service worker.
// To ship an update: change VERSION here and APP_VERSION in index.html, then upload both.
// Players' browsers notice the changed file, download the new version, and the game switches over by itself.
const VERSION='2.5.3';
const CACHE='selipar-rumble-'+VERSION;
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-maskable-512.png','./apple-touch-icon.png','./lib/peerjs.min.js','./lib/qrcode.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));});
self.addEventListener('message',e=>{if(e.data==='skip')self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const req=e.request;if(req.method!=='GET')return;
  // the game page: always try the network first so a new version shows up, fall back to the saved copy offline
  if(req.mode==='navigate'){
    e.respondWith(fetch(req).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put('./index.html',copy));return res;}).catch(()=>caches.match('./index.html')));
    return;}
  // everything else (icons, pixel fonts): saved copy first, then the network, saving what comes back for offline play
  e.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(res=>{
    if(res&&(res.ok||res.type==='opaque')){const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy));}return res;})));
});
