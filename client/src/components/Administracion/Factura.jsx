import { formatDateSpanish } from '../../utils/formatDateSpanish';
import { formatPrice } from '../../utils/formatePrice';

export default function Factura({ pedido }) {
  const totalPedido = pedido.productos.reduce((acc, producto) => {
    return producto.precio_con_descuento
      ? acc + producto.precio_con_descuento * producto.cantidad
      : acc + producto.precio * producto.cantidad;
  }, 0);
  return (
    <div
      style={{
        width: '100%',
        height: window.innerHeight,
        color: 'black',
        background: 'withe',
        padding: '10px 20px',
      }}
    >
      <table>
        <thead className='flex w-full justify-between items-center my-[30px]'>
          <tr className='w-[50%]'>
            <img
              className='w-[50%]'
              src='https://firebasestorage.googleapis.com/v0/b/archived-web.appspot.com/o/utils%2Flogo-archived.png?alt=media&token=ed5e58f9-31dd-4348-81e1-fa26ee6cc93c'
            />
          </tr>
          <tr className='flex flex-col items-end'>
            <h1 className='text-center text-[black] text-[small]'>
              Factura Nro.{' '}
              <span className='font-semibold text-[medium]'>
                #{pedido.numero_pedido}
              </span>
            </h1>
            <h2 className='text-[black] text-[small]'>
              Fecha de emision:{' '}
              <span className='font-semibold text-[medium]'>
                {formatDateSpanish(pedido.fecha)}
              </span>
            </h2>
          </tr>
        </thead>
        <tbody className='flex w-full justify-between items-center mb-[30px]'>
          <tr className='flex w-full h-[200px] justify-between items-center my-[10px] border'>
            <td className='w-[50%] h-[200px] flex flex-col p-[5px] justify-start items-start border-r'>
              <h3 className='text-[black] text-[small] font-semibold'>
                Domicilio:
              </h3>
              <p className='text-[medium]'>
                Calle Chacabuco 222, Oncativo, Córdoba, Argentina
              </p>
              <h3 className='text-[black] text-[small] font-semibold'>
                Correo electronico:
              </h3>
              <p>contact@archived.com</p>
              <h3 className='text-[black] text-[small] font-semibold'>
                Telefono:
              </h3>
              <p className='text-[medium]'>03572-529331</p>
            </td>
            <td className='w-[50%] h-[200px] flex flex-col p-[5px] justify-start text-end'>
              <h3 className='text-[black] text-[small] font-semibold'>
                Cliente:
              </h3>
              <p className='text-[medium]'>
                {pedido.cliente_facturacion.nombre}{' '}
                {pedido.cliente_facturacion.apellido}
              </p>
              <h3 className='text-[black] text-[small] font-semibold'>
                Documento:
              </h3>
              <p className='text-[medium]'>
                {pedido.cliente_facturacion.documento}
              </p>
              <h3 className='text-[black] text-[small] font-semibold'>
                Domicilio:
              </h3>
              <p className='text-[medium]'>
                {pedido.direccion_facturacion.calle}{' '}
                {pedido.direccion_facturacion.numero},{' '}
                {pedido.direccion_facturacion.ciudad},{' '}
                {pedido.direccion_facturacion.provincia}, CP:{' '}
                {pedido.direccion_facturacion.codigo_postal}
              </p>
              <h3 className='text-[black] text-[small] font-semibold'>
                Telefono:
              </h3>
              <p className='text-[medium]'>
                {pedido.cliente_facturacion.telefono}
              </p>
              <h3 className='text-[black] text-[small] font-semibold'>
                Correo electronico:
              </h3>
              <p className='text-[medium]'>{pedido.cliente_facturacion.mail}</p>
            </td>
          </tr>
        </tbody>
      </table>
      <table className='w-full border'>
        <thead className='flex w-full items-center justify-between bg-[#2e373e1a] text-[small]'>
          <tr className='w-full flex justify-start border-r'>
            <th className='p-[5px]'>Producto</th>
          </tr>
          <tr className='w-full flex justify-center border-r'>
            <th className='p-[5px]'>Cantidad</th>
          </tr>
          <tr className='w-full flex justify-center border-r'>
            <th className='p-[5px]'>Precio Unitario</th>
          </tr>
          <tr className='w-full flex justify-end'>
            <th className='p-[5px]'>Importe</th>
          </tr>
        </thead>
        <tbody className='flex w-full items-center justify-between text-[small]'>
          <tr className='w-full flex items-start border-r flex-col'>
            {pedido.productos.map((producto) => (
              <td
                className='p-[5px] border-y w-full text-start'
                key={producto.id}
              >
                {producto.categoria} {producto.nombre} - Talle: {producto.talle}
              </td>
            ))}
          </tr>
          <tr className='w-full flex items-center border-r flex-col'>
            {pedido.productos.map((producto) => (
              <td
                className='p-[5px] border-y w-full text-center'
                key={producto.id}
              >
                {producto.cantidad}
              </td>
            ))}
          </tr>
          <tr className='w-full flex items-center border-r flex-col'>
            {pedido.productos.map((producto) => (
              <td
                className='p-[5px] border-y w-full text-center'
                key={producto.id}
              >
                {producto.precio_con_descuento
                  ? formatPrice(producto.precio_con_descuento)
                  : formatPrice(producto.precio)}
              </td>
            ))}
          </tr>
          <tr className='w-full flex items-end flex-col'>
            {pedido.productos.map((producto) => (
              <td
                className='p-[5px] border-y w-full text-end'
                key={producto.id}
              >
                {producto.precio_con_descuento
                  ? formatPrice(
                      producto.precio_con_descuento * producto.cantidad
                    )
                  : formatPrice(producto.precio * producto.cantidad)}
              </td>
            ))}
          </tr>
        </tbody>
        <tfoot className='flex border w-full text-[small] p-[5px] '>
          <tr className='flex flex-col justify-end w-full'>
            <td className='font-semibold border-b w-full text-end'>
              SubTotal:{' '}
              <span className='font-normal w-[100px] inline-block'>
                {formatPrice(totalPedido)}
              </span>
            </td>
            <td className='font-semibold border-b w-full text-end'>
              Descuento:{' '}
              <span className='font-normal w-[100px] inline-block'>
                {pedido.total_con_descuento
                  ? formatPrice(totalPedido - pedido.total_con_descuento)
                  : '$0.00'}
              </span>
            </td>
            <td className='font-semibold w-full text-end'>
              Total:{' '}
              <span className='font-normal w-[100px] inline-block'>
                {' '}
                {pedido.total_con_descuento
                  ? formatPrice(pedido.total_con_descuento)
                  : formatPrice(pedido.total)}
              </span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
