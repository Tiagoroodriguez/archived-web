import './Boton.css';

export function Boton({
  textBoton,
  type,
  onClick,
  secundario,
  desactivado,
  selected,
  value,
}) {
  const secundarioEstilos = secundario ? 'boton secundario' : 'boton primario';
  const estilo = desactivado ? 'boton desactivado' : secundarioEstilos;
  const className =
    secundario && selected === value ? `${estilo} boton-activo` : estilo; // Add boton-activo class

  return (
    <button
      type={type}
      className={className}
      disabled={desactivado}
      onClick={() => (desactivado ? null : onClick())}
      value={value}
    >
      {textBoton}
    </button>
  );
}
