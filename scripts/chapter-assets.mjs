import {readdir,readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
async function scan(dir){const result=[];for(const entry of await readdir(`public/${dir}`,{withFileTypes:true})){const path=`${dir}/${entry.name}`;if(entry.isDirectory())result.push(...await scan(path));else if(/\.(png|mp3|webp|jpg|ogg)$/.test(path)){const bytes=await readFile(`public/${path}`);result.push({path,bytes:bytes.length,revision:createHash('sha256').update(bytes).digest('hex')});}}return result;}
const assets=(await Promise.all(['assets','audio'].map(scan))).flat().sort((a,b)=>a.path.localeCompare(b.path));
const first=assets.filter(a=>!a.path.startsWith('assets/act2/')&&!/^audio\/(a2-|act2-)/.test(a.path));
await writeFile('public/chapter-assets.json',JSON.stringify({chapter:'Act I — A Job, a Tankard and a Toll',assets:first}));
const shared=new Set(['sprites','duel-sprites','quibble-idle','chest-open','chapter-props','tavern','bridge','landing','story-map','game-logo','room-badges','room-emblems','control-icons','harbour-tools','pirate-ui-atlas']);
const audio2=JSON.parse(await readFile('src/act2-audio-manifest.json','utf8'));
const audio1=JSON.parse(await readFile('src/audio-manifest.json','utf8'));
const requiredAudio=new Set([...Object.values(audio2.speech),...Object.values(audio2.effects),...['tavern-ambience','bridge-ambience','footsteps','pickup','float-free','boat-pass'].map(k=>audio1.effects[k])]);
// Shared controls and returning locations remain available when starting Act II directly.
const second=assets.filter(a=>a.path.startsWith('assets/act2/')||(a.path.startsWith('audio/')&&requiredAudio.has(a.path.slice(6)))||shared.has(a.path.replace('assets/','').replace(/\.png$/,''))||/icons|logo|badge/.test(a.path));
await writeFile('public/act2-assets.json',JSON.stringify({chapter:'Act II — Respectable Nonsense',assets:second}));
