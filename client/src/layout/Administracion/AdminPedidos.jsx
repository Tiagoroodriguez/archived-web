import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { usePedido } from '../../context/PedidosContext';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@tremor/react';
import { formatDate } from '../../utils/formatDate';
import { toast } from 'sonner';
import PedidoForm from '../../components/Administracion/PedidoForm';
import { Helmet } from 'react-helmet';

export default function AdminPedidos() {
  const { getPedidos, pedidos, updatePedido } = usePedido();
  const { user } = useAuth();
  const [initialLoad, setInitialLoad] = useState(true);
  const [buscador, setBuscador] = useState('');
  const [estadosEnvio, setEstadosEnvio] = useState(null);
  const [estadosPago, setEstadosPago] = useState(null);
  const [pedidoForm, setPedidoForm] = useState(false);
  const [pedidoId, setPedidoId] = useState('');

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

  const handleEstadosPago = (id) => {
    if (id === estadosPago) {
      setEstadosPago(null);
    } else {
      setEstadosPago(id);
    }
  };

  const handleUpdatePedidoEnvio = async (id, estado) => {
    try {
      await updatePedido(id, { estado_envio: estado });
      toast.success('Estado de envio actualizado');
      setEstadosEnvio(null);
      await getPedidos();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdatePedidoPago = async (id, estado) => {
    try {
      await updatePedido(id, { estado_pago: estado });
      toast.success('Estado de envio actualizado');
      setEstadosPago(null);
      await getPedidos();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePedidoForm = (id) => {
    if (id === pedidoId) {
      setPedidoId('');
      setPedidoForm(!pedidoForm);
    } else {
      setPedidoForm(!pedidoForm);
      setPedidoId(id);
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

  const colorPago = (estado) => {
    if (estado === 'Cancelado') {
      return 'red';
    } else if (estado === 'Pendiente') {
      return 'yellow';
    } else {
      return 'green';
    }
  };

  // Variantes para la animación
  const variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };

  return (
    <main className='admin-pedidos'>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Pedidos | Administracion</title>
        <meta
          name='description'
          content='Pagina de administracion de pedidos'
        />
        <link
          rel='canonical'
          href='http://archived.com.ar/administration/orders'
        />
      </Helmet>
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
                  <td
                    className='tabla-productos-item tabla-productos-item-detalle'
                    onClick={() => handlePedidoForm(pedido._id)}
                  >
                    #{pedido.numero_pedido}
                  </td>
                  <td
                    className='tabla-productos-item flex justify-center'
                    onClick={() => handlePedidoForm(pedido._id)}
                  >
                    {formatDate(pedido.fecha)}
                  </td>
                  <td
                    className='tabla-productos-item flex justify-center'
                    onClick={() => handlePedidoForm(pedido._id)}
                  >
                    {pedido.cliente_facturacion.nombre}{' '}
                    {pedido.cliente_facturacion.apellido}
                  </td>
                  <td className='tabla-productos-item flex justify-center relative'>
                    <Badge
                      size='xs'
                      color={colorPago(pedido.estado_pago)}
                      onClick={() => handleEstadosPago(pedido._id)}
                      className='cursor-pointer'
                    >
                      {pedido.estado_pago}
                    </Badge>
                    <AnimatePresence>
                      {estadosPago === pedido._id && (
                        <motion.div
                          className='pedido-estado-envio'
                          initial='hidden'
                          animate='visible'
                          exit='exit'
                          variants={variants}
                          transition={{ duration: 0.3 }}
                        >
                          <button
                            onClick={() =>
                              handleUpdatePedidoPago(pedido._id, 'Pendiente')
                            }
                          >
                            Pendiente
                          </button>
                          <button
                            onClick={() =>
                              handleUpdatePedidoPago(pedido._id, 'Pagado')
                            }
                          >
                            Pagado
                          </button>
                          <button
                            onClick={() =>
                              handleUpdatePedidoPago(pedido._id, 'Cancelado')
                            }
                          >
                            Cancelado
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </td>
                  <td className='tabla-productos-item flex justify-end relative'>
                    <Badge
                      size='xs'
                      color={colorEstado(pedido.estado_envio)}
                      onClick={() => handleEstadosEnvio(pedido._id)}
                      className='cursor-pointer'
                    >
                      {pedido.estado_envio}
                    </Badge>
                    <AnimatePresence>
                      {estadosEnvio === pedido._id && (
                        <motion.div
                          className='pedido-estado-envio'
                          initial='hidden'
                          animate='visible'
                          exit='exit'
                          variants={variants}
                          transition={{ duration: 0.3 }}
                        >
                          <button
                            onClick={() =>
                              handleUpdatePedidoEnvio(pedido._id, 'Pendiente')
                            }
                          >
                            Pendiente
                          </button>
                          <button
                            onClick={() =>
                              handleUpdatePedidoEnvio(pedido._id, 'Enviado')
                            }
                          >
                            Enviado
                          </button>
                          <button
                            onClick={() =>
                              handleUpdatePedidoEnvio(pedido._id, 'Entregado')
                            }
                          >
                            Entregado
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
        <AnimatePresence>
          {pedidoForm && (
            <PedidoForm
              id={pedidoId}
              onClick={() => handlePedidoForm('')}
            />
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
