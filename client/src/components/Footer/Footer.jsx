import Input from '../Input/Input';
import { LogoTexto } from '../LogoTexto/LogoTexto';

import './Footer.css';

export function Footer() {
  return (
    <>
      <section className='informacion-general'>
        <article className='informacion-item'>
          <i className='bi bi-arrow-clockwise' />
          <h3>CAMBIOS Y DEVOLUCIONES</h3>
        </article>
        <article className='informacion-item'>
          <i className='bi bi-truck' />
          <h3>ENVIOS SEGUROS A TODA ARGENTINA</h3>
        </article>
        <article className='informacion-item'>
          <i className='bi bi-shield-lock' />
          <h3>PAGOS SEGUROS</h3>
        </article>
      </section>
      <footer>
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
            <Input
              type='mail'
              label='Correo electronico'
            />
          </div>
        </div>
        <div className='final'>ARCHIVED 222</div>
      </footer>
    </>
  );
}
