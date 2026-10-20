import {test,expect} from '@playwright/test';
import {fresh,AUTO} from '../src/chapter-state';
import {readFileSync} from 'node:fs';
const duel=JSON.parse(readFileSync('src/duel.json','utf8'));
test('crossing idle pose and persistent duel scores',async({page})=>{
 const save=fresh();save.room='bridge';save.flags.intro=true;
 await page.addInitScript(({save,key})=>{if(!localStorage.getItem(key))localStorage.setItem(key,JSON.stringify(save));},{save,key:AUTO});await page.emulateMedia({reducedMotion:'reduce'});
 const load=async()=>{await page.goto('/');await page.locator('#splash-enter').click();await page.locator('#load-game').click();await page.locator(`[data-save="${AUTO}"]`).click();await expect(page.locator('#game')).toHaveAttribute('data-ready','true');};
 await load();await expect(page.locator('#duel-score')).toBeHidden();await page.screenshot({path:'test-results/quibble-idle.png',fullPage:true});
 await page.locator('#challenge-duel').click();await expect(page.locator('#duel-score')).toBeVisible();await expect(page.locator('#nell-score')).toHaveText('0');await expect(page.locator('#pirate-score')).toHaveText('0');
 await page.getByRole('button',{name:duel.rounds[0].answers[duel.rounds[0].correct],exact:true}).click();await expect(page.locator('#nell-score')).toHaveText('1');await expect(page.locator('#duel-next')).toBeEnabled();await load();await expect(page.locator('#nell-score')).toHaveText('1');await page.locator('#duel-next').click();await expect(page.locator('#round-count')).toHaveText('EXCHANGE 2 / 5');
 await page.getByRole('button',{name:duel.rounds[1].answers[(duel.rounds[1].correct+1)%3],exact:true}).click();await expect(page.locator('#pirate-score')).toHaveText('1');await expect(page.locator('#duel-next')).toBeEnabled();await page.setViewportSize({width:390,height:844});await page.screenshot({path:'test-results/duel-score-mobile.png',fullPage:true});expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
 await page.getByRole('button',{name:'Leave the duel',exact:true}).click();await expect(page.locator('#duel-score')).toBeHidden();await page.locator('#challenge-duel').click();await expect(page.locator('#nell-score')).toHaveText('0');await expect(page.locator('#pirate-score')).toHaveText('0');
});
