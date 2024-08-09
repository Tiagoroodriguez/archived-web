import { useContext, useState } from 'react';
import { CartContext } from '../../context/CarritoContext';
import { formatPrice } from '../../utils/formatePrice';
import { getCouponRequest } from '../../api/coupon';

export default function CartSection() {
  const { cartItems, getCartTotal, coupon, setCoupon } =
    useContext(CartContext);
  const [couponCode, setCouponCode] = useState('');
  const [error, setError] = useState('');

  const handleCouponChange = (e) => {
    setCouponCode(e.target.value);
  };

  const handleRedeemCoupon = async () => {
    try {
      const response = await getCouponRequest(couponCode);
      setCoupon(response.data);
      setError('');
      setCouponCode('');
    } catch (error) {
      setError('Cupón no encontrado');
    }
  };

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
      <div className='cupo-descuento-container'>
        <div>
          <input
            placeholder={
              coupon
                ? `${coupon.code} - ${coupon.discount_percentage}% OFF`
                : 'Código de cupón'
            }
            value={couponCode}
            onChange={handleCouponChange}
            disabled={coupon ? true : false}
          />
          <button
            onClick={handleRedeemCoupon}
            disabled={coupon ? true : false}
          >
            Canjear
          </button>
        </div>

        {error && <p className='error-coupon'>{error}</p>}
      </div>

      <div className='descripcion-final-checkout'>
        <div className='line-costo' />
        <div>
          <p>Subtotal:</p>
          {coupon ? (
            <p className='total-descuento-container'>
              <span className='total-descuento'>
                {formatPrice(getCartTotal())}
              </span>
              <span className='descuento-coupon'>
                {formatPrice(getCartTotal(coupon))}
              </span>
            </p>
          ) : (
            <p>{formatPrice(getCartTotal())}</p>
          )}
        </div>
        <div>
          <p>Costo de envio:</p>
          <p>Gratis</p>
        </div>
        <div>
          <h1>Total:</h1>
          <h1>
            {coupon
              ? formatPrice(getCartTotal(coupon))
              : formatPrice(getCartTotal())}
          </h1>
        </div>
      </div>
    </section>
  );
}
