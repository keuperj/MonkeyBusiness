import {locationMap} from './location-map';
import Phaser from 'phaser';
import { Front } from './front';
import { routePath } from './map-routes';
import './chapter.css';
import {decorateControls,pocketTrinkets,icon} from './control-icons';
import { RoomHeader, roomBadges, paintSound } from './room-header';
import lines from './chapter-lines.json';
import duel from './duel.json';
import { tavernAudio as audio } from './audio';
import { ChapterScene, targets } from './chapter-scene';
import { fresh, parseSave, rooms, AUTO, SAVE, type ChapterState, type Room, type Line } from './chapter-state';

type LineId=keyof typeof lines;
type Verb='walk'|'look'|'talk'|'take'|'use';
type Item='mug'|'key'|'chart'|'hook';
const $=<T extends HTMLElement=HTMLElement>(id:string)=>document.getElementById(id) as T;
let playing=false;
let state=fresh(),ready=false,verb:Verb='walk',selected:Item|null=null,busy=false,transition=false;
let reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let lastSpeech:Line[]=[],evidenceChoice=new Set<number>();
let mapFinish:(()=>void)|undefined;
let audioRoom:Room|undefined;
const panel=$('panel');
const roomHeader=new RoomHeader($('room-header'));
function notice(message:string){$('notice').textContent=message;}
function persist(){if(!playing)return;try{localStorage.setItem(AUTO,JSON.stringify(state));}catch{notice('Autosave unavailable. Keep this tab open to retain current progress.');}}
function record(text:string,who='NOTEBOOK'){if(!state.log.some(l=>l.text===text&&l.who===who))state.log.push({who,text});state.log=state.log.slice(-500);persist();}
function caption(line:Line){$('caption').querySelector('b')!.textContent=line.who;$('caption').querySelector('span')!.textContent=line.text;}
let dialogueEpoch=0;
function stopRoomDialogue(){dialogueEpoch++;audio.stopSpeech();lastSpeech=[];caption({who:'',text:''});clearPanel();}
function speak(sequence:Line[]){if(transition)return;const epoch=dialogueEpoch;lastSpeech=sequence;sequence.forEach(l=>record(l.text,l.who));if(sequence[0])caption(sequence[0]);void audio.sequence(sequence,line=>{if(epoch===dialogueEpoch&&!transition)caption(line);});}
function ids(...names:LineId[]){return names.map(k=>lines[k]);}
function button(label:string,action:()=>void,parent:HTMLElement=panel,primary=false,id?:string){const b=document.createElement('button');b.textContent=label;b.className=primary?'primary':'';if(id)b.id=id;b.onclick=action;parent.append(b);return b;}
function para(text:string,parent=panel,className=''){const p=document.createElement('p');p.textContent=text;p.className=className;parent.append(p);return p;}
function heading(text:string,parent=panel){const h=document.createElement('h2');h.textContent=text;parent.append(h);}
function clearPanel(title?:string){panel.replaceChildren();if(title)heading(title);}
function display(sequence:Line[],after:()=>void=roomActions){clearPanel();for(const line of sequence)para(`${line.who}: ${line.text}`);speak(sequence);after();}
function say(...names:LineId[]){display(ids(...names));}
function goal(){const f=state.flags;if(f.complete)return 'Act I complete · Explore the harbour or review your notebook.';if(!f.chart)return 'Find surveying work · Mara’s old chart could be a start.';if(!f.passage)return 'Reach the outer landing · Talk your way past Quibble.';if(!f.compared)return 'Check the old chart · Read the tide board and identify the fixed marks.';if(!f.freed)return 'Make an independent observation · Free the tethered float.';if(!f.witnessed)return 'Watch the channel · You have a baseline and a working indicator.';if(!f.evidence)return 'Record what you can support · Separate observations from accusations.';return 'Choose your next lead · Who else knows about the changing current?';}
function updateDuelScore(){const d=state.duel;const wins=d.answers.filter(Boolean).length;$('duel-score').hidden=state.room!=='bridge'||(!d.active&&d.answers.length!==duel.rounds.length);$('nell-score').textContent=String(wins);$('pirate-score').textContent=String(d.answers.length-wins);$('round-count').textContent=d.active?`EXCHANGE ${Math.min(duel.rounds.length,d.answers.length+(d.feedback?0:1))} / ${duel.rounds.length}`:'DUEL COMPLETE';}
function updateUI(){updateDuelScore();document.title=`Monkey Buisness — ${rooms[state.room]}`;$('goal').textContent=goal();$('game').dataset.room=state.room;
 roomHeader.render(state.room,Object.keys(rooms).map(id=>({id,badge:roomBadges[id],reachable:id!=='landing'||state.flags.passage})),id=>travel(id as Room),busy||transition);
 $('inventory').replaceChildren();const inventory:Item[]=[];if(state.flags.mugTaken&&!state.flags.returned)inventory.push('mug');if(state.flags.returned&&!state.flags.chestOpen)inventory.push('key');if(state.flags.chart)inventory.push('chart');if(state.flags.hookTaken)inventory.push('hook');
 pocketTrinkets($('inventory'));for(const item of inventory){const label={mug:'Brass tankard',key:'Brass key',chart:'Old survey',hook:'Boathook'}[item];const b=button(label,()=>{setVerb('use');selected=item;updateUI();command();},$('inventory'));b.setAttribute('aria-label',`Use ${label}`);if(ready){b.innerHTML=icon(item);b.title=label;b.dataset.tooltip=label;}b.classList.toggle('active',selected===item);}
 document.querySelectorAll<HTMLButtonElement>('[data-verb]').forEach(b=>{b.classList.toggle('active',b.dataset.verb===verb);b.setAttribute('aria-pressed',String(b.dataset.verb===verb));});
 $('hotspots').setAttribute('aria-pressed',String(scene.showMarks));$('motion').setAttribute('aria-pressed',String(reduced));}
