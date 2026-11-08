import {test,expect} from '@playwright/test';
import {readFileSync,existsSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {execFileSync} from 'node:child_process';

test('Pages installation guide stays synchronized with Markdown',()=>{
 execFileSync('python3',[resolve('scripts/generate-install-page.py'),'--check']);
});

for(const width of [1440,390,320])test(`Pages installation at ${width}px: navigation, commands and layout`,async({page})=>{
 await page.setViewportSize({width,height:1000});
 await page.emulateMedia({reducedMotion:'reduce'});
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/docs/index.html');
 await expect(page.locator('a[href="install.html"]')).toHaveCount(3);
 await page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'Install & play'}).click();
 await expect(page).toHaveURL(/\/docs\/install.html$/);
 await expect(page).toHaveTitle('Install & play — Monkey Buisness');
 await expect(page.locator('h1')).toHaveText('Install & play');
 await expect(page.locator('[aria-current="page"]')).toHaveText('Install & play');
 for(const link of await page.locator('.guide-toc a').all()){
  const href=(await link.getAttribute('href'))!;
  await expect(page.locator(href)).toHaveCount(1);
 }
 const markdown=readFileSync(resolve('docs/INSTALLATION.md'),'utf8');
 const commands=[...markdown.matchAll(/```[^\n]*\n([\s\S]*?)\n```/g)].map(m=>m[1]);
 expect(await page.locator('.guide-body pre code').allTextContents()).toEqual(commands);
 for(const image of await page.locator('img').all()){
  await image.scrollIntoViewIfNeeded();
  await expect.poll(()=>image.evaluate((el:HTMLImageElement)=>el.complete&&el.naturalWidth>0)).toBe(true);
 }
 expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
 await page.getByRole('navigation',{name:'Installation contents'}).getByRole('link',{name:/Run with Docker/}).click();
 await expect(page).toHaveURL(/#run-with-docker/);
 await page.screenshot({path:`test-results/install-${width}.png`,fullPage:true});
 await page.getByRole('link',{name:'Back to the adventure'}).click();
 await expect(page).toHaveURL(/\/docs\/index.html$/);
 expect(errors).toEqual([]);
});

test('landing documentation links and images resolve locally',()=>{
 for(const file of ['README.md','docs/INSTALLATION.md','docs/DEVELOPMENT.md','docs/PAGES.md']){
  const text=readFileSync(resolve(file),'utf8');
  const links=[...text.matchAll(/\]\(([^)]+)\)|src="([^"]+)"/g)].map(m=>m[1]||m[2]);
  for(const link of links.filter(x=>!/^https?:|^#/.test(x)))expect(existsSync(resolve(dirname(file),link.split('#')[0])),`${file}: ${link}`).toBe(true);
 }
});

for(const width of [1440,1024,768,390,320])test(`Pages landing at ${width}px: images, navigation and no overflow`,async({page})=>{
 await page.setViewportSize({width,height:1000});await page.emulateMedia({reducedMotion:'reduce'});
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/docs/index.html');
 await expect(page).toHaveTitle(/Monkey Buisness/);
 await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'Skip to the adventure'})).toBeFocused();
 await page.keyboard.press('Enter');await expect(page).toHaveURL(/#main$/);
 for(const img of await page.locator('img').all()){
  await img.scrollIntoViewIfNeeded();await expect.poll(()=>img.evaluate((el:HTMLImageElement)=>el.complete&&el.naturalWidth>0)).toBe(true);
  expect(await img.getAttribute('alt')).not.toBeNull();
 }
 expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  const status=page.locator('.release-status img');
  await expect(status).toHaveAttribute('src','assets/status-public-beta.png');
  await expect(status).toHaveAttribute('alt',/7 out of 10 — Public beta.*yellow/);
  expect(await status.evaluate((el:HTMLImageElement)=>el.naturalWidth)).toBe(1200);
  expect(await page.locator('.release-status').evaluate(el=>el.previousElementSibling?.textContent)).toBe('Five acts. Yours to explore. Play locally—no account or API key required.');
  await page.locator('.release-status').screenshot({path:`test-results/pages-status-${width}.png`});
 expect(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
  expect(await page.locator('.card').first().evaluate(el=>getComputedStyle(el).color)).toBe('rgb(243, 227, 194)');
  expect(await page.locator('#trailer-image').evaluate((el:HTMLImageElement)=>el.currentSrc)).toContain('trailer-poster.jpg');
  await expect(page.locator('#trailer-toggle')).toBeHidden();
  const logo=(await page.locator('.brand').boundingBox())!;
  const menu=(await page.getByRole('navigation',{name:'Main navigation'}).boundingBox())!;
  const motto=(await page.locator('.masthead-motto').boundingBox())!;
  expect(logo.width).toBeLessThanOrEqual(140);
  expect(logo.x+logo.width).toBeLessThanOrEqual(menu.x);
  expect(motto.y).toBeGreaterThanOrEqual(menu.y+menu.height);
  await expect(page.locator('.masthead-motto')).toContainText('*The parrot disagrees.');
  const trailer=(await page.locator('.trailer').boundingBox())!;
  const screenshot=(await page.locator('.gallery figure').first().boundingBox())!;
  expect(trailer.width).toBeLessThanOrEqual(960);
  expect(trailer.width).toBeCloseTo(screenshot.width,0);
  expect(trailer.x).toBeCloseTo(screenshot.x,0);
   const heading=(await page.locator('.hero-heading').boundingBox())!;
   expect(trailer.y+trailer.height).toBeLessThanOrEqual(heading.y);
   await expect(page.locator('.brand img')).toHaveAttribute('src','assets/game-logo-transparent.png');
   expect(await page.locator('.brand').evaluate(el=>getComputedStyle(el).boxShadow)).toBe('none');
   const footerLogo=(await page.locator('.footer-logo').boundingBox())!;
   expect(footerLogo.width).toBeGreaterThan(logo.width);
   expect(footerLogo.x+footerLogo.width/2).toBeCloseTo(width/2,0);
   expect(await page.locator('footer').evaluate(el=>el.firstElementChild?.className)).toBe('footer-logo');
 await page.getByRole('link',{name:'Screenshots',exact:true}).click();await expect(page).toHaveURL(/#gallery$/);
 await page.screenshot({path:`test-results/pages-${width}.png`,fullPage:true});
  await page.evaluate(()=>window.scrollTo(0,0));
  await page.screenshot({path:`test-results/pages-header-${width}.png`});
   await page.locator('footer').screenshot({path:`test-results/pages-footer-${width}.png`});
 expect(errors).toEqual([]);
});

test('trailer can be stopped, replayed and switched to reduced motion',async({page})=>{
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.goto('/docs/index.html');
 const image=page.locator('#trailer-image');
 await expect.poll(()=>image.evaluate((el:HTMLImageElement)=>el.complete&&el.naturalWidth>0)).toBe(true);
 expect(await image.evaluate((el:HTMLImageElement)=>el.currentSrc)).toContain('trailer.gif');
 await page.getByRole('button',{name:'Pause trailer'}).click();
 await expect(image).toHaveAttribute('src','assets/trailer-poster.jpg');
 await page.getByRole('button',{name:'Replay trailer'}).click();
 await expect(image).toHaveAttribute('src','assets/trailer.gif');
 await page.emulateMedia({reducedMotion:'reduce'});
 await expect(page.locator('#trailer-toggle')).toBeHidden();
 await expect.poll(()=>image.evaluate((el:HTMLImageElement)=>el.currentSrc)).toContain('trailer-poster.jpg');
});