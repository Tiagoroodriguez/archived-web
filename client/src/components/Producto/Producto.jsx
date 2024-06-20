import { Link } from 'react-router-dom';

import './Producto.css';

export function Producto({ producto }) {
  const stock =
    producto.cant_s + producto.cant_m + producto.cant_l + producto.cant_xl;

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
          {stock === 0 ? (
            <div className='descuento-container'>
              <span className='descuento'>Sin stock</span>
            </div>
          ) : (
            ''
          )}
        </div>

        <div className='producto-informacion'>
          <div
            to='/detalle-producto'
            className='nombre-texto'
          >
            {producto.nombre}
          </div>
          <div
            to='/detalle-producto'
            className='precio-texto'
          >{`$${producto.precio}`}</div>
        </div>
      </article>
    </Link>
  );
}
