/** A level exhibition district, with the rougher moon kept beyond the main route. */
export function moonTerrainHeight(x: number, z: number) {
  const distance = Math.hypot(x, z);
  const t = Math.max(0, Math.min(1, (distance - 70) / 35));
  const outskirts = t * t * (3 - 2 * t);
  const relief = Math.sin(x * .032) * Math.cos(z * .028) * 1.6
    + Math.sin((x + z) * .045) * .55;
  let height = Math.sin(x * .08) * Math.cos(z * .07) * .035 + relief * outskirts;
  // Shallow, deliberately placed craters never intersect a project or the landing plaza.
  for (const [cx, cz, radius] of [[-96, -38, 13], [90, -55, 16], [-70, 90, 12], [98, 58, 14]]) {
    const d = Math.hypot(x - cx, z - cz) / radius;
    if (d < 1) height -= .9 * (1 - d * d) ** 2;
  }
  return height;
}
