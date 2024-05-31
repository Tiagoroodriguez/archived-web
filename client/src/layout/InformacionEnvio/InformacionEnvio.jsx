import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { usePedido } from '../../context/PedidosContext';
import { CartContext } from '../../context/CarritoContext';
import Input from '../../components/Input/Input';
import { LogoTexto } from '../../components/LogoTexto/LogoTexto';
import { Boton } from '../../components/Boton/Boton';
import RutaCompra from '../../components/RutaCompra/RutaCompra';
import { provincias } from '../../../public/json/provincias.json';
import { CheckboxGroup } from '../../components/CheckboxGroup/CheckboxGroup';
import Select from '../../components/Select/Select';
import './InformacionEnvio.css';

export default function InformacionEnvio() {
  const { cartItems, getCartTotal } = useContext(CartContext);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { setEnvioInfo, envioInfo } = usePedido();

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const envioData = { ...data };
    setEnvioInfo(envioData);
    if (envioInfo) {
      navigate('/checkout/pago');
    } else {
      console.error('Error al registrar el envio');
    }
  });

  const [selectedProvincia, setSelectedProvincia] = useState('');
  const [selectedMetodoEnvio, setSelectedMetodoEnvio] = useState('');

  const handleSelectProvinciaChange = (event) => {
    setSelectedProvincia(event.target.value);
  };

  useEffect(() => {
    const loadEnvioInfo = async () => {
      if (cartItems.length === 0) {
        navigate('/tienda');
      }
      if (envioInfo) {
        setValue('email', envioInfo.email);
        setValue('nombre', envioInfo.nombre);
        setValue('apellido', envioInfo.apellido);
        setValue('telefono', envioInfo.telefono);
        setValue('direccion', envioInfo.direccion);
        setValue('numero_direccion', envioInfo.numero_direccion);
        setValue('provincia', envioInfo.provincia);
        setValue('ciudad', envioInfo.ciudad);
        setValue('codigo_postal', envioInfo.codigo_postal);
      }
    };
    loadEnvioInfo();
  }, []);

  const paymentOptions = ['Andreani - $2000', 'Retirar en el local - Gratis'];

  return (
    <main className='checkout'>
      <section className='informacion-section'>
        <LogoTexto />
        <RutaCompra informacion={true} />

        <form
          className='form-datos-envio'
          onSubmit={onSubmit}
        >
          <div className='informacion-datos'>
            <p>Información de contacto</p>
            <Input
              type='email'
              label='Correo electrónico'
              name='email'
              ternaria={register('email', { required: true })}
            />
            {errors.email && (
              <p className='error'>El correo electrónico es requerido</p>
            )}
          </div>

          <div className='informacion-datos'>
            <p>Seleccione el metodo de entrega</p>
            <CheckboxGroup
              options={paymentOptions}
              onSelectionChange={setSelectedMetodoEnvio}
            />
          </div>
          {selectedMetodoEnvio === 'Andreani - $2000' ? (
            <div className='informacion-datos'>
              <p>Dirección de envio</p>
              <Input
                type='text'
                label='Nombre'
                name='nombre'
                ternaria={register('nombre', { required: true })}
              />
              {errors.nombre && <p className='error'>El nombre es requerido</p>}

              <Input
                type='text'
                label='Apellido'
                name='apellido'
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
              <div className='ciudad-container'>
                <div className='ciudad'>
                  <Input
                    type='text'
                    label='Ciudad'
                  />
                </div>
                <div className='ciudad-item'>
                  <Input
                    type='numer'
                    label='Codigo Postal'
                  />
                </div>
              </div>

              <Select
                labelText='Provincia'
                texto='Seleccione su provincia'
                data={provincias}
                value={selectedProvincia}
                onChange={handleSelectProvinciaChange}
                ternaria={register('provincia', { required: true })}
              />
              <span>Datos de facturacion</span>
              <Input
                type='number'
                label='DNI o CUIL'
              />
              <div className='informacion-datos-chebox'>
                <label>
                  <input type='checkbox' />
                  Mis datos de facturacion son distintos a los de envio
                </label>
              </div>
            </div>
          ) : (
            <div className='informacion-datos'>
              <p>Datos de facturacion</p>
              <Input
                type='number'
                label='DNI o CUIL'
              />
              <span>Persona que paga el pedido</span>
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
              <div className='informacion-datos-chebox'>
                <label>
                  <input type='checkbox' />
                  Otra persona va retirar el pedido
                </label>
              </div>

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
              <div className='ciudad-container'>
                <div className='ciudad'>
                  <Input
                    type='text'
                    label='Ciudad'
                  />
                </div>
                <div className='ciudad-item'>
                  <Input
                    type='numer'
                    label='Codigo Postal'
                  />
                </div>
              </div>

              <Select
                labelText='Provincia'
                texto='Seleccione su provincia'
                data={provincias}
                value={selectedProvincia}
                onChange={handleSelectProvinciaChange}
                ternaria={register('provincia', { required: true })}
              />
            </div>
          )}

          <div className='checkout-actions'>
            <Link to='/checkout/envio'>
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
