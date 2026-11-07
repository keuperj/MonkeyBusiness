import {mapPoints,routePath,type MapRoom,type Point} from './map-routes';
import {act3MapPoints,act3Route} from './act3-map';
import type {Room3} from './act3-state';
import {island5,type Room5} from './act5-state';
export const points5:Record<Room5,Point>={...mapPoints,...act3MapPoints,station:[600,550],command:[1120,650],bypass:[1300,820]};
export function route5(from:Room5,to:Room5){
 if(from===to)return '';
 if(island5.includes(from)!==island5.includes(to))throw Error('Sea crossings require Orin’s voyage.');
 if(!island5.includes(from)){const a=from==='station'?'quay':from,b=to==='station'?'quay':to;let path=routePath(a as MapRoom,b as MapRoom)||'M 600 515';if(from==='station')path=`M 600 550 L 600 515 ${path.replace(/^M 600 515/,'')}`;if(to==='station')path+=' L 600 550';return path;}
 const branch=(r:Room5):Point[]=>r==='bypass'?[[1300,820],[1240,740],[1120,650],[1120,310]]:r==='command'?[[1120,650],[1120,310]]:[];
 const a=branch(from),b=branch(to),af=a.length?'overlook':from,bf=b.length?'overlook':to;
 let mid=af===bf?[[1120,310] as Point]:Array.from(act3Route(af as Room3,bf as Room3).matchAll(/[ML] ([\d.]+) ([\d.]+)/g),m=>[Number(m[1]),Number(m[2])] as Point);
 if(a.length)mid=[...a.slice(0,-1),...mid];if(b.length)mid=[...mid,...b.slice(0,-1).reverse()];
 if(from==='command'&&to==='bypass')mid=[[1120,650],[1240,740],[1300,820]];
 if(from==='bypass'&&to==='command')mid=[[1300,820],[1240,740],[1120,650]];
 return mid.map(([x,y],i)=>`${i?'L':'M'} ${x} ${y}`).join(' ');
}