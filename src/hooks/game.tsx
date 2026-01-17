
import { useState, useRef, useCallback, useEffect } from "react";
import { snake } from "../utils/Serpiente/snake";
import TableroComponent from "../components/tablero";
import { useSnakeMovement } from "./playerMovement";
import { System } from "check2d";
import  { game } from "../utils/game";


const system = new System();
const s = new snake(system,{x:5,y:5},1,50);
s.grow();
s.grow();
s.grow();
s.grow();

const s2 = new snake(system,{x:25,y:25},1,50);
s2.grow();
s2.grow();


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
    
    return <TableroComponent snakeList={entities.snakes} fruitList={entities.fruits}/>;
};