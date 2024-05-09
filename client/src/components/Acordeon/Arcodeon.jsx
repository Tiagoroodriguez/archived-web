import { useState } from 'react';

import './Acordeon.css';

export default function Acordeon({ titulo, descripcion }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSection = (event) => {
    event.preventDefault(); // Prevent default button behavior
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        className='acordeon-button'
        onClick={toggleSection}
      >
        {titulo}
      </button>
      <div
        className={`acordeon-container acordeon-hide ${
          isOpen ? 'acordeon-show' : ''
        }`}
      >
        {descripcion}
      </div>
    </div>
  );
}
