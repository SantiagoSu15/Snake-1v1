import type { System     } from "check2d";
import { Circle}from "check2d";
import  { PositionComponent } from "../Movimiento/positionComponent";
import type { Vector } from "../Movimiento/vector";
import type { snake } from "../Serpiente/snake";

export class fruitCircle extends Circle {
    parent!: fruit;
}

export abstract class fruit{
    protected positionComponent: PositionComponent;
    abstract cssClass : string;
    public hitbox: fruitCircle;
    private system: System;


    constructor(system: System, position: Vector) {
        this.system = system;
        this.positionComponent = new PositionComponent(position);
        this.hitbox = this.generateNewFruitCircle(position);

    }
    
    generateNewFruitCircle(v:Vector){
        const r = 0.4;
        const circle = new fruitCircle({ x: v.x, y: v.y }, r);
      
        this.system.insert(circle);
        circle.parent = this;        
        return circle;

    }

    getPosition():Vector{
        return this.positionComponent.getPosition();
    }

    destroy(): void {
        this.system.remove(this.hitbox);
    }

    abstract putEffect(s :snake):void;
};