import {roomNames,type Room2} from './act2-state';
import {items3,type State3} from './act3-state';
export const rooms4={...roomNames,station:'Repair Quay · Dry Station Chamber'};
export type Room4=keyof typeof rooms4;
export const items4={...items3,link:'Captive messenger link',handle:'Insulated test handle'};
export type Item4=keyof typeof items4;
export const flags4=['opening','notice','slips','tariff','charter','evidence','argument','response','disclosure','published','briefing','maraConsent','dry','warning','door','linkFitted','loopTest','online','snapshot','rookConsent','partners','trained','bram','legend','rehearsed','offerRead','declined','voyage','complete','eggMascot','eggAppointment','eggMaintenanceCredit'] as const;
export type Flag4=typeof flags4[number];
export const stationRooms=['landing','station','inlet'] as const;
export const stationNames=['Outer Landing','Repair Quay','Service Inlet'];
export const attendants=['ROOK','MARA','QUIBBLE'];
export const levels=['High','Low','Low'];
export const detents=['B','A','C'];
export type Station4={inspected:boolean;watch:string;revision:string;level:string;detent:string;test:string;ack:string};
export type State4={version:4;room:Room4;flags:Record<Flag4,boolean>;items:Item4[];seen:string[];log:{who:string;text:string}[];messenger:'RUN'|'SERVICE';stations:Station4[];rehearsal:string;choices:Record<string,string[]>;actors:{mara:Room4;rook:Room4;quibble:Room4;print:Room4;vane:Room4|'shoal'};live:'CENTRAL';boat:'inlet'};
export const AUTO4='monkey-buisness-act4-auto',SAVE4='monkey-buisness-act4-save';
export function fresh4(previous?:State3):State4{if(previous&&!previous.flags.complete)throw Error('Complete Act III before importing it.');return {version:4,room:'quay',flags:Object.fromEntries(flags4.map(k=>[k,false])) as State4['flags'],items:previous?[...previous.items]:['chart','pencil','hook','lint','drawing','receipt','tracing','recordCopy','procedure'],seen:[],log:previous?.log.slice(-500)||[],messenger:'RUN',stations:Array.from({length:3},()=>({inspected:false,watch:'Watch C',revision:'Training',level:'Middle',detent:'A',test:'',ack:''})),rehearsal:'',choices:{},actors:{mara:'quay',rook:'workshop',quibble:'bridge',print:'bridge',vane:'office'},live:'CENTRAL',boat:'inlet'};}
export function fingerprint(s:State4,i:number){const x=s.stations[i];return [attendants[i],x.watch,x.revision,x.level,x.detent].join('|');}
export function roster(s:State4){return s.stations.map((_,i)=>fingerprint(s,i)).join(';');}
export function matches(s:State4,i:number){const x=s.stations[i];return x.inspected&&x.watch==='Watch D'&&x.revision==='1'&&x.level===levels[i]&&x.detent===detents[i];}
export function present(s:State4,i:number){return i===0?s.flags.rookConsent&&s.actors.rook==='landing':i===1?s.flags.maraConsent&&s.actors.mara==='station':s.flags.trained&&s.actors.quibble==='inlet';}
export function stationsReady(s:State4){return s.stations.every((x,i)=>matches(s,i)&&present(s,i)&&x.test===fingerprint(s,i)&&x.ack===fingerprint(s,i));}
export function rehearsalReady(s:State4){return stationsReady(s)&&s.flags.bram&&s.flags.online&&s.flags.legend&&s.flags.rehearsed&&s.rehearsal===roster(s);}
export function completeReady(s:State4){return s.flags.published&&s.flags.declined&&s.flags.voyage&&rehearsalReady(s);}
export function changeStation4(s:State4,i:number,key:'watch'|'revision'|'level'|'detent',value:string){if(s.flags.complete)return;s.stations[i][key]=value;s.stations[i].test='';s.stations[i].ack='';s.flags.rehearsed=false;s.rehearsal='';}
export function parse4(raw:string):State4{
 const s=JSON.parse(raw) as State4;const fail=()=>{throw Error('Invalid Act IV save');};
 if(!s||s.version!==4||!Object.hasOwn(rooms4,s.room)||s.live!=='CENTRAL'||s.boat!=='inlet'||!s.flags||flags4.some(k=>typeof s.flags[k]!=='boolean')||!Array.isArray(s.items)||s.items.some(i=>!Object.hasOwn(items4,i))||new Set(s.items).size!==s.items.length||!Array.isArray(s.log)||s.log.length>800||s.log.some(l=>typeof l?.who!=='string'||typeof l?.text!=='string')||!Array.isArray(s.seen)||s.seen.some(x=>typeof x!=='string')||!['RUN','SERVICE'].includes(s.messenger)||typeof s.rehearsal!=='string'||!s.choices||Object.values(s.choices).some(a=>!Array.isArray(a)||a.some(v=>typeof v!=='string'))||!s.actors)fail();
 if(!Array.isArray(s.stations)||s.stations.length!==3||s.stations.some(x=>!x||typeof x.inspected!=='boolean'||!['Watch C','Watch D'].includes(x.watch)||!['Training','1'].includes(x.revision)||!['Low','Middle','High'].includes(x.level)||!['A','B','C'].includes(x.detent)||typeof x.test!=='string'||typeof x.ack!=='string'))fail();
 const f=s.flags;if(!['quay','tavern','station'].includes(s.actors.mara)||!['workshop','landing'].includes(s.actors.rook)||!['bridge','inlet'].includes(s.actors.quibble)||!['bridge','quay'].includes(s.actors.print)||!['office','shoal'].includes(s.actors.vane)||((s.items.includes('link')||s.items.includes('handle'))&&!f.briefing)||(f.trained&&!f.partners)||(f.rookConsent&&!f.briefing)||(!f.opening&&s.room!=='quay'))fail();
 const requires:[boolean,boolean][]=[[f.evidence,f.slips&&f.tariff],[f.argument,f.charter],[f.published,f.evidence&&f.argument&&f.response&&f.disclosure],[f.door,f.maraConsent&&f.dry&&f.warning],[s.room==='station',f.door],[s.actors.mara==='station',f.door],[s.actors.rook==='landing',f.rookConsent&&f.briefing],[s.actors.quibble==='inlet',f.trained&&f.partners],[s.actors.print==='quay',f.partners],[f.linkFitted,f.briefing&&!s.items.includes('link')],[f.loopTest,f.linkFitted],[f.online,f.loopTest&&s.messenger==='RUN'],[f.snapshot,f.online],[f.bram,f.online],[f.rehearsed,rehearsalReady(s)],[f.declined,f.offerRead],[f.complete,completeReady(s)],[s.actors.vane==='shoal',f.complete],[f.complete,s.actors.vane==='shoal']];
 if(requires.some(([a,b])=>a&&!b)||s.stations.some((x,i)=>(!!x.test&&(!matches(s,i)||x.test!==fingerprint(s,i)||!f.snapshot||!s.items.includes('handle')))||(!!x.ack&&(x.test!==x.ack||!present(s,i))))||!['chart','pencil','hook','drawing','receipt','tracing','recordCopy','procedure'].every(i=>s.items.includes(i as Item4)))fail();return s;
}
export function debug4(room:Room4,intro=false){const s=fresh4();s.room=room;if(intro)return s;s.flags.opening=true;s.actors.mara='tavern';if(room==='station'){Object.assign(s.flags,{maraConsent:true,dry:true,warning:true,door:true});s.actors.mara='station';}return parse4(JSON.stringify(s));}
export function harbourRoom(room:Room4):Room2{return room==='station'?'quay':room;}