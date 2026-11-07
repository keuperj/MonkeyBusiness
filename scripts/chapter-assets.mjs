import {readdir,readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
async function scan(dir){const result=[];for(const entry of await readdir(`public/${dir}`,{withFileTypes:true})){const path=`${dir}/${entry.name}`;if(entry.isDirectory())result.push(...await scan(path));else if(/\.(png|mp3|webp|jpg|ogg|svg)$/.test(path)){const bytes=await readFile(`public/${path}`);result.push({path,bytes:bytes.length,revision:createHash('sha256').update(bytes).digest('hex')});}}return result;}
const assets=(await Promise.all(['assets','audio'].map(scan))).flat().sort((a,b)=>a.path.localeCompare(b.path));
const first=assets.filter(a=>!/^assets\/act[234]\//.test(a.path)&&!/^audio\/(a[234]-|act[234]-)/.test(a.path));
await writeFile('public/chapter-assets.json',JSON.stringify({chapter:'Act I — A Job, a Tankard and a Toll',assets:first}));
const shared=new Set(['sprites','duel-sprites','quibble-idle','chest-open','chapter-props','tavern','bridge','landing','story-map-walkways','game-logo','room-badges','room-emblems','control-icons','harbour-tools','pirate-ui-atlas']);
const audio2=JSON.parse(await readFile('src/act2-audio-manifest.json','utf8'));
const audio1=JSON.parse(await readFile('src/audio-manifest.json','utf8'));
const requiredAudio=new Set([...Object.values(audio2.speech),...Object.values(audio2.effects),...['tavern-ambience','bridge-ambience','footsteps','pickup','float-free','boat-pass'].map(k=>audio1.effects[k])]);
// Shared controls and returning locations remain available when starting Act II directly.
const second=assets.filter(a=>a.path.startsWith('assets/act2/')||(a.path.startsWith('audio/')&&requiredAudio.has(a.path.slice(6)))||shared.has(a.path.replace('assets/','').replace(/\.png$/,''))||/icons|logo|badge/.test(a.path));
await writeFile('public/act2-assets.json',JSON.stringify({chapter:'Act II — Respectable Nonsense',assets:second}));

const audio3=JSON.parse(await readFile('src/act3-audio-manifest.json','utf8'));
const required3=new Set([...Object.values(audio3.speech),...Object.values(audio3.effects)]);
const sharedAudio3=new Set(['act2-latch','bridge-ambience','tavern-ambience','footsteps'].map(k=>audio2.effects[k]||audio1.effects[k]));
const third=assets.filter(a=>a.path.startsWith('assets/act3/')||a.path.startsWith('assets/')&&second.some(b=>b.path===a.path)||a.path.startsWith('audio/')&&(required3.has(a.path.slice(6))||sharedAudio3.has(a.path.slice(6))));
await writeFile('public/act3-assets.json',JSON.stringify({chapter:'Act III — The People Who Kept Quiet',assets:third}));

const audio4=JSON.parse(await readFile('src/act4-audio-manifest.json','utf8'));
const required4=new Set([...Object.values(audio4.speech),...Object.values(audio4.effects)]);
const fourth=assets.filter(a=>a.path.startsWith('assets/act4/')||a.path.startsWith('assets/')&&third.some(b=>b.path===a.path)||a.path.startsWith('audio/')&&(required4.has(a.path.slice(6))||sharedAudio3.has(a.path.slice(6))));
await writeFile('public/act4-assets.json',JSON.stringify({chapter:'Act IV — Nobody Opens a Harbour Alone',assets:fourth}));
