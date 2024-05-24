import './Boton.css';

export function Boton({
  textBoton,
  type,
  onClick,
  secundario,
  terceario,
  desactivado,
  selected,
  value,
}) {
  const estilo = secundario
    ? 'boton secundario'
    : terceario
    ? 'boton terceario'
    : desactivado
    ? 'boton desactivado'
    : 'boton primario';
  const className =
    secundario && selected === value
      ? `${estilo} boton-secundario-activo`
      : terceario && selected === value
      ? `${estilo} boton-terceario-activo`
      : estilo; // Add boton-activo class

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
