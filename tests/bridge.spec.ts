import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
const duel=JSON.parse(readFileSync('src/duel.json','utf8'));

test('win all five word exchanges, including the parrot, and retry',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/bridge.html');await expect(page.locator('#game')).toHaveAttribute('data-ready','true');
 await page.getByRole('button',{name:'En garde… grammatically.'}).click();
 for(let i=0;i<duel.rounds.length;i++){
  const q=duel.rounds[i];await expect(page.locator('#challenge')).toHaveText(q.insult);
  await page.getByRole('button',{name:q.answers[q.correct],exact:true}).click();
  await expect(page.locator('#nell-score')).toHaveText(String(i+1));
  await expect(page.locator('#next')).toBeEnabled();
  if(i===1)await page.screenshot({path:'test-results/bridge-desktop.png',fullPage:true});
  await page.locator('#next').click();
 }
 await expect(page.locator('#result-title')).toHaveText('A victory of pointed remarks.');
 await page.locator('#retry').click();await expect(page.locator('#nell-score')).toHaveText('0');await expect(page.locator('#briefing')).toBeVisible();expect(errors).toEqual([]);
});

test('wrong answers teach the joke and lead to a recoverable loss',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.setViewportSize({width:390,height:844});
 await page.goto('/bridge.html');await expect(page.locator('#game')).toHaveAttribute('data-ready','true');await expect(page.locator('#motion')).toHaveAttribute('aria-pressed','true');
 await page.locator('#begin').click();
 for(const q of duel.rounds){await page.getByRole('button',{name:q.answers[(q.correct+1)%3],exact:true}).click();await expect(page.locator('#explanation')).toContainText(q.hint);await page.locator('#next').click();}
 await expect(page.locator('#result-title')).toHaveText('Out-argued. Never out of ideas.');
 await expect(page.locator('#pirate-score')).toHaveText('5');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
 await page.screenshot({path:'test-results/bridge-mobile.png',fullPage:true});await page.locator('#retry').click();await expect(page.locator('#briefing')).toBeVisible();
});

test('tavern travel keeps inventory and restart cancels an exchange',async({page})=>{
 await page.goto('/');await expect(page.locator('#game')).toHaveAttribute('data-ready','true');await page.locator('summary').click();await page.getByRole('button',{name:'Pick up'}).click();await page.locator('[data-target="mug"]').click();await page.locator('#bridge-link').click();
 await expect(page.locator('#game')).toHaveAttribute('data-ready','true');await page.locator('#begin').click();await page.getByRole('button',{name:duel.rounds[0].answers[0],exact:true}).click();await page.locator('#restart').click();await page.waitForTimeout(1100);await expect(page.locator('#briefing')).toBeVisible();await expect(page.locator('#nell-score')).toHaveText('0');
 await page.getByRole('link',{name:'← Back to the tavern'}).click();await expect(page.locator('#game')).toHaveAttribute('data-ready','true');await expect(page.getByRole('button',{name:'Use Brass tankard',exact:true})).toBeVisible();
});
