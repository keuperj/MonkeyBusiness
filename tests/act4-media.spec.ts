import {test,expect} from '@playwright/test';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
const dialogue=JSON.parse(readFileSync('src/act4-dialogue.json','utf8')) as {blocks:Record<string,{who:string;text:string}[]>;topics:{question:string;lines:{who:string;text:string}[]}[]};
const manifest=JSON.parse(readFileSync('src/act4-audio-manifest.json','utf8')) as {speech:Record<string,string>;effects:Record<string,string>};
import {objects4} from '../src/act4-data';
test('Act IV has generated audio for every scripted line, topic and inspected object, plus verified artwork and cache hashes',()=>{
 const speech=manifest.speech as Record<string,string>;
 for(const lines of Object.values(dialogue.blocks))for(const l of lines)expect(speech[`${l.who}:${l.text}`]).toBeTruthy();
 for(const t of dialogue.topics){expect(speech[`NELL:${t.question}`]).toBeTruthy();for(const l of t.lines)expect(speech[`${l.who}:${l.text}`]).toBeTruthy();}
 for(const spots of Object.values(objects4))for(const s of spots)expect(speech[`NELL:${s.look}`]).toBeTruthy();
 for(const f of Object.values({...manifest.speech,...manifest.effects}))expect(existsSync(`public/audio/${f}`)).toBe(true);
 const assets=JSON.parse(readFileSync('public/act4-assets.json','utf8')).assets as {path:string;bytes:number;revision:string}[];
 for(const a of assets){const b=readFileSync(`public/${a.path}`);expect(b.length).toBe(a.bytes);expect(createHash('sha256').update(b).digest('hex')).toBe(a.revision);}
 for(const name of ['station','evidence','messenger','local-panel','signals','offer','departure','props','emblem','mascots','clock','credit'])expect(assets.some(a=>a.path===`assets/act4/${name}.png`)).toBe(true);
});
test('every Act IV speech and sound asset decodes in browser',async({page})=>{
 test.setTimeout(120000);await page.goto('/');const files=[...new Set(Object.values({...manifest.speech,...manifest.effects}))];
 const failed=await page.evaluate(async files=>{const ctx=new AudioContext(),failed:string[]=[];let next=0;await Promise.all(Array.from({length:4},async()=>{while(next<files.length){const f=files[next++];try{const r=await fetch(`/audio/${f}`);if(!r.ok)throw Error();const audio=await ctx.decodeAudioData(await r.arrayBuffer());if(audio.duration<=0)failed.push(f);}catch{failed.push(f);}}}));await ctx.close();return failed;},files);expect(failed).toEqual([]);
});