import { Producto } from '../Producto/Producto';
import './Novedades.css';
import { useEffect } from 'react';
import { useProduct } from '../../context/ProductContext';

export function Novedades({ categoria, cantidad, titulo }) {
  const { getProducts, products } = useProduct();

  useEffect(() => {
    getProducts(cantidad, categoria);
  }, []);

  return (
    <section className='novedades-section'>
      <div className='novedades-text'>
        <p>{titulo}</p>
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
