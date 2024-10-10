import { useContext, useState } from 'react';
import { getCouponRequest } from '../../api/coupon';
import { CartContext } from '../../context/CarritoContext';
import Acordeon from '../../components/Acordeon/Arcodeon';
import { AnimatePresence, motion } from 'framer-motion';

import './RutaCompra.css';

export default function RutaCompra({
  carrito,
  informacion,
  pago,
  detalleCompra,
}) {
  const [activeIndex, setActiveIndex] = useState(null);
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
  const firstLineVariants = {
    initial: { width: 0, originX: 0 },
    animate: { width: '100%', transition: { duration: 1 } },
  };

  const secondLineVariants = {
    initial: { width: 0, originX: 0 },
    animate: { width: '100%', transition: { duration: 1, delay: 1 } },
  };

  const data = [
    {
      title: 'Detalle de compra',
      content: (
        <section className='carrito-section pago-mobile'>
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
      ),
    },
  ];
  return (
    <>
      <div className='pedido-estados'>
        <div className={`pedido-estado ${carrito ? 'estado-actual' : ''}`}>
          <i
            className={`bi bi-cart text-lg ${
              pago || informacion ? 'estado-actual' : ''
            }`}
          />
          <span className={informacion || pago ? 'estado-actual' : ''}>
            Carrito
          </span>
        </div>
        <div className='pedido-line-div'>
          <AnimatePresence>
            <motion.div
              className='pedido-line'
              variants={firstLineVariants}
              initial='initial'
              animate={informacion || pago ? 'animate' : 'initial'}
            />
          </AnimatePresence>
        </div>

        <div
          className={`pedido-estado ${
            informacion || pago ? 'estado-actual' : ''
          }`}
        >
          <i
            className={`bi bi-truck text-lg ${
              informacion || pago ? 'estado-actual' : ''
            }`}
          />
          <span className={informacion || pago ? 'estado-actual' : ''}>
            Información
          </span>
        </div>
        <div className='pedido-line-div'>
          <AnimatePresence>
            <motion.div
              className='pedido-line'
              variants={secondLineVariants}
              initial='initial'
              animate={pago ? 'animate' : 'initial'}
            />
          </AnimatePresence>
        </div>
        <div className={`pedido-estado ${pago ? 'estado-actual' : ''}`}>
          <i
            className={`bi bi-credit-card text-lg ${
              pago ? 'estado-actual' : ''
            }`}
          />
          <span className={pago ? 'estado-actual' : ''}>Pago</span>
        </div>
      </div>
      {detalleCompra ? (
        <div className='pago-mobile-acordeon'>
          <Acordeon
            data={data}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </div>
      ) : (
        ''
      )}
    </>
  );
}
