import { Link, useParams } from 'react-router-dom';
import { usePedido } from '../../context/PedidosContext';
import './Perfil.css';
import { useEffect, useState } from 'react';
import OrderCard from '../../components/OrderCard/OrderCard';
import { useAuth } from '../../context/AuthContext';

function Perfil() {
  const { getPedidoUser, pedidoUser, getPedidos, pedidos } = usePedido();
  const { user, logout } = useAuth();
  const [initialLoad, setInitialLoad] = useState(true);
  const params = useParams();

  useEffect(() => {
    if (initialLoad && user) {
      const fetchPedidos = async () => {
        if (user.rol === 'admin') {
          await getPedidos();
        } else {
          await getPedidoUser(params.id);
        }
        setInitialLoad(false);
      };
      fetchPedidos();
    }
  }, [user, initialLoad, getPedidos, getPedidoUser, params.id]);

  if (!user) {
    return <div>Loading...</div>; // Mostrar un mensaje de carga mientras se obtiene la información del usuario
  }

  return (
    <main className='perfil-main-container'>
      {user.rol === 'admin' ? (
        <>
          <div className='perfil-header'>
            <h1 className='perfil-title'>Perfil de administrador</h1>
            <Link
              to='/'
              onClick={() => {
                logout();
              }}
            >
              Logout
            </Link>
          </div>

          {/* Renderizar los pedidos para el admin */}
          {pedidos.length > 0 ? (
            <section className='pedidos-container'>
              {pedidos.map((pedido) => (
                <Link
                  to={`/pedido/${pedido._id}`}
                  key={pedido._id}
                >
                  <OrderCard
                    admin
                    pedido={pedido}
                  />
                </Link>
              ))}
            </section>
          ) : (
            <div>No hay pedidos disponibles</div>
          )}
        </>
      ) : (
        <>
          <div className='perfil-header'>
            <h1 className='perfil-title'>Tu cuenta</h1>
            <Link
              to='/'
              onClick={() => {
                logout();
              }}
            >
              Logout
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
        </>
      )}
    </main>
  );
}

export default Perfil;
