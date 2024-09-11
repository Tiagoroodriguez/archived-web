import { Helmet } from 'react-helmet';
import './CambiosDevoluciones.css';

export default function CambiosDevoluciones() {
  return (
    <main className='devoluciones-container'>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Políticas de devolución | Archived</title>
        <meta
          name='description'
          content='Pagina de Politicas de devolucion'
        />
        <link
          rel='canonical'
          href='http://archived.com.ar/returns-exchanges'
        />
      </Helmet>
      <h1>Políticas de devolución</h1>
      <p>
        Si no estas conforme con nuestro producto, podes solicitar un reitegro o
        cambio del mismo de la siguiente forma:
      </p>
      <p>
        Tenes que comunicarte a nuestro <strong>WHATSAPP</strong> para cordinar
        el cambio a traves de la logistica.
      </p>
      <p>
        Las devoluciones/cambios solo pueden ser realizadas durante los 15 dias
        siguietes a la compra.
      </p>
    </main>
  );
}
