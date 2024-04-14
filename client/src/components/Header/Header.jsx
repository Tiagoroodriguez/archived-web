import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogoTexto } from '../LogoTexto/LogoTexto';
import './Header.css';

export function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  console.log(user);

  return (
    <header>
      <div className='desktop-header'>
        <div className='search-container'>
          <input
            type='text'
            placeholder='Buscar...'
          />
          <i
            className='bi bi-search'
            alt='Icono de busqueda'
          ></i>
        </div>
        <div className='desktop-header-logo'>
          <Link to='/'>
            <LogoTexto />
          </Link>
        </div>
        {isAuthenticated ? (
          <>
            <div className='desktop-header-cuenta'>
              <Link
                className='desktop-header-cuenta-item'
                to=''
              >
                Bienvenido {user.nombre}
              </Link>
              <Link
                className='desktop-header-cuenta-item'
                to='/'
                onClick={() => {
                  logout();
                }}
              >
                Salir
              </Link>
              <i
                className='bi bi-cart2 desktop-header-cuenta-item'
                alt='Icono de carrito de compras'
              ></i>
            </div>
          </>
        ) : (
          <>
            <div className='desktop-header-cuenta'>
              <Link
                to='/register'
                className='desktop-header-cuenta-item'
              >
                Crear cuenta
              </Link>
              <div className='desktop-header-cuenta-item'> | </div>
              <Link
                to='/login'
                className='desktop-header-cuenta-item'
              >
                Iniciar sesión
              </Link>
              <i
                className='bi bi-cart2 desktop-header-cuenta-item'
                alt='Icono de carrito de compras'
              ></i>
            </div>
          </>
        )}
      </div>

      <nav className='desktop-nav'>
        <ul className='desktop-nav-lista'>
          <li className='desktop-nav-item'>
            <Link to='/'>Inicio</Link>
          </li>
          <li className='desktop-nav-item'>
            <Link to='/tienda'>Tienda</Link>
          </li>
          <li className='desktop-nav-item'>
            <Link to='/contacto'>Contacto</Link>
          </li>
        </ul>
      </nav>

      <div className='mobile-header'>
        <nav
          className='mobile-nav mobile-container'
          id='nav'
        >
          <img
            src='/svg/archived-logo-blaco.svg'
            alt=''
            className='mobile-nav-logo'
          />
          <ul className='mobile-nav-lista'>
            <li className='mobile-nav-item'>
              <Link
                to='/'
                className='mobile-nav-link'
              >
                Inicio
              </Link>
            </li>
            <li className='mobile-nav-item'>
              <Link
                to='/tienda'
                className='mobile-nav-link'
              >
                Tienda
              </Link>
            </li>

            <li className='mobile-nav-item'>
              <Link
                to='/contacto'
                className='mobile-nav-link'
              >
                Contacto
              </Link>
            </li>

            {isAuthenticated ? (
              <>
                <li className='mobile-nav-item cuenta'>
                  <Link
                    className='mobile-cuenta-item'
                    to=''
                  >
                    Bienvenido {user.nombre}
                  </Link>
                </li>
                <li className='mobile-nav-item'>
                  <Link
                    className='mobile-cuenta-item'
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
                <li className='mobile-nav-item cuenta'>
                  <Link
                    to='/register'
                    className='mobile-cuenta-item'
                  >
                    Crear cuenta
                  </Link>
                </li>
                <li className='mobile-nav-item'>
                  <Link
                    to='/login'
                    className='mobile-cuenta-item'
                  >
                    Iniciar sesión
                  </Link>
                </li>
              </>
            )}
          </ul>

          <a
            href='#nav'
            className='mobile-nav-open'
          >
            <i className='bi bi-list mobile-nav-icon'></i>
          </a>
          <a
            href='#'
            className='mobile-nav-close'
          >
            <i className='bi bi-x-lg mobile-nav-icon'></i>
          </a>
        </nav>
      </div>
    </header>
  );
}
