import { useNavigate } from 'react-router-dom';
import { usePedido } from '../../context/PedidosContext';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Administracion.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import { AreaChart } from '@tremor/react';
import { Card } from '@tremor/react';
import { formatPrice } from '../../utils/formatePrice';
import { useProduct } from '../../context/ProductContext';
import { getSuscriptoresRequest } from '../../api/subscriber';
import { RiFlag2Line } from '@remixicon/react';
import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react';

const data = [
  {
    name: 'Viola Amherd',
    Role: 'Federal Councillor',
    departement:
      'The Federal Department of Defence, Civil Protection and Sport (DDPS)',
    status: 'active',
  },

  {
    name: 'Ignazio Cassis',
    Role: 'Federal Councillor',
    departement: 'The Federal Department of Foreign Affairs (FDFA)',
    status: 'active',
  },
  {
    name: 'Karin Keller-Sutter',
    Role: 'Federal Councillor',
    departement: 'The Federal Department of Finance (FDF)',
    status: 'active',
  },
  {
    name: 'Guy Parmelin',
    Role: 'Federal Councillor',
    departement:
      'The Federal Department of Economic Affairs, Education and Research (EAER)',
    status: 'active',
  },
  {
    name: 'Elisabeth Baume-Schneider',
    Role: 'Federal Councillor',
    departement: 'The Federal Department of Home Affairs (FDHA)',
    status: 'active',
  },
];

const chartdata = [
  {
    date: 'Jan 22',
    SolarPanels: 2890,
    Inverters: 2338,
  },
  {
    date: 'Feb 22',
    SolarPanels: 2756,
    Inverters: 2103,
  },
  {
    date: 'Mar 22',
    SolarPanels: 3322,
    Inverters: 2194,
  },
  {
    date: 'Apr 22',
    SolarPanels: 3470,
    Inverters: 2108,
  },
  {
    date: 'May 22',
    SolarPanels: 3475,
    Inverters: 1812,
  },
  {
    date: 'Jun 22',
    SolarPanels: 3129,
    Inverters: 1726,
  },
  {
    date: 'Jul 22',
    SolarPanels: 3490,
    Inverters: 1982,
  },
  {
    date: 'Aug 22',
    SolarPanels: 2903,
    Inverters: 2012,
  },
  {
    date: 'Sep 22',
    SolarPanels: 2643,
    Inverters: 2342,
  },
  {
    date: 'Oct 22',
    SolarPanels: 2837,
    Inverters: 2473,
  },
  {
    date: 'Nov 22',
    SolarPanels: 2954,
    Inverters: 3848,
  },
  {
    date: 'Dec 22',
    SolarPanels: 3239,
    Inverters: 3736,
  },
];

export default function Administracion() {
  const { getPedidos, pedidos } = usePedido();
  const { getProducts, products } = useProduct();
  const { user } = useAuth();
  const [initialLoad, setInitialLoad] = useState(true);
  const [suscriptores, setSuscriptores] = useState([]);

  const navigate = useNavigate();

  const valueFormatter = (value) => `$${value}`;

  const gananciaTotal = pedidos.reduce((acc, pedido) => acc + pedido.total, 0);

  const stockTotal = products.reduce(
    (acc, product) =>
      acc + product.cant_s + product.cant_m + product.cant_l + product.cant_xl,
    0
  );

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
        <div className='admin-card-container'>
          <Card
            className='mx-auto max-w-xs no-radius'
            decoration='top'
            decorationColor='emerald'
          >
            <p className='text-tremor-default text-tremor-content dark:text-dark-tremor-content'>
              <i className='bi bi-currency-dollar' /> Ventas totales
            </p>
            <p className='text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold'>
              {formatPrice(gananciaTotal)}
            </p>
          </Card>
          <Card
            className='mx-auto max-w-xs no-radius'
            decoration='top'
            decorationColor='cyan'
          >
            <p className='text-tremor-default text-tremor-content dark:text-dark-tremor-content'>
              <i className='bi bi-bag' /> Pedidos totales
            </p>
            <p className='text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold'>
              {pedidos.length}
            </p>
          </Card>
          <Card
            className='mx-auto max-w-xs no-radius'
            decoration='top'
            decorationColor='yellow'
          >
            <p className='text-tremor-default text-tremor-content dark:text-dark-tremor-content'>
              <i className='bi bi-box' /> Stock actual
            </p>
            <p className='text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold'>
              {stockTotal}
            </p>
          </Card>
          <Card
            className='mx-auto max-w-xs no-radius'
            decoration='top'
            decorationColor='red'
          >
            <p className='text-tremor-default text-tremor-content dark:text-dark-tremor-content'>
              <i className='bi bi-person' /> Suscriptores actual
            </p>
            <p className='text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold'>
              {suscriptores.length}
            </p>
          </Card>
        </div>
        <div className='admin-card-container flex gap-[20px] px-5'>
          <Card className='no-radius'>
            <h3 className='text-tremor-default text-tremor-content dark:text-dark-tremor-content'>
              Ganancias por colecciones
            </h3>
            <p className='text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold'>
              {formatPrice(gananciaTotal)}
            </p>
            <AreaChart
              className='mt-4 h-72'
              data={chartdata}
              index='date'
              yAxisWidth={65}
              categories={['SolarPanels', 'Inverters']}
              colors={['indigo', 'cyan']}
              valueFormatter={valueFormatter}
            />
          </Card>
          <Card className='no-radius'>
            <h3 className='text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold'>
              Ultimas ventas
            </h3>
            <Table className='mt-5'>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Name</TableHeaderCell>
                  <TableHeaderCell>Position</TableHeaderCell>

                  <TableHeaderCell>Status</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item.name}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.Role}</TableCell>

                    <TableCell>
                      <Badge
                        color='emerald'
                        icon={RiFlag2Line}
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </main>
    </div>
  );
}