function command(name='…'){const labels={walk:'Walk to',look:'Look at',talk:'Talk to',take:'Pick up',use:'Use'};$('command').textContent=selected?`Use ${selected==='chart'?'old survey':selected} with ${name}`:`${labels[verb]} ${name}`;}
function setVerb(v:Verb){verb=v;selected=null;command();if(ready)updateUI();}
function roomActions(){const wrap=document.createElement('div');wrap.className='choices';panel.append(wrap);
 if(state.room==='tavern'){button('Talk to Mara',()=>conversation('mara'),wrap);button('Talk to Orin',()=>conversation('orin'),wrap);}
 if(state.room==='bridge'){button('Talk to Captain Quibble',()=>conversation('quibble'),wrap);button('Talk to Fine Print',()=>conversation('parrot'),wrap);button(state.flags.passage?'Friendly rematch':'Challenge the bridge keepers',startDuel,wrap,true,'challenge-duel');if(state.flags.passage)button('Continue to the outer landing',()=>travel('landing'),wrap);}
 if(state.room==='landing'){button('Compare the old survey',compareChart,wrap);button('Watch the channel',startObservation,wrap,true,'watch-channel');if(state.flags.witnessed)button('Review the evidence',evidence,wrap);if(state.flags.evidence)button('Choose an investigation lead',chooseLead,wrap);}
 const d=document.createElement('details');const summary=document.createElement('summary');summary.textContent='Scene objects · keyboard & touch';d.append(summary);const list=document.createElement('div');list.className='target-list';d.append(list);panel.append(d);
 for(const target of targets[state.room]){if(target.id==='mug'&&(state.flags.mugTaken||state.flags.returned))continue;if(target.id==='hook'&&state.flags.hookTaken)continue;if(target.id==='survey'&&(!state.flags.chestOpen||state.flags.chart))continue;const b=button(target.name,()=>interact(target.id),list);b.dataset.target=target.id;}
}
function roomPanel(){if(state.flags.complete){clearPanel('Act I complete');button('Continue to Act II',()=>location.assign(`${import.meta.env.BASE_URL}act2.html`),panel,true,'continue-act2');roomActions();return;}if(state.duel.active){duelPanel();return;}clearPanel(state.flags.complete?'A question worth following':rooms[state.room]);para(goal());roomActions();}
function draw(){if(audioRoom!==state.room){audio.setAmbience(state.room==='tavern'?'tavern-ambience':'bridge-ambience');audioRoom=state.room;}scene.reduced=reduced;scene.render(state);updateUI();command();persist();}
function conversation(person:'mara'|'orin'|'quibble'|'parrot'){
 if(busy||transition)return;audio.stopSpeech();
 const pairs:Record<typeof person,[LineId,LineId][]>={mara:[['workQ','workA'],['chestQ',state.flags.chart?'keepA':'chestA'],['fetchQ','fetchA']],orin:[['lostQ','lostA'],['lastQ','lastA'],['transitQ','transitA'],['flowQ','flowA'],['comeQ','comeA']],quibble:[['rulesQ','rulesA'],['swordQ','swordA'],['publicQ','publicA'],['companyQ','companyA']],parrot:[['companyQ','companyA'],['rulesQ','rulesA']]};
 if(person==='mara'&&state.flags.chart)pairs.mara.push(['keepQ','keepA'],['markersQ','markersA'],['makerQ','makerA']);
 if(person==='orin'&&state.flags.chart)pairs.orin.push(['readQ','readA']);
 if(state.flags.witnessed)pairs[person].push(['returnQ',({mara:'returnMara',orin:'returnOrin',quibble:'returnQuibble',parrot:'returnParrot'} as const)[person]]);
 const menu=()=>{const c=document.createElement('div');c.className='choices';panel.append(c);for(const [q,a] of pairs[person])button(lines[q].text,()=>display(ids(q,a),menu),c);if(person==='quibble'||person==='parrot')button(lines.challengeQ.text,startDuel,c,true);button('Back to the room',()=>{audio.stopSpeech();roomPanel();},c);};
 clearPanel(({mara:'Mara',orin:'Orin',quibble:'Captain Quibble',parrot:'Fine Print'})[person]);menu();
}
function interact(id:string){if(!playing||!ready||busy||transition||state.duel.active)return;
 if(id==='exit'){travel(state.room==='tavern'?'bridge':'landing');return;}if(id==='back'){travel(state.room==='landing'?'bridge':'tavern');return;}
 if(verb==='talk'){if(['mara','orin','quibble','parrot'].includes(id))conversation(id as 'mara');else say('inanimate');return;}
 if(verb==='walk'&&['mara','orin','quibble','parrot'].includes(id)){conversation(id as 'mara');return;}
 if(state.room==='tavern'){
  if(id==='hook'){if(state.flags.hookTaken)return;if(verb==='take'){state.flags.hookTaken=true;selected=null;audio.effectSound('pickup');record('Picked up the boathook mounted above the tavern fireplace.');draw();say('hookSelect');}else notice('A sturdy boathook hangs above the fireplace. It might reach where hands cannot.');return;}
  if(verb==='use'&&selected==='mug'&&id==='mara'&&state.flags.mugTaken&&!state.flags.returned){state.flags.returned=true;selected=null;audio.effectSound('exchange');draw();say('returnMug');return;}
  if(id==='survey'){if(!state.flags.chestOpen||state.flags.chart)return;if(verb==='take'){state.flags.chart=true;selected=null;audio.effectSound('pickup');record('Old survey acquired. Compare it with the fixed marks at the outer landing.');draw();say('chartFound','chartDetail','chartQuestion');}else say('chartDetail');return;}
  if(verb==='use'&&id==='chest'){if(state.flags.chestOpen){notice(state.flags.chart?'The chest is empty. The key remains in its lock.':'The old survey is inside. Pick it up.');return;}if(selected==='key'&&state.flags.returned){state.flags.chestOpen=true;selected=null;audio.effectSound('unlock');record('Unlocked the sea chest. The key stays in the lock; the old survey is still inside.');draw();say('chartFound');return;}say(selected==='mug'?'wrongTumbler':'locked');return;}
  if(id==='chest'&&verb==='look'&&state.flags.chestOpen){notice(state.flags.chart?'An empty sea chest, with the key in its lock.':'An old survey rests inside the open chest. The key is still in the lock.');return;}
  if(id==='mug'&&(verb==='take'||verb==='use')){if(state.flags.mugTaken){say('noMug');return;}state.flags.mugTaken=true;audio.effectSound('pickup');draw();say('pickMug');return;}
  if(id==='cupboard'&&verb==='use'){if(state.flags.egg){say('eggRepeat');return;}state.flags.egg=true;draw();if(scene.cupboard&&!reduced)scene.tweens.add({targets:scene.cupboard,angle:3,duration:150,yoyo:true,repeat:2});say('egg1','egg2','egg3','egg4');return;}
  if(selected==='chart'&&id==='window'){say('chartDetail','chartQuestion');return;}
  if(id==='fire'&&verb==='use'){say('noBurn');return;}
  if(verb==='take'){say(id==='chest'?'heavy':'leaveIt');return;}
  const look:Record<string,LineId>={mara:'maraLook',orin:'orinLook',mug:'mugLook',chest:'chestLook',notice:'noticeLook',window:'windowLook',fire:'fireLook',cupboard:'eggLook'};
  if(verb==='use'){say('generic');return;}if(look[id])say(look[id]);
 }
 if(state.room==='bridge'){
  if(id==='sword'&&verb==='use'){startDuel();return;}
  const look:Record<string,LineId>={quibble:'quibbleLook',parrot:'parrotLook',sign:'signLook',plaque:'plaqueLook',sword:'swordLook',ledger:'ledgerLook'};
  if(verb==='take'){say('leaveIt');return;}if(look[id])say(look[id]);
 }
 if(state.room==='landing'){
  if(id==='board'){state.flags.board=true;record('The tide board shows EBB; normal local flow is left. The company arrow points right.');updateUI();say('boardLook');}
  else if(id==='marks'){state.flags.marks=true;record('Fixed landmarks: warehouse corner and lighthouse notch. Buoys can move.');updateUI();say('marksLook');}
  else if(id==='cleat'){if(verb==='use')compareChart();else say('cleatLook');}
  else if(id==='float'){
   if(state.flags.freed){say('floatFree');return;}
   if(verb==='use'&&selected==='hook'&&state.flags.hookTaken){busy=true;updateUI();audio.effectSound('float-free');scene.freeFloat(()=>{busy=false;state.flags.freed=true;selected=null;record('Freed the tethered current indicator with the boathook borrowed from the tavern.');draw();say('floatFree');});}
   else if(selected==='chart')say('paperFloat');else if(verb==='take')say('floatTake');else if(verb==='use')say('pullFloat');else say('floatSnag');
  }else if(id==='buoy')say('buoyLook');else if(id==='lane'){if(state.flags.evidence)chooseLead();else say('notYet');}
 }
}

