import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProduct } from '../../context/ProductContext';
import TablaProductos from '../../components/Administracion/TablaProductos';
import { Helmet } from 'react-helmet';
import AddProducto from '../../components/Administracion/AddProducto';
import Select from '../../components/Select/Select';

export default function AdminProductos() {
  const { user } = useAuth();
  const { getProducts, products } = useProduct();
  const [initialLoad, setInitialLoad] = useState(true);
  const [viewAddProducto, setViewAddProducto] = useState(false);
  const [categoria, setCategoria] = useState('all');

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

  const categorias = [
    { id: 1, nombre: 'Remeras' },
    { id: 2, nombre: 'Buzos' },
    { id: 3, nombre: 'Pantalones' },
  ];

  function fixText(text) {
    if (text === 'Pantalones') {
      return text.toLowerCase().slice(0, -2);
    } else {
      return text.toLowerCase().slice(0, -1);
    }
  }

  const productos = () => {
    if (categoria === 'all' || !categoria) {
      return products;
    } else {
      return products.filter(
        (producto) => producto.categoria === fixText(categoria)
      );
    }
  };

  const handleCategoriaChange = (newCategoria) => {
    setCategoria(newCategoria);
  };

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
        <Select
          labelText='Categoria'
          value={categoria} // Estado controlado en el componente padre
          onChange={handleCategoriaChange} // Función para actualizar el estado en el componente padre
          texto='Seleccione una categoira'
          data={categorias}
        />
        <TablaProductos productos={productos()} />
      </section>
      {viewAddProducto && <AddProducto onClick={handdleViewAddProducto} />}
    </main>
  );
}
