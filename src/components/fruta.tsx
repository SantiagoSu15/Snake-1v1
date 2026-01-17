import type { fruit } from "../utils/Fruta/fruit.ts";
import type { Vector } from "../utils/Movimiento/vector.ts";

type fProps = {
    fruit : fruit;
    size: number;

};

const FruitComponent = ({fruit,size}:fProps) =>{
    const position : Vector= fruit.getPosition();
    const sizeCell: number = 100 / size;

    return(
        <>
         <div 
        className={` ${fruit.cssClass}`}
        style={{
            left: `${position.y * sizeCell}%`, 
            top: `${position.x * sizeCell}%`,  
            width: `${sizeCell}%`,
        }}
        
        /> 
        </>
       
    );
};

export default FruitComponent;