import { useState, useRef, useEffect, useCallback } from 'react';

export const useInputDirection = (secondPLayer:boolean,twoPlayers:boolean) => {
  const [directionValue, setDirection] = useState({ x: 0, y: 0 });
  const keyDic = useRef<Record<string, boolean>>({});



  const update = useCallback(() => {
    const direction = { x: 0, y: 0 };

    const up    = secondPLayer ? 'arrowup'    : 'w';
    const down  = secondPLayer ? 'arrowdown'  : 's';
    const left  = secondPLayer ? 'arrowleft'  : 'a';
    const right = secondPLayer ? 'arrowright' : 'd';


    if (!twoPlayers) {
      if (keyDic.current['w'] || keyDic.current['arrowup']) direction.x = -1;
      if (keyDic.current['s'] || keyDic.current['arrowdown']) direction.x = 1;
      if (keyDic.current['a'] || keyDic.current['arrowleft']) direction.y = -1;
      if (keyDic.current['d'] || keyDic.current['arrowright']) direction.y = 1;
    } else {
      if (keyDic.current[up]) direction.x = -1;
      if (keyDic.current[down]) direction.x = 1;
      if (keyDic.current[left]) direction.y = -1;
      if (keyDic.current[right]) direction.y = 1;
    }

      
    setDirection(direction);
    

    
  }, [twoPlayers, secondPLayer]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (e.repeat) return; 

      
      if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
        e.preventDefault();
      }
      //console.log('Key pressed:', key, 'Current keys:', keyDic.current);

      if (!keyDic.current[key]) {
        keyDic.current[key] = true;
        update();
      }    
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      //console.log('Key released:', key, 'Current keys:', keyDic.current);
      if (keyDic.current[key]) {
        keyDic.current[key] = false;
        update();
      }    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [update]);

  return directionValue;
};