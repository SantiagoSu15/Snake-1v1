import type { Vector } from "../Movimiento/vector.ts";


//interfaz para mover un objeto x 
export interface Movible {
    move(direction: Vector, d: number): void;
    getPosition(): Vector;
    getVelocity(): Vector;
  }