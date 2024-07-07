import { Producto } from '../../components/Producto/Producto';
import './Tienda.css';
import { useProduct } from '../../context/ProductContext';
import { useEffect, useState } from 'react';
import { Boton } from '../../components/Boton/Boton';
import { useFilters } from '../../hooks/useFilter';
import { useLocation } from 'react-router-dom';
import { ProductoEsqueleto } from '../../components/ProductoEsqueleto/ProductoEsqueleto';

export function Tienda() {
  const { getProducts, products } = useProduct();
  const { filters, setFilters, filterProducts } = useFilters();
  const location = useLocation();
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoria = searchParams.get('categoria');
    if (categoria) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        categoria,
      }));
    }
  }, [location.search, setFilters]);

  useEffect(() => {
    const fetchProducts = async () => {
      await getProducts();
      setInitialLoad(false); // Set initial load to false after the first fetch
    };
    if (initialLoad) {
      fetchProducts();
    }
  }, [initialLoad, getProducts]);

  const handleChangeFilter = (categoria) => {
    setFilters({
      ...filters,
      categoria,
    });
  };

  if (filterProducts.length === 0) return <h1>No hay productos</h1>;
  const filteredProducts = filterProducts(products);

  return (
    <main>
      <section className='tienda'>
        <nav className='tienda-filtros'>
          <Boton
            textBoton='TODOS LOS PRODUCTOS'
            terceario={true}
            onClick={() => handleChangeFilter('all')}
            selected={filters.categoria}
            value='all'
          />
          <Boton
            textBoton='REMERAS'
            terceario={true}
            onClick={() => handleChangeFilter('remera')}
            selected={filters.categoria}
            value='remera'
          />
          <Boton
            textBoton='BUZOS'
            terceario={true}
            onClick={() => handleChangeFilter('buzo')}
            selected={filters.categoria}
            value='buzo'
          />
          <Boton
            textBoton='JOGGERS'
            terceario={true}
            onClick={() => handleChangeFilter('buzo')}
            selected={filters.categoria}
            value='buzo'
          />
          <Boton
            textBoton='ACCESORIOS'
            terceario={true}
            onClick={() => handleChangeFilter('buzo')}
            selected={filters.categoria}
            value='buzo'
          />
        </nav>
        {filteredProducts.length === 0 ? (
          <section className='productos-container'>
            <ProductoEsqueleto />
            <ProductoEsqueleto />
            <ProductoEsqueleto />
            <ProductoEsqueleto />
          </section>
        ) : (
          <section className='productos-container'>
            {filteredProducts.map((product) => (
              <Producto
                key={product._id}
                producto={product}
              />
            ))}
          </section>
        )}
      </section>
    </main>
  );
}
