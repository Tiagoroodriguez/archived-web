import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { usePedido } from '../../context/PedidosContext';
import { CartContext } from '../../context/CarritoContext';
import Input from '../../components/Input/Input';
import { LogoTexto } from '../../components/LogoTexto/LogoTexto';
import { Boton } from '../../components/Boton/Boton';
import RutaCompra from '../../components/RutaCompra/RutaCompra';

import './InformacionEnvio.css';
import { useAuth } from '../../context/AuthContext';

export default function InformacionEnvio() {
  const { cartItems, getCartTotal } = useContext(CartContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registrarEnvio } = usePedido();

  const { isAuthenticated, user } = useAuth();

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const numero_pedido = Math.floor(Math.random() * 1000000000); // Generar número de pedido
    const envioData = { ...data, numero_pedido };

    const result = await registrarEnvio(envioData);
    if (result) {
      console.log('Envio registrado:', result);
      navigate('/checkout/pago');
    } else {
      console.error('Error al registrar el envio');
    }
  });

  return (
    <main className='checkout'>
      <section className='informacion-section'>
        <LogoTexto />
        <RutaCompra informacion={true} />

        <form
          className='form-datos-envio'
          onSubmit={onSubmit}
        >
          <div className='informacion-contacto'>
            <p>Información de contacto</p>
            <Input
              type='email'
              label='Correo electrónico'
              name='email'
              value={isAuthenticated ? user.email : ''}
              ternaria={register('email', { required: true })}
            />
            {errors.email && (
              <p className='error'>El correo electrónico es requerido</p>
            )}
          </div>

          <div className='informacion-envio'>
            <p>Dirección de envio</p>
            <Input
              type='text'
              label='Nombre'
              name='nombre'
              value={isAuthenticated ? user.nombre : ''}
              ternaria={register('nombre', { required: true })}
            />
            {errors.nombre && <p className='error'>El nombre es requerido</p>}

            <Input
              type='text'
              label='Apellido'
              name='apellido'
              value={isAuthenticated ? user.apellido : ''}
              ternaria={register('apellido', { required: true })}
            />
            {errors.apellido && (
              <p className='error'>El apellido es requerido</p>
            )}

            <Input
              type='number'
              label='Telefono'
              name='telefono'
              ternaria={register('telefono', { required: true })}
            />
            {errors.telefono && (
              <p className='error'>El teléfono es requerido</p>
            )}

            <div className='ciudad-container'>
              <div className='ciudad-item ciudad'>
                <Input
                  type='text'
                  label='Dirección'
                  name='direccion'
                  ternaria={register('direccion', { required: true })}
                />
                {errors.direccion && (
                  <p className='error'>La dirección es requerida</p>
                )}
              </div>
              <div className='ciudad-item'>
                <Input
                  type='number'
                  label='Numero'
                  name='numero_direccion'
                  ternaria={register('numero_direccion', { required: true })}
                />
                {errors.numero_direccion && (
                  <p className='error'>El número de dirección es requerido</p>
                )}
              </div>
            </div>
            <Input
              type='text'
              label='Provincia'
              name='provincia'
              ternaria={register('provincia', { required: true })}
            />
            {errors.provincia && (
              <p className='error'>La provincia es requerida</p>
            )}

            <div className='ciudad-container'>
              <div className='ciudad-item ciudad'>
                <Input
                  type='text'
                  label='Ciudad'
                  name='ciudad'
                  ternaria={register('ciudad', { required: true })}
                />
                {errors.ciudad && (
                  <p className='error'>La ciudad es requerida</p>
                )}
              </div>

              <div className='ciudad-item'>
                <Input
                  type='number'
                  label='Codigo postal'
                  name='codigo_postal'
                  ternaria={register('codigo_postal', { required: true })}
                />
                {errors.codigo_postal && (
                  <p className='error'>El código postal es requerido</p>
                )}
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

            <Boton
              textBoton='Continuar'
              type='submit'
            />
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
  );
}
