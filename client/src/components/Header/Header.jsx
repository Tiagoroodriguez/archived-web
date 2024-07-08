import { useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { LogoTexto } from '../LogoTexto/LogoTexto';
import { useAuth } from '../../context/AuthContext';
import './Header.css';
import Carrito from '../Carrito/Carrito';
import { CartContext } from '../../context/CarritoContext';
import DropDown from '../DropDown/DropDown';

function Header({ anuncio }) {
  const { isAuthenticated, user, logout } = useAuth();
  const [clicked, setClicked] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const timerRef = useRef(null); // Referencia para el temporizador

  const { cartItems } = useContext(CartContext);

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleMouseEnter = () => {
    clearTimeout(timerRef.current); // Limpiamos el temporizador si está activo
    setDropdown(true);
  };

  const handleMouseLeave = () => {
    // Configuramos el temporizador para cerrar el dropdown después de 5 segundos
    timerRef.current = setTimeout(() => {
      setDropdown(false);
    }, 500); // 1000 milisegundos = 1 segundos
  };

  const handleDropdownItemClick = () => {
    clearTimeout(timerRef.current); // Limpiamos el temporizador si está activo
    setDropdown(false); // Cerramos el dropdown al hacer clic en un ítem
  };

  const dataHeader = [
    {
      title: 'Colecciones',
      content: (
        <ul>
          <li>
            <Link>Archived 222</Link>
            <Link>Verano</Link>
            <Link>Otoño</Link>
            <Link>Invierno</Link>
          </li>
        </ul>
      ),
    },
  ];

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
                    setClicked(false);
                  }}
                >
                  Shop
                </Link>
              </li>
              <li
                className='dropdown'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to='#'
                  className='dropdown-toggle'
                >
                  Collections <i className='bi bi-chevron-down'></i>
                </Link>
              </li>
              <li>
                <Link to='/faq'>Faqs</Link>
              </li>

              <li className='dropdown-container'>
                <DropDown
                  data={dataHeader}
                  activeIndex={activeIndex}
                  setActiveIndex={setActiveIndex}
                />
              </li>
              {isAuthenticated ? (
                <>
                  <li className='mobile-cuenta mobile-cuenta-primero'>
                    <Link
                      to={`/perfil/${user.id}`}
                      onClick={() => {
                        setClicked(false);
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
                        setClicked(false);
                      }}
                    >
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className='mobile-cuenta mobile-cuenta-primero'>
                    <Link
                      to='/login'
                      onClick={() => {
                        setClicked(false);
                      }}
                    >
                      Sing in
                    </Link>
                  </li>
                  <li className='mobile-cuenta'>
                    <Link
                      to='/contacto'
                      onClick={() => {
                        setClicked(false);
                      }}
                    >
                      contact
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
            <i className={showCart ? 'bi bi-x-lg' : 'bi bi-bag'}>
              ({cartItems.length})
            </i>
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
                      to='/contacto'
                      onClick={() => {
                        setClicked(false);
                      }}
                    >
                      contact
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to='/contacto'
                      onClick={() => {
                        setClicked(false);
                      }}
                    >
                      contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='/login'
                      onClick={() => {
                        setClicked(false);
                      }}
                    >
                      Sing in
                    </Link>
                  </li>
                </>
              )}
              <li>
                <button
                  onClick={toggleCart}
                  className='boton-carrito'
                >
                  <i className={showCart ? 'bi bi-x-lg' : 'bi bi-bag'}>
                    ({cartItems.length})
                  </i>
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

        {dropdown && (
          <ul
            className='dropdown-menu'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <li className='coleccion-img-container'>
              <Link
                to='/colecciones/primavera'
                onClick={() => {
                  setClicked(false);
                  setDropdown(false);
                  handleDropdownItemClick;
                }}
              >
                <picture>
                  <img src='/images/colecciones/collecion-1.jpg' />
                </picture>
                <p className='coleccion-nombre'>Archived 222</p>
              </Link>
            </li>
            <li className='coleccion-img-container'>
              <Link
                to='/colecciones/verano'
                onClick={() => {
                  setClicked(false);
                  setDropdown(false);
                }}
              >
                <picture>
                  <img src='/images/colecciones/collecion-2.jpg' />
                </picture>
                <p className='coleccion-nombre'>Casa de campo</p>
              </Link>
            </li>
            <li className='coleccion-img-container'>
              <Link
                to='/colecciones/otoño'
                onClick={() => {
                  setClicked(false);
                  setDropdown(false);
                }}
              >
                <picture>
                  <img src='/images/colecciones/collecion-3.jpg' />
                </picture>
                <p className='coleccion-nombre'>Nombre generico</p>
              </Link>
            </li>
            <li className='coleccion-img-container'>
              <Link
                to='/colecciones/invierno'
                onClick={() => {
                  setClicked(false);
                  setDropdown(false);
                }}
              >
                <picture>
                  <img src='/images/colecciones/collecion-1.jpg' />
                </picture>
                <p className='coleccion-nombre'>Experimental</p>
              </Link>
            </li>
          </ul>
        )}
      </header>
    </>
  );
}

export default Header;
