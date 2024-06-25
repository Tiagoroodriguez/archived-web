import { useParams } from 'react-router-dom';
import { usePedido } from '../../context/PedidosContext';
import './Perfil.css';
import { useEffect, useState } from 'react';
import OrderCard from '../../components/OrderCard/OrderCard';
import { Boton } from '../../components/Boton/Boton';
import { useAuth } from '../../context/AuthContext';

function Perfil() {
  const { getPedidoUser, pedidoUser, getPedidos, pedido } = usePedido();
  const { user } = useAuth();
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
  console.log(pedido);
  if (!user) {
    return <div>Loading...</div>; // Mostrar un mensaje de carga mientras se obtiene la información del usuario
  }

  return (
    <main className='perfil-main-container'>
      {user.rol === 'admin' ? (
        <>
          <h1 className='perfil-title'>Perfil de administrador</h1>
          {/* Renderizar los pedidos para el admin */}
          {pedido.length > 0 ? (
            <section className='pedidos-container'>
              {pedido.map((pedido) => (
                <article
                  className='order-card'
                  key={pedido._id}
                >
                  <OrderCard pedido={pedido} />
                  <p>{pedido.user.nombre}</p>
                  <p>{pedido.user.apellido}</p>
                </article>
              ))}
            </section>
          ) : (
            <div>No hay pedidos disponibles</div>
          )}
        </>
      ) : (
        <>
          <h1 className='perfil-title'>Tu cuenta</h1>
          <p className='perfil-p'>Conoce el estado de tus pedidos</p>
          {pedidoUser.length > 0 ? (
            <>
              <section className='pedidos-container'>
                {pedidoUser.map((pedido) => (
                  <article
                    className='order-card'
                    key={pedido._id}
                  >
                    <OrderCard pedido={pedido} />
                  </article>
                ))}
              </section>
              <div className='perfil-botones-container'>
                <div className='perfil-botones'>
                  <Boton
                    textBoton='Seguir comprando'
                    onClick={() => null}
                  />
                </div>
              </div>
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
