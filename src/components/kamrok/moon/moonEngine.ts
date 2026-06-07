// @ts-nocheck
/* eslint-disable */
// AUTO-GENERATED from public/index-kamrok.html via scripts/gen-moon.mjs — do not hand-edit.
// Faithful port of the KAMROK moonscape, adapted to run as a React component
// (three 0.160 + three-stdlib GLTFLoader, assets from the Lovable CDN).
import * as THREE from "three";
import { GLTFLoader } from "three-stdlib";
import { MOON_ASSETS } from "@/config/moonAssets";

export function startMoonExperience(): () => void {
  // THREE is a frozen ES-module namespace; make a mutable copy so we can hang
  // GLTFLoader off it the way the original (window.THREE) build did.
  const T: any = { ...THREE };
  T.GLTFLoader = GLTFLoader;
  (window as any).THREE = T;
  // route the reference's loader.parse(urlString, "", onLoad, onError) calls to loader.load(url, ...)
  const _origParse = (GLTFLoader as any).prototype.parse;
  (GLTFLoader as any).prototype.parse = function (data: any, path: any, onLoad: any, onError: any) {
    if (typeof data === "string") return (this as any).load(data, onLoad, undefined, onError);
    return _origParse.call(this, data, path, onLoad, onError);
  };
  // assets -> CDN urls (mirrored on the Lovable CDN via MOON_ASSETS)
  (window as any).TEX = { groundColor: MOON_ASSETS.groundColor, groundNormal: MOON_ASSETS.groundNormal, groundRough: MOON_ASSETS.groundRough, rockColor: MOON_ASSETS.rockColor, rockNormal: MOON_ASSETS.rockNormal, trackColor: MOON_ASSETS.trackColor };
  (window as any).CHIMP_GLB = MOON_ASSETS.chimp;
  (window as any).SHIP_GLB = MOON_ASSETS.ship;
  (window as any).ENGINE_SND = MOON_ASSETS.engine;
  (window as any).MUSIC = MOON_ASSETS.music;
  (window as any).ALIEN = { idle: MOON_ASSETS.alienIdle, walk: MOON_ASSETS.alienWalk, run: MOON_ASSETS.alienRun, wave: MOON_ASSETS.alienWave };
  (window as any).PROPS = { rock7: MOON_ASSETS.rock7, rock4: MOON_ASSETS.rock4, platform: MOON_ASSETS.platform, termL: MOON_ASSETS.termL, termS: MOON_ASSETS.termS };
  (window as any).SKILLS_GLB = { react: MOON_ASSETS.react, wordpress: MOON_ASSETS.wordpress, google: MOON_ASSETS.google, starburst: MOON_ASSETS.starburst, heart: MOON_ASSETS.heart };
  (window as any).WORLD_GLB = ""; (window as any).WORLD_HF = ""; (window as any).WORLD_C = "";

  // ---- React lifecycle scaffolding (unbinds everything on unmount) ----
  let __disposed = false, __rafId = 0, __t1: any = 0;
  const __cleanups: Array<() => void> = [];
  function __on(type: string, fn: any, opts?: any) {
    window.addEventListener(type, fn, opts);
    __cleanups.push(() => window.removeEventListener(type, fn, opts));
  }

  // ============================ ported scene ============================


  /* ============ TERRAIN HEIGHT (procedural moonscape, large) ============ */
  const WORLD=460;                       // half-extent of the playable world
  let _seed=20260605>>>0;
  function rnd(){_seed=(_seed*1103515245+12345)&0x7fffffff;return _seed/0x7fffffff;}
  const CRATERS=[];
  for(let i=0;i<40;i++){const ang=rnd()*Math.PI*2,rad=45+rnd()*(WORLD-70);CRATERS.push({x:Math.cos(ang)*rad,z:Math.sin(ang)*rad,r:9+rnd()*24,d:1.4+rnd()*3.4});}
  function terrainHeight(x,z){
    let h=0;
    h+=Math.sin(x*0.018)*Math.cos(z*0.02)*5.2;
    h+=Math.sin(x*0.05+1.3)*Math.cos(z*0.045)*2.2;
    h+=Math.sin((x+z)*0.012)*2.6;
    h+=Math.cos(x*0.12)*Math.sin(z*0.1)*0.7;
    h+=Math.sin(x*0.4+z*0.31)*0.16;
    h+=Math.cos(x*0.8-z*0.6)*0.08;
    for(let i=0;i<CRATERS.length;i++){
      const c=CRATERS[i],dx=x-c.x,dz=z-c.z,dist=Math.sqrt(dx*dx+dz*dz);
      if(dist<c.r){const t=dist/c.r;h+=c.d*(t*t-1);h+=c.d*0.5*Math.exp(-Math.pow((t-0.85)*6,2));}
    }
    return h;
  }

  /* ============ RENDERER / SCENE ============ */
  const app=document.getElementById('app');
  const scene=new T.Scene();
  scene.background=new T.Color(0x04050a);
  scene.fog=new T.FogExp2(0x06070f,0.0038);

  // Detect phone-class devices to tune renderer cost. Cuts ~50% GPU work on mobile.
  const IS_MOBILE = innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const renderer=new T.WebGLRenderer({antialias:!IS_MOBILE, powerPreference:'high-performance'});
  renderer.setPixelRatio(IS_MOBILE ? 1 : Math.min(devicePixelRatio,2));
  renderer.setSize(innerWidth,innerHeight);
  renderer.shadowMap.enabled=!IS_MOBILE;
  renderer.shadowMap.type=T.PCFSoftShadowMap;
  renderer.outputColorSpace=T.SRGBColorSpace;
  renderer.toneMapping=T.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.12;
  app.appendChild(renderer.domElement);

  /* ============ TEXTURES (embedded base64, optional) ============ */
  const TEXES=window.TEX||{};
  const texLoader=new T.TextureLoader();
  const maxAniso=renderer.capabilities.getMaxAnisotropy?renderer.capabilities.getMaxAnisotropy():4;
  function loadTex(key,opts){
    opts=opts||{};const src=TEXES[key];if(!src)return null;
    const t=texLoader.load(src);
    t.wrapS=t.wrapT=T.RepeatWrapping;
    if(opts.repeat)t.repeat.set(opts.repeat,opts.repeat);
    if(opts.srgb)t.colorSpace=T.SRGBColorSpace;
    t.anisotropy=maxAniso;
    return t;
  }
  const TX={
    groundColor:loadTex('groundColor',{srgb:true,repeat:55}),
    groundNormal:loadTex('groundNormal',{repeat:55}),
    groundRough:loadTex('groundRough',{repeat:55}),
    rockColor:loadTex('rockColor',{srgb:true}),
    rockNormal:loadTex('rockNormal',{}),
    trackColor:loadTex('trackColor',{srgb:true})
  };

  /* ============ ISOMETRIC CAMERA ============ */
  const ISO=new T.Vector3(60,64,60);      /* fixed iso offset */
  let VIEW=44;                              /* world units shown vertically */
  let targetVIEW=44;                        /* wheel-zoom goal */
  const camera=new T.OrthographicCamera(-1,1,1,-1,0.1,3000);
  function setFrustum(){
    const a=innerWidth/innerHeight;
    camera.left=-VIEW*a/2;camera.right=VIEW*a/2;camera.top=VIEW/2;camera.bottom=-VIEW/2;
    camera.updateProjectionMatrix();
  }
  setFrustum();
  camera.position.copy(ISO);camera.lookAt(0,0,0);
  /* mouse-wheel zoom (smooth, clamped) */
  __on('wheel',e=>{e.preventDefault();targetVIEW=Math.max(16,Math.min(96,targetVIEW*(1+Math.sign(e.deltaY)*0.09)));},{passive:false});

  /* ============ LIGHTS ============ */
  const sun=new T.DirectionalLight(0xfff3e2,2.1);
  sun.position.set(70,95,30);sun.castShadow=!IS_MOBILE;
  sun.shadow.mapSize.set(IS_MOBILE?512:2048, IS_MOBILE?512:2048);
  const sc=sun.shadow.camera;sc.near=1;sc.far=400;sc.left=-95;sc.right=95;sc.top=95;sc.bottom=-95;
  sun.shadow.bias=-0.0004;
  scene.add(sun);scene.add(sun.target);          // target follows buggy so shadows stay under it
  scene.add(new T.HemisphereLight(0x6f7bb0,0x2a2722,0.55));
  scene.add(new T.AmbientLight(0x3a4366,0.35));
  const rim=new T.DirectionalLight(0x5b6cff,0.45);rim.position.set(-60,30,-50);scene.add(rim);

  /* ============ STARS + NEBULA ============ */
  (function(){
    const N=2400,g=new T.BufferGeometry(),p=new Float32Array(N*3),col=new Float32Array(N*3);
    for(let i=0;i<N;i++){
      const r=700+Math.random()*500,th=Math.random()*Math.PI*2,ph=Math.acos(Math.random()*0.92+0.05);
      p[i*3]=r*Math.sin(ph)*Math.cos(th);
      p[i*3+1]=Math.abs(r*Math.cos(ph))*0.9+40;
      p[i*3+2]=r*Math.sin(ph)*Math.sin(th);
      const w=0.6+Math.random()*0.4;col[i*3]=w;col[i*3+1]=w;col[i*3+2]=Math.min(1,w+0.1);
    }
    g.setAttribute('position',new T.BufferAttribute(p,3));
    g.setAttribute('color',new T.BufferAttribute(col,3));
    scene.add(new T.Points(g,new T.PointsMaterial({size:1.7,sizeAttenuation:false,vertexColors:true,transparent:true,opacity:0.95})));
    // nebula glows
    [[0x3a2f6b,-300,200,-500,160],[0x274a7a,400,160,-450,200],[0x5b2f55,-450,260,300,150]].forEach(([c,x,y,z,r])=>{
      const m=new T.Mesh(new T.SphereGeometry(r,24,24),new T.MeshBasicMaterial({color:c,transparent:true,opacity:0.10,blending:T.AdditiveBlending,depthWrite:false}));
      m.position.set(x,y,z);scene.add(m);
    });
  })();

  /* ============ EARTH + SMALL MOON ============ */
  (function(){
    const earth=new T.Mesh(new T.SphereGeometry(36,48,48),
      new T.MeshStandardMaterial({color:0x2a6cff,emissive:0x10306b,emissiveIntensity:0.55,roughness:0.85}));
    earth.position.set(-180,130,-300);scene.add(earth);
    const halo=new T.Mesh(new T.SphereGeometry(41,32,32),new T.MeshBasicMaterial({color:0x3a7bff,transparent:true,opacity:0.12,side:T.BackSide}));
    halo.position.copy(earth.position);scene.add(halo);
    const cloud=new T.Mesh(new T.SphereGeometry(36.6,40,40),new T.MeshStandardMaterial({color:0xffffff,transparent:true,opacity:0.14,roughness:1}));
    cloud.position.copy(earth.position);scene.add(cloud);
    const moon2=new T.Mesh(new T.SphereGeometry(9,24,24),new T.MeshStandardMaterial({color:0xb8bac2,roughness:1}));
    moon2.position.set(260,180,-200);scene.add(moon2);
  })();

  /* ============ TERRAIN MESH (large, moon-textured) ============ */
  (function(){
    const SIZE=WORLD*2.3, SEG=300;
    const geo=new T.PlaneGeometry(SIZE,SIZE,SEG,SEG);
    geo.rotateX(-Math.PI/2);
    const pos=geo.attributes.position;
    for(let i=0;i<pos.count;i++){pos.setY(i,terrainHeight(pos.getX(i),pos.getZ(i)));}
    geo.computeVertexNormals();
    const mat=TX.groundColor
      ? new T.MeshStandardMaterial({map:TX.groundColor,normalMap:TX.groundNormal||null,normalScale:new T.Vector2(1.3,1.3),roughnessMap:TX.groundRough||null,roughness:1,metalness:0})
      : new T.MeshStandardMaterial({color:0x8d8f96,roughness:1,metalness:0});
    // tighten tiling for the larger ground
    [TX.groundColor,TX.groundNormal,TX.groundRough].forEach(t=>{if(t)t.repeat.set(90,90);});
    const ground=new T.Mesh(geo,mat);ground.receiveShadow=true;scene.add(ground);
  })();

  /* ============ ROCK FIELDS + BOULDERS (with collision) ============ */
  function placeY(x,z,off){return terrainHeight(x,z)+(off||0);}
  const colliders=[];                     // {mesh,x,z,r,mass,vx,vz,yOff,baseScale}
  (function(){
    const rockGeo=new T.DodecahedronGeometry(1,0);
    const rockGeo2=new T.IcosahedronGeometry(1,0);
    const rockMat=TX.rockColor
      ? new T.MeshStandardMaterial({map:TX.rockColor,normalMap:TX.rockNormal||null,color:0xffffff,roughness:1})
      : new T.MeshStandardMaterial({color:0x73757d,roughness:1,flatShading:true});
    const rockMatDk=TX.rockColor
      ? new T.MeshStandardMaterial({map:TX.rockColor,normalMap:TX.rockNormal||null,color:0xb8b8bc,roughness:1})
      : new T.MeshStandardMaterial({color:0x5c5e66,roughness:1,flatShading:true});
    const SP=WORLD*1.9;
    // scattered rocks, with clustering — bigger ones become colliders
    for(let i=0;i<520;i++){
      let x,z;
      if(Math.random()<0.45){const cx=(Math.random()-0.5)*SP,cz=(Math.random()-0.5)*SP;x=cx+(Math.random()-0.5)*18;z=cz+(Math.random()-0.5)*18;}
      else {x=(Math.random()-0.5)*SP;z=(Math.random()-0.5)*SP;}
      if(Math.abs(x)<9&&Math.abs(z)<9)continue;
      const m=new T.Mesh(Math.random()<0.5?rockGeo:rockGeo2,Math.random()<0.5?rockMat:rockMatDk);
      const s=0.35+Math.random()*2.0;
      m.scale.set(s,s*(0.55+Math.random()*0.5),s*(0.8+Math.random()*0.4));
      const yOff=s*0.28;m.position.set(x,placeY(x,z,yOff),z);
      m.rotation.set(Math.random()*3,Math.random()*3,Math.random()*3);
      m.castShadow=true;m.receiveShadow=true;scene.add(m);
      if(s>1.1)colliders.push({mesh:m,x,z,r:s*0.95,mass:s*s*s*1.2,vx:0,vz:0,yOff,baseScale:s});
    }
    // big boulders — heavy, only nudge when rammed
    for(let i=0;i<18;i++){
      const x=(Math.random()-0.5)*WORLD*1.6,z=(Math.random()-0.5)*WORLD*1.6;
      if(Math.abs(x)<16&&Math.abs(z)<16)continue;
      const m=new T.Mesh(rockGeo,rockMatDk);
      const s=3+Math.random()*4.5;
      m.scale.set(s,s*0.8,s*0.9);
      const yOff=s*0.3;m.position.set(x,placeY(x,z,yOff),z);
      m.rotation.set(Math.random()*3,Math.random()*3,Math.random()*3);
      m.castShadow=true;m.receiveShadow=true;scene.add(m);
      colliders.push({mesh:m,x,z,r:s*0.95,mass:s*s*s*1.2,vx:0,vz:0,yOff,baseScale:s});
    }
  })();

  /* ============ MOUNTAIN WALL (encloses the world) ============ */
  (function(){
    const matM=new T.MeshStandardMaterial({color:0x4a4d57,roughness:1,flatShading:true});
    const matM2=new T.MeshStandardMaterial({color:0x3a3d46,roughness:1,flatShading:true});
    const matCap=new T.MeshStandardMaterial({color:0x6b6e78,roughness:1,flatShading:true}); // lit peaks
    const RING=WORLD+38;                         // wall sits just past the drive limit
    const N=190;
    for(let i=0;i<N;i++){
      const a=(i/N)*Math.PI*2;
      // three staggered rows for thickness/overlap -> reads as a continuous wall
      for(let row=0;row<3;row++){
        const rad=RING+row*26+(Math.random()-0.5)*14;
        const x=Math.cos(a)*rad,z=Math.sin(a)*rad;
        const h=60+Math.random()*70 - row*8;
        const baseR=22+Math.random()*16;
        const m=new T.Mesh(new T.ConeGeometry(baseR,h,5+((i+row)%3),1),row===0?matM:matM2);
        m.position.set(x,terrainHeight(x,z)+h/2-6,z);m.rotation.y=Math.random()*Math.PI;
        m.castShadow=true;m.receiveShadow=true;scene.add(m);
        if(row===0&&Math.random()<0.5){const cap=new T.Mesh(new T.ConeGeometry(baseR*0.4,h*0.3,5),matCap);cap.position.set(x,terrainHeight(x,z)+h-h*0.12,z);scene.add(cap);}
      }
    }
  })();

  /* ============ CRASHED LANDER + FLAG (set dressing) ============ */
  (function(){
    const g=new T.Group();
    const foil=new T.MeshStandardMaterial({color:0xd9b25a,roughness:0.35,metalness:0.7,emissive:0x3a2c08,emissiveIntensity:0.3});
    const body=new T.Mesh(new T.CylinderGeometry(2.4,2.8,2.2,8),foil);body.position.y=2.4;body.castShadow=true;g.add(body);
    const top=new T.Mesh(new T.CylinderGeometry(1.4,2.4,1.2,8),new T.MeshStandardMaterial({color:0xc9ccd4,roughness:0.4,metalness:0.6}));top.position.y=4.0;g.add(top);
    // legs
    for(let i=0;i<4;i++){
      const a=i/4*Math.PI*2+0.4;
      const leg=new T.Mesh(new T.CylinderGeometry(0.12,0.12,4,6),new T.MeshStandardMaterial({color:0x8a8d95,roughness:0.6,metalness:0.5}));
      leg.position.set(Math.cos(a)*2.6,1.4,Math.sin(a)*2.6);leg.rotation.z=Math.cos(a)*0.5;leg.rotation.x=-Math.sin(a)*0.5;g.add(leg);
      const foot=new T.Mesh(new T.CylinderGeometry(0.6,0.6,0.2,10),foil);foot.position.set(Math.cos(a)*3.6,0.2,Math.sin(a)*3.6);g.add(foot);
    }
    const dish=new T.Mesh(new T.SphereGeometry(1.1,16,10,0,Math.PI*2,0,Math.PI/2.2),new T.MeshStandardMaterial({color:0xdfe2ea,roughness:0.4,metalness:0.3,side:T.DoubleSide}));
    dish.position.set(1.8,4.6,0);dish.rotation.z=0.7;g.add(dish);
    const lx=-130,lz=120;g.position.set(lx,terrainHeight(lx,lz),lz);g.rotation.y=0.6;scene.add(g);

    // flag near spawn
    const fg=new T.Group();
    const pole=new T.Mesh(new T.CylinderGeometry(0.07,0.07,5,8),new T.MeshStandardMaterial({color:0xdfe2ea,roughness:0.4,metalness:0.5}));
    pole.position.y=2.5;pole.castShadow=true;fg.add(pole);
    const cloth=new T.Mesh(new T.PlaneGeometry(2.4,1.4),new T.MeshStandardMaterial({color:0x101216,emissive:0x111,roughness:0.7,side:T.DoubleSide}));
    cloth.position.set(1.2,4.2,0);fg.add(cloth);
    const fx=14,fz=-8;fg.position.set(fx,terrainHeight(fx,fz),fz);scene.add(fg);
  })();

  /* ============ BUILDS ============ */
  const BUILDS={
    about:{name:'ABOUT',pos:new T.Vector3(0,0,-70)},
    work:{name:'WORK',pos:new T.Vector3(90,0,30)},
    skills:{name:'SKILLS',pos:new T.Vector3(-85,0,55)},
    contact:{name:'CONTACT',pos:new T.Vector3(40,0,110)}
  };
  const LINE=new T.LineBasicMaterial({color:0xf4f4f2,transparent:true,opacity:0.55});
  const WHITE=new T.MeshStandardMaterial({color:0xe8e8e6,emissive:0x222,roughness:0.4,metalness:0.1});
  function edges(mesh){const e=new T.LineSegments(new T.EdgesGeometry(mesh.geometry),LINE);e.position.copy(mesh.position);e.rotation.copy(mesh.rotation);e.scale.copy(mesh.scale);return e;}
  function pad(r,seg){const b=new T.Mesh(new T.CylinderGeometry(r,r,0.4,seg||32),WHITE);b.position.y=0.2;b.receiveShadow=true;return b;}

  function buildMonolith(){const g=new T.Group();
    const slab=new T.Mesh(new T.BoxGeometry(2.4,16,2.4),new T.MeshStandardMaterial({color:0x0c0d12,roughness:0.3,metalness:0.4,emissive:0x0a0a14,emissiveIntensity:0.5}));
    slab.position.y=8;slab.castShadow=true;g.add(slab,edges(slab));
    // floating ring around top
    const ring=new T.Mesh(new T.TorusGeometry(3,0.06,8,40),WHITE);ring.position.y=13;ring.rotation.x=Math.PI/2;g.add(ring);
    const b=pad(5,6);g.add(b,edges(b));
    // steps
    const step=new T.Mesh(new T.CylinderGeometry(6.5,6.5,0.2,6),new T.MeshStandardMaterial({color:0x16181d,roughness:0.8}));step.position.y=0.1;step.receiveShadow=true;g.add(step);
    return g;}
  function buildGallery(){const g=new T.Group();
    for(let i=0;i<3;i++){
      const fr=new T.Mesh(new T.BoxGeometry(6,4,0.25),new T.MeshStandardMaterial({color:0x111319,roughness:0.5,metalness:0.2,emissive:0x14305a,emissiveIntensity:0.45}));
      fr.position.set((i-1)*7.5,6+(i===1?2:0),0);fr.rotation.y=(i-1)*-0.35;fr.castShadow=true;g.add(fr,edges(fr));
      const post=new T.Mesh(new T.CylinderGeometry(0.12,0.12,fr.position.y,8),WHITE);post.position.set(fr.position.x,fr.position.y/2,0.1);g.add(post);
    }
    const b=pad(8,32);g.add(b,edges(b));
    return g;}
  function buildAntenna(){const g=new T.Group();
    const mast=new T.Mesh(new T.CylinderGeometry(0.35,0.6,14,8),WHITE);mast.position.y=7;mast.castShadow=true;g.add(mast);
    for(let i=0;i<3;i++){const ring=new T.Mesh(new T.TorusGeometry(4-i*1.1,0.12,8,40),new T.MeshStandardMaterial({color:0xf4f4f2,emissive:0x335,emissiveIntensity:0.4,roughness:0.3,metalness:0.3}));ring.position.y=5+i*3.2;ring.rotation.x=Math.PI/2;g.add(ring);}
    const dish=new T.Mesh(new T.SphereGeometry(2.6,20,12,0,Math.PI*2,0,Math.PI/2.3),new T.MeshStandardMaterial({color:0xdfe2ea,roughness:0.4,metalness:0.3,side:T.DoubleSide}));dish.position.y=14;dish.rotation.x=Math.PI*0.8;g.add(dish);
    // guy wires
    for(let i=0;i<3;i++){const a=i/3*Math.PI*2;const w=new T.Mesh(new T.CylinderGeometry(0.02,0.02,12,4),LINE_M());w.position.set(Math.cos(a)*2.5,5,Math.sin(a)*2.5);w.rotation.z=Math.cos(a)*0.4;w.rotation.x=-Math.sin(a)*0.4;g.add(w);}
    const b=pad(5,32);g.add(b,edges(b));
    return g;}
  function LINE_M(){return new T.MeshStandardMaterial({color:0xd8d8d4,roughness:0.5,metalness:0.4});}
  function buildBeacon(){const g=new T.Group();
    const p=new T.Mesh(new T.CylinderGeometry(9,9,0.5,6),new T.MeshStandardMaterial({color:0x111319,roughness:0.6,metalness:0.2}));p.position.y=0.25;p.receiveShadow=true;g.add(p,edges(p));
    const mk=new T.MeshStandardMaterial({color:0xf4f4f2,emissive:0x333,emissiveIntensity:0.5});
    [[-2,0,4,0.7],[2,0,4,0.7],[0,0,0.7,4]].forEach(([x,z,w,d])=>{const bar=new T.Mesh(new T.BoxGeometry(w,0.08,d),mk);bar.position.set(x,0.56,z?z:0);g.add(bar);});
    // light pylons at corners
    for(let i=0;i<6;i++){const a=i/6*Math.PI*2;const py=new T.Mesh(new T.CylinderGeometry(0.1,0.1,1.4,6),WHITE);py.position.set(Math.cos(a)*8,0.7,Math.sin(a)*8);g.add(py);const tip=new T.Mesh(new T.SphereGeometry(0.2,8,8),new T.MeshBasicMaterial({color:0x8fb4ff}));tip.position.set(Math.cos(a)*8,1.5,Math.sin(a)*8);g.add(tip);}
    const beam=new T.Mesh(new T.CylinderGeometry(0.25,0.25,20,8),new T.MeshBasicMaterial({color:0x8fb4ff,transparent:true,opacity:0.32}));beam.position.y=10;g.add(beam);
    const light=new T.PointLight(0x8fb4ff,1.3,46);light.position.y=5;g.add(light);
    return g;}
  const builders={about:buildMonolith,work:buildGallery,skills:buildAntenna,contact:buildBeacon};
  Object.keys(BUILDS).forEach(k=>{const b=BUILDS[k];b.pos.y=terrainHeight(b.pos.x,b.pos.z);const g=builders[k]();g.position.copy(b.pos);scene.add(g);});

  /* ============ MOONBUGGY + CHIMP (detailed) ============ */
  const buggy=new T.Group();buggy.rotation.order='YXZ';scene.add(buggy);
  const metal=new T.MeshStandardMaterial({color:0xb9bcc4,roughness:0.42,metalness:0.7});
  const metalD=new T.MeshStandardMaterial({color:0x6c6f78,roughness:0.5,metalness:0.6});
  const dark=new T.MeshStandardMaterial({color:0x23262e,roughness:0.6,metalness:0.4});

  const chassis=new T.Mesh(new T.BoxGeometry(2.4,0.35,3.8),metal);chassis.position.y=1.1;chassis.castShadow=true;buggy.add(chassis,edges(chassis));
  const floor=new T.Mesh(new T.BoxGeometry(2.0,0.12,2.4),metalD);floor.position.set(0,1.3,0.1);buggy.add(floor);
  // roll frame (two hoops + bars)
  const hoop=new T.Mesh(new T.TorusGeometry(1.05,0.06,8,24,Math.PI),metal);hoop.position.set(0,1.5,-0.3);hoop.rotation.x=Math.PI/2;hoop.rotation.z=Math.PI/2;buggy.add(hoop);
  const hoop2=hoop.clone();hoop2.position.z=0.9;buggy.add(hoop2);
  [[-1.0],[1.0]].forEach(([x])=>{const bar=new T.Mesh(new T.CylinderGeometry(0.05,0.05,1.2,6),metal);bar.position.set(x,2.05,0.3);bar.rotation.x=Math.PI/2;buggy.add(bar);});
  // seat
  const seat=new T.Mesh(new T.BoxGeometry(1.2,0.45,1.0),dark);seat.position.set(0,1.55,0.35);buggy.add(seat);
  const seatback=new T.Mesh(new T.BoxGeometry(1.2,0.9,0.22),dark);seatback.position.set(0,1.95,0.82);buggy.add(seatback);
  // rear cargo box + toolbox
  const cargo=new T.Mesh(new T.BoxGeometry(1.8,0.7,0.8),metalD);cargo.position.set(0,1.55,-1.4);cargo.castShadow=true;buggy.add(cargo,edges(cargo));
  const tool=new T.Mesh(new T.BoxGeometry(0.5,0.4,0.5),dark);tool.position.set(0.7,1.95,-1.4);buggy.add(tool);
  // front bumper + headlights
  const bumper=new T.Mesh(new T.BoxGeometry(2.2,0.18,0.3),metalD);bumper.position.set(0,1.0,2.0);buggy.add(bumper);
  const hl=[];[-0.7,0.7].forEach(x=>{const l=new T.Mesh(new T.SphereGeometry(0.18,12,12),new T.MeshStandardMaterial({color:0xfff6d8,emissive:0xfff0c0,emissiveIntensity:1.1}));l.position.set(x,1.25,2.05);buggy.add(l);hl.push(l);const sp=new T.SpotLight(0xfff2d0,0.7,30,0.5,0.5);sp.position.set(x,1.25,2.05);sp.target.position.set(x,0,8);buggy.add(sp,sp.target);});
  // antenna + pennant
  const ant=new T.Mesh(new T.CylinderGeometry(0.03,0.03,1.6,6),metal);ant.position.set(0.85,2.2,-1.0);buggy.add(ant);
  const pennant=new T.Mesh(new T.PlaneGeometry(0.5,0.3),new T.MeshStandardMaterial({color:0xf4f4f2,side:T.DoubleSide,roughness:0.7}));pennant.position.set(1.1,2.8,-1.0);buggy.add(pennant);
  const antDish=new T.Mesh(new T.SphereGeometry(0.32,12,8,0,Math.PI*2,0,Math.PI/2.2),new T.MeshStandardMaterial({color:0xdfe2ea,roughness:0.4,metalness:0.3,side:T.DoubleSide}));antDish.position.set(-0.85,2.5,-1.0);antDish.rotation.x=Math.PI*0.85;buggy.add(antDish);

  // ===== detailed wheels =====
  const W_R=0.74, W_W=0.56;                                  // radius, width
  const tireMat=new T.MeshStandardMaterial({color:0x15171c,roughness:0.92,metalness:0.05});
  const tireMat2=new T.MeshStandardMaterial({color:0x202329,roughness:0.85,metalness:0.05});
  const treadMat=new T.MeshStandardMaterial({color:0x0e0f13,roughness:1,metalness:0.0});
  const rimMat=new T.MeshStandardMaterial({color:0xc7cad2,roughness:0.3,metalness:0.85});
  const rimMatD=new T.MeshStandardMaterial({color:0x8a8d96,roughness:0.4,metalness:0.8});
  const boltMat=new T.MeshStandardMaterial({color:0xe6e8ee,roughness:0.25,metalness:0.9});
  const discMat=new T.MeshStandardMaterial({color:0x3a3d44,roughness:0.5,metalness:0.7});
  function makeWheel(){
    const roll=new T.Group();                                // spins around X (axle) for rolling
    const t=new T.Group();t.rotation.z=Math.PI/2;roll.add(t);// lay cylinders (axis Y) onto axle X
    // brake disc (behind rim)
    const disc=new T.Mesh(new T.CylinderGeometry(0.5,0.5,0.06,24),discMat);disc.position.y=-0.06;t.add(disc);
    // main tire carcass
    const tire=new T.Mesh(new T.CylinderGeometry(W_R,W_R,W_W,32),tireMat);tire.castShadow=true;t.add(tire);
    // sidewalls (slightly larger, beveled look)
    [-1,1].forEach(s=>{const sw=new T.Mesh(new T.CylinderGeometry(W_R*0.99,W_R*0.86,0.06,32),tireMat2);sw.position.y=s*(W_W/2);t.add(sw);});
    // chunky tread blocks — 2 rows, staggered
    const TB=22;
    for(let r=0;r<2;r++){const yoff=(r===0?-1:1)*W_W*0.24;
      for(let i=0;i<TB;i++){const a=(i/TB)*Math.PI*2+(r?Math.PI/TB:0);
        const tb=new T.Mesh(new T.BoxGeometry(0.16,0.12,W_W*0.42),treadMat);
        tb.position.set(Math.cos(a)*(W_R+0.01),yoff,Math.sin(a)*(W_R+0.01));
        tb.rotation.y=-a;tb.rotation.x=Math.PI/2;t.add(tb);}}
    // outer rim ring
    const rim=new T.Mesh(new T.CylinderGeometry(0.5,0.5,W_W*0.78,28),rimMatD);t.add(rim);
    const rimFace=new T.Mesh(new T.CylinderGeometry(0.5,0.5,0.05,28),rimMat);rimFace.position.y=W_W*0.40;t.add(rimFace);
    // spokes (5)
    for(let i=0;i<5;i++){const a=i/5*Math.PI*2;const sp=new T.Mesh(new T.BoxGeometry(0.12,0.07,0.42),rimMat);
      sp.position.set(Math.cos(a)*0.27,W_W*0.40,Math.sin(a)*0.27);sp.rotation.y=-a;t.add(sp);}
    // hub cap + center bolt
    const hub=new T.Mesh(new T.CylinderGeometry(0.17,0.2,W_W*0.5,16),rimMat);hub.position.y=W_W*0.3;t.add(hub);
    const cap=new T.Mesh(new T.SphereGeometry(0.1,12,10),boltMat);cap.position.y=W_W*0.55;t.add(cap);
    // lug bolts
    for(let i=0;i<5;i++){const a=i/5*Math.PI*2+0.3;const b=new T.Mesh(new T.CylinderGeometry(0.035,0.035,0.07,6),boltMat);b.position.set(Math.cos(a)*0.33,W_W*0.44,Math.sin(a)*0.33);t.add(b);}
    roll.traverse(o=>{if(o.isMesh)o.castShadow=true;});
    return roll;
  }
  const wheels=[];const steerPivots=[];let steerVis=0;
  [[-1.3,-1.3],[1.3,-1.3],[-1.3,1.3],[1.3,1.3]].forEach(([wx,wz])=>{
    const pivot=new T.Group();pivot.position.set(wx,W_R,wz);buggy.add(pivot);    // steering pivot
    const w=makeWheel();pivot.add(w);wheels.push(w);
    if(wz>0)steerPivots.push(pivot);                                             // front wheels steer
    // suspension: A-arm + coil-over shock
    const arm=new T.Mesh(new T.CylinderGeometry(0.06,0.06,Math.abs(wx)-0.2,8),metalD);arm.rotation.z=Math.PI/2;arm.position.set(wx*0.45,0.1,0);pivot.add(arm);
    const shock=new T.Mesh(new T.CylinderGeometry(0.07,0.07,0.7,8),metal);shock.position.set(-wx*0.12,0.35,0);shock.rotation.z=wx>0?0.5:-0.5;pivot.add(shock);
    const coil=new T.Mesh(new T.CylinderGeometry(0.13,0.13,0.5,10,1,true),new T.MeshStandardMaterial({color:0xff8a3c,roughness:0.5,metalness:0.4}));coil.position.copy(shock.position);coil.rotation.z=shock.rotation.z;pivot.add(coil);
    // mudguard over wheel
    const guard=new T.Mesh(new T.CylinderGeometry(W_R+0.16,W_R+0.16,W_W+0.12,16,1,true,0,Math.PI),metalD);
    guard.rotation.z=Math.PI/2;guard.position.set(0,0.1,0);pivot.add(guard);
  });
  // steering wheel
  const sw=new T.Mesh(new T.TorusGeometry(0.3,0.05,8,20),dark);sw.position.set(0,1.9,1.15);sw.rotation.x=1.1;buggy.add(sw);
  const col=new T.Mesh(new T.CylinderGeometry(0.04,0.04,0.5,6),metalD);col.position.set(0,1.75,1.0);col.rotation.x=0.6;buggy.add(col);

  /* ===== GLB CHARACTER — replaces procedural chimp when embedded ===== */
  const CHIMP_TARGET_H=2.5;     // model height in world units (tweak size)
  const CHIMP_Y=1.05;           // base height — sits on the chassis
  const CHIMP_FWD=0.15;         // forward offset along +z
  const CHIMP_ROT=0;            // facing forward (flip by Math.PI if needed)
  (function(){
    const data=window.CHIMP_GLB;
    if(!data||false||!T.GLTFLoader)return;
    function b64buf(d){return d;}
    try{
      new T.GLTFLoader().parse(b64buf(data),'',gltf=>{
        const m=gltf.scene;m.rotation.y=CHIMP_ROT;m.updateWorldMatrix(true,true);
        const box=new T.Box3().setFromObject(m),size=box.getSize(new T.Vector3());
        m.scale.setScalar(CHIMP_TARGET_H/Math.max(0.001,size.y));m.updateWorldMatrix(true,true);
        const b2=new T.Box3().setFromObject(m),c=b2.getCenter(new T.Vector3());
        m.position.set(-c.x,CHIMP_Y-b2.min.y,CHIMP_FWD-c.z);
        m.traverse(o=>{if(o.isMesh){o.castShadow=true;o.frustumCulled=false;}});
        buggy.add(m);chimp.visible=false;
      },e=>console.warn('GLB parse failed',e));
    }catch(e){console.warn('GLB error',e);}
  })();

  // chimp
  const chimp=new T.Group();
  const fur=new T.MeshStandardMaterial({color:0x5a4231,roughness:0.9});
  const furD=new T.MeshStandardMaterial({color:0x4a3528,roughness:0.95});
  const skin=new T.MeshStandardMaterial({color:0xcaa074,roughness:0.85});
  const suit=new T.MeshStandardMaterial({color:0xe9ebf0,roughness:0.55,metalness:0.1});
  const body=new T.Mesh(new T.SphereGeometry(0.55,18,16),suit);body.scale.set(1,1.15,0.9);body.position.y=0.5;chimp.add(body);
  const chest=new T.Mesh(new T.BoxGeometry(0.5,0.34,0.12),new T.MeshStandardMaterial({color:0x2a2d34,roughness:0.5,metalness:0.4,emissive:0x123,emissiveIntensity:0.5}));chest.position.set(0,0.6,0.5);chimp.add(chest);
  const head=new T.Mesh(new T.SphereGeometry(0.42,18,16),fur);head.position.y=1.25;chimp.add(head);
  const face=new T.Mesh(new T.SphereGeometry(0.3,16,14),skin);face.position.set(0,1.2,0.22);face.scale.set(1,0.9,0.7);chimp.add(face);
  const brow=new T.Mesh(new T.BoxGeometry(0.34,0.06,0.06),furD);brow.position.set(0,1.32,0.36);chimp.add(brow);
  [-0.12,0.12].forEach(x=>{const eye=new T.Mesh(new T.SphereGeometry(0.05,10,10),dark);eye.position.set(x,1.24,0.42);chimp.add(eye);});
  [-0.4,0.4].forEach(x=>{const e=new T.Mesh(new T.SphereGeometry(0.15,10,10),fur);e.position.set(x,1.28,0);e.scale.z=0.5;chimp.add(e);});
  const helmet=new T.Mesh(new T.SphereGeometry(0.52,20,18),new T.MeshPhysicalMaterial({color:0xaad4ff,transparent:true,opacity:0.26,roughness:0.05,metalness:0,clearcoat:1}));helmet.position.y=1.25;chimp.add(helmet);
  const collar=new T.Mesh(new T.TorusGeometry(0.4,0.08,8,20),suit);collar.position.y=0.95;collar.rotation.x=Math.PI/2;chimp.add(collar);
  // backpack life-support + tube
  const pack=new T.Mesh(new T.BoxGeometry(0.6,0.7,0.3),new T.MeshStandardMaterial({color:0xc9ccd4,roughness:0.5,metalness:0.3}));pack.position.set(0,0.6,-0.45);chimp.add(pack);
  const tube=new T.Mesh(new T.TorusGeometry(0.18,0.04,8,16,Math.PI),new T.MeshStandardMaterial({color:0x9a9da5,roughness:0.6}));tube.position.set(0.25,1.0,-0.2);tube.rotation.y=Math.PI/2;chimp.add(tube);
  // arms to wheel + gloves
  [-0.55,0.55].forEach(x=>{const arm=new T.Mesh(new T.CylinderGeometry(0.12,0.12,0.75,8),suit);arm.position.set(x,0.62,0.4);arm.rotation.x=0.95;chimp.add(arm);const glove=new T.Mesh(new T.SphereGeometry(0.13,10,10),new T.MeshStandardMaterial({color:0xdadce2,roughness:0.6}));glove.position.set(x*0.7,0.82,0.95);chimp.add(glove);});
  chimp.position.set(0,1.4,0.25);chimp.scale.setScalar(0.92);
  chimp.traverse(o=>{if(o.isMesh)o.castShadow=true;});
  buggy.add(chimp);

  /* ============ TIRE TRACKS ============ */
  const TRACK_N=180;const trackMat=TX.trackColor
    ? new T.MeshBasicMaterial({map:TX.trackColor,transparent:true,opacity:0.55,depthWrite:false})
    : new T.MeshBasicMaterial({color:0x4f5158,transparent:true,opacity:0.4,depthWrite:false});
  const trackGeo=new T.PlaneGeometry(0.55,1.0);
  const trackPool=[];let tCursor=0;let lastTrackDist=0;
  for(let i=0;i<TRACK_N;i++){const m=new T.Mesh(trackGeo,trackMat);m.rotation.x=-Math.PI/2;m.position.y=-100;m.visible=false;scene.add(m);trackPool.push(m);}
  function dropTrack(x,z,heading){
    const m=trackPool[tCursor];tCursor=(tCursor+1)%TRACK_N;
    m.visible=true;m.position.set(x,terrainHeight(x,z)+0.06,z);m.rotation.z=-heading;
  }

  /* ============ DUST ============ */
  const DUST_N=90;const dustGeo=new T.BufferGeometry();const dPos=new Float32Array(DUST_N*3);const dLife=new Float32Array(DUST_N);const dVel=[];
  for(let i=0;i<DUST_N;i++){dPos[i*3+1]=-100;dVel.push(new T.Vector3());}
  dustGeo.setAttribute('position',new T.BufferAttribute(dPos,3));
  const dust=new T.Points(dustGeo,new T.PointsMaterial({color:0xc7c9cf,size:0.5,transparent:true,opacity:0.5,depthWrite:false}));scene.add(dust);
  let dCur=0;
  function emitDust(x,y,z){for(let k=0;k<2;k++){const i=dCur;dCur=(dCur+1)%DUST_N;dPos[i*3]=x+(Math.random()-0.5);dPos[i*3+1]=y;dPos[i*3+2]=z+(Math.random()-0.5);dLife[i]=1;dVel[i].set((Math.random()-0.5)*0.06,0.05+Math.random()*0.05,(Math.random()-0.5)*0.06);}}

  /* ============ SURPRISES / EFFECTS ENGINE ============ */
  const ADD=T.AdditiveBlending;
  const fx=[];
  function addFx(o){o.t=0;fx.push(o);}
  function updateFx(dt){for(let i=fx.length-1;i>=0;i--){const f=fx[i];f.t+=dt;f.update(Math.min(1,f.t/f.dur),f.t);if(f.t>=f.dur){f.dispose();fx.splice(i,1);}}}

  function fxBurst(pos,color){
    const g=new T.Group();g.position.copy(pos);g.position.y+=0.2;scene.add(g);
    const ring=new T.Mesh(new T.RingGeometry(0.6,1.0,48),new T.MeshBasicMaterial({color,transparent:true,opacity:0.9,side:T.DoubleSide,blending:ADD,depthWrite:false}));
    ring.rotation.x=-Math.PI/2;g.add(ring);
    const light=new T.PointLight(color,3,34);light.position.y=2.5;g.add(light);
    const N=44,sg=new T.BufferGeometry(),sp=new Float32Array(N*3),sv=[];
    for(let i=0;i<N;i++){sp[i*3+1]=0.2;const a=Math.random()*Math.PI*2,el=Math.random()*1.2;sv.push(new T.Vector3(Math.cos(a)*Math.cos(el)*0.34,Math.sin(el)*0.55+0.25,Math.sin(a)*Math.cos(el)*0.34));}
    sg.setAttribute('position',new T.BufferAttribute(sp,3));
    const sparks=new T.Points(sg,new T.PointsMaterial({color,size:0.45,transparent:true,opacity:1,blending:ADD,depthWrite:false}));g.add(sparks);
    addFx({dur:1.7,update:(p)=>{const s=1+p*17;ring.scale.set(s,s,s);ring.material.opacity=0.9*(1-p);light.intensity=3*(1-p);for(let i=0;i<N;i++){sp[i*3]+=sv[i].x;sp[i*3+1]+=sv[i].y;sp[i*3+2]+=sv[i].z;sv[i].y-=0.011;}sg.attributes.position.needsUpdate=true;sparks.material.opacity=1-p;},dispose:()=>scene.remove(g)});
  }
  function fxPillar(pos,color){
    const g=new T.Group();g.position.copy(pos);scene.add(g);
    const beam=new T.Mesh(new T.CylinderGeometry(1.2,1.7,32,24,1,true),new T.MeshBasicMaterial({color,transparent:true,opacity:0.5,side:T.DoubleSide,blending:ADD,depthWrite:false}));
    beam.position.y=16;g.add(beam);
    const light=new T.PointLight(color,2.6,44);light.position.y=7;g.add(light);
    addFx({dur:2.4,update:(p)=>{const env=Math.sin(p*Math.PI);beam.material.opacity=0.55*env;beam.rotation.y+=0.025;const s=0.6+p*0.9;beam.scale.set(s,1,s);light.intensity=2.6*env;}, dispose:()=>scene.remove(g)});
  }
  function fxAurora(pos){
    const g=new T.Group();g.position.copy(pos);g.position.y+=0.15;scene.add(g);
    const disc=new T.Mesh(new T.CircleGeometry(9,48),new T.MeshBasicMaterial({color:0x6cf2ff,transparent:true,opacity:0,blending:ADD,depthWrite:false}));
    disc.rotation.x=-Math.PI/2;g.add(disc);
    const light=new T.PointLight(0x6cf2ff,0,34);light.position.y=3;g.add(light);
    const cols=[0x6cf2ff,0xb060ff,0x7dffb0,0xffd36c];
    addFx({dur:3.2,update:(p,tt)=>{const c=new T.Color(cols[Math.floor(tt*2)%cols.length]);disc.material.color.copy(c);light.color.copy(c);const env=Math.sin(p*Math.PI);disc.material.opacity=0.5*env;light.intensity=2.2*env;disc.rotation.z+=0.012;},dispose:()=>scene.remove(g)});
  }
  function fxMeteors(pos){
    const g=new T.Group();scene.add(g);const streaks=[];
    for(let i=0;i<7;i++){const m=new T.Mesh(new T.CylinderGeometry(0.05,0.3,7,6),new T.MeshBasicMaterial({color:0xfff0c0,transparent:true,opacity:0.9,blending:ADD,depthWrite:false}));m.position.set(pos.x+(Math.random()-0.5)*70,42+Math.random()*16,pos.z+(Math.random()-0.5)*70);m.rotation.z=0.6;m.rotation.x=0.3;g.add(m);streaks.push({m,vx:-0.7-Math.random()*0.5,vy:-0.9-Math.random()*0.3,delay:i*0.16});}
    addFx({dur:2.7,update:(p,tt)=>{streaks.forEach(s=>{if(tt>s.delay){s.m.position.x+=s.vx;s.m.position.y+=s.vy;s.m.position.z+=s.vx*0.3;}s.m.material.opacity=0.9*(1-p);});},dispose:()=>scene.remove(g)});
  }
  function fxRipple(pos,color){
    const g=new T.Group();g.position.copy(pos);g.position.y+=0.15;scene.add(g);const rings=[];
    for(let i=0;i<4;i++){const r=new T.Mesh(new T.RingGeometry(0.8,1.05,48),new T.MeshBasicMaterial({color,transparent:true,opacity:0.8,side:T.DoubleSide,blending:ADD,depthWrite:false}));r.rotation.x=-Math.PI/2;g.add(r);rings.push({r,delay:i*0.35});}
    const light=new T.PointLight(color,2,28);light.position.y=2;g.add(light);
    addFx({dur:2.7,update:(p,tt)=>{rings.forEach(o=>{const lp=(tt-o.delay)/1.7;if(lp>0&&lp<1){const s=1+lp*19;o.r.scale.set(s,s,s);o.r.material.opacity=0.8*(1-lp);}else{o.r.material.opacity=0;}});light.intensity=2*(1-p);},dispose:()=>scene.remove(g)});
  }
  function fxCrystals(pos){
    const g=new T.Group();g.position.copy(pos);scene.add(g);const cols=[0x6cf2ff,0xb060ff,0x7dffb0],xs=[];
    for(let i=0;i<7;i++){const a=i/7*Math.PI*2,r=2+Math.random()*3,c=cols[i%3];
      const m=new T.Mesh(new T.OctahedronGeometry(0.6+Math.random()*0.6,0),new T.MeshStandardMaterial({color:c,emissive:c,emissiveIntensity:0.8,roughness:0.2,metalness:0.1,transparent:true,opacity:0.9}));
      const bx=Math.cos(a)*r,bz=Math.sin(a)*r,gy=terrainHeight(pos.x+bx,pos.z+bz);
      m.position.set(bx,gy-3,bz);m.userData={startY:gy-3,topY:gy+1.4+Math.random()};g.add(m);xs.push(m);}
    const light=new T.PointLight(0x9fe8ff,2,32);light.position.y=4;g.add(light);
    addFx({dur:3.5,update:(p)=>{const env=Math.sin(p*Math.PI);xs.forEach(m=>{m.position.y=m.userData.startY+(m.userData.topY-m.userData.startY)*env;m.rotation.y+=0.05;m.rotation.x+=0.02;m.material.opacity=0.15+0.85*env;});light.intensity=2*env;},dispose:()=>scene.remove(g)});
  }
  const FX_TYPES=['burst','pillar','aurora','meteors','ripple','crystals'];
  const FX_COLORS=[0x6cf2ff,0xb060ff,0xffd36c,0x7dffb0,0xff7de0];
  function triggerSurprise(type,pos){const col=FX_COLORS[Math.floor(Math.random()*FX_COLORS.length)];
    ({burst:fxBurst,pillar:fxPillar,aurora:fxAurora,meteors:fxMeteors,ripple:fxRipple,crystals:fxCrystals}[type]||fxBurst)(pos,col);}

  const SURPRISES=[];
  (function(){for(let i=0;i<14;i++){let x,z,ok=false,tries=0;
    while(!ok&&tries<40){tries++;x=(Math.random()-0.5)*WORLD*1.7;z=(Math.random()-0.5)*WORLD*1.7;ok=true;
      if(Math.abs(x)<16&&Math.abs(z)<16)ok=false;
      Object.values(BUILDS).forEach(b=>{if(Math.hypot(b.pos.x-x,b.pos.z-z)<26)ok=false;});}
    SURPRISES.push({pos:new T.Vector3(x,terrainHeight(x,z),z),type:FX_TYPES[i%FX_TYPES.length],armed:true,found:false});}})();
  let discovered=0;
  const secretEl=document.getElementById('secretCount'),toastEl=document.getElementById('toast');
  let toastTimer;
  function showToast(t){toastEl.textContent=t;toastEl.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toastEl.classList.remove('show'),1800);}
  const objAnEl=document.getElementById('objAn');
  function updateSecrets(){const s=String(discovered).padStart(2,'0')+' / '+SURPRISES.length;secretEl.textContent=s;if(objAnEl)objAnEl.textContent=s;}
  updateSecrets();

  /* ===== HUD: radar + gauges ===== */
  const objLis={};document.querySelectorAll('#objList li').forEach(li=>objLis[li.dataset.b]=li);
  const radar=document.getElementById('radar'),rctx=radar&&radar.getContext('2d');
  const spVal=document.getElementById('spVal'),spFill=document.getElementById('spFill');
  const stX=document.getElementById('stX'),stZ=document.getElementById('stZ'),stH=document.getElementById('stH'),o2bar=document.getElementById('o2bar');
  const R_RANGE=WORLD;                                // world half-extent shown on radar
  function drawRadar(px,pz,heading){
    if(!rctx)return;const W=radar.width,H=radar.height,cx=W/2,cy=H/2,sc=(W/2-8)/R_RANGE;
    rctx.clearRect(0,0,W,H);
    rctx.strokeStyle='rgba(244,244,242,0.12)';rctx.lineWidth=1;
    rctx.beginPath();rctx.arc(cx,cy,W/2-6,0,Math.PI*2);rctx.stroke();
    rctx.beginPath();rctx.moveTo(cx,8);rctx.lineTo(cx,H-8);rctx.moveTo(8,cy);rctx.lineTo(W-8,cy);rctx.stroke();
    // anomalies
    for(let i=0;i<SURPRISES.length;i++){const s=SURPRISES[i];const x=cx+s.pos.x*sc,y=cy+s.pos.z*sc;
      rctx.beginPath();rctx.arc(x,y,2.2,0,Math.PI*2);
      if(s.found){rctx.fillStyle='#6cf2ff';rctx.fill();}else{rctx.strokeStyle='rgba(108,242,255,0.55)';rctx.stroke();}}
    // builds
    const BL={about:'A',work:'W',skills:'S',contact:'C'};
    Object.keys(BUILDS).forEach(k=>{const b=BUILDS[k],x=cx+b.pos.x*sc,y=cy+b.pos.z*sc;
      rctx.fillStyle='rgba(244,244,242,0.9)';rctx.fillRect(x-2.5,y-2.5,5,5);
      rctx.fillStyle='rgba(244,244,242,0.55)';rctx.font='7px monospace';rctx.fillText(BL[k],x+4,y+3);});
    // player triangle
    const x=cx+px*sc,y=cy+pz*sc;rctx.save();rctx.translate(x,y);rctx.rotate(heading);
    rctx.fillStyle='#ffd36c';rctx.beginPath();rctx.moveTo(0,-5);rctx.lineTo(3.4,4);rctx.lineTo(-3.4,4);rctx.closePath();rctx.fill();rctx.restore();
  }
  let hudTick=0;
  function updateHUD(){
    const sp=Math.abs(st.speed)/MAXS;
    if(spFill)spFill.style.width=Math.round(sp*100)+'%';
    if(spVal)spVal.textContent=Math.round(sp*128);
    if(stX)stX.textContent=Math.round(st.x);
    if(stZ)stZ.textContent=Math.round(st.z);
    if(stH){let deg=Math.round(((st.heading*180/Math.PI)%360+360)%360);stH.textContent=deg+'°';}
    if(o2bar&&(hudTick++%30===0))o2bar.style.width=(93+Math.round(Math.random()*5))+'%';
    drawRadar(st.x,st.z,st.heading);
  }

  /* ============ CONTROLS / STATE ============ */
  const keys={};
  const kmap={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',w:'up',s:'down',a:'left',d:'right',W:'up',S:'down',A:'left',D:'right'};
  __on('keydown',e=>{if(kmap[e.key]){keys[kmap[e.key]]=true;if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key))e.preventDefault();}});
  __on('keyup',e=>{if(kmap[e.key])keys[kmap[e.key]]=false;});
  if(('ontouchstart'in window)||navigator.maxTouchPoints>0)document.body.classList.add('is-touch');
  document.querySelectorAll('.touch button').forEach(btn=>{const k=btn.dataset.k;const on=e=>{e.preventDefault();keys[k]=true;};const off=e=>{e.preventDefault();keys[k]=false;};btn.addEventListener('touchstart',on);btn.addEventListener('touchend',off);btn.addEventListener('mousedown',on);btn.addEventListener('mouseup',off);btn.addEventListener('mouseleave',off);});

  /* ===== engine sound (plays while moving) ===== */
  const engine=window.ENGINE_SND&&window.ENGINE_SND?new Audio(window.ENGINE_SND):null;
  let engineReady=false,muted=false;
  if(engine){engine.loop=true;engine.volume=0;engine.preload='auto';}
  function startEngine(){if(engine&&!engineReady){const p=engine.play();if(p&&p.then)p.then(()=>engineReady=true).catch(()=>{});else engineReady=true;}}
  __on('keydown',startEngine);__on('pointerdown',startEngine);__on('touchstart',startEngine,{passive:true});
  __on('keydown',e=>{if(e.key==='m'||e.key==='M'){muted=!muted;}});
  function updateEngine(){
    /* music / sound / volume are driven by the SETTINGS popover (window globals) */
    const gv=(window.__kamrokVol==null)?0.7:window.__kamrokVol;
    const musicWanted=(window.__kamrokMusic!==false);
    const soundWanted=(window.__kamrokSound!==false);
    if(music){if(musicWanted&&music.paused){const p=music.play();if(p&&p.catch)p.catch(()=>{});}music.volume=musicWanted?0.18*gv:0;}
    if(!engine||!engineReady)return;
    const sp=Math.abs(st.speed)/MAXS;
    const target=(soundWanted?(sp>0.02?0.16+sp*0.6:0):0)*gv;
    engine.volume+=(Math.min(1,target)-engine.volume)*0.12;
    engine.playbackRate=0.8+sp*1.05;
  }

  const st={x:0,z:8,heading:Math.PI,speed:0,steer:0};st.y=terrainHeight(st.x,st.z);
  let autoTarget=null,openBuild=null,manualClose=null;
  const MAXS=0.62,ACC=0.022,REV=0.014,FRICTION=0.965,TURN=0.032,TRIGGER=14;

  /* ============ UI ============ */
  const panels={about:'panel-about',work:'panel-work',skills:'panel-skills',contact:'panel-contact'};
  const navBtns=document.querySelectorAll('#navItems button');
  function openPanel(key){if(openBuild===key)return;Object.values(panels).forEach(id=>document.getElementById(id).classList.remove('open'));if(key){document.getElementById(panels[key]).classList.add('open');if(objLis[key])objLis[key].classList.add('visited');}openBuild=key;navBtns.forEach(b=>b.classList.toggle('active',b.dataset.build===key));}
  let pinned=null;   // a panel opened directly (double-click) stays open regardless of distance
  navBtns.forEach(b=>{
    b.addEventListener('click',()=>{autoTarget=BUILDS[b.dataset.build].pos;manualClose=null;hideHint();});
    b.addEventListener('dblclick',()=>{const k=b.dataset.build;openPanel(k);pinned=k;autoTarget=BUILDS[k].pos;manualClose=null;hideHint();});
  });
  document.querySelectorAll('[data-close]').forEach(c=>c.addEventListener('click',()=>{manualClose=openBuild;pinned=null;openPanel(null);autoTarget=null;}));
  const hintEl=document.getElementById('hint');setTimeout(hideHint,7000);function hideHint(){hintEl.classList.add('gone');}
  const cArrow=document.getElementById('cArrow'),cName=document.getElementById('cName'),cDist=document.getElementById('cDist');

  /* ===== intro screen + settings strip (woods UI) ===== */
  const intro=document.getElementById('intro');
  /* background music — autoplays low after first gesture, toggle in settings */
  const music=window.MUSIC&&window.MUSIC?new Audio(window.MUSIC):null;
  let musicOn=true;
  if(music){music.loop=true;music.volume=0.0;}
  function startMusic(){if(music&&musicOn&&music.paused){const p=music.play();if(p&&p.catch)p.catch(()=>{});}
    if(music)music.volume=musicOn?0.18:0.0;}
  function enterMoon(){if(intro){intro.classList.add('hidden');}startEngine();startMusic();hideHint();}
  const introEnter=document.getElementById('introEnter');if(introEnter)introEnter.addEventListener('click',enterMoon);
  __on('keydown',startMusic,{once:false});__on('pointerdown',startMusic);
  // music toggle
  document.querySelectorAll('#tgMusic button').forEach(b=>b.addEventListener('click',()=>{
    document.querySelectorAll('#tgMusic button').forEach(x=>x.classList.remove('on'));b.classList.add('on');
    musicOn=(b.dataset.v==='on'); if(music){ if(musicOn){startMusic();} else {music.volume=0;music.pause();} }
  }));
  // sound toggle
  document.querySelectorAll('#tgSound button').forEach(b=>b.addEventListener('click',()=>{
    document.querySelectorAll('#tgSound button').forEach(x=>x.classList.remove('on'));b.classList.add('on');
    muted=(b.dataset.v==='off'); if(!muted)startEngine();
  }));
  // fullscreen toggle
  document.querySelectorAll('#tgFull button').forEach(b=>b.addEventListener('click',()=>{
    const want=b.dataset.v==='yes';
    try{ if(want&&!document.fullscreenElement){document.documentElement.requestFullscreen&&document.documentElement.requestFullscreen();}
         else if(!want&&document.fullscreenElement){document.exitFullscreen&&document.exitFullscreen();} }catch(e){}
    document.querySelectorAll('#tgFull button').forEach(x=>x.classList.remove('on'));b.classList.add('on');
  }));
  document.addEventListener('fullscreenchange',()=>{document.querySelectorAll('#tgFull button').forEach(x=>x.classList.toggle('on',(x.dataset.v==='yes')===!!document.fullscreenElement));});

  /* ===== dress panels as illuminated manuscript pages ===== */
  const EMBLEM_SVG='<svg viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg"><circle cx="28" cy="28" r="28" fill="#1d1822"/><circle cx="28" cy="28" r="19" fill="none" stroke="#efece2" stroke-opacity=".3" stroke-width="1"/><ellipse cx="28" cy="28" rx="19" ry="7" fill="none" stroke="#efece2" stroke-opacity=".22" stroke-width="1"/><path d="M32 16 a12 12 0 1 0 0 24 a9.2 9.2 0 1 1 0 -24 z" fill="#efece2" fill-opacity=".92"/><circle cx="41" cy="18" r="1.9" fill="#efece2"/><circle cx="14" cy="34" r="1.2" fill="#efece2" fill-opacity=".8"/></svg>';
  const DIVIDER_SVG='<svg viewBox="0 0 210 16" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor" stroke-width="1" fill="none" opacity=".85"><line x1="10" y1="8" x2="86" y2="8"/><line x1="124" y1="8" x2="200" y2="8"/><circle cx="105" cy="8" r="5.2"/></g><g fill="currentColor"><circle cx="105" cy="8" r="1.7"/><circle cx="90" cy="8" r="1.2"/><circle cx="120" cy="8" r="1.2"/><circle cx="9" cy="8" r="1"/><circle cx="201" cy="8" r="1"/></g></svg>';
  const PCORNER_SVG='<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1"><path d="M6 22 L6 6 L22 6" stroke-opacity=".6"/><path d="M11 24 L11 11 L24 11" stroke-opacity=".32"/><circle cx="6" cy="6" r="2" fill="currentColor" stroke="none"/><path d="M6 30 L6 27" stroke-opacity=".5"/><path d="M30 6 L27 6" stroke-opacity=".5"/><circle cx="20" cy="20" r="1.3" fill="currentColor" stroke="none" opacity=".7"/></svg>';
  const PANEL_EYEBROWS={about:'THE STUDIO · 01',work:'SELECTED WORK · 02',skills:'WHAT WE MAKE · 03',contact:'OPEN CHANNEL · 04'};
  Object.keys(panels).forEach(key=>{
    const el=document.getElementById(panels[key]);if(!el)return;
    const tag=el.querySelector('.tag');if(tag&&PANEL_EYEBROWS[key])tag.textContent=PANEL_EYEBROWS[key];
    ['pc-tl','pc-tr','pc-bl','pc-br'].forEach(c=>{const d=document.createElement('div');d.className='p-corner '+c;d.innerHTML=PCORNER_SVG;el.appendChild(d);});
    const emb=document.createElement('div');emb.className='lore-emblem';emb.innerHTML=EMBLEM_SVG;if(tag)el.insertBefore(emb,tag);
    let dv=null;const h2=el.querySelector('h2');if(h2){dv=document.createElement('div');dv.className='lore-div';dv.innerHTML=DIVIDER_SVG;h2.insertAdjacentElement('afterend',dv);}
    const firstBody=dv?dv.nextElementSibling:el.querySelector('p');
    if(firstBody&&firstBody.tagName==='P')firstBody.classList.add('dropcap');   // drop-cap only the lead paragraph
  });

  /* ===== glowing waypoint nodes over the world ===== */
  const nodesWrap=document.createElement('div');nodesWrap.className='nodes';document.body.appendChild(nodesWrap);
  const buildNodes={};
  Object.keys(BUILDS).forEach(k=>{const n=document.createElement('div');n.className='node';n.innerHTML='<div class="ring"></div><div class="lbl">'+BUILDS[k].name+'</div>';
    n.addEventListener('click',()=>{autoTarget=BUILDS[k].pos;manualClose=null;hideHint();});nodesWrap.appendChild(n);buildNodes[k]=n;});
  const anomNodes=SURPRISES.map(s=>{const n=document.createElement('div');n.className='node q';n.innerHTML='<div class="ring"></div>';
    n.addEventListener('click',()=>{autoTarget=s.pos;manualClose=null;hideHint();});nodesWrap.appendChild(n);return n;});
  function onscreen(p){return p.x>=-20&&p.x<=innerWidth+20&&p.y>=-20&&p.y<=innerHeight+20;}
  function updateNodes(){
    for(const k in buildNodes){const b=BUILDS[k],n=buildNodes[k];const sp=project(b.pos.x,b.pos.y+13,b.pos.z);const dist=Math.hypot(b.pos.x-st.x,b.pos.z-st.z);
      const sc=Math.max(.62,Math.min(1.25,70/Math.max(26,dist)+0.45));
      n.style.left=sp.x+'px';n.style.top=sp.y+'px';n.style.transform='translate(-50%,-50%) scale('+sc+')';
      n.classList.toggle('near',dist<70);n.style.opacity=(!onscreen(sp)||dist<TRIGGER)?0:1;}
    for(let i=0;i<SURPRISES.length;i++){const s=SURPRISES[i],n=anomNodes[i];const dist=Math.hypot(s.pos.x-st.x,s.pos.z-st.z);
      if(s.found||dist>95){n.style.opacity=0;continue;}
      const sp=project(s.pos.x,s.pos.y+6,s.pos.z);n.style.left=sp.x+'px';n.style.top=sp.y+'px';n.style.transform='translate(-50%,-50%)';
      n.style.opacity=onscreen(sp)?Math.max(0,Math.min(.85,(95-dist)/60)):0;}
    if(shipNode){const sp=project(SHIP_POS.x,SHIP_POS.y+10,SHIP_POS.z);const dist=Math.hypot(SHIP_POS.x-st.x,SHIP_POS.z-st.z);
      shipNode.style.left=sp.x+'px';shipNode.style.top=sp.y+'px';shipNode.style.transform='translate(-50%,-50%)';
      shipNode.classList.toggle('near',dist<90);shipNode.style.opacity=onscreen(sp)?1:0;}
  }

  /* ===== ENDGAME: ship, takeoff cinematic, space flight ===== */
  let mode='drive';                       // 'drive' | 'takeoff' | 'space'
  const SHIP_NOSE=Math.PI/2;              // rotate model so its nose points +z (tune if needed)
  let shipModel=null, shipSpawned=false, landedShip=null, shipNode=null;
  const SHIP_POS=new T.Vector3(26,0,46); SHIP_POS.y=terrainHeight(SHIP_POS.x,SHIP_POS.z);
  const flashEl=document.createElement('div');flashEl.className='flash';document.body.appendChild(flashEl);
  const spaceHud=document.createElement('div');spaceHud.className='space-hud';
  spaceHud.innerHTML='<div class="sh-title">GALAXY · FREE FLIGHT</div><div class="sh-hint">WASD / ARROWS to fly · drift through the system</div><button class="pill" id="returnMoon">RETURN TO MOON</button>';
  document.body.appendChild(spaceHud);
  spaceHud.querySelector('#returnMoon').addEventListener('click',()=>location.reload());
  // space score + on-screen controls
  const spScore=document.createElement('div');spScore.className='sp-score';spScore.innerHTML='<div class="k">SCORE</div><div class="v"><span id="spScore">0</span></div>';document.body.appendChild(spScore);
  const spCtrl=document.createElement('div');spCtrl.className='sp-ctrl';
  spCtrl.innerHTML='<div class="legend"><b>WASD / ARROWS</b> &nbsp;steer<br/><b>Q&nbsp;/&nbsp;E</b> &nbsp;roll&nbsp;&nbsp;·&nbsp;&nbsp;<b>SHIFT</b> &nbsp;boost&nbsp;&nbsp;·&nbsp;&nbsp;<b>SPACE</b> &nbsp;fire</div><div class="btns"><button data-k="rollL">⟲ ROLL</button><button data-k="rollR">ROLL ⟳</button><button data-k="boost">» BOOST</button><button data-k="fire">✦ FIRE</button></div>';
  document.body.appendChild(spCtrl);
  spCtrl.querySelectorAll('button').forEach(b=>{const k=b.dataset.k;const on=e=>{e.preventDefault();keys[k]=true;};const off=e=>{e.preventDefault();keys[k]=false;};
    b.addEventListener('mousedown',on);b.addEventListener('mouseup',off);b.addEventListener('mouseleave',off);b.addEventListener('touchstart',on,{passive:false});b.addEventListener('touchend',off);});
  // roll / boost / fire keys
  const kmap2={q:'rollL',e:'rollR',Q:'rollL',E:'rollR',Shift:'boost',' ':'fire'};
  __on('keydown',e=>{const m=kmap2[e.key];if(m){keys[m]=true;if(e.key===' ')e.preventDefault();}});
  __on('keyup',e=>{const m=kmap2[e.key];if(m)keys[m]=false;});

  function b64buf(d){return d;}
  function loadShip(cb){const data=window.SHIP_GLB;if(!data||false||!T.GLTFLoader){cb(null);return;}
    try{new T.GLTFLoader().parse(b64buf(data),'',g=>{shipModel=g.scene;cb(shipModel);},e=>{console.warn('ship',e);cb(null);});}catch(e){cb(null);}}
  // procedural smooth value-noise texture for the flame shader
  let _flameNoise=null;
  function flameNoiseTex(){
    if(_flameNoise)return _flameNoise;
    const N=128,c=document.createElement('canvas');c.width=c.height=N;const ctx=c.getContext('2d');
    const img=ctx.createImageData(N,N),G=16,grid=[];for(let i=0;i<(G+1)*(G+1);i++)grid.push(Math.random());
    const sm=t=>t*t*(3-2*t);
    for(let y=0;y<N;y++)for(let x=0;x<N;x++){
      let v=0,amp=0.6,f=1;
      for(let o=0;o<3;o++){const gs=G*f;const gx=(x/N*gs)%G,gy=(y/N*gs)%G;const x0=Math.floor(gx),y0=Math.floor(gy);
        const tx=sm(gx-x0),ty=sm(gy-y0);const a=grid[(y0%G)*(G+1)+(x0%G)],b=grid[(y0%G)*(G+1)+((x0+1)%G)],cc=grid[((y0+1)%G)*(G+1)+(x0%G)],d=grid[((y0+1)%G)*(G+1)+((x0+1)%G)];
        v+=amp*((a*(1-tx)+b*tx)*(1-ty)+(cc*(1-tx)+d*tx)*ty);amp*=0.5;f*=2;}
      const p=(y*N+x)*4,val=Math.max(0,Math.min(255,v*255));img.data[p]=img.data[p+1]=img.data[p+2]=val;img.data[p+3]=255;}
    ctx.putImageData(img,0,0);_flameNoise=new T.CanvasTexture(c);_flameNoise.wrapS=_flameNoise.wrapT=T.RepeatWrapping;return _flameNoise;
  }
  // flame shader ported from the provided Godot spatial shader (noise erosion + fresnel + length fade)
  function makeExhaust(scale){
    const grp=new T.Group();
    const mat=new T.ShaderMaterial({transparent:true,depthWrite:false,blending:T.AdditiveBlending,side:T.DoubleSide,
      uniforms:{uTime:{value:0},uInt:{value:0},noiseTex:{value:flameNoiseTex()},
        coreColor:{value:new T.Color(1.0,0.8,0.2)},edgeColor:{value:new T.Color(1.0,0.12,0.08)},
        uvPan:{value:new T.Vector2(0.0,-1.4)},uvScale:{value:new T.Vector2(1.0,1.4)},
        noiseDensity:{value:0.5},cutSharpness:{value:0.16},noiseIntensity:{value:1.0},
        lengthFadePow:{value:2.0},edgeFadePow:{value:1.5},topDown:{value:0.3},emission:{value:2.4}},
      vertexShader:'varying vec2 vUv;varying vec3 vN;varying vec3 vV;void main(){vUv=uv;vec4 mv=modelViewMatrix*vec4(position,1.0);vV=normalize(-mv.xyz);vN=normalize(normalMatrix*normal);gl_Position=projectionMatrix*mv;}',
      fragmentShader:[
        'varying vec2 vUv;varying vec3 vN;varying vec3 vV;',
        'uniform float uTime,uInt,noiseDensity,cutSharpness,noiseIntensity,lengthFadePow,edgeFadePow,topDown,emission;',
        'uniform vec3 coreColor,edgeColor;uniform vec2 uvPan,uvScale;uniform sampler2D noiseTex;',
        'void main(){',
        ' vec2 uv=vUv*uvScale + uvPan*uTime;',
        ' float n=texture2D(noiseTex,uv).r; n=pow(n,2.2);',
        ' float thr=1.0-noiseDensity;',
        ' float cut=smoothstep(thr,thr+cutSharpness,n);',
        ' float fres=max(abs(dot(vN,vV)),topDown);',
        ' float edge=pow(fres,edgeFadePow);',
        ' float vfade=pow(clamp(1.0-vUv.y,0.0,1.0),lengthFadePow);',
        ' float cmix=smoothstep(0.1,0.7,n);',
        ' vec3 col=mix(edgeColor,coreColor,cmix);',
        ' float a=cut*vfade*edge;',
        ' gl_FragColor=vec4(col*a*noiseIntensity*emission*uInt, clamp(a*uInt,0.0,1.0));',
        '}'].join('')});
    const len=scale*1.5;
    const cone=new T.Mesh(new T.ConeGeometry(scale*0.22,len,20,1,true),mat);
    cone.rotation.x=-Math.PI/2;cone.position.z=-scale*0.5-len*0.5;   // plume behind engine, pointing -z
    grp.add(cone);
    const SN=48,sg=new T.BufferGeometry(),sp=new Float32Array(SN*3),sv=[];
    for(let i=0;i<SN;i++){sv.push(-(0.5+Math.random()*1.1));}
    sg.setAttribute('position',new T.BufferAttribute(sp,3));
    const sparks=new T.Points(sg,new T.PointsMaterial({color:0xffb060,size:scale*0.09,transparent:true,opacity:.7,blending:T.AdditiveBlending,depthWrite:false}));
    grp.add(sparks);grp.userData={mat,sparks,sp,sv,SN,scale};return grp;
  }
  function makeShip(scale){
    const wrap=new T.Group();
    if(shipModel){const m=shipModel.clone(true);m.rotation.set(0,SHIP_NOSE,0);m.updateWorldMatrix(true,true);
      const box=new T.Box3().setFromObject(m),sz=box.getSize(new T.Vector3());m.scale.setScalar((scale||8)/Math.max(0.001,Math.max(sz.x,sz.z)));
      m.traverse(o=>{if(o.isMesh){o.castShadow=true;o.frustumCulled=false;}});wrap.add(m);
    } else {const b=new T.Mesh(new T.ConeGeometry(scale*0.22,scale,14),new T.MeshStandardMaterial({color:0xcfd4dd,metalness:.7,roughness:.3}));b.rotation.x=Math.PI/2;wrap.add(b);}
    const ex=makeExhaust(scale);wrap.add(ex);wrap.userData.exhaust=ex;
    return wrap;
  }
  function updateExhaust(wrap,intensity,dt){
    const ex=wrap&&wrap.userData&&wrap.userData.exhaust;if(!ex)return;const u=ex.userData;
    u.mat.uniforms.uTime.value+=dt;u.mat.uniforms.uInt.value+=(intensity-u.mat.uniforms.uInt.value)*0.2;
    const sc=0.6+intensity*0.8;ex.scale.set(sc,sc,Math.max(0.001,0.5+intensity));
    for(let i=0;i<u.SN;i++){u.sp[i*3+2]+=u.sv[i]*(0.5+intensity);if(u.sp[i*3+2]<-u.scale*2.6||Math.random()<0.04){u.sp[i*3]=(Math.random()-0.5)*u.scale*0.45;u.sp[i*3+1]=(Math.random()-0.5)*u.scale*0.45;u.sp[i*3+2]=-u.scale*0.5;}}
    u.sparks.geometry.attributes.position.needsUpdate=true;u.sparks.material.opacity=0.2+intensity*0.7;
    ex.visible=intensity>0.02;
  }
  function spawnShip(){if(shipSpawned)return;shipSpawned=true;
    const place=()=>{
      landedShip=makeShip(9);
      const box=new T.Box3().setFromObject(landedShip);
      landedShip.position.set(SHIP_POS.x,SHIP_POS.y-box.min.y+0.1,SHIP_POS.z);
      // Brighten ship materials so the hull is readable under cool moon light
      landedShip.traverse(o=>{if(o.isMesh&&o.material){const mats=Array.isArray(o.material)?o.material:[o.material];
        mats.forEach(m=>{if(!m||!('emissive' in m))return;
          try{m.emissive=new T.Color(0x6a4a1f);m.emissiveIntensity=0.35;
            if('metalness' in m)m.metalness=Math.max(0.55,m.metalness||0);
            if('roughness' in m)m.roughness=Math.min(0.55,m.roughness??0.6);
            m.needsUpdate=true;}catch(e){}});}});
      scene.add(landedShip);
      // Outer + inner beam for a denser tractor look
      const beam=new T.Mesh(new T.CylinderGeometry(3,5,44,20,1,true),new T.MeshBasicMaterial({color:0x9fd4ff,transparent:true,opacity:.28,side:T.DoubleSide,blending:T.AdditiveBlending,depthWrite:false}));
      beam.position.set(SHIP_POS.x,SHIP_POS.y+22,SHIP_POS.z);scene.add(beam);landedShip.userData.beam=beam;
      const beamCore=new T.Mesh(new T.CylinderGeometry(1.2,2.8,44,16,1,true),new T.MeshBasicMaterial({color:0xffe4b8,transparent:true,opacity:.42,side:T.DoubleSide,blending:T.AdditiveBlending,depthWrite:false}));
      beamCore.position.copy(beam.position);scene.add(beamCore);landedShip.userData.beamCore=beamCore;
      // Ground halo ring
      const halo=new T.Mesh(new T.RingGeometry(4,9,40),new T.MeshBasicMaterial({color:0xffd9a0,transparent:true,opacity:.55,side:T.DoubleSide,blending:T.AdditiveBlending,depthWrite:false}));
      halo.rotation.x=-Math.PI/2;halo.position.set(SHIP_POS.x,SHIP_POS.y+0.05,SHIP_POS.z);scene.add(halo);landedShip.userData.halo=halo;
      // Warm key spotlight from above-front + brighter cool fill
      const key=new T.SpotLight(0xffd9a0,6,60,Math.PI/5,0.45,1.4);
      key.position.set(SHIP_POS.x+10,SHIP_POS.y+22,SHIP_POS.z+10);key.target.position.set(SHIP_POS.x,SHIP_POS.y+3,SHIP_POS.z);
      scene.add(key);scene.add(key.target);
      const pl=new T.PointLight(0x9fd4ff,3.4,90);pl.position.set(SHIP_POS.x,SHIP_POS.y+9,SHIP_POS.z);scene.add(pl);
      shipNode=document.createElement('div');shipNode.className='node ship';shipNode.innerHTML='<div class="ring"></div><div class="lbl">THE SHIP</div>';
      shipNode.addEventListener('click',()=>{autoTarget=SHIP_POS;manualClose=null;hideHint();});nodesWrap.appendChild(shipNode);
      showToast('✦ A SHIP HAS LANDED — FIND IT');
    };
    if(shipModel)place(); else loadShip(()=>place());
  }
  function checkAllCollected(){if(!shipSpawned&&discovered>=SURPRISES.length)spawnShip();}

  // dev cheat: type "warp" to collect all artifacts
  let cheatBuf='';
  __on('keydown',e=>{if(e.key&&e.key.length===1){cheatBuf=(cheatBuf+e.key.toLowerCase()).slice(-8);
    if(cheatBuf.endsWith('warp')){SURPRISES.forEach(s=>{s.found=true;s.armed=false;});discovered=SURPRISES.length;updateSecrets();showToast('✦ DEV CHEAT — ALL ARTIFACTS COLLECTED');checkAllCollected();cheatBuf='';}}});

  // takeoff cinematic
  let tkT=0;
  function startTakeoff(){if(mode!=='drive')return;mode='takeoff';tkT=0;hideHint();if(engine&&engineReady)engine.volume=0;}
  function takeoffTick(){
    tkT+=0.016;const t=tkT;
    if(t<1.7){const k=Math.max(0.0001,1-t/1.7);buggy.scale.setScalar(0.92*k);buggy.position.y=st.y+(1-k)*4;}
    else buggy.visible=false;
    if(landedShip){
      const ign=Math.max(0,t-0.9);updateExhaust(landedShip,Math.min(1.7,ign*1.5),0.016);   // engine ignites
      if(t>1.1){const lt=t-1.1;
        landedShip.position.y+=0.3+lt*1.2; landedShip.position.x+=lt*0.5; landedShip.position.z-=lt*0.7;   // diagonal climb
        landedShip.rotation.x=-Math.min(1.25,0.2+lt*0.5); landedShip.rotation.z=Math.sin(lt*2.2)*0.05;     // nose pitches UP toward the sky
        if(landedShip.userData.beam)landedShip.userData.beam.material.opacity=Math.max(0,0.16-lt*0.05);}
      const sp=landedShip.position;camDesired.set(sp.x+ISO.x*0.65,sp.y+ISO.y*0.6+t*5,sp.z+ISO.z*0.65);camera.position.lerp(camDesired,0.05);camera.lookAt(sp.x,sp.y,sp.z);
    }
    if(t>3.0)flashEl.style.opacity=Math.min(1,(t-3.0));
    renderer.render(scene,camera);
    if(t>4.0)enterSpace();
  }

  // space flight + arcade
  let spaceScene=null,spaceCam=null,sShip=null,sState=null,sStars=null,galaxy=null,nebMat=null;
  let targets=[],bullets=[],fireCool=0;
  function makeGalaxy(){
    // spiral galaxy particle generator — technique popularised by Bruno Simon (three.js journey); inspired by techinz/galaxy-portfolio
    const COUNT=22000,ARMS=4,RADIUS=1700,SPIN=6.0,RAND=0.42,RANDPOW=2.6;
    const g=new T.BufferGeometry(),pos=new Float32Array(COUNT*3),col=new Float32Array(COUNT*3);
    const cIn=new T.Color(0xffd9a0),cOut=new T.Color(0x4264c8);
    for(let i=0;i<COUNT;i++){
      const r=Math.pow(Math.random(),1.6)*RADIUS, arm=(i%ARMS)/ARMS*Math.PI*2, ang=arm+r/RADIUS*SPIN;
      const rx=Math.pow(Math.random(),RANDPOW)*(Math.random()<0.5?1:-1)*RAND*r;
      const ry=Math.pow(Math.random(),RANDPOW)*(Math.random()<0.5?1:-1)*RAND*r*0.22;
      const rz=Math.pow(Math.random(),RANDPOW)*(Math.random()<0.5?1:-1)*RAND*r;
      pos[i*3]=Math.cos(ang)*r+rx;pos[i*3+1]=ry;pos[i*3+2]=Math.sin(ang)*r+rz;
      const c=cIn.clone().lerp(cOut,Math.min(1,r/RADIUS));col[i*3]=c.r;col[i*3+1]=c.g;col[i*3+2]=c.b;
    }
    g.setAttribute('position',new T.BufferAttribute(pos,3));g.setAttribute('color',new T.BufferAttribute(col,3));
    const pts=new T.Points(g,new T.PointsMaterial({size:5,sizeAttenuation:true,vertexColors:true,transparent:true,opacity:.92,depthWrite:false,blending:T.AdditiveBlending}));
    const core=new T.Mesh(new T.SphereGeometry(70,24,24),new T.MeshBasicMaterial({color:0xfff1c4,transparent:true,opacity:.85,blending:T.AdditiveBlending,depthWrite:false}));
    const grp=new T.Group();grp.add(pts,core);grp.rotation.x=Math.PI*0.42;grp.position.set(-200,-300,-1500);return grp;
  }
  // canvas-generated radial glow sprite (cached) for richer additive halos at zero network cost
  let _glowTex=null;
  function glowTex(){if(_glowTex)return _glowTex;const N=128,c=document.createElement('canvas');c.width=c.height=N;const g=c.getContext('2d');
    const grd=g.createRadialGradient(N/2,N/2,2,N/2,N/2,N/2);grd.addColorStop(0,'rgba(255,255,255,1)');grd.addColorStop(0.35,'rgba(255,255,255,0.45)');grd.addColorStop(1,'rgba(255,255,255,0)');
    g.fillStyle=grd;g.fillRect(0,0,N,N);_glowTex=new T.CanvasTexture(c);return _glowTex;}
  function spawnTarget(near){
    const palette=[0x6cf2ff,0xffd36c,0x7dffb0,0xff7de0,0xb78cff];
    const c=palette[Math.floor(Math.random()*palette.length)];
    const grp=new T.Group();
    // Core shell — flatShading reads as faceted tech crate without extra geometry
    const core=new T.Mesh(new T.BoxGeometry(16,16,16),new T.MeshStandardMaterial({color:c,emissive:c,emissiveIntensity:.45,metalness:.55,roughness:.35,flatShading:true}));
    grp.add(core);
    // Inner inverted box gives a recessed-depth illusion
    const inner=new T.Mesh(new T.BoxGeometry(11,11,11),new T.MeshStandardMaterial({color:0x111522,emissive:c,emissiveIntensity:.55,metalness:.2,roughness:.7,side:T.BackSide}));
    grp.add(inner);
    // Six face-greebles (procedural, no assets)
    const greMat=new T.MeshStandardMaterial({color:0xe8eef7,emissive:c,emissiveIntensity:.4,metalness:.7,roughness:.3,flatShading:true});
    const faces=[[0,0,8.2],[0,0,-8.2],[8.2,0,0],[-8.2,0,0],[0,8.2,0],[0,-8.2,0]];
    faces.forEach(([fx,fy,fz])=>{const gz=new T.Mesh(new T.BoxGeometry(3.2,3.2,1.4),greMat);gz.position.set(fx,fy,fz);gz.lookAt(fx*2,fy*2,fz*2);grp.add(gz);
      const rim=new T.Mesh(new T.BoxGeometry(5.4,5.4,0.4),new T.MeshBasicMaterial({color:c,transparent:true,opacity:.7}));rim.position.set(fx*0.96,fy*0.96,fz*0.96);rim.lookAt(fx*2,fy*2,fz*2);grp.add(rim);});
    // Crisp white edge wireframe
    grp.add(new T.LineSegments(new T.EdgesGeometry(core.geometry),new T.LineBasicMaterial({color:0xffffff,transparent:true,opacity:.65})));
    // Additive halo sprite
    const halo=new T.Sprite(new T.SpriteMaterial({map:glowTex(),color:c,transparent:true,opacity:.85,blending:T.AdditiveBlending,depthWrite:false}));
    halo.scale.set(46,46,1);grp.add(halo);
    let px,py,pz;
    if(near&&sState){const y=sState.yaw,pi=sState.pitch,fx=Math.sin(y)*Math.cos(pi),fy=Math.sin(pi),fz=Math.cos(y)*Math.cos(pi),d=320+Math.random()*520;
      px=sState.x+fx*d+(Math.random()-0.5)*320;py=sState.y+fy*d+(Math.random()-0.5)*220;pz=sState.z+fz*d+(Math.random()-0.5)*320;}
    else{px=(Math.random()-0.5)*1700;py=(Math.random()-0.5)*760;pz=(Math.random()-0.5)*1700;}
    grp.position.set(px,py,pz);grp.userData={spin:(Math.random()-0.5)*0.05,alive:true,color:c,core,halo,pulse:Math.random()*6.28};
    // Keep .material.color for the explosion call site
    grp.material=core.material;
    spaceScene.add(grp);return grp;
  }
  function buildSpace(){
    if(spaceScene)return;
    spaceScene=new T.Scene();spaceScene.background=new T.Color(0x02030a);spaceScene.fog=new T.FogExp2(0x05060f,0.00011);
    spaceCam=new T.PerspectiveCamera(64,innerWidth/innerHeight,0.1,14000);
    spaceScene.add(new T.AmbientLight(0x60709a,0.9));
    const sun=new T.PointLight(0xfff0d0,3.2,12000);sun.position.set(700,300,-500);spaceScene.add(sun);
    const rim=new T.PointLight(0x6cf2ff,1.6,9000);rim.position.set(-800,-200,600);spaceScene.add(rim);
    // Drifting parallax dust layer for depth — additive points, very cheap
    {const DN=1500,dg=new T.BufferGeometry(),dp=new Float32Array(DN*3);
      for(let i=0;i<DN;i++){dp[i*3]=(Math.random()-0.5)*4200;dp[i*3+1]=(Math.random()-0.5)*2400;dp[i*3+2]=(Math.random()-0.5)*4200;}
      dg.setAttribute('position',new T.BufferAttribute(dp,3));
      const dust=new T.Points(dg,new T.PointsMaterial({color:0xb0c8ff,size:2.5,sizeAttenuation:true,transparent:true,opacity:.55,blending:T.AdditiveBlending,depthWrite:false}));
      dust.name='dust';spaceScene.add(dust);}
    // procedural nebula skydome (fbm shader) for a richer deep-space backdrop
    nebMat=new T.ShaderMaterial({side:T.BackSide,depthWrite:false,uniforms:{uTime:{value:0}},
      vertexShader:'varying vec3 vDir;void main(){vDir=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
      fragmentShader:[
       'varying vec3 vDir;uniform float uTime;',
       'float hash(vec3 p){p=fract(p*0.3183099+0.1);p*=17.0;return fract(p.x*p.y*p.z*(p.x+p.y+p.z));}',
       'float noise(vec3 x){vec3 i=floor(x),f=fract(x);f=f*f*(3.0-2.0*f);',
       ' return mix(mix(mix(hash(i+vec3(0,0,0)),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),',
       '            mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);}',
       'float fbm(vec3 p){float v=0.0,a=0.5;for(int i=0;i<5;i++){v+=a*noise(p);p*=2.02;a*=0.5;}return v;}',
       'void main(){vec3 d=normalize(vDir);',
       ' float n=fbm(d*3.0+vec3(uTime*0.016));float n2=fbm(d*6.5-vec3(uTime*0.013));',
       ' float n3=fbm(d*1.6+vec3(uTime*0.005,0.0,-uTime*0.004));',
       ' vec3 base=vec3(0.012,0.016,0.06);',
       ' vec3 neb=mix(vec3(0.29,0.08,0.44),vec3(0.06,0.18,0.54),n2);',
       ' neb=mix(neb,vec3(0.62,0.18,0.36),smoothstep(0.55,0.92,n));',
       ' neb=mix(neb,vec3(0.10,0.55,0.62),smoothstep(0.55,0.95,n3)*0.55);',
       ' float cloud=smoothstep(0.40,0.88,n);',
       ' vec3 col=base+neb*cloud*1.1;',
       ' float st=hash(floor(d*420.0));if(st>0.9965)col+=vec3(1.0)*(st-0.9965)/0.0035;',
       ' gl_FragColor=vec4(col,1.0);}'].join('')});
    const dome=new T.Mesh(new T.SphereGeometry(9000,40,40),nebMat);dome.renderOrder=-1;dome.frustumCulled=false;spaceScene.add(dome);
    galaxy=makeGalaxy();spaceScene.add(galaxy);
    const N=3600,gg=new T.BufferGeometry(),p=new Float32Array(N*3);
    for(let i=0;i<N;i++){const r=2600+Math.random()*5200,th=Math.random()*6.283,ph=Math.acos(2*Math.random()-1);p[i*3]=r*Math.sin(ph)*Math.cos(th);p[i*3+1]=r*Math.cos(ph);p[i*3+2]=r*Math.sin(ph)*Math.sin(th);}
    gg.setAttribute('position',new T.BufferAttribute(p,3));sStars=new T.Points(gg,new T.PointsMaterial({color:0xffffff,size:2,sizeAttenuation:false}));spaceScene.add(sStars);
    const pal=[0x6b8cff,0xff7d5e,0x7dffb0,0xd0a0ff,0xffd36c];
    for(let i=0;i<6;i++){const r=40+Math.random()*92,c=pal[i%pal.length];const pm=new T.Mesh(new T.SphereGeometry(r,28,22),new T.MeshStandardMaterial({color:c,roughness:.85,metalness:.1,emissive:c,emissiveIntensity:.06}));pm.position.set((Math.random()-0.5)*2400,(Math.random()-0.5)*1000,(Math.random()-0.5)*2400);spaceScene.add(pm);}
    sShip=makeShip(12);spaceScene.add(sShip);
    sState={x:0,y:0,z:0,yaw:0,pitch:0,bank:0,score:0};
    targets=[];for(let i=0;i<16;i++)targets.push(spawnTarget(false));bullets=[];
    spaceCam.position.set(0,10,42);
  }
  function fireBullet(){
    const y=sState.yaw,pi=sState.pitch,fx=Math.sin(y)*Math.cos(pi),fy=Math.sin(pi),fz=Math.cos(y)*Math.cos(pi);
    const b=new T.Mesh(new T.SphereGeometry(2.2,8,8),new T.MeshBasicMaterial({color:0x9fffe0}));
    b.position.set(sState.x+fx*16,sState.y+fy*16,sState.z+fz*16);b.add(new T.PointLight(0x9fffe0,1.1,70));
    b.userData={vx:fx*44,vy:fy*44,vz:fz*44,life:90};spaceScene.add(b);bullets.push(b);
  }
  function explodeAt(pos,color){
    const N=22,g=new T.BufferGeometry(),p=new Float32Array(N*3),v=[];
    for(let i=0;i<N;i++){p[i*3]=pos.x;p[i*3+1]=pos.y;p[i*3+2]=pos.z;v.push(new T.Vector3(Math.random()-0.5,Math.random()-0.5,Math.random()-0.5).multiplyScalar(7));}
    g.setAttribute('position',new T.BufferAttribute(p,3));
    const m=new T.PointsMaterial({color:color||0xffffff,size:6,transparent:true,opacity:1,blending:T.AdditiveBlending,depthWrite:false});
    const pts=new T.Points(g,m);spaceScene.add(pts);let life=0;
    (function tk(){life++;for(let i=0;i<N;i++){p[i*3]+=v[i].x;p[i*3+1]+=v[i].y;p[i*3+2]+=v[i].z;}g.attributes.position.needsUpdate=true;m.opacity=Math.max(0,1-life/26);
      if(life<26&&mode==='space'&&!__disposed)requestAnimationFrame(tk);else spaceScene.remove(pts);})();
  }
  function updateSpaceHud(){const e=document.getElementById('spScore');if(e)e.textContent=sState?sState.score:0;}
  function enterSpace(){mode='space';buildSpace();document.body.classList.add('space-mode');setTimeout(()=>{flashEl.style.opacity=0;},90);showToast('✦ ENTERING ORBIT — SHOOT THE CUBES');updateSpaceHud();}
  const _v=new T.Vector3();
  function spaceTick(){
    const s=sState,TURN2=0.022,PR=0.017;
    if(keys.left)s.yaw+=TURN2; if(keys.right)s.yaw-=TURN2;
    if(keys.up)s.pitch+=PR; if(keys.down)s.pitch-=PR; s.pitch=Math.max(-1.3,Math.min(1.3,s.pitch));
    const rollIn=(keys.rollL?1:0)-(keys.rollR?1:0);
    s.bank+=((rollIn*0.7+((keys.left?1:0)-(keys.right?1:0))*0.32)-s.bank)*0.1;
    const boosting=!!keys.boost, base=2.4+Math.min(3.2,s.score*0.02), THR=base*(boosting?2.1:1.0);
    const dx=Math.sin(s.yaw)*Math.cos(s.pitch),dy=Math.sin(s.pitch),dz=Math.cos(s.yaw)*Math.cos(s.pitch);
    s.x+=dx*THR; s.y+=dy*THR; s.z+=dz*THR;
    sShip.position.set(s.x,s.y,s.z);sShip.rotation.set(0,0,0);sShip.rotateY(s.yaw);sShip.rotateX(-s.pitch);sShip.rotateZ(s.bank);
    updateExhaust(sShip,boosting?1.0:0.42,0.016);   // subtle in flight, brighter on boost
    fireCool--; if(keys.fire&&fireCool<=0){fireBullet();fireCool=7;}
    for(let i=bullets.length-1;i>=0;i--){const b=bullets[i];b.position.x+=b.userData.vx;b.position.y+=b.userData.vy;b.position.z+=b.userData.vz;b.userData.life--;let hit=false;
      for(let j=0;j<targets.length;j++){const tg=targets[j];if(!tg.userData.alive)continue;if(b.position.distanceTo(tg.position)<14){hit=true;tg.userData.alive=false;explodeAt(tg.position,tg.material.color.getHex());s.score+=10;updateSpaceHud();spaceScene.remove(tg);targets[j]=spawnTarget(true);break;}}
      if(hit||b.userData.life<=0){spaceScene.remove(b);bullets.splice(i,1);}}
    for(let j=0;j<targets.length;j++){const tg=targets[j];tg.rotation.x+=tg.userData.spin;tg.rotation.y+=tg.userData.spin*0.7;if(tg.position.distanceTo(sShip.position)>2800){spaceScene.remove(tg);targets[j]=spawnTarget(true);}}
    if(galaxy)galaxy.rotation.z+=0.0004;
    if(nebMat)nebMat.uniforms.uTime.value+=0.016;
    _v.set(s.x-dx*40,s.y-dy*40+13,s.z-dz*40);spaceCam.position.lerp(_v,0.08);spaceCam.lookAt(s.x+dx*14,s.y+dy*14,s.z+dz*14);
    sStars.position.copy(spaceCam.position);
    renderer.render(spaceScene,spaceCam);
  }

  /* ===== WANDERING ALIEN (idle / walk / run / wave) ===== */
  let alien=null,alienMixer=null;const alienActs={};
  let alienState='idle',alienTimer=2,alienWaveCool=0,alienRunDir=0,alienTarget=null;
  const ALIEN_TARGET_H=2.1, ALIEN_FACE=0, ALIEN_ROT_X=0, ALIEN_LIFT=1.4, ALIEN_CHAT_RANGE=16;   // height / facing / up-tilt / ground lift / chat range
  const ALIEN_POS=new T.Vector3(-34,0,24);
  function meshBox(obj){                                    // bbox of meshes only (ignores stray skeleton bones)
    const bb=new T.Box3();let any=false;
    obj.updateWorldMatrix(true,true);
    obj.traverse(o=>{if(o.isMesh&&o.geometry){o.geometry.computeBoundingBox();const b=o.geometry.boundingBox.clone().applyMatrix4(o.matrixWorld);bb.union(b);any=true;}});
    return any?bb:new T.Box3().setFromObject(obj);
  }
  function loadAlien(){
    const A=window.ALIEN;if(!A||!T.GLTFLoader)return;const L=new T.GLTFLoader();
    L.parse(b64buf(A.idle),'',g=>{
      const inner=g.scene;
      inner.rotation.x=ALIEN_ROT_X;
      let box=meshBox(inner),sz=box.getSize(new T.Vector3());
      inner.scale.setScalar(ALIEN_TARGET_H/Math.max(0.001,sz.y));
      box=meshBox(inner);const c=box.getCenter(new T.Vector3());
      inner.position.x-=c.x; inner.position.z-=c.z; inner.position.y-=box.min.y;   // centre + drop feet to ground
      inner.traverse(o=>{if(o.isMesh){o.castShadow=true;o.frustumCulled=false;}});
      alien=new T.Group();alien.add(inner);                  // outer group handles facing + ground position
      ALIEN_POS.y=terrainHeight(ALIEN_POS.x,ALIEN_POS.z);alien.position.copy(ALIEN_POS);scene.add(alien);
      alienMixer=new T.AnimationMixer(alien);
      if(g.animations[0]){alienActs.idle=alienMixer.clipAction(g.animations[0]);alienActs.idle.play();}
      const add=(d,n)=>{try{L.parse(b64buf(d),'',gg=>{if(gg.animations[0])alienActs[n]=alienMixer.clipAction(gg.animations[0]);},()=>{});}catch(e){}};
      add(A.walk,'walk');add(A.run,'run');add(A.wave,'wave');
    },e=>console.warn('alien',e));
  }
  function alienFade(name){if(!alienActs[name]||alienState===name)return;const prev=alienActs[alienState],next=alienActs[name];next.reset().fadeIn(0.3).play();if(prev&&prev!==next)prev.fadeOut(0.3);alienState=name;}
  function updateAlien(dt){
    if(!alien||!alienMixer)return;alienMixer.update(dt);alienWaveCool-=dt;alienTimer-=dt;
    const tx=st.x-alien.position.x,tz=st.z-alien.position.z,db=Math.hypot(tx,tz);
    if(alienState!=='wave'&&alienState!=='run'&&db<26&&alienWaveCool<=0){
      alienWaveCool=11;
      if(Math.random()<0.4&&db>ALIEN_CHAT_RANGE){alienRunDir=Math.atan2(-tx,-tz);alienFade('run');alienState=alienActs.run?'run':alienState;alienTimer=2.4;}
      else{alien.rotation.y=Math.atan2(tx,tz)+ALIEN_FACE;alienFade('wave');alienState=alienActs.wave?'wave':alienState;alienTimer=2.0;}
    }
    if(alienState==='wave'){if(alienTimer<=0)alienFade('idle');}
    else if(alienState==='run'){alien.position.x+=Math.sin(alienRunDir)*0.16;alien.position.z+=Math.cos(alienRunDir)*0.16;alien.rotation.y=alienRunDir+ALIEN_FACE;if(alienTimer<=0)alienFade('idle');}
    else{
      if(alienState==='idle'&&alienTimer<=0&&alienActs.walk){alienTarget=new T.Vector3(alien.position.x+(Math.random()-0.5)*46,0,alien.position.z+(Math.random()-0.5)*46);alienFade('walk');alienTimer=7;}
      if(alienState==='walk'&&alienTarget){const dx=alienTarget.x-alien.position.x,dz=alienTarget.z-alien.position.z,d=Math.hypot(dx,dz);
        if(d<1.6||alienTimer<=0){alienFade('idle');alienTimer=2+Math.random()*5;alienTarget=null;}
        else{const a=Math.atan2(dx,dz);alien.rotation.y=a+ALIEN_FACE;alien.position.x+=Math.sin(a)*0.06;alien.position.z+=Math.cos(a)*0.06;}}
    }
    alien.position.y=terrainHeight(alien.position.x,alien.position.z)+ALIEN_LIFT;
    // proximity speech bubble — face the visitor and float a chat bubble overhead
    if(db<ALIEN_CHAT_RANGE){
      alien.rotation.y=Math.atan2(tx,tz)+ALIEN_FACE;
      if(alienState==='walk'){alienFade('idle');alienTarget=null;alienTimer=3;}
      if(alienBubble){const sp=project(alien.position.x,alien.position.y+ALIEN_TARGET_H+0.7,alien.position.z);alienBubble.style.left=sp.x+'px';alienBubble.style.top=sp.y+'px';alienBubble.classList.add('show');}
    }else if(alienBubble){alienBubble.classList.remove('show');}
  }
  loadAlien();
  /* ===== ALIEN DIALOGUE ===== */
  const alienBubble=document.getElementById('alienBubble'),alienLineEl=document.getElementById('alienLine'),alienReplyEl=document.getElementById('alienReply');
  const ALIEN_CHAT=[
    {a:"Oh — hey. Didn't expect company all the way out here.",y:"Where… am I?"},
    {a:"The moon. You've been driving around a good while now, friend.",y:"How do I get off this world?"},
    {a:"Heh. Everyone asks me that, sooner or later.",y:"…so how do I?"},
    {a:"Find the anomalies — collect every last one scattered across the surface. That should help you leave.",y:"Where are they?"},
    {a:"They're marked on your map. Chase the glowing dots. Safe travels out there."}
  ];
  let aci=0;
  function renderAlienChat(){if(!alienLineEl)return;const c=ALIEN_CHAT[aci];alienLineEl.textContent=c.a;if(c.y){alienReplyEl.textContent='“'+c.y+'”';alienReplyEl.style.display='';}else{alienReplyEl.style.display='none';}}
  if(alienReplyEl)alienReplyEl.addEventListener('click',ev=>{ev.stopPropagation();if(aci<ALIEN_CHAT.length-1){aci++;renderAlienChat();}});
  renderAlienChat();

  /* ===== MOON PROPS (rocks, platform, terminals) ===== */
  function placeProp(data,opts){
    if(!data||!T.GLTFLoader)return;const L=new T.GLTFLoader();
    L.parse(b64buf(data),'',g=>{
      const m=g.scene;if(opts.rotX)m.rotation.x=opts.rotX;
      let box=meshBox(m),sz=box.getSize(new T.Vector3());
      const s=opts.size/Math.max(0.001,Math.max(sz.x,sz.z));m.scale.setScalar(s);
      box=meshBox(m);const c=box.getCenter(new T.Vector3());
      const y=terrainHeight(opts.x,opts.z);
      m.position.set(opts.x-c.x, y-box.min.y, opts.z-c.z);
      if(opts.rotY)m.rotation.y=opts.rotY;
      m.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;o.frustumCulled=false;if(o.material){o.material.metalness=Math.min(1,(o.material.metalness||0));o.material.side=T.DoubleSide;}}});
      scene.add(m);
      if(opts.collider){const r=opts.size*0.42;colliders.push({mesh:m,x:m.position.x,z:m.position.z,r:r,mass:r*r*r*1.4,vx:0,vz:0,yOff:m.position.y-terrainHeight(m.position.x,m.position.z),baseScale:r});}
    },e=>console.warn('prop',e));
  }
  (function(){
    const P=window.PROPS;if(!P)return;
    placeProp(P.platform,{x:64,z:-44,size:58,rotY:0.2});
    placeProp(P.termL,{x:58,z:-52,size:6.5,rotY:-0.5});
    placeProp(P.termS,{x:72,z:-38,size:4.5,rotY:0.8});
    placeProp(P.rock7,{x:-64,z:-54,size:15,rotY:1.1,collider:true});
    placeProp(P.rock4,{x:96,z:70,size:15,rotY:2.3,collider:true});
  })();

  /* ===== SKILL ICONS — 3D logos floating on glowing centres around the Skills monument ===== */
  const SG=window.SKILLS_GLB||{};
  const SKILL_DEFS=[
    {key:'react',     name:'React',     k:'WEB DESIGN', color:0x61dafb, url:SG.react,     size:4.6, info:'Web design + animation and custom React front-ends — fast, interactive and hand-built (this moon included).'},
    {key:'wordpress', name:'WordPress', k:'CMS',        color:0x2aa7d0, url:SG.wordpress, size:4.6, info:'Complete WordPress builds — custom themes and blocks, migrations, and sites your team can run themselves.'},
    {key:'google',    name:'Google',    k:'GROWTH',     color:0x4285f4, url:SG.google,    size:4.6, info:'Google Workspace setup, SEO audits and Search Console / Webmaster — get found, measured and running on Google.'},
    {key:'starburst', name:'Claude',    k:'AI DEV',     color:0xff8a3c, url:SG.starburst, size:4.6, info:'AI-assisted development with Claude — custom tools, automations and apps, built fast and built right.'},
    {key:'heart',     name:'Lovable',   k:'AI APPS',    color:0xff4d6d, url:SG.heart,     size:4.6, info:'Full-stack sites and apps built with Lovable — from idea to live product in record time.'},
  ];
  const skillIcons=[]; const skillRayTargets=[]; let openSkill=null;
  const skillPop=document.getElementById('skillPop');
  function skillHex(c){return '#'+('000000'+c.toString(16)).slice(-6);}
  function positionSkillPop(){
    if(!openSkill||!skillPop)return;
    const p=openSkill.model?openSkill.model.position:openSkill.center;
    const sp=project(p.x,p.y+2.8,p.z);
    skillPop.style.left=Math.max(132,Math.min(innerWidth-132,sp.x))+'px';
    skillPop.style.top=Math.max(118,Math.min(innerHeight-30,sp.y))+'px';
  }
  function showSkillPop(ic){
    if(!skillPop)return; openSkill=ic; ic.flash=1.2;
    skillPop.style.setProperty('--pc',skillHex(ic.def.color));
    document.getElementById('skillPopK').textContent=ic.def.k;
    document.getElementById('skillPopH').textContent=ic.def.name;
    document.getElementById('skillPopP').textContent=ic.def.info;
    positionSkillPop(); skillPop.classList.add('open');
  }
  function hideSkillPop(){openSkill=null; if(skillPop)skillPop.classList.remove('open');}
  if(skillPop){const sx=document.getElementById('skillPopX'); if(sx)sx.addEventListener('click',e=>{e.stopPropagation();hideSkillPop();});}
  (function(){
    const base=BUILDS.skills.pos, R=11, ray=new T.Raycaster(), ndc=new T.Vector2();
    SKILL_DEFS.forEach((def,i)=>{
      const a=(i/SKILL_DEFS.length)*Math.PI*2+0.35;
      const cx=base.x+Math.cos(a)*R, cz=base.z+Math.sin(a)*R, gy=terrainHeight(cx,cz);
      const center=new T.Vector3(cx, gy+2.5+(i%2)*0.7, cz);
      const glow=new T.Mesh(new T.SphereGeometry(0.6,16,16),new T.MeshBasicMaterial({color:def.color,transparent:true,opacity:0.7,blending:T.AdditiveBlending,depthWrite:false}));
      glow.position.copy(center); scene.add(glow);
      const ring=new T.Mesh(new T.RingGeometry(1.0,1.3,40),new T.MeshBasicMaterial({color:def.color,transparent:true,opacity:0.5,side:T.DoubleSide,blending:T.AdditiveBlending,depthWrite:false}));
      ring.rotation.x=-Math.PI/2; ring.position.set(cx,gy+0.12,cz); scene.add(ring);
      const light=new T.PointLight(def.color,1.4,26); light.position.copy(center); scene.add(light);
      const lbl=document.createElement('div'); lbl.className='skill-label'; lbl.innerHTML='<b>'+def.name+'</b><span>'+def.k+'</span>';
      const ic={def,center,glow,ring,light,model:null,state:'float',vx:0,vy:0,vz:0,spin:0.5+Math.random()*0.5,phase:Math.random()*6.283,baseY:center.y,flash:0,label:lbl};
      lbl.addEventListener('click',()=>showSkillPop(ic)); nodesWrap.appendChild(lbl); skillIcons.push(ic);
      new T.GLTFLoader().load(def.url,g=>{
        const m=g.scene; let box=meshBox(m), sz=box.getSize(new T.Vector3());
        const s=def.size/Math.max(0.001,Math.max(sz.x,sz.y,sz.z)); m.scale.setScalar(s);
        box=meshBox(m); const c=box.getCenter(new T.Vector3());
        const pivot=new T.Group(); m.position.set(-c.x,-c.y,-c.z); pivot.add(m); pivot.position.copy(center);
        m.traverse(o=>{if(o.isMesh){o.castShadow=true;o.frustumCulled=false;o.userData.skill=ic;skillRayTargets.push(o);}});
        scene.add(pivot); ic.model=pivot;
      },undefined,e=>console.warn('skill glb',def.key,e));
    });
    __on('pointerdown',e=>{
      if(!skillRayTargets.length||e.target!==renderer.domElement)return;
      ndc.x=(e.clientX/innerWidth)*2-1; ndc.y=-(e.clientY/innerHeight)*2+1; ray.setFromCamera(ndc,camera);
      const hit=ray.intersectObjects(skillRayTargets,true)[0];
      if(hit){let o=hit.object; while(o&&!o.userData.skill)o=o.parent; if(o&&o.userData.skill){showSkillPop(o.userData.skill);return;}}
      if(openSkill)hideSkillPop();
    });
  })();
  function updateSkillIcons(dt){
    for(const ic of skillIcons){
      const pulse=0.5+Math.sin(clock*2.2+ic.phase)*0.22+ic.flash;
      ic.glow.material.opacity=Math.min(1,(ic.state==='float'?0.45:0.16)+pulse*0.4);
      ic.light.intensity=(ic.state==='float'?1.0:0.4)+pulse*1.4;
      if(ic.ring)ic.ring.material.opacity=Math.min(1,(ic.state==='float'?0.3:0.12)+pulse*0.4);
      if(ic.flash>0)ic.flash=Math.max(0,ic.flash-dt*2);
      if(ic.model){
        if(ic.state==='float'){
          ic.model.position.set(ic.center.x, ic.baseY+Math.sin(clock*1.4+ic.phase)*0.45, ic.center.z);
          ic.model.rotation.y+=dt*ic.spin; ic.model.rotation.x=Math.sin(clock*0.8+ic.phase)*0.12;
          const dx=st.x-ic.center.x, dz=st.z-ic.center.z;
          if(dx*dx+dz*dz<36&&Math.abs(st.speed)>0.05){      // car drove into the icon's glowing centre
            ic.state='fall';
            const nx=(ic.center.x-st.x)||0.1, nz=(ic.center.z-st.z)||0.1, nl=Math.hypot(nx,nz)||1, pw=1.4+Math.abs(st.speed)*7;
            ic.vx=nx/nl*pw*0.14; ic.vz=nz/nl*pw*0.14; ic.vy=0.18+Math.random()*0.12; ic.spin=2+Math.random()*3;
            fxBurst(ic.center.clone(),ic.def.color); showToast('✦ '+ic.def.name.toUpperCase());
            if(openSkill===ic)hideSkillPop();
          }
        } else if(ic.state==='fall'){
          ic.vy-=0.013; const m=ic.model;
          m.position.x+=ic.vx; m.position.y+=ic.vy; m.position.z+=ic.vz;
          m.rotation.x+=ic.spin*dt; m.rotation.z+=ic.spin*dt*0.6;
          const rest=terrainHeight(m.position.x,m.position.z)+2.2;
          if(m.position.y<=rest){ m.position.y=rest; ic.state='ground';
            const r=2.1; colliders.push({mesh:m,x:m.position.x,z:m.position.z,r:r,mass:r*r*r*0.7,vx:ic.vx*0.4,vz:ic.vz*0.4,yOff:rest-terrainHeight(m.position.x,m.position.z),baseScale:r}); }
        }
      }
      if(ic.label){
        if(ic.state==='float'&&ic.model){
          const sp=project(ic.center.x,ic.baseY-2.3,ic.center.z);
          ic.label.style.left=sp.x+'px'; ic.label.style.top=sp.y+'px';
          ic.label.style.opacity=(sp.x>10&&sp.x<innerWidth-10&&sp.y>40&&sp.y<innerHeight-10)?1:0;
        } else ic.label.style.opacity=0;
      }
    }
    positionSkillPop();
  }

  /* ===== CLIENT LOGOS — laid evenly on the surface around the Work monument ===== */
  (function(){
    const CLIENTS=[['tifco','webp'],['guinness-storehouse','webp'],['dundalk-stadium','webp'],['crowne-plaza','webp'],['coca-cola','png'],['centra','webp'],['boylesports','png']];
    const base=BUILDS.work.pos, R=18, tl=new T.TextureLoader();
    CLIENTS.forEach((c,i)=>{
      const a=(i/CLIENTS.length)*Math.PI*2+0.25;
      const x=base.x+Math.cos(a)*R, z=base.z+Math.sin(a)*R, gy=terrainHeight(x,z);
      const tex=tl.load('/clients/'+c[0]+'.'+c[1]); tex.colorSpace=T.SRGBColorSpace; if(renderer.capabilities.getMaxAnisotropy)tex.anisotropy=renderer.capabilities.getMaxAnisotropy();
      // dark backing plate for contrast on the regolith
      const plate=new T.Mesh(new T.PlaneGeometry(11,6.4),new T.MeshBasicMaterial({color:0x0a0d15,transparent:true,opacity:0.42,depthWrite:false}));
      plate.rotation.x=-Math.PI/2; plate.position.set(x,gy+0.1,z); scene.add(plate);
      const m=new T.Mesh(new T.PlaneGeometry(9.4,5.3),new T.MeshBasicMaterial({map:tex,transparent:true,opacity:0.95,depthWrite:false,side:T.DoubleSide}));
      m.rotation.x=-Math.PI/2; m.position.set(x,gy+0.15,z); m.renderOrder=3; scene.add(m);
    });
  })();

  __on('resize',()=>{setFrustum();renderer.setSize(innerWidth,innerHeight);if(spaceCam){spaceCam.aspect=innerWidth/innerHeight;spaceCam.updateProjectionMatrix();}});

  /* ============ LOOP ============ */
  /* ===== boulder collision + knock dynamics ===== */
  const BUGGY_R=2.3;
  function resolveCollisions(){
    for(let i=0;i<colliders.length;i++){const c=colliders[i];
      const dx=st.x-c.x, dz=st.z-c.z, min=c.r+BUGGY_R, d2=dx*dx+dz*dz;
      if(d2<min*min){
        const d=Math.sqrt(d2)||0.0001, nx=dx/d, nz=dz/d, overlap=min-d;
        st.x+=nx*overlap; st.z+=nz*overlap;                 // push buggy out
        const impulse=Math.min(0.8,(Math.abs(st.speed)*1.4+0.05)/c.mass);
        c.vx-=nx*impulse; c.vz-=nz*impulse;                 // shove rock away (big mass = tiny shove)
        st.speed*=0.55;                                     // ram bleeds momentum
      }
    }
  }
  function updateColliders(){
    for(let i=0;i<colliders.length;i++){const c=colliders[i];
      if(c.vx*c.vx+c.vz*c.vz<1e-5){if(c.vx||c.vz){c.vx=0;c.vz=0;}continue;}
      c.x+=c.vx; c.z+=c.vz; c.vx*=0.86; c.vz*=0.86;
      c.x=Math.max(-WORLD,Math.min(WORLD,c.x)); c.z=Math.max(-WORLD,Math.min(WORLD,c.z));
      c.mesh.position.set(c.x, terrainHeight(c.x,c.z)+c.yOff, c.z);
      c.mesh.rotation.x+=c.vz*0.12; c.mesh.rotation.z-=c.vx*0.12;
    }
  }
  const camDesired=new T.Vector3();const tmp=new T.Vector3();let clock=0;
  function project(x,y,z){tmp.set(x,y,z).project(camera);return {x:(tmp.x*0.5+0.5)*innerWidth,y:(-tmp.y*0.5+0.5)*innerHeight};}
  function animate(){if(__disposed)return;__rafId=requestAnimationFrame(animate);clock+=0.016;
    if(mode==='space'){spaceTick();return;}
    if(mode==='takeoff'){takeoffTick();return;}
    // Pulse the landed ship + tractor beam so it reads as "alive" from across the moon
    if(landedShip){const ud=landedShip.userData,pul=0.5+0.5*Math.sin(clock*2.4);
      landedShip.traverse(o=>{if(o.isMesh&&o.material){const m=Array.isArray(o.material)?o.material[0]:o.material;
        if(m&&'emissiveIntensity' in m)m.emissiveIntensity=0.28+pul*0.28;}});
      if(ud.beam)ud.beam.material.opacity=0.22+pul*0.14;
      if(ud.beamCore)ud.beamCore.material.opacity=0.34+pul*0.22;
      if(ud.halo){ud.halo.material.opacity=0.35+pul*0.4;ud.halo.scale.setScalar(0.9+pul*0.35);}}
    if(Math.abs(VIEW-targetVIEW)>0.05){VIEW+=(targetVIEW-VIEW)*0.18;setFrustum();}
    const fwd={x:Math.sin(st.heading),z:Math.cos(st.heading)};

    if(autoTarget){
      const dx=autoTarget.x-st.x,dz=autoTarget.z-st.z,dist=Math.hypot(dx,dz);
      let diff=Math.atan2(dx,dz)-st.heading;while(diff>Math.PI)diff-=Math.PI*2;while(diff<-Math.PI)diff+=Math.PI*2;
      st.heading+=Math.max(-TURN*1.4,Math.min(TURN*1.4,diff*0.5));st.steer=diff;
      // steer around boulders that lie in the path
      {const fdx=Math.sin(st.heading),fdz=Math.cos(st.heading);let bD=1e9,bCross=0;
        for(let ci=0;ci<colliders.length;ci++){const c=colliders[ci],ox=c.x-st.x,oz=c.z-st.z,od=Math.hypot(ox,oz);
          if(od<c.r+BUGGY_R+17){const fd=(ox*fdx+oz*fdz)/(od||1);if(fd>0.15&&od<bD){bD=od;bCross=fdx*oz-fdz*ox;}}}
        if(bD<1e9){st.heading+=(bCross>0?1:-1)*TURN*1.9*(1-Math.min(1,bD/28));st.steer+= (bCross>0?1:-1)*0.5;}}
      if(dist>TRIGGER-2)st.speed=Math.min(MAXS*2.1,st.speed+ACC*2.6);else{st.speed*=0.9;if(st.speed<0.02)autoTarget=null;}  /* quick-travel: zip to the monument */
    } else {
      if(keys.up)st.speed=Math.min(MAXS,st.speed+ACC);
      else if(keys.down)st.speed=Math.max(-MAXS*0.5,st.speed-REV);
      else st.speed*=FRICTION;
      const steer=(keys.left?1:0)-(keys.right?1:0);st.steer=steer;
      if(steer!==0&&Math.abs(st.speed)>0.01)st.heading+=TURN*steer*(st.speed>=0?1:-1)*Math.min(1,Math.abs(st.speed)/0.25);
      if(keys.up||keys.down||keys.left||keys.right){hideHint();pinned=null;}
    }
    if(Math.abs(st.speed)<0.001)st.speed=0;

    st.x+=fwd.x*st.speed;st.z+=fwd.z*st.speed;
    const LIM=WORLD-26;st.x=Math.max(-LIM,Math.min(LIM,st.x));st.z=Math.max(-LIM,Math.min(LIM,st.z));
    resolveCollisions();
    st.x=Math.max(-LIM,Math.min(LIM,st.x));st.z=Math.max(-LIM,Math.min(LIM,st.z));
    st.y=terrainHeight(st.x,st.z);
    buggy.position.set(st.x,st.y,st.z);buggy.rotation.y=st.heading;
    const ahead=terrainHeight(st.x+fwd.x*1.6,st.z+fwd.z*1.6),behind=terrainHeight(st.x-fwd.x*1.6,st.z-fwd.z*1.6);
    const rv={x:Math.cos(st.heading),z:-Math.sin(st.heading)};
    const hR=terrainHeight(st.x+rv.x*1.4,st.z+rv.z*1.4),hL=terrainHeight(st.x-rv.x*1.4,st.z-rv.z*1.4);
    buggy.rotation.x=Math.atan2(behind-ahead,3.2);buggy.rotation.z=Math.atan2(hL-hR,2.8);

    wheels.forEach(w=>w.rotation.x+=st.speed*0.9);   /* roll */
    const steerTarget=Math.max(-0.6,Math.min(0.6,(st.steer||0)*0.6));
    steerVis+=(steerTarget-steerVis)*0.2;            /* smoothed steer angle */
    steerPivots.forEach(p=>p.rotation.y=steerVis);   /* front wheels turn */
    sw.rotation.y=-steerVis;                          /* steering wheel turn */
    chimp.position.y=1.4+Math.sin(clock*3)*0.015;   /* idle bob */

    // tracks
    lastTrackDist+=Math.abs(st.speed);
    if(lastTrackDist>0.9&&Math.abs(st.speed)>0.06){lastTrackDist=0;
      dropTrack(st.x-fwd.x*1.3+rv.x*1.3,st.z-fwd.z*1.3+rv.z*1.3,st.heading);
      dropTrack(st.x-fwd.x*1.3-rv.x*1.3,st.z-fwd.z*1.3-rv.z*1.3,st.heading);
    }
    // dust
    if(Math.abs(st.speed)>0.12)emitDust(st.x-fwd.x*1.3,st.y+0.4,st.z-fwd.z*1.3);
    for(let i=0;i<DUST_N;i++){if(dLife[i]>0){dLife[i]-=0.018;dPos[i*3]+=dVel[i].x;dPos[i*3+1]+=dVel[i].y;dPos[i*3+2]+=dVel[i].z;dVel[i].y-=0.002;if(dLife[i]<=0)dPos[i*3+1]=-100;}}
    dustGeo.attributes.position.needsUpdate=true;

    // isometric camera follow (fixed orientation)
    camDesired.set(st.x+ISO.x,st.y+ISO.y,st.z+ISO.z);
    camera.position.lerp(camDesired,0.09);
    camera.lookAt(st.x,st.y+1.2,st.z);
    sun.position.set(st.x+70,st.y+95,st.z+30);sun.target.position.set(st.x,st.y,st.z);sun.target.updateMatrixWorld();

    // proximity panels
    let nearest=null,nd=1e9;
    Object.keys(BUILDS).forEach(k=>{const b=BUILDS[k];const d=Math.hypot(b.pos.x-st.x,b.pos.z-st.z);if(d<nd){nd=d;nearest=k;}});
    if(pinned){if(openBuild!==pinned)openPanel(pinned);}
    else if(nd<TRIGGER){if(manualClose!==nearest)openPanel(nearest);}
    else{if(openBuild)openPanel(null);manualClose=null;}
    // compass (screen-space)
    if(nearest){const b=BUILDS[nearest];const a=project(st.x,st.y+1,st.z),c=project(b.pos.x,b.pos.y+1,b.pos.z);const ang=Math.atan2(c.x-a.x,-(c.y-a.y));cArrow.style.transform=`translate(-50%,-100%) rotate(${ang}rad)`;cName.textContent=b.name;cDist.textContent=nd<TRIGGER?'ARRIVED':Math.round(nd)+' M';}

    // hidden anomalies
    for(let i=0;i<SURPRISES.length;i++){const s=SURPRISES[i];const d=Math.hypot(s.pos.x-st.x,s.pos.z-st.z);
      if(s.armed&&d<9){s.armed=false;triggerSurprise(s.type,s.pos);if(!s.found){s.found=true;discovered++;updateSecrets();showToast('✦ ANOMALY '+s.type.toUpperCase());checkAllCollected();}else{showToast('✦ ANOMALY '+s.type.toUpperCase());}}
      else if(!s.armed&&d>22)s.armed=true;}
    if(shipSpawned&&Math.hypot(SHIP_POS.x-st.x,SHIP_POS.z-st.z)<13)startTakeoff();   // reach the ship -> liftoff
    updateFx(0.016);
    updateColliders();
    updateSkillIcons(0.016);
    updateAlien(0.016);
    updateEngine();
    updateHUD();
    updateNodes();

    renderer.render(scene,camera);
  }

  /* ============ BOOT ============ */
  const loader=document.getElementById('loader'),loadMsg=document.getElementById('loadMsg');
  const msgs=['CALIBRATING MOONSCAPE…','SCATTERING REGOLITH…','SPOOLING UP BUGGY…','WAKING THE CHIMP…','READY'];
  let mi=0;const mInt=setInterval(()=>{mi++;if(mi<msgs.length)loadMsg.textContent=msgs[mi];},380);
  renderer.render(scene,camera);
  __t1=setTimeout(()=>{if(__disposed)return;clearInterval(mInt);loader.classList.add('gone');animate();},1700);

  // ========================== end ported scene =========================
  return () => {
    __disposed = true;
    try { cancelAnimationFrame(__rafId); } catch (e) {}
    try { clearTimeout(__t1); } catch (e) {}
    try { clearInterval(mInt); } catch (e) {}
    __cleanups.forEach((f) => { try { f(); } catch (e) {} });
    try { (engine as any) && (engine as any).pause(); } catch (e) {}
    try { (music as any) && (music as any).pause(); } catch (e) {}
    [nodesWrap, flashEl, spaceHud, spScore, spCtrl].forEach((n: any) => { try { n && n.remove && n.remove(); } catch (e) {} });
    try { document.body.classList.remove("space-mode", "is-touch"); } catch (e) {}
    try { (renderer as any).domElement && (renderer as any).domElement.remove(); } catch (e) {}
    try { (renderer as any).dispose && (renderer as any).dispose(); } catch (e) {}
  };
}
