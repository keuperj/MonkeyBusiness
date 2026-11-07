import {test,expect} from '@playwright/test';
import {fresh2,AUTO2} from '../src/act2-state';

test('paper badges distinguish every document and retain accessible inventory actions across acts',async({page})=>{
 test.setTimeout(180000);const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>sessionStorage.setItem('monkey-buisness-sound','false'));
 // Give the visual fixture a legitimately acquired survey; the ordinary landing preset has none.
 await page.route('**/debug-start.json',async route=>{const response=await route.fetch(),config=await response.json();Object.assign(config.presets.find((p:{id:string})=>p.id==='act1-landing').flags,{mugTaken:true,returned:true,chestOpen:true,chart:true});await route.fulfill({json:config});});
 await page.goto('/?debug=act1-landing');await expect(page.locator('#game')).toHaveAttribute('data-ready','true',{timeout:90000});
 const survey=page.locator('#inventory [data-paper-icon=chart]');await expect(survey).toBeVisible();const original=await survey.locator('.paper-badge').innerHTML();
 await page.getByRole('button',{name:'Use Old survey',exact:true}).click();await expect(page.getByRole('button',{name:'Use Old survey',exact:true})).toHaveClass(/active/);
 const s=fresh2();s.items.push('paper','drawing','copy','receipt');await page.evaluate(({key,value})=>localStorage.setItem(key,value),{key:AUTO2,value:JSON.stringify(s)});
 await page.goto('/act2.html');await expect(page.locator('#game')).toHaveAttribute('data-ready','true',{timeout:90000});
 const marks=new Map<string,string>();
 for(const item of ['chart','paper','drawing','copy','receipt']){const badge=page.locator(`#inventory [data-paper-icon=${item}]`);await expect(badge).toBeVisible();marks.set(item,await badge.locator('.paper-badge').innerHTML());}
 await page.getByRole('button',{name:'Use Annotated copy',exact:true}).click();await expect(page.locator('#command')).toContainText('Annotated copy');await expect(page.locator('#inventory [aria-label="Use Boathook"] .paper-badge')).toHaveCount(0);
 await page.goto('/act3.html?debug=act3-gallery');await expect(page.locator('#game')).toHaveAttribute('data-ready','true',{timeout:90000});
 for(const item of ['chart','drawing','receipt','tracing']){const badge=page.locator(`#inventory [data-paper-icon=${item}]`);await expect(badge).toBeVisible();const shape=await badge.locator('.paper-badge').innerHTML();if(marks.has(item))expect(shape).toBe(marks.get(item));marks.set(item,shape);}
 await page.goto('/act4.html?debug=act4-quay');await expect(page.locator('#game')).toHaveAttribute('data-ready','true',{timeout:90000});
 for(const item of ['chart','drawing','receipt','tracing','recordCopy','procedure']){const badge=page.locator(`#inventory [data-paper-icon=${item}]`);await expect(badge).toBeVisible();const shape=await badge.locator('.paper-badge').innerHTML();if(marks.has(item))expect(shape).toBe(marks.get(item));marks.set(item,shape);const button=badge.locator('..');expect(await button.getAttribute('aria-label')).toMatch(/^Use /);expect(await button.getAttribute('title')).toBeTruthy();}
 expect(marks.get('chart')).toBe(original);expect(new Set(marks.values()).size).toBe(8);
 await page.getByRole('button',{name:'Use Local-cover procedure',exact:true}).click();await expect(page.locator('#notice')).toContainText('Local-cover procedure');
 await page.setViewportSize({width:390,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
 for(const badge of await page.locator('#inventory .paper-badge').all()){const box=await badge.boundingBox(),button=await badge.locator('../..').boundingBox();expect(box!.width).toBeGreaterThanOrEqual(20);expect(box!.x+box!.width).toBeLessThanOrEqual(button!.x+button!.width);expect(box!.y+box!.height).toBeLessThanOrEqual(button!.y+button!.height);}
 await page.locator('.pockets').screenshot({path:'test-results/paper-inventory-mobile.png'});expect(errors).toEqual([]);
});