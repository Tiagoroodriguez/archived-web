import { Link } from 'react-router-dom';
import './Producto.css';
import { useContext } from 'react';
import { CartContext } from '../../context/CarritoContext';
import TalleSelectionOverlay from '../TalleSelectionOverlay/TalleSelectionOverlay';
import { formatPrice } from '../../utils/formatePrice';

export function Producto({ producto }) {
  const { setOverlayTalles, overlayTalles, setSelectedProduct } =
    useContext(CartContext);

  const stock =
    producto.cant_s + producto.cant_m + producto.cant_l + producto.cant_xl;

  const handleMostrarOverlayTalles = () => {
    setOverlayTalles(true);
    setSelectedProduct(producto);
  };

  return (
    <article className='container'>
      <Link to={`/detalle-producto/${producto._id}`}>
        <div className='producto-imagen'>
          <div>
            <img
              className={stock === 0 ? 'producto-imagen-agotado' : ''}
              src={`/images/productos/small/${producto.nombre}.webp`}
              alt={`imagen del producto ${producto.nombre}`}
              decoding='async'
              loading='lazy'
            />
          </div>
          {stock === 0 ? (
            <div className='descuento-container'>
              <span className='descuento'>Agotado</span>
            </div>
          ) : (
            ''
          )}
        </div>
      </Link>

      <div className='producto-informacion'>
        <div className='producto-infor-superior'>
          <div
            to='/detalle-producto'
            className='nombre-texto'
          >
            {`${producto.categoria} ${producto.nombre}`}
          </div>
          <button
            className='producto-add-cart'
            onClick={handleMostrarOverlayTalles}
          >
            <i className='bi bi-plus' />
          </button>
        </div>

        <div
          to='/detalle-producto'
          className='precio-texto'
        >
          {formatPrice(producto.precio)}
        </div>
      </div>
      {overlayTalles && <TalleSelectionOverlay />}
    </article>
  );
}
