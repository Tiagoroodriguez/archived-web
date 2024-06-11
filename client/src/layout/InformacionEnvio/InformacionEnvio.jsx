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
import CartSection from '../../components/CartSection/CartSection';

export default function InformacionEnvio() {
  const paymentOptions = ['Andreani - $2000', 'Retirar en el local - Gratis'];
  const navigate = useNavigate();

  const [codigoPostal, setCodigoPostal] = useState(false);
  const [provinciaEnvio, setProvinciaEnvio] = useState('');
  const [provinciaFacturacion, setProvinciaFacturacion] = useState('');
  const [codigoPostalError, setCodigoPostalError] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const { cartItems } = useContext(CartContext);
  const {
    setEnvioInfo,
    envioInfo,
    selectedMetodoEnvio,
    setSelectedMetodoEnvio,
    mismaDireccion,
    setMismaDireccion,
  } = usePedido();

  const handleCodigoPostal = () => {
    const codigoPostalValue = getValues('codigo_postal_envio');
    if (!codigoPostalValue) {
      setCodigoPostalError('Por favor ingrese un código postal.');
      return;
    }
    setCodigoPostal(true);
    setCodigoPostalError('');
  };

  const handleCambiarCodigoPostal = () => {
    setCodigoPostal(false);
    setSelectedMetodoEnvio('');
  };

  const handleProvinciaEnvioChange = (newValue) => {
    setProvinciaEnvio(newValue);
  };

  const handleProvinciaFacturacionChange = (newValue) => {
    setProvinciaFacturacion(newValue);
  };

  const onSubmit = handleSubmit(async (data) => {
    let envioData;

    // Setear datos si tengo envio a domicilio y misma direccion de envio y facturacion
    if (mismaDireccion && selectedMetodoEnvio === 'Andreani - $2000') {
      envioData = {
        // Datos del cliente que recibe el pedido
        nombre_envio: data.nombre,
        apellido_envio: data.apellido,
        telefono_envio: data.telefono,
        documento_envio: data.documento_envio,
        // Datos del cliente que paga el pedido
        nombre_facturacion: data.nombre,
        apellido_facturacion: data.apellido,
        telefono_facturacion: data.telefono,
        documento_facturacion: data.documento_envio,
        // Datos de envio
        direccion_envio: data.direccion_envio,
        numero_direccion_envio: data.numero_direccion_envio,
        departamento_envio: data.departamento_envio,
        ciudad_envio: data.ciudad_envio,
        provincia_envio: provinciaEnvio,
        codigo_postal_envio: data.codigo_postal_envio,
        // Datos de facturacion
        direccion_facturacion: data.direccion_envio,
        numero_direccion_facturacion: data.numero_direccion_envio,
        departamento_facturacion: data.departamento_envio,
        ciudad_facturacion: data.ciudad_envio,
        provincia_facturacion: provinciaEnvio,
        codigo_postal_facturacion: data.codigo_postal_envio,
      };
    }
    if (!mismaDireccion && selectedMetodoEnvio === 'Andreani - $2000') {
      envioData = {
        // Datos del cliente que recibe el pedido
        nombre_envio: data.nombre,
        apellido_envio: data.apellido,
        telefono_envio: data.telefono,
        documento_envio: data.documento_envio,
        // Datos del cliente que paga el pedido
        nombre_facturacion: data.nombre_facturacion,
        apellido_facturacion: data.apellido_facturacion,
        telefono_facturacion: data.telefono_facturacion,
        documento_facturacion: data.documento_facturacion,
        // Datos de envio
        direccion_envio: data.direccion_envio,
        numero_direccion_envio: data.numero_direccion_envio,
        departamento_envio: data.departamento_envio,
        ciudad_envio: data.ciudad_envio,
        provincia_envio: provinciaEnvio,
        codigo_postal_envio: data.codigo_postal_envio,
        // Datos de facturacion
        direccion_facturacion: data.direccion_facturacion,
        numero_direccion_facturacion: data.numero_direccion_facturacion,
        departamento_facturacion: data.departamento_facturacion,
        ciudad_facturacion: data.ciudad_facturacion,
        provincia_facturacion: provinciaFacturacion,
        codigo_postal_facturacion: data.codigo_postal_facturacion,
      };
    }
    if (selectedMetodoEnvio === 'Retirar en el local - Gratis') {
      envioData = {
        // Datos del cliente que paga el pedido
        nombre_facturacion: data.nombre,
        apellido_facturacion: data.apellido,
        telefono_facturacion: data.telefono,
        documento_facturacion: data.documento,
        // Datos de facturacion
        direccion_facturacion: data.direccion,
        numero_direccion_facturacion: data.numero_direccion,
        ciudad_facturacion: data.ciudad,
        provincia_facturacion: provinciaFacturacion,
        codigo_postal_facturacion: data.codigo_postal,
      };
    }
    setEnvioInfo(envioData);

    if (envioData) {
      //navigate('/checkout/pago');
      console.log('Informacion: ', envioData);
    } else {
      console.error('Error al registrar el envio');
    }
  });

  useEffect(() => {
    const loadEnvioInfo = async () => {
      if (cartItems.length === 0) {
        navigate('/tienda');
      }
      /*if (envioInfo) {
        setValue('email', envioInfo.email);
        setValue('nombre', envioInfo.nombre);
        setValue('apellido', envioInfo.apellido);
        setValue('telefono', envioInfo.telefono);
        setValue('direccion_envio', envioInfo.direccion_envio);
        setValue('numero_direccion_envio', envioInfo.numero_direccion_envio);
        setValue('provincia', envioInfo.provincia);
        setValue('ciudad_envio', envioInfo.ciudad_envio);
        setValue('codigo_postal', envioInfo.codigo_postal);
      }*/
    };
    loadEnvioInfo();
  }, []);

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
            <p className='informacion-datos-p'>Información de contacto</p>
            <Input
              type='email'
              label='Correo electrónico'
              name='email'
              ternaria={register('email', {
                required: 'El correo electrónico es requerido',
              })}
            />
            {errors.email && <p className='error'>{errors.email.message}</p>}
          </div>

          {!codigoPostal && (
            <div className='informacion-datos'>
              <p className='informacion-datos-p'>Entrega</p>
              <Input
                type='number'
                label='Codigo Postal'
                name='codigo_postal_envio'
                ternaria={register('codigo_postal_envio', {
                  required: 'El código postal es requerido',
                })}
              />
              {errors.codigo_postal_envio && (
                <p className='error'>{errors.codigo_postal_envio.message}</p>
              )}
              {codigoPostalError && (
                <p className='error'>{codigoPostalError}</p>
              )}
              <div className='checkout-actions'>
                <Link to='/checkout'>
                  <Boton
                    textBoton='Volver'
                    secundario={true}
                    value={'volver'}
                  />
                </Link>
                <Boton
                  textBoton='Calcular'
                  onClick={handleCodigoPostal}
                  type={'button'}
                />
              </div>
            </div>
          )}

          {codigoPostal && (
            <div className='informacion-datos'>
              <p className='informacion-datos-p'>
                Seleccione el método de entrega
              </p>

              <CheckboxGroup
                options={paymentOptions}
                onSelectionChange={setSelectedMetodoEnvio}
              />

              <div className='informacion-boton-cambio'>
                <button
                  type='button'
                  onClick={handleCambiarCodigoPostal}
                >
                  Cambiar código postal
                </button>
              </div>
            </div>
          )}

          {selectedMetodoEnvio === 'Andreani - $2000' && (
            <div className='informacion-datos'>
              <p className='informacion-datos-p'>Datos de envío</p>

              <Input
                type='number'
                label='DNI o CUIL'
                name='documento'
                ternaria={register('documento_envio', {
                  required: 'El DNI o CUIL es requerido',
                })}
              />
              {errors.documento && (
                <p className='error'>{errors.documento.message}</p>
              )}

              <Input
                type='text'
                label='Nombre'
                name='nombre'
                ternaria={register('nombre', {
                  required: 'El nombre es requerido',
                })}
              />
              {errors.nombre && (
                <p className='error'>{errors.nombre.message}</p>
              )}

              <Input
                type='text'
                label='Apellido'
                name='apellido'
                ternaria={register('apellido', {
                  required: 'El apellido es requerido',
                })}
              />
              {errors.apellido && (
                <p className='error'>{errors.apellido.message}</p>
              )}

              <Input
                type='number'
                label='Teléfono'
                name='telefono'
                ternaria={register('telefono', {
                  required: 'El teléfono es requerido',
                })}
              />
              {errors.telefono && (
                <p className='error'>{errors.telefono.message}</p>
              )}

              <Input
                type='text'
                label='Dirección'
                name='direccion_envio'
                ternaria={register('direccion_envio', {
                  required: 'La dirección es requerida',
                })}
              />
              {errors.direccion_envio && (
                <p className='error'>{errors.direccion_envio.message}</p>
              )}

              <div className='ciudad-container'>
                <div className='ciudad-item'>
                  <Input
                    type='number'
                    label='Número (opcional)'
                    name='numero_direccion_envio'
                    ternaria={register('numero_direccion_envio')}
                  />
                </div>
                <div className='ciudad-item ciudad'>
                  <Input
                    type='text'
                    label='Departamento (opcional)'
                    name='departamento_envio'
                    ternaria={register('departamento_envio')}
                  />
                </div>
              </div>

              <Input
                type='text'
                label='Ciudad'
                name='ciudad_envio'
                ternaria={register('ciudad_envio', {
                  required: 'La ciudad es requerida',
                })}
              />
              {errors.ciudad_envio && (
                <p className='error'>{errors.ciudad_envio.message}</p>
              )}

              <Select
                labelText='Provincia'
                texto='Seleccione su provincia'
                data={provincias}
                value={provinciaEnvio}
                onChange={handleProvinciaEnvioChange}
              />
              {errors.provincia && (
                <p className='error'>La provincia es requerida</p>
              )}

              <div className='informacion-datos-chebox'>
                <label>
                  <input
                    type='checkbox'
                    checked={mismaDireccion}
                    onChange={() => setMismaDireccion(!mismaDireccion)}
                  />
                  Mis datos de facturación y entrega son los mismos
                </label>
              </div>

              {!mismaDireccion && (
                <>
                  <span>Persona que paga el pedido</span>
                  <Input
                    type='number'
                    label='DNI o CUIL'
                    name='documento'
                    ternaria={register('documento_facturacion', {
                      required: 'El DNI o CUIL es requerido',
                    })}
                  />
                  {errors.documento && (
                    <p className='error'>{errors.documento.message}</p>
                  )}

                  <Input
                    type='text'
                    label='Nombre'
                    name='nombre_facturacion'
                    ternaria={register('nombre_facturacion', {
                      required: 'El nombre es requerido',
                    })}
                  />
                  {errors.nombre_facturacion && (
                    <p className='error'>{errors.nombre_facturacion.message}</p>
                  )}

                  <Input
                    type='text'
                    label='Apellido'
                    name='apellido_facturacion'
                    ternaria={register('apellido_facturacion', {
                      required: 'El apellido es requerido',
                    })}
                  />
                  {errors.apellido_facturacion && (
                    <p className='error'>
                      {errors.apellido_facturacion.message}
                    </p>
                  )}

                  <Input
                    type='number'
                    label='Teléfono'
                    name='telefono_facturacion'
                    ternaria={register('telefono_facturacion', {
                      required: 'El teléfono es requerido',
                    })}
                  />
                  {errors.telefono_facturacion && (
                    <p className='error'>
                      {errors.telefono_facturacion.message}
                    </p>
                  )}

                  <Input
                    type='text'
                    label='Dirección'
                    name='direccion_facturacion'
                    ternaria={register('direccion_facturacion', {
                      required: 'La dirección es requerida',
                    })}
                  />
                  {errors.direccion_facturacion && (
                    <p className='error'>
                      {errors.direccion_facturacion.message}
                    </p>
                  )}

                  <div className='ciudad-container'>
                    <div className='ciudad-item'>
                      <Input
                        type='number'
                        label='Número (opcional)'
                        name='numero_direccion_facturacion'
                        ternaria={register('numero_direccion_facturacion')}
                      />
                    </div>
                    <div className='ciudad-item ciudad'>
                      <Input
                        type='text'
                        label='Departamento (opcional)'
                        name='departamento_facturacion'
                        ternaria={register('departamento_facturacion')}
                      />
                    </div>
                  </div>

                  <Input
                    type='text'
                    label='Ciudad'
                    name='ciudad_facturacion'
                    ternaria={register('ciudad_facturacion', {
                      required: 'La ciudad es requerida',
                    })}
                  />
                  {errors.ciudad_facturacion && (
                    <p className='error'>{errors.ciudad_facturacion.message}</p>
                  )}

                  <Input
                    type='number'
                    label='Código Postal'
                    name='codigo_postal_facturacion'
                    ternaria={register('codigo_postal_facturacion', {
                      required: 'El código postal es requerido',
                    })}
                  />
                  {errors.codigo_postal_facturacion && (
                    <p className='error'>
                      {errors.codigo_postal_facturacion.message}
                    </p>
                  )}

                  <Select
                    labelText='Provincia'
                    texto='Seleccione su provincia'
                    data={provincias}
                    value={provinciaFacturacion}
                    onChange={handleProvinciaFacturacionChange}
                  />
                  {errors.provincia && (
                    <p className='error'>La provincia es requerida</p>
                  )}
                </>
              )}
            </div>
          )}

          {selectedMetodoEnvio === 'Retirar en el local - Gratis' && (
            <div className='informacion-datos'>
              <p className='informacion-datos-p'>Datos de facturación</p>
              <Input
                type='number'
                label='DNI o CUIL'
                name='documento'
                ternaria={register('documento_facturacion', {
                  required: 'El DNI o CUIL es requerido',
                })}
              />
              {errors.documento && (
                <p className='error'>{errors.documento.message}</p>
              )}

              <Input
                type='text'
                label='Nombre'
                name='nombre'
                ternaria={register('nombre', {
                  required: 'El nombre es requerido',
                })}
              />
              {errors.nombre && (
                <p className='error'>{errors.nombre.message}</p>
              )}

              <Input
                type='text'
                label='Apellido'
                name='apellido'
                ternaria={register('apellido', {
                  required: 'El apellido es requerido',
                })}
              />
              {errors.apellido && (
                <p className='error'>{errors.apellido.message}</p>
              )}

              <Input
                type='number'
                label='Teléfono'
                name='telefono'
                ternaria={register('telefono', {
                  required: 'El teléfono es requerido',
                })}
              />
              {errors.telefono && (
                <p className='error'>{errors.telefono.message}</p>
              )}

              <div className='ciudad-container'>
                <div className='ciudad-item ciudad'>
                  <Input
                    type='text'
                    label='Dirección'
                    name='direccion'
                    ternaria={register('direccion_facturacion', {
                      required: 'La dirección es requerida',
                    })}
                  />
                  {errors.direccion && (
                    <p className='error'>{errors.direccion.message}</p>
                  )}
                </div>
                <div className='ciudad-item'>
                  <Input
                    type='number'
                    label='Número'
                    name='numero_direccion'
                    ternaria={register('numero_direccion_facturacion', {
                      required: 'El número de dirección es requerido',
                    })}
                  />
                  {errors.numero_direccion && (
                    <p className='error'>{errors.numero_direccion.message}</p>
                  )}
                </div>
              </div>
              <div className='ciudad-container'>
                <div className='ciudad'>
                  <Input
                    type='text'
                    label='Ciudad'
                    name='ciudad'
                    ternaria={register('ciudad_facturacion', {
                      required: 'La ciudad es requerida',
                    })}
                  />
                  {errors.ciudad && (
                    <p className='error'>{errors.ciudad.message}</p>
                  )}
                </div>
                <div className='ciudad-item'>
                  <Input
                    type='number'
                    label='Código Postal'
                    name='codigo_postal'
                    ternaria={register('codigo_postal_facturacion', {
                      required: 'El código postal es requerido',
                    })}
                  />
                  {errors.codigo_postal && (
                    <p className='error'>{errors.codigo_postal.message}</p>
                  )}
                </div>
              </div>

              <Select
                labelText='Provincia'
                texto='Seleccione su provincia'
                data={provincias}
                value={provinciaFacturacion}
                onChange={handleProvinciaFacturacionChange}
              />
              {errors.provincia && (
                <p className='error'>La provincia es requerida</p>
              )}

              <div className='informacion-datos-chebox'>
                <label>
                  <input type='checkbox' />
                  Otra persona va a retirar el pedido
                </label>
              </div>
            </div>
          )}

          {selectedMetodoEnvio && (
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
          )}
        </form>
      </section>

      <CartSection />
    </main>
  );
}
