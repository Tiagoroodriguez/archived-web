import { useContext } from 'react';
import { CartContext } from '../../context/CarritoContext';
import Input from '../../components/Input/Input';
import { Boton } from '../../components/Boton/Boton';

import './Checkout.css';

export default function Checkout() {
  const { cartItems, getCartTotal } = useContext(CartContext);

  return (
    <>
      <main className='checkout'>
        <section className='informacion-section'>
          <div className='superior'>
            <ul>
              <li className='point'>
                <button>
                  <div>
                    <i className='bi bi-cart4'></i>
                  </div>
                  <p>Carrito</p>
                </button>
              </li>
              <li className='line'></li>
              <li className='point'>
                <button className='focus'>
                  <div>
                    <i className='bi bi-box-seam'></i>
                  </div>
                  <p>Envio</p>
                </button>
              </li>
              <li className='line'></li>
              <li className='point'>
                <button>
                  <div>
                    <i className='bi bi-credit-card'></i>
                  </div>
                  <p>Pago</p>
                </button>
              </li>
            </ul>
          </div>

          <div className='informacion-contacto'>
            <p>Información de contacto</p>
            <Input
              type='email'
              placeholder='ejemplo@gmail.com'
              label='Correo electrónico'
            />
          </div>

          <div className='informacion-envio'>
            <p>Dirección de envio</p>
            <Input
              type='text'
              placeholder='nombre'
              label='Nombre'
            />
            <Input
              type='text'
              placeholder='apellido'
              label='Apellido'
            />
            <Input
              type='number'
              placeholder='0000000000'
              label='Telefono'
            />
            <Input
              type='text'
              placeholder='dirección'
              label='Dirección'
            />
            <Input
              type='number'
              placeholder='XXXXX'
              label='Codigo postal'
            />
            <Input
              type='text'
              placeholder='ciudad'
              label='Ciudad'
            />
          </div>

          <div className='checkout-actions'>
            <Boton
              textBoton='Volver'
              secundario={true}
            />
            <Boton textBoton='Continuar' />
          </div>
        </section>

        <section className='carrito-section'>
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
                    <h1 className=''>{item.nombre}</h1>
                    <p className=''>{`$${item.precio}`}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='descripcion-final-checkout'>
            <div>
              <p>Subtotal</p>
              <p>${getCartTotal()}</p>
            </div>
            <div>
              <p>Costo de envio</p>
              <p>${getCartTotal()}</p>
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
