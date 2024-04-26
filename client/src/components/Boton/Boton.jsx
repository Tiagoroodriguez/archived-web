import './Boton.css';

export function Boton({ textBoton, type, onClick, secundario }) {
  const estilos = secundario ? 'boton secundario' : 'boton primario';
  return (
    <button
      type={type}
      className={estilos}
      onClick={onClick}
    >
      {textBoton}
    </button>
  );
}
