import {test,expect} from '@playwright/test';
test('leaving a room cancels voices, queued captions and replay state',async({page})=>{
 await page.addInitScript(()=>{
  (window as any).__media=[];
  HTMLMediaElement.prototype.play=function(){(window as any).__media.push({el:this,src:this.src,paused:false});return Promise.resolve();};
  HTMLMediaElement.prototype.pause=function(){for(const m of (window as any).__media)if(m.el===this)m.paused=true;};
 });
 await page.goto('/');await page.locator('#splash-enter').click();await page.locator('#start-game').click();await page.locator('#intro-skip').click();await page.locator('#sound').click();
 await expect(page.locator('#caption')).toContainText('surveying work');
 await page.locator('#room-nav').getByRole('button',{name:'Quibble’s Crossing',exact:true}).click();await expect(page.locator('#travel')).toBeVisible();await expect(page.locator('#caption')).toHaveText('');await expect(page.locator('#panel')).toHaveText('');
 expect(await page.evaluate(()=>(window as any).__media.some((m:any)=>/\/nell-/.test(m.src)))).toBe(true);
 expect(await page.evaluate(()=>(window as any).__media.filter((m:any)=>/\/(nell|mara|orin|quibble|fine-print)-/.test(m.src)).every((m:any)=>m.paused))).toBe(true);
 // Simulate completion events arriving after cancellation; none may advance the old queue.
 const count=await page.evaluate(()=>(window as any).__media.length);
 await page.evaluate(()=>{for(const m of (window as any).__media)m.el.dispatchEvent(new Event('ended'));});await expect(page.locator('#caption')).toHaveText('');expect(await page.evaluate(()=>(window as any).__media.length)).toBe(count);
 await page.locator('#travel-skip').click();await expect(page.locator('#caption')).toHaveText('NELLQuibble’s Crossing');
 await page.locator('#replay').click();await page.locator('#sound').click();await page.locator('#sound').click();await expect(page.locator('#caption')).toHaveText('NELLQuibble’s Crossing');
 await page.getByRole('button',{name:'Talk to Captain Quibble',exact:true}).click();const question=page.locator('#panel .choices button').first();await question.click();await expect(page.locator('#caption')).not.toHaveText('NELLQuibble’s Crossing');
});
