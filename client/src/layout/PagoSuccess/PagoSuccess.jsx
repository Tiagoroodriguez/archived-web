import { Link, useSearchParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { CartContext } from '../../context/CarritoContext';
import { Boton } from '../../components/Boton/Boton';
import './PagoSuccess.css';
import { getPedidoNroPagoRequest } from '../../api/pedidos';

const PagoSuccess = () => {
  const [pedido, setPedido] = useState({});
  const [initialLoad, setInitialLoad] = useState(true); // Corrige 'initalLoad' a 'initialLoad'
  const { clearCartLocally } = useContext(CartContext);
  const [searchParams] = useSearchParams();

  const payment_id = searchParams.get('payment_id');

  useEffect(() => {
    const getPedido = async () => {
      if (initialLoad && payment_id) {
        // Llamar a la API para obtener el pedido
        const pedidoData = await getPedidoNroPagoRequest(payment_id);
        setPedido(pedidoData.data);
        clearCartLocally();
        setInitialLoad(false);
      }
    };
    getPedido();
  }, [payment_id, initialLoad, clearCartLocally]);

  return (
    <div className='payment-success-container'>
      <div className='circle-check '>
        <i className='bi bi-check-circle' />
      </div>
      <h1>¡Tu compra fue realizada con éxito!</h1>
      <p>Gracias por formar parte de esta familia</p>
      <div className='payment-details'>
        <p>
          Número de pedido:{' '}
          <span className='order-id'>
            {pedido ? <>{`#${pedido.numero_pedido}`}</> : <>#0000</>}
          </span>
        </p>
        <p>
          Número de pago: <span className='order-id'>{payment_id}</span>
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
