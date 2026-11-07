/** Feet coordinates on the shared 1536×1024 bridge artwork, inside the deck edge. */
export function floorPoint(room:string,x:number,y:number,minY=740){
 return {x:Math.max(95,Math.min(1430,x)),y:room==='bridge'?Math.max(700,Math.min(750,y)):Math.max(minY,Math.min(950,y))};
}