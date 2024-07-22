import { Link } from 'react-router-dom';
import './Producto.css';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/CarritoContext';
import TalleSelectionOverlay from '../TalleSelectionOverlay/TalleSelectionOverlay';
import { formatPrice } from '../../utils/formatePrice';
import { Boton } from '../Boton/Boton';

export function Producto({ producto }) {
  const {
    overlayTalles,
    setOverlayTalles,
    setSelectedProduct,
    selectedProduct,
    addToCart,
  } = useContext(CartContext);

  const [hover, setHover] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Ajusta el tamaño según sea necesario

  const stock =
    producto.cant_s + producto.cant_m + producto.cant_l + producto.cant_xl;

  const handleMostrarOverlayTalles = () => {
    setOverlayTalles(true);
    setSelectedProduct(producto);
  };

  const handleAddToCart = (talle) => {
    setSelectedProduct(producto);
    if (selectedProduct && talle) {
      addToCart(selectedProduct, talle);
      setOverlayTalles(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Ajusta el tamaño según sea necesario
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Llama la función al montar el componente para la verificación inicial

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <article
      className='container'
      onMouseEnter={() => !isMobile && setHover(true)}
      onMouseLeave={() => !isMobile && setHover(false)}
    >
      <Link to={`/detalle-producto/${producto._id}`}>
        <div className='producto-imagen'>
          <div>
            <img
              className={stock === 0 ? 'producto-imagen-agotado' : ''}
              src={
                hover
                  ? `/images/productos/big/2-${producto.nombre}.webp`
                  : `/images/productos/small/${producto.nombre}.webp`
              }
              alt={`imagen del producto ${producto.nombre}`}
              decoding='async'
              loading='lazy'
            />
          </div>
          {producto.discount > 0 ? (
            <div className='descuento-container'>
              <span className='descuento'>{producto.discount}% OFF</span>
            </div>
          ) : (
            ''
          )}
          {stock === 0 ? (
            <div className='stock-container'>
              <span className='stock'>Agotado</span>
            </div>
          ) : (
            ''
          )}
        </div>
      </Link>

      <div
        className={
          hover
            ? 'producto-informacion producto-ocultar'
            : 'producto-informacion producto-mostrar'
        }
      >
        <div className='producto-infor-superior'>
          <div className='nombre-texto'>
            {`${producto.categoria} ${producto.nombre}`}
          </div>
          <button
            className='producto-add-cart'
            onClick={handleMostrarOverlayTalles}
          >
            <i className='bi bi-plus' />
          </button>
        </div>

        <div className='precio-texto'>
          {producto.discount ? (
            <p>
              <span>{formatPrice(producto.precio)} </span>{' '}
              {formatPrice(producto.precio_con_descuento)}
            </p>
          ) : (
            formatPrice(producto.precio)
          )}
        </div>
      </div>

      <div
        className={
          hover
            ? 'producto-informacion producto-mostrar'
            : 'producto-informacion producto-ocultar'
        }
      >
        <ul className='talles-boton-container'>
          {['S', 'M', 'L', 'XL'].map((talle) => (
            <li key={talle}>
              <button
                className={
                  producto[`cant_${talle.toLowerCase()}`] === 0
                    ? 'talle-boton-desactivado'
                    : 'talle-boton'
                }
                disabled={producto[`cant_${talle.toLowerCase()}`] === 0}
                onClick={() => handleAddToCart(talle)}
              >
                {talle}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {overlayTalles && selectedProduct._id === producto._id && (
        <TalleSelectionOverlay />
      )}
    </article>
  );
}
