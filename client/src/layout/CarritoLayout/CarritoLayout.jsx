import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CarritoContext';
import { Boton } from '../../components/Boton/Boton';

import './CarritoLayout.css';

export default function CarritoLayout() {
  const { cartItems, addToCart, removeFromCart, getCartTotal } =
    useContext(CartContext);

  return (
    <main className='carritolayout-container'>
      <header className='superior'>
        <ul>
          <li className='point'>
            <button className='focus'>
              <div>
                <i className='bi bi-cart4'></i>
              </div>
              <p>Carrito</p>
            </button>
          </li>
          <li className='line'></li>
          <li className='point'>
            <button>
              <div>
                <i className='bi bi-info-lg'></i>
              </div>
              <p>Informacion</p>
            </button>
          </li>
          <li className='line'></li>
          <li className='point'>
            <button>
              <div>
                <i className='bi bi-box-seam'></i>
              </div>
              <p>Envio</p>
            </button>
          </li>
          <li className='line'></li>
          <li className='point'>
            <button>
              <div>
                <i className='bi bi-credit-card'></i>
              </div>
              <p>Pago</p>
            </button>
          </li>
        </ul>
        <h1 className='carrito-layout-title'>Detalle de compra</h1>
      </header>
      <table className='cart-table-container'>
        <thead>
          <tr className='cart-table-encabezado'>
            <th className='cart-table-encabezado-item cart-table-product'>
              Producto
            </th>
            <th className='cart-table-encabezado-item cart-table-actions'>
              Cantidad
            </th>
            <th className='cart-table-encabezado-item cart-table-precio'>
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr
              key={item.key}
              className='cart-table-cuerpo'
            >
              <td className='cart-table-cuerpo-item cart-table-product'>
                <div className='img-producto cart-table-product-item'>
                  <img
                    src={`/images/productos/small/${item.nombre}.webp`}
                    alt={`imagen del producto ${item.nombre}`}
                  />
                </div>
                <div className='table-info-producto cart-table-product-item'>
                  <p className='info-producto-nombre'>{item.nombre}</p>
                  <p className='info-producto-talle'>{`Talle: ${item.talle}`}</p>
                  <p className='info-producto-precio'>{`Precio: $${item.precio}`}</p>
                </div>
              </td>
              <td className='cart-table-cuerpo-item cart-table-actions'>
                <div className='botones-producto'>
                  <button
                    onClick={() => {
                      addToCart(item, item.talle);
                    }}
                  >
                    +
                  </button>
                  <p>{item.quantity}</p>
                  <button
                    onClick={() => {
                      removeFromCart(item, item.talle);
                    }}
                  >
                    -
                  </button>
                </div>
              </td>
              <td className='cart-table-cuerpo-item cart-table-precio'>
                <p>{`$${item.precio * item.quantity}`}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <footer className='table-footer'>
        <h2>Total: ${getCartTotal()}</h2>
        <p>Los gastos de envio se calculan al momento de la compra</p>
        <Link
          to='/checkout'
          className='table-boton-container'
        >
          <Boton
            type='sudmit'
            textBoton='checkout'
            desactivado={cartItems.length === 0 ? true : false}
          />
        </Link>
      </footer>
    </main>
  );
}
