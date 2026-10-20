import {test,expect} from '@playwright/test';
import {fresh,AUTO} from '../src/chapter-state';

test('room artwork and icon sound controls follow travel and unlocks',async({page})=>{
 const save=fresh();save.flags.intro=true;save.flags.passage=true;
 await page.addInitScript(({save,key})=>localStorage.setItem(key,JSON.stringify(save)),{save,key:AUTO});await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/');await page.locator('#splash-enter').click();await page.locator('#load-game').click();await page.locator(`[data-save="${AUTO}"]`).click();
 await expect(page.locator('.art-room-row,.mini-map-picture')).toHaveCount(0);await expect(page.locator('.art-topbar #room-title')).toBeVisible();await expect(page.locator('.art-topbar #room-nav')).toBeVisible();await expect(page.locator('.game-brand img')).toHaveAttribute('alt','Monkey Buisness');await expect(page.locator('#room-nav .room-destination')).toHaveCount(2);
 for(const [room,name] of [['landing','Outer Landing'],['bridge','Quibble’s Crossing'],['tavern','The Crooked Compass']]){
  await page.locator('#room-nav').getByRole('button',{name,exact:true}).click();await page.locator('#travel-skip').click();await expect(page.locator('#room-title')).toHaveText(name);await expect(page.locator('#room-title svg image')).toHaveAttribute('href',/room-emblems.png$/);await expect(page.locator('#room-title')).toHaveAttribute('data-room',room);await expect(page.locator(`#room-nav [data-room="${room}"]`)).toHaveCount(0);
 }
 await page.locator('#sound').click();await expect(page.locator('#sound')).toHaveAttribute('aria-label','Sound on');await expect(page.locator('#sound svg')).toBeVisible();await expect(page.locator('#sound')).toHaveText('');await page.locator('#sound').click();await expect(page.locator('#sound')).toHaveAttribute('aria-label','Sound off');
});

test('shared header accepts future room artwork, acts and destinations without layout changes',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/tavern-test.html');
 await page.evaluate(async()=>{
  // @ts-ignore Vite serves this module in the browser.
  const {RoomHeader,roomBadges}=await import('/src/room-header.ts');
  const header=new RoomHeader(document.getElementById('room-header'),'Act II','A Question of Passage');
  header.render('future', [...Object.entries(roomBadges).map(([id,badge])=>({id,badge,reachable:true})),{id:'future',badge:{...roomBadges.landing,name:'Future Harbour',point:[1000,200]},reachable:true}],(id:string)=>(window as any).__destination=id);
 });
 await expect(page.locator('.act-lettering')).toContainText('Act II');await expect(page.locator('#room-title')).toHaveText('Future Harbour');await expect(page.locator('#room-nav .room-destination')).toHaveCount(3);await page.getByRole('button',{name:'The Crooked Compass',exact:true}).click();expect(await page.evaluate(()=>(window as any).__destination)).toBe('tavern');expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});
