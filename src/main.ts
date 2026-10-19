import Phaser from 'phaser';
import './style.css';
import { tavernAudio } from './audio';

type Verb = 'walk'|'look'|'talk'|'take'|'use';
type Item = 'mug'|'key';
type State = { inventory: Item[]; returned: boolean; opened: boolean; x: number; y: number };
type Target = { id:string; name:string; x:number; y:number; w:number; h:number; look:string };
const $ = <T extends HTMLElement = HTMLElement>(id:string) => document.getElementById(id) as T;
const fresh = ():State => ({inventory:[], returned:false, opened:false, x:620,y:825});
const targets:Target[] = [
{id:'keeper',name:'Mara, the keeper',x:1235,y:740,w:155,h:250,look:'Mara runs a tight ship. Particularly impressive for a building.'},
{id:'navigator',name:'Orin, the navigator',x:870,y:685,w:165,h:275,look:'A navigator who has misplaced his ship. Promising.'},
{id:'mug',name:'Brass tankard',x:790,y:488,w:60,h:65,look:'A fine brass tankard. Someone has engraved “PROPERTY OF MARA” underneath.'},
{id:'chest',name:'Sea chest',x:360,y:735,w:150,h:125,look:'A sturdy sea chest. Its lock has survived more voyages than I have.'},
{id:'notice',name:'Noticeboard',x:275,y:430,w:150,h:260,look:'WANTED: ship’s cook. Must distinguish salt from gunpowder. Previous cook need not apply.'},
{id:'window',name:'Harbour window',x:830,y:360,w:340,h:280,look:'Out there: a thousand possible adventures. In here: substantially better heating.'},
{id:'fire',name:'Fireplace',x:485,y:520,w:210,h:190,look:'The only member of this establishment with a reliable work ethic.'},
{id:'door',name:'Tavern door',x:105,y:480,w:135,h:300,look:'The harbour can wait. There is still a perfectly good mystery indoors.'}
];
let state = fresh(), verb:Verb='walk', selected:Item|null=null, scene:Tavern;
const itemNames = {mug:'Brass tankard',key:'Brass key'};
const icons:Partial<Record<Item,string>> = {};
function say(text:string,who='NELL'){ $('caption').innerHTML='';const b=document.createElement('b');b.textContent=who;const span=document.createElement('span');span.textContent=text;$('caption').append(b,span); tavernAudio.speak(text,who); }
function command(target?:string){$('command').textContent = selected ? `Use ${itemNames[selected]}${target ? ' with '+target : ' with…'}` : `${{walk:'Walk to',look:'Look at',talk:'Talk to',take:'Pick up',use:'Use'}[verb]} ${target || '…'}`;}
function setVerb(next:Verb){verb=next;selected=null;document.querySelectorAll<HTMLButtonElement>('[data-verb]').forEach(b=>b.classList.toggle('active',b.dataset.verb===verb));renderInventory();command();}
function renderInventory(){const el=$('inventory');el.replaceChildren();$('inventory-count').textContent=`${state.inventory.length} ITEMS`;if(!state.inventory.length){const span=document.createElement('span');span.className='empty';span.textContent='A little lint. A lot of possibility.';el.append(span);}for(const item of state.inventory){const b=document.createElement('button');b.classList.toggle('active',selected===item);b.setAttribute('aria-label',`Use ${itemNames[item]}`);const img=document.createElement('img');img.src=icons[item]||'';img.alt='';b.append(img,document.createTextNode(itemNames[item]));b.onclick=()=>{setVerb('use');selected=item;renderInventory();command();};el.append(b);}}
function closeDialogue(){$('dialogue').hidden=true;tavernAudio.stopSpeech();}
function talk(id:string){const keeper=id==='keeper';$('speaker').textContent=keeper?'MARA · TAVERN KEEPER':'ORIN · NAVIGATOR';$('speech').textContent=keeper?'If you came for a room, the roof only leaks on the expensive side.':'I haven’t lost my ship. I know exactly which ocean it’s in.';$('choices').replaceChildren();const choices=keeper?[
['What’s in the sea chest?',()=>{ $('speech').textContent=state.returned?'You have the key. Consider it payment for services to tidiness.':'An old chart. Bring back my brass tankard from the window table and you can have the key.';}],
['Any advice for a new arrival?',()=>{$('speech').textContent='Look before you pick things up. Then pick them up anyway. That seems to be how adventurers work.';}]
]:[
['Where should I start?',()=>{$('speech').textContent=state.opened?'That chart marks Bellweather Shoal. Bring a boat. I’ve tried walking.':'Mara keeps a chart in that chest. She might part with the key if you help clear up.';}],
['How did you become a navigator?',()=>{$('speech').textContent='I got lost professionally until someone started paying me.';}]
];for(const [label,action] of choices){const b=document.createElement('button');b.textContent=label as string;b.onclick=()=>{(action as ()=>void)();void tavernAudio.sequence([{who:'NELL',text:label as string},{who:keeper?'MARA':'ORIN',text:$('speech').textContent||''}]);};$('choices').append(b);}const bye=document.createElement('button');bye.textContent='I’ll let you get back to it.';bye.onclick=()=>{closeDialogue();tavernAudio.speak(bye.textContent||'');};$('choices').append(bye);$('dialogue').hidden=false;tavernAudio.speak($('speech').textContent||'',keeper?'MARA':'ORIN');}
function interact(id:string){const t=targets.find(t=>t.id===id)!;if(id==='mug'&&(state.returned||state.inventory.includes('mug'))){say('The tankard is already taken care of.');return;}closeDialogue();if(verb==='look'){say(id==='chest'&&state.opened?'Inside: a chart to Bellweather Shoal. Our next destination.':t.look);return;}
if(id==='door'&&(verb==='walk'||verb==='use')){travelToBridge();return;}
if(verb==='walk'){scene.walk(t.x,Math.max(715,t.y+100));return;}
if(verb==='talk'){if(id==='keeper'||id==='navigator')talk(id);else say('It is keeping its thoughts to itself.');return;}
if(verb==='take'){if(id==='mug'){tavernAudio.effectSound('pickup');state.inventory.push('mug');scene.sync();renderInventory();say('One tankard acquired. My career in piracy begins modestly.');}else say(id==='chest'?'Too heavy. Perhaps I should try opening it.':'Best leave that where it is.');return;}
if(selected==='mug'&&id==='keeper'){state.inventory=state.inventory.filter(i=>i!=='mug');state.inventory.push('key');state.returned=true;selected=null;tavernAudio.effectSound('exchange');say('My tankard! Here, take the chest key. The chart inside deserves some fresh air.','MARA');}
else if(selected==='key'&&id==='chest'){if(state.opened)say('It is already unlocked. Bellweather Shoal awaits.');else{state.opened=true;tavernAudio.effectSound('unlock');say('A chart to Bellweather Shoal! Finally, a plan with a suspicious dotted line.');}}
else if(selected)say('An inspired combination. Unfortunately, the universe disagrees.');
else if(id==='chest')say(state.opened?'The chart points to Bellweather Shoal. Our adventure starts here.':'Locked. Perhaps Mara knows where the key is.');
else if(id==='door')say('Beyond this door lies the next chapter. For now, this is our development room.');
else say('Select something from your pockets, then click what you want to use it with.');
scene.sync();renderInventory();command();}

