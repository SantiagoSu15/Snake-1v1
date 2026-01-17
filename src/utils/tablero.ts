import type { Celda } from "./celda.js";

export type Tablero = {
    celdas: Celda[][]; 
    tamaño: number;
    element: HTMLDivElement;
  };