import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CarritoContext';
import Input from '../../components/Input/Input';
import { LogoTexto } from '../../components/LogoTexto/LogoTexto';
import { Boton } from '../../components/Boton/Boton';
import RutaCompra from '../../components/RutaCompra/RutaCompra';

import './InformacionEnvio.css';

export default function InformacionEnvio() {
  const { cartItems, getCartTotal } = useContext(CartContext);

  return (
    <>
      <main className='checkout'>
        <section className='informacion-section'>
          <LogoTexto />
          <RutaCompra informacion={true} />

          <form className='form-datos-envio'>
            <div className='informacion-contacto'>
              <p>Información de contacto</p>
              <Input
                type='email'
                label='Correo electrónico'
              />
            </div>

            <div className='informacion-envio'>
              <p>Dirección de envio</p>
              <Input
                type='text'
                label='Nombre'
              />
              <Input
                type='text'
                label='Apellido'
              />
              <Input
                type='number'
                label='Telefono'
              />
              <Input
                type='text'
                label='Dirección'
              />
              <div className='ciudad-container'>
                <div className='ciudad-item ciudad'>
                  <Input
                    type='text'
                    label='Ciudad'
                  />
                </div>

                <div className='ciudad-item'>
                  <Input
                    type='number'
                    label='Codigo postal'
                  />
                </div>
              </div>
            </div>

            <div className='checkout-actions'>
              <Link to='/checkout'>
                <Boton
                  textBoton='Volver'
                  secundario={true}
                  value={'volver'}
                />
              </Link>
              <Link to='/checkout/pago'>
                <Boton textBoton='Continuar' />
              </Link>
            </div>
          </form>
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
