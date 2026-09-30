import * as THREE from "three";
import clubrovia from "@/assets/clubrovia/laptop.png.asset.json";
import mckevitts from "@/assets/mckevitts/hero.png.asset.json";

export const MOON_PROJECTS = [
  {
    id: "mckevitts", number: "01", name: "McKevitt’s", place: "The lunar hotel",
    category: "BRAND · HOSPITALITY · WEB", color: "#f5c778", x: -28, z: -17,
    arrival: { x: -18, z: -3 }, image: mckevitts.url,
    description: "A little Carlingford, a long way from Earth. Explore the identity and website for a family-run hotel, bar and restaurant.",
  },
  {
    id: "clubrovia", number: "02", name: "Clubrovia", place: "The moon arena",
    category: "OWN PRODUCT · DESIGN · DEVELOPMENT", color: "#a397ff", x: 18, z: -32,
    arrival: { x: 14, z: -15 }, image: clubrovia.url,
    description: "Many clubs. One home ground. Step inside our sports-club platform, from membership and fundraising to the club website.",
  },
  {
    id: "onyerbike", number: "03", name: "On Yer Bike", place: "The orbital playground",
    category: "TOURISM · BOOKING · WEB", color: "#ff985b", x: 34, z: 22,
    arrival: { x: 21, z: 18 }, image: "/case-thumbs/onyerbike.png",
    description: "Made for a little adventure. Take a closer look at the booking-led website for Carlingford’s bike-hire business.",
  },
] as const;

export type MoonProject = typeof MOON_PROJECTS[number];
export type MoonProjectId = MoonProject["id"];
export type RoverPosition = { x: number; z: number; speed: number };
export type MoonCollider = {
  mesh: THREE.Object3D; x: number; z: number; r: number; mass: number;
  vx: number; vz: number; yOff: number; baseScale: number;
};

// Keep rocks off the central streets and out of the project forecourts.
export function isDistrictSpace(x: number, z: number) {
  return Math.hypot(x, z) < 66 || MOON_PROJECTS.some(p => Math.hypot(x - p.x, z - p.z) < 23);
}

type DistrictOptions = {
  scene: THREE.Scene;
  height: (x: number, z: number) => number;
  colliders: MoonCollider[];
  mobile: boolean;
  camera: THREE.Camera;
  canvas: HTMLCanvasElement;
  onToast: (message: string) => void;
};

