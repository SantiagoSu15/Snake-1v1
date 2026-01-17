import { snakeBody } from "./snakeBody";
import type { Movible } from "../Movimiento/movible";
import { MovementController } from "../Movimiento/movementController";
import { LinearMovement } from "../Movimiento/linearMovement";
import type { Vector } from "../Movimiento/vector";
import  { PositionComponent } from "../Movimiento/positionComponent";

import { System, Circle} from 'detect-collisions';

export class SnakeCircle extends Circle {
    parent!: snake;
    segmentType!: 'head' | 'body';
    segmentIndex?: number;
}

export class snake implements Movible{

    private size:number | null;
    private body: snakeBody<Vector> | null;
    private inputDirection : Vector = {x:0,y:0}; // haica q direccion se mueve la serpiente
    private movecontroller: MovementController;
    private positionComponent: PositionComponent;
    private speed: number;
    private positionsHistory: Vector[] =[];
    private headHitbox: SnakeCircle;
    private bodyHitboxes: SnakeCircle[] = [];
    private system:System;
    private boardSize:number;
    private isDead:boolean = false;

    constructor(system: System,origen : Vector, speed: number,board:number) {
        this.speed = speed;
        this.size = 0;
        this.movecontroller = new MovementController(new LinearMovement(this.speed));
        this.positionComponent = new PositionComponent({ ...origen });
        //this.body = new snakeBody({ ...this.positionComponent.position })
        this.body = null;
        this.system = system;

        this.headHitbox = this.createCircleHitbox(origen, 'head');
        this.boardSize = board;
    };


    private createCircleHitbox(pos: Vector, type: 'head' | 'body', index?: number): SnakeCircle {
      const radius = 0.4; 
      const circle = new SnakeCircle({ x: pos.x, y: pos.y }, radius);
      
      this.system.insert(circle);
      circle.parent = this;
      circle.segmentType = type;
      circle.segmentIndex = index;
      
      return circle;
  }  

    posNoOutOfBounds(pos: Vector):Vector{
      return {
        x:Math.max(0,Math.min(this.boardSize-1,pos.x)),
        y:Math.max(0,Math.min(this.boardSize-1,pos.y))
      }

    }
   
    move(direction: Vector, d: number): void {
      const currentHeadPos: Vector = { 
          x: this.positionComponent.position.x,
          y: this.positionComponent.position.y
      };
      
      this.movecontroller.update(direction, this.positionComponent, d);
      
      this.positionsHistory.unshift(currentHeadPos);
      
      if (this.positionsHistory.length > this.size! + 5) {
          this.positionsHistory.pop();
      }
      
      const newHeadPos = this.getPosition();
      this.headHitbox.setPosition(newHeadPos.x, newHeadPos.y);
      
      if (this.body === null) return;
      
      let current = this.body.head;
      let i = 0;
  
      while (current && i < this.positionsHistory.length) {
          current.value.x = this.positionsHistory[i].x;
          current.value.y = this.positionsHistory[i].y;
          
          if (this.bodyHitboxes[i]) {
              this.bodyHitboxes[i].setPosition(
                  this.positionsHistory[i].x,
                  this.positionsHistory[i].y
              );
          }
          
          current = current.next;
          i++;
      }
  }
    

    growAt(v:Vector){
      this.size!++;
      if(this.body === null){
        this.body = new snakeBody(v);
      }else{
        this.body.lengthenSnake(v);

      }
    }

    grow(){
      this.size!++;

      if(this.body===null){
        const lastPos = this.positionsHistory[0] || this.getPosition();
        this.body = new snakeBody({ ...lastPos });
        const newHitbox = this.createCircleHitbox(lastPos, 'body', 0);
        this.bodyHitboxes.push(newHitbox);
      }else{
        const index = this.size! - 1;
        const newPos = this.positionsHistory[index] || this.body.tail!.value;
        this.body.lengthenSnake({ ...newPos });
        const newHitbox = this.createCircleHitbox(newPos, 'body', this.bodyHitboxes.length);
        this.bodyHitboxes.push(newHitbox);
      }
    
    }

    checkAutoCollision() : boolean{
      const posible  = this.system.getPotentials(this.headHitbox);

      for(const p of posible){
        if(p instanceof SnakeCircle && p.parent === this && p.segmentType === 'body'){
         
          if (p.segmentIndex !== undefined && p.segmentIndex >= 4) {
            if (this.system.checkCollision(this.headHitbox, p)) {
                return true;
            }
        }
        }
      }
      return false;
    }

    destroy(){
      this.system.remove(this.headHitbox);
      this.bodyHitboxes.forEach(c=>this.system.remove(c));
      this.bodyHitboxes = [];
      this.isDead = true;
    }

    getPositions(): Vector[]{
      if(this.body != null){
        return [...this.body.getAllPositions()]
      }
      return [];
    }

    getPosition(): Vector {
      return this.positionComponent.position;
    }

    getVelocity(): Vector {
      return this.movecontroller.velocity;
    }

   

    update(direction: Vector, d:number):void{
      this.move(direction,d);
    }

    getHeadHitBox(){
      return this.headHitbox
    }

    getIsDead():boolean{
      return this.isDead;
    }

    getInputdirection(){
      return this.inputDirection;
    }
};
