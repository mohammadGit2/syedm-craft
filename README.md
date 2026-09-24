# Wildlight: Voxel Frontier

**Wildlight** is an original browser-based voxel adventure foundation: explore a sunlit procedural wilderness, reshape its terrain, and encounter roaming Glowhorns beneath a changing sky.

## Technology

TypeScript, Vite, and Three.js/WebGL. Chunk meshes contain only exposed voxel faces; blocks are not individual Three.js meshes.

## Run locally

```bash
npm install
npm run dev
```

Use `npm run build` for a production/typecheck build and `npm run preview` to serve it.

## Controls

| Input | Action |
| --- | --- |
| Click game | Capture mouse / look |
| WASD | Move |
| Shift | Sprint |
| Space | Jump |
| Left click | Mine targeted voxel |
| Right click | Place selected hotbar voxel |
| 1–9 / wheel | Choose hotbar slot |
| Escape | Release mouse |

## Implemented foundation

- Seeded procedural hills, beaches, water, forest trees, ores, chunk loading/unloading, and hidden-face voxel meshing.
- Responsive first-person movement with voxel collision, gravity, sprinting and jumping.
- Raycast targeting outline, voxel mining particles, validated block placement, resource pickup, functional hotbar and stacked inventory.
- A wandering, player-reactive **Glowhorn** creature, dynamic daylight, ambient fog, shadows, and a compact debug HUD.
- Versioned localStorage expedition saves for seed, player location, inventory, changed blocks and time.

## Architecture

- `src/blocks` — data-driven block definitions.
- `src/world` — deterministic terrain, chunk data/meshing, and modifications.
- `src/player` — input and collision controller.
- `src/inventory` — stack-based hotbar inventory.
- `src/entities` — reusable creature behavior entry point.
- `src/ui` and `src/save` — HUD/menu and persistence boundary.

## Next milestone

Add caves and richer biome rules, tool durability and recipes, combat/health, audio, better creature behaviors, structures, and a settings menu. Greedy chunk meshing and off-main-thread generation are intended performance upgrades after those systems are in place.
