import {test,expect} from '@playwright/test';
import {mapPoints,routePoints,routePath,type MapRoom} from '../src/map-routes';
import {act3Route} from '../src/act3-map';
import {shoal} from '../src/act3-state';
test('every room pair follows the connected traced network and reverses exactly',()=>{
 for(const a of Object.keys(mapPoints) as MapRoom[])for(const b of Object.keys(mapPoints) as MapRoom[]){const points=routePoints(a,b);if(a===b){expect(points).toEqual([]);continue;}expect(points[0]).toEqual(mapPoints[a]);expect(points.at(-1)).toEqual(mapPoints[b]);expect(routePoints(b,a)).toEqual([...points].reverse());}
 expect(routePath('quay','press')).toContain('L 337 583');expect(routePath('office','hall')).toContain('L 337 583');expect(routePath('quay','inlet')).toContain('L 215 175');
});
test('shoal routes reverse and never substitute walking for a sea voyage',()=>{
 for(const a of shoal)for(const b of shoal){const points=(path:string)=>path.match(/[ML] [\d.]+ [\d.]+/g)?.map(p=>p.slice(2))||[];expect(points(act3Route(a,b))).toEqual(points(act3Route(b,a)).reverse());}
 expect(()=>act3Route('inlet','service')).toThrow('Sea crossings');
});
test('Act III illustrated maps animate Nell and automatically arrive on both shores',async({page})=>{
 test.setTimeout(150000);await page.emulateMedia({reducedMotion:'no-preference'});
 for(const [preset,from,to,art] of [['act3-bridge','bridge','landing','story-map-walkways.png'],['act3-service','service','recorder','act3/inspection-map.svg']] as const){
  await page.goto(`/act3.html?debug=${preset}`);await expect(page.locator('#game')).toHaveAttribute('data-ready','true',{timeout:90000});await page.locator('#map').click();await expect(page.locator('.map-picture img')).toHaveAttribute('src',new RegExp(art.replace('.','\\.')));await page.locator(`[data-map-room=${to}]`).click();await expect(page.locator('#travel')).toBeVisible();await expect(page.locator('#route')).toHaveAttribute('d',act3Route(from,to));
  await expect.poll(()=>page.locator('#traveller').getAttribute('cx')).not.toBeNull();const initial=await page.locator('#traveller').getAttribute('cx');await expect.poll(()=>page.locator('#traveller').getAttribute('cx')).not.toBe(initial);await expect(page.locator('#travel')).not.toBeVisible({timeout:10000});await expect.poll(()=>page.evaluate(()=>JSON.parse(localStorage.getItem('monkey-buisness-act3-auto')!).room)).toBe(to);
 }
});
test('Act III reduced-motion map supports keyboard travel, explicit Continue and no cross-shore destinations',async({page})=>{
 test.setTimeout(120000);await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/act3.html?debug=act3-service');await expect(page.locator('#game')).toHaveAttribute('data-ready','true',{timeout:90000});await page.locator('#map').click();await expect(page.locator('[data-map-room]')).toHaveCount(4);await expect(page.locator('[data-map-room=inlet]')).toHaveCount(0);await page.locator('[data-map-room=gallery]').focus();await page.keyboard.press('Enter');await expect(page.locator('#travel')).toBeVisible();await page.locator('#travel-skip').click();await expect.poll(()=>page.evaluate(()=>JSON.parse(localStorage.getItem('monkey-buisness-act3-auto')!).room)).toBe('gallery');await page.goto('/act3.html');await expect(page.locator('#game')).toHaveAttribute('data-ready','true',{timeout:90000});await expect(page.locator('#panel h2')).toHaveText('Caretaker’s Gallery');
});
test('Act I map only offers unlocked destinations and supports marker travel',async({page})=>{
 test.setTimeout(60000);await page.goto('/?debug=act1-tavern');await expect(page.locator('#front')).toBeHidden({timeout:45000});await page.locator('#map').click();await expect(page.locator('[data-map-room]')).toHaveCount(2);await expect(page.locator('[data-map-room=landing]')).toHaveCount(0);await page.locator('[data-map-room=bridge]').click();await expect(page.locator('#travel')).toBeVisible();await page.locator('#travel-skip').click();await expect(page.locator('#game')).toHaveAttribute('data-room','bridge');
 await page.goto('/?debug=act1-landing');await expect(page.locator('#front')).toBeHidden();await page.locator('#map').click();await expect(page.locator('[data-map-room]')).toHaveCount(3);
});
test('Act II markers respect workshop access, fit mobile and trace the bridge route',async({page})=>{
 test.setTimeout(90000);await page.goto('/act2.html?debug=act2-quay');await expect(page.locator('#game')).toHaveAttribute('data-ready','true',{timeout:60000});await page.locator('#map').click();await expect(page.locator('[data-map-room]')).toHaveCount(8);await expect(page.locator('[data-map-room=workshop]')).toHaveCount(0);await page.locator('[data-map-room=press]').click();await expect(page.locator('#route')).toHaveAttribute('d',routePath('quay','press'));await page.screenshot({path:'test-results/traced-quay-press.png'});await page.locator('#travel-skip').click();await expect(page.locator('#game')).toHaveAttribute('data-room','press');
 await page.goto('/act2.html?debug=act2-workshop');await expect(page.locator('#game')).toHaveAttribute('data-ready','true');await page.locator('#map').click();await page.screenshot({path:'test-results/clickable-map-desktop.png',fullPage:true});await page.setViewportSize({width:390,height:844});await expect(page.locator('[data-map-room]')).toHaveCount(9);await expect.poll(async()=>{const boxes=await page.locator('[data-map-room]').evaluateAll(els=>els.map(el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height};}));return boxes.every((a,i)=>boxes.slice(i+1).every(b=>a.x+a.w<=b.x||b.x+b.w<=a.x||a.y+a.h<=b.y||b.y+b.h<=a.y));}).toBe(true);await page.screenshot({path:'test-results/clickable-map-mobile.png',fullPage:true});await page.locator('[data-map-room=hall]').focus();await page.keyboard.press('Enter');await page.locator('#travel-skip').click();await expect(page.locator('#game')).toHaveAttribute('data-room','hall');
});
