import { useEffect,useRef,useCallback } from "react";

type GameLoopCallback = (deltaTime: number) => void; //definir la funcion como objeto 




export const useGameLoop = (callback: GameLoopCallback) =>{
    const lastTime = useRef(0);
    const animationRef = useRef<number | null>(null);
    const callbackRef = useRef(callback); 

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);
    

    useEffect(() => {
        const loop = (currentTime: number) => {
            const deltaTime = (currentTime - lastTime.current) / 1000;
            lastTime.current = currentTime;

            if (deltaTime > 0.1) {
                animationRef.current = requestAnimationFrame(loop);
                return;
            }

            callbackRef.current(deltaTime);

            animationRef.current = requestAnimationFrame(loop);
        };

        animationRef.current = requestAnimationFrame(loop);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);


   


};