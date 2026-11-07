import './control-icons.css';
// Generated painted artwork shared by every room and inventory tray.
const cells={walk:0,look:1,talk:2,take:3,use:4,notebook:5,map:6,pencil:7,lint:8,replay:9,save:10,load:11,motion:12,new:13,menu:14,hint:15,hotspots:16,reset:17,soundOn:18,soundOff:19,mug:20,key:21,chart:22,hook:23,compass:24};
export type IconName=keyof typeof cells;
// Stable document identities across chapters, independent of the underlying paper atlas.
const paperMarks:Record<string,string>={
 chart:'<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z"/><circle cx="12" cy="12" r="2"/>',
 paper:'<path d="M6 3h8l4 4v14H6Z M14 3v5h4"/>',
 drawing:'<path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2"/><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2"/>',
 copy:'<path d="m5 15 11-11 4 4L9 19l-5 1Z M14 6l4 4M5 15l4 4"/>',
 receipt:'<circle cx="12" cy="12" r="9"/><path d="M15 7H10a3 3 0 0 0 0 6h4a2 2 0 0 1 0 4H8M12 5v14"/>',
 tracing:'<circle cx="5" cy="18" r="2"/><circle cx="19" cy="6" r="2"/><path d="M5 16V8h7v10h7V8"/>',
 recordCopy:'<path d="M3 19h18M3 15h4l2-9 4 11 3-13 2 11h3"/>',
 procedure:'<path d="m3 6 2 2 3-4m-5 9 2 2 3-4m-5 9 2 2 3-4M12 6h9m-9 7h9m-9 7h9"/>'
};
export function paperIcon(item:string,art=icon('chart')){
 const mark=Object.hasOwn(paperMarks,item)?paperMarks[item]:undefined;
 return mark?`<span class="paper-icon" data-paper-icon="${item}" aria-hidden="true">${art}<svg class="paper-badge" viewBox="0 0 24 24" focusable="false" aria-hidden="true">${mark}</svg></span>`:art;
}
let iconId=0;
export function icon(name:IconName){
 if(name==='hook'){const id=`hook-crop-${++iconId}`;return `<svg class="painted-icon" viewBox="0 0 1254 1254" aria-hidden="true"><defs><clipPath id="${id}"><rect x="15" y="210" width="1225" height="190"/></clipPath></defs><g transform="translate(627 627) rotate(-40) translate(-627 -305)"><image clip-path="url(#${id})" href="${import.meta.env.BASE_URL}assets/harbour-tools.png" width="1254" height="1254"/></g></svg>`;}

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
