import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatDate } from '../../utils/formatDate';
import { formatPrice } from '../../utils/formatePrice';
import './PedidoFormUser.css';
import { useAuth } from '../../context/AuthContext';

export default function PedidoFormUser({ pedido }) {
  const { user } = useAuth();

  const firstLineVariants = {
    initial: { width: 0, originX: 0 },
    animate: { width: '100%', transition: { duration: 1 } },
  };

  const secondLineVariants = {
    initial: { width: 0, originX: 0 },
    animate: { width: '100%', transition: { duration: 1 } },
  };

  const codSegVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <main className='pedido-user-container'>
      <section className='pedido-user-navegacion'>
        <button>
          <Link to={`/perfil/${user.id}`}>
            <i className='bi bi-chevron-left' />
            Volver
          </Link>
        </button>
        <h3>
          Pedido numero: #{pedido.numero_pedido} /{' '}
          <span>{formatDate(pedido.fecha)}</span>
        </h3>
      </section>

      <section className='pedido-user-estado'>
        <h3>Estado del pedido</h3>
        <div className='pedido-estados'>
          <div
            className={`pedido-estado ${
              pedido.estado === 'pendiente' ? 'estado-actual' : ''
            }`}
          >
            <i
              className={`bi bi-clock ${
                pedido.estado === 'enviado' || pedido.estado === 'entregado'
                  ? 'estado-actual'
                  : ''
              }`}
            />
            <span
              className={
                pedido.estado === 'enviado' || pedido.estado === 'entregado'
                  ? 'estado-actual'
                  : ''
              }
            >
              Pendiente
            </span>
          </div>
          <div className='pedido-line-div'>
            <motion.div
              className='pedido-line'
              variants={firstLineVariants}
              initial='initial'
              animate={
                pedido.estado === 'enviado' || pedido.estado === 'entregado'
                  ? 'animate'
                  : 'initial'
              }
            />
          </div>

          <div
            className={`pedido-estado ${
              pedido.estado === 'enviado' || pedido.estado === 'entregado'
                ? 'estado-actual'
                : ''
            }`}
          >
            <i
              className={`bi bi-archive ${
                pedido.estado === 'enviado' || pedido.estado === 'entregado'
                  ? 'estado-actual'
                  : ''
              }`}
            />
            <span
              className={
                pedido.estado === 'enviado' || pedido.estado === 'entregado'
                  ? 'estado-actual'
                  : ''
              }
            >
              Despachado
            </span>
          </div>
          <div className='pedido-line-div'>
            <motion.div
              className='pedido-line'
              variants={secondLineVariants}
              initial='initial'
              animate={pedido.estado === 'entregado' ? 'animate' : 'initial'}
            />
          </div>
          <div
            className={`pedido-estado ${
              pedido.estado === 'entregado' ? 'estado-actual' : ''
            }`}
          >
            <i
              className={`bi bi-check2-circle ${
                pedido.estado === 'entregado' ? 'estado-actual' : ''
              }`}
            />
            <span
              className={pedido.estado === 'entregado' ? 'estado-actual' : ''}
            >
              Entregado
            </span>
          </div>
        </div>
        {pedido.estado === 'enviado' ? (
          <motion.div
            className='pedido-user-cod-seg'
            variants={codSegVariants}
            initial='hidden'
            animate='visible'
          >
            <p>
              <i className='bi bi-truck' />
              Codigo de seguimiento: <span>1asdas31225a456gfas</span>
            </p>
          </motion.div>
        ) : (
          ''
        )}
      </section>

      <section className='pedido-user-productos'>
        <h3>Detalle de compra</h3>
        <table className='pedido-user-table'>
          <thead>
            <tr className='pedido-table-encabezado'>
              <th className='cart-table-encabezado-item cart-table-product'>
                Producto
              </th>
              <th className='cart-table-encabezado-item cart-table-actions'>
                Cantidad
              </th>
              <th className='cart-table-encabezado-item cart-table-precio'>
                Subtotal
              </th>
            </tr>
          </thead>
          <tbody>
            {pedido.productos.map((item) => (
              <tr
                key={item.key}
                className='cart-table-cuerpo'
              >
                <td className='cart-table-cuerpo-item cart-table-product'>
                  <div className='img-producto cart-table-product-item'>
                    <img
                      src={`/images/productos/small/${item.nombre}.webp`}
                      alt={`imagen del producto ${item.nombre}`}
                    />
                  </div>
                  <div className='table-info-producto cart-table-product-item'>
                    <p className='info-producto-nombre'>{item.nombre}</p>
                    <p className='info-producto-talle'>{item.talle}</p>
                    <p className='info-producto-precio'>
                      {formatPrice(item.precio)}
                    </p>
                  </div>
                </td>
                <td className='cart-table-cuerpo-item cart-table-actions'>
                  <p>{item.cantidad}</p>
                </td>
                <td className='cart-table-cuerpo-item cart-table-precio'>
                  <p>{formatPrice(item.precio * item.cantidad)}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className='pedido-user-informacion-cliente'>
        <h3>Cliente</h3>
        <div>
          <p>{pedido.cliente_envio.nombre}</p>
          <p>{pedido.cliente_envio.apellido}</p>
          <p>{pedido.cliente_envio.email}</p>
        </div>

        <h3>Direccion de envio</h3>
        <div>
          <p>
            {pedido.direccion_envio.direccion} {pedido.direccion_envio.numero}
          </p>
          {pedido.direccion_envio.departamento ? (
            <p>{pedido.direccion_envio.departamento}</p>
          ) : (
            ''
          )}
        </div>
      </section>
      <section className='pedido-user-informacion-pago'></section>
      <section className='pedido-user-contacto'></section>
    </main>
  );
}
