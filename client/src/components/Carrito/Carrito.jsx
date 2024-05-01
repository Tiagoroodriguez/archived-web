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
        <div className='descripcion-final'>
          <h1 className='descripcion-final-texto'>
            Subtotal: ${getCartTotal()}
          </h1>

          <Boton
            type='sudmit'
            textBoton='Clear cart'
            onClick={() => {
              clearCart();
            }}
            secundario={true}
          />
        </div>
      ) : (
        <h1 className='descripcion-final-texto'>Tu carrito esta vacio</h1>
      )}
      <div className='cart-checkout-container'>
        <Boton
          type='sudmit'
          textBoton='checkout'
          desactivado={cartItems.length === 0 ? true : false}
        />
      </div>
    </div>
  );
}
