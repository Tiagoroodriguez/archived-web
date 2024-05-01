import { Link, useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { CartContext } from '../../context/CarritoContext';

import { InformacionEnvios } from '../../components/InformacionEnvios/InformacionEnvios';
import { Boton } from '../../components/Boton/Boton';
import { useProduct } from '../../context/ProductContext';

import './DetalleProducto.css';

export function DetalleProducto() {
  const [producto, setProducto] = useState(null);
  const [talleSeleccionado, setTalleSeleccionado] = useState('');

  const { getProduct } = useProduct();
  const { cartItems, addToCart } = useContext(CartContext);

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

  return (
    <>
      {producto && (
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
                <Boton
                  textBoton='S'
                  desactivado={producto.cant_s <= 0}
                  secundario={true}
                  onClick={() => handleTalleSeleccionado('S')}
                />
                <Boton
                  textBoton='M'
                  desactivado={producto.cant_m <= 0}
                  secundario={true}
                  onClick={() => handleTalleSeleccionado('M')}
                />
                <Boton
                  textBoton='L'
                  desactivado={producto.cant_l <= 0}
                  secundario={true}
                  onClick={() => handleTalleSeleccionado('L')}
                />
                <Boton
                  textBoton='XL'
                  desactivado={producto.cant_xl <= 0}
                  secundario={true}
                  onClick={() => handleTalleSeleccionado('XL')}
                />
                <Boton
                  textBoton='XXL'
                  desactivado={producto.cant_xxl <= 0}
                  secundario={true}
                  onClick={() => handleTalleSeleccionado('XXL')}
                />
              </div>
              <Link to=''>Guia de talles</Link>
            </div>

            <Boton
              type='sudmit'
              textBoton={
                talleSeleccionado === '' ? 'Sin stock' : 'Agregar al carrito'
              }
              onClick={() => addToCart(producto)}
              desactivado={talleSeleccionado === ''}
            />
          </div>
        </section>
      )}
      <InformacionEnvios />
    </>
  );
}
