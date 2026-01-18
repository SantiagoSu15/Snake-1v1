import { Link } from 'react-router-dom';

export const Menu = ()=>{
    return (
        <>
            <div className='Menu'>
                <div className='MenuButtoms'>
                <Link to="/Snake-1v1/singleplayer">
                    <button className='ModeMenuButton'>
                        <div className="iconButtonMenu" id="SingleButton"/>
                        <span> Single Player</span> 
                    </button>
                </Link>
                <Link to="/Snake-1v1/Multi-local">
                    <button className='ModeMenuButton'>
                        <div className="iconButtonMenu" id="LocalButton" />
                        <span> Multi Local</span> 
                    </button>
                </Link>
                <Link to="/Snake-1v1/Multi-online">
                    <button className='ModeMenuButton'>
                        <div className="iconButtonMenu" id="MultiButton" />
                        <span> Multi Online</span> 
                    </button>
                </Link>
                </div>
            </div>
            <p className="atribucion">
                Iconos animados de fauna por Freepik – Flaticon
            </p>
        </>

    );

};