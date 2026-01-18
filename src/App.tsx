
import './App.css'
import { Menu } from './components/pages/menu';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { Singleplayer } from './components/pages/Singleplayer';
import { MultiplayerLocal } from './components/pages/MultiplayerLocal';

const routes = [
  {path:"/Snake-1v1",element:<Menu /> },
  {path:"/Snake-1v1/singleplayer",element:<Singleplayer />},
  {path:"/Snake-1v1/Multi-local",element:<MultiplayerLocal />}
]


function App() {

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route,index)=>(
            <Route key = {index} path = {route.path} element = {route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App
