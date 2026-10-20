import {test,expect,type Page} from '@playwright/test';
import {readFileSync} from 'node:fs';
const duel=JSON.parse(readFileSync('src/duel.json','utf8'));
const auto='monkey-buisness-act1-auto';
async function progress(page:Page){return page.evaluate(k=>JSON.parse(localStorage.getItem(k)!),auto);}
async function start(page:Page){await page.goto('/');await page.locator('#splash-enter').click();await page.locator('#start-game').click();await page.locator('#intro-skip').click();await expect(page.locator('#game')).toHaveAttribute('data-ready','true');}
async function resume(page:Page){await page.locator('#splash-enter').click();await page.locator('#load-game').click();await page.locator('[data-save="monkey-buisness-act1-auto"]').click();await expect(page.locator('#front')).not.toBeVisible();}
async function target(page:Page,id:string){const details=page.locator('#panel details');if(!await details.getAttribute('open')){if(!await details.evaluate(el=>(el as HTMLDetailsElement).open))await details.locator('summary').click();}await page.locator(`[data-target="${id}"]`).click();}
async function verb(page:Page,id:string){await page.locator(`[data-verb="${id}"]`).click();}
async function travel(page:Page,name:string,room:string){await page.locator('#room-nav').getByRole('button',{name,exact:true}).click();await expect(page.locator('#travel')).toBeVisible();await expect(page.locator('#route')).toHaveAttribute('d',/^M /);expect(await page.locator('#route').evaluate(el=>(el as unknown as SVGPathElement).getTotalLength())).toBeGreaterThan(0);await page.locator('#travel-skip').click();await expect(page.locator('#game')).toHaveAttribute('data-room',room);}
async function chart(page:Page){await verb(page,'take');await target(page,'mug');await page.getByRole('button',{name:'Use Brass tankard',exact:true}).click();await target(page,'mara');await page.getByRole('button',{name:'Use Brass key',exact:true}).click();await target(page,'chest');await expect(page.getByRole('button',{name:'Use Old survey',exact:true})).toBeVisible();await expect(page.getByRole('button',{name:'Use Brass key',exact:true})).toHaveCount(0);}
async function win(page:Page,all=true){await page.locator('#challenge-duel').click();for(let i=0;i<5;i++){const q=duel.rounds[i];const ix=all||i<3?q.correct:(q.correct+1)%3;await page.getByRole('button',{name:q.answers[ix],exact:true}).click();await expect(page.locator('#duel-next')).toBeEnabled();await page.locator('#duel-next').click();}expect((await progress(page)).flags.passage).toBe(true);}

test('complete Act I with map travel, Easter egg, all puzzles and persistent ending',async({page})=>{
 test.setTimeout(90000);const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));await page.emulateMedia({reducedMotion:'reduce'});await start(page);
 await verb(page,'use');await target(page,'cupboard');expect((await progress(page)).flags.egg).toBe(true);await expect(page.locator('#panel')).toContainText('Six inches. The bucket');
 await chart(page);await travel(page,'Quibble’s Crossing','bridge');await win(page);
 await page.locator('#duel-result-action').click();await expect(page.locator('#travel')).toBeVisible();await page.locator('#travel-skip').click();await expect(page.locator('#game')).toHaveAttribute('data-room','landing');
 await verb(page,'look');await target(page,'board');await target(page,'marks');await page.getByRole('button',{name:'Use Old survey',exact:true}).click();await target(page,'cleat');
 await page.getByRole('button',{name:'Company buoy',exact:true}).click();expect((await progress(page)).flags.compared).toBe(false);
 await page.getByRole('button',{name:'Warehouse corner',exact:true}).click();await page.getByRole('button',{name:'Lighthouse notch',exact:true}).click();expect((await progress(page)).flags.compared).toBe(true);
 await verb(page,'use');await target(page,'hook');await target(page,'float');await expect.poll(async()=>(await progress(page)).flags.freed).toBe(true);
 await page.locator('#watch-channel').click();for(let i=0;i<4;i++)await page.locator('#observe-next').click();
 expect((await progress(page)).flags.witnessed).toBe(true);await page.getByRole('button',{name:'Review the evidence',exact:true}).click();
 await page.getByLabel('The company controls the entire sea.',{exact:true}).check();await page.getByRole('button',{name:'Record these observations',exact:true}).click();expect((await progress(page)).flags.evidence).toBe(false);await page.getByLabel('The company controls the entire sea.',{exact:true}).uncheck();
 for(const label of ['The local tide board still indicated ebb.','The signal came immediately before the change in flow.','A company launch used the changed route without hesitation.'])await page.getByLabel(label,{exact:true}).check();
 await page.getByRole('button',{name:'Record these observations',exact:true}).click();await page.getByRole('button',{name:'Choose the next lead',exact:true}).click();await page.getByRole('button',{name:'Ask who else has seen it',exact:true}).click();await expect(page.locator('#panel')).toContainText('End of Act I');
 await page.locator('#save').click();await page.locator('#new-game').click();await page.getByRole('button',{name:'Start fresh',exact:true}).click();await page.locator('#intro-skip').click();expect((await progress(page)).flags.complete).toBe(false);await page.locator('#load').click();expect((await progress(page)).flags.complete).toBe(true);await page.reload();await resume(page);await expect(page.locator('#game')).toHaveAttribute('data-ready','true');expect((await progress(page)).flags.complete).toBe(true);await expect(page.locator('#goal')).toContainText('Act I complete');await page.screenshot({path:'test-results/chapter-landing.png',fullPage:true});expect(errors).toEqual([]);
});

