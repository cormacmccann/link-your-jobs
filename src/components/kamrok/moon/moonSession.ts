/** Keep the moon parked while a visitor reads a full case study in the same tab. */
export const moonSession = {
  entered: false,
  rover: { x: 0, z: 8, heading: Math.PI },
  visited: [] as string[],
};
