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
import Select from '../../components/Select/Select';
import axios from '../../api/axios';
import './InformacionEnvio.css';
import CartSection from '../../components/CartSection/CartSection';
import { Helmet } from 'react-helmet';
import { formatPrice } from '../../utils/formatePrice';
import { formatDate } from '../../utils/formatDate';

export default function InformacionEnvio() {
  const navigate = useNavigate();
  const [codigoPostalError, setCodigoPostalError] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [loading, setLoading] = useState(false);

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
    provinciaFacturacion,
    setProvinciaFacturacion,
    costoEnvio,
    setCostoEnvio,
  } = usePedido();

  const handleCambiarCodigoPostal = () => {
    setZipCode('');
    setSelectedMetodoEnvio('');
    setCostoEnvio(null);
  };

  const handleProvinciaEnvioChange = (newValue) => {
    setProvinciaEnvio(newValue);
  };

  const handleProvinciaFacturacionChange = (newValue) => {
    setProvinciaFacturacion(newValue);
  };

  const handdleCalcularEnvio = async () => {
    if (!zipCode) {
      setCodigoPostalError('El código postal es requerido');
      return;
    }
    if (zipCode.length !== 4) {
      setCodigoPostalError('El código postal debe tener 4 dígitos');
      return;
    }
    setCodigoPostalError('');
    if (zipCode === '5986') {
      setCostoEnvio({ price: 0 });
      return;
    }
    if (zipCode && !loading) {
      setLoading(true);
      const weight = 416;
      try {
        const res = await axios.post('/calculate-shipping', {
          zipCode,
          weight,
        });
        setCostoEnvio(res.data);
      } catch (error) {
        setCodigoPostalError('No se pudo calcular el envío');
        console.error('Error calculando envío:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    let envioData;

    // Setear datos si tengo envio a domicilio y misma direccion de envio y facturacion
    if (mismaDireccion && selectedMetodoEnvio === 'Envio') {
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
    if (!mismaDireccion && selectedMetodoEnvio === 'Envio') {
      envioData = {
        ...data,
        email_facturacion: data.email_envio,
        provincia_envio: provinciaEnvio,
        provincia_facturacion: provinciaFacturacion,
      };
    }
    if (selectedMetodoEnvio === 'Retirar') {
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
      <Helmet>
        <meta charSet='utf-8' />
        <title>Checkout - Información | Archived</title>
        <meta
          name='description'
          content='Seccion de informacion por compra de archived'
        />
        <link
          rel='canonical'
          href='http://archived.com.ar/checkout/entrega'
        />
      </Helmet>
      <section className='informacion-section'>
        <LogoTexto />
        <div className='contenedor-ruta w-full'>
          <RutaCompra
            informacion
            detalleCompra
          />
        </div>

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

          {!costoEnvio && (
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
                onChange={(e) => setZipCode(e.target.value)}
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
                  onClick={handdleCalcularEnvio}
                  type={'button'}
                />
              </div>
            </div>
          )}

          {costoEnvio && (
            <div className='informacion-datos'>
              <p className='informacion-datos-p'>
                Seleccione el método de entrega
              </p>

              <div className='flex flex-col gap-2'>
                <div className='w-full border rounded-lg p-5 flex justify-between items-center'>
                  <div>
                    <div className='flex'>
                      <input
                        type='radio'
                        id='shipnow'
                        checked={selectedMetodoEnvio === 'Envio'}
                        onChange={() => setSelectedMetodoEnvio('Envio')}
                        className='input-radio mr-2'
                      />
                      <label
                        htmlFor='shipnow'
                        className='text-[12px]'
                      >
                        Envío a domicilio
                      </label>
                    </div>

                    <p className='text-xs opacity-[60%]'>
                      {zipCode === '5986' ? (
                        <>El pedido sera enviado durante la semana</>
                      ) : (
                        <>
                          El pedido llega entre{' '}
                          {formatDate(costoEnvio.minimum_delivery)}y{' '}
                          {formatDate(costoEnvio.maximum_delivery)}
                        </>
                      )}
                    </p>
                  </div>
                  <p className='text-[15px]'>
                    {zipCode === '5986' ? (
                      <strong>Gratis</strong>
                    ) : (
                      <strong>{formatPrice(costoEnvio.price)}</strong>
                    )}
                  </p>
                </div>
                <div className='w-full border rounded-lg p-5 flex justify-between items-center'>
                  <div>
                    <label
                      htmlFor='retiro'
                      className='text-[12px]'
                    >
                      <input
                        type='radio'
                        id='retiro'
                        checked={selectedMetodoEnvio === 'Retirar'}
                        onChange={() => setSelectedMetodoEnvio('Retirar')}
                        className='input-radio mr-2'
                      />
                      Retiro en el local
                    </label>
                    <p className='text-xs opacity-[60%]'>
                      25 de febrero 1481, Oncativo, Córdoba, Argentina
                    </p>
                  </div>
                  <p className='text-[15px]'>
                    <strong>Gratis</strong>
                  </p>
                </div>
              </div>

              <div className='informacion-boton-cambio'>
                <button
                  type='button'
                  onClick={handleCambiarCodigoPostal}
                  aria-label='Cambiar codigo postal'
                >
                  Cambiar código postal
                </button>
              </div>
            </div>
          )}

          {selectedMetodoEnvio === 'Envio' && (
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
                <div className='ciudad-item ciudad'>
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
                <div className='ciudad-item'>
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
                <div className='ciudad-item ciudad'>
                  <Input
                    type='text'
                    label='Departamento (opcional)'
                    name='departamento_envio'
                    ternaria={register('departamento_envio')}
                    value={getValues('departamento_envio')}
                  />
                </div>
                <div className='ciudad-item'>
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

          {selectedMetodoEnvio === 'Retirar' && (
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
