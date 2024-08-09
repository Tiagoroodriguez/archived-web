import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProduct } from '../../context/ProductContext';
import TablaProductos from '../../components/Administracion/TablaProductos';
import { Helmet } from 'react-helmet';
import AddProducto from '../../components/Administracion/AddProducto';

export default function AdminProductos() {
  const { user } = useAuth();
  const { getProducts, products } = useProduct();
  const [initialLoad, setInitialLoad] = useState(true);
  const [viewAddProducto, setViewAddProducto] = useState(false);

  const navigate = useNavigate();

  const handdleViewAddProducto = () => {
    setViewAddProducto(!viewAddProducto);
  };

  useEffect(() => {
    if (initialLoad && user) {
      const fetchProducts = async () => {
        if (user.rol === 'admin') {
          await getProducts();
          setInitialLoad(false);
        } else {
          navigate('/');
        }
      };
      fetchProducts();
    }
  }, [user, initialLoad, getProducts]);

  const remeras = products.filter(
    (producto) => producto.categoria === 'remera'
  );
  const buzos = products.filter((producto) => producto.categoria === 'buzo');

  if (!user) {
    return <div className='pedido-load'>Cargando...</div>;
  }

  return (
    <main className='admin-productos'>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Productos | Administracion</title>
        <meta
          name='description'
          content='Pagina de administracion de productos'
        />
        <link
          rel='canonical'
          href='http://archived.com.ar/administration/products'
        />
      </Helmet>
      <h1>Productos</h1>
      <section>
        <header className='admin-productos-header'>
          <h2>Listado de productos</h2>
          <button onClick={handdleViewAddProducto}>
            <i className='bi bi-plus-circle' /> Agregar producto
          </button>
        </header>
        <TablaProductos
          remeras={remeras}
          buzos={buzos}
        />
      </section>
      {viewAddProducto && <AddProducto onClick={handdleViewAddProducto} />}
    </main>
  );
}
