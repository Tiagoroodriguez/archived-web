import './Boton.css';

export function Boton({ textBoton, type }) {
  return (
    <button
      type={type}
      className='boton'
    >
      {textBoton}
    </button>
  );
}