function travel(to:Room){if(!ready||busy||transition||to===state.room)return;if(to==='landing'&&!state.flags.passage){display(ids('bridgeEntry','rulesA'));return;}
 const from=state.room;stopRoomDialogue();scene.move?.stop();audio.walk(false);if(state.duel.active){state.duel={active:false,answers:[],feedback:false};}
 transition=true;updateUI();const d=$<HTMLDialogElement>('travel');$('travel-title').textContent=`${rooms[from]} → ${rooms[to]}`;$('travel-description').textContent='Along the tavern lane, over the timber bridge and around the repair-yard quay. Continue skips the journey.';$('travel-skip').textContent='Continue →';
 const path=routePath(from,to);
 const route=document.getElementById('route') as unknown as SVGPathElement;const shadow=document.getElementById('route-shadow') as unknown as SVGPathElement;const dot=document.getElementById('traveller')!;route.setAttribute('d',path);shadow.setAttribute('d',path);d.showModal();const length=route.getTotalLength();route.style.strokeDasharray=String(length);route.style.strokeDashoffset=String(length);shadow.style.strokeDasharray=String(length);shadow.style.strokeDashoffset=String(length);let raf=0;const start=performance.now();let finished=false;
 const finish=()=>{if(finished)return;finished=true;cancelAnimationFrame(raf);mapFinish=undefined;d.close();transition=false;state.room=to;selected=null;verb='walk';draw();roomPanel();caption({who:'NELL',text:rooms[to]});if(to==='landing'&&!state.flags.witnessed)say('landingEntry');};mapFinish=finish;
 const frame=(now:number)=>{const t=reduced?1:Math.min(1,(now-start)/Math.min(5000,Math.max(2600,length*5)));route.style.strokeDashoffset=String(length*(1-t));shadow.style.strokeDashoffset=String(length*(1-t));const p=route.getPointAtLength(length*t);dot.setAttribute('cx',String(p.x));dot.setAttribute('cy',String(p.y));if(t<1)raf=requestAnimationFrame(frame);else if(!reduced)setTimeout(()=>{if(mapFinish===finish)finish();},450);};raf=requestAnimationFrame(frame);
}
$('travel-skip').onclick=()=>mapFinish?.();$<HTMLDialogElement>('travel').addEventListener('cancel',e=>{e.preventDefault();mapFinish?.();});
function showMap(){const d=$<HTMLDialogElement>('book');$('book-title').textContent='Nell’s working chart';$('book-content').replaceChildren();const destinations=(Object.keys(rooms) as Room[]).filter(room=>room!=='landing'||state.flags.passage).map(id=>({id,name:rooms[id],point:roomBadges[id].point}));$('book-content').append(locationMap(rooms[state.room],roomBadges[state.room].point,destinations,id=>{d.close();travel(id as Room);}));para('Choose a numbered room on the map or in the list. Win passage at the crossing to reach the outer landing.',$('book-content'));d.showModal();}

