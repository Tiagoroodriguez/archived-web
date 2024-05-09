import './RutaCompra.css';

export default function RutaCompra({ carrito, informacion, envio, pago }) {
  const estilosCarrito = carrito ? 'focus' : '';
  const estilosInformacion = informacion ? 'focus' : '';
  const estilosEnvio = envio ? 'focus' : '';
  const estilosPago = pago ? 'focus' : '';

  const iconoCarrito = informacion ? 'bi bi-check-lg' : 'bi bi-cart4';
  const iconoInformacion = envio ? 'bi bi-check-lg' : 'bi bi-info-lg';
  const iconoEnvio = pago ? 'bi bi-check-lg' : 'bi bi-box-seam';

  return (
    <div className='superior'>
      <ul>
        <li className='point'>
          <button className={estilosCarrito}>
            <div>
              <i className={iconoCarrito}></i>
            </div>
            <p>Carrito</p>
          </button>
        </li>
        <li className='line'></li>
        <li className='point'>
          <button className={estilosInformacion}>
            <div>
              <i className={iconoInformacion}></i>
            </div>
            <p>Informacion</p>
          </button>
        </li>
        <li className='line'></li>
        <li className='point'>
          <button className={estilosEnvio}>
            <div>
              <i className={iconoEnvio}></i>
            </div>
            <p>Envio</p>
          </button>
        </li>
        <li className='line'></li>
        <li className='point'>
          <button className={estilosPago}>
            <div>
              <i className='bi bi-credit-card'></i>
            </div>
            <p>Pago</p>
          </button>
        </li>
      </ul>
    </div>
  );
}
