import {initCommunityTools} from './community-tools.js';
import {badges, faqs, sources} from './data.js';

const $ = (selector, parent=document) => parent.querySelector(selector);
const $$ = (selector, parent=document) => [...parent.querySelectorAll(selector)];
const iconPaths = {
  arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',
  external:'<path d="M14 3h7v7m0-7L10 14M10 4H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-5"/>',
  chevron:'<path d="m6 9 6 6 6-6"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
  close:'<path d="m6 6 12 12M6 18 18 6"/>',
  play:'<path d="m9 5 11 7-11 7Z"/><path d="M4 4v16"/>',
  shield:'<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z"/><path d="m9 12 2 2 4-5"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v.5"/>',
  spark:'<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z"/>',
  swords:'<path d="m4 3 5 2 10 13-2 2L5 8Zm16 0-5 2-4 5M9 14l-4 5m-2-3 5 5m8-6 5 5m-3-2 3 3"/>',
  gamepad:'<path d="M7 7h10c3 0 5 10 3 11-2 1-4-3-5-3H9c-1 0-3 4-5 3C2 17 4 7 7 7Z"/><path d="M8 9v5m-2.5-2.5h5M16 10h.1m2 3h.1"/>',
  stream:'<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4m-2-13 5 3-5 3Z"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  sliders:'<path d="M4 7h6m4 0h6M4 17h10m4 0h2M10 4v6m4 4v6"/>',
  cursor:'<path d="m4 3 6 18 3-8 8-3Z"/>',
  edit:'<path d="m15 4 5 5L9 20H4v-5Z"/><path d="m12 7 5 5"/>',
  eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
  lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v3"/>',
  desktop:'<rect x="3" y="3" width="18" height="13" rx="2"/><path d="M8 21h8m-4-5v5"/>',
  code:'<path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 18"/>',
  check:'<path d="m5 12 4 4L19 6"/>',
  reset:'<path d="M3 10a9 9 0 1 1 2 8M3 4v6h6"/>',
  copy:'<rect x="8" y="8" width="12" height="13" rx="2"/><path d="M15 8V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h4"/>',
  expand:'<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/>',
};
const icon = (name) => `<svg viewBox="0 0 24 24" aria-hidden="true">${iconPaths[name] || iconPaths.spark}</svg>`;
function hydrateIcons(parent=document) { $$('[data-icon]',parent).forEach(el => { const name=el.dataset.icon; el.innerHTML=icon(name); }); }
const escape = text => String(text).replace(/[&<>"']/g, ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const format = n => new Intl.NumberFormat('en-US').format(n);
const defaults = {name:'nightshift', banner:0, levels:[6,7,4,5], visible:[true,true,true,true]};
const state = {name:defaults.name,banner:0,levels:[...defaults.levels],visible:[...defaults.visible],active:0,explorerLevels:[...defaults.levels]};
const banners = [{name:'Twilight',color:'#8072d7'},{name:'Ocean',color:'#4e88b8'},{name:'Rose',color:'#b7749f'},{name:'Forest',color:'#518e82'},{name:'Ember',color:'#ae8053'}];
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
let toastTimeout;
function toast(message){$('#toast').textContent=message;$('#toast').classList.add('visible');clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>$('#toast').classList.remove('visible'),2800);}
function levelLabel(badge,i,short=false){const level=badge.levels[i];const plus=i===badge.levels.length-1?'+':'';const value=format(level.value)+plus;if(short)return badge.shortUnit==='h'?value+'h':value+' '+badge.shortUnit;return value+' '+(level.value===1?badge.unit.replace(/s$/,''):badge.unit);}
function imageMarkup(level,size=32){return `<img src="${level.image}" width="${size}" height="${size}" alt="${escape(level.name)} badge" loading="lazy">`;}

$('#badge-grid').innerHTML=badges.map((b,i)=>`<button class="badge-card" data-collection="${i}" style="--card-color:${b.color};--card-rgb:${b.rgb}" aria-label="Explore ${b.name}, 10 community-documented levels"><div class="badge-card-art"><span class="card-levels">10 LEVELS TO EXPLORE</span><span class="card-symbol">${icon(b.icon)}</span>${imageMarkup(b.levels[[9,7,8,9][i]],86)}</div><div class="badge-card-content"><div class="badge-card-title"><h3>${b.name}</h3>${icon('arrow')}</div><p>${b.description}</p><div class="card-footer"><span class="tier-dots" aria-hidden="true">${'<i></i>'.repeat(10)}</span><span>Evolving badge</span><span>Explore ${icon('arrow')}</span></div></div></button>`).join('');
$('#badge-tabs').innerHTML=badges.map((b,i)=>`<button class="badge-tab" role="tab" id="tab-${b.id}" aria-controls="explorer-panel" aria-selected="${i===0}" tabindex="${i===0?0:-1}" data-badge-tab="${i}">${icon(b.icon)}${b.name}</button>`).join('');

function selectBadge(index,scroll=false){state.active=index;renderExplorer();if(scroll)$('#progression').scrollIntoView({behavior:reducedMotion.matches?'instant':'smooth'});}
function animateBadge(){const image=$('#evolution-image');image.classList.remove('badge-transform');void image.offsetWidth;if(!reducedMotion.matches)image.classList.add('badge-transform');}
function renderExplorer(animate=true){
  const b=badges[state.active],index=state.explorerLevels[state.active],level=b.levels[index];
  $('#explorer').style.setProperty('--badge-color',b.color);$('#explorer').style.setProperty('--badge-rgb',b.rgb);
  $$('.badge-tab').forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===state.active));tab.tabIndex=i===state.active?0:-1;});
  $('#explorer-panel').setAttribute('aria-labelledby','tab-'+b.id);
  $('#evolution-image').src=level.image;$('#evolution-image').alt=`${level.name}, ${b.name} level ${index+1}`;
  $('#level-pill').textContent=`LEVEL ${String(index+1).padStart(2,'0')} / 10`;
  $('#evolution-collection').textContent=b.name.toUpperCase();$('#evolution-name').textContent=level.name;
  $('#evolution-mechanic').textContent=b.mechanic;
  $('#evolution-detail').textContent=b.detail;
  $('#evolution-value').textContent=format(level.value)+(index===9?'+':'');
  $('#evolution-unit').textContent=b.unit==='hours'?(state.active===2?'hours shared':'hours played'):(b.unit==='games'?'different games':'years on Discord');
  $('#next-milestone').textContent=index<9?`Next: ${b.levels[index+1].name} at ${levelLabel(b,index+1)}`:'The final community-documented milestone.';
  $('#mini-tier').textContent=`${b.name} · ${level.name}`;
  $('#timeline').innerHTML=b.levels.map((l,i)=>`<button class="milestone ${i<=index?'visited':''}" data-milestone="${i}" aria-pressed="${i===index}" aria-label="Level ${i+1}: ${l.name}, ${levelLabel(b,i)}" title="${l.name} · ${levelLabel(b,i)}"><span class="milestone-art">${imageMarkup(l,34)}<span class="milestone-number">${String(i+1).padStart(2,'0')}</span></span><span>${levelLabel(b,i,true)}</span></button>`).join('');
  const slider=$('#level-slider');slider.value=index;slider.setAttribute('aria-valuetext',`Level ${index+1}, ${level.name}, ${levelLabel(b,index)}`);slider.style.setProperty('--range-progress',index/9*100+'%');
  $('#level-output').textContent=String(index+1).padStart(2,'0')+' / 10';
  if(animate)animateBadge();
}
$('#badge-grid').addEventListener('click',e=>{const card=e.target.closest('[data-collection]');if(card)selectBadge(Number(card.dataset.collection),true);});
$$('[data-explore]').forEach(button=>button.addEventListener('click',()=>selectBadge(badges.findIndex(b=>b.id===button.dataset.explore),true)));
$('#badge-tabs').addEventListener('click',e=>{const tab=e.target.closest('[data-badge-tab]');if(tab)selectBadge(Number(tab.dataset.badgeTab));});
$('#badge-tabs').addEventListener('keydown',e=>{let next=state.active;if(e.key==='ArrowRight')next=(next+1)%badges.length;else if(e.key==='ArrowLeft')next=(next+badges.length-1)%badges.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=badges.length-1;else return;e.preventDefault();selectBadge(next);$$('.badge-tab')[next].focus();});
$('#timeline').addEventListener('click',e=>{const button=e.target.closest('[data-milestone]');if(!button)return;const index=Number(button.dataset.milestone);state.explorerLevels[state.active]=index;renderExplorer();const current=$$('[data-milestone]')[index];current.focus({preventScroll:true});current.scrollIntoView({behavior:reducedMotion.matches?'instant':'smooth',block:'nearest',inline:'nearest'});});
$('#level-slider').addEventListener('input',e=>{state.explorerLevels[state.active]=Number(e.target.value);renderExplorer();});
$('#level-slider').addEventListener('change',()=>{const index=state.explorerLevels[state.active];$$('[data-milestone]')[index].scrollIntoView({behavior:reducedMotion.matches?'instant':'smooth',block:'nearest',inline:'nearest'});});
$('#apply-badge').addEventListener('click',()=>{state.levels[state.active]=state.explorerLevels[state.active];state.visible[state.active]=true;renderProfile();toast(`${badges[state.active].levels[state.levels[state.active]].name} added to your preview`);$('#profile').scrollIntoView({behavior:reducedMotion.matches?'instant':'smooth'});});

