import Phaser from 'phaser';

export type HotspotTarget={id:string;name:string;x:number;y:number;w:number;h:number};
type Visual=Phaser.GameObjects.GameObject&{visible:boolean;getBounds:()=>Phaser.Geom.Rectangle};

/** A sprite's actual world bounds are the single source of truth for its target.
 * Background-painted objects retain their authored rectangles. Tight targets
 * get priority over surrounding broad areas; characters follow visual depth.
 */
export function addSceneHotspot(
 scene:Phaser.Scene,target:HotspotTarget,marks:Phaser.GameObjects.GameObject[],
 shown:()=>boolean,hover:(name:string)=>void,activate:()=>void,visual?:Visual,
){
 const zone=scene.add.zone(0,0,1,1).setName(`hotspot-${target.id}`).setData('targetId',target.id).setData('targetName',target.name);
 if(visual)zone.setData('visual',visual);
 const box=scene.add.rectangle(0,0,1,1,0xeacb8d,.1).setStrokeStyle(2,0xeacb8d).setDepth(3100);
 const label=scene.add.text(0,0,target.name,{fontFamily:'monospace',fontSize:'16px',backgroundColor:'#142229',color:'#f9e2b6'}).setOrigin(.5,1).setDepth(3101);
 marks.push(box,label);zone.setInteractive({useHandCursor:true});
 const sync=()=>{
  if(!zone.scene)return;
  const visible=!visual||(!!visual.scene&&visual.visible);
  const bounds=visual?.scene?visual.getBounds():new Phaser.Geom.Rectangle(target.x-target.w/2,target.y-target.h,target.w,target.h);
  const width=Math.max(1,bounds.width),height=Math.max(1,bounds.height);
  zone.setPosition(bounds.centerX,bounds.centerY).setSize(width,height);
  (zone.input!.hitArea as Phaser.Geom.Rectangle).setTo(0,0,width,height);zone.input!.enabled=visible;
  zone.setDepth(visual?.name.startsWith('person-')?2600+(visual as Phaser.GameObjects.Image).depth/10000:2000+1e7/(width*height));
  box.setPosition(bounds.centerX,bounds.centerY).setSize(width,height).setVisible(visible&&shown());
  // Labels stay readable at the top/left/right of the canvas.
  label.setPosition(Phaser.Math.Clamp(bounds.centerX,label.width/2,1536-label.width/2),Math.max(label.height,bounds.top)).setVisible(visible&&shown());
 };
 sync();scene.events.on('preupdate',sync);
 zone.once('destroy',()=>scene.events.off('preupdate',sync));
 zone.on('pointerover',()=>hover(target.name));zone.on('pointerout',()=>hover(''));zone.on('pointerdown',activate);
 return zone;
}

/** Named props are optional: a missing overlay must never hide a painted object. */
export function targetVisual(scene:Phaser.Scene,id:string){return scene.children.getByName(`target-${id}`) as Phaser.GameObjects.Image|undefined;}