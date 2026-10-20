import {test,expect} from '@playwright/test';
test('chapter loader retries, caches every asset and serves audio ranges offline',async({page,context})=>{
 test.setTimeout(90000);
 let fail=true;
 await page.route('**/chapter-assets.json',async route=>{if(fail){fail=false;await route.fulfill({status:503,body:'Unavailable'});}else await route.continue();});
 await page.goto('/');await page.locator('#splash-enter').click();await page.locator('#start-game').click();
 await expect(page.locator('#chapter-loading')).toBeVisible();await expect(page.locator('#chapter-retry')).toBeVisible();await expect(page.locator('#intro')).toBeHidden();await expect(page.locator('#game')).not.toHaveAttribute('data-ready','true');
 await page.screenshot({path:'test-results/chapter-loading.png',fullPage:true});await page.locator('#chapter-retry').click();await expect(page.locator('#intro')).toBeVisible({timeout:45000});await expect(page.locator('#chapter-progress')).toHaveAttribute('value','100');await page.locator('#intro-skip').click();await page.locator('#arrival-skip').click();
 const cached=await page.evaluate(async()=>{const manifest=await (await fetch('/chapter-assets.json')).json();const cache=await caches.open('monkey-buisness-chapter-assets-v1');const matches=await Promise.all(manifest.assets.map(async(a:any)=>(await cache.match(new URL(a.path,location.href).href))?.headers.get('X-Asset-Revision')===a.revision));return {complete:matches.every(Boolean),audio:manifest.assets.find((a:any)=>a.path.endsWith('.mp3')).path};});expect(cached.complete).toBe(true);
 await context.setOffline(true);
 const result=await page.evaluate(async path=>{const response=await fetch('/'+path,{headers:{Range:'bytes=0-31'}});return {status:response.status,length:(await response.arrayBuffer()).byteLength};},cached.audio);expect(result).toEqual({status:206,length:32});
 await context.setOffline(false);await page.reload();await page.locator('#splash-enter').click();await page.locator('#load-game').click();await page.locator('[data-save="monkey-buisness-act1-auto"]').click();await expect(page.locator('#front')).not.toBeVisible({timeout:45000});await expect(page.locator('#game')).toHaveAttribute('data-ready','true');
});
