import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { usePedido } from '../../context/PedidosContext';
import { formatDate } from '../../utils/formatDate';
import { Badge } from '@tremor/react';
import { formatPrice } from '../../utils/formatePrice';
import { toast } from 'sonner';
import { useReactToPrint } from 'react-to-print';
import Factura from './Factura';

export default function PedidoForm({ id, onClick }) {
  const { getPedido, pedido, updatePedido } = usePedido();
  const [initialLoad, setInitialLoad] = useState(true);
  const [codSeguimiento, setCodSeguimiento] = useState('');

  useEffect(() => {
    if (initialLoad) {
      const fetchPedido = async () => {
        await getPedido(id);
        setInitialLoad(false);
      };
      fetchPedido();
      if (pedido.codigo_seguimiento) {
        setCodSeguimiento(pedido.codigo_seguimiento);
      }
    }
  }, [initialLoad, getPedido, id]);

  const variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0 },
  };

  const colorEnvio = (estado) => {
    switch (estado) {
      case 'Entregado':
        return 'green';
      case 'Enviado':
        return 'yellow';
      case 'Pendiente':
        return 'red';
      default:
        return 'gray';
    }
  };

  const colorPago = (estado) => {
    switch (estado) {
      case 'Pagado':
        return 'green';
      case 'Pendiente':
        return 'yellow';
      case 'Cancelado':
        return 'red';
      default:
        return 'gray';
    }
  };

  const handleCodSeguimiento = (e) => {
    setCodSeguimiento(e.target.value);
  };

  const handleUpdatePedido = async () => {
    const pedidoUpdate = {
      estado_envio: 'Enviado',
      codigo_seguimiento: codSeguimiento,
    };
    await updatePedido(id, pedidoUpdate);
    toast.success('Codigo de seguimiento cargado!');
  };

  const contentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
    documentTitle: `Factura #${pedido.numero_pedido}`,
  });

  if (!pedido) {
    return <div className='pedido-load'>Cargando...</div>;
  }

  return (
    <div className='add-producto-container'>
      <motion.section
        className='flex flex-col justify-between add-producto-form-container'
        initial='hidden'
        animate='visible'
        exit='exit'
        variants={variants}
        transition={{ duration: 0.3 }}
      >
        {pedido && pedido.numero_pedido ? (
          <>
            <div className='hidden'>
              <div ref={contentRef}>
                <Factura pedido={pedido} />
              </div>
            </div>

            <header className='add-producto-form-header'>
              <h1>
                <i className='bi bi-clipboard2-fill' />
                Detalle del pedido #{pedido.numero_pedido}
              </h1>
              <p>Información sobre el pedido.</p>
              <button
                className='boton-salir'
                onClick={onClick}
              >
                <i className='bi bi-x' />
              </button>
            </header>
            <div className='pedido-form'>
              <div className='pedido-form-info-container'>
                <h3 className='pedido-form-data-title pt-[10px] underline'>
                  Fecha de compra:
                </h3>
                <p className='pedido-form-data-content'>
                  {formatDate(pedido.fecha)}
                </p>
                <h3 className='pedido-form-data-title pt-[10px] underline'>
                  Datos del cliente:
                </h3>
                <ul>
                  <li>
                    <span className='pedido-form-data-title'>Nombre: </span>
                    <span className='pedido-form-data-content'>
                      {pedido.cliente_facturacion.nombre}{' '}
                      {pedido.cliente_facturacion.apellido}
                    </span>
                  </li>
                  <li>
                    <span className='pedido-form-data-title'>Telefono: </span>
                    <span className='pedido-form-data-content'>
                      {pedido.cliente_facturacion.telefono}
                    </span>
                  </li>
                  <li>
                    <span className='pedido-form-data-title'>
                      Correo electronico:{' '}
                    </span>
                    <span className='pedido-form-data-content'>
                      {pedido.cliente_facturacion.email}
                    </span>
                  </li>
                </ul>
                {pedido.direccion_envio && (
                  <>
                    <h3 className='pedido-form-data-title pt-[10px] underline'>
                      Informacion de envio:
                    </h3>
                    <ul>
                      <li>
                        <span className='pedido-form-data-title'>Nombre: </span>
                        <span className='pedido-form-data-content'>
                          {pedido.cliente_envio.nombre}{' '}
                          {pedido.cliente_envio.apellido}
                        </span>
                      </li>
                      <li>
                        <span className='pedido-form-data-title'>
                          Telefono:{' '}
                        </span>
                        <span className='pedido-form-data-content'>
                          {pedido.cliente_envio.telefono}
                        </span>
                      </li>
                      <li>
                        <span className='pedido-form-data-title'>
                          Correo electronico:{' '}
                        </span>
                        <span className='pedido-form-data-content'>
                          {pedido.cliente_envio.email}
                        </span>
                      </li>
                      <li>
                        <span className='pedido-form-data-title'>
                          Direccion:{' '}
                        </span>
                        <span className='pedido-form-data-content'>
                          {pedido.direccion_envio.direccion}{' '}
                          {pedido.direccion_envio.numero}
                          {', '} {pedido.direccion_envio.ciudad}
                          {', '} {pedido.direccion_envio.provincia} {'('}
                          {pedido.direccion_envio.codigo_postal}
                          {')'}
                        </span>
                      </li>
                      {pedido.direccion_envio.departamento && (
                        <li>
                          <span className='pedido-form-data-title'>
                            Edificio:{' '}
                          </span>
                          <span className='pedido-form-data-content'>
                            Departamento {pedido.direccion_envio.departamento}
                            {', piso '}
                            {pedido.direccion_envio.piso}
                          </span>
                        </li>
                      )}
                    </ul>
                    <h3 className='pedido-form-data-title pt-[10px] underline'>
                      Codigo de seguimiento:
                    </h3>
                    <div className='flex w-full gap-[5px] items-center'>
                      <input
                        className='pedido-form-input'
                        placeholder='Ingresa el codigo de seguimiento'
                        onChange={handleCodSeguimiento}
                        value={pedido.codigo_seguimiento}
                      />
                      <button
                        className='w-[40%] pedido-form-button'
                        onClick={handleUpdatePedido}
                      >
                        Guardar
                      </button>
                    </div>
                  </>
                )}
                <h3 className='pedido-form-data-title pt-[10px] underline'>
                  Estados del pedido:
                </h3>
                <ul>
                  <li className='pt-[5px]'>
                    <span className='pedido-form-data-title'>
                      Estado del pago:{' '}
                    </span>
                    <Badge
                      size='xs'
                      color={colorPago(pedido.estado_pago)}
                    >
                      {pedido.estado_pago}
                    </Badge>
                  </li>
                  <li className='pt-[5px]'>
                    <span className='pedido-form-data-title'>
                      Estado del envio:{' '}
                    </span>
                    <Badge
                      size='xs'
                      color={colorEnvio(pedido.estado_envio)}
                    >
                      {pedido.estado_envio}
                    </Badge>
                  </li>
                </ul>

                <h3 className='pedido-form-data-title pt-[10px] underline'>
                  Detalles de compra:
                </h3>
                <table className='pedido-form-tabla mt-[10px]'>
                  <thead>
                    <tr>
                      <th className='tabla-productos-item center flex justify-start'>
                        Producto
                      </th>
                      <th className='tabla-productos-item center flex justify-center'>
                        Cantidad
                      </th>
                      <th className='tabla-productos-item center flex justify-center'>
                        Precio pagado
                      </th>
                      <th className='tabla-productos-item center flex justify-end'>
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pedido.productos.map((producto) => (
                      <tr key={producto._id}>
                        <td className='tabla-productos-item flex justify-start'>
                          {producto.categoria} {producto.nombre}
                        </td>
                        <td className='tabla-productos-item flex justify-center'>
                          {producto.cantidad} x {producto.talle}
                        </td>
                        {producto.precio_con_descuento > 0 ? (
                          <td className='tabla-productos-item flex justify-center'>
                            <span className='line-through opacity-[60%] pr-[5px]'>
                              {formatPrice(producto.precio)}
                            </span>
                            {'  '} {formatPrice(producto.precio_con_descuento)}
                          </td>
                        ) : (
                          <td className='tabla-productos-item flex justify-center'>
                            {formatPrice(producto.precio)}
                          </td>
                        )}
                        <td className='tabla-productos-item flex justify-end'>
                          {producto.precio_con_descuento ? (
                            <>
                              {formatPrice(
                                producto.precio_con_descuento *
                                  producto.cantidad
                              )}
                            </>
                          ) : (
                            <>
                              {formatPrice(producto.precio * producto.cantidad)}
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className='w-full p-[5px]'>
                    {pedido.coupon ? (
                      <>
                        <td>
                          <div className='flex w-full justify-between p-[5px]'>
                            <p>
                              Cupon usado: <strong>{pedido.coupon}%</strong>
                            </p>
                            <p>
                              {' '}
                              Total pagado:{' '}
                              <strong>
                                {formatPrice(pedido.total_con_descuento)}
                              </strong>
                            </p>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className=' center w-full flex justify-end p-[5px]'>
                          Total pagado:{' '}
                          <strong>{formatPrice(pedido.total)}</strong>
                        </td>
                      </>
                    )}
                  </tfoot>
                </table>
              </div>
            </div>
            <button
              className='w-full pedido-form-button'
              onClick={handlePrint}
            >
              Generar factura
            </button>
          </>
        ) : (
          <div>Cargando...</div>
        )}
      </motion.section>
    </div>
  );
}
