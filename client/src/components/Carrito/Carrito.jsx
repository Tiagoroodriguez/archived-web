import { useContext } from 'react';
import { CartContext } from '../../context/CarritoContext';
import { Boton } from '../../components/Boton/Boton';
import './Carrito.css';

export default function Carrito() {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } =
    useContext(CartContext);

  return (
    <div className='cart-container'>
      <h1>Carrito</h1>
      <div className='cart-item-container'>
        {cartItems.map((item) => (
          <div
            className='cart-items'
            key={item._id}
          >
            <div className='cart-producto'>
              <div className='img-producto'>
                <img
                  src={`/images/productos/small/${item.nombre}.webp`}
                  alt={`imagen del producto ${item.nombre}`}
                />
              </div>
              <div className='info-producto'>
                <h1 className=''>{item.nombre}</h1>
                <p className=''>{`$${item.precio}`}</p>
                <div className='botones-producto'>
                  <button
                    onClick={() => {
                      addToCart(item);
                    }}
                  >
                    +
                  </button>
                  <p>{item.quantity}</p>
                  <button
                    onClick={() => {
                      removeFromCart(item);
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
        <div className=''>
          <h1 className=''>Subtotal: ${getCartTotal()}</h1>
          <button
            className=''
            onClick={() => {
              clearCart();
            }}
          >
            Clear cart
          </button>
        </div>
      ) : (
        <h1 className=''>Tu carrito esta vacio</h1>
      )}
      <div className='cart-checkout-container'>
        <Boton
          type='sudmit'
          textBoton='checkout'
        />
      </div>
    </div>
  );
}