/** The portfolio is part of the landscape. No extra WebGL context or render loop. */
export function createMoonDistrict({ scene, height, colliders, mobile, camera, canvas, onToast }: DistrictOptions) {
  const root = new THREE.Group();
  root.name = "portfolio-neighbourhood";
  scene.add(root);
  const resources = new Set<{ dispose: () => void }>();
  const track = <T extends { dispose: () => void }>(resource: T): T => { resources.add(resource); return resource; };
  const loader = new THREE.TextureLoader();
  let disposed = false;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const animations: Array<(time: number) => void> = [];
  const screens: THREE.Mesh[] = [];
  const dark = track(new THREE.MeshStandardMaterial({ color: "#202437", roughness: .68, metalness: .25 }));
  const silver = track(new THREE.MeshStandardMaterial({ color: "#cbd2dd", roughness: .48, metalness: .45 }));
  const chalk = track(new THREE.MeshStandardMaterial({ color: "#eee8da", roughness: .72 }));
  const lampGeometry = track(new THREE.SphereGeometry(.18, 6, 5));
  const postGeometry = track(new THREE.CylinderGeometry(.09, .13, 1.3, 6));
  function glow(color: string) { return track(new THREE.MeshBasicMaterial({ color, toneMapped: false })); }
  function mesh(parent: THREE.Object3D, geometry: THREE.BufferGeometry, material: THREE.Material, x = 0, y = 0, z = 0) {
    const object = new THREE.Mesh(track(geometry), material);
    object.position.set(x, y, z); object.castShadow = !mobile; object.receiveShadow = true;
    parent.add(object); return object;
  }
  function box(parent: THREE.Object3D, w: number, h: number, d: number, material: THREE.Material, x = 0, y = 0, z = 0) {
    return mesh(parent, new THREE.BoxGeometry(w, h, d), material, x, y, z);
  }
  function textTexture(title: string, subtitle: string, color: string) {
    const canvas = document.createElement("canvas"); canvas.width = 1024; canvas.height = 256;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#151827"; ctx.fillRect(0, 0, 1024, 256);
    ctx.fillStyle = color; ctx.fillRect(32, 28, 6, 200);
    ctx.fillStyle = "#f6f3ea"; ctx.font = "700 72px sans-serif"; ctx.fillText(title, 66, 121, 900);
    ctx.fillStyle = color; ctx.font = "500 25px monospace"; ctx.fillText(subtitle, 68, 184, 890);
    const texture = track(new THREE.CanvasTexture(canvas)); texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }
  function sign(parent: THREE.Object3D, title: string, subtitle: string, color: string, w: number, x: number, y: number, z: number) {
    const material = track(new THREE.MeshBasicMaterial({ map: textTexture(title, subtitle, color), side: THREE.DoubleSide }));
    return mesh(parent, new THREE.PlaneGeometry(w, w / 4), material, x, y, z);
  }
  function screen(parent: THREE.Object3D, project: MoonProject, w: number, x: number, y: number, z: number) {
    const frame = new THREE.Group(); frame.position.set(x, y, z); frame.rotation.y = Math.PI / 6; parent.add(frame);
    const h = w * .56;
    box(frame, w + .7, h + .7, .55, dark);
    box(frame, w + .85, .12, .7, glow(project.color), 0, -h / 2 - .35);
    const material = track(new THREE.MeshBasicMaterial({ map: textTexture(project.name, project.category, project.color) }));
    const display = mesh(frame, new THREE.PlaneGeometry(w, h), material, 0, 0, .3);
    display.userData.projectId = project.id;
    screens.push(display);
    // A readable, branded sign stays in place if a project image is unavailable.
    loader.load(project.image, texture => {
      if (disposed) { texture.dispose(); return; }
      track(texture); texture.colorSpace = THREE.SRGBColorSpace;
      const image = texture.image as { width: number; height: number };
      const aspect = image.width / image.height;
      texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
      if (aspect > w / h) { texture.repeat.x = (w / h) / aspect; texture.offset.x = (1 - texture.repeat.x) / 2; }
      else { texture.repeat.y = aspect / (w / h); texture.offset.y = 1 - texture.repeat.y; }
      material.map = texture; material.needsUpdate = true;
    }, undefined, () => {});
    return frame;
  }
  function ring(parent: THREE.Object3D, radius: number, color: string, y: number) {
    const object = mesh(parent, new THREE.TorusGeometry(radius, .1, 6, 64), glow(color), 0, y);
    object.rotation.x = -Math.PI / 2; return object;
  }
  function route(points: Array<[number, number]>, color: string) {
    const curve = new THREE.CatmullRomCurve3(points.map(([x, z]) => new THREE.Vector3(x, 0, z)));
    const samples = curve.getPoints(48).map(v => new THREE.Vector3(v.x, height(v.x, v.z) + .09, v.z));
    mesh(root, new THREE.TubeGeometry(new THREE.CatmullRomCurve3(samples), 64, .065, 4, false), glow(color));
    const postMat = glow(color);
    samples.filter((_, i) => i % 12 === 0).forEach(p => {
      const post = new THREE.Mesh(postGeometry, dark); post.position.copy(p).add(new THREE.Vector3(0, .6, 0)); root.add(post);
      const lamp = new THREE.Mesh(lampGeometry, postMat); lamp.position.copy(p).add(new THREE.Vector3(0, 1.3, 0)); root.add(lamp);
    });
  }

  // Three large, immediately recognisable places, arranged around the landing plaza.
  MOON_PROJECTS.forEach(project => {
    const group = new THREE.Group(); group.position.set(project.x, height(project.x, project.z), project.z); root.add(group);
    mesh(group, new THREE.CylinderGeometry(14, 14.6, .08, 48), dark, 0, .02);
    ring(group, 14.2, project.color, .12);
    const lit = glow(project.color);
    if (project.id === "mckevitts") {
      // A moon hotel: illuminated rooms, brass canopy and a huge facade showing the real work.
      box(group, 20, 9, 7, chalk, 0, 5, -2);
      box(group, 21, .55, 8, dark, 0, 9.7, -2);
      for (let i = 0; i < 7; i++) {
        box(group, 1.4, 1.3, .1, lit, -8.1 + i * 2.7, 8.4, 1.56);
        box(group, .13, 1.3, .15, dark, -8.1 + i * 2.7, 8.4, 1.65);
      }
      screen(group, project, 17, 0, 5.3, 3);
      const name = sign(group, "McKEVITT’S", "THE LUNAR HOTEL / BRAND + WEB", project.color, 19, 0, 13, -2);
      name.rotation.y = Math.PI / 6;
      box(group, 8, .25, 4, lit, 0, 3, 8);
      [-3.5, 3.5].forEach(x => box(group, .2, 2.7, .2, silver, x, 1.65, 9.5));
      for (const x of [-10, 10]) {
        mesh(group, new THREE.CylinderGeometry(1.25, 1, 1.5, 10), chalk, x, 1.2, 7);
        mesh(group, new THREE.IcosahedronGeometry(1.6, 1), track(new THREE.MeshStandardMaterial({ color: "#809c81", roughness: 1 })), x, 3, 7);
      }
    } else if (project.id === "clubrovia") {
      // Playable pitch in front of the platform's giant scoreboard.
      box(group, 18, .06, 12, track(new THREE.MeshStandardMaterial({ color: "#355963", roughness: 1 })), 0, .10, 2);
      for (const z of [-3.7, 7.7]) box(group, 17, .025, .09, chalk, 0, .145, z);
      for (const x of [-8.5, 8.5]) box(group, .09, .025, 11.4, chalk, x, .145, 2);
      box(group, .09, .025, 11.4, chalk, 0, .145, 2);
      const centre = ring(group, 2.8, "#eee8da", .15); centre.position.z = 2;
      for (const x of [-9, 9]) {
        box(group, .18, 3.6, .18, chalk, x, 2.3, -.5);
        box(group, .18, 3.6, .18, chalk, x, 2.3, 4.5);
        box(group, .18, .18, 5.2, chalk, x, 4.1, 2);
      }
      screen(group, project, 21, 0, 10, -6);
      [-8, 8].forEach(x => box(group, .5, 8, .5, silver, x, 4, -6));
      const name = sign(group, "CLUBROVIA", "THE MOON ARENA / OUR OWN PRODUCT", project.color, 20, 0, 17.5, -6);
      name.rotation.y = Math.PI / 6;
      for (let i = 0; i < 3; i++) box(group, 2.1, .8 + i * .5, 8, dark, -12 + i * .65, 1 + i * .3, 0);
    } else {
      // Oversized orbital wheel and a drive-through entrance, tied to the real tourism project.
      const wheel = new THREE.Group(); wheel.position.set(-7, 8, 0); wheel.rotation.y = Math.PI / 4; group.add(wheel);
      mesh(wheel, new THREE.TorusGeometry(6.2, .6, 10, 48), lit);
      mesh(wheel, new THREE.TorusGeometry(5.4, .14, 6, 48), silver);
      mesh(wheel, new THREE.SphereGeometry(.65, 12, 8), silver);
      for (let i = 0; i < 10; i++) { const a = i * Math.PI / 5; const spoke = box(wheel, .12, 11, .12, silver); spoke.rotation.z = a; }
      animations.push(t => { wheel.rotation.z = reducedMotion ? 0 : t * .13; });
      screen(group, project, 16, 5, 8.6, 1);
      const name = sign(group, "ON YER BIKE", "THE ORBITAL PLAYGROUND / TOURISM + WEB", project.color, 20, 0, 17, 0);
      name.rotation.y = Math.PI / 6;
      box(group, 18, .7, 3, dark, 0, 1, 7);
    }
    route([[0, 8], [project.arrival.x * .55, project.arrival.z * .55 + 3], [project.arrival.x, project.arrival.z]], project.color);
  });

  // A readable landing apron: soft slabs, painted instructions and a ring of low runway lights.
  const apron = mesh(root, new THREE.CylinderGeometry(10, 10.2, .035, 64), track(new THREE.MeshStandardMaterial({ color: "#737c89", roughness: .94 })), 0, .015, 8);
  apron.receiveShadow = true;
  const instructions = sign(root, "TAKE THE WHEEL", "WASD / ARROWS   ·   FOLLOW THE COLOURED TRAILS", "#d3d9e5", 11, 0, .055, 14);
  instructions.rotation.x = -Math.PI / 2;
  for (let i = 0; i < 12; i++) {
    const angle = i * Math.PI / 6;
    box(root, .6, .08, .18, glow("#e8c48e"), Math.cos(angle) * 10.5, .08, 8 + Math.sin(angle) * 10.5).rotation.y = -angle;
  }
  // Equipment is arranged as small scenes, leaving the streets free for driving.
  for (const [x, z] of [[-30, 33], [37, -6]]) {
    const station = new THREE.Group(); station.position.set(x, height(x, z), z); root.add(station);
    const panel = box(station, 5, .18, 3, track(new THREE.MeshStandardMaterial({ color: "#526d9e", metalness: .4, roughness: .4 })), 0, 2.1, 0);
    panel.rotation.x = -.32;
    box(station, .22, 2, .22, silver, 0, 1, 0);
    for (let i = 0; i < 4; i++) box(station, .035, .04, 2.8, silver, -1.8 + i * 1.2, 2.23, 0).rotation.x = -.32;
    box(station, 1.6, 1, 1.1, chalk, 3, .5, 0);
    box(station, .6, .12, .05, glow("#8cded0"), 3, .7, .58);
  }

  // Landing plaza: signage, equipment and a sculpture make even the first screen feel inhabited.
  const landing = new THREE.Group(); landing.position.set(0, height(0, 8), 8); root.add(landing);
  const welcome = sign(landing, "HELLO, MOON.", "REAL PROJECTS. OTHERWORLDLY PLAYGROUND.", "#b5a8ff", 13, -9, 4, 8);
  welcome.rotation.y = Math.PI / 4;
  box(landing, .25, 4, .25, silver, -9, 1, 8);
  const orbit = new THREE.Group(); orbit.position.set(7, 4.5, 5); landing.add(orbit);
  mesh(orbit, new THREE.IcosahedronGeometry(1.7, 1), chalk);
  const orbitRing = mesh(orbit, new THREE.TorusGeometry(3, .12, 8, 40), glow("#b5a8ff")); orbitRing.rotation.x = .8;
  animations.push(t => { orbit.rotation.y = reducedMotion ? 0 : t * .3; });

  const toys: Array<{ collider: MoonCollider; x: number; z: number }> = [];
  function toy(x: number, z: number, color: string, ball: boolean) {
    const radius = ball ? 1.4 : .85;
    const material = track(new THREE.MeshStandardMaterial({ color, roughness: .45, metalness: .2 }));
    const object = mesh(root, ball ? new THREE.IcosahedronGeometry(radius, 1) : new THREE.BoxGeometry(1.4, 1.4, 1.4), material, x, height(x, z) + radius, z);
    const collider: MoonCollider = { mesh: object, x, z, r: radius, mass: ball ? .35 : .6, vx: 0, vz: 0, yOff: radius, baseScale: radius };
    colliders.push(collider); toys.push({ collider, x, z });
    return collider;
  }
  [[-7, -3], [3, -8], [11, 3]].forEach(([x, z], i) => toy(x, z, ["#ff985b", "#a397ff", "#8cded0"][i], true));
  for (let i = 0; i < 5; i++) toy(-14 + i * 2.4, 23 + (i % 2) * 2, i % 2 ? "#e8bf73" : "#a397ff", false);
  const football = toy(18, -30, "#eee8da", true);
  const ballBand = mesh(football.mesh, new THREE.TorusGeometry(1.39, .065, 5, 24), dark);
  ballBand.rotation.x = Math.PI / 2;
  sign(root, "MAKE A LITTLE NOISE.", "BUMP THE BALL THROUGH EITHER GOAL", "#a397ff", 14, 18, .19, -22).rotation.x = -Math.PI / 2;
  let goals = 0;
  let goalResetAt = 0;
  const toySign = sign(root, "BUMPER YARD", "GIVE THE CARGO A NUDGE", "#e8bf73", 10, -10, height(-10, 25) + 4, 25);
  toySign.rotation.y = Math.PI / 4;

  // Collectible drive-through hoops reward short excursions around the neighbourhood.
  const hoops = [[15, 36], [-6, 32], [-24, 10]].map(([x, z], i) => {
    const material = glow(["#ff985b", "#a397ff", "#8cded0"][i]);
    const object = mesh(root, new THREE.TorusGeometry(3.8, .24, 8, 40), material, x, height(x, z) + 3.5, z);
    object.rotation.y = Math.PI / 4;
    return { object, x, z, found: false };
  });
  let hoopCount = 0;
  let nearby: MoonProjectId | null = null;
  const ray = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const selectScreen = (event: PointerEvent) => {
    if (!document.body.classList.contains("moon-exploring")) return;
    const bounds = canvas.getBoundingClientRect();
    pointer.set(((event.clientX - bounds.left) / bounds.width) * 2 - 1, 1 - ((event.clientY - bounds.top) / bounds.height) * 2);
    ray.setFromCamera(pointer, camera);
    const hit = ray.intersectObjects(screens, false)[0];
    if (hit) window.dispatchEvent(new CustomEvent("kamrok:moon-travel", { detail: hit.object.userData.projectId }));
  };
  canvas.addEventListener("pointerup", selectScreen);
  function resetToys() {
    toys.forEach(({ collider: c, x, z }) => {
      c.x = x; c.z = z; c.vx = c.vz = 0; c.mesh.position.set(x, height(x, z) + c.yOff, z); c.mesh.rotation.set(0, 0, 0);
    });
    hoops.forEach(h => { h.found = false; h.object.scale.setScalar(1); }); hoopCount = 0;
    goals = 0; goalResetAt = 0;
    window.dispatchEvent(new CustomEvent("kamrok:moon-goal", { detail: 0 }));
    window.dispatchEvent(new CustomEvent("kamrok:moon-hoops", { detail: 0 }));
    onToast("PLAYGROUND RESET · GO MAKE A LITTLE MESS");
  }
  window.addEventListener("kamrok:moon-reset", resetToys);
  function update(time: number, rover: RoverPosition, active: boolean) {
    animations.forEach(animate => animate(time));
    if (!active) return;
    if (goalResetAt && time >= goalResetAt) {
      football.x = 18; football.z = -30; football.vx = football.vz = 0;
      football.mesh.position.set(18, height(18, -30) + football.yOff, -30);
      goalResetAt = 0;
    } else if (!goalResetAt && Math.abs(football.x - 18) > 8.8 && Math.abs(football.x - 18) < 13 && Math.abs(football.z + 30) < 2.4) {
      goals++; goalResetAt = time + 1.5;
      window.dispatchEvent(new CustomEvent("kamrok:moon-goal", { detail: goals }));
      onToast(`GOAL! · CLUBROVIA ARENA · ${goals} SCORED`);
    }
    const next = MOON_PROJECTS.find(p => Math.hypot(p.arrival.x - rover.x, p.arrival.z - rover.z) < 8)?.id ?? null;
    if (next !== nearby) { nearby = next; window.dispatchEvent(new CustomEvent("kamrok:moon-nearby", { detail: next })); }
    hoops.forEach(h => {
      if (!h.found && Math.hypot(rover.x - h.x, rover.z - h.z) < 3.2) {
        h.found = true; hoopCount++; h.object.scale.setScalar(.85);
        window.dispatchEvent(new CustomEvent("kamrok:moon-hoops", { detail: hoopCount }));
        onToast(hoopCount === 3 ? "ORBIT COMPLETE · ALL THREE HOOPS FOUND" : `NICE DRIVING · ORBIT HOOP ${hoopCount} / 3`);
      }
    });
  }
  return {
    update,
    dispose() {
      disposed = true; window.removeEventListener("kamrok:moon-reset", resetToys);
      canvas.removeEventListener("pointerup", selectScreen);
      scene.remove(root); resources.forEach(resource => resource.dispose());
    },
  };
}
