import './OrderCard.css';

const formatDate = (isoString) => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function OrderCard({ pedido, admin }) {
  return (
    <article className='order-card'>
      <div className='order-card-header'>
        <h3>Pedido #{pedido.numero_pedido}</h3>
      </div>
      <div className='order-card-body'>
        <p>
          <strong>Fecha:</strong> {formatDate(pedido.fecha)}
        </p>
        {pedido.direccion_envio ? (
          <p>
            <strong>Direccion envio:</strong> {pedido.direccion_envio.direccion}
          </p>
        ) : (
          <p>
            <strong>Direccion retiro:</strong> Casa reixer
          </p>
        )}
        <p>
          <strong>Estado:</strong>
          <span className={`status ${pedido.estado}`}>{pedido.estado}</span>
        </p>
        <p className={admin ? '' : 'desactivado'}>
          <strong>Cliente:</strong>
          {pedido.user.nombre} {pedido.user.apellido}
        </p>
      </div>
    </article>
  );
}
