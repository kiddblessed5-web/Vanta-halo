/* VANTA motion: Lenis smooth scroll + GSAP ScrollTrigger. Falls back to normal scrolling if the libraries or motion are unavailable. */
(function(){
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!window.gsap||!window.ScrollTrigger||reduce)return;
  var gsap=window.gsap,ST=window.ScrollTrigger;gsap.registerPlugin(ST);
  var root=document.documentElement;root.classList.add('gsap');
  var $=function(s,c){return (c||document).querySelector(s)},$$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};

  /* ---- smooth scroll ---- */
  if(window.Lenis){
    var lenis=new Lenis({duration:1.15,easing:function(t){return Math.min(1,1.001-Math.pow(2,-10*t))},smoothWheel:true,anchors:{offset:-90}});
    window.__lenis=lenis;
    lenis.on('scroll',ST.update);
    gsap.ticker.add(function(t){lenis.raf(t*1000)});
    gsap.ticker.lagSmoothing(0);
  }

  /* ---- page load: hero intro ---- */
  var tl=gsap.timeline({defaults:{ease:'power3.out'}});
  var hero=$('.hero.hv'),ph=$('.ph');
  if(hero){
    var vid=$('.hvid',hero);
    if(vid)tl.fromTo(vid,{scale:1.14},{scale:1,duration:2.2,ease:'power2.out'},0);
    tl.from($$('.hv-tag,.hv-main h1,.hv-main p,.hv-main .row',hero),{y:44,opacity:0,duration:1,stagger:.12},.15)
      .from($$('.hv-card',hero),{y:36,opacity:0,duration:1},.5)
      .from($$('.hv-book',hero),{y:40,opacity:0,duration:1},.6);
    if(vid)gsap.to(vid,{yPercent:12,ease:'none',scrollTrigger:{trigger:hero,start:'top top',end:'bottom top',scrub:true}});
    gsap.to($$('.hv-main',hero),{yPercent:-12,opacity:.2,ease:'none',scrollTrigger:{trigger:hero,start:'20% top',end:'bottom top',scrub:true}});
  }
  if(ph){
    var im=$('.bgimg',ph);
    if(im){tl.fromTo(im,{scale:1.14},{scale:1,duration:2,ease:'power2.out'},0);
      gsap.to(im,{yPercent:10,ease:'none',scrollTrigger:{trigger:ph,start:'top top',end:'bottom top',scrub:true}})}
    tl.from($$('.crumbs,h1,.lede',ph),{y:40,opacity:0,duration:1,stagger:.12},.2);
  }
  var hd=$('.hdr');if(hd)tl.from(hd,{y:-30,opacity:0,duration:.9},0);

  /* ---- scroll reveals ---- */
  ST.batch('.rv',{start:'top 90%',once:true,onEnter:function(b){gsap.fromTo(b,{y:38,opacity:0},{y:0,opacity:1,duration:.95,ease:'power3.out',stagger:.09,overwrite:true})}});
  var cardSel='.vc,.cat,.svc,.rev,.card,.big4>div,.statline>div,.tl>*,.kv>*';
  function revealCards(scope){
    var els=$$(cardSel,scope).filter(function(e){return !e.classList.contains('rv')&&!e.__m});
    els.forEach(function(e){e.__m=1});
    if(!els.length)return;
    gsap.set(els,{y:46,opacity:0});
    ST.batch(els,{start:'top 92%',once:true,onEnter:function(b){gsap.to(b,{y:0,opacity:1,duration:.9,ease:'power3.out',stagger:.09,overwrite:true})}});
  }
  revealCards(document);
  /* cards re-rendered by the filters */
  var stock=$('#stock');
  if(stock&&window.MutationObserver){
    new MutationObserver(function(){var fresh=$$('.vc',stock).filter(function(e){return !e.__m});
      fresh.forEach(function(e){e.__m=1});
      if(fresh.length){gsap.fromTo(fresh,{y:26,opacity:0},{y:0,opacity:1,duration:.6,ease:'power3.out',stagger:.05,overwrite:true});ST.refresh()}
    }).observe(stock,{childList:true});
  }
  /* section panels slide up and the large type drifts */
  $$('.sec.light,.sec.alt,.pan,.band,.ftr').forEach(function(s){
    gsap.from(s,{y:60,opacity:0,duration:1.1,ease:'power3.out',scrollTrigger:{trigger:s,start:'top 94%',once:true}});
  });
  $$('.band img').forEach(function(i){gsap.fromTo(i,{yPercent:-8},{yPercent:8,ease:'none',scrollTrigger:{trigger:i.parentNode,start:'top bottom',end:'bottom top',scrub:true}})});

  /* ---- refresh once everything has loaded ---- */
  addEventListener('load',function(){ST.refresh()});
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){ST.refresh()});
})();
