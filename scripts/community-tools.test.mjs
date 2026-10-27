import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {tokenizePython,renderPythonLines} from '../dist/community-tools.js';

test('the complete supplied script is preserved and all numbered lines render',()=>{
  const source=readFileSync(new URL('../dist/community/spoofer.py',import.meta.url),'utf8');
  const manifest=JSON.parse(readFileSync(new URL('../dist/community/script-manifest.json',import.meta.url),'utf8'));
  assert.equal(tokenizePython(source).map(token=>token.text).join(''),source);
  assert.equal((renderPythonLines(source).match(/class="code-line"/g)||[]).length,manifest.lines);
});

test('source markup is encoded, including strings and comments',()=>{
  const source='value = "<script>alert(1)</script> & <img src=x>" # <b>comment</b>\n';
  const rendered=renderPythonLines(source);
  assert(!rendered.includes('<script>'));
  assert(!rendered.includes('<img'));
  assert(!rendered.includes('<b>'));
  assert(rendered.includes('&lt;script&gt;'));
  assert(rendered.includes('&amp;'));
});

test('raw multiline strings retain embedded comment markers and line endings',()=>{
  const source="payload = r'''first\r\n# inside string\r\nlast'''\r\n# outside comment\r\n";
  const tokens=tokenizePython(source);
  assert.equal(tokens.map(token=>token.text).join(''),source);
  assert(tokens.some(token=>token.kind==='string'&&token.text.includes('# inside string')));
  assert(tokens.some(token=>token.kind==='comment'&&token.text==='# outside comment'));
});

test('a trailing newline is retained in source without a fake extra numbered row',()=>{
  const source='pass\n';
  assert.equal(tokenizePython(source).map(token=>token.text).join(''),source);
  assert.equal((renderPythonLines(source).match(/class="code-line"/g)||[]).length,1);
});
