import type { Vector } from "../utils/Movimiento/vector";
import type { snake } from "../utils/Serpiente/snake";

type sProps = {
    snake : snake;
    size: number;

};

const SnakeComponent = ({ snake, size }: sProps) => {
    const positions: Vector[] = snake.getPositions();  
    const headPos: Vector = snake.getPosition();              
    const sizeCell: number = 100 / size;

    return (
        <>
            <div 
                className="SnakeHead"
                style={{
                    left: `${headPos.y * sizeCell}%`, 
                    top: `${headPos.x * sizeCell}%`,  
                    width: `${sizeCell}%`,
                }}
            />
            
            {positions.map((node, idx) => (
                <div 
                    key={idx} 
                    className="SnakeNode"
                    style={{
                        left: `${node.y * sizeCell}%`, 
                        top: `${node.x * sizeCell}%`,  
                        width: `${sizeCell}%`,
                    }}
                />
            ))}
        </>
    );
};
export default SnakeComponent;