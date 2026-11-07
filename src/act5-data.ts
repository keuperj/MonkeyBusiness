import {art3,spots3} from './act3-data';
import {art4,objects4,charter,slips,tariff,routing,legend} from './act4-data';
import {rooms5,island5,type Room5,type State5} from './act5-state';
import type {Spot} from './act2-data';
export {charter,slips,tariff,routing,legend};
export const art5:Record<Room5,string>={...art3,...art4,command:'act5/command',bypass:'act5/bypass'};
export const documents5={
 pilot:'PILOT V5-1 / CURRENT VOYAGE. WEST SERVICE APPROACH. SLACK TURN. East company arm restricted. Do not use the earlier EBB board.',
 transit:'Fixed transit: WAREHOUSE CORNER / LIGHTHOUSE NOTCH aligned. Marked west service approach clear. Confirm again with Orin before each voyage.',
 clearance:'Second Opinion: class S. Current marked west service route permits inspected class S vessels. Orin remains captain and owner.',
 procedure:'DRY MAINTENANCE PROVISION: Named inspector and caretaker may perform a witnessed changeover with current local cover and seated gate-position holds. Isolate CENTRAL COMMAND TRANSMISSION only. Retain DRIVE POWER and PUBLIC SIGNAL. Inlet C relief → Outer B return → Quay B balance. Never reconnect central while a local pilot is engaged. This procedure does not adjudicate the charter.',
 dry:'DRY PERSONNEL ROUTE. Inspection telltale clear. Wet culvert inaccessible. Keep behind the glass and guard rails.',
 holds:'Outer, Quay, Inlet: mechanical position holds seated. Gates retain their held positions during the bounded command changeover.',
 diagram:'COMMAND transmits central orders. DRIVE POWER powers both central and local equipment. PUBLIC SIGNAL carries warnings and named readbacks. Open command only; keep the other two continuous.',
 interlock:'EMERGENCY RETURN is a public request, not an unconditional actuator. Reconnection requires all local pilots disengaged under witnessed hold. Emergency assistance remains available.',
 docket:'R17: trial command and acknowledgement. R18: calibration source Nell. R19: exclusive dispatch authorised, EXECUTION PENDING. The historical relief incident had a different operator.',
 emergency:'Double circle: DIRECTOR ASSERTS EMERGENCY CENTRAL AUTHORITY. Claim: LOCAL COVER UNVERIFIED. Record and repeat publicly. A declaration alone is not independent hazard evidence.',
 cover:'Current named inlet physical return confirmed. Outer and Quay position holds seated. Watch D / revision 2. These reports describe present paused-stage cover, not future readiness.',
 outside:'Orin’s independent sighting: marked approach clear. No vessel in the changeover zone. Observation current for the paused check, not a permanent guarantee.',
 lighter:'PUBLIC SUPPLY LIGHTER: class S; inspection passed; west service route clearance current; exclusive account NONE. Authorise one monitored passage only.',
 exhibit:'EXHIBIT ZERO — CLAIMS AWAITING EVIDENCE. CLEAN DISPLAY TRAY. NO MACHINE CONNECTION. An empty display for something with a more impressive story than specification.',
 finding:'HC-5 — Harbour charter review. Dispatch records establish an exclusive-account condition on ordinary passage, contrary to the public-service undertaking. An emergency assertion does not remove the duty to state and verify a hazard. Itemised maintenance charges and evidenced safety restrictions remain permissible. Exclusive dispatch privileges withdrawn. Fair Passage must provide records and supervised remedial work. The historic relief incident is not attributed to Director Vane. Review and correction records remain public.',
 chart:'PUBLIC WORKING EDITION 1. Fixed warehouse/lighthouse transit; dated soundings and vessel limits; distinct test, announcement, emergency and handover signals; station contacts and relief records; trained maintenance boundaries; unsurveyed reach explicitly blank. Corrections: Quay Quill and named station desks. Reproduction permitted. Surveying and itemised maintenance remain paid work.',
 agreement:'Still Deciding: existing repair-yard hull and itemised fitting work as payment for completed surveys and defined future visits. Nell owns the vessel, may refuse unsafe work and grants public reproduction of agreed survey editions. No exclusive navigation rights, indefinite debt or transfer of Second Opinion. Weeks later: trained relief crews have signed the published station roster.',
};
export type Doc5=keyof typeof documents5;
const s=(id:string,name:string,x:number,y:number,look:string):Spot=>({id,name,x,y,w:180,h:150,look});
export function actors5(state:State5):Record<string,Room5>{const late=state.flags.published;return {MARA:late?'tavern':'station',ROOK:late?'workshop':'landing',QUIBBLE:late?'bridge':'inlet','FINE PRINT':late?'bridge':'quay',PIP:'press',ORIN:state.boat,BRAM:state.flags.admitted?'bypass':'gallery',VANE:state.flags.review?'bypass':'command'};}
export function spots5(state:State5):Spot[]{
 const room=state.room;const base=room in objects4?objects4[room as keyof typeof objects4]:room in spots3?spots3[room as keyof typeof spots3]:[];
 const result=base.filter(x=>!x.person&&!['link','handle','tracing','key'].includes(x.id)).map(x=>({...x}));
 const add=(id:Doc5,name:string,x:number,y:number)=>result.push(s(id,name,x,y,documents5[id]));
 if(room==='inlet'){add('pilot','Current pilot notice',300,400);add('transit','Fixed-transit report',650,430);add('clearance','Second Opinion clearance card',1000,500);}
 if(room==='gallery')add('procedure','Dry changeover provision',450,460);
 if(room==='overlook')add('interlock','Emergency return plate',1100,500);
 if(room==='command'){add('docket','Pending dispatch docket',400,470);add('diagram','Command coupling legend',820,480);add('emergency','Public emergency declaration',1250,460);}
 if(room==='bypass'){add('dry','Dry inspection telltale',250,450);add('holds','Gate-position holds',530,500);add('diagram','Three-circuit diagram',800,450);add('interlock','Emergency return interlock',1200,480);}
 if(room==='service'){add('outside','Independent passage sighting',1000,450);add('lighter','Public lighter dispatch card',450,500);}
 if(room==='recorder')add('exhibit','Exhibit Zero display tray',1200,620);
 if(state.flags.review&&['office','quay','press'].includes(room))add('finding','Charter review finding',600,470);
 if(state.flags.published&&room==='quay')add('agreement','Survey boat work agreement',850,500);
 const positions:Record<string,[number,number]>={MARA:[1200,850],ROOK:[1080,820],QUIBBLE:[1000,room==='bridge'?745:850],'FINE PRINT':[1350,740],PIP:[1170,840],ORIN:[820,820],BRAM:[1050,850],VANE:[1250,850]};
 for(const [who,at] of Object.entries(actors5(state)))if(at===room){const [x,y]=positions[who];result.push({...s(who.toLowerCase().replaceAll(' ','-'),who,x,y,'A named partner, not an inventory item.'),h:who==='FINE PRINT'?150:340,person:who});}
 return result.filter((x,i,a)=>a.findIndex(y=>y.id===x.id)===i);
}
export const duels5=[
 {claim:'The water, not the account, decided who waited.',replies:['Every fee was illegal.','Two inspected boats met the same conditions; your slips name the missing contract.','R19 has already executed.'],sources:['Pending R19 order','T17-A/B slips and R17 acknowledgement','Old relief incident'],answer:[1,1]},
 {claim:'Your own work made the system accurate.',replies:['I never supplied calibration.','You caused the historic grounding.','I supplied calibration, not consent to exclusive dispatch.'],sources:['R18 annotation and my published disclosure','Old relief incident','Blank display recess'],answer:[2,0]},
 {claim:'Without central command you have three strangers pulling levers.',replies:['Three named attendants, one current revision, a tested sequence and a right to hold.','The Watch C model worked.','I will pull every lever myself.'],sources:['Act IV revision-one rehearsal','Watch C training board','Revision-two roster and bypass procedure'],answer:[0,2]},
 {claim:'Safety is a service. Service has a price.',replies:['All maintenance must be free.','Itemised maintenance may be charged; an exclusive account cannot condition ordinary passage.','All restrictions are unlawful.'],sources:['Company mascot','Charter clauses 4/7 and FP-D/1','Original survey alone'],answer:[1,1]},
 {claim:'Choose. My authority, or nobody responsible.',replies:['Give me sole control.','Smash the drum.','Shared responsibility is still responsibility. Record your instruction beside our answers.'],sources:['Public-signalling clause 9 and witness receipt','Commission receipt alone','An impressive sword'],answer:[2,0]},
];
export const chartSections5=[
 {label:'Fixed position',options:['Drifting float','Warehouse corner / lighthouse notch'],answer:1},
 {label:'Depth and watch',options:['Safe at every tide','Dated soundings and current-source limits'],answer:1},
 {label:'Public signals',options:['Emergency assertion is not independent hazard proof','Double circle proves danger'],answer:0},
 {label:'Responsibility',options:['Ask Nell for every movement','Named station contacts and relief records'],answer:1},
 {label:'Maintenance boundary',options:['Trained assistance and inspected procedures','Anyone may operate live gates'],answer:0},
 {label:'Uncertainty and corrections',options:['Fill every blank confidently','Mark unsurveyed reach and correction contact'],answer:1},
];
export {rooms5,island5};