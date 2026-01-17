import type { Celda } from "../utils/celda";

type Props = {
    cell : Celda;
};


const CeldaComponent =({cell }: Props)=>{    
    const idCell = `${cell.fila}-${cell.columna}`;    
    return(
        <div id= {idCell} className = "cell"></div>
        
    );
};

export default CeldaComponent;