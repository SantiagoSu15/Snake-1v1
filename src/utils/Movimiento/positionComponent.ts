import type { Vector } from "./vector";


//guardar info de la posicion (espacial) de un  objeto 
export class PositionComponent {
    position: Vector;

    constructor(position: Vector) {
        this.position = position;
    }

    translate(v: Vector): void {
        this.position.x += v.x;
        this.position.y += v.y;
      }
    
    getPosition() : Vector{
        return this.position;
    }


};