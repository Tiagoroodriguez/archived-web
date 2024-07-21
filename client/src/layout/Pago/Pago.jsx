import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CarritoContext';
import { MercadoPagoContext } from '../../context/MercadoPago';
import { LogoTexto } from '../../components/LogoTexto/LogoTexto';
import { Boton } from '../../components/Boton/Boton';
import RutaCompra from '../../components/RutaCompra/RutaCompra';

import './Pago.css';
import { CheckboxGroup } from '../../components/CheckboxGroup/CheckboxGroup';
import { usePedido } from '../../context/PedidosContext';
import CartSection from '../../components/CartSection/CartSection';
import { useEffect } from 'react';

export default function Pago() {
  const { createOrder } = useContext(MercadoPagoContext);
  const { getCartItems, cartItems } = useContext(CartContext);
  const { envioInfo, selectedMetodoEnvio } = usePedido();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [loading, setLoading] = useState(false);

  const paymentOptions = ['Mercado Pago', 'Efectivo'];
  const navigate = useNavigate();

  const handleMercadoPago = () => {
    createOrder(getCartItems());
    setLoading(true);
  };
  const handlePago = () => {
    const prodts = getCartItems();
  };

  useEffect(() => {
    const loadEnvioInfo = async () => {
      if (cartItems.length === 0) {
        navigate('/tienda');
      }
      if (!envioInfo) {
        navigate('/checkout/entrega');
      }
    };
    loadEnvioInfo();
  }, []);

  return (
    <>
      <main className='pago'>
        <section className='pago-section'>
          <LogoTexto />
          <RutaCompra
            pago
            detalleCompra
          />
          <table className='pago-table-container'>
            <tbody className='pago-table-body'>
              <tr className='pago-tabla-fila'>
                <td className='pago-tabla-item'>
                  <div>
                    <p className='pago-tabla-titulo'>Contacto</p>
                    <p className='pago-tabla-contenido'>
                      {envioInfo ? envioInfo.email_facturacion : 'vacio'}
                    </p>
                  </div>
                  <Link to='/checkout/entrega'>Cambiar</Link>
                </td>
              </tr>
              <tr className='pago-tabla-fila'>
                <td className='pago-tabla-item'>
                  <div>
                    <p className='pago-tabla-titulo'>Metodo de entrega:</p>
                    <p className='pago-tabla-contenido'>
                      {selectedMetodoEnvio}
                    </p>
                  </div>
                  <Link to='/checkout/entrega'>Cambiar</Link>
                </td>
              </tr>
              <tr className='pago-tabla-fila'>
                <td className='pago-tabla-item'>
                  <div>
                    {selectedMetodoEnvio === 'Andreani - $2000' ? (
                      <>
                        <p className='pago-tabla-titulo'>Enviar a:</p>
                        <p className='pago-tabla-contenido'>
                          {envioInfo.direccion_envio} -
                          {envioInfo.numero_direccion_envio}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className='pago-tabla-titulo'>Retirar en:</p>
                        <p className='pago-tabla-contenido'>
                          25 de febrero 1481 - Oncativo
                        </p>
                      </>
                    )}
                  </div>
                  <Link to='/checkout/entrega'>Cambiar</Link>
                </td>
              </tr>
            </tbody>
          </table>

          <div className='form-pago'>
            <div className='informacion-pago'>
              <h1>Forma de pago</h1>

              <CheckboxGroup
                options={paymentOptions}
                onSelectionChange={setSelectedPaymentMethod}
                selectedOption={selectedPaymentMethod}
              />
            </div>
            <div className='checkout-actions'>
              <Link to='/checkout/entrega'>
                <Boton
                  textBoton='Volver'
                  secundario
                  value={'volver'}
                  onClick={() => null}
                />
              </Link>
              {!selectedPaymentMethod ? (
                <Boton
                  textBoton='Seleccione un metodo de pago'
                  desactivado
                />
              ) : (
                <Boton
                  textBoton={
                    selectedPaymentMethod === 'Efectivo'
                      ? 'Pagar en Efectivo'
                      : 'Pagar con Mercado Pago'
                  }
                  onClick={
                    selectedPaymentMethod === 'Efectivo'
                      ? handlePago
                      : handleMercadoPago
                  }
                  load={loading}
                  desactivado={loading}
                />
              )}
            </div>
          </div>
        </section>
        <CartSection />
      </main>
    </>
  );
}
