import * as THREE from "three";

/** Readable, physical details for the close-follow camera. */
export function addRoverDetails(rover: THREE.Group) {
  const group = new THREE.Group();
  group.name = "kamrok-expedition-kit";
  rover.add(group);
  const orange = new THREE.MeshStandardMaterial({ color: "#ee8e45", roughness: .52, metalness: .3 });
  const cream = new THREE.MeshStandardMaterial({ color: "#eee7d5", roughness: .6, metalness: .18 });
  const charcoal = new THREE.MeshStandardMaterial({ color: "#232733", roughness: .8 });
  const chrome = new THREE.MeshStandardMaterial({ color: "#c4cad5", metalness: .8, roughness: .3 });
  const light = new THREE.MeshBasicMaterial({ color: "#fff0bb", toneMapped: false });
  const amber = new THREE.MeshBasicMaterial({ color: "#ffb65f", toneMapped: false });
  const textures: THREE.Texture[] = [];
  function mesh(geometry: THREE.BufferGeometry, material: THREE.Material, x: number, y: number, z: number) {
    const object = new THREE.Mesh(geometry, material); object.position.set(x, y, z);
    object.castShadow = true; group.add(object); return object;
  }
  function box(w: number, h: number, d: number, material: THREE.Material, x: number, y: number, z: number) {
    return mesh(new THREE.BoxGeometry(w, h, d), material, x, y, z);
  }
  function decal(label: string, subtitle: string) {
    const canvas = document.createElement("canvas"); canvas.width = 512; canvas.height = 192;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#eee7d5"; ctx.fillRect(0, 0, 512, 192);
    ctx.fillStyle = "#232733"; ctx.font = "900 italic 74px sans-serif"; ctx.fillText(label, 24, 100, 460);
    ctx.font = "500 27px monospace"; ctx.fillText(subtitle, 26, 150, 458);
    const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace; textures.push(texture);
    return new THREE.MeshStandardMaterial({ map: texture, roughness: .65 });
  }
  // Branded bodywork and individually bolted orange wheel arches.
  const sideDecal = decal("KAMROK", "LUNAR EXPEDITION / 01");
  for (const side of [-1, 1]) {
    box(.12, .68, 2.3, cream, side * 1.13, 1.35, .05);
    const plate = mesh(new THREE.PlaneGeometry(1.85, .69), sideDecal, side * 1.2, 1.4, .05);
    plate.rotation.y = side * Math.PI / 2;
    for (const z of [-1.3, 1.3]) {
      box(.75, .15, 1.4, orange, side * 1.33, 1.61, z);
      for (const offset of [-.48, .48]) mesh(new THREE.SphereGeometry(.045, 6, 4), chrome, side * 1.6, 1.72, z + offset);
    }
    box(.1, .12, 3.4, chrome, side * 1.08, 1.8, .1);
  }
  box(2, .22, .7, cream, 0, 1.35, 1.65);
  for (let i = 0; i < 7; i++) box(.09, .18, .05, charcoal, -.63 + i * .21, 1.25, 2.17);
  box(2.5, .2, .24, orange, 0, .97, 2.16);
  const tow = mesh(new THREE.TorusGeometry(.16, .045, 6, 12), chrome, 0, .82, 2.31);
  tow.rotation.x = .3;
  // Expedition cargo: spare tyre, two oxygen cylinders and a strapped instrument case.
  const spare = mesh(new THREE.TorusGeometry(.48, .18, 8, 22), charcoal, -.3, 2.22, -1.42);
  spare.rotation.x = Math.PI / 2;
  mesh(new THREE.CylinderGeometry(.22, .22, .15, 12), chrome, -.3, 2.22, -1.42);
  for (const x of [.6, .98]) {
    mesh(new THREE.CylinderGeometry(.13, .13, .72, 10), cream, x, 2.12, -1.25);
    mesh(new THREE.CylinderGeometry(.07, .07, .12, 8), orange, x, 2.54, -1.25);
    box(.3, .08, .3, charcoal, x, 2, -1.25);
  }
  box(.8, .38, .62, orange, -.4, 1.82, -.75);
  box(.12, .4, .65, charcoal, -.4, 1.83, -.75);
  // Warm utility lights and a small rotating amber beacon.
  box(1.65, .18, .2, charcoal, 0, 2.65, .8);
  for (let i = 0; i < 5; i++) box(.23, .12, .04, light, -.62 + i * .31, 2.65, .92);
  mesh(new THREE.CylinderGeometry(.17, .2, .14, 10), charcoal, .84, 2.1, -1.55);
  const beacon = mesh(new THREE.CylinderGeometry(.14, .14, .22, 10), amber, .84, 2.27, -1.55);
  const pennant = mesh(new THREE.PlaneGeometry(.7, .4), decal("01", "KAMROK"), 1.17, 2.8, -1.02);
  pennant.material.side = THREE.DoubleSide;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return {
    update(time: number, speed: number) {
      beacon.scale.y = reducedMotion ? 1 : 1 + Math.sin(time * 4) * .12;
      pennant.rotation.y = reducedMotion ? 0 : Math.sin(time * 5) * Math.min(.35, Math.abs(speed));
    },
    dispose() {
      const materials = new Set<THREE.Material>();
      group.traverse(object => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          (Array.isArray(object.material) ? object.material : [object.material]).forEach(m => materials.add(m));
        }
      });
      materials.forEach(material => material.dispose()); textures.forEach(texture => texture.dispose()); rover.remove(group);
    },
  };
}
