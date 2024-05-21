import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CarritoContext';
import { MercadoPagoContext } from '../../context/MercadoPago';
import { LogoTexto } from '../../components/LogoTexto/LogoTexto';
import { Boton } from '../../components/Boton/Boton';
import RutaCompra from '../../components/RutaCompra/RutaCompra';
import Acordeon from '../../components/Acordeon/Arcodeon';

import './Pago.css';
import { CheckboxGroup } from '../../components/CheckboxGroup/CheckboxGroup';

export default function Pago() {
  const { createOrder } = useContext(MercadoPagoContext);
  const { cartItems, getCartTotal, getCartItems } = useContext(CartContext);
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const paymentOptions = ['Mercado Pago', 'Efectivo'];
  const data = [
    {
      title: 'Detalle de compra',
      content: (
        <section className='carrito-section mobile'>
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
      ),
    },
  ];

  const handleMercadoPago = () => {
    createOrder(getCartItems());
  };

  return (
    <>
      <main className='pago'>
        <section className='pago-section'>
          <LogoTexto />
          <RutaCompra pago={true} />
          <div className='pago-mobile-acordeon'>
            <Acordeon
              data={data}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          </div>

          <table className='pago-table-container'>
            <tbody className='pago-table-body'>
              <tr className='pago-tabla-fila'>
                <td className='pago-tabla-item'>
                  <div>
                    <p className='pago-tabla-titulo'>Contacto</p>
                    <p className='pago-tabla-contenido'>
                      tiagorodriguez0202@gmail.com
                    </p>
                  </div>
                  <Link to='/checkout/informacion'>Cambiar</Link>
                </td>
              </tr>
              <tr className='pago-tabla-fila'>
                <td className='pago-tabla-item'>
                  <div>
                    <p className='pago-tabla-titulo'>Enviar a</p>
                    <p className='pago-tabla-contenido'>25 de febrero 1481</p>
                  </div>
                  <Link to='/checkout/informacion'>Cambiar</Link>
                </td>
              </tr>
              <tr className='pago-tabla-fila'>
                <td className='pago-tabla-item'>
                  <div>
                    <p className='pago-tabla-titulo'>Metodo</p>
                    <p className='pago-tabla-contenido'>
                      Correo Argentino $5000
                    </p>
                  </div>
                  <Link to='/checkout/informacion'>Cambiar</Link>
                </td>
              </tr>
            </tbody>
          </table>

          <div className='form-pago'>
            <div className='informacion-pago'>
              <h1>Forma de pago</h1>

              <CheckboxGroup
                options={paymentOptions}
                onSelectionChange={setSelectedPaymentMethod}
              />
            </div>
            <div className='checkout-actions'>
              <Link to='/checkout/informacion'>
                <Boton
                  textBoton='Volver'
                  secundario={true}
                />
              </Link>
              {!selectedPaymentMethod ? (
                <Boton
                  textBoton='Seleccione un metodo de pago'
                  desactivado={true}
                />
              ) : (
                <Boton
                  textBoton={
                    selectedPaymentMethod === 'Efectivo'
                      ? 'Pagar en Efectivo'
                      : 'Pagar con Mercado Pago'
                  }
                  onClick={
                    selectedPaymentMethod === 'Efectivo'
                      ? () => alert('Pago en efectivo')
                      : handleMercadoPago
                  }
                />
              )}
            </div>
          </div>
        </section>

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
      </main>
    </>
  );
}
