import './control-icons.css';
// Generated painted artwork shared by every room and inventory tray.
const cells={walk:0,look:1,talk:2,take:3,use:4,notebook:5,map:6,pencil:7,lint:8,replay:9,save:10,load:11,motion:12,new:13,menu:14,hint:15,hotspots:16,reset:17,soundOn:18,soundOff:19,mug:20,key:21,chart:22,hook:23,compass:24};
export type IconName=keyof typeof cells;
let iconId=0;
export function icon(name:IconName){
 const cell=cells[name],size=1254/5,inset=16,x=(cell%5)*size+inset,y=Math.floor(cell/5)*size+inset,edge=size-inset*2,id=`painted-crop-${++iconId}`;
 return `<svg class="painted-icon" viewBox="${x} ${y} ${edge} ${edge}" aria-hidden="true" focusable="false"><defs><clipPath id="${id}"><rect x="${x}" y="${y}" width="${edge}" height="${edge}"/></clipPath></defs><image clip-path="url(#${id})" href="${import.meta.env.BASE_URL}assets/pirate-ui-atlas.png" width="1254" height="1254"/></svg>`;
}
export function iconControl(el:HTMLElement,name:IconName,label:string,shortcut?:string){el.classList.add('icon-control');el.innerHTML=icon(name);el.setAttribute('aria-label',label);el.title=shortcut?`${label} (${shortcut})`:label;el.dataset.tooltip=el.title;if(shortcut)el.setAttribute('aria-keyshortcuts',shortcut);}
export function pocketTrinkets(container:HTMLElement){for(const [name,label] of [['pencil','Pencil — Nell’s trusty chartmaking pencil'],['lint','Lint — a small collection of pocket fluff']] as const){const item=document.createElement('span');item.className='pocket-trinket';item.setAttribute('role','img');item.setAttribute('aria-label',label);item.tabIndex=0;item.title=label;item.dataset.tooltip=label;item.innerHTML=icon(name);container.append(item);}}
export function decorateControls(root:ParentNode=document){
 const verbs={walk:'Walk to',look:'Look at',talk:'Talk to',take:'Pick up',use:'Use'};
 root.querySelectorAll<HTMLElement>('[data-verb]').forEach(el=>{const key=el.dataset.verb as keyof typeof verbs;iconControl(el,key,verbs[key],String(Object.keys(verbs).indexOf(key)+1));el.setAttribute('aria-pressed',String(el.classList.contains('active')));});
 const controls:Record<string,[IconName,string,string?]>={notebook:['notebook','Notebook','N'],map:['map','Map'],replay:['replay','Replay speech'],save:['save','Save'],load:['load','Load'],motion:['motion','Reduced motion'],'new-game':['new','New adventure'],'main-menu':['menu','Main menu'],hint:['hint','Hint'],hotspots:['hotspots','Show hotspots','H'],reset:['reset','Reset room'],restart:['reset','Restart duel']};
 for(const [id,[name,label,key]] of Object.entries(controls)){const el=root.querySelector<HTMLElement>(`#${id}`);if(el)iconControl(el,name,label,key);}
}
