import {test,expect} from '@playwright/test';
import {fresh2,parse2,AUTO2} from '../src/act2-state';
import {collectibleAvailable} from '../src/act2-collectibles';
test('collected, consumed and delivered objects do not respawn in old saves',()=>{
 const s=fresh2();s.items.push('rope','paper');const saved=parse2(JSON.stringify(s));expect(collectibleAvailable(saved,'rope')).toBe(false);expect(collectibleAvailable(saved,'paper')).toBe(false);
 s.items=s.items.filter(i=>!['rope','paper'].includes(i));s.flags.ropeAttached=true;s.flags.copy=true;s.flags.delivered=true;s.flags.open=true;s.flags.drawing=true;
 for(const id of ['rope','paper','crank','drawing'])expect(collectibleAvailable(s,id),id).toBe(false);
});
test('rope, paper, drawing and crank disappear visually and stay gone after travel and reload',async({page})=>{
 test.setTimeout(120000);const initial=fresh2();initial.flags.maker=true;initial.flags.house=true;initial.seen.push('A2-INTRO');await page.addInitScript(({s,k})=>{if(!localStorage.getItem(k))localStorage.setItem(k,JSON.stringify(s));},{s:initial,k:AUTO2});
 await page.goto('/act2.html');await expect(page.locator('#game')).toHaveAttribute('data-ready','true',{timeout:60000});
 const target=async(id:string)=>{if(!await page.locator('#panel details').count())await page.getByRole('button',{name:'Back to the room',exact:true}).click();if(!await page.locator('#panel details').evaluate((e:HTMLDetailsElement)=>e.open))await page.locator('#panel summary').click();await page.locator(`[data-target=${id}]`).click();};
 const go=async(name:string)=>{await page.locator('#map').click();await page.locator('#book').getByRole('button',{name,exact:true}).click();await page.locator('#travel-skip').click();};
 const area=async(x:number,y:number,w:number,h:number)=>{const b=(await page.locator('canvas').boundingBox())!;return page.screenshot({clip:{x:b.x+x*b.width/1536,y:b.y+y*b.height/1024,width:w*b.width/1536,height:h*b.height/1024}});};
 await page.locator('[data-verb=take]').click();const ropeBefore=await area(1260,400,240,180);await target('rope');await expect(page.locator('[data-target=rope]')).toHaveCount(0);expect((await area(1260,400,240,180)).equals(ropeBefore)).toBe(false);await expect(page.getByRole('button',{name:'Use Mooring rope',exact:true})).toBeVisible();
 const paperBefore=await area(85,475,135,80);await target('paper');await expect(page.locator('[data-target=paper]')).toHaveCount(0);expect((await area(85,475,135,80)).equals(paperBefore)).toBe(false);await page.screenshot({path:'test-results/quay-collected.png',fullPage:true});
 await go('The Quay Quill');await expect(page.locator('[data-target=paper]')).toHaveCount(0);await go('Rook’s Workshop');const drawingBefore=await area(300,195,210,310);await target('drawing');await page.getByRole('button',{name:'Back to the room',exact:true}).click();await expect(page.locator('[data-target=drawing]')).toHaveCount(0);expect((await area(300,195,210,310)).equals(drawingBefore)).toBe(false);
 const crankBefore=await area(1380,205,115,200);await target('crank');await page.getByRole('button',{name:'Back to the room',exact:true}).click();await expect(page.locator('[data-target=crank]')).toHaveCount(0);expect((await area(1380,205,115,200)).equals(crankBefore)).toBe(false);await page.screenshot({path:'test-results/workshop-collected.png',fullPage:true});
 await page.reload();await expect(page.locator('#game')).toHaveAttribute('data-ready','true');await expect(page.locator('[data-target=drawing]')).toHaveCount(0);await expect(page.locator('[data-target=crank]')).toHaveCount(0);await go('Repair Quay');await expect(page.locator('[data-target=rope]')).toHaveCount(0);await expect(page.locator('[data-target=paper]')).toHaveCount(0);
});
