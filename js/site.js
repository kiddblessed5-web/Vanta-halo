/* VANTA site behaviour. Plain JS, no dependencies. Storage calls are wrapped because browsers can block them. */
(function(){
'use strict';
var V=window.VANTA,$=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
function store(k,v){try{if(v===undefined){return JSON.parse(localStorage.getItem(k)||'null')}localStorage.setItem(k,JSON.stringify(v))}catch(e){return null}}
var toastEl;function toast(t){if(!toastEl){toastEl=document.createElement('div');toastEl.className='toast';toastEl.setAttribute('role','status');document.body.appendChild(toastEl)}toastEl.textContent=t;toastEl.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(function(){toastEl.classList.remove('on')},3200)}
function ref(p){return p+'-'+Math.random().toString(36).slice(2,7).toUpperCase()}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}

/* header */
function goTo(el,b){if(!el)return;if(window.__lenis){window.__lenis.scrollTo(el,{offset:b==='center'?-(innerHeight/2-el.offsetHeight/2):(b==='nearest'?-24:-90),duration:1.2})}else el.scrollIntoView({behavior:'smooth',block:b==='nearest'?'nearest':b})}
function lock(o){document.body.style.overflow=o?'hidden':'';if(window.__lenis){o?window.__lenis.stop():window.__lenis.start()}}
var hdr=$('.hdr');
if(hdr){
  var bg=$('.burger');
  if(bg){bg.addEventListener('click',function(){var o=hdr.classList.toggle('open');bg.setAttribute('aria-expanded',o);lock(o)});
    $$('.nav a,.hdr .cta').forEach(function(a){a.addEventListener('click',function(e){if(a.parentNode.classList.contains('dd')&&matchMedia('(max-width:1020px)').matches){e.preventDefault();a.parentNode.classList.toggle('open');return}hdr.classList.remove('open');bg.setAttribute('aria-expanded',false);lock(false)})});
    addEventListener('keydown',function(e){if(e.key==='Escape'&&hdr.classList.contains('open')){bg.click()}});}
  var pg=document.body.getAttribute('data-page');
  $$('.nav a').forEach(function(a){if(a.getAttribute('data-p')===pg)a.setAttribute('aria-current','page')});
}
var yr=$('[data-year]');if(yr)yr.textContent=new Date().getFullYear();

/* reveal, counters, draw-on-view */
var io='IntersectionObserver' in window?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');if(e.target.hasAttribute('data-count'))count(e.target);io.unobserve(e.target)}})},{threshold:.18,rootMargin:'0px 0px -6% 0px'}):null;
function count(el){var to=parseFloat(el.getAttribute('data-count')),dec=+(el.getAttribute('data-dec')||0),t0=null,dur=1400;
  if(matchMedia('(prefers-reduced-motion:reduce)').matches){el.textContent=to.toLocaleString('en-US',{minimumFractionDigits:dec,maximumFractionDigits:dec});return}
  function f(t){if(!t0)t0=t;var p=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-p,4);el.textContent=(to*e).toLocaleString('en-US',{minimumFractionDigits:dec,maximumFractionDigits:dec});if(p<1)requestAnimationFrame(f)}requestAnimationFrame(f)}
$$('.rv,[data-count],.dimfig,.curve').forEach(function(el){if(io)io.observe(el);else{el.classList.add('in');if(el.hasAttribute('data-count'))count(el)}});

/* film tile */
$$('.film').forEach(function(f){var v=$('video',f),b=$('button',f),lab=$('span',b);if(!v||!b)return;
  function set(p){b.setAttribute('aria-pressed',p);lab.textContent=p?'Pause film':'Play film';$('i',b).innerHTML=p?'<svg viewBox="0 0 12 12" fill="currentColor"><path d="M2 1h3v10H2zM7 1h3v10H7z"/></svg>':'<svg viewBox="0 0 12 12" fill="currentColor"><path d="M2 1l9 5-9 5z"/></svg>'}
  b.addEventListener('click',function(){if(v.paused){var p=v.play();if(p&&p.catch)p.catch(function(){});set(true)}else{v.pause();set(false)}});set(false)});

