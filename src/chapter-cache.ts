const CACHE='monkey-buisness-chapter-assets-v1';
const base=import.meta.env.BASE_URL;
type Asset={path:string;bytes:number;revision:string};
export async function cacheChapter(progress:(percent:number,detail:string)=>void,act=1){
 if(!('serviceWorker' in navigator)||!('caches' in window))throw Error('Chapter caching requires HTTPS and browser storage support.');
 progress(0,'Preparing the chapter…');
 await navigator.serviceWorker.register(`${base}chapter-cache-worker.js`,{scope:base});
 await navigator.serviceWorker.ready;
 if(!navigator.serviceWorker.controller)await new Promise<void>((resolve,reject)=>{const timer=setTimeout(()=>{navigator.serviceWorker.removeEventListener('controllerchange',changed);reject(Error('The download service could not start. Please retry.'));},15000);function changed(){clearTimeout(timer);resolve();}navigator.serviceWorker.addEventListener('controllerchange',changed,{once:true});if(navigator.serviceWorker.controller){navigator.serviceWorker.removeEventListener('controllerchange',changed);changed();}});
 const response=await fetch(`${base}${act===5?'act5-assets.json':act===4?'act4-assets.json':act===3?'act3-assets.json':act===2?'act2-assets.json':'chapter-assets.json'}`,{cache:'no-store'});if(!response.ok)throw Error('The chapter download list is unavailable.');
 const {assets}=await response.json() as {assets:Asset[]};const total=assets.reduce((n,a)=>n+a.bytes,0);const cache=await caches.open(CACHE);let completed=0,index=0,files=0;let failure:unknown;
 const report=()=>progress(Math.floor(completed/total*100),`${files} / ${assets.length} files · ${(completed/1048576).toFixed(1)} / ${(total/1048576).toFixed(1)} MB`);
 await Promise.all(Array.from({length:4},async()=>{while(index<assets.length&&!failure){const asset=assets[index++];const url=new URL(`${base}${asset.path}`,location.href).href;try{
  const hit=await cache.match(url);
  if(hit?.headers.get('X-Asset-Revision')!==asset.revision){const result=await fetch(url,{cache:'reload',headers:{'X-Chapter-Download':'1'}});if(!result.ok)throw Error(`Could not download ${asset.path}.`);const bytes=await result.arrayBuffer();if(bytes.byteLength!==asset.bytes)throw Error(`Incomplete download: ${asset.path}.`);const digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),b=>b.toString(16).padStart(2,'0')).join('');if(digest!==asset.revision)throw Error(`The chapter was updated during download. Please reload and retry.`);const headers=new Headers(result.headers);headers.set('X-Asset-Revision',asset.revision);headers.delete('Content-Encoding');headers.set('Content-Length',String(bytes.byteLength));await cache.put(url,new Response(bytes,{headers}));}
  completed+=asset.bytes;files++;report();
 }catch(error){failure=error;}}}));
 if(failure)throw failure;
 progress(100,'Chapter ready. Opening the harbour…');
}
