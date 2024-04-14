import './BotonColor.css';
import { Link } from 'react-router-dom';

export function BotonColor({ textoBoton, linkBoton }) {
  return (
    <div className='boton-container'>
      <div className='boton-todos-productos'>
        <Link to={`/${linkBoton}`}>{textoBoton}</Link>
      </div>
    </div>
  );
}
