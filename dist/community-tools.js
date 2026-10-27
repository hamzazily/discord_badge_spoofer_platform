// The Python file is fetched as text for display/copying. It is never evaluated.
const escapeHTML = value => value.replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const pythonKeywords = new Set('and as assert async await break case class continue def del elif else except False finally for from global if import in is lambda match None nonlocal not or pass raise return True try while with yield'.split(' '));
const pythonPattern = /#[^\r\n]*|(?:\b(?:br|rb|fr|rf|r|u|b|f))?(?:"""(?:\\[\s\S]|(?!""")[\s\S])*"""|'''(?:\\[\s\S]|(?!''')[\s\S])*'''|"(?:\\[\s\S]|[^"\\\r\n])*"|'(?:\\[\s\S]|[^'\\\r\n])*')|\b(?:and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|False|finally|for|from|global|if|import|in|is|lambda|match|None|nonlocal|not|or|pass|raise|return|True|try|while|with|yield)\b|\b(?:0[xX][0-9a-fA-F]+|\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\b/gi;

export function tokenizePython(source) {
  const tokens = [];
  let position = 0;
  for (const match of source.matchAll(pythonPattern)) {
    if (match.index > position) tokens.push({kind:'plain',text:source.slice(position, match.index)});
    const text = match[0];
    const kind = text.startsWith('#') ? 'comment' : pythonKeywords.has(text) ? 'keyword' : /^\d/.test(text) ? 'number' : 'string';
    tokens.push({kind,text});
    position = match.index + text.length;
  }
  if (position < source.length) tokens.push({kind:'plain',text:source.slice(position)});
  return tokens;
}

export function renderPythonLines(source) {
  const lines = [''];
  for (const token of tokenizePython(source)) {
    const pieces = token.text.split('\n');
    pieces.forEach((piece,index) => {
      if (index) lines.push('');
      if (!piece) return;
      const encoded = escapeHTML(piece);
      lines[lines.length-1] += token.kind === 'plain' ? encoded : `<span class="code-${token.kind}">${encoded}</span>`;
    });
  }
  // A trailing newline stays in the copied source, without adding a fake numbered line.
  if (source.endsWith('\n') && lines[lines.length-1] === '') lines.pop();
  return lines.map((line,index) => `<span class="code-line"><span class="line-number" aria-hidden="true">${index+1}</span><span class="line-text">${line}</span></span>`).join('');
}

