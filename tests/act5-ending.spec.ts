import {test,expect,type Page} from '@playwright/test';

async function launch(page:Page,reduced=false){
 await page.emulateMedia({reducedMotion:reduced?'reduce':'no-preference'});
 await page.addInitScript(()=>sessionStorage.setItem('monkey-buisness-sound','false'));
 await page.goto('/act5.html?debug=act5-complete');
 await expect(page.locator('#game')).toHaveAttribute('data-ready','true',{timeout:120000});
 await page.getByRole('button',{name:'Replay the ending',exact:true}).click();
 await page.getByRole('button',{name:'Cast off with clearance',exact:true}).click();
 await expect(page.locator('#act5-ending')).toBeVisible();
}
test('animated finale, non-credits crawl, delayed attribution and replay preserve completion',async({page})=>{
 test.setTimeout(120000);const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));await launch(page);
 const ending=page.locator('#act5-ending');
 await expect(ending).toHaveAttribute('data-phase','scene');
 await expect(ending).toContainText('One last negotiation.');
 await ending.getByRole('button',{name:'Pause',exact:true}).click();
 expect(await ending.locator('.ending-art').evaluate(el=>el.getAnimations().every(a=>a.playState==='paused'))).toBe(true);
 await ending.getByRole('button',{name:'Resume',exact:true}).click();
 await ending.getByRole('button',{name:'Next scene →',exact:true}).click();await expect(ending).toContainText('Still Deciding.');
 await ending.getByRole('button',{name:'Next scene →',exact:true}).click();await expect(ending).toContainText('An honestly blank coast.');
 await page.screenshot({path:'test-results/act5-cinematic.png'});
 await ending.getByRole('button',{name:'Roll credits →',exact:true}).click();
 await expect(ending).toHaveAttribute('data-phase','credits');
 await expect(ending.locator('.ending-crawl section')).toHaveCount(12);
 await expect(ending).toContainText('Steven Spielberg *');await expect(ending).toContainText('No participation or endorsement implied.');
 // Seek presentation animations without adding a production test/debug hook.
 await ending.locator('.ending-crawl').evaluate(el=>{el.getAnimations()[0].currentTime=12000;});
 await page.screenshot({path:'test-results/act5-credits-crawl.png'});
 await ending.getByRole('button',{name:'Director card →',exact:true}).click();
 await expect(ending).toContainText('Directed by Janis Keuper');
 await expect(ending.locator('.ending-attribution')).toHaveCSS('opacity','0');
 await expect(ending.locator('.ending-attribution')).toHaveCSS('opacity','1',{timeout:9000});
 await expect(ending.locator('.ending-attribution')).toHaveText('* actual work done by GPT-6 Astra');
 await page.screenshot({path:'test-results/act5-director-card.png'});
 await ending.getByRole('button',{name:'Return to epilogue',exact:true}).click();await expect(ending).toHaveCount(0);
 await page.getByRole('button',{name:'Replay the ending',exact:true}).click();await page.getByRole('button',{name:'Cast off with clearance',exact:true}).click();
 await expect(ending).toContainText('One last negotiation.');await page.keyboard.press('Escape');await expect(ending).toHaveCount(0);
 expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('monkey-buisness-act5-auto')!).flags.complete)).toBe(true);expect(errors).toEqual([]);
});
test('mobile reduced-motion credits are scrollable, keyboard accessible and skippable',async({page})=>{
 test.setTimeout(120000);await page.setViewportSize({width:390,height:844});await launch(page,true);
 const ending=page.locator('#act5-ending');await ending.getByRole('button',{name:'Skip to credits',exact:true}).click();
 expect(await ending.evaluate(el=>el.getAnimations({subtree:true}).length)).toBe(0);
 await expect(ending.locator('.ending-perspective')).toHaveCSS('overflow','auto');
 expect(await ending.evaluate(el=>el.scrollWidth<=innerWidth)).toBe(true);
 await page.screenshot({path:'test-results/act5-credits-mobile.png'});
 await ending.getByRole('button',{name:'Skip to director card',exact:true}).click();
 await expect(ending.locator('.ending-attribution')).toBeVisible();await page.screenshot({path:'test-results/act5-director-mobile.png'});
 await ending.getByRole('button',{name:'Return to epilogue',exact:true}).focus();await page.keyboard.press('Enter');await expect(ending).toHaveCount(0);
 await expect(page.getByRole('button',{name:'Continue exploring the epilogue',exact:true})).toBeFocused();
});