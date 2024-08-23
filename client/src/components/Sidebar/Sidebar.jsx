import { useEffect, useState } from 'react';
import { LogoTexto } from '../LogoTexto/LogoTexto';
import { NavLink } from 'react-router-dom';
import { usePedido } from '../../context/PedidosContext';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar({
  inicioNav,
  pedidosNav,
  productsNav,
  analiticNav,
  newsletterNav,
}) {
  const { getPedidos, pedidos } = usePedido();
  const { logout } = useAuth();
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
        <div className='sidebar-logo'>
          <LogoTexto blanco />
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
          <li className={newsletterNav ? 'active-nav' : ''}>
            <i className='bi bi-envelope-at' />
            <NavLink to='/administration/newsletter'>Newsletter</NavLink>
          </li>
          <li onClick={() => logout()}>
            <i className='bi bi-box-arrow-left' />
            <NavLink>Logout</NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
