import {readFile,writeFile} from 'node:fs/promises';
const source=await readFile(new URL('../docs/ACT_3_ROOM_PLAN.md',import.meta.url),'utf8');
const blocks={};let current=null;
for(const line of source.split('\n')){
 const id=line.match(/(?:—|homage)\s*`(A3-[A-Z-]+)`/);if(id){current=id[1];blocks[current]??=[];}
 const spoken=line.match(/^> \*\*([^*]+):\*\* “(.+)”/);if(spoken&&current)blocks[current].push({who:spoken[1].toUpperCase(),text:spoken[2]});
 if(/^## /.test(line))current=null;
}
const topics=[];
for(const line of source.split('\n')){
 const m=line.match(/^\| (A3-(MARA|ORIN|WATCH|BRAM|PIP|ROOK|VANE)-\d+) \| (.*?) \| (.*?) \|/);if(!m)continue;
 const question=m[3].match(/“([^”]+)”/)?.[1];if(!question)continue;
 const who=m[2]==='WATCH'?'QUIBBLE':m[2];const lines=[];const re=/(?:\*\*([^*]+):\*\*\s*)?“([^”]+)”/g;let match;
 while((match=re.exec(m[4])))lines.push({who:(match[1]||who).toUpperCase(),text:match[2]});
 topics.push({id:m[1],who,question,lines});
}
await writeFile(new URL('../src/act3-dialogue.json',import.meta.url),JSON.stringify({blocks,topics},null,2)+'\n');
console.log(`Act III: ${Object.keys(blocks).length} blocks, ${topics.length} topics extracted. Review conditional topics in runtime.`);