$('#banner-colors').innerHTML=banners.map((b,i)=>`<button type="button" class="swatch" style="--swatch:${b.color}" data-banner="${i}" aria-label="${b.name} banner" aria-pressed="${i===0}">${i===0?icon('check'):''}</button>`).join('');
$('#profile-selectors').innerHTML=badges.map((b,i)=>`<div class="profile-selector"><img class="selector-image" id="selector-image-${i}" src="${b.levels[state.levels[i]].image}" width="31" height="31" alt="${b.levels[state.levels[i]].name} badge" loading="lazy"><div class="selector-description"><label for="select-${b.id}">${b.name}</label><span id="selector-value-${i}">${levelLabel(b,state.levels[i])}</span></div><div class="select-wrap"><select id="select-${b.id}" data-profile-level="${i}" aria-label="${b.name} preview level">${b.levels.map((l,j)=>`<option value="${j}" ${j===state.levels[i]?'selected':''}>${String(j+1).padStart(2,'0')} · ${l.name}</option>`).join('')}</select>${icon('chevron')}</div><input class="visibility-check" type="checkbox" data-profile-visible="${i}" aria-label="Show ${b.name} on preview" checked></div>`).join('');
function renderProfile(){
  $$('[data-profile-name]').forEach(el=>{el.replaceChildren(document.createTextNode(state.name));const pronoun=document.createElement('span');pronoun.className='pronoun';pronoun.textContent='they / them';el.append(pronoun);});
  $$('[data-name-text]').forEach(el=>el.textContent=state.name);
  $$('[data-profile-badges]').forEach(row=>{row.innerHTML=badges.map((b,i)=>state.visible[i]?`<button data-profile-badge="${i}" title="${b.name}: ${b.levels[state.levels[i]].name} · ${levelLabel(b,state.levels[i])}" aria-label="Explore ${b.name}, ${b.levels[state.levels[i]].name}">${imageMarkup(b.levels[state.levels[i]],26)}</button>`:'').join('')||'<span class="empty-badges">Your blank canvas</span>';});
  $$('.playground-profile').forEach(card=>card.style.setProperty('--banner',banners[state.banner].color));
  $$('[data-banner]').forEach((button,i)=>{button.setAttribute('aria-pressed',String(i===state.banner));button.innerHTML=i===state.banner?icon('check'):'';});
  badges.forEach((b,i)=>{const level=b.levels[state.levels[i]];$('#select-'+b.id).value=state.levels[i];$('#selector-image-'+i).src=level.image;$('#selector-image-'+i).alt=`${level.name} ${b.name} badge`;$('#selector-value-'+i).textContent=levelLabel(b,state.levels[i]);$(`[data-profile-visible="${i}"]`).checked=state.visible[i];});
}
$('#profile-form').addEventListener('submit',e=>e.preventDefault());
$('#display-name').addEventListener('input',e=>{state.name=e.target.value.trim()||'nightshift';renderProfile();});
$('#banner-colors').addEventListener('click',e=>{const button=e.target.closest('[data-banner]');if(button){state.banner=Number(button.dataset.banner);renderProfile();}});
$('#profile-selectors').addEventListener('change',e=>{if(e.target.matches('[data-profile-level]'))state.levels[Number(e.target.dataset.profileLevel)]=Number(e.target.value);else if(e.target.matches('[data-profile-visible]'))state.visible[Number(e.target.dataset.profileVisible)]=e.target.checked;renderProfile();});
document.addEventListener('click',e=>{const button=e.target.closest('[data-profile-badge]');if(button){const i=Number(button.dataset.profileBadge);state.explorerLevels[i]=state.levels[i];selectBadge(i,true);}});
document.addEventListener('click',e=>{const button=e.target.closest('[data-featured-badge]');if(button){const i=Number(button.dataset.featuredBadge);state.explorerLevels[i]=Number(button.dataset.featuredLevel);selectBadge(i,true);}});
$('#reset-profile').addEventListener('click',()=>{state.name=defaults.name;state.banner=defaults.banner;state.levels=[...defaults.levels];state.visible=[...defaults.visible];$('#display-name').value=state.name;renderProfile();toast('Your profile preview has been reset.');});

