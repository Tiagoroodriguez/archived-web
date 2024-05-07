import { Producto } from '../../components/Producto/Producto';

import './Tienda.css';
import { useProduct } from '../../context/ProductContext';
import { useEffect } from 'react';

export function Tienda() {
  const { getProducts, products } = useProduct();

  useEffect(() => {
    getProducts();
  }, []);

  if (products.lenght === 0) return <h1>No hay productos</h1>;

  return (
    <>
      <main>
        <div className='tienda-header'>
          <img src='/images/tienda/perchero.webp' />
          <h1>Tienda Oficial de Archived 222</h1>
        </div>
        <section className='tienda'>
          <nav className='tienda-filtros'></nav>

          <section className='productos-container'>
            {products.map((product) => (
              <Producto
                key={product._id}
                producto={product}
              />
            ))}
          </section>
        </section>
      </main>
    </>
  );
}
