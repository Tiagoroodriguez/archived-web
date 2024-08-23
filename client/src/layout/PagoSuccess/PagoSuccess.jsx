import { Link, useSearchParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { MercadoPagoContext } from '../../context/MercadoPago';
import { CartContext } from '../../context/CarritoContext';
import { Boton } from '../../components/Boton/Boton';
import './PagoSuccess.css';
import { usePedido } from '../../context/PedidosContext';
import { useAuth } from '../../context/AuthContext';

const PagoSuccess = () => {
  const { getOrder } = useContext(MercadoPagoContext);
  const { clearCartLocally, getCartTotal, coupon } = useContext(CartContext);
  const { user } = useAuth();
  const {
    envioInfo,
    setPedido,
    createPedido,
    isPedidoCreated,
    setPedidoCreated,
  } = usePedido();
  const [searchParams] = useSearchParams();
  const [orderItems, setOrderItems] = useState([]);
  const merchantOrderId = searchParams.get('merchant_order_id');

  useEffect(() => {
    const fetchOrderItems = async () => {
      const items = await getOrder(merchantOrderId);
      setOrderItems(items);
      clearCartLocally();
    };

    if (!orderItems.length) {
      fetchOrderItems();
    }
  }, [getOrder, merchantOrderId, orderItems.length]);

  useEffect(() => {
    if (orderItems.length && envioInfo && !isPedidoCreated) {
      const formattedOrderItems = orderItems.map((item) => ({
        producto_id: item.id,
        nombre: item.title,
        cantidad: item.quantity,
        precio: item.unit_price,
        talle: item.description,
      }));

      const pedidoTotal = formattedOrderItems.reduce(
        (total, item) => total + item.precio * item.cantidad,
        0
      );

      const completeOrder = {
        ...envioInfo,
        codigo_pago: merchantOrderId,
        estado_pago: 'Aprobado',
        tipo_pago: 'Mercado Pago',
        productos: formattedOrderItems,
        total: pedidoTotal,
        user: user ? user.id : undefined,
        coupon: coupon ? coupon.id : undefined,
      };
      setPedido(completeOrder);
      createPedido(completeOrder); // Crear el pedido cuando la información esté completa
      setPedidoCreated(true); // Marcar que el pedido ha sido creado
    }
  }, [
    envioInfo,
    orderItems,
    merchantOrderId,
    setPedido,
    createPedido,
    isPedidoCreated,
    setPedidoCreated,
    user,
    getCartTotal,
  ]);

  return (
    <div className='payment-success-container'>
      <div className='circle-check '>
        <i className='bi bi-check-circle' />
      </div>
      <h1>¡Tu compra fue realizada con éxito!</h1>
      <p>Gracias por formar parte de esta familia</p>
      <div className='payment-details'>
        <p>
          Número de pedido
          <span className='order-id'>{`#${merchantOrderId}`}</span>
        </p>
        <p>
          Estado del pago: <span className='payment-status'>Aprobado</span>
        </p>
      </div>
      <div className='action-buttons'>
        <Link to='/'>
          <Boton
            textBoton='Inicio'
            secundario={true}
            value={'Inicio'}
          />
        </Link>
        <Link to='/tienda'>
          <Boton textBoton='Seguir comprando' />
        </Link>
      </div>
    </div>
  );
};

export default PagoSuccess;
