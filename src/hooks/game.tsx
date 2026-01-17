
import { useState, useRef, useCallback, useEffect } from "react";
import TableroComponent from "../components/tablero";
import { useSnakeMovement } from "./playerMovement";
import  { game } from "../utils/game";




export const GameCom = () => {
    const speed: number = 1;
    const boardSize: number = 55;

    const [gameInstance] = useState(() => new game(boardSize, speed));
    const [entities, setEntities] = useState(() => gameInstance.getEntities());

    const renderRequestRef = useRef<number | null>(null);
    const lastRenderTime = useRef(0);
    const MIN_RENDER_INTERVAL = 1000 / 30; 

    


    const scheduleRender = useCallback(() => {
        const now = performance.now();
        
        if (now - lastRenderTime.current < MIN_RENDER_INTERVAL) {
            return;
        }

        if (renderRequestRef.current) {
            cancelAnimationFrame(renderRequestRef.current);
        }

        renderRequestRef.current = requestAnimationFrame(() => {
            gameInstance.update();
            
            setEntities(gameInstance.getEntities());
            
            lastRenderTime.current = now;
            renderRequestRef.current = null;
        });
    }, [gameInstance]);

    useSnakeMovement({
        snakes: entities.snakes,
        notifyUpdate: scheduleRender,
        moveInterval: 100,
        twoPlayers: entities.snakes.length ===2
    });

    

    useEffect(() => {
        return () => {
            if (renderRequestRef.current) {
                cancelAnimationFrame(renderRequestRef.current);
            }
            //gameInstance.destroy();
        };
    }, [gameInstance]);
    
    return <TableroComponent snakeList={entities.snakes} fruitList={entities.fruits} size={boardSize}/>;
};