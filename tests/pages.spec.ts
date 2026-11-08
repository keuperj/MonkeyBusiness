import {test,expect} from '@playwright/test';
import {readFileSync,existsSync} from 'node:fs';
import {resolve,dirname} from 'node:path';

test('landing documentation links and images resolve locally',()=>{
 for(const file of ['README.md','docs/INSTALLATION.md','docs/DEVELOPMENT.md','docs/PAGES.md']){
  const text=readFileSync(resolve(file),'utf8');
  const links=[...text.matchAll(/\]\(([^)]+)\)|src="([^"]+)"/g)].map(m=>m[1]||m[2]);
  for(const link of links.filter(x=>!/^https?:|^#/.test(x)))expect(existsSync(resolve(dirname(file),link.split('#')[0])),`${file}: ${link}`).toBe(true);
 }
});

for(const width of [1440,390])test(`Pages landing at ${width}px: images, navigation and no overflow`,async({page})=>{
 await page.setViewportSize({width,height:1000});await page.emulateMedia({reducedMotion:'reduce'});
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/docs/index.html');
 await expect(page).toHaveTitle(/Monkey Buisness/);
 await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'Skip to the adventure'})).toBeFocused();
 await page.keyboard.press('Enter');await expect(page).toHaveURL(/#main$/);
 for(const img of await page.locator('img').all()){
  await img.scrollIntoViewIfNeeded();await expect.poll(()=>img.evaluate((el:HTMLImageElement)=>el.complete&&el.naturalWidth>0)).toBe(true);
  expect(await img.getAttribute('alt')).toBeTruthy();
 }
 expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
 expect(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
 expect(await page.locator('.card').first().evaluate(el=>getComputedStyle(el).color)).toBe('rgb(48, 36, 25)');
 await page.getByRole('link',{name:'Screenshots',exact:true}).click();await expect(page).toHaveURL(/#gallery$/);
 await page.screenshot({path:`test-results/pages-${width}.png`,fullPage:true});
 expect(errors).toEqual([]);
});