import { useEffect, useRef } from "react";
import type { Vector } from "../utils/Movimiento/vector";
import type { snake } from "../utils/Serpiente/snake";

type sProps = {
    snake: snake;
    size: number;
};

const getRotation = (dir: Vector) => {
    if (dir.x === -1) return 90;         //arriba
    if (dir.x === 1) return -90;        //abajo
    if (dir.y === -1) return 0;        //izq
    if (dir.y === 1) return 180;      //derecha
    return 0;
};

const SnakeComponent = ({ snake, size }: sProps) => {
    let positions: Vector[] = snake.getPositions();
    const tailPos: Vector | undefined = positions.pop(); 
    const headPos: Vector = { ...snake.getPosition() };
    const sizeCell: number = 100 / size;
    
    const prevHeadPos = useRef<Vector>({ x: headPos.x, y: headPos.y });
    
    const headDirection = {
        x: headPos.x - prevHeadPos.current.x,
        y: headPos.y - prevHeadPos.current.y
    };

    const headRotation = getRotation(headDirection);
    
    useEffect(() => {
        prevHeadPos.current = { x: headPos.x, y: headPos.y };
    }, [headPos.x, headPos.y]);

    return (
        <>
            <div 
                className="Snake"
                style={{
                    left: `${headPos.y * sizeCell}%`, 
                    top: `${headPos.x * sizeCell}%`,  
                    width: `${sizeCell}%`,
                }}
            >
                <div className="SnakHeadIcon"
                    style={{
                        transform: `rotate(${headRotation}deg)`,
                    }}
                />
            </div> 
            
            {positions.map((node, idx) => {
                const nextPos = idx === 0 ? headPos : positions[idx - 1];
                const direction = {
                    x: nextPos.x - node.x,
                    y: nextPos.y - node.y
                };
                const nodeRotation = getRotation(direction);
                
                return (
                    <div 
                        key={idx} 
                        className="Snake"
                        style={{
                            left: `${node.y * sizeCell}%`, 
                            top: `${node.x * sizeCell}%`,  
                            width: `${sizeCell}%`,
                        }}
                    >
                        <div className="SnakeNodeIcon"
                            style={{
                                transform: `rotate(${nodeRotation}deg)`,
                            }}
                        />
                    </div>
                );
            })}
            
            {tailPos && (
                <div 
                    className="Snake"
                    style={{
                        left: `${tailPos.y * sizeCell}%`,
                        top: `${tailPos.x * sizeCell}%`,
                        width: `${sizeCell}%`,
                    }}
                >
                    <div className="SnakeTailIcon"
                        style={{
                            transform: `rotate(${getRotation({
                                x: (positions.length > 0 ? positions[positions.length-1].x : headPos.x) - tailPos.x,
                                y: (positions.length > 0 ? positions[positions.length-1].y : headPos.y) - tailPos.y
                            })}deg)`,
                        }}
                        />
                </div>
            )}
        </>
    );
};

export default SnakeComponent;