import { System } from "check2d";
import  { snake } from "./Serpiente/snake";
import { fruit } from "./Fruta/fruit";
import { collisionController } from "./Colisiones/collisionController";
import { manzana } from "./Fruta/manzana";




export type entities = {
    snakes: snake[],
    fruits: fruit[]
}


export class game{
    private system : System;
    private snakes : snake[];
    private fruits : fruit[];
    private boardSize : number;
    private collisionManager : collisionController;
    private multiplayer:boolean;

    constructor(boardSize:number,speed:number,twoPlayers:boolean){
        this.system = new System();
        this.snakes = [];
        this.fruits = [];
        this.boardSize = boardSize;
        this.collisionManager = new collisionController(this.system);
        this.multiplayer = twoPlayers;

        this.createInitial(speed)
  
    }

    createInitial(speed:number){
        const snakeOne = new snake(this.system,{x:5,y:5},speed,this.boardSize);
        let snakeTwo = null;
        if (this.multiplayer) {
            console.log("multi")
            snakeTwo = new snake(this.system, { x: 25, y: 25 }, speed, this.boardSize);
        }       
        this.snakes.push(snakeOne);

        if(snakeTwo !== null){
            this.snakes.push(snakeTwo);
        }
        for (let i = 0; i < 3; i++) {
            this.spawnFruit();
        }
    }


    spawnFruit(){
        const f = this.fruits.length;
        if(f>=5) return;

        const randomNumber = Math.floor(Math.random() * (10 - 0 + 1)) + 0;
        const randomFruitNumber = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
       
        if(randomNumber > 5){
            for(let i=0;i<randomFruitNumber;i++){
                const randomVectorX = Math.floor(Math.random() * (this.boardSize- 0 + 1)) + 0;
                const randomVectorY = Math.floor(Math.random() * (this.boardSize- 0 + 1)) + 0;
        
                const fruit = new manzana(this.system,{x:randomVectorX,y:randomVectorY})
                this.fruits.push(fruit);
            }
        }

    }

    getEntities(){
        const ent = {
            snakes : this.snakes,
            fruits: this.fruits
        }
        return ent;
    }

    update(): entities {
        this.spawnFruit();
        this.collisionManager.update();
    
        this.snakes.forEach((sna) => {
    
            if (sna.getIsDead()) return;
    
            if (sna.checkAutoCollision()) {
                sna.destroy();
            }
    
            this.collisionManager.checkSnakesCollision(sna);
    
            const eatFruit = this.collisionManager.checkFruitCollision(sna);
            this.fruits = this.fruits.filter(f => !eatFruit.includes(f));
    
            if (this.collisionManager.checkWallCollision(sna, this.boardSize)) {
                sna.destroy();
            }
        });
    
        this.snakes = this.snakes.filter(s => !s.getIsDead());
    
        return this.getEntities();
    }
}