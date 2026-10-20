const CACHE='monkey-buisness-chapter-assets-v1';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url);
 if(request.method!=='GET'||url.origin!==self.location.origin||request.headers.has('X-Chapter-Download')||!(/\/(assets|audio)\//.test(url.pathname)))return;
 event.respondWith((async()=>{
  const cached=await (await caches.open(CACHE)).match(request.url);
  if(!cached)return fetch(request);
  const range=request.headers.get('range');
  if(!range)return cached;
  const match=/^bytes=(\d+)-(\d*)$/.exec(range);if(!match)return fetch(request);
  const bytes=await cached.arrayBuffer(),start=Number(match[1]),end=Math.min(match[2]?Number(match[2]):bytes.byteLength-1,bytes.byteLength-1);
  if(start>end)return new Response(null,{status:416,headers:{'Content-Range':`bytes */${bytes.byteLength}`}});
  return new Response(bytes.slice(start,end+1),{status:206,headers:{'Content-Type':cached.headers.get('content-type')||'application/octet-stream','Content-Range':`bytes ${start}-${end}/${bytes.byteLength}`,'Accept-Ranges':'bytes','Content-Length':String(end-start+1)}});
 })());
});