/* tabs */
$$('[data-tabs]').forEach(function(root){
  var bs=$$('[role=tab]',root),ps=$$('[role=tabpanel]',root);
  function sel(i,focus){bs.forEach(function(b,j){b.setAttribute('aria-selected',j===i);b.tabIndex=j===i?0:-1});ps.forEach(function(p,j){p.classList.toggle('on',j===i)});if(focus)bs[i].focus()}
  bs.forEach(function(b,i){b.addEventListener('click',function(){sel(i)});b.addEventListener('keydown',function(e){var k=e.key;if(k==='ArrowDown'||k==='ArrowRight'){e.preventDefault();sel((i+1)%bs.length,1)}if(k==='ArrowUp'||k==='ArrowLeft'){e.preventDefault();sel((i-1+bs.length)%bs.length,1)}})});
  sel(0);
});

/* lightbox */
var gal=$$('.gal button[data-src]');
if(gal.length){
  var lb=document.createElement('div');lb.className='lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');lb.setAttribute('aria-label','Image viewer');
  lb.innerHTML='<button class="x" aria-label="Close">&times;</button><button class="pv" aria-label="Previous">&#8592;</button><figure style="margin:0"><img alt=""><figcaption></figcaption></figure><button class="nx" aria-label="Next">&#8594;</button>';
  document.body.appendChild(lb);var li=0,last=null;
  function show(i){li=(i+gal.length)%gal.length;var b=gal[li];$('img',lb).src=b.getAttribute('data-src');$('img',lb).alt=b.getAttribute('data-cap')||'';$('figcaption',lb).textContent=(b.getAttribute('data-cap')||'')+'  '+(li+1)+' / '+gal.length}
  function open(i){last=document.activeElement;show(i);lb.classList.add('on');document.body.style.overflow='hidden';$('.x',lb).focus()}
  function close(){lb.classList.remove('on');lock(false);if(last)last.focus()}
  gal.forEach(function(b,i){b.addEventListener('click',function(){open(i)})});
  $('.x',lb).onclick=close;$('.pv',lb).onclick=function(){show(li-1)};$('.nx',lb).onclick=function(){show(li+1)};
  lb.addEventListener('click',function(e){if(e.target===lb)close()});
  addEventListener('keydown',function(e){if(!lb.classList.contains('on'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(li-1);if(e.key==='ArrowRight')show(li+1)});
}

/* validated forms (no backend: entries are kept in localStorage so the owner can see the flow works) */
function fieldOK(f){
  var el=$('input,select,textarea',f);if(!el)return true;var v=(el.value||'').trim(),ok=true;
  if(el.type==='checkbox'){ok=!el.required||el.checked}
  else if(el.required&&!v)ok=false;
  else if(el.type==='email'&&v)ok=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  else if(el.type==='tel'&&v)ok=/^[+()\d\s-]{9,18}$/.test(v);
  f.classList.toggle('bad',!ok);return ok}
function validate(form){var first=null,all=true;$$('.fld',form).forEach(function(f){if(!fieldOK(f)){all=false;if(!first)first=$('input,select,textarea',f)}});$$('.chk',form).forEach(function(c){var i=$('input',c);if(i.required&&!i.checked){all=false;c.style.color='#c2301f';if(!first)first=i}else c.style.color=''});if(first)first.focus();return all}
$$('.fld input,.fld select,.fld textarea').forEach(function(el){el.addEventListener('blur',function(){fieldOK(el.closest('.fld'))});el.addEventListener('input',function(){if(el.closest('.fld').classList.contains('bad'))fieldOK(el.closest('.fld'))})});
function data(form){var o={};$$('input,select,textarea',form).forEach(function(el){if(!el.name)return;if(el.type==='checkbox')o[el.name]=el.checked;else o[el.name]=el.value});return o}
$$('form[data-form]').forEach(function(form){
  if(form.hasAttribute('data-custom'))return;
  form.setAttribute('novalidate','');
  form.addEventListener('submit',function(e){e.preventDefault();if(!validate(form))return;
    var d=data(form),r=ref(form.getAttribute('data-prefix')||'VT');d.ref=r;d.at=new Date().toISOString();
    var all=store('vanta_'+form.getAttribute('data-form'))||[];all.push(d);store('vanta_'+form.getAttribute('data-form'),all);
    var ok=$('[data-ok]',form.parentNode);if(ok){$('[data-ref]',ok).textContent=r;form.style.display='none';ok.classList.add('on');goTo(ok,'center')}else toast('Sent. Reference '+r)})});
$$('.news').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();var i=$('input',f);if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(i.value.trim())){i.style.borderColor='#c2301f';i.focus();return}i.style.borderColor='';var a=store('vanta_news')||[];a.push({e:i.value.trim(),at:Date.now()});store('vanta_news',a);i.value='';toast('You are on the list.')})});

