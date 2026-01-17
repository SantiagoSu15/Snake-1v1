import type { Vector } from "../Movimiento/vector.js";


export class snakeNode<T extends Vector> { // la t es cualquier dato 
    value: T; // el dato guardado (posicion en este casoi ya q  es tener referencia del nodo nomas)
    next: snakeNode<T> | null; // el nodo siguiente o null 

    constructor(position: Vector) {
      this.value = { x: position.x, y: position.y } as T;
      this.next = null;
    }
  }
  