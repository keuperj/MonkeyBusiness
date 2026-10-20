import type {State2} from './act2-state';
/** One source of truth for sprites, hit areas and keyboard targets, including consumed items. */
export function collectibleAvailable(state:State2,id:string){
 const f=state.flags,items=state.items;
 switch(id){
 case 'rope':return !items.includes('rope')&&!f.ropeAttached;
 case 'paper':return !items.includes('paper')&&!items.includes('copy')&&!f.copy&&!f.delivered;
 case 'drawing':return !items.includes('drawing')&&!f.drawing;
 case 'crank':return !items.includes('crank')&&!f.open;
 default:return true;
 }
}
