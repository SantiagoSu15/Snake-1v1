import type { System } from "check2d";
import { SnakeCircle, type snake } from "../Serpiente/snake";
import { fruit, fruitCircle } from "../Fruta/fruit";

export class collisionController{
    protected system : System;

    constructor(s:System){
        this.system = s;
    }
    
    checkWallCollision(snake:snake,boardSize:number) :boolean{
        const headPos = snake.getPosition();
        return headPos.x < 0 || headPos.x >= boardSize ||
               headPos.y < 0 || headPos.y >= boardSize;
    }

    checkFruitCollision(snake:snake): fruit[]{
        const potentials = this.system.getPotentials(snake.getHeadHitBox());

        const eatenFruits : fruit[] = []

        for(const p of potentials ){
            const fBody = p as fruitCircle;
            if(p  instanceof fruitCircle){
                if (this.system.checkCollision(snake.getHeadHitBox(), p)) {
                    const fruitEntity : fruit = fBody.parent as fruit;
                    fruitEntity.putEffect(snake);
                    eatenFruits.push(fruitEntity);
                }
            }
        }

        return eatenFruits;

    }

    checkSnakesCollision(snake:snake){
        const potentials = this.system.getPotentials(snake.getHeadHitBox());

        for(const p of potentials){
            const pBody = p as SnakeCircle;
            if(p instanceof SnakeCircle && p.parent !== snake){
                if(this.system.checkCollision(snake.getHeadHitBox(),p)){
                    if(pBody.segmentType === 'head'){
                        snake.destroy();
                        pBody.parent.destroy();
                    }else{snake.destroy();
                    }
                    
                }

            }
        }
    }
   

    update(){
        this.system.update();
    }
}