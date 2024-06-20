import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { CartContext } from '../../context/CarritoContext';

import { Boton } from '../../components/Boton/Boton';
import { useProduct } from '../../context/ProductContext';
import { Tabla } from '../../components/Tabla/Tabla';

import './DetalleProducto.css';

export function DetalleProducto() {
  const [producto, setProducto] = useState(null);
  const [talleSeleccionado, setTalleSeleccionado] = useState('');
  const [modalAbierta, setModalAbierta] = useState(false);

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
  }, []);

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

  const abrirModal = () => {
    setModalAbierta(true);
  };

  const cerrarModal = () => {
    setModalAbierta(false);
  };

  return (
    <main>
      {producto ? (
        <section className='detalle-container'>
          <div className='img-container'>
            <img
              className='img'
              src={`/images/productos/big/1-${producto.nombre}.webp`}
              alt={`imagen numero uno del producto ${producto.nombre}`}
            />
            <img
              className='img'
              src={`/images/productos/big/2-${producto.nombre}.webp`}
              alt={`imagen numero dos del producto ${producto.nombre}`}
            />
            <img
              className='img'
              src={`/images/productos/big/3-${producto.nombre}.webp`}
              alt={`imagen numero tres del producto ${producto.nombre}`}
            />
            <img
              className='img'
              src={`/images/productos/big/4-${producto.nombre}.webp`}
              alt={`imagen numero cuatro del producto ${producto.nombre}`}
            />
          </div>

          <div className='informacion-container'>
            <div className='informacion-dp'>
              <span className='nombre-producto'>{producto.nombre}</span>
              <span className='precio-producto'>${producto.precio}</span>
              <p className='descripcion-producto'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatibus, accusamus? Incidunt, eos! Consectetur ex tempora
                officia sed, minima obcaecati iste, doloribus odit consequatur,
                deserunt fugiat porro voluptatum omnis ut reiciendis?
              </p>
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
                    desactivado={producto[`cant_${talle.toLowerCase()}`] === 0}
                    secundario={true}
                    onClick={() => handleTalleSeleccionado(talle)}
                    value={talle}
                    selected={talleSeleccionado}
                  />
                ))}
              </div>

              <button
                className='modal-talle-boton'
                onClick={abrirModal}
              >
                Ver Guía de Tallas
              </button>
              {modalAbierta && (
                <Tabla
                  onClose={cerrarModal}
                  sAncho='10'
                  sLargo='10'
                  mAncho='20'
                  mLargo='20'
                  lAncho='30'
                  lLargo='30'
                  xlAncho='40'
                  xlLargo='40'
                />
              )}
            </div>

            <Boton
              type='sudmit'
              textBoton={
                talleSeleccionado === '' ? 'Sin stock' : 'Agregar al carrito'
              }
              onClick={handleAddToCart}
              desactivado={talleSeleccionado === ''}
            />
          </div>
        </section>
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