/* ---------- journal filter ---------- */
$$('[data-filter]').forEach(function(root){
  var bs=$$('button',root),items=$$(root.getAttribute('data-filter'));
  bs.forEach(function(b){b.addEventListener('click',function(){bs.forEach(function(x){x.setAttribute('aria-pressed',x===b)});var k=b.getAttribute('data-k');items.forEach(function(it){it.style.display=(k==='all'||it.getAttribute('data-cat')===k)?'':'none'})})})});

/* ---------- stock: filter panel + cards (home and stock page) ---------- */
var stockEl=$('#stock');
if(stockEl){
  var limit=+(stockEl.getAttribute('data-limit')||0);
  var DEF={m:'all',paint:'all',w:'all',i:'all',l:'all',s:'all',p:'0',t:'all',sort:'popular'},st=Object.assign({},DEF);
  var stLab={instock:['In stock','ok'],transit:['In transit','warn'],build:['Build slot','red']};
  var ARW='<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M1 7h11M8 3l4 4-4 4"/></svg>';
    function uniq(k){var o=[];V.stock.forEach(function(c){if(o.indexOf(c[k])<0)o.push(c[k])});return o}
  function fill(id,first,items){var el=$('#'+id);if(!el)return;el.innerHTML='<option value="'+first[0]+'">'+first[1]+'</option>'+items.map(function(x){return '<option value="'+esc(x[0])+'">'+esc(x[1])+'</option>'}).join('')}
  fill('f-m',['all','Any body type'],uniq('body').map(function(x){return [x,x]}));
  fill('f-paint',['all','Any fuel'],uniq('fuel').map(function(x){return [x,x]}));
  fill('f-w',['all','Any brand'],uniq('brand').map(function(x){return [x,x]}));
  fill('f-i',['all','Any gearbox'],uniq('gear').map(function(x){return [x,x]}));
  fill('f-l',['all','Any showroom'],uniq('loc').map(function(x){return [x,x]}));
  fill('f-s',['all','Any availability'],[['instock','In stock'],['transit','In transit'],['build','Build slot']]);
  fill('f-p',['0','Any price'],[['5000000','Up to KES 5M'],['8000000','Up to KES 8M'],['12000000','Up to KES 12M']]);
  fill('f-sort',['popular','Popular first'],[['price-asc','Price, low to high'],['price-desc','Price, high to low'],['name','Name, A to Z']]);
  var map={'f-m':'m','f-paint':'paint','f-w':'w','f-i':'i','f-l':'l','f-s':'s','f-p':'p','f-sort':'sort'};
  function sync(){Object.keys(map).forEach(function(id){var el=$('#'+id);if(el)el.value=st[map[id]]})}
  function match(c){return (st.m==='all'||c.body===st.m)&&(st.paint==='all'||c.fuel===st.paint)&&(st.w==='all'||c.brand===st.w)&&(st.i==='all'||c.gear===st.i)&&(st.l==='all'||c.loc===st.l)&&(st.s==='all'||c.status===st.s)&&(st.p==='0'||c.price<=+st.p)&&(st.t==='all'||c.tags.indexOf(st.t)>-1)}
  function render(){
    var list=V.stock.filter(match);
    if(st.t==='new')list.sort(function(a,b){return a.id<b.id?1:-1});
    if(st.sort==='price-asc')list.sort(function(a,b){return a.price-b.price});
    else if(st.sort==='price-desc')list.sort(function(a,b){return b.price-a.price});
    else if(st.sort==='name')list.sort(function(a,b){return a.name<b.name?-1:1});
    var shown=limit?list.slice(0,limit):list;
    stockEl.innerHTML=shown.map(function(c){var l=stLab[c.status],u='test-drive.html?car='+encodeURIComponent(c.name+' ('+c.id+')');
      return '<article class="vc"><a class="vim" href="'+u+'" tabindex="-1" aria-hidden="true"><img src="'+c.img+'" alt="" loading="lazy"><span class="chip"><i class="dt '+l[1]+'"></i>'+l[0]+' &middot; '+esc(c.loc)+'</span></a>'
      +'<div class="vb"><h3>'+esc(c.name)+'</h3><div class="vs"><span>'+esc(c.body)+'</span><span>'+esc(c.fuel)+'</span><span>'+esc(c.gear)+'</span><span>'+esc(c.eta)+'</span></div>'
      +'<div class="vf"><div class="vp"><small>From</small><b>'+V.short(c.price)+'</b></div><a class="vbtn" href="'+u+'" aria-label="Test drive: '+esc(c.name)+'">Test drive<span class="ic">'+ARW+'</span></a></div></div></article>'}).join('');
    var cnt=$('#stock-count');if(cnt)cnt.textContent=(limit&&list.length>shown.length)?'Showing '+shown.length+' of '+list.length+' cars':list.length+' car'+(list.length===1?'':'s');
    var mo=$('#stock-more');if(mo)mo.style.display=(limit&&list.length>shown.length)?'':'none';
    $('#stock-empty').style.display=list.length?'none':'block';
    var parts=[];Object.keys(map).forEach(function(id){var el=$('#'+id);if(el&&id!=='f-sort'&&el.selectedIndex>0)parts.push(el.options[el.selectedIndex].text)});
    var sl=$('#f-sel');if(sl)sl.innerHTML='Selected configuration: <b>'+esc(parts.length?parts.join(' / '):'any car')+'</b>. '+list.length+' match'+(list.length===1?'':'es')+'.';
    $$('[data-grp=q] button').forEach(function(b){var v=b.getAttribute('data-v'),on=v==='all'?(st.s==='all'&&st.p==='0'):v==='u5'?st.p==='5000000':st.s===v;b.setAttribute('aria-pressed',on)})}
  Object.keys(map).forEach(function(id){var el=$('#'+id);if(el)el.addEventListener('change',function(){st[map[id]]=el.value;render()})});
  $$('[data-grp=q] button').forEach(function(b){b.addEventListener('click',function(){var v=b.getAttribute('data-v');if(v==='all'){st.s='all';st.p='0'}else if(v==='u5')st.p='5000000';else st.s=v;sync();render()})});
  var rs=$('#f-reset');if(rs)rs.addEventListener('click',function(){st=Object.assign({},DEF);sync();render()});
  var go=$('#f-go');if(go)go.addEventListener('click',function(e){e.preventDefault();var t=$('#stock-top');if(t)goTo(t,'start')});
  function readHash(){st=Object.assign({},DEF);try{location.hash.slice(1).split('&').forEach(function(kv){var a=kv.split('=');if(a[0]&&(a[0] in st)&&a[1])st[a[0]]=decodeURIComponent(a[1])})}catch(e){}sync();render()}
  readHash();addEventListener('hashchange',function(){if(/[=]/.test(location.hash)){readHash();var t=$('#stock-top');if(t&&$('#filter'))goTo(t,'start')}});
  /* hero booking bar: same options, pushes values into the filter */
  if($('#hb-m')){
    fill('hb-m',['all','Any body type'],uniq('body').map(function(x){return [x,x]}));
    fill('hb-paint',['all','Any fuel'],uniq('fuel').map(function(x){return [x,x]}));
    fill('hb-l',['all','Any showroom'],uniq('loc').map(function(x){return [x,x]}));
    fill('hb-p',['0','Any price'],[['5000000','Up to KES 5M'],['8000000','Up to KES 8M'],['12000000','Up to KES 12M']]);
    var hs='all',tb=$$('.tabsx button');
    tb.forEach(function(b){b.addEventListener('click',function(){hs=b.getAttribute('data-s');tb.forEach(function(x){x.setAttribute('aria-pressed',x===b)})})});
    $('#hb-go').addEventListener('click',function(){st.m=$('#hb-m').value;st.paint=$('#hb-paint').value;st.l=$('#hb-l').value;st.p=$('#hb-p').value;st.s=hs;sync();render();var t=$('#stock-top');if(t)goTo(t,'start')});
  }
}

