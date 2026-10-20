import Phaser from 'phaser';
import { RoomHeader, roomBadges, paintSound } from './room-header';
import './style.css';
const roomHeader=new RoomHeader(document.getElementById('room-header')!);
roomHeader.render('bridge',[
 {id:'tavern',badge:roomBadges.tavern,reachable:true,href:'./tavern-test.html',label:'← Back to the tavern'},
 {id:'bridge',badge:roomBadges.bridge,reachable:true,href:'./bridge.html',linkId:'bridge-link'}
],()=>{});

import './bridge.css';
import duel from './duel.json';
import { tavernAudio as audio } from './audio';

type Line = {who:string;text:string};
const $=<T extends HTMLElement=HTMLElement>(id:string)=>document.getElementById(id) as T;
let round=0, wins=0, losses=0, answered=false, busy=false;
let phase:'intro'|'challenge'|'feedback'|'result'='intro';
let scene:Bridge;
let reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const name=(who:string)=>who==='QUIBBLE'?'CAPTAIN QUIBBLE':who;
function caption(line:Line){$('caption').querySelector('b')!.textContent=name(line.who);$('caption').querySelector('span')!.textContent=line.text;}
function voice(lines:Line[]){if(lines[0])caption(lines[0]);void audio.sequence(lines,caption);}
function score(){ $('nell-score').textContent=String(wins);$('pirate-score').textContent=String(losses);$('round-count').textContent=`EXCHANGE ${round+1} / ${duel.rounds.length}`;}
function challenge(){phase='challenge';answered=false;busy=false;$('briefing').hidden=true;$('exchange').hidden=false;$('result').hidden=true;$('feedback').hidden=true;$('answers').hidden=false;$('answers').replaceChildren();const q=duel.rounds[round];$('opponent').textContent=name(q.who);$('challenge').textContent=q.insult;
 const order=q.answers.map((text,index)=>({text,index}));Phaser.Utils.Array.Shuffle(order);
 for(const {text,index} of order){const b=document.createElement('button');b.textContent=text;b.onclick=()=>answer(index);$('answers').append(b);}
 score();voice([{who:q.who,text:q.insult}]);scene.taunt(q.who==='FINE PRINT');
}
function answer(index:number){if(answered||busy||phase!=='challenge')return;answered=true;busy=true;phase='feedback';const q=duel.rounds[round];const won=index===q.correct;if(won)wins++;else losses++;
 document.querySelectorAll<HTMLButtonElement>('#answers button').forEach(b=>b.disabled=true);
 $('answers').hidden=true;$('feedback').hidden=false;$('reply').textContent=`Nell: “${q.answers[index]}”`;
 const response=won?{who:q.who,text:q.retort}:duel.miss;
 $('retort').textContent=`${name(response.who)}: “${response.text}”`;
 $('explanation').textContent=won?'Touché! A point for Nell.':`Their point. Try this angle: ${q.hint}`;
 $('feedback').dataset.outcome=won?'win':'loss';
 const next=$<HTMLButtonElement>('next');next.disabled=true;next.textContent=round===duel.rounds.length-1?'See the verdict →':'Next exchange →';
 score();voice([{who:'NELL',text:q.answers[index]},response]);
 scene.exchange(won,q.who==='FINE PRINT',()=>{busy=false;next.disabled=false;});
}
function finish(){phase='result';$('exchange').hidden=true;$('result').hidden=false;const won=wins>=3;const lines=won?duel.win:duel.lose;$('round-count').textContent='DUEL COMPLETE';$('result-label').textContent=won?'RIGHT OF WAY GRANTED':'YOUR ARGUMENT NEEDS A SHARPEN';$('result-title').textContent=won?'A victory of pointed remarks.':'Out-argued. Never out of ideas.';$('ending').replaceChildren();for(const line of lines){const p=document.createElement('p');p.textContent=`${name(line.who)}: ${line.text}`;$('ending').append(p);}voice(lines);scene.verdict(won);}
function reset(){audio.stopSpeech();scene.resetActors();round=0;wins=0;losses=0;answered=false;busy=false;phase='intro';$('briefing').hidden=false;$('exchange').hidden=true;$('result').hidden=true;$('nell-score').textContent='0';$('pirate-score').textContent='0';$('round-count').textContent='A DUEL OF WITS';voice(duel.intro);}

