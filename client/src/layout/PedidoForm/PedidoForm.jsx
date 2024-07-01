import { useParams } from 'react-router-dom';
import './PedidoForm.css';
import { usePedido } from '../../context/PedidosContext';
import { useEffect, useState } from 'react';

export default function PedidoForm() {
  const { id } = useParams();
  const { getPedido, pedido } = usePedido();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPedido = async () => {
      await getPedido(id);
      setIsLoading(false);
    };

    if (!pedido || pedido._id !== id) {
      fetchPedido();
    } else {
      setIsLoading(false);
    }
  }, [id, getPedido, pedido]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className='pedido-form-container'>
      <h2 className='pedido-form-header'>Detalles del Pedido</h2>
      {pedido ? (
        <div>
          <div className='pedido-section'>
            <h3>Información del Pedido</h3>
            <div className='pedido-field'>
              <p>
                <strong>Número de Pedido:</strong> {pedido.numero_pedido}
              </p>
            </div>
          </div>

          <div className='pedido-section'>
            <h3>Cliente Facturación</h3>
            <div className='pedido-field'>
              <p>
                <strong>Nombre:</strong> {pedido.cliente_facturacion.nombre}
              </p>
              <p>
                <strong>Apellido:</strong> {pedido.cliente_facturacion.apellido}
              </p>
              <p>
                <strong>Email:</strong> {pedido.cliente_facturacion.email}
              </p>
              <p>
                <strong>Teléfono:</strong> {pedido.cliente_facturacion.telefono}
              </p>
            </div>
          </div>

          <div className='pedido-section'>
            <h3>Dirección de Facturación</h3>
            <div className='pedido-field'>
              <p>
                <strong>Dirección:</strong>{' '}
                {pedido.direccion_facturacion.direccion}
              </p>
              <p>
                <strong>Ciudad:</strong> {pedido.direccion_facturacion.ciudad}
              </p>
              <p>
                <strong>Provincia:</strong>{' '}
                {pedido.direccion_facturacion.provincia}
              </p>
            </div>
          </div>

          <div className='pedido-section'>
            <h3>Cliente Envío</h3>
            <div className='pedido-field'>
              <p>
                <strong>Nombre:</strong> {pedido.cliente_envio.nombre}
              </p>
              <p>
                <strong>Apellido:</strong> {pedido.cliente_envio.apellido}
              </p>
              <p>
                <strong>Email:</strong> {pedido.cliente_envio.email}
              </p>
              <p>
                <strong>Teléfono:</strong> {pedido.cliente_envio.telefono}
              </p>
            </div>
          </div>

          <div className='pedido-section'>
            <h3>Dirección de Envío</h3>
            <div className='pedido-field'>
              <p>
                <strong>Dirección:</strong> {pedido.direccion_envio.direccion}
              </p>
              <p>
                <strong>Ciudad:</strong> {pedido.direccion_envio.ciudad}
              </p>
              <p>
                <strong>Provincia:</strong> {pedido.direccion_envio.provincia}
              </p>
            </div>
          </div>

          <div className='pedido-section pedido-productos'>
            <h3>Productos</h3>
            {pedido.productos.map((producto, index) => (
              <div key={index}>
                <p>
                  <strong>Producto ID:</strong> {producto.producto_id}
                </p>
                <p>
                  <strong>Cantidad:</strong> {producto.cantidad}
                </p>
                <p>
                  <strong>Precio:</strong> {producto.precio}
                </p>
                <p>
                  <strong>Talle:</strong> {producto.talle}
                </p>
              </div>
            ))}
          </div>

          <div className='pedido-section'>
            <h3>Estado del Pedido</h3>
            <p className='pedido-status'>
              <strong>Estado:</strong> {pedido.estado}
            </p>
          </div>
        </div>
      ) : (
        <div>No se encontró el pedido</div>
      )}
    </div>
  );
}
