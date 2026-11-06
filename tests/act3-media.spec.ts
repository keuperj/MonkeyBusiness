import {test,expect} from '@playwright/test';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
const dialogue=JSON.parse(readFileSync('src/act3-dialogue.json','utf8')) as {blocks:Record<string,{who:string;text:string}[]>;topics:{lines:{who:string;text:string}[]}[]};
const manifest=JSON.parse(readFileSync('src/act3-audio-manifest.json','utf8')) as {speech:Record<string,string>;effects:Record<string,string>};
test('Act III dialogue audio and chapter assets exist with matching revisions',()=>{
 for(const lines of Object.values(dialogue.blocks))for(const l of lines)expect((manifest.speech as Record<string,string>)[`${l.who}:${l.text}`]).toBeTruthy();
 for(const topic of dialogue.topics)for(const l of topic.lines)expect((manifest.speech as Record<string,string>)[`${l.who}:${l.text}`]).toBeTruthy();
 for(const file of Object.values({...manifest.speech,...manifest.effects}))expect(existsSync(`public/audio/${file}`)).toBe(true);
 const assets=JSON.parse(readFileSync('public/act3-assets.json','utf8')).assets as {path:string;bytes:number;revision:string}[];
 for(const a of assets){const b=readFileSync(`public/${a.path}`);expect(b.length).toBe(a.bytes);expect(createHash('sha256').update(b).digest('hex')).toBe(a.revision);}
 for(const name of ['service-landing','gallery','recorder','overlook','bram','props','emblems','loading','departure','service-tray','training-board'])expect(assets.some(a=>a.path===`assets/act3/${name}.png`)).toBe(true);
});
test('Act III speech and ambience decode in the browser',async({page})=>{
 test.setTimeout(120000);await page.goto('/');
 const files=[...new Set(Object.values({...manifest.speech,...manifest.effects}))];
 const failed=await page.evaluate(async files=>{const ctx=new AudioContext(),failed:string[]=[];let next=0;await Promise.all(Array.from({length:4},async()=>{while(next<files.length){const file=files[next++];try{const r=await fetch(`/audio/${file}`);const data=await ctx.decodeAudioData(await r.arrayBuffer());if(data.duration<=0)failed.push(file);}catch{failed.push(file);}}}));await ctx.close();return failed;},files);expect(failed).toEqual([]);
});