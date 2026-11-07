export type FloorPoint={x:number;y:number};
type RoomFloor={polygon:readonly (readonly [number,number])[];height:number;spawn:readonly [number,number];note:string};
/** Conservative convex foreground feet-space in the 1536 × 1024 artwork.
 * Convexity ensures that the entire straight walking tween stays on the floor.
 * Shared rooms use the same geometry in every act, including solved variants.
 */
export const roomFloors:Record<string,RoomFloor>={
 tavern:{polygon:[[430,810],[1060,810],[1130,950],[340,950]],height:420,spawn:[620,870],note:'Foreground aisle; exclude chest, bar and rear tables.'},
 bridge:{polygon:[[160,710],[1370,710],[1370,745],[160,745]],height:370,spawn:[490,735],note:'Deck only, above the near water edge.'},
 landing:{polygon:[[210,825],[1000,825],[1140,950],[150,950]],height:420,spawn:[590,900],note:'Foreground landing; exclude right-hand buoy/float water.'},
 quay:{polygon:[[180,835],[940,835],[1030,950],[150,950]],height:430,spawn:[550,900],note:'Stone foreground apron, not right-hand harbour or doorway.'},
 press:{polygon:[[360,850],[1170,850],[1250,950],[280,950]],height:425,spawn:[590,910],note:'Foreground aisle in front of proof table and press.'},
 hall:{polygon:[[300,865],[1160,865],[1240,950],[220,950]],height:435,spawn:[520,920],note:'Near side of breakfast table, clear of controller and sorter.'},
 workshop:{polygon:[[310,850],[1160,850],[1240,950],[230,950]],height:430,spawn:[550,910],note:'Foreground aisle, not model bench or drawing rack.'},
 inlet:{polygon:[[180,805],[690,805],[800,950],[120,950]],height:420,spawn:[400,900],note:'Left dry quay; boat and right-hand channel are not walkable.'},
 office:{polygon:[[340,855],[1150,855],[1240,950],[260,950]],height:430,spawn:[560,910],note:'Near-side office floor, clear of desk.'},
 service:{polygon:[[650,850],[1120,850],[1260,950],[620,950]],height:405,spawn:[740,920],note:'Dry foreground landing; exclude left wet stair and right berth.'},
 gallery:{polygon:[[350,850],[1150,850],[1230,950],[270,950]],height:420,spawn:[590,910],note:'Gallery aisle in front of caretaker equipment.'},
 recorder:{polygon:[[390,850],[1100,850],[1200,950],[310,950]],height:420,spawn:[590,910],note:'Dry aisle, not glazed live shaft or display furniture.'},
 overlook:{polygon:[[430,860],[1110,860],[1200,950],[350,950]],height:410,spawn:[620,915],note:'Near side of inspection railing, not the drum below.'},
 station:{polygon:[[350,850],[1110,850],[1220,950],[270,950]],height:425,spawn:[590,910],note:'Dry personnel floor, not wet culvert or local machinery.'},
 command:{polygon:[[360,840],[1150,840],[1250,950],[260,950]],height:435,spawn:[590,910],note:'Foreground paving in front of guard rail.'},
 bypass:{polygon:[[350,850],[1120,850],[1220,950],[260,950]],height:430,spawn:[590,915],note:'Dry gallery floor outside guarded couplings.'},
};
function geometry(room:string){const floor=roomFloors[room];if(!floor)throw Error(`No audited floor for ${room}`);return floor;}
export function onFloor(room:string,x:number,y:number){
 const p=geometry(room).polygon;let positive=false,negative=false;
 for(let i=0;i<p.length;i++){const a=p[i],b=p[(i+1)%p.length],cross=(b[0]-a[0])*(y-a[1])-(b[1]-a[1])*(x-a[0]);positive ||= cross>1e-6;negative ||= cross< -1e-6;}
 return Number.isFinite(x)&&Number.isFinite(y)&&!(positive&&negative);
}
/** Project unsafe clicks and old saves to the nearest safe edge. Legacy minY
 * is accepted for callers; explicit room geometry now supersedes that default. */
export function floorPoint(room:string,x:number,y:number,_minY?:number):FloorPoint{
 const floor=geometry(room);if(!Number.isFinite(x)||!Number.isFinite(y))return {x:floor.spawn[0],y:floor.spawn[1]};
 if(onFloor(room,x,y))return {x,y};let best={x:floor.spawn[0],y:floor.spawn[1]},distance=Infinity;
 for(let i=0;i<floor.polygon.length;i++){
  const a=floor.polygon[i],b=floor.polygon[(i+1)%floor.polygon.length],dx=b[0]-a[0],dy=b[1]-a[1];
  const t=Math.max(0,Math.min(1,((x-a[0])*dx+(y-a[1])*dy)/(dx*dx+dy*dy)));
  const point={x:a[0]+t*dx,y:a[1]+t*dy},d=(point.x-x)**2+(point.y-y)**2;if(d<distance){distance=d;best=point;}
 }return best;
}
export function floorSpawn(room:string){const [x,y]=geometry(room).spawn;return {x,y};}
export function humanHeight(room:string,y:number){const f=geometry(room),ys=f.polygon.map(p=>p[1]),near=Math.max(...ys),far=Math.min(...ys);return f.height*(.94+.12*Math.max(0,Math.min(1,(y-far)/(near-far))));}
export function actorFeet(room:string,who:string,x:number,y:number):FloorPoint{
 const placements:Record<string,Record<string,readonly [number,number]>>={
  tavern:{MARA:[1020,830],ORIN:[850,835]},bridge:{QUIBBLE:[1040,735]},
  quay:{MARA:[870,870],VANE:[920,870],ROOK:[750,865]},inlet:{ORIN:[600,850],QUIBBLE:[700,910]},service:{ORIN:[1080,900]},
  hall:{ROOK:[1060,890]},workshop:{ROOK:[1090,880]},press:{PIP:[1120,885]},office:{VANE:[1100,880]},
  gallery:{BRAM:[1090,880]},command:{VANE:[1120,870],BRAM:[950,880]},bypass:{BRAM:[1050,885]},station:{MARA:[1060,885]},landing:{ROOK:[950,880]},
 };const p=placements[room]?.[who];return floorPoint(room,p?.[0]??x,p?.[1]??y);
}