/* ---------- finance calculator ---------- */
var fc=$('#fc');
if(fc){
  var q=new URLSearchParams(location.search),inPrice=$('#fc-price'),inDep=$('#fc-dep'),inTerm=$('#fc-term'),inRate=$('#fc-rate');
  if(q.get('price')&&+q.get('price')>=+inPrice.min&&+q.get('price')<=+inPrice.max)inPrice.value=q.get('price');
  function calc(){
    var P=+inPrice.value,d=+inDep.value/100,n=+inTerm.value,r=+inRate.value/100/12,dep=P*d,L=P-dep,m=r?L*r/(1-Math.pow(1+r,-n)):L/n,tot=m*n+dep;
    $('#fc-price-o').textContent=V.fmt(P);$('#fc-dep-o').textContent=inDep.value+'%  ('+V.fmt(dep)+')';$('#fc-term-o').textContent=n+' months';$('#fc-rate-o').textContent=(+inRate.value).toFixed(1)+'%';
    $('#fc-month').textContent=V.fmt(m);$('#fc-fin').textContent=V.fmt(L);$('#fc-int').textContent=V.fmt(m*n-L);$('#fc-total').textContent=V.fmt(tot);
    $$('input[type=range]',fc).forEach(function(i){i.style.background='linear-gradient(90deg,#141414 '+((i.value-i.min)/(i.max-i.min)*100)+'%,#bfbeb6 0)'})}
  $$('input[type=range]',fc).forEach(function(i){i.addEventListener('input',calc)});calc();
}

