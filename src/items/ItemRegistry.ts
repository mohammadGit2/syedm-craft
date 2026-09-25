export type ItemId = 'wood' | 'stone' | 'iron' | 'coal' | 'torch' | 'wood_pickaxe' | 'stone_pickaxe' | 'iron_pickaxe' | 'wood_sword' | 'crate';

export interface ItemDefinition {
  id: ItemId;
  name: string;
  color: string;
  maxStack: number;
  tool?: { kind: 'pickaxe' | 'sword'; tier: 0 | 1 | 2; speed: number; durability: number };
}

export const ITEMS: Record<ItemId, ItemDefinition> = {
  wood: { id: 'wood', name: 'Emberwood', color: '#70462f', maxStack: 64 },
  stone: { id: 'stone', name: 'Slate', color: '#61707b', maxStack: 64 },
  iron: { id: 'iron', name: 'Dawn Iron', color: '#a97a61', maxStack: 64 },
  coal: { id: 'coal', name: 'Night Coal', color: '#2a3036', maxStack: 64 },
  torch: { id: 'torch', name: 'Lumen Torch', color: '#ffd36d', maxStack: 32 },
  wood_pickaxe: { id: 'wood_pickaxe', name: 'Emberwood Pick', color: '#b47645', maxStack: 1, tool: { kind: 'pickaxe', tier: 0, speed: 1.7, durability: 90 } },
  stone_pickaxe: { id: 'stone_pickaxe', name: 'Slate Pick', color: '#92a2ae', maxStack: 1, tool: { kind: 'pickaxe', tier: 1, speed: 2.7, durability: 180 } },
  iron_pickaxe: { id: 'iron_pickaxe', name: 'Dawn Pick', color: '#d7a98f', maxStack: 1, tool: { kind: 'pickaxe', tier: 2, speed: 4, durability: 360 } },
  wood_sword: { id: 'wood_sword', name: 'Emberwood Blade', color: '#dd9d5b', maxStack: 1, tool: { kind: 'sword', tier: 0, speed: 1, durability: 120 } },
  crate: { id: 'crate', name: 'Trail Crate', color: '#a26c42', maxStack: 16 }
};
