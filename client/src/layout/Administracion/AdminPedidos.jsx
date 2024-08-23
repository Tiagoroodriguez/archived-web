import { useEffect, useState } from 'react';

import { useAuth } from '../../context/AuthContext';
import { usePedido } from '../../context/PedidosContext';
import { Link, useNavigate } from 'react-router-dom';
import OrderCard from '../../components/OrderCard/OrderCard';
import { Badge } from '@tremor/react';
import { formatDate } from '../../utils/formatDate';

export default function AdminPedidos() {
  const { getPedidos, pedidos } = usePedido();
  const { user } = useAuth();
  const [initialLoad, setInitialLoad] = useState(true);
  const [buscador, setBuscador] = useState('');

  const navigate = useNavigate();

  const handleBuscadorChange = (e) => {
    setBuscador(e.target.value);
  };

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

  const productosFiltradosNombre = () => {
    if (buscador === '') {
      return pedidos;
    } else {
      return pedidos.filter((pedido) =>
        pedido.numero_pedido.includes(buscador)
      );
    }
  };

  if (!user) {
    return <div className='pedido-load'>Cargando...</div>;
  }

  return (
    <main className='admin-pedidos'>
      <h1>Administracion de pedidos</h1>
      {pedidos.length > 0 ? (
        <>
          <section className='pedidos-section'>
            <table className='tabla-productos-container'>
              <header className='tabla-header'>
                <div className='tabla-header-title'>
                  <h2>Pedidos</h2>
                  <Badge size='xs'>{pedidos.length} pedidos</Badge>
                </div>
                <div className='tabla-header-actions'>
                  <div className='tabla-header-search'>
                    <input
                      type='number'
                      placeholder='Buscar producto'
                      onChange={handleBuscadorChange}
                    />
                    <i className='bi bi-search' />
                  </div>
                </div>
              </header>
              <thead className='tabla-productos-header'>
                <tr>
                  <th className='tabla-productos-item flex justify-start'>
                    Número de pedido
                  </th>
                  <th className='tabla-productos-item center flex justify-center'>
                    Fecha
                  </th>
                  <th className='tabla-productos-item center flex justify-center'>
                    Cliente
                  </th>
                  <th className='tabla-productos-item center flex justify-center'>
                    Estado de pago
                  </th>
                  <th className='tabla-productos-item flex justify-end'>
                    Estado de envio
                  </th>
                </tr>
              </thead>
              <tbody className='tabla-productos-body'>
                {productosFiltradosNombre().map((pedido) => (
                  <tr key={pedido._id}>
                    <td className='tabla-productos-item tabla-productos-item-detalle'>
                      #{pedido.numero_pedido}
                    </td>
                    <td className='tabla-productos-item flex justify-center'>
                      {formatDate(pedido.fecha)}
                    </td>
                    <td className='tabla-productos-item flex justify-center'>
                      {pedido.cliente_facturacion.nombre}{' '}
                      {pedido.cliente_facturacion.apellido}
                    </td>
                    <td className='tabla-productos-item flex justify-center '>
                      <Badge
                        size='xs'
                        color='green'
                      >
                        {pedido.estado}
                      </Badge>
                    </td>
                    <td className='tabla-productos-item flex justify-end '>
                      <Badge
                        size='xs'
                        color={pedido.estado === 'pendiente' ? 'red' : 'green'}
                      >
                        {pedido.estado}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      ) : (
        <div className='pedido-load'>No hay pedidos</div>
      )}
    </main>
  );
}
