import './BotonRojo.css'

export function BotonRojo({textBoton, type}) {
    return (
        
        <button type={type} className='boton'>
            {textBoton}
        </button>
    )
}