import './OrderCard.css';
import { formatDate } from '../../utils/formatDate';
import { Badge } from '@tremor/react';

export default function OrderCard({ pedido, admin }) {
  const color = (estado) => {
    if (estado === 'Pendiente') {
      return 'yellow';
    } else if (estado === 'Enviado') {
      return 'blue';
    } else if (estado === 'Entregado') {
      return 'green';
    } else return 'red';
  };
  return (
    <article className='order-card'>
      {admin && pedido.direccion_envio ? (
        <span className='order-card-etiqueta order-enviar'>Enviar</span>
      ) : (
        ''
      )}
      {admin && !pedido.direccion_envio ? (
        <span className='order-card-etiqueta order-retirar'>Retirar</span>
      ) : (
        ''
      )}
      <div className='order-card-header'>
        <h3>Pedido #{pedido.numero_pedido}</h3>
      </div>
      <div className='order-card-body'>
        <p>
          <strong>Fecha:</strong> {formatDate(pedido.fecha)}
        </p>
        {pedido.direccion_envio ? (
          <p>
            <strong>Direccion envio: </strong>
            {`${pedido.direccion_envio.direccion} ${pedido.direccion_envio.numero}`}
          </p>
        ) : (
          <p>
            <strong>Direccion retiro: </strong>Casa reixer
          </p>
        )}
        {pedido.direccion_envio && pedido.direccion_envio.departamento ? (
          <>
            <p>
              <strong>Departamento: </strong>
              {pedido.direccion_envio.departamento}
            </p>
            <p>
              <strong>Piso: </strong>
              {pedido.direccion_envio.piso}
            </p>
          </>
        ) : (
          ''
        )}
        <Badge color={color(pedido.estado_envio)}>{pedido.estado_envio}</Badge>

        {admin ? (
          <p>
            <strong>Cliente:</strong>
            {`${pedido.cliente_facturacion.nombre}
           ${pedido.cliente_facturacion.apellido}`}
          </p>
        ) : (
          ''
        )}
      </div>
    </article>
  );
}
