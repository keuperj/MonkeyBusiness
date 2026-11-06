import {routePath,type MapRoom,type Point} from './map-routes';
import {shoal,type Room3} from './act3-state';
import {mapPoints} from './map-routes';

export const shoalPoints={service:[290,790],gallery:[700,570],recorder:[420,320],overlook:[1120,310]} satisfies Record<string,Point>;
export const act3MapPoints:Record<Room3,Point>={...mapPoints,...shoalPoints};
export function act3Route(from:Room3,to:Room3){
 if(!shoal.includes(from)&&!shoal.includes(to))return routePath(from as MapRoom,to as MapRoom);
 if(!shoal.includes(from)||!shoal.includes(to))throw Error('Sea crossings require a voyage, not a walking route.');
 if(from===to)return '';
 const paths:Record<string,Point[]>={service:[shoalPoints.service,[430,790],[530,680],shoalPoints.gallery],recorder:[shoalPoints.recorder,[420,440],[560,440],shoalPoints.gallery],overlook:[shoalPoints.overlook,[1120,450],[900,450],shoalPoints.gallery]};
 const start=from==='gallery'?[shoalPoints.gallery]:paths[from];
 const end=to==='gallery'?[]:[...paths[to]].reverse().slice(1);
 return [...start,...end].map(([x,y],i)=>`${i?'L':'M'} ${x} ${y}`).join(' ');
}