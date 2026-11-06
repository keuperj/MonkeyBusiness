import {test,expect} from '@playwright/test';
import {readFileSync,existsSync} from 'node:fs';
const manifest=JSON.parse(readFileSync('src/act2-audio-manifest.json','utf8'));
test('Act II dialogue and cache inventory are complete',()=>{
 const script=JSON.parse(readFileSync('src/act2-dialogue.json','utf8'));
 const lines=[...Object.values(script.blocks).flat(),...script.topics.flatMap((t:any)=>[{who:'NELL',text:t.question},...t.lines])] as any[];
 for(const l of lines)expect(manifest.speech[`${l.who}:${l.text}`],`${l.who}: ${l.text}`).toBeTruthy();
 const first=JSON.parse(readFileSync('public/chapter-assets.json','utf8')).assets;
 expect(first.some((a:any)=>a.path.includes('/act2/')||a.path.startsWith('audio/a2-'))).toBe(false);
 const second=JSON.parse(readFileSync('public/act2-assets.json','utf8')).assets;
 for(const path of [...Object.values(manifest.speech),...Object.values(manifest.effects)].map(f=>`audio/${f}`)){expect(existsSync(`public/${path}`)).toBe(true);expect(second.some((a:any)=>a.path===path),path).toBe(true);}
});
test('all new audio decodes and room travel stops active narration',async({page})=>{
 test.setTimeout(180000);await page.goto('/act2.html?debug=act2-press');await expect(page.locator('#game')).toHaveAttribute('data-ready','true',{timeout:90000});
 const files=[...new Set([...Object.values(manifest.speech),...Object.values(manifest.effects)])] as string[];
 const failed=await page.evaluate(async files=>{const ctx=new AudioContext(),failed:string[]=[];let i=0;await Promise.all(Array.from({length:4},async()=>{while(i<files.length){const f=files[i++];try{const r=await fetch(`/audio/${f}`);const decoded=await ctx.decodeAudioData(await r.arrayBuffer());if(decoded.duration<=0)failed.push(f);}catch{failed.push(f);}}}));await ctx.close();return failed;},files);expect(failed).toEqual([]);
 await page.evaluate(()=>{(window as any).__voices=[];const play=HTMLMediaElement.prototype.play;HTMLMediaElement.prototype.play=function(){if(this.src.includes('/a2-'))(window as any).__voices.push(this);return play.call(this);};});
 await page.locator('#sound').click();await page.getByRole('button',{name:'Use Pencil',exact:true}).click();await page.locator('#panel summary').click();await page.locator('[data-target=headline]').click();await expect.poll(()=>page.evaluate(()=>(window as any).__voices.some((a:HTMLAudioElement)=>a.currentTime>0&&!a.paused))).toBe(true);
 await page.locator('#room-nav').getByRole('button',{name:'Repair Quay',exact:true}).click();await expect.poll(()=>page.evaluate(()=>(window as any).__voices.every((a:HTMLAudioElement)=>a.paused))).toBe(true);await expect(page.locator('#caption span')).toBeEmpty();await page.locator('#travel-skip').click();await expect(page.locator('#caption')).not.toContainText('supernatural');
});

// These scenarios explicitly exercise enabling sound from a saved mute preference.
test.beforeEach(async({page})=>{await page.addInitScript(()=>{if(sessionStorage.getItem("monkey-buisness-sound")===null)sessionStorage.setItem("monkey-buisness-sound","false");});});
