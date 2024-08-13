import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { CartContext } from '../../context/CarritoContext';

import { Boton } from '../../components/Boton/Boton';
import { useProduct } from '../../context/ProductContext';

import './DetalleProducto.css';
import Acordeon from '../../components/Acordeon/Arcodeon';
import { formatPrice } from '../../utils/formatePrice';
import Recomendaciones from '../../components/Recomendaciones/Recomendaciones';
import { Helmet } from 'react-helmet';

export function DetalleProducto() {
  const [producto, setProducto] = useState(null);
  const [talleSeleccionado, setTalleSeleccionado] = useState('');
  const [imagenSeleccionada, setImagenSeleccionada] = useState(0);
  const [modalImagenAbierta, setModalImagenAbierta] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

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
  console.log(producto);

  const descripcion = producto ? producto.descripcion : '';
  const arcodeonData = [
    {
      title: 'Detalles de producto',
      content: (
        <div className='detalle-producto-acordeon'>
          <div dangerouslySetInnerHTML={{ __html: descripcion }} />
        </div>
      ),
      icon: 'bi bi-file-earmark-text',
    },
    {
      title: 'Guia de talles',
      content: <></>,
      icon: 'bi bi-tag',
    },
    {
      title: 'Envios',
      content: (
        <div className='detalle-producto-acordeon'>
          <p>Realizamos envios gratis a todo el pais.</p>
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
                  src={`/images/productos/big/${index + 1}-${
                    producto.nombre
                  }.webp`}
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
                  src={`/images/productos/big/${imagenSeleccionada + 1}-${
                    producto.nombre
                  }.webp`}
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
                <span className='precio-producto'>
                  {formatPrice(producto.precio)}
                </span>
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
                {producto[`cant_${talleSeleccionado.toLowerCase()}`] < 5 ? (
                  <span className='talles-aviso'>Quedan pocas unidades!</span>
                ) : (
                  ''
                )}
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
          <section className='detalle-container'>
            <Recomendaciones selectedProductId={params.id} />
          </section>
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
