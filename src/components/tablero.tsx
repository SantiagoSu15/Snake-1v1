import CeldaComponent from "./celda.tsx";
import type { Celda } from "../utils/celda";
import { useState } from "react";
import { crearTablero } from "../utils/crearTabler.ts";
import type { snake } from "../utils/Serpiente/snake";
import SnakeComponent from "./serpiente.tsx";
import FruitComponent from "./fruta.tsx";
import type { fruit } from "../utils/Fruta/fruit.ts";

type slProps = {
    snakeList : snake[];
    fruitList: fruit[]
    size: number;
};
//const f = new manzana({x:10,y:10})



const TableroComponent =({snakeList,fruitList,size} : slProps )=>{
    const tamaño = size;
    

    //Celda[][] -> tipo del estado
    //celdas -> valor actual del estado del tablero
    //setCeldas -> funcion q actualiza el estado
    const [celdas]  = useState<Celda[][]>(
        () => crearTablero(tamaño) // esto para q no se ejecute al iniciar solo lo hace  1 vez
    );

    return (
        <div id="board" style={{ "--size": tamaño } as React.CSSProperties}>
            {celdas.map((fila, i) => // iterar el celdas[][]  y por cada ceda se genera un componente x
                fila.map((cell, j) => (
                    <CeldaComponent 
                        key={`${i}-${j}`}
                        cell={cell}
                    />
                ))
            )}
            {snakeList.map((s,i) => (
                <SnakeComponent key={i} snake={s} size={tamaño} />
            ))} 

            {fruitList.map((f,i)=>(
                <FruitComponent key={i} fruit ={f} size={tamaño} />
            ))

            }
        </div>
    );
};

export default TableroComponent;