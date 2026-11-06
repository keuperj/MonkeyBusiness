import type {Locator} from '@playwright/test';

/** Screenshot-only annotation: leave gameplay controls unchanged after capture. */
export async function captureMapTarget(destination:Locator,path:string){
 const map=destination.page().locator('.map-picture');
 await destination.evaluate(el=>{
  const picture=el.closest('.map-picture')!;
  const svg=picture.querySelector('svg')!;
  const ns='http://www.w3.org/2000/svg',g=document.createElementNS(ns,'g');g.id='playbook-target';
  const r=el.getBoundingClientRect(),p=picture.getBoundingClientRect(),x=(r.x+r.width/2-p.x)/p.width*1536,y=(r.y+r.height/2-p.y)/p.height*1024;
  const circle=document.createElementNS(ns,'circle');circle.setAttribute('cx',String(x));circle.setAttribute('cy',String(y));circle.setAttribute('r','38');circle.setAttribute('fill','#ffd45a44');circle.setAttribute('stroke','#ffd45a');circle.setAttribute('stroke-width','7');
  const text=document.createElementNS(ns,'text');text.setAttribute('x','768');text.setAttribute('y','955');text.setAttribute('text-anchor','middle');text.setAttribute('fill','#fff3c4');text.setAttribute('stroke','#182a30');text.setAttribute('stroke-width','7');text.setAttribute('paint-order','stroke');text.setAttribute('font-size','34');text.textContent=el.getAttribute('aria-label')!.replace('Travel to: ','');g.append(circle,text);svg.append(g);
  picture.querySelectorAll<HTMLElement>('button').forEach(b=>b.style.visibility='hidden');
 });
 try{await map.screenshot({path});}finally{await map.evaluate(el=>{el.querySelector('#playbook-target')?.remove();el.querySelectorAll<HTMLElement>('button').forEach(b=>b.style.visibility='');});}
}