import plans from './act-arrivals.json';
import {mapPoints, type MapRoom} from './map-routes';
import {tavernAudio as audio} from './audio';
import './act-arrival.css';

/** Shared chapter entrance: discovery, arrival pin, then dissolve into the prepared room. */
export function introduceAct(act:1|2, reduced=matchMedia('(prefers-reduced-motion: reduce)').matches):Promise<void>{
 const plan=plans[String(act) as '1'|'2'];
 const dialog=document.createElement('dialog');dialog.id='act-arrival';dialog.className='act-arrival';
 dialog.innerHTML=`<header><h1></h1><div><button id="arrival-sound"></button><button id="arrival-skip">Skip introduction</button></div></header><div class="arrival-map"><img alt="Map of Brindle Quay and Bellweather Shoal"><div class="arrival-markers"></div></div><section aria-live="polite"><h2></h2><p></p></section><footer><span id="arrival-count"></span><button id="arrival-next">Next venue →</button></footer>`;
 dialog.querySelector('h1')!.textContent=plan.title;
 dialog.querySelector('img')!.src=`${import.meta.env.BASE_URL}assets/story-map-walkways.png`;
 const markerHost=dialog.querySelector<HTMLElement>('.arrival-markers')!;
 const markers=new Map<string,HTMLElement>();
 for(const room of [...plan.known,...plan.venues.flatMap(v=>v.room?[v.room]:[])]){
  const [x,y]=mapPoints[room as MapRoom];const marker=document.createElement('span');marker.className='arrival-marker';marker.dataset.room=room;
  marker.style.left=`${x/1536*100}%`;marker.style.top=`${y/1024*100}%`;marker.textContent='✦';marker.title=plan.venues.find(v=>v.room===room)?.name||room;
  marker.classList.toggle('revealed',plan.known.includes(room as never));markers.set(room,marker);markerHost.append(marker);
 }
 document.body.append(dialog);dialog.showModal();if(reduced)dialog.classList.add('reduced');
 const sound=dialog.querySelector<HTMLButtonElement>('#arrival-sound')!;
 const next=dialog.querySelector<HTMLButtonElement>('#arrival-next')!;
 let index=0,epoch=0,elapsed=0,previous=0,raf=0,voiceDone=true,finishing=false;
 const line=()=>index<plan.venues.length?plan.venues[index]:plan.closing;
 const soundLabel=()=>{sound.textContent=audio.enabled?'Sound on':'Enable narration';sound.setAttribute('aria-pressed',String(audio.enabled));};
 const narrate=()=>{const token=++epoch;voiceDone=!audio.enabled;void audio.sequence([line()]).then(()=>{if(token===epoch)voiceDone=true;});};
 const show=()=>{
  elapsed=0;dialog.dataset.step=String(index);const venue=plan.venues[index];
  dialog.querySelector('h2')!.textContent=venue?.name||'Nell arrives';dialog.querySelector('section p')!.textContent=line().text;
  dialog.querySelector('#arrival-count')!.textContent=venue?`${index+1} / ${plan.venues.length}`:'You are here';
  for(const m of markers.values())m.classList.remove('highlight');
  if(venue?.room)markers.get(venue.room)?.classList.add('revealed','highlight');
  if(!venue){dialog.dataset.phase='arrival';const m=markers.get(plan.arrival)!;m.classList.add('current','highlight');m.textContent='●';m.setAttribute('aria-label','Nell is here');next.textContent='Begin playing →';}
  narrate();
 };
 return new Promise(resolve=>{
  const finish=async()=>{
   if(finishing)return;finishing=true;epoch++;audio.stopSpeech();cancelAnimationFrame(raf);document.removeEventListener('visibilitychange',visibility);
   dialog.dataset.phase='arrival';for(const m of markers.values())m.classList.add('revealed');markers.get(plan.arrival)!.classList.add('current');markers.get(plan.arrival)!.textContent='●';markers.get(plan.arrival)!.setAttribute('aria-label','Nell is here');
   dialog.querySelector('h2')!.textContent='Nell arrives';dialog.querySelector('section p')!.textContent=plan.closing.text;
   dialog.querySelectorAll('button').forEach(b=>b.disabled=true);
   if(!reduced){
    await new Promise(r=>setTimeout(r,500));
    const preview=document.createElement('img');preview.className='arrival-room-preview';preview.alt=act===1?'The Crooked Compass':'Repair Quay';preview.src=`${import.meta.env.BASE_URL}assets/${act===1?'tavern.png':'act2/repair-quay.png'}`;dialog.append(preview);
    await preview.animate([{opacity:0},{opacity:1}],{duration:900,fill:'forwards'}).finished;
   }
   dialog.close();dialog.remove();resolve();
  };
  const advance=()=>{if(finishing)return;if(index===plan.venues.length)void finish();else{index++;show();}};
  const visibility=()=>{previous=0;if(document.hidden){epoch++;audio.stopSpeech();}else if(!finishing){elapsed=0;narrate();}};
  const frame=(now:number)=>{if(finishing)return;const dt=previous?Math.min(now-previous,100):0;previous=now;if(!document.hidden){elapsed+=dt;const duration=Math.max(4500,line().text.split(/\s+/).length*330);if(elapsed>=duration&&voiceDone)advance();}if(!finishing)raf=requestAnimationFrame(frame);};
  sound.onclick=()=>{audio.setEnabled(!audio.enabled);soundLabel();elapsed=0;narrate();};next.onclick=advance;
  dialog.querySelector<HTMLButtonElement>('#arrival-skip')!.onclick=()=>void finish();dialog.addEventListener('cancel',e=>{e.preventDefault();void finish();});
  document.addEventListener('visibilitychange',visibility);soundLabel();show();raf=requestAnimationFrame(frame);next.focus();
 });
}
