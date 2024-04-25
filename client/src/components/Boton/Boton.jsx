import './Boton.css';

export function Boton({ textBoton, type, onClick }) {
  return (
    <button
      type={type}
      className='boton'
      onClick={onClick}
    >
      {textBoton}
    </button>
  );
}
