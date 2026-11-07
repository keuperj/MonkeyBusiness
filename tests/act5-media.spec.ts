import {test,expect} from '@playwright/test';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
const dialogue=JSON.parse(readFileSync('src/act5-dialogue.json','utf8')) as {blocks:Record<string,{who:string;text:string}[]>;topics:{question:string;lines:{who:string;text:string}[]}[]};
const manifest=JSON.parse(readFileSync('src/act5-audio-manifest.json','utf8')) as {speech:Record<string,string>;effects:Record<string,string>};
import {documents5,art5,spots5,duels5} from '../src/act5-data';
import {debug5,rooms5} from '../src/act5-state';
test('Act V script, inspected sources, artwork and cache hashes are complete',()=>{
 const speech=Object.assign({},...['','act2-','act3-','act4-','act5-'].map(prefix=>JSON.parse(readFileSync(`src/${prefix}audio-manifest.json`,'utf8')).speech)) as Record<string,string>;
 for(const lines of Object.values(dialogue.blocks))for(const l of lines)expect(speech[`${l.who}:${l.text}`],`${l.who}: ${l.text}`).toBeTruthy();
 for(const t of dialogue.topics){expect(speech[`NELL:${t.question}`]).toBeTruthy();for(const l of t.lines)expect(speech[`${l.who}:${l.text}`]).toBeTruthy();}
 for(const text of Object.values(documents5))expect(speech[`NELL:${text}`]).toBeTruthy();
 for(const d of duels5){expect(speech[`VANE:${d.claim}`]).toBeTruthy();for(const reply of d.replies)expect(speech[`NELL:${reply}`]).toBeTruthy();}
 for(const room of Object.keys(rooms5) as (keyof typeof rooms5)[]){expect(existsSync(`public/assets/${art5[room]}.png`)).toBe(true);const people=spots5(debug5(room)).filter(s=>s.person).map(s=>s.person);expect(new Set(people).size).toBe(people.length);}
 const assets=JSON.parse(readFileSync('public/act5-assets.json','utf8')).assets as {path:string;bytes:number;revision:string}[];
 for(const a of assets){const b=readFileSync(`public/${a.path}`);expect(b.length).toBe(a.bytes);expect(createHash('sha256').update(b).digest('hex')).toBe(a.revision);}
 for(const name of ['command','bypass','watch','coupling','passage','review','chart','ending','inspection-map'])expect(assets.some(a=>a.path===`assets/act5/${name}.png`)).toBe(true);
 for(const file of Object.values({...manifest.speech,...manifest.effects}))expect(existsSync(`public/audio/${file}`)).toBe(true);
});
test('Act V speech and effects decode and generated backgrounds load at full size',async({page})=>{
 test.setTimeout(120000);await page.goto('/');const files=[...new Set(Object.values({...manifest.speech,...manifest.effects}))];
 const failed=await page.evaluate(async files=>{const ctx=new AudioContext(),bad:string[]=[];let next=0;await Promise.all(Array.from({length:4},async()=>{while(next<files.length){const f=files[next++];try{const r=await fetch(`/audio/${f}`);if(!r.ok)throw Error();const a=await ctx.decodeAudioData(await r.arrayBuffer());if(a.duration<=0)bad.push(f);}catch{bad.push(f);}}}));await ctx.close();return bad;},files);expect(failed).toEqual([]);
 for(const name of ['command','bypass','watch','coupling','passage','review','chart','ending','inspection-map'])expect(await page.evaluate(name=>new Promise(resolve=>{const im=new Image();im.onload=()=>resolve([im.naturalWidth,im.naturalHeight]);im.onerror=()=>resolve([]);im.src=`/assets/act5/${name}.png`; }),name)).toEqual([1536,1024]);
});