function openChart(){const body=$('book-content');$('book-title').textContent='Old survey · Bellweather Shoal';body.replaceChildren();const img=document.createElement('img');img.src=`${import.meta.env.BASE_URL}assets/survey-chart.png`;img.alt='Survey chart showing warehouse corner and lighthouse notch as fixed marks, and normal ebb flow to the left.';body.append(img);para('Fixed marks: warehouse corner + lighthouse notch. Ebb flow: left. Use this chart at the outer landing’s sighting cleat. A new buoy is not a fixed reference. ',body);if(state.room==='landing')button('Compare at the sighting cleat',()=>{closeBook();compareChart();},body,true);if(!$<HTMLDialogElement>('book').open)$<HTMLDialogElement>('book').showModal();}
function compareChart(){if(busy||transition)return;if(state.room!=='landing'){if(state.flags.chart)openChart();else say('needChart');return;}if(!state.flags.chart){say('needChart');return;}if(!state.flags.board){say('needBoard');return;}if(!state.flags.marks){say('needMarks');return;}
 clearPanel('Match two fixed survey marks');const img=document.createElement('img');img.className='chart-preview';img.src=`${import.meta.env.BASE_URL}assets/survey-chart.png`;img.alt='Chart symbols: square warehouse and tall lighthouse. Ebb arrows point left.';panel.append(img);para('Choose the two fixed landmarks shown on your survey.');const picked=new Set<string>();
 for(const label of ['Warehouse corner','Lighthouse notch','Company buoy']){const b=button(label,()=>{if(label==='Company buoy'){speak(ids('wrongMark'));notice(lines.wrongMark.text);return;}picked.add(label);b.disabled=true;b.classList.add('active');if(picked.size===2){state.flags.compared=true;record('Matched warehouse corner and lighthouse notch: this is the chart’s channel; new company markers disagree.');draw();say('comparison1','comparison2');}});}
 button('Back to the landing',roomPanel);
}
function notebook(){const body=$('book-content');$('book-title').textContent='Nell’s notebook';body.replaceChildren();heading('A job, a tankard and a toll',body);para(goal(),body);const tabs=document.createElement('div');tabs.className='notebook-tabs';body.append(tabs);if(state.flags.chart)button('Open old survey',openChart,tabs);button('Read observation log',()=>{body.querySelector('#journal')?.scrollIntoView({behavior:'auto'});},tabs);if(state.flags.witnessed)button('Review evidence',()=>{closeBook();evidence();},tabs);if(state.flags.complete)para(`Next lead: ${state.lead}. All three leads remain available in the chapter ending.`,body);
 const notes=[['Return Mara’s tankard',state.flags.returned],['Obtain the old survey',state.flags.chart],['Collect the tavern boathook',state.flags.hookTaken],['Win passage at the bridge',state.flags.passage],['Read the tide board',state.flags.board],['Identify fixed marks',state.flags.marks],['Compare survey at the cleat',state.flags.compared],['Free the tethered float',state.flags.freed],['Witness the channel change',state.flags.witnessed],['Record supported evidence',state.flags.evidence],['Choose the next lead',state.flags.complete]];
 for(const [text,done] of notes)para(`${done?'✓':'○'} ${text}`,body);
 const journal=document.createElement('section');journal.id='journal';body.append(journal);heading('Conversation & observation log',journal);for(const line of state.log){const p=para(`${line.who}: ${line.text}`,journal,'journal-entry');if(line.who!=='NOTEBOOK')button('Replay',()=>audio.speak(line.text,line.who),p);}
 if(!$<HTMLDialogElement>('book').open)$<HTMLDialogElement>('book').showModal();}
