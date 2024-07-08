import { useState } from 'react';
import Acordeon from '../../components/Acordeon/Arcodeon';
import { Contacto } from '../Contacto/Contacto';
import './Faq.css';

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const arcodeonData = [
    {
      title: 'Pregunta 1',
      content: (
        <div className='detalle-producto-acordeon'>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
            maiores!
          </p>
        </div>
      ),
    },
    {
      title: 'Pregunta 2',
      content: (
        <div className='detalle-producto-acordeon'>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
            maiores!
          </p>
        </div>
      ),
    },
    {
      title: 'Pregunta 3',
      content: (
        <div className='detalle-producto-acordeon'>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
            maiores!
          </p>
        </div>
      ),
    },
  ];
  return (
    <main className='faq-container'>
      <h1>FAQ's</h1>
      <section className='faq-section'>
        <h3>
          <i className='bi bi-truck' /> Envios
        </h3>
        <Acordeon
          data={arcodeonData}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      </section>
      <section className='faq-section'>
        <h3>
          <i className='bi bi-star' /> Productos
        </h3>
        <Acordeon
          data={arcodeonData}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      </section>
      <section className='faq-section'>
        <h3>
          <i className='bi bi-box-seam' /> Pedidos
        </h3>
        <Acordeon
          data={arcodeonData}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      </section>
      <section className='faq-section'>
        <h3>
          <i className='bi bi-arrow-clockwise' />
          Cambios y devoluciones
        </h3>
        <Acordeon
          data={arcodeonData}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      </section>
      <Contacto />
    </main>
  );
}