test('bridge first, remembered clues, cooperative coda and save during a duel',async({page})=>{
 test.setTimeout(90000);await page.emulateMedia({reducedMotion:'reduce'});await start(page);await travel(page,'Quibble’s Crossing','bridge');await page.locator('#challenge-duel').click();
 const q=duel.rounds[0];await page.getByRole('button',{name:q.answers[q.correct],exact:true}).click();await expect(page.locator('#duel-next')).toBeEnabled();await page.locator('#save').click();await page.reload();await resume(page);await expect(page.locator('#game')).toHaveAttribute('data-ready','true');await expect(page.locator('#panel')).toContainText('Nell 1');await page.locator('#duel-next').click();
 for(let i=1;i<5;i++){const r=duel.rounds[i];const ix=i<3?r.correct:(r.correct+1)%3;await page.getByRole('button',{name:r.answers[ix],exact:true}).click();await expect(page.locator('#duel-next')).toBeEnabled();await page.locator('#duel-next').click();}
 await expect(page.locator('#panel')).toContainText('You keep the word. I keep walking.');await travel(page,'Outer Landing','landing');await verb(page,'look');await target(page,'marks');await target(page,'board');await verb(page,'use');await target(page,'hook');await target(page,'float');await expect.poll(async()=>(await progress(page)).flags.freed).toBe(true);
 await travel(page,'The Crooked Compass','tavern');await chart(page);await travel(page,'Outer Landing','landing');await page.getByRole('button',{name:'Compare the old survey',exact:true}).click();await page.getByRole('button',{name:'Warehouse corner',exact:true}).click();await page.getByRole('button',{name:'Lighthouse notch',exact:true}).click();expect((await progress(page)).flags.compared).toBe(true);
 await page.locator('#watch-channel').click();await page.getByRole('button',{name:'Skip animation / read full observation',exact:true}).click();expect((await progress(page)).flags.witnessed).toBe(true);
});

test('red route animates, mobile stays usable, locked exit and invalid saves preserve progress',async({page})=>{
 await page.setViewportSize({width:390,height:844});await start(page);await expect(page.locator('#room-nav').getByRole('button',{name:'Outer Landing',exact:true})).toHaveCount(0);await expect(page.locator('#travel')).not.toBeVisible();expect((await progress(page)).room).toBe('tavern');
 await page.locator('#room-nav').getByRole('button',{name:'Quibble’s Crossing',exact:true}).click();await expect(page.locator('#travel')).toBeVisible();const before=await page.locator('#route').evaluate(el=>Number((el as SVGElement).style.strokeDashoffset));await page.waitForTimeout(300);const after=await page.locator('#route').evaluate(el=>Number((el as SVGElement).style.strokeDashoffset));expect(after).toBeLessThan(before);await page.screenshot({path:'test-results/chapter-map-mobile.png',fullPage:true});await page.locator('#travel-skip').click();
 await page.evaluate(()=>localStorage.setItem('monkey-buisness-act1-save','{"version":1,"room":"landing"}'));await page.locator('#load').click();await expect(page.locator('#notice')).toContainText('invalid');expect((await progress(page)).room).toBe('bridge');expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
 await page.locator('#notebook').click();await expect(page.locator('#book')).toBeVisible();await page.locator('#close-book').click();await page.screenshot({path:'test-results/chapter-bridge-mobile.png',fullPage:true});
});

test('every chapter spoken line has a generated audio asset',async()=>{
 const lines=JSON.parse(readFileSync('src/chapter-lines.json','utf8'));const manifest=JSON.parse(readFileSync('src/audio-manifest.json','utf8'));
 for(const line of Object.values(lines) as any[]){const file=manifest.speech[`${line.who}:${line.text}`];expect(file).toBeTruthy();expect(readFileSync(`public/audio/${file}`).byteLength).toBeGreaterThan(1000);}
});

test('canvas interaction, voiced dialogue, automatic travel and animated fencing',async({page})=>{
 test.setTimeout(60000);
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>{(window as any).__clips=[];HTMLMediaElement.prototype.play=function(){(window as any).__clips.push(this.src);if(!this.loop)setTimeout(()=>this.dispatchEvent(new Event('ended')),20);return Promise.resolve();};HTMLMediaElement.prototype.pause=function(){};});
 await start(page);await page.locator('#sound').click();await expect.poll(()=>page.evaluate(()=>(window as any).__clips.some((s:string)=>s.includes('mara-')))).toBe(true);
 await verb(page,'take');const box=(await page.locator('canvas').boundingBox())!;await page.mouse.click(box.x+790/1536*box.width,box.y+468/1024*box.height);expect((await progress(page)).flags.mugTaken).toBe(true);
 await page.locator('#room-nav').getByRole('button',{name:'Quibble’s Crossing',exact:true}).click();await expect(page.locator('#travel')).toBeVisible();await expect(page.locator('#game')).toHaveAttribute('data-room','bridge',{timeout:10000});
 await page.locator('#challenge-duel').click();const q=duel.rounds[0];await page.getByRole('button',{name:q.answers[q.correct],exact:true}).click();await expect(page.locator('#duel-next')).toBeEnabled();await page.screenshot({path:'test-results/chapter-fencing.png',fullPage:true});
 await page.getByRole('button',{name:'Leave the duel',exact:true}).click();expect((await progress(page)).duel.active).toBe(false);
 await page.locator('#sound').click();await expect(page.locator('#sound')).toHaveAttribute('aria-pressed','false');expect(errors).toEqual([]);
});