function closeBook(){$<HTMLDialogElement>('book').close();}
$('close-book').onclick=closeBook;

function startDuel(){if(busy||transition||state.room!=='bridge')return;state.duel={active:true,answers:[],feedback:false};draw();duelPanel();}
function duelPanel(){updateDuelScore();const d=state.duel;if(!d.active){roomPanel();return;}
 const wins=d.answers.filter(Boolean).length;const current=d.feedback?d.answers.length-1:d.answers.length;
 if(current>=5){finishDuel();return;}const q=duel.rounds[current];clearPanel(`Exchange ${current+1} of 5`);para(`Nell ${wins} · Quibble & Co. ${d.answers.length-wins}`,panel,'score-line');heading(q.insult);
 if(d.feedback){const won=d.answers[current];para(won?q.retort:duel.miss.text);para(won?'Touché! A point for Nell.':`Their point. ${q.hint}`,panel,won?'success':'hint-box');button(current===4?'See the verdict':'Next exchange',()=>{if(busy)return;if(current===4)finishDuel();else{d.feedback=false;persist();duelPanel();}},panel,true,'duel-next');}
 else{const options=q.answers.map((text,i)=>({text,i}));Phaser.Utils.Array.Shuffle(options);const choice=document.createElement('div');choice.className='choices';panel.append(choice);for(const {text,i} of options)button(text,()=>duelAnswer(i),choice);speak([{who:q.who,text:q.insult}]);}
 button('Leave the duel',()=>{if(busy)return;state.duel={active:false,answers:[],feedback:false};audio.stopSpeech();draw();roomPanel();});
}
function duelAnswer(index:number){const d=state.duel;if(!d.active||d.feedback||busy)return;const q=duel.rounds[d.answers.length];const won=index===q.correct;d.answers.push(won);d.feedback=true;busy=true;persist();updateUI();duelPanel();panel.querySelectorAll<HTMLButtonElement>('button').forEach(b=>b.disabled=true);audio.effectSound('parry');speak([{who:'NELL',text:q.answers[index]},won?{who:q.who,text:q.retort}:duel.miss]);scene.exchange(won,q.who==='FINE PRINT',()=>{busy=false;updateUI();duelPanel();});}
function finishDuel(){const d=state.duel;const won=d.answers.filter(Boolean).length>=3;const coda=won&&!d.answers[4]&&!state.flags.welcome;d.active=false;d.feedback=false;if(won){state.flags.passage=true;state.flags.welcome=true;record('Won public passage. Fine Print says company agreements threaten his own toll. This is a grievance, not proof.');}draw();const result=won?[...duel.win,...(coda?ids('coda1','coda2','coda3'):[]),...ids('post1','post2','post3')]:duel.lose;display(result,()=>{button(won?'Continue to the landing':'Try the duel again',()=>won?travel('landing'):startDuel(),panel,true,'duel-result-action');button('Back to the bridge',roomPanel);});}

