import { useParams } from 'react-router-dom';
import './PedidoForm.css';
import { usePedido } from '../../context/PedidosContext';
import { useEffect, useState } from 'react';
import Select from '../../components/Select/Select';

export default function PedidoForm() {
  const { id } = useParams();
  const { getPedido, pedido } = usePedido();
  const [isLoading, setIsLoading] = useState(true);
  const [estado, setEstado] = useState('pendiente'); // Estado inicial

  useEffect(() => {
    const fetchPedido = async () => {
      await getPedido(id);
      setIsLoading(false);
    };

    if (!pedido || pedido._id !== id) {
      fetchPedido();
    } else {
      setIsLoading(false);
      setEstado(pedido.estado);
    }
  }, [id, getPedido, pedido]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  const handleEstadoChange = async (nuevoEstado) => {
    setEstado(nuevoEstado);
    //await updatePedido(id, { estado: nuevoEstado }); // Actualiza el pedido en la base de datos
  };
  const estados = [
    { id: 1, nombre: 'pendiente' },
    { id: 2, nombre: 'cancelado' },
    { id: 3, nombre: 'enviado' },
  ];

  return (
    <div className='pedido-form-container'>
      <h2 className='pedido-form-header'>{`Pedido número: ${pedido.numero_pedido}`}</h2>
      {pedido ? (
        <div>
          <div className='pedido-section'>
            <h3>Datos del cliente</h3>
            <div className='pedido-field'>
              {pedido.cliente_envio ? (
                <>
                  <p>
                    <strong>DNI:</strong> {pedido.cliente_envio.documento}
                  </p>
                  <p>
                    <strong>Nombre:</strong>
                    {`${pedido.cliente_envio.nombre} ${pedido.cliente_envio.apellido}`}
                  </p>

                  <p>
                    <strong>Email:</strong> {pedido.cliente_envio.email}
                  </p>
                  <p>
                    <strong>Teléfono:</strong> {pedido.cliente_envio.telefono}
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>DNI:</strong> {pedido.cliente_facturacion.documento}
                  </p>
                  <p>
                    <strong>Nombre:</strong>
                    {`${pedido.cliente_facturacion.nombre} ${pedido.cliente_facturacion.apellido}`}
                  </p>

                  <p>
                    <strong>Email:</strong> {pedido.cliente_facturacion.email}
                  </p>
                  <p>
                    <strong>Teléfono:</strong>{' '}
                    {pedido.cliente_facturacion.telefono}
                  </p>
                </>
              )}
            </div>
          </div>

          <div className='pedido-section'>
            {pedido.direccion_envio ? (
              <>
                <h3>Dirección de envío</h3>
                <div className='pedido-field'>
                  <p>
                    <strong>Dirección:</strong>
                    {`${pedido.direccion_envio.direccion} ${pedido.direccion_envio.numero}`}
                  </p>
                  <p>
                    <strong>Ciudad:</strong> {pedido.direccion_envio.ciudad}
                  </p>
                  <p>
                    <strong>Provincia:</strong>
                    {pedido.direccion_envio.provincia}
                  </p>
                </div>
              </>
            ) : (
              <>
                <h3>Retira en el local</h3>
              </>
            )}
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
            <Select
              labelText='Estado'
              value={estado}
              onChange={handleEstadoChange}
              texto='Selecciona un estado'
              data={estados}
            />
          </div>
        </div>
      ) : (
        <div>No se encontró el pedido</div>
      )}
    </div>
  );
}
