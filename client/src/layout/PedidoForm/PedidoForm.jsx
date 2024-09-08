import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './PedidoForm.css';
import { usePedido } from '../../context/PedidosContext';
import PedidoFormUser from './PedidoFormUser';

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
    return <div className='pedido-load'>Cargando...</div>;
  }

  return <PedidoFormUser pedido={pedido} />;
}
