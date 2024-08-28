import { useNavigate } from 'react-router-dom';
import { usePedido } from '../../context/PedidosContext';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Administracion.css';
import Sidebar from '../../components/Sidebar/Sidebar';

import { useProduct } from '../../context/ProductContext';
import { getSuscriptoresRequest } from '../../api/subscriber';

import { Analytics } from '@vercel/analytics/react';

export default function Administracion() {
  const { getPedidos, pedidos } = usePedido();
  const { getProducts, products } = useProduct();
  const { user } = useAuth();
  const [initialLoad, setInitialLoad] = useState(true);
  const [suscriptores, setSuscriptores] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (initialLoad && user) {
      const fetchInicial = async () => {
        if (user.rol === 'admin') {
          await getPedidos();
          await getProducts();
          const res = await getSuscriptoresRequest();
          setSuscriptores(res.data);
          setInitialLoad(false);
        } else {
          navigate('/');
        }
        setInitialLoad(false);
      };
      fetchInicial();
    }
  }, [user, initialLoad, getPedidos, getProducts, navigate]);

  if (!user) {
    return <div className='pedido-load'>Cargando...</div>;
  }

  return (
    <div className='admin-container'>
      <Sidebar
        pedidos={pedidos}
        inicioNav
      />
      <main className='admin-inicio'>
        <div className='admin-card-container'></div>
      </main>
    </div>
  );
}
