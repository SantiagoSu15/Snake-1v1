import { useGameLoop } from "./gameLoop";
import type { snake } from "../utils/Serpiente/snake";
import { useInputDirection } from "./inputDirection";
import { useEffect, useRef } from "react";


type SnakeMovementProps = {
    snakes: snake[];
    notifyUpdate: () => void;
    moveInterval: number; // tiempo entre movimientos (ms)
    twoPlayers: boolean;
};

export const useSnakeMovement = ({snakes, notifyUpdate,moveInterval,twoPlayers}: SnakeMovementProps) => {
    const player1Input = useInputDirection(false,twoPlayers);
    const player2Input = useInputDirection(true,twoPlayers);

    const player1InputRef = useRef(player1Input);
    const player2InputRef = useRef(player2Input);

    const snakesRef = useRef(snakes);
    const notifyRef = useRef(notifyUpdate);
    const accumulatedTime = useRef(0);

    useEffect(() => {
        player1InputRef.current = player1Input;
    }, [player1Input]);


     useEffect(() => {
        player2InputRef.current = player2Input;
    }, [player2Input]);

    useEffect(() => {
        snakesRef.current = snakes;
    }, [snakes]);

    useEffect(() => {
        notifyRef.current = notifyUpdate;
    }, [notifyUpdate]);

    useGameLoop((deltaTime: number) => {
        accumulatedTime.current += deltaTime * 1000; 

        if (accumulatedTime.current >= moveInterval) {
            const moves = Math.floor(accumulatedTime.current / moveInterval);
            accumulatedTime.current = accumulatedTime.current % moveInterval;

            for (let i = 0; i < moves; i++) {
                snakesRef.current.forEach((snake,index)=>{
                    let direction;
                    if(twoPlayers){
                        if(index ===0){
                            direction = player1InputRef.current;
                        }else{
                            direction = player2InputRef.current;
                        }
                    }else{
                        direction = ((index === 0) 
                            ? player1InputRef.current 
                            : { x: 0, y: 0 });
                    }
                    snake.update(direction, moveInterval / 1000);

                });
            };

            notifyRef.current();
        }
    });
};