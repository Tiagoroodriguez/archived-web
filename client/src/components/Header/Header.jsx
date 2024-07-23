import { useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { LogoTexto } from '../LogoTexto/LogoTexto';
import { useAuth } from '../../context/AuthContext';
import './Header.css';
import Carrito from '../Carrito/Carrito';
import { CartContext } from '../../context/CarritoContext';
import DropDown from '../DropDown/DropDown';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

function Header({ anuncio }) {
  const { isAuthenticated, user } = useAuth();

  const [clicked, setClicked] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [hidden, setHidden] = useState(false);
  const [hiddenSearch, setHiddenSearch] = useState(true);
  const timerRef = useRef(null); // Referencia para el temporizador

  const { cartItems, showCart, setShowCart } = useContext(CartContext);

  const { scrollY } = useScroll();

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleSearch = () => {
    setHiddenSearch(!hiddenSearch);
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

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const dataHeader = [
    {
      title: 'Colecciones',
      content: (
        <ul>
          <li>
            <Link to='/'>Casa de campo</Link>
            <Link to='/'>??? ???</Link>
            <Link to='/'>??? ???</Link>
            <Link to='/'>??? ???</Link>
          </li>
        </ul>
      ),
    },
  ];

  return (
    <>
      <header className='header-container'>
        <motion.nav
          variants={{
            visible: { y: 0 },
            hidden: { y: '-100%' },
          }}
          animate={hidden ? 'hidden' : 'visible'}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className='nav'
        >
          <div className='nav-container'>
            <div className='nav-link'>
              <ul
                className={clicked ? 'nav-bar active links' : 'nav-bar links'}
              >
                <li>
                  <Link
                    to='/tienda?categoria=all'
                    onClick={() => {
                      setClicked(false);
                      setShowCart(false);
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
                  <Link
                    to='/faq'
                    onClick={() => {
                      setClicked(false);
                      setShowCart(false);
                    }}
                  >
                    Faq's
                  </Link>
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
                        to={
                          user.rol === 'admin'
                            ? `/administration`
                            : `/perfil/${user.id}`
                        }
                        onClick={() => {
                          setClicked(false);
                          setShowCart(false);
                        }}
                      >
                        Hola {user ? user.nombre : ''}
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
                          setShowCart(false);
                        }}
                      >
                        Log in
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
            <button
              className='search-mobile'
              onClick={() => {
                handleSearch();
                setClicked(false);
                setShowCart(false);
              }}
            >
              <i className='bi bi-search' />
            </button>

            <div className='nav-cuenta'>
              <ul className='nav-bar cuenta'>
                {isAuthenticated ? (
                  <>
                    <li>
                      <Link
                        to='/contacto'
                        onClick={() => {
                          setClicked(false);
                          setShowCart(false);
                        }}
                      >
                        <i className='bi bi-search' />
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={
                          user.rol === 'admin'
                            ? `/administration`
                            : `/perfil/${user.id}`
                        }
                        onClick={() => {
                          setClicked(false);
                          setShowCart(false);
                        }}
                      >
                        Hola {user ? user.nombre : ''}
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className='menu-icon'>
                      <Link
                        onClick={() => {
                          handleSearch();
                          setClicked(false);
                          setShowCart(false);
                        }}
                      >
                        <i className='bi bi-search' />
                      </Link>
                    </li>
                    <li className='menu-icon-persona'>
                      <Link
                        to='/login'
                        onClick={() => {
                          setClicked(false);
                          setShowCart(false);
                        }}
                      >
                        <i className='bi bi-person' />
                      </Link>
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
          </div>
          <div
            className={`announcement-container ${
              anuncio ? 'display-anuncio' : 'ocultar-anuncio'
            }`}
          >
            <div className='announcement-messages'>
              <p>3 CUOTAS SIN INTERES</p>
              <p>ENVIO GRATIS SUPERANDO LOS $120.000</p>
              <p>10% OFF PAGANDO CON TRANSFERENCIA</p>
              <p>3 CUOTAS SIN INTERES</p>
            </div>
          </div>
          <motion.div
            variants={{ visibleSearch: { y: 0 }, hiddenSearch: { y: '-150%' } }}
            animate={hiddenSearch ? 'hiddenSearch' : 'visibleSearch'}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className='header-search-container'
          >
            <input
              type='text'
              placeholder='Buscar...'
            ></input>
            <i className='bi bi-search' />
          </motion.div>
        </motion.nav>

        <div className={`header-cart-container ${showCart ? 'show' : ''}`}>
          <Carrito />
        </div>

        {dropdown && (
          <ul
            className='dropdown-menu'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <li className='coleccion-img-container'>
              <Link
                to='/'
                onClick={() => {
                  setClicked(false);
                  setDropdown(false);
                  handleDropdownItemClick;
                }}
              >
                <picture>
                  <img src='/images/colecciones/collecion-1.jpg' />
                </picture>
                <p className='coleccion-nombre'>Casa de campo</p>
              </Link>
            </li>
            <li className='coleccion-img-container'>
              <Link
                to='/'
                onClick={() => {
                  setClicked(false);
                  setDropdown(false);
                }}
              >
                <picture className='coleccion-bloqueada'>
                  <img
                    src='/images/colecciones/collecion-2.jpg'
                    alt='Colección'
                  />
                  <div className='coleccion-overlay'>
                    <span>???</span>
                  </div>
                </picture>
                <p className='coleccion-nombre'>!$&%$#%/</p>
              </Link>
            </li>
            <li className='coleccion-img-container'>
              <Link
                to='/'
                onClick={() => {
                  setClicked(false);
                  setDropdown(false);
                }}
              >
                <picture className='coleccion-bloqueada'>
                  <img src='/images/colecciones/collecion-3.jpg' />
                  <div className='coleccion-overlay'>
                    <span>???</span>
                  </div>
                </picture>
                <p className='coleccion-nombre'>%$#%!!*$¡?</p>
              </Link>
            </li>
            <li className='coleccion-img-container'>
              <Link
                to='/'
                onClick={() => {
                  setClicked(false);
                  setDropdown(false);
                }}
              >
                <picture className='coleccion-bloqueada'>
                  <img src='/images/colecciones/collecion-1.jpg' />
                  <div className='coleccion-overlay'>
                    <span>???</span>
                  </div>
                </picture>
                <p className='coleccion-nombre'>*%!#$%$#</p>
              </Link>
            </li>
          </ul>
        )}
      </header>
    </>
  );
}

export default Header;
