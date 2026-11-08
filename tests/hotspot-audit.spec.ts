import {test,expect} from '@playwright/test';
import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
const presets=JSON.parse(readFileSync(resolve('public/debug-start.json'),'utf8')).presets;
for(const act of [1,2,3,4,5])test(`Act ${act} all room hotspots: visible bounds, overlap and real canvas clicks`,async({page})=>{
 test.setTimeout(300000);await page.setViewportSize({width:1536,height:1100});await page.emulateMedia({reducedMotion:'reduce'});await page.addInitScript(()=>sessionStorage.setItem('monkey-buisness-sound','false'));
 const file=act===1?'chapter-scene':`act${act}-scene`,name=act===1?'ChapterScene':`Act${act}Scene`;
 await page.route(`**/src/${file}.ts*`,async route=>{const r=await route.fetch();await route.fulfill({response:r,body:await r.text()+`\nconst originalRender=${name}.prototype.render;${name}.prototype.render=function(...args){const result=originalRender.apply(this,args);window.__hotspotScene=this;return result;};`});});
 const dir=resolve('test-results/hotspot-audit');mkdirSync(dir,{recursive:true});const report:any[]=[];const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 const entries=presets.filter((p:any)=>p.act===act&&!p.intro);
 for(const preset of entries){
  await page.goto(`/${act===1?'':`act${act}.html`}?debug=${preset.id}`);await expect(page.locator('#game')).toHaveAttribute('data-ready','true',{timeout:90000});await page.waitForFunction(room=>(window as any).__hotspotScene?.state.room===room,preset.room);
  // Observe actual target dispatch while avoiding puzzle mutations during the audit.
  await page.evaluate(()=>{const s=(window as any).__hotspotScene;const callbacks=s.callbacks||s.eventsOut;callbacks.target=(target:any)=>(window as any).__clicked=typeof target==='string'?target:target.id;s.showMarks=true;});
  await page.waitForTimeout(60);
  const targets=await page.evaluate(()=>{
   const s=(window as any).__hotspotScene;const zones=s.children.list.filter((z:any)=>z.name?.startsWith('hotspot-')&&z.input?.enabled).sort((a:any,b:any)=>b.depth-a.depth||s.children.list.indexOf(b)-s.children.list.indexOf(a));
   return zones.map((z:any)=>{
    const b=z.getBounds(),v=z.getData('visual'),vb=v?.getBounds();let point=null;
    for(const fy of [.5,.2,.8,.05,.95])for(const fx of [.5,.2,.8,.05,.95]){const x=b.x+b.width*fx,y=b.y+b.height*fy;if(x<0||x>1536||y<0||y>1024)continue;const top=zones.find((other:any)=>other.getBounds().contains(x,y));if(top===z&&!point)point={x,y};}
    return {id:z.getData('targetId'),name:z.getData('targetName'),x:b.x,y:b.y,w:b.width,h:b.height,visual:vb?{x:vb.x,y:vb.y,w:vb.width,h:vb.height}:null,point};
   });
  });
  await page.locator('canvas').screenshot({path:resolve(dir,`${preset.id}.png`)});
  report.push({preset:preset.id,targets});writeFileSync(resolve(dir,`act${act}.json`),JSON.stringify(report,null,2));
  for(const target of targets){
   expect.soft(target.point,`${preset.id}: unreachable ${target.id}`).not.toBeNull();
   if(target.visual)for(const key of ['x','y','w','h'] as const)expect.soft(target[key],`${preset.id}: ${target.id} ${key}`).toBeCloseTo(target.visual[key],2);
   if(!target.point)continue;
   await page.evaluate(()=>(window as any).__clicked=null);const box=(await page.locator('canvas').boundingBox())!;
   await page.mouse.click(box.x+target.point.x/1536*box.width,box.y+target.point.y/1024*box.height);
   expect.soft(await page.evaluate(()=>(window as any).__clicked),`${preset.id}: click ${target.id}`).toBe(target.id);
  }
 }
 expect(errors).toEqual([]);
});

test('Act I moving float and open chest stay attached to their hotspots',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.addInitScript(()=>sessionStorage.setItem('monkey-buisness-sound','false'));
 await page.route('**/src/chapter-scene.ts*',async route=>{const r=await route.fetch();await route.fulfill({response:r,body:await r.text()+`\nconst r=ChapterScene.prototype.render;ChapterScene.prototype.render=function(...args){r.apply(this,args);window.__hotspotScene=this;};`});});
 await page.goto('/?debug=act1-landing');await page.waitForFunction(()=>(window as any).__hotspotScene?.state.room==='landing');
 await page.evaluate(()=>{const s=(window as any).__hotspotScene;s.float.setPosition(1210,545);});await page.waitForTimeout(100);
 expect(await page.evaluate(()=>{const s=(window as any).__hotspotScene;const a=s.float.getBounds(),b=s.children.getByName('hotspot-float').getBounds();return Math.abs(a.centerX-b.centerX)+Math.abs(a.centerY-b.centerY);})).toBeLessThan(.01);
 await page.goto('/?debug=act1-tavern');await page.waitForFunction(()=>(window as any).__hotspotScene?.state.room==='tavern');
 await page.evaluate(()=>{const s=(window as any).__hotspotScene;s.state.flags.chestOpen=true;s.render(s.state);});await page.waitForTimeout(100);
 expect(await page.evaluate(()=>(window as any).__hotspotScene.children.getByName('hotspot-chest').width)).toBe(245);
});