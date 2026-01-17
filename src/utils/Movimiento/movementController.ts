import type { MovementStrategy } from "./movementStrategy";
import type { Vector } from "./vector";
import type { PositionComponent } from "./positionComponent";

//clase para controlar el movimiento de un objeto usando una estrategia de movimiento
export class MovementController {
    velocity: Vector = { x: 0, y: 0 }; 
    strategy: MovementStrategy; 

    constructor(strategy: MovementStrategy) {
        this.strategy = strategy;
    }

    update(v: Vector, t: PositionComponent, d: number): void {
      this.velocity = this.strategy.calculateVelocity(v, this.velocity, d);
    
      let finalMoveX: number = Math.floor(this.velocity.x * d);
      let finalMoveY: number= Math.floor(this.velocity.y * d);
      const moveX:number = this.velocity.x * d;
      const moveY: number = this.velocity.y * d


      
      if (v.x !== 0 && finalMoveX === 0 && moveX !== 0) {
        finalMoveX = moveX > 0 ? 1 : -1;
      }
      if (v.y !== 0 && finalMoveY === 0 && moveY !== 0) {
        finalMoveY = moveY > 0 ? 1 : -1;
      }
      
      t.translate({
        x: finalMoveX,
        y: finalMoveY
      });


    }
};