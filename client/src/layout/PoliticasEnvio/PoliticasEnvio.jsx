import { Helmet } from 'react-helmet';

export default function PoliticasEnvio() {
  return (
    <main className='devoluciones-container'>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Politicas de envio | Archived</title>
        <meta
          name='description'
          content='Pagina de politicas de envio'
        />
        <link
          rel='canonical'
          href='http://archived.com.ar/shipping-policy'
        />
      </Helmet>
      <h1>Politicas de envio</h1>
      <p>
        Nada más realizar la compra recibirás un email de confirmación y nuestro
        equipo se pondrá manos a la obra para que recibas tu pedido lo antes
        posible. Si pasados (7) dias laborales no recibió su pedido, por favor
        contáctanos indicando tu número de pedido y revisaremos tu historial de
        pedidos para encontrar una solución lo antes posible.
      </p>
      <p>
        Recibirás un correo electrónico con el seguimiento de tu pedido para que
        puedas estar al tanto del estado de tu envío en cualquier momento.
      </p>
      <p>
        Archived® no será responsable de los errores de entrega producidos
        cuando la dirección de entrega introducida por el Usuario en el
        formulario de pedido no se corresponda con la realidad o cuando se haya
        omitido algún dato.
      </p>
    </main>
  );
}
