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
import { Helmet } from 'react-helmet';

export default function Pago() {
  const { createOrder } = useContext(MercadoPagoContext);
  const { getCartItems, cartItems, coupon } = useContext(CartContext);
  const { envioInfo, setEnvioInfo, selectedMetodoEnvio, costoEnvio } =
    usePedido();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [loading, setLoading] = useState(false);

  const paymentOptions = ['Mercado pago'];
  const navigate = useNavigate();

  const handleMercadoPago = () => {
    if (coupon.code !== undefined) {
      createOrder(getCartItems(coupon));
      setEnvioInfo({
        ...envioInfo,
        coupon: coupon._id,
      });
      setLoading(true);
    } else {
      createOrder(getCartItems());
      setLoading(true);
    }
  };

  const handlePago = () => {
    const products = getCartItems();
    console.log(products);
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
      <Helmet>
        <meta charSet='utf-8' />
        <title>Checkout - Pago | Archived</title>
        <meta
          name='description'
          content='Seccion de pago por compra de archived'
        />
        <link
          rel='canonical'
          href='http://archived.com.ar/checkout/pago'
        />
      </Helmet>
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
                    {selectedMetodoEnvio === 'Envio' ? (
                      <p className='pago-tabla-contenido'>ShipNow</p>
                    ) : (
                      <p className='pago-tabla-contenido'>Reitro en local</p>
                    )}
                  </div>
                  <Link to='/checkout/entrega'>Cambiar</Link>
                </td>
              </tr>
              <tr className='pago-tabla-fila'>
                <td className='pago-tabla-item'>
                  <div>
                    {selectedMetodoEnvio === 'Envio' ? (
                      <>
                        <p className='pago-tabla-titulo'>Enviar a:</p>
                        <p className='pago-tabla-contenido'>
                          {envioInfo.direccion_envio}
                          {envioInfo.numero_direccion_envio},{' '}
                          {envioInfo.ciudad_envio} (
                          {envioInfo.codigo_postal_envio}),{' '}
                          {envioInfo.provincia_envio}
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
              <p className='opacity-[60%] text-xs'>Próximamente más métodos</p>
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
                    selectedPaymentMethod === 'Transferencia Bancaria'
                      ? 'Pagar por transferencia'
                      : 'Pagar con mercado pago'
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
