import type { Vector } from "./vector.ts";


//clase abstracta para definir el comportamiento de movimiento de un objeto (serpiente, fruta, etc.)
export abstract class MovementStrategy {

  speed: number;

  constructor(speed: number) {
    this.speed = speed;
  }

    //metodo abstracto para calcular la velocidad del objeto
    abstract calculateVelocity( v: Vector,cV: Vector,time: number): Vector;
  }