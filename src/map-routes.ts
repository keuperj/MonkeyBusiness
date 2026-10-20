export type MapRoom='tavern'|'bridge'|'landing'|'quay'|'press'|'hall'|'workshop'|'inlet'|'office';
export type Point=readonly [number,number];
/** Room entrances and a traced pedestrian network on the 1536 × 1024 artwork. */
export const mapPoints:Record<MapRoom,Point>={tavern:[188,799],bridge:[337,583],landing:[633,540],quay:[600,515],press:[275,475],hall:[215,175],workshop:[255,173],inlet:[520,205],office:[850,490]};
const west:Point=[205,558];
type Edge={a:string;b:string;points:Point[]};
// Junctions follow the painted lanes. In particular the crossing is the only
// pedestrian connection to the repair docks: never cut across the boat basin.
export const mapWalkways:Edge[]=[
 {a:'tavern',b:'west',points:[mapPoints.tavern,[232,810],[279,794],[292,758],[282,735],[214,722],[187,686],[181,648],[162,613],[176,584],west]},
 {a:'west',b:'bridge',points:[west,[244,550],[287,564],mapPoints.bridge]},
 {a:'bridge',b:'landing',points:[mapPoints.bridge,[381,603],[425,622],[476,637],[511,624],[513,597],[552,582],[576,557],[599,534],mapPoints.landing]},
 {a:'landing',b:'quay',points:[mapPoints.landing,[648,528],[650,510],[630,505],mapPoints.quay]},
 {a:'west',b:'press',points:[west,[194,541],[190,520],[214,505],[246,493],mapPoints.press]},
 {a:'press',b:'hall',points:[mapPoints.press,[240,488],[206,477],[176,463],[149,449],[124,433],[118,421],[133,401],[154,385],[172,376],[177,360],[195,352],[218,343],[244,332],[250,322],[236,312],[214,303],[196,292],[202,283],[218,272],[222,264],[205,251],[174,241],[143,236],[140,226],[159,208],[180,195],[196,180],mapPoints.hall]},
 {a:'hall',b:'workshop',points:[mapPoints.hall,[234,180],mapPoints.workshop]},
 {a:'hall',b:'inlet',points:[mapPoints.hall,[253,184],[290,180],[315,174],[333,165],[357,150],[389,145],[421,154],[450,166],[477,172],[495,188],mapPoints.inlet]},
 {a:'quay',b:'office',points:[mapPoints.quay,[629,520],[660,523],[691,513],[717,496],[742,483],[769,484],[801,496],[827,502],mapPoints.office]},
];
export function routePoints(from:MapRoom,to:MapRoom):Point[]{
 if(from===to)return [];
 // A tree of traced lanes guarantees that return journeys retrace the same path.
 const queue:{node:string;points:Point[]}[]=[{node:from,points:[]}],seen=new Set<string>();
 while(queue.length){const entry=queue.shift()!;if(entry.node===to)return entry.points;if(seen.has(entry.node))continue;seen.add(entry.node);
 for(const e of mapWalkways){if(e.a!==entry.node&&e.b!==entry.node)continue;const forward=e.a===entry.node,next=forward?e.b:e.a,points=forward?e.points:[...e.points].reverse();if(!seen.has(next))queue.push({node:next,points:[...entry.points,...(entry.points.length?points.slice(1):points)]});}}
 throw Error(`No mapped walking route from ${from} to ${to}`);
}
export function routePath(from:MapRoom,to:MapRoom){return routePoints(from,to).map(([x,y],i)=>`${i?'L':'M'} ${x} ${y}`).join(' ');}
