import { test, expect } from '@playwright/test';

test('complete the room puzzle, save, reset and restore',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/tavern-test.html');await expect(page.locator('#game')).toHaveAttribute('data-ready','true');await expect(page.locator('canvas')).toBeVisible();
 await page.locator('summary').click();
 await page.getByRole('button',{name:'Talk to'}).click();
 await page.locator('[data-target="keeper"]').click();
 await expect(page.locator('#dialogue')).toBeVisible();
 await page.getByRole('button',{name:'What’s in the sea chest?'}).click();
 await expect(page.locator('#speech')).toContainText('tankard');
 await page.getByRole('button',{name:'Close conversation'}).click();
 await page.getByRole('button',{name:'Pick up'}).click();await page.locator('[data-target="mug"]').click();
 await page.getByRole('button',{name:'Use Brass tankard',exact:true}).click();await page.locator('[data-target="keeper"]').click();
 await expect(page.getByRole('button',{name:'Use Brass key',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Use Brass key',exact:true}).click();await page.locator('[data-target="chest"]').click();
 await expect(page.locator('#caption')).toContainText('Bellweather Shoal');
 await page.getByRole('button',{name:'Save',exact:true}).click();
 await page.getByRole('button',{name:'Reset room'}).click();await expect(page.locator('#inventory-count')).toHaveText('0 ITEMS');
 await page.getByRole('button',{name:'Load',exact:true}).click();await expect(page.locator('#inventory-count')).toHaveText('1 ITEMS');
 await page.getByRole('button',{name:'Look at'}).click();await page.locator('[data-target="chest"]').click();await expect(page.locator('#caption')).toContainText('Bellweather Shoal');
 expect(errors).toEqual([]);
});

test('canvas hotspots, walking and mobile layout',async({page})=>{
 await page.setViewportSize({width:1200,height:1100});await page.goto('/tavern-test.html');await expect(page.locator('#game')).toHaveAttribute('data-ready','true');const canvas=page.locator('canvas');await expect(canvas).toBeVisible();
 await page.getByRole('button',{name:'Look at'}).click();const box=(await canvas.boundingBox())!;
 await canvas.click({position:{x:830/1536*box.width,y:300/1024*box.height}});await expect(page.locator('#caption')).toContainText('thousand possible adventures');
 await page.getByRole('button',{name:'Walk to'}).click();await canvas.click({position:{x:1100/1536*box.width,y:900/1024*box.height}});await page.waitForTimeout(1800);
 await page.getByRole('button',{name:'Save',exact:true}).click();const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('monkey-buisness-save')!).state);expect(saved.x).toBeGreaterThan(1000);
 await page.screenshot({path:'test-results/tavern-desktop.png',fullPage:true});
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:'test-results/tavern-mobile.png',fullPage:true});expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});

test('reject corrupt saves without losing current inventory',async({page})=>{
 await page.goto('/tavern-test.html');await expect(page.locator('#game')).toHaveAttribute('data-ready','true');await expect(page.locator('canvas')).toBeVisible();await page.locator('summary').click();await page.getByRole('button',{name:'Pick up'}).click();await page.locator('[data-target="mug"]').click();
 await page.evaluate(()=>localStorage.setItem('monkey-buisness-save','{"version":1,"state":{"inventory":["bogus"]}}'));
 await page.getByRole('button',{name:'Load',exact:true}).click();await expect(page.locator('#caption')).toContainText('could not be loaded');await expect(page.getByRole('button',{name:'Use Brass tankard',exact:true})).toBeVisible();
});

test('audio toggle, voice sequencing, effects and mute',async({page})=>{
 await page.addInitScript(()=>{
   const events:{src:string;action:string}[]=[];
   (window as any).__audioEvents=events;
   HTMLMediaElement.prototype.play=function(){events.push({src:this.src,action:'play'});if(!this.loop)setTimeout(()=>this.dispatchEvent(new Event('ended')),30);return Promise.resolve();};
   HTMLMediaElement.prototype.pause=function(){events.push({src:this.src,action:'pause'});};
 });
 await page.goto('/tavern-test.html');await expect(page.locator('#game')).toHaveAttribute('data-ready','true');
 expect(await page.evaluate(()=>(window as any).__audioEvents.filter((e:any)=>e.action==='play').length)).toBe(0);
 await page.getByRole('button',{name:'Sound off',exact:true}).click();
 await expect(page.locator('#sound')).toHaveAttribute('aria-pressed','true');
 await page.locator('summary').click();await page.getByRole('button',{name:'Talk to'}).click();await page.locator('[data-target="keeper"]').click();
 await page.getByRole('button',{name:'What’s in the sea chest?'}).click();
 await expect.poll(async()=>page.evaluate(()=>(window as any).__audioEvents.filter((e:any)=>e.action==='play').map((e:any)=>e.src.split('/').pop()).slice(-2).map((s:string)=>s.split('-')[0]).join(','))).toBe('nell,mara');
 await page.getByRole('button',{name:'Close conversation'}).click();await page.getByRole('button',{name:'Pick up'}).click();await page.locator('[data-target="mug"]').click();
 expect(await page.evaluate(()=>(window as any).__audioEvents.some((e:any)=>e.action==='play'&&e.src.includes('pickup-')))).toBe(true);
 await page.getByRole('button',{name:'Sound on',exact:true}).click();await expect(page.locator('#sound')).toHaveAttribute('aria-pressed','false');
 const count=await page.evaluate(()=>(window as any).__audioEvents.filter((e:any)=>e.action==='play').length);
 await page.getByRole('button',{name:'Talk to'}).click();await page.locator('[data-target="navigator"]').click();await page.waitForTimeout(100);
 expect(await page.evaluate(()=>(window as any).__audioEvents.filter((e:any)=>e.action==='play').length)).toBe(count);
});

test('all shipped audio files decode in the browser',async({page})=>{
 test.setTimeout(90000);
 const {readFile}=await import('node:fs/promises');
 const manifest=JSON.parse(await readFile('src/audio-manifest.json','utf8'));
 const files=Object.values({...manifest.speech,...manifest.effects}) as string[];
 await page.goto('/tavern-test.html');
 const decoded=await page.evaluate(async(files)=>{
   const context=new AudioContext();const results=[];
   for(const file of files){const response=await fetch(`/audio/${file}`);if(!response.ok)throw Error(`Missing audio ${file}`);const decoded=await context.decodeAudioData(await response.arrayBuffer());results.push(decoded.duration);}
   await context.close();return results;
 },files);
 expect(decoded).toHaveLength(files.length);expect(decoded.every(n=>n>0.2&&Number.isFinite(n))).toBe(true);
});
