import { Link } from 'react-router-dom';

//const { pedido } = usePedido();

export default function MetodoEnvio() {
  return (
    <div>
      <h1>Metodo de envio</h1>
      <Link to='/checkout/pago'>
        <button>continua</button>
      </Link>
    </div>
  );
}
