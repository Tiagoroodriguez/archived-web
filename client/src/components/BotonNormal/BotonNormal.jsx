import './BotonNormal.css';

export function BotonNormal({textoBoton}) {

    return (
        <div className="boton-normal-container">
            <button className="boton-normal">{textoBoton}</button>
        </div>
    )
}
