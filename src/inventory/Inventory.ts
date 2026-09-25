import { ItemId, ITEMS } from '../items/ItemRegistry';
export type StoredItemId = ItemId | number;
export interface ItemStack { id: StoredItemId; count: number; durability?: number; }
export class Inventory {
  readonly slots: Array<ItemStack | null> = Array(27).fill(null); selected = 0;
  constructor() { this.slots[0]={id:'wood',count:12};this.slots[1]={id:'stone',count:18};this.slots[2]={id:'coal',count:4};this.slots[3]={id:'iron',count:3}; }
  add(id:StoredItemId,count=1,durability?:number){const max=typeof id==='number'?64:ITEMS[id].maxStack;for(const s of this.slots)if(s?.id===id&&!s.durability&&s.count<max){const take=Math.min(count,max-s.count);s.count+=take;count-=take;if(!count)return true;}for(let i=0;i<this.slots.length&&count;i++)if(!this.slots[i]){const take=Math.min(count,max);this.slots[i]={id,count:take,durability};count-=take;}return count===0;}
  has(id:ItemId,count:number){return this.slots.reduce((n,s)=>n+(s?.id===id?s.count:0),0)>=count;}
  remove(id:ItemId,count:number){if(!this.has(id,count))return false;for(const s of this.slots)if(s?.id===id){const take=Math.min(count,s.count);s.count-=take;count-=take;if(!s.count)this.slots[this.slots.indexOf(s)]=null;if(!count)return true;}return true;}
  craft(ingredients:Array<{id:ItemId;quantity:number}>,output:{id:ItemId;quantity:number}){if(!ingredients.every(i=>this.has(i.id,i.quantity)))return false;ingredients.forEach(i=>this.remove(i.id,i.quantity));return this.add(output.id,output.quantity);}
  selectedStack(){return this.slots[this.selected];} move(from:number,to:number){const a=this.slots[from],b=this.slots[to];if(!a)return; if(b?.id===a.id&&!a.durability&&!b.durability){b.count+=a.count;this.slots[from]=null;}else [this.slots[from],this.slots[to]]=[b,a];}
  consumeSelected(){const s=this.selectedStack();if(!s)return false;s.count--;if(s.count<=0)this.slots[this.selected]=null;return true;}
  label(index:number){const s=this.slots[index];return s?(typeof s.id==='number'?`Block ${s.id} · ${s.count}`:`${ITEMS[s.id].name} · ${s.count}`):'Empty';}
}
