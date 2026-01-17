import {snakeNode} from "./snakeNode.js"
import type { Vector } from "../Movimiento/vector.js";


export class snakeBody<T extends Vector>{
    head: snakeNode<T> | null;  //La cabeza de la serpiente o de la lista 
    tail: snakeNode<T> | null; //la cola de la serpiente;

    constructor(origen: Vector) {
      const newNode = new snakeNode<T>({ ...origen });  // ... es spread osea copiar el objeto porq si llega a cambiar el vector cambiaria todo 
      this.head = newNode;
      this.tail = newNode;
    };

    lengthenSnake(position: Vector): void {
        const snakeBodyNode = new snakeNode<T>({...position}); // crear una nueva parte del cuerpo de la serpiente 
    
        if (!this.head) {
          this.head = snakeBodyNode;
          this.tail = snakeBodyNode;
          return;
        }


        let cola = this.tail;
        cola!.next = snakeBodyNode;
        this.tail = snakeBodyNode;

        // comenzar con la cabeza para recorrer la lista
        //while (momento.next) {  // mientras exista un nodo diferente a null recorrer hasta llegar al q apunte a null
            //momento = momento.next; 
        //}
        //momento.next = snakeBodyNode; // ahora en vez de apuntar a null apuntara al nuevo nodo 
      };


      getAllPositions(): Vector[]{
        const positions: Vector[] = [];

        let current = this.head;

        while(current){
          let p = current.value;
          positions.push({ x: p.x, y: p.y });
          current = current.next;
        }
        return positions;
      }

    

};