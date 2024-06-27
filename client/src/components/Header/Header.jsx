import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LogoTexto } from '../LogoTexto/LogoTexto';
import { useAuth } from '../../context/AuthContext'; // Importamos el hook useAuth
import './Header.css';
import Carrito from '../Carrito/Carrito';
import { CartContext } from '../../context/CarritoContext';

function Header({ anuncio }) {
  const { isAuthenticated, user, logout } = useAuth(); // Usamos el hook useAuth para acceder al contexto de autenticación
  const [clicked, setClicked] = useState(false); // Usamos el estado local con el hook useState
  const [showCart, setShowCart] = useState(false); // Estado para controlar la visibilidad del carrito
  const { cartItems } = useContext(CartContext);

  // Función para alternar la visibilidad del carrito
  const toggleCart = () => {
    setShowCart(!showCart);
  };
  const handleClick = () => {
    setClicked(!clicked); // Cambiamos el estado local al hacer clic en el icono
  };

  return (
    <>
      <header className='header-container'>
        <nav className='nav-container'>
          <div className='nav-link'>
            <ul className={clicked ? 'nav-bar active links' : 'nav-bar links'}>
              <li>
                <Link
                  to='/tienda?categoria=all'
                  onClick={() => {
                    setClicked(false); // Cerramos el menú al hacer clic en el enlace
                  }}
                >
                  Tienda
                </Link>
              </li>
              <li>
                <Link
                  to='/'
                  onClick={() => {
                    setClicked(false); // Cerramos el menú al hacer clic en el enlace
                  }}
                >
                  Colleciones
                </Link>
              </li>
              <li>
                <Link
                  to='/contacto'
                  onClick={() => {
                    setClicked(false); // Cerramos el menú al hacer clic en el enlace
                  }}
                >
                  Contacto
                </Link>
              </li>
              {isAuthenticated ? (
                <>
                  <li className='mobile-cuenta mobile-cuenta-primero'>
                    <Link
                      to={`/perfil/${user.id}`}
                      onClick={() => {
                        setClicked(false); // Cerramos el menú al hacer clic en el enlace
                      }}
                    >
                      Hola {user ? user.nombre : ''}
                    </Link>
                  </li>
                  <li className='mobile-cuenta'>
                    <Link
                      to='/'
                      onClick={() => {
                        logout();
                        setClicked(false); // Cerramos el menú al hacer clic en el enlace
                      }}
                    >
                      Salir
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className='mobile-cuenta mobile-cuenta-primero'>
                    <Link
                      to='/login'
                      onClick={() => {
                        setClicked(false); // Cerramos el menú al hacer clic en el enlace
                      }}
                    >
                      Iniciar sesión
                    </Link>
                  </li>
                  <li className='mobile-cuenta'>
                    <Link
                      to='/register'
                      onClick={() => {
                        setClicked(false); // Cerramos el menú al hacer clic en el enlace
                      }}
                    >
                      Crear cuenta
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div
            className='mobile'
            onClick={handleClick}
          >
            <i className={clicked ? 'bi bi-x-lg' : 'bi bi-list'} />
          </div>

          <div className='nav-logo'>
            <LogoTexto />
          </div>

          <button
            onClick={toggleCart}
            className='boton-carrito-mobile'
          >
            <i className='bi bi-bag'>({cartItems.length})</i>
          </button>

          <div className='nav-cuenta'>
            <ul className='nav-bar cuenta'>
              {isAuthenticated ? (
                <>
                  <li>
                    <Link to={`/perfil/${user.id}`}>
                      Hola {user ? user.nombre : ''}
                    </Link>
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
                  <i className='bi bi-bag'>({cartItems.length})</i>
                </button>
              </li>
            </ul>
          </div>
        </nav>
        <div className={`header-cart-container ${showCart ? 'show' : ''}`}>
          <Carrito />
        </div>
        <div
          className={`announcement-container ${
            anuncio ? 'display-anuncio' : 'ocultar-anuncio'
          }`}
        >
          <div className='announcement-messages'>
            <p>Free shipping on orders over $50!</p>
            <p>30% off on all summer collections!</p>
            <p>Subscribe to our newsletter for exclusive deals!</p>
            <p>Free shipping on orders over $50!</p>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
