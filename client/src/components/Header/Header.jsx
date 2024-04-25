import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogoTexto } from '../LogoTexto/LogoTexto';
import { useAuth } from '../../context/AuthContext'; // Importamos el hook useAuth
import './Header.css';
import Carrito from '../Carrito/Carrito';

function Header() {
  const { isAuthenticated, user, logout } = useAuth(); // Usamos el hook useAuth para acceder al contexto de autenticación
  const [clicked, setClicked] = useState(false); // Usamos el estado local con el hook useState
  const [showCart, setShowCart] = useState(false); // Estado para controlar la visibilidad del carrito

  // Función para alternar la visibilidad del carrito
  const toggleCart = () => {
    setShowCart(!showCart);
  };
  const handleClick = () => {
    setClicked(!clicked); // Cambiamos el estado local al hacer clic en el icono
  };
  return (
    <>
      <header>
        <nav className='nav-container'>
          <div className='nav-link'>
            <ul className={clicked ? 'nav-bar active links' : 'nav-bar links'}>
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
                    <Link to='#'>Hola {user ? user.nombre : ''}</Link>
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

          <Link
            to='/'
            className='nav-logo'
          >
            <LogoTexto />
          </Link>

          <button
            onClick={toggleCart}
            className='boton-carrito-mobile'
          >
            <i className='bi bi-cart4'></i>
          </button>

          <div className='nav-cuenta'>
            <ul className='nav-bar cuenta'>
              {isAuthenticated ? (
                <>
                  <li>
                    <Link to='#'>Hola {user ? user.nombre : ''}</Link>
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
              <li>
                <button
                  onClick={toggleCart}
                  className='boton-carrito'
                >
                  <i className='bi bi-cart4'></i>
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      {showCart && <Carrito />}
    </>
  );
}

export default Header;
