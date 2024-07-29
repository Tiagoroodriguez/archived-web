import { useEffect, useState } from 'react';

import { useAuth } from '../../context/AuthContext';
import { usePedido } from '../../context/PedidosContext';
import { Link, useNavigate } from 'react-router-dom';
import OrderCard from '../../components/OrderCard/OrderCard';

export default function AdminPedidos() {
  const { getPedidos, pedidos } = usePedido();
  const { user } = useAuth();
  const [initialLoad, setInitialLoad] = useState(true);

  const navigate = useNavigate();

  const pedidosPendientes = pedidos.filter(
    (pedido) => pedido.estado === 'pendiente'
  );
  const pedidosEnviados = pedidos.filter(
    (pedido) => pedido.estado === 'enviado'
  );
  const pedidosEntregados = pedidos.filter(
    (pedido) => pedido.estado === 'entregado'
  );

  useEffect(() => {
    if (!initialLoad && user) {
      const fetchPedidos = async () => {
        if (user.rol === 'admin') {
          await getPedidos();
        } else {
          navigate('/');
        }
        setInitialLoad(false);
      };
      fetchPedidos();
    }
  }, [user, initialLoad, getPedidos]);

  if (!user) {
    return <div className='pedido-load'>Cargando...</div>;
  }

  return (
    <main className='admin-pedidos'>
      <h1>Administracion de pedidos</h1>
      {pedidos.length > 0 ? (
        <>
          <section className='pedidos-section'>
            <h2>Lista de pedidos pendientes</h2>
            <div className='pedidos-container'>
              {pedidosPendientes.map((pedido) => (
                <Link
                  to={`/administration/order/${pedido._id}`}
                  key={pedido._id}
                >
                  <OrderCard pedido={pedido} />
                </Link>
              ))}
            </div>
          </section>
          <section className='pedidos-section'>
            <h2>Lista de pedidos enviados</h2>
            <div className='pedidos-container'>
              {pedidosEnviados.map((pedido) => (
                <Link
                  to={`/administration/order/${pedido._id}`}
                  key={pedido._id}
                >
                  <OrderCard pedido={pedido} />
                </Link>
              ))}
            </div>
          </section>
          <section className='pedidos-section'>
            <h2>Lista de pedidos entregados</h2>
            <div className='pedidos-container'>
              {pedidosEntregados.map((pedido) => (
                <Link
                  to={`/administration/order/${pedido._id}`}
                  key={pedido._id}
                >
                  <OrderCard pedido={pedido} />
                </Link>
              ))}
            </div>
          </section>
        </>
      ) : (
        <div className='pedido-load'>No hay pedidos</div>
      )}
    </main>
  );
}
