import './Boton.css';

export function Boton({ textBoton, type, onClick, secundario, desactivado }) {
  const secundarioEstilos = secundario ? 'boton secundario' : 'boton primario';
  const estilo = desactivado ? 'boton desactivado' : secundarioEstilos;

  return (
    <button
      type={type}
      className={estilo}
      disabled={desactivado}
      onClick={() => (desactivado ? null : onClick())}
    >
      {textBoton}
    </button>
  );
}
