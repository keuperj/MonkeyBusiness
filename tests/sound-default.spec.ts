import {test,expect} from '@playwright/test';

test('new sessions start with sound on and entering the menu plays ambience',async({page})=>{
 await page.addInitScript(()=>{(window as any).__played=[];HTMLMediaElement.prototype.play=function(){(window as any).__played.push(this.src);return Promise.resolve();};});
 await page.goto('/');await expect(page.locator('#front-sound')).toHaveText('Sound on');await expect(page.locator('#front-sound')).toHaveAttribute('aria-pressed','true');
 await page.locator('#splash-enter').click();await expect.poll(()=>page.evaluate(()=>(window as any).__played.some((src:string)=>src.includes('bridge-ambience')))).toBe(true);
 await page.locator('#front-sound').click();await expect(page.locator('#front-sound')).toHaveText('Sound off');await page.reload();await expect(page.locator('#front-sound')).toHaveText('Sound off');
 await page.goto('/tavern-test.html');await expect(page.locator('#sound')).toHaveAttribute('aria-label','Sound off');await page.locator('#sound').click();await expect(page.locator('#sound')).toHaveAttribute('aria-label','Sound on');await page.goto('/');await expect(page.locator('#front-sound')).toHaveText('Sound on');
});

test('sound defaults on when session storage cannot be read',async({page})=>{
 await page.addInitScript(()=>{Storage.prototype.getItem=function(){throw new DOMException('Blocked','SecurityError');};});
 await page.goto('/');await expect(page.locator('#front-sound')).toHaveText('Sound on');await expect(page.locator('#front-sound')).toHaveAttribute('aria-pressed','true');
});