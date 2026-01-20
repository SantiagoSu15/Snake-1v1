
import { useState, useRef, useCallback, useEffect } from "react";
import TableroComponent from "../components/tablero";
import { useSnakeMovement } from "./playerMovement";
import  { game } from "../utils/game";
import { MensajePartida } from "../components/mensajePartida";
import { useNavigate } from "react-router-dom";

export type gameInfo ={
    twoPlayers : boolean
}



export const GameCom = ({twoPlayers}: gameInfo) => {
    const speed: number = 1;
    const boardSize: number = 25;
    const [gameInstance,setGameInstance] = useState(() => new game(boardSize, speed,twoPlayers));
    const [entities, setEntities] = useState(() => gameInstance.getEntities());
    const [gameOver,setGameOver] = useState(false);
    const [finalMessage,setFinalMessage] = useState("");
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
            if (gameOver) return;
            const result = gameInstance.update();

            setEntities(result.gameEntities);

            if (result.gameResult) {
                setGameOver(true);
                setFinalMessage("Gano el jugador");
                //setGameInstance(null)
            }
                lastRenderTime.current = now;
                renderRequestRef.current = null;
        });
    }, [gameInstance,gameOver]);

    useSnakeMovement({
        snakes: entities.snakes,
        notifyUpdate: scheduleRender,
        moveInterval: 100,
        twoPlayers: twoPlayers
    });

    

    useEffect(() => {
        return () => {
            if (renderRequestRef.current) {
                cancelAnimationFrame(renderRequestRef.current);
            }
        };
    }, [gameInstance]);


    const resetGame = () => {
        const newGame = new game(boardSize, speed, twoPlayers);
    
        setGameInstance(newGame);
        setEntities(newGame.getEntities());
        setGameOver(false);
        setFinalMessage("");
        lastRenderTime.current = 0;
    };
    
    const navigate = useNavigate();
    
    return (
        <>
            {gameOver ? (
                <MensajePartida mensaje={finalMessage}  onReset={resetGame} onMenu={() => navigate("/Snake-1v1")} />
            ) : (
                <TableroComponent
                    snakeList={entities.snakes}
                    fruitList={entities.fruits}
                    size={boardSize}
                />
            )}
        </>
    );
    };