let observationStep=0;
function startObservation(){if(busy||transition||state.room!=='landing')return;if(!state.flags.compared){say('needCompare');return;}if(!state.flags.freed){say('needFloat');return;}observationStep=0;observePanel();}
function observePanel(){const id=(`observe${observationStep}`) as LineId;scene.observation(observationStep);if(observationStep===1)audio.effectSound('landing-bell');if(observationStep===3)audio.effectSound('boat-pass');clearPanel(`Watch the channel · ${observationStep+1} / 4`);para(lines[id].text);speak(ids(id));button(observationStep===3?'Record what happened':'Keep watching',()=>{if(observationStep===3)finishObservation();else{observationStep++;observePanel();}},panel,true,'observe-next');button('Skip animation / read full observation',finishObservation);button('Leave and observe later',()=>{audio.stopSpeech();scene.render(state);roomPanel();});}
function finishObservation(){state.flags.witnessed=true;for(let i=0;i<4;i++)record(lines[`observe${i}` as LineId].text,'OBSERVATION');draw();display(ids('observe0','observe1','observe2','observe3','conclusion1','conclusion2'),()=>{button('Review the evidence',evidence,panel,true);button('Replay observation',startObservation);button('Back to the landing',roomPanel);});}
const evidenceText=['The local tide board still indicated ebb.','The signal came immediately before the change in flow.','A company launch used the changed route without hesitation.','The company controls the entire sea.','Orin’s ship was stolen.'];
function evidence(){if(!state.flags.witnessed)return;clearPanel('Observations before accusations');para('Choose the three statements supported by your observation. The timeline below stays visible.');for(let i=0;i<4;i++)para(`${i+1}. ${lines[`observe${i}` as LineId].text}`,panel,'small');
 const form=document.createElement('div');panel.append(form);evidenceText.forEach((text,i)=>{const label=document.createElement('label');label.className='evidence-row';const input=document.createElement('input');input.type='checkbox';input.checked=evidenceChoice.has(i);input.onchange=()=>{if(input.checked)evidenceChoice.add(i);else evidenceChoice.delete(i);};label.append(input,document.createTextNode(text));form.append(label);});
 button('Record these observations',()=>{if(evidenceChoice.size===3&&[0,1,2].every(i=>evidenceChoice.has(i))){state.flags.evidence=true;record(lines.evidenceDone.text);updateUI();display(ids('evidenceDone'),()=>button('Choose the next lead',chooseLead,panel,true));}else{notice('Keep only the three directly observed facts. You can change any selection.');speak(ids('wrongEvidence'));}},panel,true);
 button('Back to the room',roomPanel);
}
function chooseLead(){if(!state.flags.evidence)return;clearPanel(state.flags.complete?'Act I complete':'A question worth following');para('You have evidence of a local change coordinated with company traffic. Where will Nell begin her investigation? All three leads remain in the notebook.');
 const leads:[string,LineId,string][]=[['newspaper','leadPip','Ask who else has seen it'],['hardware','leadHardware','Follow the signal hardware'],['ship','leadOrin','Revisit Orin’s missing ship']];
 for(const [key,line,label] of leads)button(label,()=>{state.lead=key;state.flags.complete=true;record(`Next leads: Pip’s newspaper; signal hardware at the repair yards; Orin’s missing vessel. Current intention: ${key}.`);updateUI();display(ids(line,'end'),()=>{heading('End of Act I');para('A job, a tankard and a toll. You have completed the playable first chapter. Act II is the next part of Nell’s story.');button('Continue to Act II',()=>{persist();audio.stopSpeech();location.assign(`${import.meta.env.BASE_URL}act2.html`);},panel,true,'continue-act2');button('Explore the harbour',roomPanel,panel,true);button('Review all investigation leads',chooseLead);button('Open notebook',notebook);});},panel,true);
 button('Revisit the harbour first',roomPanel);
}
function hint(){if(state.flags.chestOpen&&!state.flags.chart)return 'The chest is open. Pick up the old survey inside it.';if(!state.flags.chart)return 'Talk to Mara about the chest. Pick up the tankard on the window table, use it on Mara, then use the key on the chest and pick up the survey inside.';if(!state.flags.passage)return 'Talk to Quibble. Turn his boasts against him; three correct replies win passage.';if(!state.flags.board||!state.flags.marks)return 'At the landing, look at the tide board and the warehouse/lighthouse landmarks.';if(!state.flags.compared)return 'Use the old survey on the sighting cleat. Choose the warehouse corner and lighthouse notch.';if(!state.flags.hookTaken&&!state.flags.freed)return 'A boathook is mounted above the tavern fireplace. Pick it up and bring it to the landing.';if(!state.flags.freed)return 'Select the boathook in your pockets and use it on the snagged float.';if(!state.flags.witnessed)return 'Watch the channel. Each step can be replayed or read as text.';return 'Record the three direct observations, then choose any next lead.';}

