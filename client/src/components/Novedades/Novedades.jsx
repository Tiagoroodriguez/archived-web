import { Producto } from '../Producto/Producto';
import { BotonColor } from '../BotonColor/BotonColor';
import './Novedades.css';
import { useEffect } from 'react';
import { useProduct } from '../../context/ProductContext';

export function Novedades() {
  const { getProducts, products } = useProduct();

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className='novedades-section'>
      <div className='mensaje-container'>
        <p>No somos una marca, somos un movimiento</p>
      </div>

      <article className='novedades-container'>
        {products.map((product) => (
          <Producto
            key={product._id}
            producto={product}
          />
        ))}
      </article>
    </section>
  );
}
