import type { Inventory } from '../inventory/Inventory';
export interface SaveData { version:1; seed:number; position:[number,number,number]; time:number; selected:number; slots:Inventory['slots']; changes:[string,number][]; }
const KEY='wildlight-expedition-v1';
export const saveGame=(data:SaveData)=>localStorage.setItem(KEY,JSON.stringify(data));
export const loadGame=():SaveData|undefined=>{try{const raw=localStorage.getItem(KEY);if(!raw)return;const data=JSON.parse(raw) as SaveData;return data.version===1?data:undefined;}catch{return undefined;}};