export function initCommunityTools({icon,reducedMotion}) {
  const $ = selector => document.querySelector(selector);
  const tabs = [...document.querySelectorAll('[data-guide-step]')];
  const panels = [...document.querySelectorAll('.usage-panel')];
  const copyButtons = [...document.querySelectorAll('[data-copy-script]')];
  const timers = new Map();
  let step = 0;
  let source = null;
  let loadInProgress = false;
  const command = 'python spoofer.py';

  function showStep(index,focus=false) {
    step = Math.max(0,Math.min(tabs.length-1,index));
    tabs.forEach((tab,i) => {tab.setAttribute('aria-selected',String(i===step));tab.tabIndex=i===step?0:-1;});
    panels.forEach((panel,i) => {panel.hidden=i!==step;});
    $('#previous-guide-step').disabled=step===0;
    $('#next-guide-step').disabled=step===tabs.length-1;
    $('#guide-step-status').textContent=`Step ${step+1} of ${tabs.length}`;
    if (focus) tabs[step].focus();
  }

  tabs.forEach((tab,index) => tab.addEventListener('click',()=>showStep(index)));
  $('.usage-steps').addEventListener('keydown',event => {
    let next=step;
    if(event.key==='ArrowRight') next=(step+1)%tabs.length;
    else if(event.key==='ArrowLeft') next=(step+tabs.length-1)%tabs.length;
    else if(event.key==='Home') next=0;
    else if(event.key==='End') next=tabs.length-1;
    else return;
    event.preventDefault();showStep(next,true);
  });
  $('#previous-guide-step').addEventListener('click',()=>showStep(step-1));
  $('#next-guide-step').addEventListener('click',()=>showStep(step+1));

  function setExpanded(expanded) {
    $('#code-body').classList.toggle('expanded',expanded);
    $('#expand-code').setAttribute('aria-expanded',String(expanded));
    $('#expand-code').innerHTML=`${expanded?'Collapse':'Expand'} code ${icon('expand')}`;
  }
  $('#expand-code').addEventListener('click',()=>setExpanded(!$('#code-body').classList.contains('expanded')));

  async function loadScript() {
    if(loadInProgress) return;
    loadInProgress=true;
    source=null;
    copyButtons.forEach(button=>button.disabled=true);
    $('#script-status').textContent='Loading original source…';
    $('#script-load-error').hidden=true;
    $('#code-content').hidden=false;
    $('#manual-script-copy').hidden=true;
    $('#code-content').textContent='Loading the complete original file…';
    try {
      const [manifestResponse,sourceResponse]=await Promise.all([
        fetch(new URL('./community/script-manifest.json',import.meta.url),{cache:'no-cache'}),
        fetch(new URL('./community/spoofer.py',import.meta.url),{cache:'no-cache'}),
      ]);
      if(!manifestResponse.ok||!sourceResponse.ok) throw new Error('Source unavailable');
      const manifest=await manifestResponse.json();
      const bytes=await sourceResponse.arrayBuffer();
      if(bytes.byteLength!==manifest.bytes) throw new Error('Source length mismatch');
      const hash=await crypto.subtle.digest('SHA-256',bytes);
      const actual=[...new Uint8Array(hash)].map(byte=>byte.toString(16).padStart(2,'0')).join('');
      if(actual!==manifest.sha256) throw new Error('Source integrity mismatch');
      const text=new TextDecoder('utf-8',{fatal:true}).decode(bytes);
      if(!text) throw new Error('Empty source');
      $('#code-content').innerHTML=renderPythonLines(text);
      source=text;
      $('#script-status').textContent='Original source · verified';
      $('#script-file-meta').textContent=`${manifest.lines.toLocaleString('en-US')} lines · ${(bytes.byteLength/1024).toFixed(1)} KB · SHA-256 verified`;
      copyButtons.forEach(button=>button.disabled=false);
    } catch {
      $('#script-status').textContent='Source unavailable';
      $('#code-content').textContent='Unable to load and verify the original script.';
      $('#script-file-meta').textContent='Source not verified · copying disabled';
      $('#script-load-error').hidden=false;
    } finally {loadInProgress=false;}
  }
  $('#retry-script').addEventListener('click',loadScript);

  function copySuccess(button,label) {
    clearTimeout(timers.get(button));
    const target=button.querySelector('.copy-action-label')||button.querySelector('span:last-child');
    target.textContent='Copied!';button.classList.add('copied');
    timers.set(button,setTimeout(()=>{target.textContent=label;button.classList.remove('copied');},2500));
  }

  function highlightEditor() {
    const editor=$('#script-editor');
    editor.scrollIntoView({behavior:reducedMotion.matches?'instant':'smooth',block:'center'});
    editor.classList.remove('code-highlight');
    if(!reducedMotion.matches) {void editor.offsetWidth;editor.classList.add('code-highlight');}
  }

  async function copyScript(button) {
    if(source===null) return;
    highlightEditor();
    try {
      if(!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(source);
      copySuccess(button,'Copy script');
      $('#copy-feedback').textContent='Complete script copied. Save it as spoofer.py, then follow step 3 to open it locally.';
    } catch {
      $('#code-content').hidden=true;
      const manual=$('#manual-script-copy');
      manual.value=source;manual.hidden=false;setExpanded(true);manual.focus();manual.select();
      $('#copy-feedback').textContent='Automatic copy is unavailable. The complete script is selected in the editor: use your usual copy shortcut, or choose Download source.';
    }
  }
  copyButtons.forEach(button=>button.addEventListener('click',()=>copyScript(button)));
  $('#copy-run-command').addEventListener('click',async event=>{
    const button=event.currentTarget;
    try {
      await navigator.clipboard.writeText(command);
      copySuccess(button,'Copy');
      $('#copy-feedback').textContent='Launch command copied. Run it only in the folder where you saved spoofer.py.';
    } catch {$('#copy-feedback').textContent='Clipboard access is unavailable. Select and copy the launch command shown in step 3.';}
  });
  void loadScript();
}
