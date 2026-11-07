import {tavernAudio as audio} from './audio';
import script from './act5-dialogue.json';
import './act5-ending.css';

// Deliberately fictional non-credits, not claims of participation or endorsement.
export const nonCredits = [
 ['Steven Spielberg','not directing a single seagull'],
 ['George Lucas','not supervising intergalactic harbour traffic'],
 ['Hans Zimmer','not composing the overture for three squeaky valves'],
 ['John Williams','not scoring the heroic inspection of a receipt'],
 ['Roger Deakins','not lighting the bypass gallery'],
 ['Thelma Schoonmaker','not editing seventeen minutes of tide tables'],
 ['Hayao Miyazaki','not animating the pocket lint'],
 ['Hideo Kojima','not adding a forty-minute explanation of the pump'],
 ['Björk','not designing the emergency signal costumes'],
 ['Gordon Ramsay','not catering the voyage with one jar and some bread'],
 ['David Attenborough','not narrating the mating habits of paperwork'],
 ['Dolly Parton','not building the public-relations department'],
];
const lines=script.blocks['A5-END'];
const scenes=[
 {title:'One last negotiation.',art:'chart',alt:'Nell’s published working chart and the harbour’s next chapter.',lines:lines.slice(0,3),text:''},
 {title:'Still Deciding.',art:'ending',alt:'Nell and her survey boat at the beginning of a new voyage.',lines:lines.slice(3),text:''},
 {title:'An honestly blank coast.',art:'ending',alt:'The open water beyond Brindle Quay.',lines:[],text:'Fine Print steps onto the quay. Nell sails the marked route toward an honestly blank coast. A good chart leaves room for the next person.'},
];

