import { Link } from 'react-router-dom';

import './Producto.css';

export function Producto({ producto }) {
  return (
    <Link to={`/detalle-producto/${producto._id}`}>
      <article className='container'>
        <div className='producto-imagen'>
          <div>
            <img
              src={`./images/productos/small/${producto.nombre}.webp`}
              alt={`imagen del producto ${producto.nombre}`}
              decoding='async'
            />
          </div>
          <div className='descuento-container'>
            <span className='descuento'>10%</span>
          </div>
        </div>

        <div className='producto-informacion'>
          <div
            to='/detalle-producto'
            className='nombre-texto'
          >{`"${producto.nombre}"`}</div>
          <div
            to='/detalle-producto'
            className='preci-texto'
          >{`$${producto.precio}`}</div>
        </div>
      </article>
    </Link>
  );
}
