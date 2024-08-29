import { useEffect, useState } from 'react';

import { useAuth } from '../../context/AuthContext';
import { usePedido } from '../../context/PedidosContext';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@tremor/react';
import { formatDate } from '../../utils/formatDate';
import { toast } from 'sonner';

export default function AdminPedidos() {
  const { getPedidos, pedidos, updatePedido } = usePedido();
  const { user } = useAuth();
  const [initialLoad, setInitialLoad] = useState(true);
  const [buscador, setBuscador] = useState('');
  const [estadosEnvio, setEstadosEnvio] = useState(null);

  const navigate = useNavigate();

  const handleBuscadorChange = (e) => {
    setBuscador(e.target.value);
  };

  const handleEstadosEnvio = (id) => {
    if (id === estadosEnvio) {
      setEstadosEnvio(null);
    } else {
      setEstadosEnvio(id);
    }
  };

  const handleUpdatePedido = async (id, estado) => {
    try {
      await updatePedido(id, { estado_envio: estado });
      toast.success('Estado de envio actualizado');
      setEstadosEnvio(null);
      await getPedidos();
    } catch (error) {
      console.error(error);
    }
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

  const pedidosPorNumero = () => {
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

  const colorEstado = (estado) => {
    if (estado === 'Pendiente') {
      return 'red';
    } else if (estado === 'Enviado') {
      return 'yellow';
    } else {
      return 'green';
    }
  };

  return (
    <main className='admin-pedidos'>
      <h1>Administracion de pedidos</h1>
      <section className='pedidos-section'>
        <table className='tabla-productos-container'>
          <header className='tabla-header'>
            <div className='tabla-header-title'>
              <h2>Pedidos</h2>
              {pedidos.length > 0 ? (
                <Badge size='xs'>{pedidos.length} pedidos</Badge>
              ) : (
                <Badge size='xs'>0 pedidos</Badge>
              )}
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
            {pedidos.length > 0 ? (
              pedidosPorNumero().map((pedido) => (
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
                      color={
                        pedido.estado_pago === 'Pendiente' ? 'red' : 'green'
                      }
                    >
                      {pedido.estado_pago}
                    </Badge>
                  </td>
                  <td className='tabla-productos-item flex justify-end relative '>
                    <Badge
                      size='xs'
                      color={colorEstado(pedido.estado_envio)}
                      onClick={() => handleEstadosEnvio(pedido._id)}
                      className='cursor-pointer'
                    >
                      {pedido.estado_envio}
                    </Badge>
                    {estadosEnvio === pedido._id && (
                      <div className='pedido-estado-envio'>
                        <button
                          onClick={() =>
                            handleUpdatePedido(pedido._id, 'Pendiente')
                          }
                        >
                          Pendiente
                        </button>
                        <button
                          onClick={() =>
                            handleUpdatePedido(pedido._id, 'Enviado')
                          }
                        >
                          Enviado
                        </button>
                        <button
                          onClick={() =>
                            handleUpdatePedido(pedido._id, 'Entregado')
                          }
                        >
                          Entregado
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <>
                {Array.from({ length: 20 }).map((_, index) => (
                  <tr
                    className='skeleton-table'
                    key={index}
                  >
                    <td className='skeleton-item'></td>
                    <td className='skeleton-item'></td>
                    <td className='skeleton-item'></td>
                    <td className='skeleton-item'></td>
                    <td className='skeleton-item'></td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}
