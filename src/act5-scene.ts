import {floorPoint} from './walkable-floor';
import Phaser from 'phaser';
import {art5,spots5} from './act5-data';
import type {Spot} from './act2-data';
import type {State5} from './act5-state';
export class Act5Scene extends Phaser.Scene{
 state!:State5;hero!:Phaser.GameObjects.Image;marks:Phaser.GameObjects.GameObject[]=[];showMarks=false;reduced=false;walking?:Phaser.Tweens.Tween;
 constructor(private callbacks:{ready:()=>void;target:(s:Spot)=>void;hover:(s:string)=>void;error:(s:string)=>void;walking:(active:boolean)=>void;canWalk:()=>boolean}){super('Act5');}
 preload(){this.load.on('loaderror',(f:Phaser.Loader.File)=>this.callbacks.error(`Could not load ${f.key}. Reload to retry.`));for(const file of [...new Set(Object.values(art5)),'sprites','duel-sprites','quibble-idle','chest-open','act2/cast','act2/props','act3/bram','act3/props','act4/props'])this.load.image(file,`${import.meta.env.BASE_URL}assets/${file}.png`);}
 create(){const sheet=this.textures.get('sprites').getSourceImage() as HTMLImageElement;for(const [id,x,y,w,h] of [['nell',115,25,290,595],['mara',602,40,360,580],['orin',1110,20,365,600],['parrot',1170,245,345,435]] as const){const t=this.textures.createCanvas(`a5-${id}`,w,h)!;t.context.drawImage(id==='parrot'?this.textures.get('duel-sprites').getSourceImage() as HTMLImageElement:sheet,x,y,w,h,0,0,w,h);const p=t.context.getImageData(0,0,w,h);for(let i=0;i<p.data.length;i+=4){const [r,g,b]=p.data.slice(i,i+3);if(r>130&&b>120&&g<110&&r>g*1.6&&b>g*1.6)p.data[i+3]=0;}t.context.putImageData(p,0,0);t.refresh();}
 const cast=this.textures.get('act2/cast'),c=cast.getSourceImage() as HTMLImageElement;['PIP','ROOK','VANE'].forEach((name,i)=>cast.add(name,0,i*c.width/3,0,c.width/3,c.height));for(const [key,names] of [['act2/props',['rope','crank','paper','drawing','boat','barrier']],['act3/props',['tracing','used','collar','record','procedure','model']],['act4/props',['link','handle','snapshot','key','roster','cabinet']]] as const){const t=this.textures.get(key),im=t.getSourceImage() as HTMLImageElement;names.forEach((n,i)=>t.add(n,0,i%3*im.width/3,Math.floor(i/3)*im.height/2,im.width/3,im.height/2));}this.callbacks.ready();}
 render(state:State5){this.state=state;this.stopWalking();this.children.removeAll(true);this.marks=[];this.add.image(0,0,art5[state.room]).setOrigin(0).setDisplaySize(1536,1024);this.add.zone(768,875,1536,295).setInteractive().on('pointerdown',(p:Phaser.Input.Pointer)=>{if(this.callbacks.canWalk())this.walk(p.x,p.y);});
 if(state.room==='tavern')this.add.image(350,746,'chest-open').setOrigin(.5,1).setDisplaySize(245,180);
 if(state.room===state.boat)this.add.image(1090,645,'act2/props','boat').setDisplaySize(370,235).setOrigin(.5,1);
 if(state.room==='command'||state.room==='bypass')this.add.text(768,170,state.authority.replaceAll('_',' '),{fontFamily:'monospace',fontSize:'28px',color:'#ffe4a5',backgroundColor:'#142229'}).setOrigin(.5);
 const start=floorPoint(state.room,590,900,800);this.hero=this.add.image(start.x,start.y,'a5-nell').setOrigin(.5,1).setDisplaySize(173,355);
 for(const s of spots5(state)){if(s.person){const key=['PIP','ROOK','VANE'].includes(s.person)?'act2/cast':s.person==='BRAM'?'act3/bram':s.person==='QUIBBLE'?'quibble-idle':s.person==='FINE PRINT'?'a5-parrot':`a5-${s.person.toLowerCase()}`;this.add.image(s.x,s.y,key,key==='act2/cast'?s.person:undefined).setOrigin(.5,1).setDisplaySize(s.person==='FINE PRINT'?122:200,s.person==='FINE PRINT'?154:345);}
 const z=this.add.zone(s.x,s.y-s.h/2,s.w,s.h).setInteractive({useHandCursor:true});z.on('pointerover',()=>this.callbacks.hover(s.name));z.on('pointerout',()=>this.callbacks.hover(''));z.on('pointerdown',()=>{if(this.callbacks.canWalk())this.callbacks.target(s);});this.marks.push(this.add.rectangle(s.x,s.y-s.h/2,s.w,s.h,0xeacb8d,.1).setStrokeStyle(2,0xeacb8d).setVisible(this.showMarks),this.add.text(s.x,s.y-s.h,s.name,{fontFamily:'monospace',fontSize:'16px',backgroundColor:'#142229',color:'#f9e2b6'}).setOrigin(.5,1).setVisible(this.showMarks));}
 }
 stopWalking(){this.walking?.stop();this.walking=undefined;this.callbacks.walking(false);}
 walk(x:number,y:number){this.stopWalking();({x,y}=floorPoint(this.state.room,x,y,800));this.hero.setFlipX(x<this.hero.x);if(this.reduced){this.hero.setPosition(x,y);return;}this.callbacks.walking(true);this.walking=this.tweens.add({targets:this.hero,x,y,duration:650,onComplete:()=>this.callbacks.walking(false)});}
 toggle(){this.showMarks=!this.showMarks;for(const m of this.marks)(m as Phaser.GameObjects.Rectangle).setVisible(this.showMarks);}
}
