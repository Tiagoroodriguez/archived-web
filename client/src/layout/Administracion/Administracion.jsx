import { useNavigate } from 'react-router-dom';
import { usePedido } from '../../context/PedidosContext';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Administracion.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import { DonutChart, Legend } from '@tremor/react';
import { Card } from '@tremor/react';

const sales = [
  {
    name: 'New York',
    sales: 980,
  },
  {
    name: 'London',
    sales: 456,
  },
  {
    name: 'Hong Kong',
    sales: 390,
  },
  {
    name: 'San Francisco',
    sales: 240,
  },
  {
    name: 'Singapore',
    sales: 190,
  },
];

export default function Administracion() {
  const { getPedidos, pedidos } = usePedido();
  const { user } = useAuth();
  const [initialLoad, setInitialLoad] = useState(true);

  const navigate = useNavigate();

  const valueFormatter = (value) => `$${value}`;

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
      <main className='admin-inicio'>
        <div className='admin-card-container'>
          <Card className='mx-auto max-w-xs'>
            <p className='text-tremor-default text-tremor-content dark:text-dark-tremor-content'>
              <i className='bi bi-currency-dollar' /> Ventas totales
            </p>
            <p className='text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold'>
              $34,743
            </p>
          </Card>
          <Card className='mx-auto max-w-xs'>
            <p className='text-tremor-default text-tremor-content dark:text-dark-tremor-content'>
              <i className='bi bi-bag' /> Pedidos totales
            </p>
            <p className='text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold'>
              574
            </p>
          </Card>
          <Card className='mx-auto max-w-xs'>
            <p className='text-tremor-default text-tremor-content dark:text-dark-tremor-content'>
              <i className='bi bi-box' /> Stock actual
            </p>
            <p className='text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold'>
              55
            </p>
          </Card>
          <Card className='mx-auto max-w-xs'>
            <p className='text-tremor-default text-tremor-content dark:text-dark-tremor-content'>
              <i className='bi bi-person' /> Suscriptores actual
            </p>
            <p className='text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold'>
              84
            </p>
          </Card>
        </div>
        <div className='flex items-center justify-center space-x-6'>
          <DonutChart
            data={sales}
            category='sales'
            index='name'
            valueFormatter={valueFormatter}
            colors={['blue', 'cyan', 'indigo', 'violet', 'fuchsia']}
            className='w-40'
          />
          <Legend
            categories={[
              'New York',
              'London',
              'Hong Kong',
              'San Francisco',
              'Singapore',
            ]}
            colors={['blue', 'cyan', 'indigo', 'violet', 'fuchsia']}
            className='max-w-xs'
          />
        </div>
      </main>
    </div>
  );
}
