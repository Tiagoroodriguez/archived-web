import { useEffect, useState } from 'react';
import { LogoTexto } from '../LogoTexto/LogoTexto';
import { NavLink } from 'react-router-dom';
import { usePedido } from '../../context/PedidosContext';

export default function Sidebar({
  inicioNav,
  pedidosNav,
  productsNav,
  analiticNav,
}) {
  const { getPedidos, pedidos } = usePedido();
  const [initialLoad, setInitialLoad] = useState(true);
  useEffect(() => {
    if (!initialLoad) {
      const fetchPedidos = async () => {
        await getPedidos();
        setInitialLoad(false);
      };
      fetchPedidos();
    }
  }, [initialLoad, getPedidos]);
  return (
    <aside className='admin-menu'>
      <nav>
        <div>
          <LogoTexto />
        </div>
        <ul>
          <li className={inicioNav ? 'active-nav' : ''}>
            <i className='bi bi-columns-gap' />
            <NavLink to='/administration'>Inicio</NavLink>
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
    </aside>
  );
}
