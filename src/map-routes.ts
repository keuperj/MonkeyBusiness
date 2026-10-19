import type { Room } from './chapter-state';
type Point = readonly [number, number];
// Coordinates are traced against the 1536 × 1024 story map. Walk around the
// tavern, up the public lane, over the bridge planks, then along the timber quay.
// Keep the reverse direction on exactly the same walkable route.
const tavernToBridge: Point[] = [
 [188,799],[232,810],[279,794],[292,758],[282,735],[214,722],
 [187,686],[181,648],[162,613],[176,584],[205,558],[244,550],
 [287,564],[337,583],
];
const bridgeToLanding: Point[] = [
 [337,583],[381,603],[425,622],[476,637],[511,624],[513,597],
 [552,582],[576,557],[599,534],[633,540],
];
const order: Room[] = ['tavern','bridge','landing'];
export function routePoints(from:Room,to:Room):Point[] {
 const a=order.indexOf(from),b=order.indexOf(to);
 if(a===b)return [];
 const lo=Math.min(a,b),hi=Math.max(a,b);
 const points=lo===0&&hi===2?[...tavernToBridge,...bridgeToLanding.slice(1)]:[...(lo===0?tavernToBridge:bridgeToLanding)];
 return a<b?points:points.reverse();
}
export function routePath(from:Room,to:Room){return routePoints(from,to).map(([x,y],i)=>`${i?'L':'M'} ${x} ${y}`).join(' ');}
