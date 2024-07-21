import { useContext } from 'react';
import { CartContext } from '../../context/CarritoContext';
import { formatPrice } from '../../utils/formatePrice';

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
                <p className='info-producto-nombre'>
                  {item.categoria} {item.nombre}
                </p>
                <p className='info-producto-talle'>{`Talle: ${item.talle} x ${item.quantity}`}</p>
                <p className='info-producto-precio'>
                  {formatPrice(item.precio * item.quantity)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='descripcion-final-checkout'>
        <div className='line-costo' />
        <div>
          <p>Subtotal:</p>
          <p>{formatPrice(getCartTotal())}</p>
        </div>
        <div>
          <p>Costo de envio:</p>
          <p>Gratis</p>
        </div>
        <div>
          <h1>Total:</h1>
          <h1>{formatPrice(getCartTotal())}</h1>
        </div>
      </div>
    </section>
  );
}
