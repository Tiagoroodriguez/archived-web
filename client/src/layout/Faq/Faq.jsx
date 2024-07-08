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
        <article className='faq-article'>
          <h3>
            <i className='bi bi-credit-card' /> Pagos
          </h3>
          <Acordeon
            data={arcodeonData}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </article>
        <article className='faq-article'>
          <h3>
            <i className='bi bi-credit-card' /> Pagos
          </h3>
          <Acordeon
            data={arcodeonData}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </article>
        <article className='faq-article'>
          <h3>
            <i className='bi bi-credit-card' /> Pagos
          </h3>
          <Acordeon
            data={arcodeonData}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </article>
        <article className='faq-article'>
          <h3>
            <i className='bi bi-credit-card' /> Pagos
          </h3>
          <Acordeon
            data={arcodeonData}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </article>
      </section>

      <Contacto />
    </main>
  );
}
