import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './PedidoForm.css';
import { usePedido } from '../../context/PedidosContext';
import { useAuth } from '../../context/AuthContext';
import PedidoFormAdmin from './PedidoFormAdmin';
import PedidoFormUser from './PedidoFormUser';

export default function PedidoForm() {
  const { id } = useParams();
  const { getPedido, pedido } = usePedido();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [estado, setEstado] = useState(''); // Estado inicial

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
    return <div className='pedido-load'>Cargando...</div>;
  }

  console.log(pedido.codigo_seguimiento);

  return (
    <>
      {user.rol === 'admin' ? (
        <PedidoFormAdmin
          pedido={pedido}
          id={id}
          estado={estado}
          setEstado={setEstado}
        />
      ) : (
        <PedidoFormUser pedido={pedido} />
      )}
    </>
  );
}
