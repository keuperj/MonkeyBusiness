export type Room = 'tavern' | 'bridge' | 'landing';
export const rooms: Record<Room,string> = {tavern:'The Crooked Compass',bridge:'Quibble’s Crossing',landing:'Outer Landing'};
export const flagNames = ['intro','mugTaken','returned','chestOpen','hookTaken','chart','passage','welcome','board','marks','compared','freed','witnessed','evidence','complete','egg'] as const;
export type Flag = typeof flagNames[number];
export type Line = {who:string;text:string};
export type ChapterState = {version:1;room:Room;flags:Record<Flag,boolean>;positions:Record<Room,{x:number;y:number}>;duel:{active:boolean;answers:boolean[];feedback:boolean};lead:string;log:Line[]};
export function fresh():ChapterState {return {version:1,room:'tavern',flags:Object.fromEntries(flagNames.map(k=>[k,false])) as Record<Flag,boolean>,positions:{tavern:{x:620,y:825},bridge:{x:490,y:745},landing:{x:590,y:840}},duel:{active:false,answers:[],feedback:false},lead:'',log:[]};}
export function parseSave(raw:string):ChapterState {
 const s=JSON.parse(raw) as ChapterState;
 // Older saves awarded the survey immediately on unlocking.
 if(s?.flags&&!Object.hasOwn(s.flags,'chestOpen'))s.flags.chestOpen=s.flags.chart===true;
 if(s?.flags&&!Object.hasOwn(s.flags,'hookTaken'))s.flags.hookTaken=s.flags.freed===true;
 if(!s||s.version!==1||!Object.hasOwn(rooms,s.room)||!s.flags||flagNames.some(k=>typeof s.flags[k]!=='boolean'))throw Error('Invalid save');
 for(const r of Object.keys(rooms) as Room[]){const p=s.positions?.[r];if(!p||!Number.isFinite(p.x)||!Number.isFinite(p.y)||p.x<60||p.x>1480||p.y<700||p.y>970)throw Error('Invalid position');}
 const f=s.flags;
 if((f.returned&&!f.mugTaken)||(f.chestOpen&&!f.returned)||(f.chart&&!f.chestOpen)||(f.compared&&!(f.chart&&f.board&&f.marks))||(f.freed&&!f.hookTaken)||(f.witnessed&&!(f.compared&&f.freed))||(f.evidence&&!f.witnessed)||(f.complete&&!f.evidence)||(s.room==='landing'&&!f.passage))throw Error('Invalid progress');
 if(!s.duel||typeof s.duel.active!=='boolean'||typeof s.duel.feedback!=='boolean'||!Array.isArray(s.duel.answers)||s.duel.answers.length>5||s.duel.answers.some(x=>typeof x!=='boolean')||(s.duel.feedback&&!s.duel.answers.length)||(s.duel.active&&s.room!=='bridge'))throw Error('Invalid duel');
 if(typeof s.lead!=='string'||!['','newspaper','hardware','ship'].includes(s.lead)||(f.complete&&!s.lead))throw Error('Invalid lead');
 if(!Array.isArray(s.log)||s.log.length>500||s.log.some(l=>!l||typeof l.who!=='string'||typeof l.text!=='string'||l.who.length>40||l.text.length>1000))throw Error('Invalid journal');
 return s;
}
export const AUTO='monkey-buisness-act1-auto';
export const SAVE='monkey-buisness-act1-save';
