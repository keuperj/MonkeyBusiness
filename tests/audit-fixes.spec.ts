import {test,expect,type Page} from '@playwright/test';
import {fresh,AUTO} from '../src/chapter-state';
import {fresh2,AUTO2,SAVE2} from '../src/act2-state';
import {readFileSync} from 'node:fs';
const lines=JSON.parse(readFileSync('src/chapter-lines.json','utf8'));
const manifest=JSON.parse(readFileSync('src/audio-manifest.json','utf8'));
async function target(page:Page,id:string){const details=page.locator('#panel details');if(!await details.evaluate((el:HTMLDetailsElement)=>el.open))await details.locator('summary').click();await page.locator(`[data-target=${id}]`).click();}
async function media(page:Page){await page.addInitScript(()=>{(window as any).__media=[];HTMLMediaElement.prototype.play=function(){(window as any).__media.push({action:'play',src:this.src});if(!this.loop)setTimeout(()=>this.dispatchEvent(new Event('ended')),10);return Promise.resolve();};HTMLMediaElement.prototype.pause=function(){(window as any).__media.push({action:'pause',src:this.src});};});}
test('Act II characters respect verbs and footsteps stop on completion, mute and travel',async({page})=>{
 test.setTimeout(90000);await media(page);await page.goto('/act2.html?debug=act2-press');await expect(page.locator('#game')).toHaveAttribute('data-ready','true',{timeout:60000});
 await page.locator('[data-verb=look]').click();await target(page,'pip');await expect(page.locator('#panel')).toContainText('Ink on one cuff.');await expect(page.locator('[data-topic]')).toHaveCount(0);
 await page.locator('[data-verb=take]').click();await target(page,'pip');await expect(page.locator('#notice')).toContainText('not pocket-sized');await expect(page.locator('[data-topic]')).toHaveCount(0);
 await page.getByRole('button',{name:'Use Old survey',exact:true}).click();await target(page,'pip');await expect(page.locator('#panel')).toContainText('I am keeping the original.');await expect(page.locator('[data-topic]')).toHaveCount(0);
 await page.locator('[data-verb=talk]').click();await target(page,'pip');await expect(page.locator('[data-topic]').first()).toBeVisible();await page.getByRole('button',{name:'Back to the room',exact:true}).click();await page.locator('#sound').click();
 const floor=async()=>{const box=(await page.locator('canvas').boundingBox())!;await page.mouse.click(box.x+900/1536*box.width,box.y+920/1024*box.height);};
 const steps=()=>page.evaluate(()=>(window as any).__media.filter((e:any)=>e.src.includes('footsteps-')));
 await floor();await expect.poll(async()=>(await steps()).some((e:any)=>e.action==='play')).toBe(true);await expect.poll(async()=>(await steps()).at(-1)?.action).toBe('pause');
 await floor();await page.locator('#sound').click();await expect.poll(async()=>(await steps()).at(-1)?.action).toBe('pause');await page.locator('#sound').click();
 await page.locator('[data-verb=walk]').click();await target(page,'pip');await expect(page.locator('[data-topic]')).toHaveCount(0);await page.locator('#map').click();await expect.poll(async()=>(await steps()).at(-1)?.action).toBe('pause');await page.locator('#close-book').click();
 await floor();await page.locator('#room-nav [data-room=quay]').click();await expect.poll(async()=>(await steps()).at(-1)?.action).toBe('pause');await page.locator('#travel-skip').click();
 await page.locator('#motion').click();await page.evaluate(()=>(window as any).__media=[]);await floor();expect((await steps()).some((e:any)=>e.action==='play')).toBe(false);
 await page.locator('#room-nav [data-room=press]').click();await expect(page.locator('#travel-description')).toContainText('Journey complete');await page.locator('#travel-skip').click();await expect(page.locator('#game')).toHaveAttribute('data-room','press');
});
test('old observation notebook entries replay the existing recordings',async({page})=>{
 test.setTimeout(90000);await media(page);const saved=fresh();saved.flags.intro=true;saved.log=Array.from({length:4},(_,i)=>({who:'OBSERVATION',text:lines[`observe${i}`].text}));
 await page.addInitScript(({saved,key})=>localStorage.setItem(key,JSON.stringify(saved)),{saved,key:AUTO});await page.goto('/');await page.locator('#splash-enter').click();await page.locator('#load-game').click();await page.locator(`[data-save=${AUTO}]`).click();await expect(page.locator('#front')).toBeHidden({timeout:60000});await page.locator('#sound').click();await page.locator('#notebook').click();
 for(let i=0;i<4;i++){const line=lines[`observe${i}`],file=manifest.speech[`${line.who}:${line.text}`];await page.locator('.journal-entry').filter({hasText:`OBSERVATION: ${line.text}`}).getByRole('button',{name:'Replay',exact:true}).click();await expect.poll(()=>page.evaluate(file=>(window as any).__media.some((e:any)=>e.action==='play'&&e.src.endsWith(file)),file)).toBe(true);}
});
for(const manual of [false,true])test(`invalid Act II autosave recovers ${manual?'manual save':'fresh game'} without losing save data`,async({page})=>{
 test.setTimeout(90000);const saved=fresh2('press');saved.seen=['A2-INTRO'];
 await page.addInitScript(({saved,auto,save})=>{if(!sessionStorage.getItem('seeded')){sessionStorage.setItem('seeded','true');localStorage.setItem(auto,'broken json');localStorage.setItem(save,JSON.stringify(saved));}},{saved,auto:AUTO2,save:SAVE2});
 await page.goto('/act2.html');await expect(page.locator('#a2-loading-status')).toContainText('autosave is invalid');await expect(page.locator('#a2-retry')).toBeHidden();expect(await page.evaluate(k=>localStorage.getItem(k),AUTO2)).toBe('broken json');
 if(manual){let fail=true;await page.route('**/act2-assets.json',route=>{if(fail){fail=false;return route.fulfill({status:503,body:'Unavailable'});}return route.continue();});}
 await page.locator(manual?'#a2-load-manual':'#a2-start-fresh').click();if(manual){await expect(page.locator('#a2-retry')).toBeVisible();expect(await page.evaluate(k=>localStorage.getItem(k),AUTO2)).toBe('broken json');await page.locator('#a2-retry').click();}else await page.locator('#arrival-skip').click({timeout:60000});await expect(page.locator('#game')).toHaveAttribute('data-ready','true',{timeout:60000});await expect(page.locator('#game')).toHaveAttribute('data-room',manual?'press':'quay');
 expect(await page.evaluate(k=>localStorage.getItem(k),`${AUTO2}-recovery`)).toBe('broken json');expect(await page.evaluate(k=>JSON.parse(localStorage.getItem(k)!),SAVE2)).toEqual(saved);
});
test('invalid manual Act II save is not offered as a recovery option',async({page})=>{
 await page.addInitScript(({auto,save})=>{localStorage.setItem(auto,'broken');localStorage.setItem(save,'also broken');},{auto:AUTO2,save:SAVE2});await page.goto('/act2.html');await expect(page.locator('#a2-start-fresh')).toBeVisible();await expect(page.locator('#a2-load-manual')).toHaveCount(0);
});
test('Act II recovery does not overwrite saves if the backup cannot be stored',async({page})=>{
 await page.addInitScript(({auto})=>{localStorage.setItem(auto,'broken');const original=Storage.prototype.setItem;Storage.prototype.setItem=function(key,value){if(key===`${auto}-recovery`)throw new DOMException('Storage full','QuotaExceededError');return original.call(this,key,value);};},{auto:AUTO2});await page.goto('/act2.html');await page.locator('#a2-start-fresh').click();await expect(page.locator('#a2-loading-status')).toContainText('Could not back up');expect(await page.evaluate(k=>localStorage.getItem(k),AUTO2)).toBe('broken');await expect(page.locator('#game')).not.toHaveAttribute('data-ready','true');
});
// These scenarios explicitly exercise enabling sound from a saved mute preference.
test.beforeEach(async({page})=>{await page.addInitScript(()=>{if(sessionStorage.getItem("monkey-buisness-sound")===null)sessionStorage.setItem("monkey-buisness-sound","false");});});
