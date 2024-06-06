import { useContext } from 'react';
import { CartContext } from '../../context/CarritoContext';

export default function CartSection() {
  const { cartItems, getCartTotal } = useContext(CartContext);
  return (
    <section className='carrito-section'>
      <header className='header-carrito'>
        <h1>Detalle de compra</h1>
        <div className='line-costo' />
      </header>
      <div className='cart-item-container cart-item-container-checkout'>
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
              <div className='info-producto checkout-info-cart'>
                <p className='info-producto-nombre'>{item.nombre}</p>
                <p className='info-producto-talle'>{`${item.quantity} x Talle: ${item.talle}`}</p>
                <p className='info-producto-precio'>{`$${
                  item.precio * item.quantity
                }`}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='descripcion-final-checkout'>
        <div className='line-costo' />
        <div>
          <p>Subtotal</p>
          <p>${getCartTotal()}</p>
        </div>
        <div>
          <p>Costo de envio</p>
          <p>Calculado en el siguiente paso</p>
        </div>
        <div>
          <h1>Total</h1>
          <h1>${getCartTotal()}</h1>
        </div>
      </div>
    </section>
  );
}
