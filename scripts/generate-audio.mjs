import { readFile, writeFile, mkdir, stat, copyFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import ts from 'typescript';
import { api } from './elevenlabs.mjs';
import { cast, conversations, effects } from './audio-plan.mjs';

const root='public/audio'; await mkdir(root,{recursive:true});
const transcript=new Map();
const add=(who,text)=>transcript.set(`${who}:${text}`,{who,text});
for(const [who,lines] of Object.entries(conversations))for(const text of lines)add(who,text);
// Include all literal narration and room descriptions, including conditional branches.
const ast=ts.createSourceFile('main.ts',await readFile('src/main.ts','utf8'),ts.ScriptTarget.Latest,true);
function literals(node){if(!node)return [];if(ts.isStringLiteral(node))return [node.text];if(ts.isConditionalExpression(node))return [...literals(node.whenTrue),...literals(node.whenFalse)];return [];}
function visit(node){
 if(ts.isCallExpression(node)&&node.expression.getText(ast)==='say')for(const text of literals(node.arguments[0]))add(node.arguments[1]&&ts.isStringLiteral(node.arguments[1])?node.arguments[1].text:'NELL',text);
 if(ts.isPropertyAssignment(node)&&node.name.getText(ast)==='look')for(const text of literals(node.initializer))add('NELL',text);
 ts.forEachChild(node,visit);
}visit(ast);
const manifest={provider:'ElevenLabs',speech:{},effects:{}};
const records=[];
const jobs=[];
for(const [key,{who,text}] of transcript){const voice=cast[who];if(!voice)throw Error('Unknown character');const body={text,model_id:'eleven_multilingual_v2',voice_settings:voice.settings};const hash=createHash('sha256').update(JSON.stringify({voice_id:voice.voice_id,...body})).digest('hex').slice(0,16);const file=`${who.toLowerCase()}-${hash}.mp3`;manifest.speech[key]=file;records.push({file,character:who,voice:voice.name,voice_id:voice.voice_id,...body});jobs.push({file,path:`text-to-speech/${voice.voice_id}?output_format=mp3_44100_128`,body,seed: text===conversations.MARA[0]?'mara-greeting.mp3':undefined});}
for(const [id,effect] of Object.entries(effects)){const body={...effect,model_id:'eleven_text_to_sound_v2',prompt_influence:.45};const hash=createHash('sha256').update(JSON.stringify(body)).digest('hex').slice(0,16);const file=`${id}-${hash}.mp3`;manifest.effects[id]=file;records.push({file,...body});jobs.push({file,path:'sound-generation?output_format=mp3_44100_128',body,seed:id==='tavern-ambience'?'tavern-ambience.mp3':undefined});}
console.log(`Audio plan: ${transcript.size} speech clips, ${Object.keys(effects).length} effects. Existing hashed assets are reused.`);
if(process.argv.includes('--plan'))process.exit(0);
for(const job of jobs){
 try{
  if(await stat(`${root}/${job.file}`).then(s=>s.size>1000,()=>false)){console.log(`Cached ${job.file}`);continue;}
  if(job.seed&&await stat(`${root}/${job.seed}`).then(s=>s.size>1000,()=>false)){await copyFile(`${root}/${job.seed}`,`${root}/${job.file}`);continue;}
  const response=await api(job.path,job.body);
  if(!response.headers.get('content-type')?.includes('audio'))throw Error('Unexpected response type');
  const bytes=Buffer.from(await response.arrayBuffer());if(bytes.length<1000)throw Error('Empty audio');
  await writeFile(`${root}/${job.file}`,bytes);console.log(`Generated ${job.file} (${bytes.length} bytes)`);
 }catch(e){console.error(e.message.startsWith('ElevenLabs')?e.message:'Audio request failed. Completed clips are cached; rerun to resume.');process.exit(1);}
}
await writeFile('src/audio-manifest.json',JSON.stringify(manifest,null,2)+'\n');
await writeFile(`${root}/provenance.json`,JSON.stringify({provider:'ElevenLabs',generated:'2026-10-19',cast,records},null,2)+'\n');
console.log('Audio manifest and provenance saved.');
