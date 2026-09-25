import { BufferGeometry, Float32BufferAttribute, Group, Mesh, MeshLambertMaterial, Vector3 } from 'three';
import { block, BlockId } from '../blocks/BlockRegistry';
import type { World } from './World';

export const CHUNK_SIZE = 16, WORLD_HEIGHT = 48;
const directions = [
  { n: [0, 1, 0], c: [[0,1,0],[1,1,0],[1,1,1],[0,1,1]] }, { n: [0,-1,0], c: [[0,0,1],[1,0,1],[1,0,0],[0,0,0]] },
  { n: [1,0,0], c: [[1,0,1],[1,1,1],[1,1,0],[1,0,0]] }, { n: [-1,0,0], c: [[0,0,0],[0,1,0],[0,1,1],[0,0,1]] },
  { n: [0,0,1], c: [[0,0,1],[0,1,1],[1,1,1],[1,0,1]] }, { n: [0,0,-1], c: [[1,0,0],[1,1,0],[0,1,0],[0,0,0]] }
];

export class Chunk {
  readonly blocks = new Uint8Array(CHUNK_SIZE * WORLD_HEIGHT * CHUNK_SIZE); readonly group = new Group();
  constructor(readonly world: World, readonly cx: number, readonly cz: number) { this.group.position.set(cx * CHUNK_SIZE, 0, cz * CHUNK_SIZE); }
  index(x: number, y: number, z: number) { return x + CHUNK_SIZE * (z + CHUNK_SIZE * y); }
  get(x: number, y: number, z: number): BlockId { return x < 0 || x >= CHUNK_SIZE || z < 0 || z >= CHUNK_SIZE || y < 0 || y >= WORLD_HEIGHT ? 0 : this.blocks[this.index(x, y, z)] as BlockId; }
  set(x: number, y: number, z: number, id: BlockId) { if (x >= 0 && x < CHUNK_SIZE && z >= 0 && z < CHUNK_SIZE && y >= 0 && y < WORLD_HEIGHT) this.blocks[this.index(x, y, z)] = id; }
  rebuild() {
    this.group.clear(); const opaque: number[] = [], transparent: number[] = [];
    for (let y=0;y<WORLD_HEIGHT;y++) for (let z=0;z<CHUNK_SIZE;z++) for (let x=0;x<CHUNK_SIZE;x++) {
      const id=this.get(x,y,z); if (!id) continue; const target=block(id).transparent ? transparent : opaque;
      directions.forEach((face) => { const nx=x+face.n[0], ny=y+face.n[1], nz=z+face.n[2]; const neighbor=this.world.getBlock(this.cx*CHUNK_SIZE+nx,ny,this.cz*CHUNK_SIZE+nz); if (!neighbor || (block(id).transparent && neighbor !== id)) { const shade=face.n[1]===1?1:face.n[1]===-1?.62:(face.n[0]===1?.78:.7); const color=block(id).color; for (const corner of face.c) target.push(x+corner[0],y+corner[1],z+corner[2],color.r*shade,color.g*shade,color.b*shade); } });
    }
    this.addMesh(opaque, false); this.addMesh(transparent, true);
  }
  private addMesh(data: number[], transparent: boolean) { if (!data.length) return; const pos:number[]=[], colors:number[]=[]; for(let i=0;i<data.length;i+=24){ const q=[i,i+6,i+12,i+18]; for(const t of [0,1,2,0,2,3]) { const k=q[t];pos.push(data[k],data[k+1],data[k+2]);colors.push(data[k+3],data[k+4],data[k+5]); } } const geometry=new BufferGeometry(); geometry.setAttribute('position',new Float32BufferAttribute(pos,3));geometry.setAttribute('color',new Float32BufferAttribute(colors,3));geometry.computeVertexNormals(); const mesh=new Mesh(geometry,new MeshLambertMaterial({vertexColors:true,transparent,opacity:transparent?.66:1,depthWrite:!transparent}));mesh.castShadow=!transparent;mesh.receiveShadow=true;this.group.add(mesh); }
}
