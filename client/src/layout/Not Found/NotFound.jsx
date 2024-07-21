import { Link } from 'react-router-dom';
import { Boton } from '../../components/Boton/Boton';
import './NotFound.css';

export function NotFound() {
  return (
    <main className='container-404'>
      <div className='text-404'>
        <h1>Oops, la página no se pudo encontrar</h1>
        <p>
          Lo sentimos, pero la página que estás buscando no existe. Puedes
          volver a la página principal o intentar buscar de nuevo.
        </p>
        <Link to='/'>
          <Boton textBoton={'Volver a la página principal'} />
        </Link>
      </div>
    </main>
  );
}
