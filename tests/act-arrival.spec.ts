import {test,expect} from '@playwright/test';
import {readFileSync} from 'node:fs';
const plans=JSON.parse(readFileSync('src/act-arrivals.json','utf8'));
const manifest=JSON.parse(readFileSync('src/act2-audio-manifest.json','utf8'));

test('Act I city and rooms reveal before arrival; reduced motion and skip are supported',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.setViewportSize({width:390,height:844});
 await page.goto('/');await page.locator('#splash-enter').click();await page.locator('#start-game').click();await page.locator('#intro-skip').click();
 const intro=page.locator('#act-arrival');await expect(intro).toHaveAttribute('data-step','0');await expect(intro).toContainText('Welcome to Brindle Quay');
 await expect(intro.locator('.revealed')).toHaveCount(0);await expect(page.locator('.chapter-shell')).toHaveAttribute('inert','');
 await page.locator('#arrival-next').click();await expect(intro.locator('[data-room="tavern"]')).toHaveClass(/revealed/);
 await page.locator('#arrival-next').click();await expect(intro.locator('.revealed')).toHaveCount(2);
 await page.locator('#arrival-next').click();await expect(intro).toHaveAttribute('data-phase','arrival');await expect(intro.locator('[data-room="tavern"]')).toHaveClass(/current/);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBe(390);await page.screenshot({path:'test-results/act1-map-arrival-mobile.png'});
 await expect(intro).toHaveCount(0,{timeout:15000});await expect(page.locator('#panel')).toContainText("I'm looking for surveying work.");
});

test('Act II reveals venues with real narration, cancels it on skip, and resumes without replay',async({page})=>{
 test.setTimeout(90000);
 await page.addInitScript(()=>{(window as any).__voices=[];const original=HTMLMediaElement.prototype.play;HTMLMediaElement.prototype.play=function(){(window as any).__voices.push(this);return original.call(this);};});
 await page.goto('/act2.html?new=1');const intro=page.locator('#act-arrival');await expect(intro).toBeVisible({timeout:60000});
 await expect(intro.locator('.revealed')).toHaveCount(4);await expect(intro.locator('[data-room="workshop"]')).toHaveCount(0);
 await page.locator('#arrival-sound').click();const clip=manifest.speech[`NELL:${plans['2'].venues[0].text}` as keyof typeof manifest.speech];expect(clip).toBeTruthy();
 await expect.poll(()=>page.evaluate(file=>(window as any).__voices.some((a:HTMLAudioElement)=>a.src.endsWith(file)&&a.currentTime>0&&!a.paused),clip)).toBe(true);
 await page.locator('#arrival-next').click();await expect(intro.locator('[data-room="press"]')).toHaveClass(/revealed/);
 await page.screenshot({path:'test-results/act2-map-reveal.png'});await page.locator('#arrival-skip').click();
 await expect(page.locator('#game')).toHaveAttribute('data-ready','true');await expect.poll(()=>page.evaluate(file=>(window as any).__voices.filter((a:HTMLAudioElement)=>a.src.endsWith(file)).every((a:HTMLAudioElement)=>a.paused),clip)).toBe(true);
 await expect(page.locator('#panel')).toContainText('Right, Nell. Take stock.');await page.goto('/act2.html');await expect(page.locator('#game')).toHaveAttribute('data-ready','true');await expect(intro).toHaveCount(0);
});

// These scenarios explicitly exercise enabling sound from a saved mute preference.
test.beforeEach(async({page})=>{await page.addInitScript(()=>{if(sessionStorage.getItem("monkey-buisness-sound")===null)sessionStorage.setItem("monkey-buisness-sound","false");});});
