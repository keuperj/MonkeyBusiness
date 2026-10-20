import {readdir,readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const assets=[];
for(const dir of ['assets','audio'])for(const name of (await readdir(`public/${dir}`)).sort()){
 if(!/\.(png|mp3|webp|jpg|ogg)$/.test(name))continue;
 const bytes=await readFile(`public/${dir}/${name}`);assets.push({path:`${dir}/${name}`,bytes:bytes.length,revision:createHash('sha256').update(bytes).digest('hex')});
}
await writeFile('public/chapter-assets.json',JSON.stringify({chapter:'Act I — A Job, a Tankard and a Toll',assets}));
