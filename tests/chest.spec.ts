import {test,expect} from '@playwright/test';
import {fresh,AUTO,parseSave} from '../src/chapter-state';

test('old saves migrate and contradictory chest progress is rejected',()=>{
 const old=fresh();old.flags.mugTaken=true;old.flags.returned=true;old.flags.chart=true;delete (old.flags as any).chestOpen;
 expect(parseSave(JSON.stringify(old)).flags.chestOpen).toBe(true);
 const invalid=fresh();invalid.flags.chart=true;expect(()=>parseSave(JSON.stringify(invalid))).toThrow();
});

test('open chest survives reload, survey can be picked up only once',async({page})=>{
 const save=fresh();save.flags.intro=true;save.flags.mugTaken=true;save.flags.returned=true;save.flags.chestOpen=true;
 await page.addInitScript(({save,key})=>{if(!localStorage.getItem(key))localStorage.setItem(key,JSON.stringify(save));},{save,key:AUTO});
 const load=async()=>{await page.goto('/');await page.locator('#splash-enter').click();await page.locator('#load-game').click();await page.locator(`[data-save="${AUTO}"]`).click();await expect(page.locator('#game')).toHaveAttribute('data-ready','true');};
 await load();await page.locator('#panel summary').click();await expect(page.locator('[data-target=survey]')).toBeVisible();await expect(page.getByRole('button',{name:'Use Brass key',exact:true})).toHaveCount(0);await expect(page.getByRole('button',{name:'Use Old survey',exact:true})).toHaveCount(0);
 await page.screenshot({path:'test-results/chest-open-with-survey.png',fullPage:true});
 await page.locator('[data-verb=take]').click();const canvas=page.locator('canvas');const box=(await canvas.boundingBox())!;await canvas.click({position:{x:360/1536*box.width,y:657/1024*box.height}});
 await expect(page.getByRole('button',{name:'Use Old survey',exact:true})).toBeVisible();await expect(page.locator('[data-target=survey]')).toHaveCount(0);
 await load();await expect(page.getByRole('button',{name:'Use Old survey',exact:true})).toBeVisible();await expect(page.locator('[data-target=survey]')).toHaveCount(0);
 await page.screenshot({path:'test-results/chest-open-empty.png',fullPage:true});
});
