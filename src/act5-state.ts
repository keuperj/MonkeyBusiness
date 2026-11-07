import {rooms4,items4,parse4,type State4} from './act4-state';
export const rooms5={...rooms4,service:'Bellweather Service Landing',gallery:'Caretaker’s Gallery',recorder:'Recorder Room',overlook:'Chart-Drum Overlook',command:'Central Command Floor',bypass:'Inspection Bypass Gallery'};
export type Room5=keyof typeof rooms5;
export const island5:Room5[]=['service','gallery','recorder','overlook','command','bypass'];
export const items5={...items4,eventCopy:'Witnessed full event copy',publicChart:'Public working chart'};
export type Item5=keyof typeof items5;
export const flags5=['opening','voyage','arrived','captured','witness','procedure','dry','holds','diagram','interlock','inspected','admitted','challenged','emergency','emergencyChecked','verified','passage','event','review','published','agreement','boatReady','complete','eggExhibitZero'] as const;
export type Flag5=typeof flags5[number];
export const authorities=['CENTRAL','HELD_CENTRAL','ISOLATED_HOLD','INLET_LOCAL_HOLD','LOCAL_SEQUENCE','LOCAL_SERVICE'] as const;
export type Authority5=typeof authorities[number];
export const stationNames5=['Outer Landing','Repair Quay','Service Inlet'];
export const attendants5=['ROOK','MARA','QUIBBLE'];
export const levels5=['High','Middle','Low'];
export const detents5=['B','B','C'];
export type Station5={read:boolean;watch:string;revision:string;level:string;detent:string;test:string;ack:string};
export type State5={version:5;room:Room5;boat:'inlet'|'service';flags:Record<Flag5,boolean>;items:Item5[];seen:string[];log:{who:string;text:string}[];choices:Record<string,string[]>;stations:Station5[];witness:string;round:number;authority:Authority5;recovery:number;farewells:string[];source:'canonical'|'act4'|'debug';sourceRoster:string[]};
export const AUTO5='monkey-buisness-act5-auto',SAVE5='monkey-buisness-act5-save';
export function fresh5(previous?:State4):State5{
 if(previous){previous=parse4(JSON.stringify(previous));if(!previous.flags.complete)throw Error('Complete Act IV before importing it.');}
 return {version:5,room:'inlet',boat:'inlet',flags:Object.fromEntries(flags5.map(f=>[f,false])) as State5['flags'],items:previous?[...previous.items]:['chart','pencil','hook','lint','drawing','receipt','tracing','recordCopy','procedure','handle'],seen:[],log:previous?.log.slice(-400)||[],choices:{},stations:Array.from({length:3},()=>({read:false,watch:'Watch D',revision:'1',level:'Low',detent:'A',test:'',ack:''})),witness:'',round:0,authority:'CENTRAL',recovery:0,farewells:[],source:previous?'act4':'canonical',sourceRoster:previous?previous.stations.map(s=>[s.watch,s.revision,s.level,s.detent].join('|')):['Watch D|1|High|B','Watch D|1|Low|A','Watch D|1|Low|C']};
}
export function fingerprint5(s:State5,i:number){const x=s.stations[i];return [attendants5[i],stationNames5[i],x.watch,x.revision,x.level,x.detent,'test-2'].join('|');}
export function roster5(s:State5){return s.stations.map((_,i)=>fingerprint5(s,i)).join(';');}
export function matches5(s:State5,i:number){const x=s.stations[i];return s.flags.captured&&x.read&&x.watch==='Watch D'&&x.revision==='2'&&x.level===levels5[i]&&x.detent===detents5[i];}
export function ready5(s:State5){return s.stations.every((x,i)=>matches5(s,i)&&x.test===fingerprint5(s,i)&&x.ack===x.test)&&s.flags.witness&&s.witness===roster5(s);}
export function capture5(s:State5){if(s.authority!=='CENTRAL'||s.flags.captured)return;s.flags.captured=true;s.flags.witness=false;s.witness='';for(const x of s.stations){x.read=false;x.test='';x.ack='';}}
export function change5(s:State5,i:number,key:'watch'|'revision'|'level'|'detent',v:string){if(s.authority!=='CENTRAL'||s.flags.review)return;const x=s.stations[i];x[key]=v;x.test='';x.ack='';s.witness='';s.flags.witness=false;}
export function allowed5(s:State5,r:Room5){return (!['command','bypass'].includes(r)||s.flags.admitted)&&(!island5.includes(r)||s.flags.arrived);}
export function handover5(s:State5,action:string):string{
 if(s.flags.review)return 'The reviewed service is read-only.';
 if(!ready5(s)||!s.flags.inspected||!s.flags.challenged)return 'Read current station replies, inspect the bypass and record all five supported challenge rounds.';
 const transitions:Record<string,[Authority5,Authority5]>={hold:['CENTRAL','HELD_CENTRAL'],isolate:['HELD_CENTRAL','ISOLATED_HOLD'],inlet:['ISOLATED_HOLD','INLET_LOCAL_HOLD'],outer:['INLET_LOCAL_HOLD','LOCAL_SEQUENCE'],quay:['LOCAL_SEQUENCE','LOCAL_SERVICE']};
 const t=transitions[action];if(!t||s.authority!==t[0])return 'Wrong sequence. Hold central, isolate command, establish inlet relief, outer return, then quay balance.';
 if(s.recovery)return 'Finish the witnessed recovery before beginning another operation.';
 if(action==='outer'&&!s.flags.emergencyChecked)return 'Keep the warning open. Verify Vane’s emergency claim before continuing.';
 s.authority=t[1];if(action==='inlet')s.flags.emergency=true;return '';
}
export function recovery5(s:State5):string{
 if(s.flags.review)return 'Published service cannot be reversed from this inspection panel.';
 if(s.authority==='CENTRAL')return 'Central command is already responsible.';
 s.recovery++;
 const previous:Record<string,Authority5>={LOCAL_SERVICE:'LOCAL_SEQUENCE',LOCAL_SEQUENCE:'INLET_LOCAL_HOLD',INLET_LOCAL_HOLD:'ISOLATED_HOLD',ISOLATED_HOLD:'HELD_CENTRAL',HELD_CENTRAL:'CENTRAL'};
 s.authority=previous[s.authority];s.flags.verified=false;s.flags.passage=false;s.flags.event=false;s.seen=s.seen.filter(id=>!['cover','outside'].includes(id));s.items=s.items.filter(i=>i!=='eventCopy');
 if(s.authority==='CENTRAL'){s.recovery=0;s.flags.emergencyChecked=false;s.flags.witness=false;s.witness='';for(const x of s.stations){x.test='';x.ack='';}}
 return '';
}
export function parse5(raw:string):State5{
 const s=JSON.parse(raw) as State5;const fail=()=>{throw Error('Invalid Act V save');};
 if(!s||s.version!==5||!Object.hasOwn(rooms5,s.room)||!['inlet','service'].includes(s.boat)||!s.flags||flags5.some(f=>typeof s.flags[f]!=='boolean')||!Array.isArray(s.items)||s.items.some(i=>!Object.hasOwn(items5,i))||new Set(s.items).size!==s.items.length||!Array.isArray(s.seen)||s.seen.some(x=>typeof x!=='string')||!Array.isArray(s.log)||s.log.length>800||s.log.some(l=>typeof l?.who!=='string'||typeof l?.text!=='string')||!s.choices||typeof s.choices!=='object'||Object.values(s.choices).some(x=>!Array.isArray(x)||x.some(v=>typeof v!=='string'))||!Array.isArray(s.farewells)||s.farewells.some(x=>typeof x!=='string')||!['canonical','act4','debug'].includes(s.source)||!Array.isArray(s.sourceRoster)||s.sourceRoster.length!==3||s.sourceRoster.some(x=>typeof x!=='string')||!authorities.includes(s.authority)||!Number.isInteger(s.round)||s.round<0||s.round>5||!Number.isInteger(s.recovery)||s.recovery<0||s.recovery>5||typeof s.witness!=='string')fail();
 if(!Array.isArray(s.stations)||s.stations.length!==3||s.stations.some(x=>!x||typeof x.read!=='boolean'||!['Watch C','Watch D'].includes(x.watch)||!['1','2'].includes(x.revision)||!['Low','Middle','High'].includes(x.level)||!['A','B','C'].includes(x.detent)||typeof x.test!=='string'||typeof x.ack!=='string'))fail();
 const f=s.flags;const req:[boolean,boolean][]=[[f.arrived,f.voyage],[f.captured,f.arrived],[f.admitted,f.procedure&&f.arrived],[f.inspected,f.dry&&f.holds&&f.diagram&&f.interlock&&f.procedure],[f.challenged,s.round===5],[s.round>0,f.admitted],[f.witness,ready5(s)],[s.authority!=='CENTRAL',f.challenged&&f.inspected&&ready5(s)],[f.emergencyChecked,f.emergency],[['LOCAL_SEQUENCE','LOCAL_SERVICE'].includes(s.authority),f.emergencyChecked],[f.verified,s.authority==='LOCAL_SERVICE'&&ready5(s)],[f.passage,f.verified],[f.event,f.passage&&s.items.includes('eventCopy')],[s.items.includes('eventCopy'),f.event],[f.review,f.event],[f.published,f.review&&s.items.includes('publicChart')],[s.items.includes('publicChart'),f.published],[f.agreement,f.published],[f.boatReady,f.agreement],[f.complete,f.boatReady],[f.eggExhibitZero,s.items.includes('lint')],[island5.includes(s.room),f.arrived&&s.boat==='service'],[!island5.includes(s.room),s.boat==='inlet'],[s.recovery>0,s.authority!=='CENTRAL'&&!f.review]];
 if(req.some(([a,b])=>a&&!b)||!allowed5(s,s.room)||s.stations.some((x,i)=>(!!x.test&&(!matches5(s,i)||x.test!==fingerprint5(s,i)))||(!!x.ack&&x.ack!==x.test))||!['chart','pencil','hook','drawing','receipt','tracing','recordCopy','procedure','handle'].every(i=>s.items.includes(i as Item5)))fail();return s;
}
export function debug5(room:Room5,stage='',intro=false):State5{
 const s=fresh5();s.source='debug';s.flags.opening=!intro;s.room=room;
 const advanced=['duel','isolated','emergency','local','review','chart','epilogue','complete'].includes(stage);
 if(island5.includes(room)||advanced){s.flags.voyage=true;s.flags.arrived=true;}
 if(['command','bypass'].includes(room)||advanced){s.flags.procedure=true;s.flags.admitted=true;}
 if(advanced){capture5(s);s.stations.forEach((x,i)=>{Object.assign(x,{read:true,watch:'Watch D',revision:'2',level:levels5[i],detent:detents5[i]});x.test=fingerprint5(s,i);x.ack=x.test;});s.witness=roster5(s);s.flags.witness=true;for(const f of ['dry','holds','diagram','interlock','inspected'] as Flag5[])s.flags[f]=true;s.round=stage==='duel'?2:5;s.flags.challenged=s.round===5;}
 if(stage==='isolated')s.authority='ISOLATED_HOLD';
 if(stage==='emergency'){s.authority='INLET_LOCAL_HOLD';s.flags.emergency=true;}
 if(['local','review','chart','epilogue','complete'].includes(stage)){s.authority='LOCAL_SERVICE';Object.assign(s.flags,{emergency:true,emergencyChecked:true,verified:true});}
 if(['review','chart','epilogue','complete'].includes(stage)){Object.assign(s.flags,{passage:true,event:true});s.items.push('eventCopy');}
 if(['chart','epilogue','complete'].includes(stage))s.flags.review=true;
 if(['epilogue','complete'].includes(stage)){s.flags.published=true;s.items.push('publicChart');}
 if(stage==='complete')Object.assign(s.flags,{agreement:true,boatReady:true,complete:true});
 s.boat=island5.includes(room)?'service':'inlet';return parse5(JSON.stringify(s));
}