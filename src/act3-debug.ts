import type {DebugPreset} from './debug-start';
import {fresh3,parse3,shoal,type Room3,type Item3} from './act3-state';

/** Build and validate before touching browser saves. Intro starts intentionally ignore progress. */
export function debugState3(preset:DebugPreset){
 if(preset.act!==3)throw Error('Not an Act III preset');
 const state=fresh3();
 if(preset.intro)return state;
 state.room=preset.room as Room3;
 state.boat=shoal.includes(state.room)?'service':'inlet';
 Object.assign(state.flags,preset.flags||{});
 for(const item of preset.items||[])if(!state.items.includes(item as Item3))state.items.push(item as Item3);
 return parse3(JSON.stringify(state));
}