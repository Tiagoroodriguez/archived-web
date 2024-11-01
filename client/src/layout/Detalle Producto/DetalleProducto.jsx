import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { CartContext } from '../../context/CarritoContext';
//import { calculateShipment } from '../../api/envio';
import axios from '../../api/axios';
import { Boton } from '../../components/Boton/Boton';
import { useProduct } from '../../context/ProductContext';

import './DetalleProducto.css';
import Acordeon from '../../components/Acordeon/Arcodeon';
import { formatPrice } from '../../utils/formatePrice';
import Recomendaciones from '../../components/Recomendaciones/Recomendaciones';
import { Helmet } from 'react-helmet';
import Input from '../../components/Input/Input';
import Tabla from './Tabla';

export function DetalleProducto() {
  const [producto, setProducto] = useState(null);
  const [talleSeleccionado, setTalleSeleccionado] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [imagenSeleccionada, setImagenSeleccionada] = useState(0);
  const [modalImagenAbierta, setModalImagenAbierta] = useState(false);
  const [loading, setLoading] = useState(false);
  const [envio, setEnvio] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [weight, setWeight] = useState(0);

  const { getProduct } = useProduct();
  const { addToCart } = useContext(CartContext);

  const params = useParams();

  useEffect(() => {
    async function loadProduct() {
      if (params.id) {
        const producto = await getProduct(params.id);
        setProducto(producto);
        const talleDefecto = determinarTallePorDefecto(producto);
        setTalleSeleccionado(talleDefecto);
      }
    }
    loadProduct();
  }, [params.id, getProduct]);

  const determinarTallePorDefecto = (producto) => {
    if (producto.cant_s > 0) return 'S';
    if (producto.cant_m > 0) return 'M';
    if (producto.cant_l > 0) return 'L';
    if (producto.cant_xl > 0) return 'XL';
    if (producto.cant_xxl > 0) return 'XXL';
    return ''; // Si no hay stock en ningún talle
  };

  const handleTalleSeleccionado = (talle) => {
    setTalleSeleccionado(talle);
  };

  const handleAddToCart = () => {
    addToCart(producto, talleSeleccionado);
  };

  const abrirModalImagen = (indice) => {
    setImagenSeleccionada(indice);
    setModalImagenAbierta(true);
  };

  const cerrarModalImagen = () => {
    setModalImagenAbierta(false);
  };

  const siguienteImagen = () => {
    setImagenSeleccionada((prevIndice) => (prevIndice + 1) % 4);
  };

  const anteriorImagen = () => {
    setImagenSeleccionada((prevIndice) => (prevIndice - 1 + 4) % 4);
  };

  const handdleCalcularEnvio = async () => {
    if (zipCode === '5986') {
      setEnvio({ price: 0 });
      return;
    }
    if (zipCode && !loading) {
      setLoading(true);
      if (
        producto.categoria === 'Remera boxy' ||
        producto.categoria === 'Remera oversize'
      ) {
        setWeight(200); // 200 gramos
      } else {
        setWeight(416); // 416 gramos
      }

      try {
        const res = await axios.post('/calculate-shipping', {
          zipCode,
          weight,
        });
        setEnvio(res.data);
      } catch (error) {
        console.error('Error calculando envío:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const descripcion = producto ? producto.descripcion : '';
  const arcodeonData = [
    {
      title: 'Detalles del producto',
      content: (
        <div className='detalle-producto-acordeon'>
          <div dangerouslySetInnerHTML={{ __html: descripcion }} />
        </div>
      ),
      icon: 'bi bi-file-earmark-text',
    },
    {
      title: 'Guia de talles',
      content: (
        <>
          {producto && (
            <div>
              <Tabla
                producto={producto}
                oversize={
                  producto.categoria === 'Remera oversize' ? true : false
                }
                boxy={producto.categoria === 'Remera boxy' ? true : false}
                buzo={producto.categoria === 'Buzo' ? true : false}
              />
            </div>
          )}
        </>
      ),
      icon: 'bi bi-tag',
    },
    {
      title: 'Envíos',
      content: (
        <div className='detalle-producto-acordeon bg-none'>
          {envio ? (
            <div>
              {envio.price === 0 ? (
                <>
                  <div className='w-full flex justify-between items-center mb-2'>
                    <p>Envío a domicilio</p>
                    <button
                      className='cambiar-cp-boton'
                      onClick={() => setEnvio(null)}
                    >
                      Cambiar CP
                    </button>
                  </div>
                  <div className='w-full flex justify-between items-center border p-2 rounded-[5px]'>
                    <div>
                      <p className='text-xs'>
                        <strong>Envío gratis</strong>
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className='w-full flex justify-between items-center mb-2'>
                    <p>Envío a domicilio</p>
                    <button
                      className='cambiar-cp-boton'
                      onClick={() => setEnvio(null)}
                    >
                      Cambiar CP
                    </button>
                  </div>
                  <div className='w-full flex justify-between items-center border p-2 rounded-[5px]'>
                    <div>
                      <p className='text-xs'>Envió estándar por ShipNow</p>
                      <p className='text-xs opacity-[60%]'>
                        El pedido llega entre 14/10 y 16/10
                      </p>
                    </div>
                    <p className='text-[15px]'>
                      <strong>{formatPrice(envio.price)}</strong>
                    </p>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className='w-full'>
              <Input
                label='Codigo postal'
                onChange={(e) => setZipCode(e.target.value)}
                value={zipCode}
              />
              <Boton
                textBoton='Calcular'
                load={loading}
                desactivado={loading}
                onClick={handdleCalcularEnvio}
              />
            </div>
          )}
        </div>
      ),
      icon: 'bi bi-truck',
    },
  ];

  return (
    <main>
      {producto ? (
        <>
          <Helmet>
            <meta charSet='utf-8' />
            <title>
              {producto.categoria} {producto.nombre} | Archived
            </title>
            <meta
              name='description'
              content={`Pagina de ${producto.categoria} ${producto.nombre}`}
            />
            <link
              rel='canonical'
              href={`http://archived.com.ar/detalle-producto ${producto._id}`}
            />
          </Helmet>
          <section className='detalle-container'>
            <div className='img-container'>
              {Array.from({ length: 4 }).map((_, index) => (
                <img
                  key={index}
                  className='img'
                  src={producto[`img_big_${index + 1}`]}
                  alt={`imagen numero ${index + 1} del producto ${
                    producto.nombre
                  }`}
                  onClick={() => abrirModalImagen(index)}
                />
              ))}
            </div>

            {modalImagenAbierta && (
              <div className='modal-imagen'>
                <button
                  className='cerrar-modal'
                  onClick={cerrarModalImagen}
                >
                  &times;
                </button>
                <button
                  className='anterior-imagen'
                  onClick={anteriorImagen}
                >
                  &#10094;
                </button>
                <img
                  className='imagen-pantalla-completa'
                  src={producto[`img_big_${imagenSeleccionada + 1}`]}
                  alt={`imagen numero ${imagenSeleccionada + 1} del producto ${
                    producto.nombre
                  }`}
                />
                <button
                  className='siguiente-imagen'
                  onClick={siguienteImagen}
                >
                  &#10095;
                </button>
              </div>
            )}

            <div className='informacion-container'>
              <div className='informacion-dp'>
                <span className='nombre-producto'>{`${producto.categoria} ${producto.nombre}`}</span>
                <div className='precio-texto'>
                  {producto.discount ? (
                    <p>
                      <span>{formatPrice(producto.precio)} </span>{' '}
                      {formatPrice(producto.precio_con_descuento)}
                    </p>
                  ) : (
                    formatPrice(producto.precio)
                  )}
                </div>
              </div>

              <div className='division'></div>

              <div className='talles'>
                <span className='talle-seleccionado'>
                  Talle: {talleSeleccionado}
                </span>
                <div className='talles-container'>
                  {['S', 'M', 'L', 'XL', 'XXL'].map((talle) => (
                    <Boton
                      key={talle}
                      textBoton={talle}
                      desactivado={
                        producto[`cant_${talle.toLowerCase()}`] === 0
                      }
                      secundario={true}
                      onClick={() => handleTalleSeleccionado(talle)}
                      value={talle}
                      selected={talleSeleccionado}
                    />
                  ))}
                </div>
                {/*producto[`cant_${talleSeleccionado.toLowerCase()}`] < 5 ? (
                  <span className='talles-aviso'>Quedan pocas unidades!</span>
                ) : (
                  ''
                )*/}
              </div>
              <Boton
                type='submit'
                textBoton={
                  talleSeleccionado === '' ? 'Sin stock' : 'Agregar al carrito'
                }
                onClick={handleAddToCart}
                desactivado={talleSeleccionado === ''}
              />
              <Acordeon
                data={arcodeonData}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            </div>
          </section>
          {/*<section className='detalle-container'>
            <Recomendaciones selectedProductId={params.id} />
          </section>*/}
        </>
      ) : (
        <section className='detalle-container'>
          <div className='img-container-esquleto'>
            <div className='img-esqueleto'></div>
            <div className='img-esqueleto mobile-img-esqueleto'></div>
            <div className='img-esqueleto mobile-img-esqueleto'></div>
            <div className='img-esqueleto mobile-img-esqueleto'></div>
          </div>

          <div className='informacion-container-esqueleto'>
            <div className='informacion-esqueleto'></div>
            <div className='informacion-esqueleto'></div>
            <div className='informacion-desc-esqueleto'></div>
            <div className='informacion-desc-esqueleto'></div>
            <div className='informacion-desc-esqueleto'></div>
          </div>
        </section>
      )}
    </main>
  );
}
