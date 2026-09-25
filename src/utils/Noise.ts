export function hash2(x: number, z: number, seed: number): number { const n = Math.sin(x * 127.1 + z * 311.7 + seed * 74.7) * 43758.5453123; return n - Math.floor(n); }
export function smoothNoise(x: number, z: number, seed: number): number {
  const xi = Math.floor(x), zi = Math.floor(z), tx = x - xi, tz = z - zi;
  const fade = (v: number) => v * v * (3 - 2 * v);
  const a = hash2(xi, zi, seed), b = hash2(xi + 1, zi, seed), c = hash2(xi, zi + 1, seed), d = hash2(xi + 1, zi + 1, seed);
  return a + (b - a) * fade(tx) + (c - a - (b - a)) * fade(tz) + (a - b - c + d) * fade(tx) * fade(tz);
}
export function fractalNoise(x: number, z: number, seed: number): number { let value = 0, amp = 1, norm = 0, freq = .015; for (let i = 0; i < 4; i++) { value += smoothNoise(x * freq, z * freq, seed + i * 31) * amp; norm += amp; amp *= .5; freq *= 2; } return value / norm; }
