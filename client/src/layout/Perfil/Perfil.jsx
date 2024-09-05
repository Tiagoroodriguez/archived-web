import { Link, useParams } from 'react-router-dom';
import { usePedido } from '../../context/PedidosContext';
import './Perfil.css';
import { useEffect, useState } from 'react';
import OrderCard from '../../components/OrderCard/OrderCard';
import { useAuth } from '../../context/AuthContext';
import { Helmet } from 'react-helmet';

function Perfil() {
  const { getPedidoUser, pedidoUser } = usePedido();
  const { user, logout } = useAuth();
  const [initialLoad, setInitialLoad] = useState(true);
  const params = useParams();

  useEffect(() => {
    if (initialLoad && user) {
      const fetchPedidos = async () => {
        if (user.rol === 'user') {
          await getPedidoUser(params.id);
        }
        setInitialLoad(false);
      };
      fetchPedidos();
    }
  }, [user, initialLoad, getPedidoUser, params.id]);

  if (!user) {
    return <div className='pedido-load'>Cargando...</div>;
  }

  return (
    <main className='perfil-main-container'>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Perfil | Archived</title>
        <meta
          name='description'
          content='Perfil de usuario'
        />
        <link
          rel='canonical'
          href={`http://archived.com.ar/perfil/${user._id}`}
        />
      </Helmet>
      <div className='perfil-header'>
        <h1 className='perfil-title'>
          Hola {user.nombre} {user.apellido}!
        </h1>
        <Link
          to='/'
          onClick={() => {
            logout();
          }}
        >
          <i className='bi bi-box-arrow-left' /> Salir
        </Link>
      </div>
      <p className='perfil-p'>Conoce el estado de tus pedidos</p>
      {pedidoUser.length > 0 ? (
        <>
          <section className='pedidos-container'>
            {pedidoUser.map((pedido) => (
              <Link
                to={`/pedido/${pedido._id}`}
                key={pedido._id}
              >
                <OrderCard pedido={pedido} />
              </Link>
            ))}
          </section>
        </>
      ) : (
        <div>No tienes pedidos hechos aun</div>
      )}
    </main>
  );
}

export default Perfil;
