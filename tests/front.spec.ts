import { test, expect } from '@playwright/test';
import { routePoints, routePath } from '../src/map-routes';
import { fresh, AUTO, SAVE } from '../src/chapter-state';

test('splash, menu, animated intro, pause and natural finish',async({page})=>{
 test.setTimeout(65000);const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');await expect(page.locator('#splash')).toBeVisible();await expect(page.locator('.chapter-shell')).toHaveAttribute('inert','');
 expect(await page.evaluate(k=>localStorage.getItem(k),AUTO)).toBeNull();await page.screenshot({path:'test-results/splash-desktop.png'});
 await page.locator('#splash-enter').click();await expect(page.locator('#start-menu')).toBeVisible();await page.screenshot({path:'test-results/start-menu.png'});
 await page.locator('#load-game').click();await expect(page.locator('#front-status')).toContainText('No saved adventure');await page.getByRole('button',{name:'Back',exact:true}).click();
 await page.locator('#start-game').click();await expect(page.locator('#intro')).toHaveAttribute('data-beat','0');
 const before=await page.locator('#intro-image').evaluate(el=>getComputedStyle(el).transform);await page.waitForTimeout(200);expect(await page.locator('#intro-image').evaluate(el=>getComputedStyle(el).transform)).not.toBe(before);
 await page.locator('#intro-pause').click();await page.waitForTimeout(100);const width=await page.locator('#intro-progress').evaluate(el=>el.style.width);await page.waitForTimeout(300);expect(await page.locator('#intro-progress').evaluate(el=>el.style.width)).toBe(width);await page.locator('#intro-pause').click();
 await page.screenshot({path:'test-results/intro-desktop.png'});
 await expect(page.locator('#intro')).toHaveAttribute('data-beat','1',{timeout:20000});await expect(page.locator('#intro')).toHaveAttribute('data-beat','2',{timeout:20000});await expect(page.locator('#front')).not.toBeVisible({timeout:20000});
 await expect(page.locator('#panel')).toContainText("I'm looking for surveying work.");expect(errors).toEqual([]);
});

test('skip cancels the intro and preserves the manual save; load bypasses intro',async({page})=>{
 const save=fresh();save.flags.intro=true;save.flags.mugTaken=true;save.room='bridge';
 await page.addInitScript(({save,AUTO,SAVE})=>{localStorage.setItem(AUTO,JSON.stringify(save));localStorage.setItem(SAVE,JSON.stringify(save));},{save,AUTO,SAVE});
 await page.goto('/');await page.locator('#splash-enter').click();expect(await page.evaluate(k=>JSON.parse(localStorage.getItem(k)!).room,AUTO)).toBe('bridge');
 await page.locator('#load-game').click();await page.locator(`[data-save="${AUTO}"]`).click();await expect(page.locator('#game')).toHaveAttribute('data-room','bridge');await expect(page.locator('#front')).not.toBeVisible();await expect(page.getByRole('button',{name:'Use Brass tankard',exact:true})).toBeVisible();
 await page.locator('#main-menu').click();await page.locator('#start-game').click();await expect(page.locator('#front-status')).toContainText('manual save is kept');await page.getByRole('button',{name:'Start new adventure',exact:true}).click();await page.locator('#intro-next').click();await expect(page.locator('#intro')).toHaveAttribute('data-beat','1');await page.locator('#intro-skip').click();await expect(page.locator('#game')).toHaveAttribute('data-room','tavern');
 expect(await page.evaluate(k=>JSON.parse(localStorage.getItem(k)!).flags.mugTaken,AUTO)).toBe(false);expect(await page.evaluate(k=>JSON.parse(localStorage.getItem(k)!).flags.mugTaken,SAVE)).toBe(true);
 await page.waitForTimeout(500);await expect(page.locator('#front')).not.toBeVisible();await page.locator('#main-menu').click();await page.locator('#load-game').click();await page.locator(`[data-save="${SAVE}"]`).click();await expect(page.locator('#game')).toHaveAttribute('data-room','bridge');
});

test('mobile title flow, invalid save and reduced-motion intro',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.emulateMedia({reducedMotion:'reduce'});await page.addInitScript(k=>localStorage.setItem(k,'{broken'),AUTO);
 await page.goto('/');await page.screenshot({path:'test-results/splash-mobile.png'});await page.locator('#splash-enter').click();await page.locator('#load-game').click();await expect(page.locator('#front-status')).toContainText('No valid save');await page.getByRole('button',{name:'Back',exact:true}).click();await page.screenshot({path:'test-results/menu-mobile.png'});
 await page.locator('#start-game').click();await page.getByRole('button',{name:'Start new adventure',exact:true}).click();await expect(page.locator('#intro-image')).toBeVisible();expect(await page.locator('#intro-image').evaluate(el=>el.getAnimations().length)).toBe(0);await page.screenshot({path:'test-results/intro-mobile.png'});expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBe(390);await page.keyboard.press('Escape');await expect(page.locator('#front')).not.toBeVisible();
});

test('travel routes trace lanes and bridge, and reverse along the same walkway',()=>{
 for(const [from,to] of [['tavern','bridge'],['bridge','landing'],['tavern','landing']] as const){const points=routePoints(from,to);expect(points.length).toBeGreaterThan(8);expect(routePoints(to,from)).toEqual([...points].reverse());const distance=points.slice(1).reduce((sum,p,i)=>sum+Math.hypot(p[0]-points[i][0],p[1]-points[i][1]),0);const [first,last]=[points[0],points[points.length-1]];expect(distance).toBeGreaterThan(Math.hypot(first[0]-last[0],first[1]-last[1])*1.1);}
 expect(routePath('tavern','landing')).toContain('L 337 583');expect(routePoints('tavern','tavern')).toEqual([]);
});