$('#faq-list').innerHTML=faqs.map(([q,a],i)=>`<article class="faq-item"><h3><button class="faq-question" id="faq-question-${i}" aria-expanded="false" aria-controls="faq-answer-${i}">${escape(q)}${icon('plus')}</button></h3><div class="faq-answer" id="faq-answer-${i}" role="region" aria-labelledby="faq-question-${i}"><div><p>${escape(a)} <a href="${i===3||i===5?sources.manage:sources.official}" target="_blank" rel="noopener noreferrer">${i===7?'Official Discord guide':'Source'} ↗</a></p></div></div></article>`).join('');
$('#faq-list').addEventListener('click',e=>{const button=e.target.closest('.faq-question');if(!button)return;const item=button.closest('.faq-item'),isOpen=button.getAttribute('aria-expanded')==='true';button.setAttribute('aria-expanded',String(!isOpen));item.classList.toggle('open',!isOpen);});

initCommunityTools({icon,reducedMotion});

const menuButton=$('#menu-toggle');function closeMenu(){menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open navigation');menuButton.innerHTML=icon('menu');$('#nav-links').classList.remove('open');}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation');menuButton.innerHTML=icon(open?'close':'menu');$('#nav-links').classList.toggle('open',open);});
$('#nav-links').addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menuButton.getAttribute('aria-expanded')==='true'){closeMenu();menuButton.focus();}});
document.addEventListener('click',e=>{if(menuButton.getAttribute('aria-expanded')==='true'&&!e.composedPath().includes($('.nav')))closeMenu();});
matchMedia('(min-width:721px)').addEventListener('change',e=>{if(e.matches)closeMenu();});

