import './RutaCompra.css';

export default function RutaCompra({ carrito, informacion, pago }) {
  const estilosCarrito = carrito ? 'focus' : '';
  const estilosInformacion = informacion ? 'focus' : '';
  const estilosPago = pago ? 'focus' : '';

  const iconoCarrito = informacion || pago ? 'bi bi-check-lg' : 'bi bi-cart4';
  const iconoInformacion = pago ? 'bi bi-check-lg' : 'bi bi-truck';

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
            <p>Entrega</p>
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
