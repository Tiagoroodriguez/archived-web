import { useEffect, useState } from 'react';
import { useProduct } from '../../context/ProductContext';
import { Producto } from '../Producto/Producto';
import { Link } from 'react-router-dom';
import { Boton } from '../Boton/Boton';
import './Novedades.css';
import { ProductoEsqueleto } from '../ProductoEsqueleto/ProductoEsqueleto';

export function Novedades({ cantidad, categoria, coleccion, titulo }) {
  const { getProducts } = useProduct();
  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts(cantidad, categoria, coleccion);
        setCategoryProducts(res);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [cantidad, categoria, getProducts]);

  return (
    <section className='novedades-section'>
      <div className='novedades-text'>
        <p>{titulo}</p>
      </div>
      {categoryProducts ? (
        <article className='novedades-container'>
          {categoryProducts.map((product) => (
            <Producto
              key={product._id}
              producto={product}
            />
          ))}
        </article>
      ) : (
        <article className='novedades-container'>
          <ProductoEsqueleto />
          <ProductoEsqueleto />
          <ProductoEsqueleto />
          <ProductoEsqueleto />
        </article>
      )}
      <Link
        to={`/tienda?categoria=all`}
        className='todos-productos'
      >
        <Boton
          type='submit'
          textBoton='view all'
          terceario
          value='volver'
        />
      </Link>
    </section>
  );
}