class Tavern extends Phaser.Scene {
 hero!:Phaser.GameObjects.Image; mug!:Phaser.GameObjects.Image; chest!:Phaser.GameObjects.Image; marks:Phaser.GameObjects.GameObject[]=[]; showMarks=false; move?:Phaser.Tweens.Tween;
 constructor(){super('Tavern');}
 preload(){this.load.image('tavern',`${import.meta.env.BASE_URL}assets/tavern.png`);this.load.image('atlas',`${import.meta.env.BASE_URL}assets/sprites.png`);this.load.on('loaderror',()=>say('An image could not be loaded. Please reload the page.'));}
 create(){scene=this;this.add.image(0,0,'tavern').setOrigin(0).setDisplaySize(1536,1024);
 // Decode the generated chroma-key atlas into runtime textures. Source artwork stays intact.
 const source=this.textures.get('atlas').getSourceImage() as HTMLImageElement;
 const frames:Record<string,number[]>={hero:[115,25,290,595],keeper:[602,40,360,580],navigator:[1110,20,365,600],mug:[110,680,320,300],key:[590,650,370,335],chest:[1095,690,360,295]};
 for(const [name,[x,y,w,h]] of Object.entries(frames)){const tex=this.textures.createCanvas(name,w,h)!;const ctx=tex.context;ctx.drawImage(source,x,y,w,h,0,0,w,h);const data=ctx.getImageData(0,0,w,h);for(let i=0;i<data.data.length;i+=4){const [r,g,b]=data.data.slice(i,i+3);if(r>130&&b>120&&g<110&&r>g*1.6&&b>g*1.6)data.data[i+3]=0;}ctx.putImageData(data,0,0);tex.refresh();if(name==='mug'||name==='key')icons[name]=tex.canvas.toDataURL();}
 this.add.ellipse(1235,738,110,20,0x080a10,.35);this.add.image(1235,740,'keeper').setOrigin(.5,1).setDisplaySize(155,250);
 this.add.ellipse(870,683,110,19,0x080a10,.35);this.add.image(870,685,'navigator').setOrigin(.5,1).setDisplaySize(165,271);
 this.chest=this.add.image(360,735,'chest').setOrigin(.5,1).setDisplaySize(150,123);
 this.mug=this.add.image(790,488,'mug').setOrigin(.5,1).setDisplaySize(44,42);
 const floor=this.add.zone(768,870,1536,308).setInteractive();floor.on('pointerdown',(p:Phaser.Input.Pointer)=>{if(!$('dialogue').hidden)return;this.walk(p.x,p.y);});
 this.hero=this.add.image(state.x,state.y,'hero').setOrigin(.5,1).setDisplaySize(139,285);
 for(const t of targets){const zone=this.add.zone(t.x,t.y-t.h/2,t.w,t.h).setInteractive({useHandCursor:true});zone.on('pointerover',()=>command(t.name));zone.on('pointerout',()=>command());zone.on('pointerdown',()=>{if($('dialogue').hidden)interact(t.id);});const rect=this.add.rectangle(t.x,t.y-t.h/2,t.w,t.h,0xe1bb73,.08).setStrokeStyle(2,0xe1bb73,.8).setVisible(false);const label=this.add.text(t.x,t.y-t.h-7,t.name,{fontFamily:'monospace',fontSize:'18px',color:'#ffe5ac',backgroundColor:'#142027',padding:{x:5,y:4}}).setOrigin(.5,1).setVisible(false);this.marks.push(rect,label);}
 document.querySelectorAll<HTMLButtonElement>('button').forEach(b=>b.disabled=false);this.sync();renderInventory();$('game').dataset.ready='true';
 }
 walk(x:number,y:number){closeDialogue();this.move?.stop();x=Phaser.Math.Clamp(x,95,1440);y=Phaser.Math.Clamp(y,740,950);this.hero.setFlipX(x<this.hero.x);const distance=Phaser.Math.Distance.Between(this.hero.x,this.hero.y,x,y);tavernAudio.walk(distance>0);this.move=this.tweens.add({targets:this.hero,x,y,duration:distance/0.32,ease:'Linear',onUpdate:()=>{state.x=this.hero.x;state.y=this.hero.y;},onComplete:()=>{state.x=x;state.y=y;tavernAudio.walk(false);}});command('the tavern floor');}
 sync(){this.mug.setVisible(!state.returned&&!state.inventory.includes('mug'));this.chest.setTint(state.opened?0xffe6a0:0xffffff);this.hero.setPosition(state.x,state.y);const b=document.querySelector<HTMLButtonElement>('[data-target="mug"]');if(b)b.disabled=state.returned||state.inventory.includes('mug');}
 toggleMarks(){this.showMarks=!this.showMarks;for(const m of this.marks)(m as Phaser.GameObjects.Rectangle).setVisible(this.showMarks);$('hotspots').setAttribute('aria-pressed',String(this.showMarks));}
}
new Phaser.Game({type:Phaser.AUTO,parent:'game',width:1536,height:1024,backgroundColor:'#10191e',pixelArt:true,scene:Tavern,scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},audio:{noAudio:true}});
document.querySelectorAll<HTMLButtonElement>('[data-verb]').forEach(b=>b.onclick=()=>setVerb(b.dataset.verb as Verb));
for(const t of targets){const b=document.createElement('button');b.textContent=t.name;b.dataset.target=t.id;b.onclick=()=>interact(t.id);$('targets').append(b);}
$('close-dialogue').onclick=closeDialogue;$('hotspots').onclick=()=>scene?.toggleMarks();
$('save').onclick=()=>{try{localStorage.setItem('monkey-buisness-save',JSON.stringify({version:1,state}));say('Progress saved. Even adventurers deserve a safety net.');}catch{say('Saving is unavailable in this browser. Your current room is still playable.');}};
$('load').onclick=()=>{try{const raw=localStorage.getItem('monkey-buisness-save');if(!raw){say('No saved game yet.');return;}const saved=JSON.parse(raw);const s=saved.state as State;if(saved.version!==1||!s||!Array.isArray(s.inventory)||s.inventory.some(i=>!['mug','key'].includes(i))||new Set(s.inventory).size!==s.inventory.length||typeof s.returned!=='boolean'||typeof s.opened!=='boolean'||!Number.isFinite(s.x)||!Number.isFinite(s.y)||s.x<95||s.x>1440||s.y<740||s.y>950||(s.returned&&s.inventory.includes('mug'))||(s.opened&&!s.returned))throw Error('Invalid save');scene.move?.stop();tavernAudio.walk(false);state=s;closeDialogue();setVerb('walk');scene.sync();say('Back where we left off. The tankards have missed you.');}catch{say('That save could not be loaded. Your current game has been kept.');}};
$('reset').onclick=()=>{scene.move?.stop();tavernAudio.walk(false);state=fresh();closeDialogue();setVerb('walk');scene.sync();say('A fresh start. Same suspiciously welcoming tavern.');};
window.addEventListener('keydown',e=>{if(e.target instanceof HTMLButtonElement||e.target instanceof HTMLInputElement||e.ctrlKey||e.metaKey||e.altKey)return;if(e.key==='Escape'){closeDialogue();setVerb('walk');}if(e.key.toLowerCase()==='h')scene?.toggleMarks();const verbs:Verb[]=['walk','look','talk','take','use'];if(/^[1-5]$/.test(e.key))setVerb(verbs[Number(e.key)-1]);});
// Audio starts only after this explicit user gesture; subtitles remain available when muted.
$('sound').onclick=()=>{
 const enabled=!tavernAudio.enabled;
 tavernAudio.setEnabled(enabled);
 $('sound').textContent=enabled?'Sound on':'Sound off';
 $('sound').setAttribute('aria-pressed',String(enabled));
 if(enabled){
  const inDialogue=!$('dialogue').hidden;
  const text=inDialogue?$('speech').textContent:$('caption').querySelector('span')?.textContent;
  const who=inDialogue?($('speaker').textContent?.startsWith('MARA')?'MARA':'ORIN'):($('caption').querySelector('b')?.textContent||'NELL');
  if(text)tavernAudio.speak(text,who);
 }
};
document.addEventListener('audio-unavailable',()=>{
 $('sound').title='Some audio could not play. Subtitles and game controls remain available.';
});

document.querySelectorAll<HTMLButtonElement>('button').forEach(b=>b.disabled=true);

function travelToBridge(){
 try{sessionStorage.setItem('monkey-buisness-travel',JSON.stringify(state));}catch{}
 window.location.href='./bridge.html';
}
$('bridge-link').onclick=e=>{e.preventDefault();travelToBridge();};
try{
 const raw=sessionStorage.getItem('monkey-buisness-travel');
 if(raw){const s=JSON.parse(raw) as State;
 if(Array.isArray(s.inventory)&&s.inventory.every(i=>i==='mug'||i==='key')&&new Set(s.inventory).size===s.inventory.length&&typeof s.returned==='boolean'&&typeof s.opened==='boolean'&&Number.isFinite(s.x)&&Number.isFinite(s.y)&&s.x>=95&&s.x<=1440&&s.y>=740&&s.y<=950&&!(s.returned&&s.inventory.includes('mug'))&&!(s.opened&&!s.returned))state=s;
 sessionStorage.removeItem('monkey-buisness-travel');}
}catch{}