const front=new Front((saved)=>{
 stopRoomDialogue();busy=false;state=saved??fresh();selected=null;verb='walk';evidenceChoice.clear();playing=true;audioRoom=undefined;
 game.scale.refresh();draw();paintSound($('sound'),audio.enabled);
 if(!state.flags.intro){state.flags.intro=true;persist();display(ids('intro1','intro2','intro3','intro4'));}else{caption({who:'NELL',text:rooms[state.room]});roomPanel();}
},()=>{stopRoomDialogue();persist();playing=false;scene.move?.stop();audio.walk(false);},()=>prepareGame());
const scene=new ChapterScene({ready:()=>{ready=true;draw();$('game').dataset.ready='true';document.querySelectorAll<HTMLButtonElement>('.chapter-shell header button,.chapter-shell footer button,#pocket-tools button').forEach(b=>b.disabled=false);resolveGame?.();},target:interact,hover:command,walk:(x,y)=>{state.positions[state.room]={x,y};},walking:active=>{audio.walk(active);if(!active&&ready)persist();},canWalk:()=>playing&&!busy&&!transition&&!state.duel.active});
let game:Phaser.Game;let resolveGame:(()=>void)|undefined;
function prepareGame(){return new Promise<void>(resolve=>{resolveGame=resolve;game=new Phaser.Game({type:Phaser.AUTO,parent:'game',width:1536,height:1024,pixelArt:true,backgroundColor:'#10191e',scene,scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},audio:{noAudio:true}});});}
front.ready();
for(const [i,v] of (['walk','look','talk','take','use'] as Verb[]).entries()){const b=button(`${{walk:'Walk to',look:'Look at',talk:'Talk to',take:'Pick up',use:'Use'}[v]} · ${i+1}`,()=>setVerb(v),$('verbs'));b.dataset.verb=v;}
$('hotspots').onclick=()=>{scene.toggleMarks();updateUI();};$('notebook').onclick=notebook;$('map').onclick=showMap;$('replay').onclick=()=>{if(lastSpeech.length)speak(lastSpeech);};
$('sound').onclick=()=>{audio.setEnabled(!audio.enabled);paintSound($('sound'),audio.enabled);if(audio.enabled&&lastSpeech.length)speak(lastSpeech);};
$('save').onclick=()=>{try{localStorage.setItem(SAVE,JSON.stringify(state));notice('Chapter saved: room, notebook, puzzle progress and duel.');}catch{notice('Saving is unavailable in this browser.');}};
$('load').onclick=()=>{if(transition)return;try{const raw=localStorage.getItem(SAVE);if(!raw){notice('No chapter save yet.');return;}const restored=parseSave(raw);stopRoomDialogue();busy=false;state=restored;selected=null;evidenceChoice.clear();draw();caption({who:'NELL',text:rooms[state.room]});roomPanel();notice('Chapter restored.');}catch{notice('That save is invalid. Your current progress has been kept.');}};
$('main-menu').onclick=()=>{if(!busy&&!transition)front.menu();};
$('motion').onclick=()=>{reduced=!reduced;front.setReducedMotion(reduced);if(!busy&&!transition)draw();else scene.reduced=reduced;updateUI();};
$('new-game').onclick=()=>{if(transition)return;const d=$<HTMLDialogElement>('book');$('book-title').textContent='Start a new adventure?';$('book-content').replaceChildren();para('This replaces your autosaved chapter. Your explicit Save slot stays available.',$('book-content'));button('Start fresh',()=>{closeBook();front.intro();},$('book-content'),true);button('Keep playing',closeBook,$('book-content'));d.showModal();};
document.addEventListener('audio-unavailable',()=>notice('Some audio could not play. All dialogue remains available as text.'));
window.addEventListener('keydown',e=>{if(!playing||!ready||e.ctrlKey||e.metaKey||e.altKey||$<HTMLDialogElement>('book').open||$<HTMLDialogElement>('travel').open||e.target instanceof HTMLInputElement||e.target instanceof HTMLButtonElement)return;if(/^[1-5]$/.test(e.key))setVerb((['walk','look','talk','take','use'] as Verb[])[Number(e.key)-1]);if(e.key.toLowerCase()==='h'){scene.toggleMarks();updateUI();}if(e.key.toLowerCase()==='n')notebook();if(e.key==='Escape'&&!busy&&!transition){audio.stopSpeech();roomPanel();}});
window.addEventListener('pagehide',persist);
const help=button('Hint',()=>notice(hint()),document.querySelector<HTMLElement>('footer>div')!);help.id='hint';
decorateControls();
document.querySelectorAll<HTMLButtonElement>('header button,footer button,#pocket-tools button').forEach(b=>b.disabled=true);
