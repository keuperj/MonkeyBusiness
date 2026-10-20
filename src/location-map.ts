let mapObserver:ResizeObserver|undefined;
export type MapDestination={id:string;name:string;point:readonly [number,number]};
/** Same coordinate system as map-routes; HTML buttons supply keyboard/touch access. */
export function locationMap(name:string,point:readonly [number,number],destinations:MapDestination[]=[],travel:(id:string)=>void=()=>{}){
 const wrap=document.createElement('div');wrap.className='map-art location-map';
 const picture=document.createElement('div');picture.className='map-picture';
 const img=document.createElement('img');img.src=`${import.meta.env.BASE_URL}assets/story-map-walkways.png`;img.alt=`Map of Brindle Quay and Bellweather Shoal. Nell is at ${name}.`;
 const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg');svg.setAttribute('viewBox','0 0 1536 1024');svg.setAttribute('aria-hidden','true');
 const pin=document.createElementNS(ns,'g');pin.classList.add('current-location');pin.setAttribute('transform',`translate(${point[0]} ${point[1]})`);
 pin.innerHTML='<circle r="27" fill="#371411" stroke="#ffe3a1" stroke-width="5"/><circle r="13" fill="#ed4c38"/><path d="M-39 0h12M27 0h12M0-39v12M0 27v12" stroke="#ffe3a1" stroke-width="5"/>';
 svg.append(pin);picture.append(img,svg);
 destinations.forEach((d,i)=>{const current=d.name===name,b=document.createElement('button');b.type='button';b.className='map-room-marker';b.dataset.mapRoom=d.id;b.textContent=String(i+1);b.style.left=`${d.point[0]/1536*100}%`;b.style.top=`${d.point[1]/1024*100}%`;b.title=current?`You are here: ${d.name}`:d.name;b.setAttribute('aria-label',`${current?'Current location':'Travel to'}: ${d.name}`);if(current){b.setAttribute('aria-current','location');b.classList.add('is-current');}b.onclick=()=>travel(d.id);picture.append(b);});
 mapObserver?.disconnect();
 const markers=Array.from(picture.querySelectorAll<HTMLButtonElement>('.map-room-marker'));
 const leaders=destinations.map(()=>{const line=document.createElementNS(ns,'line');line.setAttribute('stroke','#ffe4a5');line.setAttribute('stroke-width','3');line.setAttribute('stroke-dasharray','5 4');svg.insertBefore(line,pin);return line;});
 const arrange=()=>{const width=picture.clientWidth;if(!width)return;const height=width*1024/1536,placed:{x:number;y:number}[]=[];
 destinations.forEach((d,i)=>{const origin={x:d.point[0]*width/1536,y:d.point[1]*height/1024};let best=origin;
 search:for(let radius=0;radius<=200;radius+=40){for(let step=0;step<16;step++){const angle=step*Math.PI/8,x=Math.max(20,Math.min(width-20,origin.x+Math.cos(angle)*radius)),y=Math.max(20,Math.min(height-20,origin.y+Math.sin(angle)*radius));if(placed.every(p=>Math.max(Math.abs(x-p.x),Math.abs(y-p.y))>=40)){best={x,y};break search;}}}
 placed.push(best);markers[i].style.left=`${best.x}px`;markers[i].style.top=`${best.y}px`;const line=leaders[i];line.setAttribute('x1',String(d.point[0]));line.setAttribute('y1',String(d.point[1]));line.setAttribute('x2',String(best.x*1536/width));line.setAttribute('y2',String(best.y*1024/height));line.style.display=Math.hypot(best.x-origin.x,best.y-origin.y)>1?'':'none';});};
 mapObserver=new ResizeObserver(arrange);mapObserver.observe(picture);
 wrap.append(picture);const label=document.createElement('p');label.className='map-location-label';label.textContent=`You are here: ${name}`;wrap.append(label);
 const legend=document.createElement('div');legend.className='map-room-legend';destinations.forEach((d,i)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',d.name);b.textContent=`${i+1}. ${d.name}`;b.onclick=()=>travel(d.id);if(d.name===name)b.setAttribute('aria-current','location');legend.append(b);});wrap.append(legend);return wrap;
}
