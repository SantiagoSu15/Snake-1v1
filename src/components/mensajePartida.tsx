type mensajeProps = {
    mensaje: string;
    onReset: () => void;
    onMenu: () => void;
};


export  const MensajePartida = ({ mensaje, onReset, onMenu } : mensajeProps) =>{
    return(
        <div className="contenedor">
            <p className="Resultado">
                {mensaje}
            </p>
            <div className="botonesFinales">
                <button className="botonFinal" onClick={onReset}>
                        Volver A Jugar 
                </button>
                <button className="botonFinal" onClick={onMenu} > 
                    Menu Principal
                </button>
            </div>
        </div>
    );
};