/* ---------- booking ---------- */
var bk=$('#book');
if(bk){
  var qs=new URLSearchParams(location.search);
  if(qs.get('model')&&$('#b-model option[value="'+qs.get('model')+'"]'))$('#b-model').value=qs.get('model');
  if(qs.get('car'))$('#b-notes').value='Interested in '+qs.get('car')+'.';
  var d=$('#b-date'),slotsBox=$('#slots'),slot='',times=['09:00','10:30','12:00','14:00','15:30','17:00'];
  var t=new Date();t.setDate(t.getDate()+1);var iso=function(x){return x.getFullYear()+'-'+('0'+(x.getMonth()+1)).slice(-2)+'-'+('0'+x.getDate()).slice(-2)};
  d.min=iso(t);var mx=new Date();mx.setDate(mx.getDate()+60);d.max=iso(mx);
  function hash(s){var h=0;for(var i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))>>>0;return h}
  function drawSlots(){slot='';var v=d.value,msg=$('#slot-msg');
    if(!v){slotsBox.innerHTML='';msg.textContent='Choose a date to see free times.';return}
    var dow=new Date(v+'T12:00:00').getDay();
    if(dow===0){slotsBox.innerHTML='';msg.textContent='Showrooms are closed on Sundays. Please pick another day.';return}
    msg.textContent='Free times on '+new Date(v+'T12:00:00').toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long'})+':';
    var seed=hash(v+$('#b-room').value);
    slotsBox.innerHTML=times.map(function(x,i){var busy=((seed>>i)&3)===0||(dow===6&&i>3);return '<button type="button" aria-pressed="false" data-t="'+x+'"'+(busy?' disabled':'')+'>'+x+'</button>'}).join('');
    $$('button',slotsBox).forEach(function(b){b.addEventListener('click',function(){$$('button',slotsBox).forEach(function(x){x.setAttribute('aria-pressed',x===b)});slot=b.getAttribute('data-t');$('#slot-err').style.display='none'})})}
  d.addEventListener('change',drawSlots);$('#b-room').addEventListener('change',drawSlots);drawSlots();
  bk.setAttribute('novalidate','');
  bk.addEventListener('submit',function(e){e.preventDefault();var ok=validate(bk);if(!slot){$('#slot-err').style.display='block';ok=false}if(!ok)return;
    var o=data(bk);o.time=slot;o.ref=ref('TD');o.at=new Date().toISOString();var all=store('vanta_testdrives')||[];all.push(o);store('vanta_testdrives',all);
    var m=V.models[o.model];$('#ok-sum').textContent=m.name+' at '+$('#b-room').selectedOptions[0].textContent+', '+new Date(o.date+'T12:00:00').toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long'})+' at '+slot+'.';
    $('#ok-ref').textContent=o.ref;bk.style.display='none';$('#book-ok').classList.add('on');goTo($('#book-ok'),'center')});
}

