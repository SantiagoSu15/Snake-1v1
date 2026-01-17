
import './App.css'
import { GameCom } from './hooks/game';
import { snake } from "./utils/Serpiente/snake";
import TableroComponent from "./components/tablero";
import type { Vector } from './utils/Movimiento/vector';

function App() {
  //const v: Vector = ({x:5,y:5});
  //const s: snake = new snake(v,1);
  //const v2: Vector = ({x:4,y:5});
  //const v4: Vector = ({x:3,y:5})
  //const sl : snake[] = [];
  //sl.push(s);
  //s.grow(v2);
  //s.grow(v4)
  //let v3 : Vector = ({x:0,y:-1});
  //console.log("Cabeza: ", s.getPosition());
  //console.log("Todo, ",s.getPositions());
  //s.uptade(v3,1);
  //console.log("Cabeza nueva: ", s.getPosition());
  //console.log("Todo nuevo, ",s.getPositions());

  return (
    //<TableroComponent snakeList={sl}/>
    <GameCom />
  );
}

export default App
