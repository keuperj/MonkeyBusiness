import {introduceAct} from './act-arrival';
import { tavernAudio as audio } from './audio';
import lines from './intro-lines.json';
import { AUTO, SAVE, parseSave, fresh, rooms, type ChapterState } from './chapter-state';
import './front.css';
import {installDebugMenu,loadDebugPreset} from './debug-start';
import {cacheChapter} from './chapter-cache';

const $ = <T extends HTMLElement = HTMLElement>(id:string) => document.getElementById(id) as T;
const beats = [
 {title:'A pencil, a coastline, a beginning.',image:'intro-workshop.png',alt:'Nell teaches herself chartmaking in her family’s coastal repair workshop.',line:lines.prologue1},
 {title:'One harbour. A thousand possibilities.',image:'story-map-walkways.png',alt:'The winding streets, bridges and quays of Brindle Quay.',line:lines.prologue2},
 {title:'First things first: supper.',image:'tavern.png',alt:'The warm lantern-lit interior of the Crooked Compass tavern.',line:lines.prologue3},
];
export class Front {
 private dialog=$<HTMLDialogElement>('front');
 private view='splash';
 private index=0;
 private elapsed=0;
 private previous=0;
 private raf=0;
 private token=0;
 private voiceDone=true;
 private paused=false;
 private available=false;
 private cached=false;
 private loading=false;
 private reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 constructor(private enter:(save?:ChapterState)=>void, private leave:()=>void,private prepare:()=>Promise<void>) {
  this.dialog.showModal();this.soundLabel();$('splash-enter').focus();void installDebugMenu();$('act4-game').onclick=()=>location.assign(`${import.meta.env.BASE_URL}act4.html`);$('act3-game').onclick=()=>location.assign(`${import.meta.env.BASE_URL}act3.html`);$('act2-game').onclick=()=>location.assign(`${import.meta.env.BASE_URL}act2.html`);
  $('splash-enter').onclick=()=>this.menu();
  $('start-game').onclick=()=>this.start();
  $('load-game').onclick=()=>this.loads();
  $('front-sound').onclick=()=>{audio.setEnabled(!audio.enabled);this.soundLabel();if(this.view==='intro'&&!this.paused)this.narrate();};
  $('intro-skip').onclick=()=>this.finish();
  $('intro-next').onclick=()=>this.next();
  $('intro-pause').onclick=()=>{this.paused=!this.paused;$('intro').classList.toggle('paused',this.paused);$('intro-pause').textContent=this.paused?'Resume':'Pause';if(this.paused){this.token++;audio.stopSpeech();}else{this.elapsed=0;this.narrate();}};
  this.dialog.addEventListener('cancel',e=>{e.preventDefault();if(this.view==='intro')this.finish();else if(this.view==='splash')this.menu();});
  document.addEventListener('visibilitychange',()=>{if(this.view!=='intro')return;this.previous=0;if(document.hidden){this.token++;audio.stopSpeech();}else if(!this.paused){this.elapsed=0;this.narrate();}});
  document.addEventListener('audio-unavailable',()=>{if(this.view==='intro')$('intro-count').textContent='Audio unavailable · subtitles remain visible';});
 }
 setReducedMotion(value:boolean){this.reduced=value;}
 ready(){const debug=new URLSearchParams(location.search).get('debug');if(debug)void loadDebugPreset(debug,1).then(p=>{if(p){if(p.intro){this.intro();return;}const saved=fresh();saved.room=p.room as ChapterState['room'];Object.assign(saved.flags,p.flags||{});this.launch(parseSave(JSON.stringify(saved)));}}).catch(()=>{$('front-status').textContent='Invalid debug preset. Edit debug-start.json or choose another room.';});this.available=true;this.dialog.querySelectorAll<HTMLButtonElement>('[data-needs-ready]').forEach(b=>b.disabled=false);$('front-status').textContent='';}
 private show(view:string){this.view=view;for(const id of ['splash','start-menu','intro','chapter-loading'])$(id).hidden=id!==view;this.dialog.dataset.view=view;}
 private soundLabel(){$('front-sound').textContent=audio.enabled?'Sound on':'Sound off';$('front-sound').setAttribute('aria-pressed',String(audio.enabled));}
 menu(){
  this.stop();this.leave();document.body.classList.add('at-title');document.querySelector<HTMLElement>('.chapter-shell')!.inert=true;
  if(!this.dialog.open)this.dialog.showModal();this.show('start-menu');audio.setAmbience('bridge-ambience');this.soundLabel();
  try{$('act2-game').hidden=!(localStorage.getItem('monkey-buisness-act2-auto')||JSON.parse(localStorage.getItem(AUTO)||'null')?.flags?.complete);}catch{$('act2-game').hidden=true;}try{$('act3-game').hidden=!(localStorage.getItem('monkey-buisness-act3-auto')||JSON.parse(localStorage.getItem('monkey-buisness-act2-auto')||'null')?.flags?.complete);}catch{$('act3-game').hidden=true;}try{$('act4-game').hidden=!(localStorage.getItem('monkey-buisness-act4-auto')||JSON.parse(localStorage.getItem('monkey-buisness-act3-auto')||'null')?.flags?.complete);}catch{$('act4-game').hidden=true;}$('front-saves').hidden=true;$('menu-actions').hidden=false;$('front-status').textContent=this.available?'':'Unfolding the charts…';$('start-game').focus();
 }
 private action(text:string,run:()=>void){const b=document.createElement('button');b.textContent=text;b.onclick=run;$('front-saves').append(b);return b;}
 private start(){
  if(!this.available)return;
  let existing=false;try{existing=!!localStorage.getItem(AUTO);}catch{}
  if(!existing){this.intro();return;}
  $('menu-actions').hidden=true;$('front-saves').hidden=false;$('front-saves').replaceChildren();
  $('front-status').textContent='Start a new adventure? Your autosave will be replaced when you enter the tavern. Your manual save is kept.';
  this.action('Start new adventure',()=>this.intro()).focus();this.action('Back',()=>this.menu());
 }
 private loads(){
  if(!this.available)return;
  $('menu-actions').hidden=true;$('front-saves').hidden=false;$('front-saves').replaceChildren();
  let count=0,invalid=false;
  for(const [key,label] of [[AUTO,'Continue autosave'],[SAVE,'Load manual save']]){
   try{const raw=localStorage.getItem(key);if(!raw)continue;const save=parseSave(raw);const b=this.action(`${label} · ${rooms[save.room]}${save.flags.complete?' · Act I complete':''}`,()=>{
    try{const current=localStorage.getItem(key);if(!current)throw Error();this.launch(parseSave(current));}catch{$('front-status').textContent='That save is unavailable or invalid. Your other saves have been kept.';}
   });b.dataset.save=key;count++;}catch{invalid=true;}
  }
  $('front-status').textContent=count?(invalid?'One save is invalid; the valid save is available below.':'Choose where to resume. The intro will be skipped.'):(invalid?'No valid save could be read. Start game to begin a new adventure.':'No saved adventure yet. Start game to begin Nell’s story.');
  this.action('Back',()=>this.menu());$('front-saves').querySelector<HTMLButtonElement>('button')?.focus();
 }
 intro(){if(!this.cached){void this.prepareChapter(()=>this.intro());return;}
  if(!this.available)return;this.stop();this.leave();document.body.classList.add('at-title');document.querySelector<HTMLElement>('.chapter-shell')!.inert=true;
  if(!this.dialog.open)this.dialog.showModal();this.show('intro');this.index=0;this.paused=false;$('intro').classList.remove('paused');$('intro-pause').textContent='Pause';audio.setAmbience('bridge-ambience');this.soundLabel();this.beat();$('intro-skip').focus();
  this.previous=0;this.raf=requestAnimationFrame(this.frame);
 }
 private beat(){
  this.elapsed=0;const beat=beats[this.index];const img=$<HTMLImageElement>('intro-image');img.src=`${import.meta.env.BASE_URL}assets/${beat.image}`;img.alt=beat.alt;
  $('intro-heading').textContent=beat.title;$('intro-text').textContent=beat.line.text;$('intro-count').textContent=`${this.index+1} / ${beats.length}`;
  $('intro-next').textContent=this.index===beats.length-1?'Discover Brindle Quay →':'Next scene →';$('intro').dataset.beat=String(this.index);
  img.getAnimations().forEach(a=>a.cancel());if(!this.reduced)img.animate([{transform:'scale(1.02) translateX(-1%)',opacity:.5},{transform:'scale(1.08) translateX(1%)',opacity:1}],{duration:14000,fill:'forwards',easing:'ease-out'});
  this.narrate();
 }
 private narrate(){if(this.paused){audio.stopSpeech();return;}const token=++this.token;this.voiceDone=!audio.enabled;void audio.sequence([beats[this.index].line]).then(()=>{if(token===this.token)this.voiceDone=true;});}
 private frame=(now:number)=>{
  if(this.view!=='intro')return;
  const dt=this.previous?Math.min(now-this.previous,100):0;this.previous=now;
  if(!this.paused&&!document.hidden){this.elapsed+=dt;const minDuration=Math.max(8000,beats[this.index].line.text.split(/\s+/).length*350+1800);$('intro-progress').style.width=`${Math.min(100,this.elapsed/minDuration*100)}%`;if(this.elapsed>=minDuration&&(this.voiceDone||this.elapsed>30000))this.next();}
  $('intro-image').getAnimations().forEach(a=>{if(this.paused||document.hidden)a.pause();else if(a.playState==='paused')a.play();});
  if(this.view==='intro')this.raf=requestAnimationFrame(this.frame);
 };
 private next(){if(this.view!=='intro')return;if(this.index===beats.length-1)this.finish();else{this.index++;this.beat();}}
 private async finish(){if(this.view!=='intro')return;this.stop();this.view='map-intro';this.dialog.close();await introduceAct(1,this.reduced);this.launch();}
 private stop(){cancelAnimationFrame(this.raf);this.token++;audio.stopSpeech();$('intro-image').getAnimations().forEach(a=>a.cancel());}
 private async prepareChapter(next:()=>void){
  if(this.loading)return;this.loading=true;this.stop();this.leave();document.body.classList.add('at-title');document.querySelector<HTMLElement>('.chapter-shell')!.inert=true;if(!this.dialog.open)this.dialog.showModal();this.show('chapter-loading');$('chapter-retry').hidden=true;
  try{await cacheChapter((value,detail)=>{$<HTMLProgressElement>('chapter-progress').value=value;$('chapter-percent').textContent=`${value}%`;$('chapter-download-status').textContent=detail;});await this.prepare();this.cached=true;this.loading=false;next();}
  catch(error){this.loading=false;$('chapter-download-status').textContent=`${error instanceof Error?error.message:'Download interrupted.'} Completed downloads are kept. Retry to continue.`;$('chapter-retry').hidden=false;$('chapter-retry').onclick=()=>void this.prepareChapter(next);$('chapter-retry').focus();}
 }
 private launch(save?:ChapterState){if(!this.cached){void this.prepareChapter(()=>this.launch(save));return;}this.stop();this.view='game';this.dialog.close();document.body.classList.remove('at-title');document.querySelector<HTMLElement>('.chapter-shell')!.inert=false;this.enter(save);$('game').focus();}
}
