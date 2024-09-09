import { useNavigate } from 'react-router-dom';
import { usePedido } from '../../context/PedidosContext';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Administracion.css';
import Sidebar from '../../components/Sidebar/Sidebar';

import { Helmet } from 'react-helmet';

export default function Administracion() {
  const { getPedidos, pedidos } = usePedido();
  const { user } = useAuth();
  const [initialLoad, setInitialLoad] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (initialLoad && user) {
      const fetchInicial = async () => {
        if (user.rol === 'admin') {
          await getPedidos();
          setInitialLoad(false);
        } else {
          navigate('/');
        }
        setInitialLoad(false);
      };
      fetchInicial();
    }
  }, [user, initialLoad, getPedidos, navigate]);

  if (!user) {
    return <div className='pedido-load'>Cargando...</div>;
  }

  return (
    <div className='admin-container'>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Inicio | Administracion</title>
        <meta
          name='description'
          content='Pagina de administracion'
        />
        <link
          rel='canonical'
          href='http://archived.com.ar/administration'
        />
      </Helmet>
      <Sidebar
        pedidos={pedidos}
        inicioNav
      />
      <main className='admin-inicio'>
        <div className='relative h-full w-full bg-white'>
          <div className='absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]'>
            <div className='admin-card-container'>
              <h1>Panel de administración</h1>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
