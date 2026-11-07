import {test,expect} from '@playwright/test';
import {floorPoint} from '../src/walkable-floor';

test('departure notice is printed on the board and its visible face is clickable',async({page})=>{
 test.setTimeout(120000);await page.setViewportSize({width:1440,height:1000});await page.emulateMedia({reducedMotion:'reduce'});
 await page.addInitScript(()=>sessionStorage.setItem('monkey-buisness-sound','false'));
 await page.route('**/src/act3-scene.ts',async route=>{const r=await route.fetch();await route.fulfill({response:r,body:await r.text()+`\nconst renderForTest=Act3Scene.prototype.render;Act3Scene.prototype.render=function(...args){const result=renderForTest.apply(this,args);window.__floorScene=this;return result;};`});});
 await page.goto('/act3.html?debug=act3-bridge');await expect(page.locator('#game')).toHaveAttribute('data-ready','true',{timeout:90000});
 await page.locator('#map').click();await page.locator('[data-map-room=landing]').click();await page.locator('#travel-skip').click();await page.locator('[data-verb=look]').click();
 const notice=await page.evaluate(()=>{const scene=(window as any).__floorScene;const text=scene.children.getByName('departure-board-text');scene.toggle();return {text:text.text,x:text.x,y:text.y,width:text.width,height:text.height};});
 expect(notice.text).toContain('WATCH: EBB');expect(notice.text).toContain('WEST SERVICE');expect(notice.x).toBeGreaterThanOrEqual(175);expect(notice.x+notice.width).toBeLessThanOrEqual(290);expect(notice.y+notice.height).toBeLessThanOrEqual(400);
 const box=(await page.locator('canvas').boundingBox())!;
 await page.mouse.click(box.x+230/1536*box.width,box.y+320/1024*box.height);
 await expect(page.locator('#panel')).toContainText('TODAY’S DEPARTURE WATCH: EBB');
 await expect.poll(()=>page.evaluate(()=>JSON.parse(localStorage.getItem('monkey-buisness-act3-auto')!).flags.departureBoardSeen)).toBe(true);
 await page.screenshot({path:'test-results/departure-board-aligned.png',fullPage:true});
});

test('bridge feet stay on deck and other room floors retain their depth',()=>{
 for(const y of [0,700,745,855,900,1024])expect(floorPoint('bridge',590,y).y).toBeGreaterThanOrEqual(700);
 for(const y of [745,855,900,1024])expect(floorPoint('bridge',590,y).y).toBeLessThanOrEqual(750);
 expect(floorPoint('landing',590,900,800)).toEqual({x:590,y:900});
});
for(const act of [1,2,3,4])test(`Act ${act} bridge spawn and water clicks keep Nell on deck`,async({page})=>{
 test.setTimeout(120000);await page.emulateMedia({reducedMotion:'reduce'});await page.addInitScript(()=>sessionStorage.setItem('monkey-buisness-sound','false'));
 const file=act===1?'chapter-scene':`act${act}-scene`,name=act===1?'ChapterScene':`Act${act}Scene`;
 // Test-only observation of actual Phaser coordinates; do not alter rendering or walking.
 await page.route(`**/src/${file}.ts`,async route=>{const r=await route.fetch();await route.fulfill({response:r,body:await r.text()+`\nconst renderForTest=${name}.prototype.render;${name}.prototype.render=function(...args){const result=renderForTest.apply(this,args);window.__floorScene=this;return result;};`});});
 await page.goto(`/${act===1?'':`act${act}.html`}?debug=act${act}-bridge`);await expect(page.locator('#game')).toHaveAttribute('data-ready','true',{timeout:90000});
 const y=()=>page.evaluate(()=>(window as any).__floorScene.hero.y);await expect.poll(y).toBeLessThanOrEqual(750);
 const box=(await page.locator('canvas').boundingBox())!;await page.mouse.click(box.x+600/1536*box.width,box.y+940/1024*box.height);await page.waitForTimeout(800);expect(await y()).toBeLessThanOrEqual(750);expect(await y()).toBeGreaterThanOrEqual(700);
 await page.screenshot({path:`test-results/bridge-floor-act${act}.png`,fullPage:true});
});
test('Act III Take-mode departure failure is visible and recoverable through sailing',async({page})=>{
 test.setTimeout(180000);await page.setViewportSize({width:1440,height:900});await page.emulateMedia({reducedMotion:'reduce'});await page.addInitScript(()=>sessionStorage.setItem('monkey-buisness-sound','false'));
 await page.goto('/act3.html?debug=act3-bridge');await expect(page.locator('#game')).toHaveAttribute('data-ready','true',{timeout:90000});
 const click=async(name:string)=>page.getByRole('button',{name,exact:true}).click();
 const go=async(room:string)=>{await page.locator('#map').click();await page.locator(`[data-map-room=${room}]`).click();await page.locator('#travel-skip').click();};
 await click('Arrange the harbour watch');await click('Ask both partners to agree');await go('landing');await page.locator('[data-verb=take]').click();await click('Compare departure observations');
 await page.getByLabel('Route',{exact:true}).selectOption('West service approach');await page.getByLabel('Position check',{exact:true}).selectOption('Warehouse corner / lighthouse notch');await page.getByLabel('Departure observation',{exact:true}).selectOption('Today’s west-running ebb');await click('Record departure plan');
 await expect(page.locator('#departure-feedback')).toContainText('Look at, not Pick up');await expect(page.locator('#departure-feedback')).toBeInViewport();
 for(const label of ['Departure tide board','Warehouse corner and lighthouse notch','Tethered float'])await click(`Inspect ${label}`);
 await page.getByLabel('Route',{exact:true}).selectOption('East company approach');await click('Record departure plan');await expect(page.locator('#departure-feedback')).toContainText('west service entrance');
 await page.getByLabel('Route',{exact:true}).selectOption('West service approach');await click('Record departure plan');
 await expect.poll(()=>page.evaluate(()=>JSON.parse(localStorage.getItem('monkey-buisness-act3-auto')!).flags.routeChecked)).toBe(true);
 await page.locator('#save').click();await page.goto('/act3.html');await expect(page.locator('#game')).toHaveAttribute('data-ready','true',{timeout:90000});await go('inlet');await click('Review departure checklist');await click('Sail to Bellweather Shoal');await click('Confirm voyage');await page.locator('#travel-skip').click();
 await expect(page.locator('#room-title')).toHaveAttribute('data-room','service');
});