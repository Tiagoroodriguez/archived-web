import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Boton } from '../../components/Boton/Boton';

import './Acordeon.css';

export default function Acordeon({ data }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className='acordeon-container'>
      {data.map((item, index) => (
        <div key={index}>
          <button
            className='acordeon-item'
            onClick={() => handleToggle(index)}
          >
            <div>
              {item.title}
              <i className='bi bi-check-lg' />
            </div>
          </button>
          {activeIndex === index && (
            <div className='acordeon-item-desc'>{item.content}</div>
          )}
        </div>
      ))}
      <div className='checkout-actions'>
        <Link to='/checkout/informacion'>
          <Boton
            textBoton='Volver'
            secundario={true}
          />
        </Link>
        {activeIndex === null ? (
          <Boton
            textBoton='Seleccione un metodo de pago'
            desactivado={true}
          />
        ) : (
          <Boton
            textBoton={
              activeIndex === 0 ? 'Pagar en Efectivo' : 'Pagar con Mercado Pago'
            }
          />
        )}
      </div>
    </div>
  );
}
