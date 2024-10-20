import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CarritoContext';
import { Boton } from '../../components/Boton/Boton';

import './Carrito.css';
import { formatPrice } from '../../utils/formatePrice';
import io from 'socket.io-client';
import { usePedido } from '../../context/PedidosContext';
import { generateUUID } from '../../utils/generateUUID';

export default function Carrito() {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    getCartTotal,
    setShowCart,
    showCart,
    clearCartLocally,
  } = useContext(CartContext);

  const { setCostoEnvio, setSelectedMetodoEnvio } = usePedido();

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  // Generar o recuperar el userId
  let userId = localStorage.getItem('userId');
  if (!userId) {
    userId = generateUUID();
    localStorage.setItem('userId', userId);
  }

  const socket = io('https://archived-web-1.onrender.com', {
    withCredentials: true,
    extraHeaders: {
      'my-custom-header': 'abcd',
    },
    query: {
      userId, // Envía el userId como parte de la consulta
    },
  });

  socket.on('connect', () => {
    console.log(`Conectado con id: ${socket.id}`);
  });

  socket.on('paymentApproved', (data) => {
    console.log(data.message); // Procesa el mensaje recibido
    clearCartLocally();
    localStorage.removeItem('envioInfo');
    setCostoEnvio(null);
    setSelectedMetodoEnvio('');
  });

  return (
    <div className='cart-container'>
      <div className='cart-header'>
        <h1 className='cart-title'>Carrito de compras</h1>
        <button
          className='boton-carrito'
          onClick={toggleCart}
        >
          <i className='bi bi-x-lg' />
        </button>
      </div>

      <div className='cart-item-container'>
        {cartItems.length === 0 ? (
          <p className='cart-item-p'>Su carrito está vacío</p>
        ) : (
          ''
        )}
        {cartItems.map((item) => (
          <div
            className='cart-items'
            key={item.key}
          >
            <div className='cart-producto'>
              <div className='img-producto'>
                <img
                  src={item.img_small_1}
                  alt={`imagen del producto ${item.nombre}`}
                />
              </div>
              <div className='info-producto'>
                <p className='info-producto-nombre'>{`${item.categoria} ${item.nombre}`}</p>
                {item.discount > 0 ? (
                  <p className='info-producto-precio'>
                    {formatPrice(item.precio_con_descuento)}
                  </p>
                ) : (
                  <p className='info-producto-precio'>
                    {formatPrice(item.precio)}
                  </p>
                )}
                <p className='info-producto-talle'>{item.talle}</p>
                <div className='botones-producto'>
                  <button
                    onClick={() => {
                      addToCart(item, item.talle);
                    }}
                  >
                    +
                  </button>
                  <p>{item.quantity}</p>
                  <button
                    onClick={() => {
                      removeFromCart(item, item.talle);
                    }}
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {cartItems.length > 0 ? (
        <div className='descripcion-final'>
          <h2 className='descripcion-final-texto'>
            Total: {formatPrice(getCartTotal())}
          </h2>
        </div>
      ) : (
        ''
      )}
      <div className='cart-checkout-container'>
        <Link to='/checkout'>
          <Boton
            type='sudmit'
            textBoton='Iniciar compra'
            desactivado={cartItems.length === 0 ? true : false}
            onClick={() => {
              setShowCart(false);
            }}
          />
        </Link>
      </div>
    </div>
  );
}