/* ---------- configurator ---------- */
var cf=$('#cfg');
if(cf){
  var S={m:'halo',p:'obsidian',w:'aero',i:'nappa',k:[]};
  function by(arr,id){for(var i=0;i<arr.length;i++)if(arr[i].id===id)return arr[i]}
  function load(){try{var h=location.hash.slice(1);if(h){h.split('&').forEach(function(kv){var a=kv.split('=');if(a[0]==='k')S.k=a[1]?a[1].split(','):[];else if(a[0] in S)S[a[0]]=a[1]})}else{var s=store('vanta_cfg');if(s)S=s}}catch(e){}
    if(!V.models[S.m])S.m='halo';if(!by(V.paints,S.p))S.p='obsidian';if(!by(V.wheels,S.w))S.w='aero';if(!by(V.interiors,S.i))S.i='nappa';S.k=(S.k||[]).filter(function(x){return by(V.packs,x)})}
  function pr(n){return n?'+'+V.fmt(n):'Included'}
  function build(){
    $('#cfg-models').innerHTML=Object.keys(V.models).map(function(k){var m=V.models[k];return '<button type="button" class="opt" data-g="m" data-id="'+k+'" aria-pressed="false"><span class="dot"></span><span><strong>'+m.name+' &middot; '+m.tag+'</strong><small>'+m.hp.toLocaleString('en-US')+' hp &middot; 0&ndash;100 in '+m.zero+' s &middot; '+m.range+' km range</small></span><span class="pr">'+V.fmt(m.price)+'</span></button>'}).join('');
    $('#cfg-paints').innerHTML=V.paints.map(function(p){return '<button type="button" data-g="p" data-id="'+p.id+'" aria-pressed="false"><i style="background:'+p.c+'"></i><span><b>'+p.name+'</b><small>'+(p.price?'+'+V.short(p.price):'Included')+'</small></span></button>'}).join('');
    function list(id,arr,g,cb){$(id).innerHTML=arr.map(function(o){return '<button type="button" class="opt'+(cb?' cb':'')+'" data-g="'+g+'" data-id="'+o.id+'" aria-pressed="false"><span class="dot"></span><span><strong>'+o.name+'</strong><small>'+o.note+'</small></span><span class="pr">'+pr(o.price)+'</span></button>'}).join('')}
    list('#cfg-wheels',V.wheels,'w');list('#cfg-int',V.interiors,'i');list('#cfg-packs',V.packs,'k',true);
    $$('#cfg [data-g]').forEach(function(b){b.addEventListener('click',function(){var g=b.getAttribute('data-g'),id=b.getAttribute('data-id');if(g==='k'){var ix=S.k.indexOf(id);if(ix<0)S.k.push(id);else S.k.splice(ix,1)}else S[g]=id;update()})})}
  function total(){var m=V.models[S.m],t=m.price+by(V.paints,S.p).price+by(V.wheels,S.w).price+by(V.interiors,S.i).price;S.k.forEach(function(k){t+=by(V.packs,k).price});return t}
  function update(){
    var m=V.models[S.m],P=by(V.paints,S.p),W=by(V.wheels,S.w),I=by(V.interiors,S.i);
    $$('#cfg [data-g]').forEach(function(b){var g=b.getAttribute('data-g'),id=b.getAttribute('data-id');b.setAttribute('aria-pressed',g==='k'?S.k.indexOf(id)>-1:S[g]===id)});
    var img=$('#cfg-img');if(img.getAttribute('src')!==m.img)img.src=m.img;img.alt='Vanta '+m.name;
    $('#cfg-view').style.setProperty('--tintc',P.tint);
    $('#cfg-cap').textContent=m.name+'  /  '+P.name;
    var rows=[['Model',m.name+' ('+V.fmt(m.price)+')'],['Paint',P.name],['Wheels',W.name],['Interior',I.name]];
    S.k.forEach(function(k){rows.push(['Option',by(V.packs,k).name])});
    $('#cfg-sum').innerHTML=rows.map(function(r){return '<li><span>'+r[0]+'</span><b>'+esc(r[1])+'</b></li>'}).join('');
    var T=total();$('#cfg-total').textContent=V.fmt(T);
    var dep=T*.3,L=T-dep,r=.125/12,n=60,mo=L*r/(1-Math.pow(1+r,-n));$('#cfg-month').textContent='From '+V.fmt(mo)+' / month';
    $('#cfg-fin').href='ownership.html?price='+Math.min(70000000,Math.max(10000000,Math.round(T/500000)*500000))+'#finance';
    $('#cfg-spec').textContent=m.hp.toLocaleString('en-US')+' hp  /  0-100 in '+m.zero+' s  /  '+m.range+' km';
    var h='m='+S.m+'&p='+S.p+'&w='+S.w+'&i='+S.i+'&k='+S.k.join(',');try{history.replaceState(null,'','#'+h)}catch(e){}store('vanta_cfg',S)}
  load();build();update();
  $('#cfg-share').addEventListener('click',function(){var u=location.href;if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(u).then(function(){toast('Link to your build copied')},function(){toast('Copy the address bar to share this build')})}else toast('Copy the address bar to share this build')});
  var rq=$('#cfg-req'),box=$('#cfg-reqbox');
  $('#cfg-open').addEventListener('click',function(){box.hidden=false;goTo(box,'center');$('#r-name').focus()});
  rq.setAttribute('novalidate','');
  rq.addEventListener('submit',function(e){e.preventDefault();if(!validate(rq))return;var o=data(rq);o.build=JSON.parse(JSON.stringify(S));o.total=total();o.ref=ref('VB');o.at=new Date().toISOString();var a=store('vanta_builds')||[];a.push(o);store('vanta_builds',a);
    $('#cfg-ref').textContent=o.ref;rq.style.display='none';$('#cfg-ok').classList.add('on')});
}

