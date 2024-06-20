import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CarritoContext';
import { Boton } from '../../components/Boton/Boton';
import RutaCompra from '../../components/RutaCompra/RutaCompra';

import './CarritoCompra.css';

export default function CarritoCompra() {
  const { cartItems, addToCart, removeFromCart, getCartTotal } =
    useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/tienda');
    }
  }, [cartItems, navigate]);

  return (
    <main className='carritolayout-container'>
      <RutaCompra
        carrito={true}
        detalleCompra={false}
      />
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
          to='/checkout/entrega'
          className='table-boton-container'
        >
          <Boton
            type='sudmit'
            textBoton='Checkout'
            desactivado={cartItems.length === 0 ? true : false}
            onClick={() => null}
          />
        </Link>
      </footer>
    </main>
  );
}
