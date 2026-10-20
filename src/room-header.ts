import './room-header.css';
import {icon} from './control-icons';
const base=import.meta.env.BASE_URL;
export type RoomBadge={name:string;art:string;frame:string;point:readonly [number,number]};
export const roomBadges:Record<string,RoomBadge>={
 tavern:{name:'The Crooked Compass',art:'room-emblems.png',frame:'0 120 520 800',point:[188,799]},
 bridge:{name:'Quibble’s Crossing',art:'room-emblems.png',frame:'520 120 510 800',point:[337,583]},
 landing:{name:'Outer Landing',art:'room-emblems.png',frame:'1030 120 506 800',point:[633,540]},
};
export type HeaderDestination={id:string;badge:RoomBadge;reachable:boolean;href?:string;linkId?:string;label?:string};
const ns='http://www.w3.org/2000/svg';
let cropId=0;
function art(badge:RoomBadge){const svg=document.createElementNS(ns,'svg');svg.setAttribute('viewBox',badge.frame);svg.setAttribute('aria-hidden','true');const img=document.createElementNS(ns,'image');img.setAttribute('href',`${base}assets/${badge.art}`);img.setAttribute('width','1536');img.setAttribute('height','1024');const clip=document.createElementNS(ns,'clipPath');const id=`badge-crop-${++cropId}`;clip.id=id;const rect=document.createElementNS(ns,'rect');const [x,y,w,h]=badge.frame.split(' ');for(const [key,value] of Object.entries({x,y,width:w,height:h}))rect.setAttribute(key,value);clip.append(rect);const defs=document.createElementNS(ns,'defs');defs.append(clip);img.setAttribute('clip-path',`url(#${id})`);svg.append(defs,img);return svg;}
export function paintSound(button:HTMLElement,enabled:boolean){
 button.setAttribute('aria-label',enabled?'Sound on':'Sound off');button.setAttribute('aria-pressed',String(enabled));button.title=enabled?'Mute sound':'Enable sound';button.classList.add('sound-icon');
 button.innerHTML=icon(enabled?'soundOn':'soundOff');
}
export class RoomHeader {
 private title:HTMLElement;
 private nav:HTMLElement;
 constructor(host:HTMLElement,act='Act I',subtitle='A Job, a Tankard and a Toll'){
  host.className='room-masthead';
  host.innerHTML=`<header class="art-topbar"><a class="game-brand" href="${base}" aria-label="Monkey Buisness — start menu"><img src="${base}assets/game-logo.png" alt="Monkey Buisness"></a><h1 id="room-title" class="room-emblem"></h1><div class="act-lettering"><span></span><small></small></div><nav id="room-nav" class="room-destinations" aria-label="Travel destinations"></nav><button id="sound" type="button"></button></header>`;
  host.querySelector('.act-lettering span')!.textContent=act;host.querySelector('.act-lettering small')!.textContent=subtitle;
  this.title=host.querySelector('#room-title')!;this.nav=host.querySelector('#room-nav')!;paintSound(host.querySelector('#sound')!,false);
 }
 render(current:string,destinations:HeaderDestination[],travel:(id:string)=>void,busy=false){
  const active=destinations.find(d=>d.id===current);if(!active)throw Error('Current room needs header metadata');
  this.title.replaceChildren(art(active.badge));const name=document.createElement('span');name.className='sr-only';name.textContent=active.badge.name;this.title.append(name);this.title.title=active.badge.name;
  this.title.dataset.room=current;
  this.nav.replaceChildren();
  const shown=destinations.filter(d=>d.reachable&&d.id!==current);
  for(const d of shown){const node=d.href?document.createElement('a'):document.createElement('button');
   if(node instanceof HTMLAnchorElement)node.href=d.href!;else{node.type='button';node.disabled=busy||d.id===current;node.onclick=()=>travel(d.id);}
   if(d.linkId)node.id=d.linkId;node.className='room-destination';node.dataset.room=d.id;node.title=d.badge.name;node.setAttribute('aria-label',d.label??d.badge.name);if(d.id===current){node.setAttribute('aria-current','location');if(node instanceof HTMLAnchorElement){node.setAttribute('aria-disabled','true');node.onclick=e=>e.preventDefault();}}
   node.append(art(d.badge));this.nav.append(node);
  }
 }
}
