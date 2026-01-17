import { MovementStrategy } from "./movementStrategy";
import type { Vector } from "./vector";


//movimiento lineal basado en un vector de velocidad simple no hay aceleracion o desaceleracion ni tampoco friccion osea frena al instante y acelera tmb al 
//instante
//velocidad = vector de velocidad / magnitud del vector de velocidad
export class LinearMovement extends MovementStrategy {
    calculateVelocity(v: Vector): Vector {
      const sizeVector = Math.sqrt(v.x ** 2 + v.y ** 2);

      if (sizeVector === 0) {
        return { x: 0, y: 0 };
      }
      
      return {
        x: (v.x / sizeVector) * this.speed,
        y: (v.y / sizeVector) * this.speed
      };
    }
  }