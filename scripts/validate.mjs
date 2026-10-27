import {readFileSync,existsSync,statSync,readdirSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {badges,faqs} from '../dist/data.js';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const html=readFileSync(resolve(root,'dist/index.html'),'utf8');
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
const assert=(condition,message)=>{if(!condition)throw new Error(message);};
assert(new Set(ids).size===ids.length,'Duplicate HTML id');
for(const [,id] of html.matchAll(/href="#([^"]+)"/g))assert(ids.includes(id),`Unresolved anchor: ${id}`);
for(const [,path] of html.matchAll(/(?:src|href)="(\.\/[^"#]+)"/g))assert(existsSync(resolve(root,'dist',path.split('?')[0])),`Missing asset: ${path}`);
assert(badges.length===4,'Expected four badge collections');
assert(faqs.length===8,'Expected eight FAQ answers');
for(const badge of badges){
  assert(badge.levels.length===10,`Incomplete levels: ${badge.id}`);
  badge.levels.forEach((level,i)=>{
    assert(existsSync(resolve(root,'dist',level.image)),`Missing artwork: ${level.image}`);
    assert(i===0||level.value>badge.levels[i-1].value,`Milestones must increase: ${badge.id}`);
  });
}
const scriptManifest=JSON.parse(readFileSync(resolve(root,'dist/community/script-manifest.json'),'utf8'));
const originalScript=readFileSync(resolve(root,'dist/community/spoofer.py'));
assert(createHash('sha256').update(originalScript).digest('hex')===scriptManifest.sha256,'Python source hash mismatch');
assert(originalScript.length===scriptManifest.bytes,'Python source length mismatch');
assert(existsSync(resolve(root,'dist/community/LICENSE.txt')),'Missing redistributed MIT license');
assert((html.match(/class="code-editor panel"/g)||[]).length===1,'Keep a single existing script editor');
assert(html.includes('id="how-it-works"')&&html.includes('id="tools"'),'Legacy section anchors must work');
assert(html.includes('og:image')&&html.includes('canonical'),'Missing SEO metadata');
for(const file of ['app.js','data.js','community-tools.js'])execFileSync(process.execPath,['--check',resolve(root,'dist',file)]);
const bytes=readdirSync(resolve(root,'dist/assets')).reduce((n,file)=>n+statSync(resolve(root,'dist/assets',file)).size,0);
console.log(`Build verified: 4 collections, 40 tiers, 8 FAQs, ${scriptManifest.lines}-line original Python source, one editor, local assets (${Math.round(bytes/1024)} KB), valid navigation and JavaScript.`);
console.log('Static production output: dist/ (no compilation or dependency installation required).');
