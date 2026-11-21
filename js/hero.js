/* Home hero: view switcher (profile, film, rear three-quarter) and the rev-ruler navigation. Choosing a ruler stop also scrolls to that section. */
(function(){
  var hero=document.getElementById('hero');if(!hero)return;
  var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  var stage=document.getElementById('stage'),vid=document.getElementById('bgv');
  var slides=[document.getElementById('sl0'),vid,document.getElementById('sl2')],light=[true,false,false],thumbs=Array.prototype.slice.call(document.querySelectorAll('.thumbs button')),cs=0;
  function view(i){cs=(i+slides.length)%slides.length;
    slides.forEach(function(el,j){el.classList.toggle('on',j===cs)});
    stage.classList.toggle('light',light[cs]);stage.classList.toggle('dark',!light[cs]);
    thumbs.forEach(function(b,j){b.setAttribute('aria-pressed',j===cs)});
    if(cs===1){if(!reduce){var p=vid.play();if(p&&p.catch)p.catch(function(){})}}else vid.pause()}
  thumbs.forEach(function(b,i){b.addEventListener('click',function(){view(i)})});
  document.getElementById('hprev').addEventListener('click',function(){view(cs-1)});
  document.getElementById('hnext').addEventListener('click',function(){view(cs+1)});
  view(0);

  var S=[
    {id:'evolution',l:'Evolution',s:'Evol.',t:'Six generations of one idea, from the 2019 clay model to Halo.'},
    {id:'specs',l:'Specifications',s:'Specs',t:'1,020 hp, 1,150 Nm and a 0 to 100 km/h time of 2.4 seconds.'},
    {id:'tech',l:'Technology',s:'Tech',t:'Solid-state cells, torque vectoring on every wheel, active aero.'},
    {id:'dimensions',l:'Dimensions',s:'Dims',t:'4,520 mm long, 1,300 mm tall, 1,990 mm wide. 2,730 mm wheelbase.'},
    {id:'gallery',l:'Gallery',s:'Gallery',t:'Studio, track and road. Frames from the launch shoot.'},
    {id:'features',l:'Features',s:'Features',t:'Carbon monocoque, matrix lighting, a cabin without a single switch.'}
  ];
  var F=[.07,.25,.43,.6,.78,.95],FD=F.slice(),FM=[.07,.21,.36,.52,.72,.93],cur=0,ruler=document.getElementById('ruler'),cv=document.getElementById('rc'),ctx=cv.getContext('2d'),stops=document.getElementById('stops');
  var W=0,H=50,dpr=Math.min(2,window.devicePixelRatio||1),px=null,needle=F[0],tgt=F[0],raf=0,btns=[];
  S.forEach(function(o,i){var li=document.createElement('li');li.style.left=F[i]*100+'%';var b=document.createElement('button');b.type='button';b.innerHTML='<span class="l">'+o.l+'</span><span class="s">'+o.s+'</span>';b.setAttribute('aria-label','Go to '+o.l);
    b.addEventListener('click',function(){go(i);var el=document.getElementById(o.id);if(el)setTimeout(function(){el.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'})},reduce?0:420)});
    b.addEventListener('mouseenter',function(){px=F[i]*W;kick()});li.appendChild(b);stops.appendChild(li);btns.push(b)});
  function go(i){cur=i;tgt=F[i];btns.forEach(function(b,j){b.setAttribute('aria-current',j===i)});
    var el=document.getElementById('sect');el.classList.remove('swap');void el.offsetWidth;el.innerHTML='<b><i>0'+(i+1)+'</i>'+S[i].l+'</b><p>'+S[i].t+'</p>';el.classList.add('swap');kick()}
  function size(){var r=ruler.getBoundingClientRect();W=r.width;var nf=W<420?FM:FD;for(var q=0;q<6;q++){F[q]=nf[q];if(stops.children[q])stops.children[q].style.left=nf[q]*100+'%'}tgt=F[cur];needle=tgt;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);kick()}
  ruler.addEventListener('mousemove',function(e){var r=ruler.getBoundingClientRect();px=e.clientX-r.left;kick()});
  ruler.addEventListener('mouseleave',function(){px=null;kick()});
  function draw(){
    ctx.clearRect(0,0,W,H);var gap=6,n=Math.floor(W/gap),nx=needle*W,P=px==null?nx:px,i,x,d,h,a,mag;
    for(i=0;i<=n;i++){
      x=i*gap+.5;d=Math.abs(x-P);mag=Math.exp(-(d*d)/(2*46*46));
      var major=i%10===0,base=major?13:7;h=base+(px==null?0:24*mag);
      var dn=Math.abs(x-nx),near=Math.exp(-(dn*dn)/(2*26*26));h+=14*near;
      a=.25+.5*mag+.2*(major?1:0);
      ctx.fillStyle=near>.35?'rgba(226,35,26,'+Math.min(1,.5+near)+')':'rgba(13,13,13,'+Math.min(1,a)+')';
      ctx.fillRect(x,H-h,major?1.5:1,h);
    }
    ctx.fillStyle='#e2231a';ctx.fillRect(nx-.75,0,1.5,H);
    var rpm=Math.round(needle*8200/100)*100,rp=document.getElementById('rpm'),gg=document.getElementById('gauge');
    if(rp)rp.textContent=rpm.toLocaleString('en-US');if(gg)gg.classList.toggle('red',rpm>=6500);
    btns.forEach(function(b,j){if(px!=null){var dd=Math.abs(F[j]*W-px);b.style.opacity=Math.max(.45,Math.min(1,1-dd/160))}else b.style.opacity=''});
  }
  function tick(){raf=0;var diff=tgt-needle;needle=reduce||Math.abs(diff)<.0004?tgt:needle+diff*.12;draw();if(needle!==tgt||px!=null)raf=requestAnimationFrame(tick)}
  function kick(){if(!raf)raf=requestAnimationFrame(tick)}
  if(window.ResizeObserver)new ResizeObserver(size).observe(ruler);else addEventListener('resize',size);
  size();go(0);needle=0;kick();
})();
