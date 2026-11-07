import type Phaser from 'phaser';
import {actorFeet,humanHeight} from './walkable-floor';
import type {Spot} from './act2-data';
/** Preserve each drawing's aspect ratio, with consistent room perspective. */
export function sizeActor(image:Phaser.GameObjects.Image,room:string,who='NELL'){
 const height=humanHeight(room,image.y)*(who==='FINE PRINT'?.40:who==='PIP'?.92:1);
 image.setDisplaySize(height*image.frame.realWidth/image.frame.realHeight,height);
 image.setDepth(image.y);return image;
}
export function placeActor(image:Phaser.GameObjects.Image,room:string,who:string){
 if(who==='FINE PRINT'){
  const p=actorFeet(room,'QUIBBLE',1000,880);image.setPosition(p.x+65,p.y-humanHeight(room,p.y)*.72);
 }else{const p=actorFeet(room,who,image.x,image.y);image.setPosition(p.x,p.y);}
 image.setOrigin(.5,1).setName(`person-${who.toLowerCase().replaceAll(' ','-')}`);sizeActor(image,room,who);if(who==='FINE PRINT')image.setDepth(1100);return image;
}
/** Hotspot bounds follow the displayed character, not obsolete source sizes. */
export function actorSpot<T extends Spot>(spot:T,image:Phaser.GameObjects.Image):T{return {...spot,x:image.x,y:image.y,w:image.displayWidth,h:image.displayHeight};}