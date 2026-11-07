import {readFile,writeFile} from 'node:fs/promises';
const source=await readFile('docs/ACT_4_ROOM_PLAN.md','utf8'),blocks={},topics=[];let current='';
for(const line of source.split('\n')){
 const id=line.match(/`(A4-[A-Z-]+)`/);if(id&&!line.startsWith('-')){current=id[1];blocks[current]??=[];}
 if(/^## /.test(line))current='';
 const spoken=line.match(/^> \*\*([^*]+):\*\* “(.+)”/);if(spoken&&current){let who=spoken[1].split(',')[0].toUpperCase();blocks[current].push({who,text:spoken[2]});}
 const topic=line.match(/^\| (A4-(MARA|ORIN|WATCH|PRINT|ROOK|PIP|VANE|BRAM)-\d+) \| “([^”]+)” \| (.+) \|$/);if(topic){const who=topic[2]==='PRINT'?'FINE PRINT':topic[2]==='WATCH'?'QUIBBLE':topic[2];const lines=[];const re=/(?:\*\*([^*]+):\*\*\s*)?“([^”]+)”/g;let m;while((m=re.exec(topic[4])))lines.push({who:(m[1]||who).toUpperCase(),text:m[2]});if(lines.length)topics.push({id:topic[1],who,question:topic[3],lines});}
}
// Conditional responses are selected explicitly rather than reading both variants.
const conditional={'A4-ORIN-05':['He has excellent volume. We are now working on content.','He repeats the station before the instruction. That is more useful than sounding certain.'],'A4-PIP-01':['Enough to investigate. Give each claim its own source.','Enough for these claims. Not for the larger ones you crossed out.'],'A4-BRAM-03':['Tell me which ones. A collective noun is not a test record.','Keep the settings staged and the drives disengaged. The live handover is separate work.']};
for(const t of topics)if(conditional[t.id])t.lines=conditional[t.id].map(text=>({who:t.who,text}));
topics.splice(topics.findIndex(t=>t.id==='A4-PRINT-04'),1);
blocks['A4-ACK-OUTER']=[{who:'ROOK',text:'Outer Landing. Watch D, revision one. High, detent B, local test passed. I hold for a verified handover; central control remains in charge.'}];
blocks['A4-ACK-QUAY']=[{who:'MARA',text:"Repair Quay. Watch D, revision one. Low, detent A, local test passed. I'll hold. If the observation changes, this acknowledgement changes with it."}];
blocks['A4-ACK-INLET']=[{who:'QUIBBLE',text:'Service Inlet at Blind Inlet. Watch D, revision one. Low, detent C, test passed. Holding for handover.'},{who:'NELL',text:'And no independent flourish?'},{who:'QUIBBLE',text:'I have isolated the flourish.'}];
blocks['A4-EGG-MASCOT']=[{who:'NELL',text:'The monkey has changed its mind.'},{who:'PIP',text:'The advertising department assures me it has always believed the newest thing.'},{who:'NELL',text:'Can we ask the monkey?'},{who:'PIP',text:'Its spokesperson has declined to comment.'}];
blocks['A4-EGG-CLOCK']=[{who:'NELL',text:'A visitor from the distant pocket.'},{who:'NELL',text:'The appointment is yesterday, the inspection is tomorrow, and the lint is regrettably available now.'},{who:'NELL',text:'I shall leave chronology to the breakfast department.'}];
blocks['A4-EGG-CREDIT']=[{who:'NELL',text:'The system is self-cleaning?'},{who:'BRAM',text:'I am the self.'},{who:'NELL',text:'Does the self get a day off?'},{who:'BRAM',text:'It is mentioned in the larger manual.'}];
blocks['A4-ORIN-READY']=[{who:'ORIN',text:'Second Opinion stays ready at Blind Inlet. I will captain the next voyage. We check the departure water when you come aboard.'},{who:'NELL',text:'Then the inlet attendant stays ashore, and the captain stays with the boat.'}];
await writeFile('src/act4-dialogue.json',JSON.stringify({blocks,topics},null,2)+'\n');console.log(`${Object.keys(blocks).length} blocks, ${topics.length} topics`);