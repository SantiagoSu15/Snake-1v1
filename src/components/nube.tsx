import { memo, useMemo } from "react";

type nubesProps = {
    top: number,
    left:number,
    time:number,
    scale:number
}

export const Nube = memo(({top,left,time,scale}: nubesProps) =>{
    return(
        <div
            className="nubeContenedor"
            style={{
            top: `${top}vh`,
            left: `${left}vw`,
            animationDuration: `${time}s`,
            animationDelay: `-${Math.random() * time}s`,
            "--scale": scale
            } as React.CSSProperties}
        >
            <div className="Nube" />
        </div>
    )
});


export const Nubes = memo(()  =>{

    const variasNubes = useMemo(() => { 
        return Array.from({ length: 7 }, () => ({
            top: Math.random() * 60,         
            left: Math.random()*-20,
            time: 16 + Math.random() * 4,  
            scale: 1 + Math.random() * 0.6  
        }));
    }, []);

    return(
        <>
        {
            variasNubes.map((props,index)=>(
                <Nube key={index} {...props}/> 
            ))
        }
        </>
    )

    
});