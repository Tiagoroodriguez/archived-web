import { useEffect, useState } from 'react';
import { usePedido } from '../../context/PedidosContext';
import { Producto } from '../Producto/Producto';
import { ProductoEsqueleto } from '../ProductoEsqueleto/ProductoEsqueleto';

import './Recomendaciones.css';

export default function Recomendaciones({ selectedProductId }) {
  const { getRecommendations } = usePedido();
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const recommendations = await getRecommendations(selectedProductId);
      setRecommendedProducts(recommendations);
    };

    fetchRecommendations();
  }, [selectedProductId]);
  return (
    <div className='recommendations'>
      <h3>Recomendaciones</h3>
      {recommendedProducts ? (
        <article className='novedades-container'>
          {recommendedProducts.map((product) => (
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
    </div>
  );
}
