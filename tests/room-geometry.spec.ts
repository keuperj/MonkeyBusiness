import {test,expect} from '@playwright/test';
import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {roomFloors,floorPoint,floorSpawn,onFloor,humanHeight,actorFeet} from '../src/walkable-floor';
const presets=JSON.parse(readFileSync(resolve('public/debug-start.json'),'utf8')).presets;

test('every room has convex, bounded floor geometry, safe spawns and scale',()=>{
 for(const [room,f] of Object.entries(roomFloors)){
  const spawn=floorSpawn(room);expect(onFloor(room,spawn.x,spawn.y),room).toBe(true);
  const points=[];
  for(let x=-100;x<=1700;x+=100)for(let y=-100;y<=1200;y+=100){const p=floorPoint(room,x,y);expect(onFloor(room,p.x,p.y),`${room}: ${x},${y}`).toBe(true);points.push(p);expect(humanHeight(room,p.y)).toBeGreaterThan(340);expect(humanHeight(room,p.y)).toBeLessThan(470);}
  const unsafe=[];for(const a of points)for(const b of f.polygon)for(const t of [.2,.5,.8])if(!onFloor(room,a.x+(b[0]-a.x)*t,a.y+(b[1]-a.y)*t))unsafe.push({a,b,t});expect(unsafe,`${room} complete paths`).toEqual([]);
  for(const who of ['MARA','ORIN','QUIBBLE','PIP','ROOK','VANE','BRAM']){const p=actorFeet(room,who,1400,780);expect(onFloor(room,p.x,p.y)).toBe(true);}
  expect(floorPoint(room,NaN,Infinity)).toEqual(spawn);
 }
 // Explicit water/wet-stair/railing regressions, independent of projection.
 for(const [room,x,y] of [['bridge',600,940],['landing',1390,850],['quay',1370,850],['inlet',1090,900],['service',100,900],['overlook',900,650],['bypass',800,500],['command',900,600]] as const)expect(onFloor(room,x,y),room).toBe(false);
});

for(const act of [1,2,3,4,5])test(`Act ${act}: every room spawn, actors, hitboxes and complete walking paths`,async({page})=>{
 test.setTimeout(240000);await page.setViewportSize({width:1536,height:1100});await page.emulateMedia({reducedMotion:'reduce'});await page.addInitScript(()=>sessionStorage.setItem('monkey-buisness-sound','false'));
 const file=act===1?'chapter-scene':`act${act}-scene`,name=act===1?'ChapterScene':`Act${act}Scene`;
 await page.route(`**/src/${file}.ts*`,async route=>{const r=await route.fetch();await route.fulfill({response:r,body:await r.text()+`\nconst auditRender=${name}.prototype.render;${name}.prototype.render=function(...args){const result=auditRender.apply(this,args);window.__auditScene=this;return result;};`});});
 const entries=presets.filter((p:any)=>p.act===act&&!p.intro&&p.id===`act${act}-${p.room}`),errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 const dir=resolve('test-results/room-audit');mkdirSync(dir,{recursive:true});const report=[];
 for(const entry of entries){
  await page.goto(`/${act===1?'':`act${act}.html`}?debug=${entry.id}`);await expect(page.locator('#game')).toHaveAttribute('data-ready','true',{timeout:90000});
  const room=entry.room;await page.waitForFunction(room=>(window as any).__auditScene?.state?.room===room,room);
  const actors=await page.evaluate(()=>{const s=(window as any).__auditScene;return s.children.list.filter((o:any)=>o.name?.startsWith('person-')).map((o:any)=>({name:o.name,x:o.x,y:o.y,w:o.displayWidth,h:o.displayHeight,ratio:o.frame.realWidth/o.frame.realHeight,hitbox:o===s.hero||s.children.list.some((z:any)=>z.type==='Zone'&&Math.abs(z.x-o.x)<.1&&Math.abs(z.y-(o.y-o.displayHeight/2))<.1&&Math.abs(z.width-o.displayWidth)<.1&&Math.abs(z.height-o.displayHeight)<.1)}));});
  expect(actors.length,entry.id).toBeGreaterThan(0);
  for(const a of actors){expect(a.w/a.h).toBeCloseTo(a.ratio,4);expect(a.hitbox,`${entry.id} ${a.name} hitbox`).toBe(true);if(!a.name.includes('parrot')&&!a.name.includes('fine-print'))expect(onFloor(room,a.x,a.y),`${entry.id} ${a.name}`).toBe(true);}
  await page.locator('canvas').screenshot({path:resolve(dir,`${entry.id}.png`)});
  // Add a test-only polygon overlay to make the geometry auditable against art.
  await page.evaluate(polygon=>{const s=(window as any).__auditScene;const g=s.add.graphics().setName('audit-floor').setDepth(4000);g.fillStyle(0x00ff99,.15);g.lineStyle(3,0x00ff99,1);const p=polygon.map(([x,y])=>({x,y}));g.fillPoints(p,true);g.strokePoints(p,true);},roomFloors[room].polygon);
  await page.locator('canvas').screenshot({path:resolve(dir,`${entry.id}-floor.png`)});
  const samples=await page.evaluate(async()=>{
   const s=(window as any).__auditScene;s.children.getByName('audit-floor')?.destroy();s.reduced=false;
   const samples:{x:number;y:number;h:number}[]=[];const record=()=>samples.push({x:s.hero.x,y:s.hero.y,h:s.hero.displayHeight});s.events.on('update',record);
   // Real scene walking, with no modification of state or floor calculations.
   for(const [x,y] of [[20,1000],[1510,1000],[1510,700],[20,700]]){s.walk(x,y);await new Promise(r=>setTimeout(r,actDuration(s)));}
   function actDuration(scene:any){return scene.scene.key==='Chapter'?4500:750;}
   s.events.off('update',record);return samples;
  });
  expect(samples.length).toBeGreaterThan(0);expect(samples.filter(p=>!onFloor(room,p.x,p.y)||p.h<=340),`${entry.id} unsafe tween samples`).toEqual([]);
  report.push({room,actors,samples:samples.length,floor:roomFloors[room]});
 }
 writeFileSync(resolve(dir,`act${act}.json`),JSON.stringify(report,null,2));expect(errors).toEqual([]);
});