/* header turns solid after leaving the hero top */
(function(){var h=$('.hdr');if(!h)return;function f(){h.classList.toggle('solid',window.scrollY>40)}f();addEventListener('scroll',f,{passive:true})})();
/* top picks chips */
(function(){var cards=$$('#picks .vc'),chips=$$('[data-grp=tp] button');
  chips.forEach(function(b){b.addEventListener('click',function(){var f=b.getAttribute('data-f'),n=0;
    chips.forEach(function(x){x.setAttribute('aria-pressed',x===b)});
    cards.forEach(function(c){var ok=f==='all'||c.getAttribute('data-tags').split(' ').indexOf(f)>-1;c.hidden=!ok;if(ok)n++});
    var e=$('#tp-none');if(e)e.style.display=n?'none':'block'})})})();
/* inventory: filter toggle and grid/list view */
(function(){var f=$('#filter');$$('[data-toggle=filter]').forEach(function(b){b.addEventListener('click',function(){if(!f)return;f.hidden=!f.hidden;$$('.fbtn').forEach(function(x){x.setAttribute('aria-expanded',!f.hidden)});if(!f.hidden)goTo(f,'nearest')})});
  var st=$('#stock'),vb=$$('[data-view]');vb.forEach(function(b){b.addEventListener('click',function(){if(!st)return;st.classList.toggle('is-list',b.getAttribute('data-view')==='list');vb.forEach(function(x){x.setAttribute('aria-pressed',x===b)})})})})();
/* hero filter height, so the headline never sits under it on phones */
(function(){var h=$('.hero.hv'),b=$('.hv-book');if(!h||!b)return;function f(){h.style.setProperty('--bkh',b.offsetHeight+'px')}f();addEventListener('resize',f);if(window.ResizeObserver)new ResizeObserver(f).observe(b)})();
/* hero featured card */
(function(){var c=$('#hvc');if(!c||!window.VANTA)return;var V=window.VANTA,ks=['halo','halos','halor'],i=0,bars=$$('.hvc-bars i',c);
  function show(n){i=(n+ks.length)%ks.length;var m=V.models[ks[i]];$('#hvc-name').textContent='Vanta '+m.name;$('#hvc-hp').textContent=m.hp.toLocaleString('en-US')+' hp';$('#hvc-pr').textContent=V.fmt(m.price);$('#hvc-go').href='configurator.html#m='+ks[i];$('#hvc-n').textContent='0'+(i+1)+' of 0'+ks.length;bars.forEach(function(b,j){b.classList.toggle('on',j===i)})}
  $('#hvc-p').addEventListener('click',function(){show(i-1)});$('#hvc-x').addEventListener('click',function(){show(i+1)});show(0)})();

})();
