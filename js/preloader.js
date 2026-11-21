/* VANTA preloader: an RPM dashboard. Self-test sweep, then the needle climbs with the load, then redlines as the curtain lifts. */
(function(){
  var pre=document.getElementById('pre'),root=document.documentElement;
  if(!pre)return;
  var n=document.getElementById('pre-n'),rpm=document.getElementById('pre-rpm'),bar=document.getElementById('pre-bar'),arc=document.getElementById('pre-arc'),needle=document.getElementById('pre-needle'),st=document.getElementById('pre-st');
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.__preActive=true;
  function done(){
    try{sessionStorage.setItem('vpre','1')}catch(e){}
    root.classList.remove('pre-lock');
    if(pre.parentNode)pre.parentNode.removeChild(pre);
    window.__preActive=false;
    window.dispatchEvent(new Event('vanta:ready'));
  }
  if(!window.gsap||reduce){
    var t=Date.now();
    function fin(){pre.classList.add('pre-out');setTimeout(done,500)}
    if(document.readyState==='complete')setTimeout(fin,400);else addEventListener('load',function(){setTimeout(fin,Math.max(0,500-(Date.now()-t)))});
    setTimeout(fin,4000);return;
  }
  var gsap=window.gsap,t0=Date.now(),loaded=document.readyState==='complete',finished=false;
  var s={p:0,th:0,jit:0};              /* p = load %, th = needle angle 0..270 */
  var lis=pre.querySelectorAll('.pre-sys li'),stages=['Starting','Motors online','Battery ready','Chassis set','Display live'];
  function setNeedle(th){gsap.set(needle,{rotation:135+th,svgOrigin:'200 200'});arc.setAttribute('stroke-dashoffset',1-th/270);rpm.textContent=(th/270*8).toFixed(1)}
  function renderP(){n.textContent=Math.round(s.p);bar.style.transform='scaleX('+(s.p/100)+')';
    lis.forEach(function(li,i){li.classList.toggle('on',s.p>=(i+1)*22)});
    st.textContent=stages[Math.min(4,Math.floor(s.p/25)+(s.p>=100?0:0))]||stages[4]}
  setNeedle(0);
  gsap.from(pre.querySelectorAll('.pre-ticks line,.pre-nums text'),{opacity:0,duration:.5,stagger:.012,ease:'none'});
  gsap.from(pre.querySelector('.pre-ring'),{scale:.9,transformOrigin:'50% 50%',opacity:0,duration:.9,ease:'power3.out'});
  gsap.from(pre.querySelectorAll('.pre-top>*,.pre-bot>*,.pre-sys,.pre-gear'),{y:18,opacity:0,duration:.8,stagger:.08,ease:'power3.out',delay:.2});

  /* 1) self-test sweep, like a real cluster powering up */
  var tl=gsap.timeline();
  tl.to(s,{th:270,duration:.95,ease:'power2.inOut',onUpdate:function(){setNeedle(s.th)}},.5)
    .to(s,{th:0,duration:.8,ease:'power2.inOut',onUpdate:function(){setNeedle(s.th)}},1.55)
    /* 2) the load: needle follows progress, with a little engine shimmer */
    .to(s,{p:90,duration:2.6,ease:'power2.out',onUpdate:function(){renderP();setNeedle(Math.min(270,s.p*2.7*0.92+Math.sin(Date.now()/70)*3*(s.p/90)))}},2.4);
  var chk=setInterval(function(){if(loaded&&Date.now()-t0>3300){clearInterval(chk);finish()}},80);
  addEventListener('load',function(){loaded=true});
  setTimeout(function(){clearInterval(chk);finish()},9000);

  function finish(){
    if(finished)return;finished=true;tl.kill();
    var th0=s.th;
    gsap.timeline({onComplete:exit})
      .to(s,{p:100,duration:.5,ease:'power1.out',onUpdate:function(){renderP()}},0)
      .to(s,{th:270,duration:.5,ease:'power3.in',onUpdate:function(){setNeedle(s.th)}},0)
      .to(s,{th:262,duration:.12,yoyo:true,repeat:3,ease:'none',onUpdate:function(){setNeedle(s.th)}},.5);
    pre.classList.add('pre-red');
  }
  function exit(){
    var dash=pre.querySelector('.pre-dash');
    gsap.timeline({onComplete:done})
      .to(dash,{scale:1.35,opacity:0,duration:.8,ease:'power3.in'},0)
      .to(pre.querySelectorAll('.pre-top,.pre-bot,.pre-bar,.pre-sys'),{opacity:0,duration:.35},0)
      .to(pre,{yPercent:-100,duration:1.05,ease:'power4.inOut'},.55)
      .to(pre.querySelector('.pre-dome'),{scaleY:0,duration:1.05,ease:'power4.inOut',transformOrigin:'50% 0'},.55);
  }
})();
