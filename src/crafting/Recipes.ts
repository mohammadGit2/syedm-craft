import { ItemId } from '../items/ItemRegistry';

export interface Recipe { id: string; label: string; output: { id: ItemId; quantity: number }; ingredients: Array<{ id: ItemId; quantity: number }>; }
export const RECIPES: Recipe[] = [
  { id: 'torch', label: 'Lumen Torch', output: { id: 'torch', quantity: 4 }, ingredients: [{ id: 'wood', quantity: 1 }, { id: 'coal', quantity: 1 }] },
  { id: 'wood-pick', label: 'Emberwood Pick', output: { id: 'wood_pickaxe', quantity: 1 }, ingredients: [{ id: 'wood', quantity: 3 }] },
  { id: 'stone-pick', label: 'Slate Pick', output: { id: 'stone_pickaxe', quantity: 1 }, ingredients: [{ id: 'wood', quantity: 2 }, { id: 'stone', quantity: 3 }] },
  { id: 'iron-pick', label: 'Dawn Pick', output: { id: 'iron_pickaxe', quantity: 1 }, ingredients: [{ id: 'wood', quantity: 2 }, { id: 'iron', quantity: 3 }] },
  { id: 'blade', label: 'Emberwood Blade', output: { id: 'wood_sword', quantity: 1 }, ingredients: [{ id: 'wood', quantity: 2 }] },
  { id: 'crate', label: 'Trail Crate', output: { id: 'crate', quantity: 1 }, ingredients: [{ id: 'wood', quantity: 6 }] }
];
