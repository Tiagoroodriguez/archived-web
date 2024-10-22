import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePedido } from '../../context/PedidosContext';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/Sidebar/Sidebar';
import { AreaChart, Card, BarChart } from '@tremor/react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import './Administracion.css';
import { useProduct } from '../../context/ProductContext';

export default function Administracion() {
  const { getPedidos, pedidos } = usePedido();
  const { getProducts, products } = useProduct();
  const { user } = useAuth();
  const [initialLoad, setInitialLoad] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [chartDataProductos, setChartDataProductos] = useState([]);
  const [datas, setDatas] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (initialLoad && user) {
      const fetchInicial = async () => {
        if (user.rol === 'admin') {
          await getPedidos();
          await getProducts();
          setInitialLoad(false);
        } else {
          navigate('/');
        }
        setInitialLoad(false);
      };
      fetchInicial();
    }
  }, [user, initialLoad, getPedidos, getProducts, navigate]);

  useEffect(() => {
    if (pedidos.length > 0) {
      const gananciasPorMes = pedidos.reduce((acc, pedido) => {
        const mes = new Date(pedido.fecha).getMonth() + 1; // Obtener el mes del pedido
        const año = new Date(pedido.fecha).getFullYear(); // Obtener el año del pedido
        const key = `${año}-${mes.toString().padStart(2, '0')}`; // Crear una clave en formato YYYY-MM

        if (!acc[key]) {
          acc[key] = 0;
        }

        acc[key] += pedido.total; // Sumar la ganancia del pedido al mes correspondiente

        return acc;
      }, {});

      // Convertir el objeto a un array de datos para el gráfico
      const datosGrafico = Object.entries(gananciasPorMes).map(
        ([fecha, total]) => ({
          date: fecha,
          Ganancias: total,
        })
      );

      setChartData(datosGrafico);
    }
  }, [pedidos]);

  useEffect(() => {
    if (products.length > 0) {
      const productosVendidos = products.reduce((acc, product) => {
        if (!acc[product.nombre]) {
          acc[product.nombre] = 0;
        }

        acc[product.nombre] += product.ventas; // Sumar la cantidad vendida del producto

        return acc;
      }, {});

      // Convertir el objeto a un array de datos para el gráfico
      const datosGrafico = Object.entries(productosVendidos).map(
        ([nombre, ventas]) => ({
          nombre,
          'Numero de ventas': ventas,
        })
      );

      setChartDataProductos(datosGrafico);
    }
  }, [products]);

  const currencyFormatter = (number) =>
    `$${Intl.NumberFormat('us').format(number)}`;

  const payload = datas?.payload?.[0];
  const value = payload?.value;

  const formattedValue = payload
    ? currencyFormatter(value)
    : currencyFormatter(chartData[chartData.length - 1]?.Ganancias || 0);

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
      <Sidebar inicioNav />
      <main className='admin-inicio '>
        <header>
          <h1>Bienvenido a la administracion</h1>
          <p>Aqui podras ver un resumen pedidos y productos</p>
        </header>
        <section className='flex gap-3'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className='w-1/2 h-[350px]'
          >
            <Card className='mx-auto h-full flex flex-col justify-between'>
              <div>
                <p className='text-sm text-gray-700 dark:text-gray-300'>
                  Ganancias del mes
                </p>
                <p className='mt-2 text-xl font-semibold text-gray-900 dark:text-gray-50'>
                  {formattedValue}
                </p>
              </div>
              <AreaChart
                data={chartData}
                index='date'
                categories={['Ganancias']}
                showLegend={false}
                showYAxis={false}
                startEndOnly={true}
                valueFormatter={currencyFormatter}
                className='-mb-2 mt-8 h-48'
                tooltipCallback={(props) => {
                  if (props.active) {
                    setDatas((prev) => {
                      if (prev?.label === props.label) return prev;
                      return props;
                    });
                  } else {
                    setDatas(null);
                  }
                  return null;
                }}
              />
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className='w-1/2 h-[350px]'
          >
            <Card className='h-full'>
              <p className='text-sm text-gray-700 dark:text-gray-300'>
                Productos más vendidos
              </p>

              <BarChart
                className='h-72'
                data={chartDataProductos}
                index='nombre'
                categories={['Numero de ventas']}
                yAxisWidth={45}
                onValueChange={(v) => setValue(v)}
              />
            </Card>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
