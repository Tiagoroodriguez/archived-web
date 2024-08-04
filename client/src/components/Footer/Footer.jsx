import { useEffect, useState } from 'react';
import { LogoTexto } from '../LogoTexto/LogoTexto';
import './Footer.css';
import { Link } from 'react-router-dom';
import Acordeon from '../Acordeon/Arcodeon';
import Input from '../Input/Input';

export function Footer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleButtonClick = (index) => {
    setCurrentIndex(index);
  };

  const arcodeonData = [
    {
      title: 'BRAND',
      content: (
        <div className='footer-acordeon'>
          <Link to='/tienda'>Store</Link>
          <Link to='/'>About us</Link>
        </div>
      ),
      icon: '',
    },
    {
      title: 'BORING STUFF',
      content: (
        <div className='footer-acordeon'>
          <Link to='/privacy-policy'>Politicas de privacidad</Link>
          <Link to='/terms-of-service'>Terminos y condiciones</Link>
        </div>
      ),
      icon: '',
    },
    {
      title: 'SUPPORT',
      content: (
        <div className='footer-acordeon'>
          <Link to='/faq'>Faq's</Link>
          <Link to='/contacto'>Contacto</Link>
        </div>
      ),
      icon: '',
    },
  ];

  useEffect(() => {
    const isMobile = window.innerWidth <= 768; // Cambia este valor según tus necesidades de detección de dispositivos móviles

    if (isMobile) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
      }, 7000);

      return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
    }
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar el componente

  return (
    <>
      <footer>
        <div className='footer-info-conatiner'>
          <div className='informacion-general'>
            <article
              className={`informacion-item ${
                currentIndex === 0 ? 'visible' : 'hidden'
              }`}
            >
              <i className='bi bi-arrow-clockwise' />
              <h3>CAMBIOS Y DEVOLUCIONES</h3>
              <p>
                Mira las condiciones <Link to='/returns-exchanges'>aqui</Link>
              </p>
            </article>
            <article
              className={`informacion-item ${
                currentIndex === 1 ? 'visible' : 'hidden'
              }`}
            >
              <i className='bi bi-truck' />
              <h3>ENVIOS SEGUROS A TODA ARGENTINA</h3>
              <p>
                Click <Link to='/shipping-policy'>aquí</Link> para más
                información
              </p>
            </article>
            <article
              className={`informacion-item ${
                currentIndex === 2 ? 'visible' : 'hidden'
              }`}
            >
              <i className='bi bi-shield-lock' />
              <h3>PAGOS SEGUROS</h3>
              <p>MercadoPago, Visa, Mastercard y más</p>
            </article>
          </div>
          <div className='navigation-buttons'>
            <button onClick={() => handleButtonClick(0)}>
              <i
                className={
                  currentIndex === 0 ? 'bi bi-circle-fill' : 'bi bi-circle'
                }
              />
            </button>
            <button onClick={() => handleButtonClick(1)}>
              <i
                className={
                  currentIndex === 1 ? 'bi bi-circle-fill' : 'bi bi-circle'
                }
              />
            </button>
            <button onClick={() => handleButtonClick(2)}>
              <i
                className={
                  currentIndex === 2 ? 'bi bi-circle-fill' : 'bi bi-circle'
                }
              />
            </button>
          </div>
        </div>
        <div className='desktop-footer'>
          <div className='desktop-footer-redes'>
            <div className='desktop-footer-logo'>
              <LogoTexto />
            </div>
            <div className='desktop-footer-redes-icon'>
              <i className='bi bi-instagram' />
              <i className='bi bi-twitter' />
              <i className='bi bi-tiktok' />
              <i className='bi bi-youtube' />
            </div>
          </div>
          <div className='footer-menu'>
            <span>BRAND</span>
            <Link to='/tienda'>Store</Link>
            <Link to='/'>About us</Link>
          </div>
          <div className='footer-menu'>
            <span>BORING STUFF</span>
            <Link to='/privacy-policy'>Politicas de privacidad</Link>
            <Link to='/terms-of-service'>Terminos y condiciones</Link>
          </div>

          <div className='footer-menu'>
            <span>SUPPORT</span>
            <Link to='/faq'>Faq's</Link>
            <Link to='/contacto'>Contacto</Link>
          </div>
          <div className='mobile-footer-menu'>
            <Acordeon
              data={arcodeonData}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          </div>
          <div className='footer-mail'>
            <h3>Unite a la familia</h3>
            <p>Obten un 10% de descuento en tu primera compra</p>
            <form>
              <input placeholder='Correo electronico' />
              <button>Enviar</button>
            </form>
          </div>
        </div>
        <div className='final'>ARCHIVED 222</div>
      </footer>
    </>
  );
}
