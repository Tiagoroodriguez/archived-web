import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogoTexto } from '../LogoTexto/LogoTexto';
import { useAuth } from '../../context/AuthContext'; // Importamos el hook useAuth
import './Header.css';

function Header() {
  const { isAuthenticated, user, logout } = useAuth(); // Usamos el hook useAuth para acceder al contexto de autenticación
  const [clicked, setClicked] = useState(false); // Usamos el estado local con el hook useState

  const handleClick = () => {
    setClicked(!clicked); // Cambiamos el estado local al hacer clic en el icono
  };

  return (
    <header>
      <nav className='nav-container'>
        <div>
          <ul className={clicked ? 'nav-bar active' : 'nav-bar'}>
            <li>
              <Link to='/'>Inicio</Link>
            </li>
            <li>
              <Link to='/tienda'>Tienda</Link>
            </li>
            <li>
              <Link to='/contacto'>Contacto</Link>
            </li>
            {isAuthenticated ? (
              <>
                <li className='mobile-cuenta mobile-cuenta-primero'>
                  <Link to='#'>Bienvenido {user ? user.nombre : ''}</Link>
                </li>
                <li className='mobile-cuenta'>
                  <Link
                    to='/'
                    onClick={() => {
                      logout();
                    }}
                  >
                    Salir
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className='mobile-cuenta mobile-cuenta-primero'>
                  <Link to='/login'>Iniciar sesión</Link>
                </li>
                <li className='mobile-cuenta'>
                  <Link to='/register'>Crear cuenta</Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <div
          className='mobile'
          onClick={handleClick}
        >
          <i className={clicked ? 'bi bi-x-lg' : 'bi bi-list'}></i>
        </div>

        <Link to='/'>
          <LogoTexto />
        </Link>

        <div>
          <ul className='nav-bar'>
            {isAuthenticated ? (
              <>
                <li>
                  <Link to='#'>Bienvenido {user ? user.nombre : ''}</Link>
                </li>
                <li>
                  <Link
                    to='/'
                    onClick={() => {
                      logout();
                    }}
                  >
                    Salir
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to='/login'>Iniciar sesión</Link>
                </li>
                <li>
                  <Link to='/register'>Crear cuenta</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
