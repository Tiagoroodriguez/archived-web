import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CarritoContext';
import { Boton } from '../../components/Boton/Boton';

import './Carrito.css';

export default function Carrito() {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } =
    useContext(CartContext);

  return (
    <div className='cart-container'>
      <h1 className='cart-title'>Carrito de compras</h1>
      <div className='cart-item-container'>
        {cartItems.map((item) => (
          <div
            className='cart-items'
            key={item.key}
          >
            <div className='cart-producto'>
              <div className='img-producto'>
                <img
                  src={`/images/productos/small/${item.nombre}.webp`}
                  alt={`imagen del producto ${item.nombre}`}
                />
              </div>
              <div className='info-producto'>
                <p className='info-producto-nombre'>{item.nombre}</p>
                <p className='info-producto-talle'>{`Talle: ${item.talle}`}</p>
                <p className='info-producto-precio'>{`Precio: $${item.precio}`}</p>
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
          <h2 className='descripcion-final-texto'>Total: ${getCartTotal()}</h2>

          <Boton
            type='sudmit'
            textBoton='Vaciar carrito'
            onClick={() => {
              clearCart();
            }}
            secundario={true}
            value={'vaciar'}
          />
        </div>
      ) : (
        <h2 className='descripcion-final-texto'>Tu carrito esta vacio</h2>
      )}
      <div className='cart-checkout-container'>
        <Link to='/checkout'>
          <Boton
            type='sudmit'
            textBoton='Iniciar compra'
            desactivado={cartItems.length === 0 ? true : false}
            onClick={() => null}
          />
        </Link>
      </div>
    </div>
  );
}
