import type {State2} from './act2-state';

const invitation='A2-VANE-QUAY-INVITATION',announcement='A2-VANE-QUAY-ANNOUNCEMENT';
export function vaneAtQuay(state:State2){return state.room==='quay'&&(state.flags.announced?!state.seen.includes(announcement):state.flags.invited&&!state.flags.delivered&&!state.seen.includes(invitation));}
export function dismissQuayVane(state:State2){if(vaneAtQuay(state)){const marker=state.flags.announced?announcement:invitation;if(!state.seen.includes(marker))state.seen.push(marker);}}