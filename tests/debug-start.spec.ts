import {test,expect} from '@playwright/test';
import {readFileSync} from 'node:fs';
import {debugState3} from '../src/act3-debug';
import {fresh3,parse3,AUTO3,SAVE3,roomNames3,shoal} from '../src/act3-state';
import type {DebugPreset} from '../src/debug-start';
const config=JSON.parse(readFileSync('public/debug-start.json','utf8')) as {presets:DebugPreset[]};

test('every act has an intro and every Act III room has a valid debug state',()=>{
 for(const act of [1,2,3])expect(config.presets.filter(p=>p.act===act&&p.intro)).toHaveLength(1);
 expect(new Set(config.presets.map(p=>p.id)).size).toBe(config.presets.length);
 for(const room of Object.keys(roomNames3)){
  const p=config.presets.find(p=>p.act===3&&!p.intro&&p.room===room)!;expect(p).toBeTruthy();
  const s=debugState3(p);expect(parse3(JSON.stringify(s)).room).toBe(room);expect(s.flags.confessionHeard).toBe(true);expect(s.boat).toBe(shoal.includes(s.room)?'service':'inlet');
 }
 expect(debugState3(config.presets.find(p=>p.id==='act3-intro')!)).toEqual(fresh3());
});

async function launch(page:import('@playwright/test').Page,act:number,id:string){
 await page.goto('/');await page.locator('#splash-enter').click();await page.locator('#debug-start summary').click();await page.locator('#debug-act').selectOption(String(act));await page.locator('#debug-room').selectOption(id);await page.locator('#debug-launch').click();
}
test.beforeEach(async({page})=>{await page.emulateMedia({reducedMotion:'reduce'});await page.addInitScript(()=>sessionStorage.setItem('monkey-buisness-sound','false'));});
test('disabled debug menu stays hidden and reappears after enabling and reloading',async({page})=>{
 let enabled=false;
 await page.route('**/debug-start.json',route=>route.fulfill({json:{enabled,presets:config.presets}}));
 await page.goto('/');await page.locator('#splash-enter').click();
 await expect(page.locator('#start-game')).toBeEnabled();
 await expect(page.locator('#debug-start')).toBeHidden();
 await expect(page.locator('#load-game')).toBeVisible();
 enabled=true;
 await page.reload();await page.locator('#splash-enter').click();
 await expect(page.locator('#debug-start')).toBeVisible();
 await page.locator('#debug-start summary').click();
 await expect(page.locator('#debug-launch')).toBeVisible();
});
for(const act of [1,2,3])test(`debug menu starts Act ${act} intro instead of resuming`,async({page})=>{
 test.setTimeout(120000);
 await page.addInitScript(({auto,manual})=>{localStorage.setItem(auto,'old autosave');localStorage.setItem(manual,'manual sentinel');},{auto:act===1?'monkey-buisness-act1-auto':`monkey-buisness-act${act}-auto`,manual:act===1?'monkey-buisness-act1-save':`monkey-buisness-act${act}-save`});
 await launch(page,act,`act${act}-intro`);
 if(act===1){await expect(page.locator('#intro')).toBeVisible({timeout:90000});await expect(page.locator('#intro')).toHaveAttribute('data-beat','0');}
 if(act===2){await expect(page.locator('#act-arrival')).toBeVisible({timeout:90000});await page.locator('#arrival-skip').click();await expect(page.locator('#game')).toHaveAttribute('data-ready','true');}
 if(act===3){await expect(page.locator('#game')).toHaveAttribute('data-ready','true',{timeout:90000});await expect(page.locator('#panel')).toContainText('I gave Vane a working copy');expect(await page.evaluate(k=>JSON.parse(localStorage.getItem(k)!).flags.confessionHeard,AUTO3)).toBe(false);}
 const manual=act===1?'monkey-buisness-act1-save':`monkey-buisness-act${act}-save`;expect(await page.evaluate(k=>localStorage.getItem(k),manual)).toBe('manual sentinel');
});
test('Act III recorder debug start routes correctly and preserves manual and earlier saves',async({page})=>{
 test.setTimeout(120000);await page.addInitScript(({auto,manual})=>{localStorage.setItem(auto,'broken autosave');localStorage.setItem(manual,'manual sentinel');localStorage.setItem('monkey-buisness-act2-auto','earlier sentinel');},{auto:AUTO3,manual:SAVE3});await launch(page,3,'act3-recorder');await expect(page).toHaveURL(/act3\.html\?debug=act3-recorder/);await expect(page.locator('#game')).toHaveAttribute('data-ready','true',{timeout:90000});await expect(page.locator('#room-title')).toHaveAttribute('data-room','recorder');const s=parse3(await page.evaluate(k=>localStorage.getItem(k)!,AUTO3));expect(s.boat).toBe('service');expect(s.flags.diagramRead).toBe(true);expect(s.flags.recordCopied).toBe(false);expect(await page.evaluate(k=>localStorage.getItem(k),SAVE3)).toBe('manual sentinel');expect(await page.evaluate(()=>localStorage.getItem('monkey-buisness-act2-auto'))).toBe('earlier sentinel');
});
test('disabled and unknown Act III debug starts never overwrite saves',async({page})=>{
 const original=JSON.stringify(fresh3());await page.addInitScript(({key,original})=>localStorage.setItem(key,original),{key:AUTO3,original});await page.route('**/debug-start.json',route=>route.fulfill({json:{enabled:false,presets:config.presets}}));await page.goto('/act3.html?debug=act3-recorder');await expect(page.locator('#a3-loading-status')).toContainText('disabled or unknown');expect(await page.evaluate(k=>localStorage.getItem(k),AUTO3)).toBe(original);await page.unroute('**/debug-start.json');await page.goto('/act3.html?debug=unknown');await expect(page.locator('#a3-loading-status')).toContainText('disabled or unknown');expect(await page.evaluate(k=>localStorage.getItem(k),AUTO3)).toBe(original);
});