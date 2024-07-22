import { useNavigate } from 'react-router-dom';
import { usePedido } from '../../context/PedidosContext';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Administracion.css';
import Sidebar from '../../components/Sidebar/Sidebar';

export default function Administracion() {
  const { getPedidos, pedidos } = usePedido();
  const { user } = useAuth();
  const [initialLoad, setInitialLoad] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (initialLoad && user) {
      const fetchPedidos = async () => {
        if (user.rol === 'admin') {
          await getPedidos();
        } else {
          navigate('/');
        }
        setInitialLoad(false);
      };
      fetchPedidos();
    }
  }, [user, initialLoad, getPedidos]);

  if (!user) {
    return <div className='pedido-load'>Cargando...</div>;
  }

  return (
    <div className='admin-container'>
      <Sidebar
        pedidos={pedidos}
        pedidosNav
      />
    </div>
  );
}
