import { Producto } from '../../components/Producto/Producto';
import './Tienda.css';
import { useProduct } from '../../context/ProductContext';
import { useEffect, useState } from 'react';
import { Boton } from '../../components/Boton/Boton';
import { useFilters } from '../../hooks/useFilter';
import { useLocation } from 'react-router-dom';
import { ProductoEsqueleto } from '../../components/ProductoEsqueleto/ProductoEsqueleto';
import { Helmet } from 'react-helmet';

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
      <Helmet>
        <meta charSet='utf-8' />
        <title>Tienda | Archived</title>
        <meta
          name='description'
          content='Tienda oficial de Archived'
        />
        <link
          rel='canonical'
          href='http://archived.com.ar/tienda'
        />
      </Helmet>
      <section className='tienda'>
        <nav className='tienda-filtros'>
          <Boton
            textBoton='TODOS'
            terceario={true}
            onClick={() => handleChangeFilter('all')}
            selected={filters.categoria}
            value='all'
          />
          <Boton
            textBoton='REMERAS OVERSIZE'
            terceario={true}
            onClick={() => handleChangeFilter('remera oversize')}
            selected={filters.categoria}
            value='remera oversize'
          />
          <Boton
            textBoton='REMERAS BOXY'
            terceario={true}
            onClick={() => handleChangeFilter('remera boxy')}
            selected={filters.categoria}
            value='remera boxy'
          />
          <Boton
            textBoton='BUZOS & HOODIES'
            terceario={true}
            onClick={() => handleChangeFilter('buzo')}
            selected={filters.categoria}
            value='buzo'
          />
        </nav>
        {filteredProducts.length === 0 ? (
          <section className='productos-container'>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <ProductoEsqueleto key={item} />
            ))}
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
