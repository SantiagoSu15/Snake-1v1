import { useState, useRef, useEffect, useCallback } from 'react';


type PlayerConfi = {
  up: string,
  down: string,
  left: string,
  right: string
};



const Player_Configs: Record<string,PlayerConfi> ={
  player1: {
      up: 'w',
      down: 's',
      left: 'a',
      right: 'd',
    },
    player2: {
      up: 'arrowup',
      down: 'arrowdown',
      left: 'arrowleft',
      right: 'arrowright',
    },
}




export const useInputDirection = (playerConfi:string,mode:string, resetKey?: number) => {
  const [directionValue, setDirection] = useState({ x: 0, y: 0 });
  const keyDic = useRef<Record<string, boolean>>({});
  const lastValidKey = useRef<string | null>(null);

  const config = Player_Configs[playerConfi];

  useEffect(() => {
    if (resetKey !== undefined) {
      setDirection({ x: 0, y: 0 });
      keyDic.current = {};
      lastValidKey.current = null;
    }
  }, [resetKey]);

  const update = useCallback(() => {
    const direction = { x: 0, y: 0 };

    const key = lastValidKey.current;

    const allKeys = (mode === "Single") ? Object.values(Player_Configs) : [config]

    for(const playerKeys of allKeys){
      if (key === playerKeys.up) direction.x = -1;
      else if (key === playerKeys.down) direction.x = 1;
      else if (key === playerKeys.left) direction.y = -1;
      else if (key === playerKeys.right) direction.y = 1;
      
      if (direction.x !== 0 || direction.y !== 0) break;
    }

    setDirection(direction);
    

    
  }, [config, mode]);

  useEffect(() => {
    const validKeys = Object.values(config);
    
    const allValidKeys = mode === 'Single'
      ? Object.values(Player_Configs).flatMap(c => Object.values(c))
      : validKeys; 

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (!allValidKeys.includes(key)) return;
      if (e.repeat) return; 
      e.preventDefault();

      const isValidForThisPlayer = validKeys.includes(key);
      if (mode === 'multi' && !isValidForThisPlayer) return;



      keyDic.current[key] = true;
      lastValidKey.current = key;
      update();
       
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (keyDic.current[key]) {
        keyDic.current[key] = false;
      };



    };
   

    window.addEventListener('keydown', handleKeyDown);
    //window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [update]);

  return directionValue;
};