import './Tabla.css';

export function Tabla({
  producto,
  sAncho,
  sLargo,
  mAncho,
  mLargo,
  lAncho,
  lLargo,
  xlAncho,
  xlLargo,
  onClose,
}) {
  return (
    <div className='modal'>
      <div className='modal-contenido'>
        <span className='titulo'>{producto}</span>
        <table className='tabla-container'>
          <thead>
            <tr className='tabla-fila'>
              <td>Talle</td>
              <td>Ancho</td>
              <td>Largo</td>
            </tr>
          </thead>
          <tbody>
            <tr className='tabla-fila'>
              <td>S</td>
              <td>{sAncho}</td>
              <td>{sLargo}</td>
            </tr>
            <tr className='tabla-fila'>
              <td>M</td>
              <td>{mAncho}</td>
              <td>{mLargo}</td>
            </tr>
            <tr className='tabla-fila'>
              <td>L</td>
              <td>{lAncho}</td>
              <td>{lLargo}</td>
            </tr>
            <tr className='tabla-fila'>
              <td>XL</td>
              <td>{xlAncho}</td>
              <td>{xlLargo}</td>
            </tr>
          </tbody>
        </table>
        <button
          className='table-button'
          onClick={onClose}
        >
          <i className='bi bi-x-lg' />
        </button>
      </div>
    </div>
  );
}
