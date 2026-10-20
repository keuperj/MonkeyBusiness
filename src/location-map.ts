/** Shared notebook map: coordinates use the original 1536 × 1024 artwork. */
export function locationMap(name:string,point:readonly [number,number]){
 const wrap=document.createElement('div');wrap.className='map-art location-map';
 const img=document.createElement('img');img.src=`${import.meta.env.BASE_URL}assets/story-map.png`;img.alt=`Map of Brindle Quay and Bellweather Shoal. Nell is at ${name}.`;
 const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg');svg.setAttribute('viewBox','0 0 1536 1024');svg.setAttribute('aria-hidden','true');
 const pin=document.createElementNS(ns,'g');pin.classList.add('current-location');pin.setAttribute('transform',`translate(${point[0]} ${point[1]})`);
 pin.innerHTML='<circle r="27" fill="#371411" stroke="#ffe3a1" stroke-width="5"/><circle r="13" fill="#ed4c38"/><path d="M-39 0h12M27 0h12M0-39v12M0 27v12" stroke="#ffe3a1" stroke-width="5"/>';
 svg.append(pin);wrap.append(img,svg);const label=document.createElement('p');label.className='map-location-label';label.textContent=`You are here: ${name}`;wrap.append(label);return wrap;
}
