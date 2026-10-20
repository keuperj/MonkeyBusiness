import {test,expect} from '@playwright/test';

test('icon controls retain actions, pocket tools and permanent pencil and lint',async({page})=>{
 await page.goto('/');await page.locator('#splash-enter').click();await page.locator('#start-game').click();await page.locator('#intro-skip').click();await page.locator('#arrival-skip').click();
 for(const verb of ['Walk to','Look at','Talk to','Pick up','Use']){const button=page.locator('#verbs').getByRole('button',{name:verb,exact:true});await expect(button.locator('svg')).toBeVisible();await expect(button).toHaveText('');}
 await expect(page.locator('footer #notebook,footer #map')).toHaveCount(0);await expect(page.locator('.pockets #notebook')).toBeVisible();await expect(page.locator('.pockets #map')).toBeVisible();
 await expect(page.getByRole('img',{name:/Pencil —/})).toBeVisible();await expect(page.getByRole('img',{name:/Lint —/})).toBeVisible();
 await page.locator('#notebook').click();await expect(page.locator('#book-title')).toHaveText('Nell’s notebook');await page.locator('#close-book').click();await page.locator('#map').click();await expect(page.locator('#book-content img')).toHaveAttribute('src',/story-map-walkways.png$/);await page.locator('#close-book').click();
 await page.getByRole('button',{name:'Pick up',exact:true}).click();await expect(page.locator('[data-verb=take]')).toHaveAttribute('aria-pressed','true');await page.locator('#panel summary').click();await page.locator('[data-target=mug]').click();await expect(page.getByRole('button',{name:'Use Brass tankard',exact:true})).toBeVisible();await expect(page.getByRole('img',{name:/Pencil —/})).toBeVisible();await expect(page.getByRole('img',{name:/Lint —/})).toBeVisible();
 for(const button of await page.locator('footer button').all()){await expect(button.locator('svg')).toBeVisible();await expect(button).toHaveText('');expect(await button.getAttribute('aria-label')).toBeTruthy();}
 await page.setViewportSize({width:390,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);await page.screenshot({path:'test-results/icon-controls-mobile.png',fullPage:true});
});

test('isolated test rooms share icon actions and footer controls',async({page})=>{
 await page.goto('/tavern-test.html');await expect(page.locator('#game')).toHaveAttribute('data-ready','true');await expect(page.locator('[data-verb] svg')).toHaveCount(5);await expect(page.locator('footer button svg')).toHaveCount(4);await expect(page.getByRole('img',{name:/Lint —/})).toBeVisible();
 await page.goto('/bridge.html');await expect(page.locator('#game')).toHaveAttribute('data-ready','true');await expect(page.locator('footer button svg')).toHaveCount(2);await page.locator('#motion').click();await expect(page.locator('#motion')).toHaveAttribute('aria-pressed','true');
});