class Bridge extends Phaser.Scene {
 nell!:Phaser.GameObjects.Container;pirate!:Phaser.GameObjects.Container;bird!:Phaser.GameObjects.Image;
 nellSword!:Phaser.GameObjects.Container;pirateSword!:Phaser.GameObjects.Container;
 timer?:Phaser.Time.TimerEvent;idle:Phaser.Tweens.Tween[]=[];
 constructor(){super('Bridge');}
 preload(){this.load.image('bridge',`${import.meta.env.BASE_URL}assets/bridge.png`);this.load.image('duel-sheet',`${import.meta.env.BASE_URL}assets/duel-sprites.png`);this.load.on('loaderror',()=>{caption({who:'ROOM',text:'An image failed to load. Reload to try again.'});});}
 create(){scene=this;this.add.image(0,0,'bridge').setOrigin(0).setDisplaySize(1536,1024);
 const source=this.textures.get('duel-sheet').getSourceImage() as HTMLImageElement;
 const frames:Record<string,number[]>={fighter:[30,185,480,660],captain:[550,175,560,670],parrot:[1170,245,345,435]};
 for(const [key,[x,y,w,h]] of Object.entries(frames)){const tex=this.textures.createCanvas(key,w,h)!;tex.context.drawImage(source,x,y,w,h,0,0,w,h);const pixels=tex.context.getImageData(0,0,w,h);for(let i=0;i<pixels.data.length;i+=4){const [r,g,b]=pixels.data.slice(i,i+3);if(r>130&&b>120&&g<110&&r>g*1.6&&b>g*1.6)pixels.data[i+3]=0;}tex.context.putImageData(pixels,0,0);tex.refresh();}
 this.add.ellipse(490,742,220,22,0x060b15,.4);this.add.ellipse(1040,742,230,22,0x060b15,.4);
 this.nell=this.add.container(490,745);this.nell.add(this.add.image(0,0,'fighter').setOrigin(.5,1).setDisplaySize(240,330));
 this.pirate=this.add.container(1040,745);this.pirate.add(this.add.image(0,0,'captain').setOrigin(.5,1).setDisplaySize(275,329));
 this.nellSword=this.sword(109,-249,1);this.nell.add(this.nellSword);
 this.pirateSword=this.sword(-121,-249,-1);this.pirate.add(this.pirateSword);
 this.bird=this.add.image(1160,365,'parrot').setDisplaySize(122,154);
 this.resetActors();audio.setAmbience('bridge-ambience');
 document.querySelectorAll<HTMLButtonElement>('button').forEach(b=>b.disabled=false);$('game').dataset.ready='true';this.updateMotion();
 }
 sword(x:number,y:number,direction:number){const c=this.add.container(x,y);const g=this.add.graphics();g.fillStyle(0xcfe9ed);g.fillTriangle(12*direction,-5,190*direction,-2,12*direction,5);g.lineStyle(2,0x829eae);g.lineBetween(12*direction,4,183*direction,-2);g.fillStyle(0xcba55d);g.fillRect(-3,-18,8,36);g.fillStyle(0x69442e);g.fillRect(-17*direction,-5,17*direction,10);c.add(g);return c;}
 updateMotion(){this.idle.forEach(t=>t.stop());this.idle=[];if(reduced)return;this.idle.push(this.tweens.add({targets:[this.nellSword,this.pirateSword],angle:4,duration:800,yoyo:true,repeat:-1,ease:'Sine.easeInOut'}));this.idle.push(this.tweens.add({targets:this.bird,y:350,angle:-4,duration:650,yoyo:true,repeat:-1,ease:'Sine.easeInOut'}));}
 resetActors(){this.timer?.remove();this.tweens.killAll();this.nell.setPosition(490,745).setAngle(0);this.pirate.setPosition(1040,745).setAngle(0);this.bird.setPosition(1160,365).setAngle(0).setFlipX(false);this.nellSword.setAngle(-8);this.pirateSword.setAngle(8);this.updateMotion();}
 taunt(parrot:boolean){if(!parrot||reduced)return;this.tweens.add({targets:this.bird,x:1000,duration:450,yoyo:true,ease:'Sine.easeInOut'});}
 exchange(won:boolean,parrot:boolean,done:()=>void){this.resetActors();audio.effectSound('parry');if(reduced){this.timer=this.time.delayedCall(100,done);return;}
 const attacker=won?this.nell:this.pirate,defender=won?this.pirate:this.nell;const direction=won?1:-1;
 this.tweens.add({targets:attacker,x:attacker.x+direction*95,angle:direction*5,duration:230,yoyo:true,hold:180,ease:'Sine.easeInOut'});
 this.tweens.add({targets:won?this.nellSword:this.pirateSword,angle:won?24:-24,duration:180,yoyo:true,repeat:1});
 this.tweens.add({targets:won?this.pirateSword:this.nellSword,angle:won?55:-55,duration:230,yoyo:true,repeat:1});
 this.tweens.add({targets:defender,x:defender.x+direction*35,angle:direction* -6,delay:240,duration:230,yoyo:true});
 if(parrot){this.tweens.add({targets:this.bird,x:850,y:470,angle:-20,duration:330,yoyo:true,hold:120,ease:'Sine.easeInOut'});}
 this.timer=this.time.delayedCall(1000,()=>{this.resetActors();done();});
 }
 verdict(won:boolean){this.resetActors();if(reduced)return;this.tweens.add({targets:won?this.pirate:this.nell,angle:won?12:-8,duration:500});this.tweens.add({targets:this.bird,x:won?1340:900,y:won?300:340,duration:900,ease:'Sine.easeInOut'});}
}
new Phaser.Game({type:Phaser.AUTO,parent:'game',width:1536,height:1024,pixelArt:true,backgroundColor:'#10191e',scene:Bridge,scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},audio:{noAudio:true}});
$('begin').onclick=()=>challenge();
$('next').onclick=()=>{if(busy||!answered)return;if(round===duel.rounds.length-1)finish();else{round++;challenge();}};
$('retry').onclick=reset;$('restart').onclick=reset;
$('sound').onclick=()=>{audio.setEnabled(!audio.enabled);paintSound($('sound'),audio.enabled);if(audio.enabled){if(phase==='intro')voice(duel.intro);else if(phase==='challenge')voice([{who:duel.rounds[round].who,text:duel.rounds[round].insult}]);else if(phase==='result')voice(wins>=3?duel.win:duel.lose);}};
$('motion').setAttribute('aria-pressed',String(reduced));$('motion').onclick=()=>{reduced=!reduced;$('motion').setAttribute('aria-pressed',String(reduced));if(busy)return;scene.resetActors();};
document.addEventListener('audio-unavailable',()=>{$('sound').title='Some audio could not play. Written dialogue is always available.';});
document.querySelectorAll<HTMLButtonElement>('button').forEach(b=>b.disabled=true);
