import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProduct } from '../../context/ProductContext';
import TablaProductos from '../../components/Administracion/TablaProductos';
import { Badge } from '@tremor/react';

export default function AdminProductos() {
  const { user } = useAuth();
  const { getProducts, products } = useProduct();
  const [initialLoad, setInitialLoad] = useState(true);

  const navigate = useNavigate();

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
      <h1>Productos</h1>
      <section>
        <header className='admin-productos-header'>
          <h2>Listado de productos</h2>
          <button>
            <i className='bi bi-plus-circle' /> Agregar producto
          </button>
        </header>

        <TablaProductos
          remeras={remeras}
          buzos={buzos}
        />
      </section>
    </main>
  );
}
