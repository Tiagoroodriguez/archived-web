import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './DetalleProducto.css';
import { InformacionEnvios } from '../../components/InformacionEnvios/InformacionEnvios';
import { Boton } from '../../components/Boton/Boton';
import { useProduct } from '../../context/ProductContext';

export function DetalleProducto() {
  const { getProduct } = useProduct();
  const [producto, setProducto] = useState(null);
  const params = useParams();

  useEffect(() => {
    async function loadProduct() {
      if (params.id) {
        const producto = await getProduct(params.id);
        setProducto(producto);
      }
    }
    loadProduct();
  }, []);
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
            </div>

            <div className='division'></div>

            <div className='talles'>
              <span className='talle-seleccionado'>Talle: X</span>
              <div className='talles-container'>
                <button className='boton-talle'>S</button>
                <button className='boton-talle'>M</button>
                <button className='boton-talle'>L</button>
                <button className='boton-talle'>XL</button>
              </div>
            </div>

            <div className='cantiadad'>
              <span className='cantidad-text'>Cantidad</span>
              <input type='number'></input>
            </div>

            <Boton
              type='sudmit'
              textBoton='Agregar al carrito'
            />
          </div>
        </section>
      )}
      <InformacionEnvios />
    </>
  );
}