/** Presentation only: completion is saved by the chapter before this opens. */
export function playEnding(reduced:boolean,onDone:()=>void){
 const dialog=document.createElement('dialog');dialog.id='act5-ending';dialog.setAttribute('aria-label','The Right of Way — ending and credits');dialog.classList.toggle('reduced',reduced);
 dialog.innerHTML=`<div class="ending-stage"></div><footer class="ending-controls"><span class="ending-count" role="status"></span><div><button data-action="sound">Sound</button><button data-action="pause">Pause</button><button data-action="next">Next scene →</button><button data-action="skip">Skip ending</button></div></footer>`;
 document.body.append(dialog);
 const stage=dialog.querySelector<HTMLElement>('.ending-stage')!,count=dialog.querySelector<HTMLElement>('.ending-count')!;
 const button=(action:string)=>dialog.querySelector<HTMLButtonElement>(`[data-action="${action}"]`)!;
 let phase=0,elapsed=0,previous=0,raf=0,paused=false,closed=false,voiceDone=true,generation=0;
 let animations:Animation[]=[];
 const durations=scenes.map(s=>Math.max(10000,(s.text||s.lines.map(l=>l.text).join(' ')).split(/\s+/).length*400+1800));
 function soundLabel(){button('sound').textContent=audio.enabled?'Sound on':'Sound off';button('sound').setAttribute('aria-pressed',String(audio.enabled));}
 function narrate(){const token=++generation;audio.stopSpeech();voiceDone=true;if(phase>=scenes.length||paused||document.hidden)return;voiceDone=false;void audio.sequence(scenes[phase].lines).finally(()=>{if(token===generation)voiceDone=true;});}
 function dispose(){if(closed)return;closed=true;cancelAnimationFrame(raf);generation++;animations.forEach(a=>a.cancel());audio.stopSpeech();document.removeEventListener('visibilitychange',visibility);dialog.close();dialog.remove();onDone();}
 function animate(el:HTMLElement,keyframes:Keyframe[],duration:number){if(reduced)return;animations.push(el.animate(keyframes,{duration,fill:'both',easing:'linear'}));}
 function render(){
  generation++;audio.stopSpeech();animations.forEach(a=>a.cancel());animations=[];elapsed=0;previous=0;stage.replaceChildren();dialog.dataset.phase=phase<3?'scene':phase===3?'credits':'director';
  button('next').textContent=phase<2?'Next scene →':phase===2?'Roll credits →':phase===3?'Director card →':'Return to epilogue';
  button('skip').textContent=phase<3?'Skip to credits':phase===3?'Skip to director card':'Close ending';
  if(phase<3){
   const scene=scenes[phase],image=document.createElement('img');image.className='ending-art';image.src=`${import.meta.env.BASE_URL}assets/act5/${scene.art}.png`;image.alt=scene.alt;stage.append(image);
   const shade=document.createElement('div');shade.className='ending-shade';stage.append(shade);
   const caption=document.createElement('section');caption.className='ending-caption';const h=document.createElement('h2');h.textContent=scene.title;caption.append(h);
   for(const line of scene.lines){const p=document.createElement('p');const b=document.createElement('strong');b.textContent=`${line.who}: `;p.append(b,document.createTextNode(line.text));caption.append(p);}
   if(scene.text){const p=document.createElement('p');p.textContent=scene.text;caption.append(p);}stage.append(caption);
   animate(image,[{transform:phase===1?'scale(1.12) translateX(-2%)':'scale(1.02)'},{transform:phase===1?'scale(1.02) translateX(0)':'scale(1.13) translateX(1%)'}],durations[phase]);
   animate(caption,[{opacity:0},{opacity:1}],1000);count.textContent=`Final voyage · ${phase+1} / 3`;narrate();
  }else if(phase===3){
   const space=document.createElement('div');space.className='ending-space';
   const viewport=document.createElement('div');viewport.className='ending-perspective';viewport.tabIndex=0;viewport.setAttribute('aria-label','Credits — scroll to read in reduced motion');
   const crawl=document.createElement('article');crawl.className='ending-crawl';
   const title=document.createElement('h2');title.textContent='MONKEY BUISNESS';crawl.append(title);
   const subtitle=document.createElement('p');subtitle.textContent='The Right of Way';crawl.append(subtitle);
   const disclaimer=document.createElement('p');disclaimer.textContent='With entirely imaginary thanks to these entirely uninvolved people. No participation or endorsement implied.';crawl.append(disclaimer);
   for(const [name,job] of nonCredits){const row=document.createElement('section'),h=document.createElement('h3'),p=document.createElement('p');h.textContent=`${name} *`;p.textContent=`Thank you for ${job}.`;row.append(h,p);crawl.append(row);}
   const end=document.createElement('p');end.textContent='And to you, for doing the work of getting Nell to the horizon. Thank you for playing.';crawl.append(end);viewport.append(crawl);space.append(viewport);stage.append(space);
   animate(crawl,[{transform:'translateY(70vh)'},{transform:'translateY(-100%)'}],85000);
   count.textContent=reduced?'Credits · scroll to read, then continue':'Credits · the people who did not make this game';
  }else{
   const card=document.createElement('section');card.className='ending-director';
   const h=document.createElement('h2');h.textContent='Directed by Janis Keuper';const note=document.createElement('p');note.className='ending-attribution';note.textContent='* actual work done by GPT-6 Astra';card.append(h,note);stage.append(card);
   animate(h,[{opacity:0},{opacity:1}],1800);
   // Hold the director credit alone before revealing the punchline.
   if(!reduced)animations.push(note.animate([{opacity:0},{opacity:1}],{duration:2200,delay:3500,fill:'both'}));
   count.textContent='The End';
  }
  sync();
 }
 function sync(){for(const a of animations){if(paused||document.hidden)a.pause();else a.play();}}
 function advance(){if(phase===4){dispose();return;}phase++;render();}
 function visibility(){previous=0;if(document.hidden){generation++;audio.stopSpeech();}else narrate();sync();}
 function frame(now:number){if(closed)return;const dt=previous?Math.min(now-previous,100):0;previous=now;if(!paused&&!document.hidden){elapsed+=dt;if(phase<3&&elapsed>=durations[phase]&&(voiceDone||elapsed>30000))advance();else if(phase===3&&!reduced&&elapsed>=85000)advance();}raf=requestAnimationFrame(frame);}
 button('next').onclick=advance;
 button('skip').onclick=()=>{if(phase===4)dispose();else{phase=phase<3?3:4;render();}};
 button('pause').onclick=()=>{paused=!paused;button('pause').textContent=paused?'Resume':'Pause';button('pause').setAttribute('aria-pressed',String(paused));if(paused){generation++;audio.stopSpeech();}else narrate();sync();};
 button('sound').onclick=()=>{audio.setEnabled(!audio.enabled);soundLabel();narrate();};
 dialog.addEventListener('cancel',e=>{e.preventDefault();dispose();});
 document.addEventListener('visibilitychange',visibility);audio.setAmbience('bridge-ambience');dialog.showModal();render();soundLabel();button('next').focus();raf=requestAnimationFrame(frame);
}