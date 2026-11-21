/* VANTA catalogue data. Prices are in Kenyan shillings (KES). Edit here and every page follows. */
window.VANTA={
  models:{
    halo:{name:'Halo',tag:'Grand Tourer',price:38500000,hp:1020,nm:1150,zero:2.4,top:310,range:480,kg:1640,batt:96,img:'assets/rear34.jpg'},
    halos:{name:'Halo S',tag:'Sport',price:46900000,hp:1180,nm:1280,zero:2.2,top:330,range:450,kg:1610,batt:96,img:'assets/side.jpg'},
    halor:{name:'Halo R',tag:'Track',price:58200000,hp:1350,nm:1420,zero:1.9,top:350,range:410,kg:1540,batt:92,img:'assets/silhouette.jpg'}
  },
  paints:[
    {id:'obsidian',name:'Obsidian Black',note:'Standard',price:0,c:'#15151a',tint:'#34343b'},
    {id:'carbon',name:'Carbon Grey',note:'Metallic',price:650000,c:'#4a4d52',tint:'#6f7379'},
    {id:'glacier',name:'Glacier White',note:'Pearl',price:650000,c:'#e8e9ea',tint:'#d9dbde'},
    {id:'ember',name:'Ember Red',note:'Three-coat',price:850000,c:'#a3150f',tint:'#9a2a22'},
    {id:'tide',name:'Deep Tide',note:'Three-coat',price:850000,c:'#12404a',tint:'#1f5a66'},
    {id:'bespoke',name:'Bespoke',note:'Any colour, matched',price:2400000,c:'linear-gradient(135deg,#e2231a,#e8b84a,#2a6fe2)',tint:'#4a4a58'}
  ],
  wheels:[
    {id:'aero',name:'21" Forged Aero',note:'Standard. Closed-face, lowest drag',price:0},
    {id:'mono',name:'21" Monoblock Black',note:'Satin black, red caliper accent',price:420000},
    {id:'carbonw',name:'22" Carbon',note:'Full carbon barrels, 11 kg lighter per set',price:1600000}
  ],
  interiors:[
    {id:'nappa',name:'Black Nappa',note:'Standard. Full-grain leather, black stitching',price:0},
    {id:'bone',name:'Bone and Black',note:'Two-tone leather, bone headliner',price:380000},
    {id:'ember',name:'Ember Leather',note:'Deep red seats, black dash',price:380000},
    {id:'weave',name:'Carbon Weave',note:'Alcantara seats, exposed carbon trim',price:520000}
  ],
  packs:[
    {id:'carbonpk',name:'Carbon Pack',note:'Roof, mirrors, splitter and diffuser in exposed carbon',price:1900000},
    {id:'trackpk',name:'Track Pack',note:'Fixed wing, harnesses, launch and lap software',price:2600000},
    {id:'ceramic',name:'Ceramic Brakes',note:'420 mm carbon-ceramic discs, 6-piston calipers',price:1400000},
    {id:'audio',name:'Studio Audio',note:'23 speakers, 1,800 W, tuned in the cabin',price:480000}
  ],
  stock:[
    {id:'CR-1021',name:'Genesis GV80',brand:'Genesis',body:'SUV',fuel:'Petrol',gear:'Automatic',loc:'Nairobi',status:'instock',eta:'Available now',price:12800000,img:'assets/car-genesis-gv80.jpg',tags:['lux']},
    {id:'CR-1034',name:'Audi A6 Avant',brand:'Audi',body:'Estate',fuel:'Petrol',gear:'Automatic',loc:'Nairobi',status:'instock',eta:'Available now',price:11500000,img:'assets/car-audi-a6.jpg',tags:['lux']},
    {id:'CR-1047',name:'Tesla Model 3',brand:'Tesla',body:'Sedan',fuel:'Electric',gear:'Automatic',loc:'Mombasa',status:'instock',eta:'Available now',price:6500000,img:'assets/car-tesla-model3.jpg',tags:['eh']},
    {id:'CR-1052',name:'Porsche 911 GTS',brand:'Porsche',body:'Sport',fuel:'Petrol',gear:'Automatic',loc:'Nairobi',status:'transit',eta:'Arrives in 3 weeks',price:31000000,img:'assets/car-porsche-911.jpg',tags:['lux']},
    {id:'CR-1068',name:'Kia EV6',brand:'Kia',body:'SUV',fuel:'Electric',gear:'Automatic',loc:'Nairobi',status:'instock',eta:'Available now',price:7900000,img:'assets/car-kia-ev6.jpg',tags:['eh']},
    {id:'CR-1073',name:'Toyota Corolla Hybrid',brand:'Toyota',body:'Sedan',fuel:'Hybrid',gear:'Automatic',loc:'Mombasa',status:'instock',eta:'Available now',price:3900000,img:'assets/car-corolla.jpg',tags:['eh']},
    {id:'CR-1085',name:'Toyota RAV4 Hybrid',brand:'Toyota',body:'SUV',fuel:'Hybrid',gear:'Automatic',loc:'Nairobi',status:'transit',eta:'Arrives in 5 weeks',price:6400000,img:'assets/car-rav4.jpg',tags:['eh']},
    {id:'CR-1091',name:'Volkswagen Tiguan',brand:'Volkswagen',body:'SUV',fuel:'Petrol',gear:'Automatic',loc:'Mombasa',status:'transit',eta:'Arrives in 6 weeks',price:6900000,img:'assets/car-tiguan.jpg',tags:['new']},
    {id:'CR-1102',name:'Volkswagen ID. Buzz',brand:'Volkswagen',body:'Minivan',fuel:'Electric',gear:'Automatic',loc:'Nairobi',status:'build',eta:'Build slot, 4 months',price:9800000,img:'assets/car-id-buzz.jpg',tags:['eh', 'new']},
    {id:'CR-1116',name:'Mini Cooper S',brand:'Mini',body:'Hatchback',fuel:'Petrol',gear:'Automatic',loc:'Nairobi',status:'build',eta:'Build slot, 3 months',price:4200000,img:'assets/car-mini.jpg',tags:['new']},
    {id:'CR-1120',name:'Volkswagen Polo',brand:'Volkswagen',body:'Hatchback',fuel:'Petrol',gear:'Manual',loc:'Mombasa',status:'instock',eta:'Available now',price:2100000,img:'assets/car-polo.jpg',tags:['new']}
  ],
  showrooms:{nairobi:'Vanta House, Westlands, Nairobi',karen:'Delivery Centre, Karen, Nairobi',mombasa:'Vanta Nyali, Mombasa'}
};
window.VANTA.fmt=function(n){return 'KES '+Math.round(n).toLocaleString('en-US')};
window.VANTA.short=function(n){return n>=1e6?'KES '+(n/1e6).toFixed(n%1e6?2:1).replace(/\.?0+$/,'')+'M':window.VANTA.fmt(n)};
