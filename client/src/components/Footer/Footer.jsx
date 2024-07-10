import { useEffect, useState } from 'react';
import Input from '../Input/Input';
import { LogoTexto } from '../LogoTexto/LogoTexto';
import './Footer.css';

export function Footer() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleButtonClick = (index) => {
    setCurrentIndex(index);
  };

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
                Mira las condiciones <a>aqui</a>
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
                Click <a>aqui</a> para más información
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
              <p>help@archived.com</p>
            </div>

            <div className='footer-redes'>
              <a
                href='/'
                className='desktop-footer-icon'
              >
                <i
                  className='bi bi-facebook'
                  alt='Facebook icono'
                ></i>
              </a>
              <a
                href='/'
                className='desktop-footer-icon'
              >
                <i
                  className='bi bi-twitter-x'
                  alt='X icono'
                ></i>
              </a>
              <a
                href='/'
                className='desktop-footer-icon'
              >
                <i
                  className='bi bi-tiktok'
                  alt='TikTok icono'
                ></i>
              </a>
              <a
                href='/'
                className='desktop-footer-icon'
              >
                <i
                  className='bi bi-instagram'
                  alt='Instagram icono'
                ></i>
              </a>
            </div>
          </div>

          <div className='suscribirse'>
            <h3>Unite a la familia</h3>
            <p>Obtene un 10% de descuento en tu primera compra</p>
            <div>
              <Input
                type='mail'
                label='Correo electronico'
              />
            </div>
          </div>
        </div>
        <div className='final'>ARCHIVED 222</div>
      </footer>
    </>
  );
}
