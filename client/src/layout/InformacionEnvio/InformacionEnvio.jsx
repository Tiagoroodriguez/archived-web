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

  const [codigoPostalError, setCodigoPostalError] = useState('');

  const {
    register,
    watch,
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
    provinciaEnvio,
    setProvinciaEnvio,
    codigoPostal,
    setCodigoPostal,
    provinciaFacturacion,
    setProvinciaFacturacion,
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
        ...data,
        provincia_envio: provinciaEnvio,
        // Datos del cliente que paga el pedido
        email_facturacion: data.email_envio,
        nombre_facturacion: data.nombre_envio,
        apellido_facturacion: data.apellido_envio,
        telefono_facturacion: data.telefono_envio,
        documento_facturacion: data.documento_envio,
        // Datos de facturacion
        direccion_facturacion: data.direccion_envio,
        numero_direccion_facturacion: data.numero_direccion_envio,
        departamento_facturacion: data.departamento_envio,
        piso_facturacion: data.piso_envio,
        ciudad_facturacion: data.ciudad_envio,
        provincia_facturacion: provinciaEnvio,
        codigo_postal_facturacion: data.codigo_postal_envio,
      };
    }
    if (!mismaDireccion && selectedMetodoEnvio === 'Andreani - $2000') {
      envioData = {
        ...data,
        email_facturacion: data.email_envio,
        provincia_envio: provinciaEnvio,
        provincia_facturacion: provinciaFacturacion,
      };
    }
    if (selectedMetodoEnvio === 'Retirar en el local - Gratis') {
      envioData = {
        // Datos del cliente que paga el pedido
        email_facturacion: data.email_envio,
        nombre_facturacion: data.nombre_facturacion,
        apellido_facturacion: data.apellido_facturacion,
        telefono_facturacion: data.telefono_facturacion,
        documento_facturacion: data.documento_facturacion,
        // Datos de facturacion
        direccion_facturacion: data.direccion_facturacion,
        numero_direccion_facturacion: data.numero_direccion_facturacion,
        departamento_facturacion: data.departamento_facturacion,
        piso_facturacion: data.piso_facturacion,
        ciudad_facturacion: data.ciudad_facturacion,
        provincia_facturacion: provinciaFacturacion,
        codigo_postal_facturacion: data.codigo_postal_facturacion,
      };
    }
    setEnvioInfo(envioData);

    if (envioData) {
      navigate('/checkout/pago');
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
      if (envioInfo && selectedMetodoEnvio === 'Andreani - $2000') {
        setValue('email_envio', envioInfo.email_facturacion);
        setValue('codigo_postal_envio', envioInfo.codigo_postal_envio);
        setValue('nombre_envio', envioInfo.nombre_envio);
        setValue('apellido_envio', envioInfo.apellido_envio);
        setValue('telefono_envio', envioInfo.telefono_envio);
        setValue('documento_envio', envioInfo.documento_envio);
        setValue('direccion_envio', envioInfo.direccion_envio);
        setValue('numero_direccion_envio', envioInfo.numero_direccion_envio);
        setValue('departamento_envio', envioInfo.departamento_envio);
        setValue('piso_envio', envioInfo.piso_envio);
        setValue('ciudad_envio', envioInfo.ciudad_envio);
        setProvinciaEnvio(provinciaEnvio); // Set provinciaEnvio state
        if (!mismaDireccion) {
          setValue('email_facturacion', envioInfo.email_facturacion);
          setValue(
            'codigo_postal_facturacion',
            envioInfo.codigo_postal_facturacion
          );
          setValue('nombre_facturacion', envioInfo.nombre_facturacion);
          setValue('apellido_facturacion', envioInfo.apellido_facturacion);
          setValue('telefono_facturacion', envioInfo.telefono_facturacion);
          setValue('documento_facturacion', envioInfo.documento_facturacion);
          setValue('direccion_facturacion', envioInfo.direccion_facturacion);
          setValue(
            'numero_direccion_facturacion',
            envioInfo.numero_direccion_facturacion
          );
          setValue(
            'departamento_facturacion',
            envioInfo.departamento_facturacion
          );
          setValue('piso_facturacion', envioInfo.piso_facturacion);
          setValue('ciudad_facturacion', envioInfo.ciudad_facturacion);
          setProvinciaFacturacion(provinciaFacturacion); // Set provinciaFacturacion state
          setMismaDireccion(false);
        }
      }
      if (envioInfo && selectedMetodoEnvio === 'Retirar en el local - Gratis') {
        setValue('email_envio', envioInfo.email_facturacion);
        setValue('nombre_facturacion', envioInfo.nombre_facturacion);
        setValue('apellido_facturacion', envioInfo.apellido_facturacion);
        setValue('telefono_facturacion', envioInfo.telefono_facturacion);
        setValue('documento_facturacion', envioInfo.documento_facturacion);
        setValue('direccion_facturacion', envioInfo.direccion_facturacion);
        setValue(
          'numero_direccion_facturacion',
          envioInfo.numero_direccion_facturacion
        );
        setValue(
          'departamento_facturacion',
          envioInfo.departamento_facturacion
        );
        setValue('piso_facturacion', envioInfo.piso_facturacion);
        setValue('ciudad_facturacion', envioInfo.ciudad_facturacion);
        setValue(
          'codigo_postal_facturacion',
          envioInfo.codigo_postal_facturacion
        );
        setProvinciaFacturacion(provinciaFacturacion); // Set provinciaFacturacion state
      }
    };
    loadEnvioInfo();
  }, [cartItems, envioInfo, navigate, setValue]);

  return (
    <main className='checkout'>
      <section className='informacion-section'>
        <LogoTexto />
        <RutaCompra
          informacion
          detalleCompra
        />

        <form
          className='form-datos-envio'
          onSubmit={onSubmit}
        >
          <div className='informacion-datos'>
            <p className='informacion-datos-p'>Información de contacto</p>
            <Input
              type='email'
              label='Correo electrónico'
              name='email_envio'
              ternaria={register('email_envio', {
                required: 'El correo electrónico es requerido',
              })}
              value={watch('email_envio') || getValues('email_envio')}
            />
            {errors.email_envio && (
              <p className='error'>{errors.email_envio.message}</p>
            )}
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
                value={getValues('codigo_postal_envio')}
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
                selectedOption={selectedMetodoEnvio} // Estado controlado en el componente padre
                onSelectionChange={setSelectedMetodoEnvio} // Función para actualizar el estado en el componente padre
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
                value={getValues('documento_envio')}
              />
              {errors.documento_envio && (
                <p className='error'>{errors.documento_envio.message}</p>
              )}

              <Input
                type='text'
                label='Nombre'
                name='nombre'
                ternaria={register('nombre_envio', {
                  required: 'El nombre es requerido',
                })}
                value={getValues('nombre_envio')}
              />
              {errors.nombre_envio && (
                <p className='error'>{errors.nombre_envio.message}</p>
              )}

              <Input
                type='text'
                label='Apellido'
                name='apellido'
                ternaria={register('apellido_envio', {
                  required: 'El apellido es requerido',
                })}
                value={getValues('apellido_envio')}
              />
              {errors.apellido_envio && (
                <p className='error'>{errors.apellido_envio.message}</p>
              )}

              <Input
                type='number'
                label='Teléfono'
                name='telefono'
                ternaria={register('telefono_envio', {
                  required: 'El teléfono es requerido',
                })}
                value={getValues('telefono_envio')}
              />
              {errors.telefono_envio && (
                <p className='error'>{errors.telefono_envio.message}</p>
              )}

              <div className='ciudad-container'>
                <div className='ciudad-item'>
                  <Input
                    type='text'
                    label='Dirección'
                    name='direccion_envio'
                    ternaria={register('direccion_envio', {
                      required: 'La dirección es requerida',
                    })}
                    value={getValues('direccion_envio')}
                  />
                  {errors.direccion_envio && (
                    <p className='error'>{errors.direccion_envio.message}</p>
                  )}
                </div>
                <div className='ciudad-item ciudad'>
                  <Input
                    type='number'
                    label='Número'
                    name='numero_direccion_envio'
                    ternaria={register('numero_direccion_envio', {
                      required: 'El numero de direccion es requerido',
                    })}
                    value={getValues('numero_direccion_envio')}
                  />
                  {errors.numero_direccion_envio && (
                    <p className='error'>
                      {errors.numero_direccion_envio.message}
                    </p>
                  )}
                </div>
              </div>
              <div className='ciudad-container'>
                <div className='ciudad-item'>
                  <Input
                    type='text'
                    label='Departamento (opcional)'
                    name='departamento_envio'
                    ternaria={register('departamento_envio')}
                    value={getValues('departamento_envio')}
                  />
                </div>
                <div className='ciudad-item ciudad'>
                  <Input
                    type='text'
                    label='Piso (opcional)'
                    name='piso_envio'
                    ternaria={register('piso_envio')}
                    value={getValues('piso_envio')}
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
                value={getValues('ciudad_envio')}
              />
              {errors.ciudad_envio && (
                <p className='error'>{errors.ciudad_envio.message}</p>
              )}

              <Select
                labelText='Provincia'
                value={provinciaEnvio} // Estado controlado en el componente padre
                onChange={handleProvinciaEnvioChange} // Función para actualizar el estado en el componente padre
                texto='Seleccione una provincia'
                data={provincias}
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
                    value={getValues('documento_facturacion')}
                  />
                  {errors.documento_facturacion && (
                    <p className='error'>
                      {errors.documento_facturacion.message}
                    </p>
                  )}

                  <Input
                    type='text'
                    label='Nombre'
                    name='nombre_facturacion'
                    ternaria={register('nombre_facturacion', {
                      required: 'El nombre es requerido',
                    })}
                    value={getValues('nombre_facturacion')}
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
                    value={getValues('apellido_facturacion')}
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
                    value={getValues('telefono_facturacion')}
                  />
                  {errors.telefono_facturacion && (
                    <p className='error'>
                      {errors.telefono_facturacion.message}
                    </p>
                  )}

                  <div className='ciudad-container'>
                    <div className='ciudad-item'>
                      <Input
                        type='text'
                        label='Dirección'
                        name='direccion_facturacion'
                        ternaria={register('direccion_facturacion', {
                          required: 'La dirección es requerida',
                        })}
                        value={getValues('direccion_facturacion')}
                      />
                      {errors.direccion_envio && (
                        <p className='error'>
                          {errors.direccion_facturacion.message}
                        </p>
                      )}
                    </div>
                    <div className='ciudad-item ciudad'>
                      <Input
                        type='number'
                        label='Número'
                        name='numero_direccion_facturacion'
                        ternaria={register('numero_direccion_facturacion', {
                          required: 'El numero de direccion es requerido',
                        })}
                        value={getValues('numero_direccion_facturacion')}
                      />
                      {errors.numero_direccion_envio && (
                        <p className='error'>
                          {errors.numero_direccion_facturacion.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='ciudad-container'>
                    <div className='ciudad-item'>
                      <Input
                        type='text'
                        label='Departamento (opcional)'
                        name='departamento_facturacion'
                        ternaria={register('departamento_facturacion')}
                        value={getValues('departamento_facturacion')}
                      />
                    </div>
                    <div className='ciudad-item ciudad'>
                      <Input
                        type='text'
                        label='Piso (opcional)'
                        name='piso_facturacion'
                        ternaria={register('piso_facturacion')}
                        value={getValues('piso_facturacion')}
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
                    value={getValues('ciudad_facturacion')}
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
                    value={getValues('codigo_postal_facturacion')}
                  />
                  {errors.codigo_postal_facturacion && (
                    <p className='error'>
                      {errors.codigo_postal_facturacion.message}
                    </p>
                  )}

                  <Select
                    labelText='Provincia'
                    value={provinciaFacturacion} // Estado controlado en el componente padre
                    onChange={handleProvinciaFacturacionChange} // Función para actualizar el estado en el componente padre
                    texto='Seleccione una provincia'
                    data={provincias}
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
                name='documento_facturacion'
                ternaria={register('documento_facturacion', {
                  required: 'El DNI o CUIL es requerido',
                })}
                value={getValues('documento_facturacion')}
              />
              {errors.documento_facturacion && (
                <p className='error'>{errors.documento_facturacion.message}</p>
              )}

              <Input
                type='text'
                label='Nombre'
                name='nombre'
                ternaria={register('nombre_facturacion', {
                  required: 'El nombre es requerido',
                })}
                value={getValues('nombre_facturacion')}
              />
              {errors.nombre_facturacion && (
                <p className='error'>{errors.nombre_facturacion.message}</p>
              )}

              <Input
                type='text'
                label='Apellido'
                name='apellido'
                ternaria={register('apellido_facturacion', {
                  required: 'El apellido es requerido',
                })}
                value={getValues('apellido_facturacion')}
              />
              {errors.apellido_facturacion && (
                <p className='error'>{errors.apellido_facturacion.message}</p>
              )}

              <Input
                type='number'
                label='Teléfono'
                name='telefono'
                ternaria={register('telefono_facturacion', {
                  required: 'El teléfono es requerido',
                })}
                value={getValues('telefono_facturacion')}
              />
              {errors.telefono_facturacion && (
                <p className='error'>{errors.telefono_facturacion.message}</p>
              )}

              <div className='ciudad-container'>
                <div className='ciudad-item'>
                  <Input
                    type='text'
                    label='Dirección'
                    name='direccion_facturacion'
                    ternaria={register('direccion_facturacion', {
                      required: 'La dirección es requerida',
                    })}
                    value={getValues('direccion_facturacion')}
                  />
                  {errors.direccion_envio && (
                    <p className='error'>
                      {errors.direccion_facturacion.message}
                    </p>
                  )}
                </div>
                <div className='ciudad-item ciudad'>
                  <Input
                    type='number'
                    label='Número'
                    name='numero_direccion_facturacion'
                    ternaria={register('numero_direccion_facturacion', {
                      required: 'El numero de direccion es requerido',
                    })}
                    value={getValues('numero_direccion_facturacion')}
                  />
                  {errors.numero_direccion_envio && (
                    <p className='error'>
                      {errors.direccion_facturacion.message}
                    </p>
                  )}
                </div>
              </div>
              <div className='ciudad-container'>
                <div className='ciudad-item'>
                  <Input
                    type='text'
                    label='Departamento (opcional)'
                    name='departamento_facturacion'
                    ternaria={register('departamento_facturacion')}
                    value={getValues('departamento_facturacion')}
                  />
                </div>
                <div className='ciudad-item ciudad'>
                  <Input
                    type='text'
                    label='Piso (opcional)'
                    name='piso_facturacion'
                    ternaria={register('piso_facturacion')}
                    value={getValues('piso_facturacion')}
                  />
                </div>
              </div>
              <Input
                type='text'
                label='Ciudad'
                name='ciudad'
                ternaria={register('ciudad_facturacion', {
                  required: 'La ciudad es requerida',
                })}
                value={getValues('ciudad_facturacion')}
              />
              {errors.ciudad_facturacion && (
                <p className='error'>{errors.ciudad_facturacion.message}</p>
              )}
              <Input
                type='number'
                label='Código Postal'
                name='codigo_postal'
                ternaria={register('codigo_postal_facturacion', {
                  required: 'El código postal es requerido',
                })}
                value={getValues('codigo_postal_facturacion')}
              />
              {errors.codigo_postal_facturacion && (
                <p className='error'>
                  {errors.codigo_postal_facturacion.message}
                </p>
              )}

              <Select
                labelText='Provincia'
                value={provinciaFacturacion} // Estado controlado en el componente padre
                onChange={handleProvinciaFacturacionChange} // Función para actualizar el estado en el componente padre
                texto='Seleccione una provincia'
                data={provincias}
              />
              {errors.provincia && (
                <p className='error'>La provincia es requerida</p>
              )}
            </div>
          )}

          {selectedMetodoEnvio && (
            <div className='checkout-actions'>
              <Link to='/checkout'>
                <Boton
                  textBoton='Volver'
                  secundario={true}
                  value={'volver'}
                  onClick={() => null}
                />
              </Link>

              <Boton
                textBoton='Continuar'
                type='submit'
                onClick={() => null}
              />
            </div>
          )}
        </form>
      </section>

      <CartSection />
    </main>
  );
}
