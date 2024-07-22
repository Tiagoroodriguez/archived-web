import { useEffect, useState } from 'react';
import { LogoTexto } from '../LogoTexto/LogoTexto';
import { NavLink } from 'react-router-dom';
import { usePedido } from '../../context/PedidosContext';

export default function Sidebar({ pedidosNav, productsNav, analiticNav }) {
  const { getPedidos, pedidos } = usePedido();
  const [initialLoad, setInitialLoad] = useState(true);
  useEffect(() => {
    if (initialLoad) {
      const fetchPedidos = async () => {
        await getPedidos();
        setInitialLoad(false);
      };
      fetchPedidos();
    }
  }, [initialLoad, getPedidos]);
  return (
    <asaide className='admin-menu'>
      <nav>
        <div>
          <LogoTexto />
        </div>
        <ul>
          <li>
            <i className='bi bi-house' />
            <NavLink to='/'>Inicio</NavLink>
          </li>
          <li className={pedidosNav ? 'active-nav' : ''}>
            <i className='bi bi-cart' />
            <NavLink to='/administration/orders'>
              Pedidos <span>{pedidos.length}</span>
            </NavLink>
          </li>
          <li className={productsNav ? 'active-nav' : ''}>
            <i className='bi bi-box' />
            <NavLink to='/administration/products'>Productos</NavLink>
          </li>
          <li className={analiticNav ? 'active-nav' : ''}>
            <i className='bi bi-graph-up' />
            <NavLink>Analiticas</NavLink>
          </li>
        </ul>
      </nav>
    </asaide>
  );
}
