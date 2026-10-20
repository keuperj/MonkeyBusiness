import {readFile,writeFile} from 'node:fs/promises';
const md=await readFile('docs/ACT_2_ROOM_PLAN.md','utf8');
const topics=[];const blocks={};let section='',pending='',current='NELL';
const names={'Nell':'NELL','Pip':'PIP','Rook':'ROOK','Vane':'VANE','Mara':'MARA','Orin':'ORIN','Quibble':'QUIBBLE','Fine Print':'FINE PRINT'};
function speech(text,defaultWho){let result=[],who=defaultWho;const re=/\*\*([^*]+):\*\*|“([^”]+)”/g;for(const m of text.matchAll(re)){if(m[1])who=names[m[1]]||defaultWho;else result.push({who,text:m[2]});}return result;}
for(const line of md.split('\n')){
 if(line.startsWith('## ')||line.startsWith('### ')){section=line;if(line.includes('Pip'))current='PIP';if(line.includes('Rook'))current='ROOK';}
 const title=line.match(/`(A2-[A-Z0-9-]+)`/);if(title&&!line.startsWith('|'))pending=title[1];
 if(line.startsWith('> **')&&pending){(blocks[pending]??=[]).push(...speech(line,'NELL'));}
 if(line.startsWith('|')){const cols=line.split('|').slice(1,-1).map(x=>x.trim());if(/^(PIP|ROOK|VANE|MARA|ORIN|BRIDGE)-\d+$/.test(cols[0]||'')){
 const prefix=cols[0].split('-')[0],who=prefix==='BRIDGE'?'QUIBBLE':prefix;const question=cols[1].match(/“([^”]+)”/)?.[1];if(question)topics.push({id:cols[0],question,lines:speech(cols[2],who)});
 }}
}
// Prose topics after recovery and announcement are also playable conversations.
for(const line of md.split('\n')){
 const m=line.match(/^- `A2-(ORIN-0[6-8])` — “([^”]+)” → “([^”]+)”/);
 if(m)topics.push({id:m[1],question:m[2],lines:[{who:'ORIN',text:m[3]}]});
 const late=line.match(/^- `A2-((?:PIP-12|ROOK-19|BRIDGE-06|ORIN-09|MARA-08))`/);
 if(late)topics.push({id:late[1],question:'What do you make of the company announcement?',lines:speech(line,late[1].split('-')[0])});
}
// Single scripted topics and multiline sequences from prose.
for(const [id,lines] of Object.entries(blocks))if(!lines.length)delete blocks[id];
await writeFile('src/act2-dialogue.json',JSON.stringify({topics,blocks},null,2)+'\n');
console.log(`${topics.length} scripted topics, ${Object.keys(blocks).length} scenes extracted.`);
