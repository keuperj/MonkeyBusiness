import {test,expect} from '@playwright/test';
import {mkdirSync} from 'node:fs';
import {resolve} from 'node:path';

test('capture clean README and Pages gameplay screenshots',async({page})=>{
 test.skip(process.env.CAPTURE_PROMO!=='1','Opt-in: writes committed promotional images.');
 test.setTimeout(120000);
 await page.setViewportSize({width:1440,height:1000});
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.addInitScript(()=>sessionStorage.setItem('monkey-buisness-sound','false'));
 const dir=resolve('docs/assets/screenshots');mkdirSync(dir,{recursive:true});
 const capture=async(name:string)=>{await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:resolve(dir,`${name}.jpg`),type:'jpeg',quality:88,fullPage:true});};
 await page.goto('/?debug=act1-bridge');
 await expect(page.locator('#game')).toHaveAttribute('data-ready','true',{timeout:90000});
 await page.locator('#challenge-duel').click();
 await expect(page.locator('canvas')).toBeVisible();
 await capture('sword-fight');
 await page.goto('/act2.html?debug=act2-hall');
 await expect(page.locator('#game')).toHaveAttribute('data-ready','true',{timeout:90000});
 await page.locator('#house-open').click();
 await expect(page.getByLabel('Heater',{exact:true})).toBeVisible();
 await capture('puzzle');
 await page.locator('#map').click();
 await expect(page.locator('#book')).toBeVisible();
 await capture('map');
});