const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){if(!reducedMotion.matches)entry.target.classList.add('reveal-arrived');revealObserver.unobserve(entry.target);}}),{threshold:.08});
$$('.section-heading,.badge-grid,.explorer,.profile-workbench,.how-steps,.tools-layout,.faq-list,.closing').forEach(el=>revealObserver.observe(el));
const navObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){$$('.nav-links a').forEach(a=>{a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id);if(a.getAttribute('href')==='#'+entry.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}});},{rootMargin:'-15% 0px -60% 0px'});
$$('main>section[id]').forEach(section=>navObserver.observe(section));
if(!reducedMotion.matches&&matchMedia('(pointer:fine)').matches){let frame;$('#hero-visual').addEventListener('pointermove',e=>{if(frame)return;const rect=e.currentTarget.getBoundingClientRect();const x=(e.clientX-rect.left)/rect.width-.5,y=(e.clientY-rect.top)/rect.height-.5;frame=requestAnimationFrame(()=>{$('#hero-profile').style.transform=`rotate(-4deg) rotateY(${x*7}deg) rotateX(${-y*5}deg) translate(2px,12px)`;frame=null;});});$('#hero-visual').addEventListener('pointerleave',()=>{if(frame)cancelAnimationFrame(frame);frame=null;$('#hero-profile').style.removeProperty('transform');});}
document.addEventListener('error',e=>{if(e.target instanceof HTMLImageElement&&!e.target.dataset.fallback){e.target.dataset.fallback='true';e.target.src='./assets/favicon.svg';e.target.alt+=' (artwork unavailable)';}},true);
hydrateIcons();renderProfile();renderExplorer(false);
