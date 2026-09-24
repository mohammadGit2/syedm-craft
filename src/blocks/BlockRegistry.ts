import { Color } from 'three';

export type BlockId = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export interface BlockDefinition { id: BlockId; key: string; name: string; color: Color; solid: boolean; transparent?: boolean; hardness: number; }

const raw: Array<Omit<BlockDefinition, 'color'> & { color: number }> = [
  { id: 0, key: 'air', name: 'Air', color: 0x000000, solid: false, transparent: true, hardness: 0 },
  { id: 1, key: 'meadow', name: 'Meadow Turf', color: 0x5d9146, solid: true, hardness: .35 },
  { id: 2, key: 'loam', name: 'Amber Loam', color: 0x8b5638, solid: true, hardness: .45 },
  { id: 3, key: 'stone', name: 'Slate', color: 0x61707b, solid: true, hardness: .9 },
  { id: 4, key: 'sand', name: 'Sun Sand', color: 0xc8a866, solid: true, hardness: .35 },
  { id: 5, key: 'wood', name: 'Emberwood', color: 0x70462f, solid: true, hardness: .65 },
  { id: 6, key: 'leaves', name: 'Canopy', color: 0x2f6b45, solid: true, transparent: true, hardness: .2 },
  { id: 7, key: 'water', name: 'Lumenwater', color: 0x2688a9, solid: false, transparent: true, hardness: 0 },
  { id: 8, key: 'glass', name: 'Prism Glass', color: 0xa9e6e5, solid: true, transparent: true, hardness: .25 },
  { id: 9, key: 'coal', name: 'Night Coal', color: 0x2a3036, solid: true, hardness: 1.1 },
  { id: 10, key: 'iron', name: 'Dawn Iron', color: 0xa97a61, solid: true, hardness: 1.25 }
];
export const BLOCKS = raw.map((b) => ({ ...b, color: new Color(b.color) })) as BlockDefinition[];
export const block = (id: number): BlockDefinition => BLOCKS[id] ?? BLOCKS[0];
export const placeableIds: BlockId[] = [1, 2, 3, 4, 5, 6, 8, 9, 10];
