const C='planner-v1';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','manifest.webmanifest'])).catch(()=>{}));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.hostname.endsWith('supabase.co'))return;
e.respondWith(caches.open(C).then(async c=>{const m=await c.match(e.request);const f=fetch(e.request).then(r=>{if(r.ok||r.type==='opaque')c.put(e.request,r.clone());return r}).catch(()=>m);return m||f}))});
