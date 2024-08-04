import { useState } from 'react';
import Acordeon from '../../components/Acordeon/Arcodeon';
import { Contacto } from '../Contacto/Contacto';
import './Faq.css';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Faq() {
  const [activeIndexEnvio, setActiveIndexEnvio] = useState(null);
  const [activeIndexProducto, setActiveIndexProducto] = useState(null);
  const [activeIndexPedidos, setActiveIndexPedidos] = useState(null);
  const [activeIndexCambios, setActiveIndexCambios] = useState(null);

  const arcodeonDataEnvio = [
    {
      title: '¿Cuánto tiempo tardará en llegar mi pedido?',
      content: (
        <div className='detalle-producto-acordeon'>
          <p>
            El tiempo estimado de entrega para envíos dentro de Argentina es de
            5 a 7 días hábiles. Este plazo puede variar ligeramente dependiendo
            de la ubicación y las condiciones logísticas.
          </p>
        </div>
      ),
    },
    {
      title: '¿Dónde está mi pedido?',
      content: (
        <div className='detalle-producto-acordeon'>
          <p>
            Puedes rastrear el estado de tu pedido iniciando sesión en tu cuenta
            en nuestra página web www.archived.com.ar. Utilizamos los servicios
            de logística de Andreani y Correo Argentino, lo que permite un
            seguimiento detallado y preciso de tu envío.
          </p>
        </div>
      ),
    },
    {
      title:
        '¿Puedo cambiar la dirección de envío después de realizar el pedido? ',
      content: (
        <div className='detalle-producto-acordeon'>
          <p>
            Si necesitas modificar la dirección de envío después de haber
            realizado tu pedido, te recomendamos que nos contactes lo antes
            posible a través de nuestro servicio de atención al cliente{' '}
            <strong>+54 9 3572 571717</strong>. Haremos todo lo posible para
            acomodar tu solicitud, siempre y cuando el pedido no haya sido
            despachado.
          </p>
        </div>
      ),
    },
  ];

  const arcodeonDataProducto = [
    {
      title: '¿Puedo devolver mi producto?',
      content: (
        <div className='detalle-producto-acordeon'>
          <p>
            Siempre nos esforzamos por asegurarnos de que nuestros clientes amen
            nuestros productos, pero si necesita devolver un pedido, estaremos
            encantados de ayudarle.
          </p>
          <p>
            Echa un vistazo a nuestra página de{' '}
            <Link to='/returns-exchanges'>
              Política de devoluciones y cambios
            </Link>{' '}
            y sigue la guía paso a paso.
          </p>
        </div>
      ),
    },
    {
      title: '¿Cómo puedo elegir la talla adecuada?',
      content: (
        <div className='detalle-producto-acordeon'>
          <p>Hay una tabla de tallas en cada página de producto.</p>
          <p>
            Si es su primer pedido, le recomendamos encarecidamente que mida sus
            prendas y se asegure de que el tamaño que obtenga sea lo más cercano
            posible a ese.
          </p>
          <p>De esta manera te aseguras de que el ajuste sea perfecto.</p>
        </div>
      ),
    },
    {
      title: '¿Qué debo hacer si recibo un producto defectuoso?',
      content: (
        <div className='detalle-producto-acordeon'>
          <p>
            Trabajamos muy duro para asegurarnos de que todos nuestros productos
            cumplan con los más altos estándares de calidad
          </p>
          <p>
            Pero no tienes porqué preocuparte. Si recibes un artículo
            defectuoso, ponte en contacto con nosotros en{' '}
            <strong>help@archived.com</strong> y explícanos tu situación.
            Asegúrate de subir fotos de los defectos y de escribir el número de
            pedido.
          </p>
        </div>
      ),
    },
  ];

  const arcodeonDataPedidos = [
    {
      title: '¿Qué métodos de pago aceptan?',
      content: (
        <div className='detalle-producto-acordeon'>
          <p>
            Aceptamos Visa, Mastercard, Transferencia y algunos otros sistemas
            de pago locales.
          </p>
        </div>
      ),
    },
    {
      title: '¿Puedo cancelar un pedido?',
      content: (
        <div className='detalle-producto-acordeon'>
          <p>
            Cuando realizas un pedido, nuestro almacén recibe una notificación y
            comienza el proceso de selección.
          </p>
          <p>
            Lamentablemente no podemos aceptar cancelaciones debido al gran
            volumen que tenemos.
          </p>
          <p>
            Si ha comprado por accidente, vaya a nuestra página de{' '}
            <Link to='/returns-exchanges'>Devoluciones y Cambios</Link> y siga
            los pasos.
          </p>
        </div>
      ),
    },
    {
      title:
        '¿Por qué no recibí mi correo electrónico de confirmación de pedido?',
      content: (
        <div className='detalle-producto-acordeon'>
          <p>
            Cuando realizas un pedido, nuestro sistema siempre envía un correo
            electrónico de confirmación.
          </p>
          <p>Asegúrate de revisar tu bandeja de entrada de spam/promociones.</p>
        </div>
      ),
    },
  ];

  const arcodeonDataCambios = [
    {
      title: '¿Cuál es nuestra política de devolución?',
      content: (
        <div className='detalle-producto-acordeon'>
          <p>
            Los artículos adquiridos en <strong>Archived®</strong> deben
            devolverse en perfecto estado y sin usar, libres de deterioro,
            manchas, olores o cualquier condición que impida su venta como
            nuevos. Los artículos también deben devolverse en su embalaje
            original incluyendo todas las etiquetas y posibles elementos
            incluidos como parte del embalaje, dentro de los 15 días posteriores
            a la recepción del envío, para poder recibir un reembolso
          </p>
          <p>
            Tenes que comunicarte con el servicio de soporte{' '}
            <strong>+54 9 3572-571717</strong> para cordinar la devolcion/cambio
            a traves de la logistica
          </p>
        </div>
      ),
    },
  ];

  return (
    <main className='faq-container'>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Faq's | Archived</title>
        <meta
          name='description'
          content='Pagina de preguntas frecuentes'
        />
        <link
          rel='canonical'
          href='http://archived.com.ar/faq'
        />
      </Helmet>
      <h1>FAQ's</h1>
      <section className='faq-section'>
        <article className='faq-article'>
          <h3>
            <i className='bi bi-truck' /> ENVÍO
          </h3>
          <Acordeon
            data={arcodeonDataEnvio}
            activeIndex={activeIndexEnvio}
            setActiveIndex={setActiveIndexEnvio}
          />
        </article>
        <article className='faq-article'>
          <h3>
            <i className='bi bi-gem' /> PRODUCTO
          </h3>
          <Acordeon
            data={arcodeonDataProducto}
            activeIndex={activeIndexProducto}
            setActiveIndex={setActiveIndexProducto}
          />
        </article>
        <article className='faq-article'>
          <h3>
            <i className='bi bi-box' /> PEDIDOS
          </h3>
          <Acordeon
            data={arcodeonDataPedidos}
            activeIndex={activeIndexPedidos}
            setActiveIndex={setActiveIndexPedidos}
          />
        </article>
        <article className='faq-article'>
          <h3>
            <i className='bi bi-repeat' /> DEVOLUCIONES Y CAMBIOS
          </h3>
          <Acordeon
            data={arcodeonDataCambios}
            activeIndex={activeIndexCambios}
            setActiveIndex={setActiveIndexCambios}
          />
        </article>
      </section>

      <Contacto />
    </main>
  );
}
