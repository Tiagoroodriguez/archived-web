import { Link, useSearchParams } from 'react-router-dom';
import { Boton } from '../../components/Boton/Boton';
import './PagoSuccess.css'; // Import your CSS file for styling
import { useContext, useState, useEffect } from 'react';
import { MercadoPagoContext } from '../../context/MercadoPago';

const PagoSuccess = () => {
  const { getOrder } = useContext(MercadoPagoContext);
  const [searchParams] = useSearchParams();
  const [orderItems, setOrderItems] = useState([]);

  const merchantOrderId = searchParams.get('merchant_order_id');

  useEffect(() => {
    const fetchOrderItems = async () => {
      const items = await getOrder(merchantOrderId);
      setOrderItems(items);
    };

    fetchOrderItems();
  }, [getOrder, merchantOrderId]);

  return (
    <div className='payment-success-container'>
      <i className='bi bi-check-circle' />
      <h1>¡Tu compra fue realizada con éxito!</h1>
      <p>Gracias por formar parte de esta familia</p>

      <div className='payment-details'>
        <p>
          Número de pedido{' '}
          <span className='order-id'>{`#${merchantOrderId}`}</span>
        </p>
        <p>
          Estado del pago: <span className='payment-status'>Aprobado</span>
        </p>
      </div>

      {orderItems.length > 0 && ( // Conditionally render items only if fetched
        <ul className='purchased-items'>
          {orderItems.map((item) => (
            <li key={item.id}>
              <p>
                {item.title} (x{item.quantity})
              </p>
              <p>Precio: {item.unit_price}</p>
            </li>
          ))}
        </ul>
      )}

      <div className='action-buttons'>
        <Link to='/'>
          <Boton
            textBoton='Inicio'
            secundario={true}
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
