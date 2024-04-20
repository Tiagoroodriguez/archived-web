import { Producto } from '../Producto/Producto';
import './Novedades.css';
import { useEffect } from 'react';
import { useProduct } from '../../context/ProductContext';

export function Novedades() {
  const { getProducts, products } = useProduct();

  useEffect(() => {
    getProducts(4, 'remera');
  }, []);

  return (
    <section className='novedades-section'>
      <div className='novedades-text'>
        <p>Conoce nuestra ultimo drop</p>
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
