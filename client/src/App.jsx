import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Layout from './components/ScrollToTop/Layout';
import styled from 'styled-components';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CarritoContext';

import { Inicio } from './layout/Inicio/Inicio';
import { IniciarSesion } from './layout/Cuenta/IniciarSesion';
import { CrearCuenta } from './layout/Cuenta/CrearCuenta';
import { Tienda } from './layout/Tienda/Tienda';
import { DetalleProducto } from './layout/Detalle Producto/DetalleProducto';
import { GuiaTalles } from './layout/Guia Talles/GuiaTalles';
import { Contacto } from './layout/Contacto/Contacto';
import ProductosForm from './layout/ProductosForm/ProductosForm';

import ProteccionRutas from './ProteccionRutas';
import { ProductProvider } from './context/ProductContext';
import Header from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import InformacionEnvio from './layout/InformacionEnvio/InformacionEnvio';
import CarritoCompra from './layout/CarritoCompra/CarritoCompra';
import Pago from './layout/Pago/Pago';
import { MercadoPagoProvider } from './context/MercadoPago';
import PagoSuccess from './layout/PagoSuccess/PagoSuccess';
import { FilterProvider } from './context/FilterContext';
import { PedidoProvider } from './context/PedidosContext';
import Perfil from './layout/Perfil/Perfil';
import PedidoForm from './layout/PedidoForm/PedidoForm';
import Faq from './layout/Faq/Faq';
import PoliticasPrivacidad from './layout/Politicas/PoliticasPrivacidad';
import Terminos from './layout/Politicas/Terminos';
import CambiosDevoluciones from './layout/CambiosDevoluciones/CambiosDevoluciones';
import PoliticasEnvio from './layout/PoliticasEnvio/PoliticasEnvio';
import { NotFound } from './layout/Not Found/NotFound';
import Administracion from './layout/Administracion/Administracion';
import AdminPedidos from './layout/Administracion/AdminPedidos';
import Sidebar from './components/Sidebar/Sidebar';
import AdminProductos from './layout/Administracion/AdminProductos';

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: -2;
  height: 100%;
  min-height: 100vh;
  width: 100%;
  background-color: var(--bg-color);
  background-size: cover;
`;

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <MercadoPagoProvider>
            <FilterProvider>
              <PedidoProvider>
                <Background />
                <BrowserRouter>
                  <Routes>
                    <Route
                      path='/'
                      element={
                        <Layout>
                          <Header anuncioOn />
                          <Inicio />
                          <Footer />
                        </Layout>
                      }
                    />
                    <Route
                      path='*'
                      element={
                        <>
                          <Header />
                          <NotFound />
                          <Footer />
                        </>
                      }
                    />
                    <Route
                      path='/login'
                      element={
                        <Layout>
                          <IniciarSesion />
                        </Layout>
                      }
                    />
                    <Route
                      path='/register'
                      element={
                        <Layout>
                          <CrearCuenta />
                        </Layout>
                      }
                    />

                    <Route
                      path='/tienda'
                      element={
                        <Layout>
                          <Header />
                          <Tienda />
                          <Footer />
                        </Layout>
                      }
                    />
                    <Route
                      path='/detalle-producto/:id'
                      element={
                        <Layout>
                          <Header />
                          <DetalleProducto />
                          <Footer />
                        </Layout>
                      }
                    />

                    <Route
                      path='/guia-de-talles'
                      element={
                        <Layout>
                          <Header />
                          <GuiaTalles />
                          <Footer />
                        </Layout>
                      }
                    />

                    <Route
                      path='/contacto'
                      element={
                        <Layout>
                          <Header />
                          <Contacto />
                          <Footer />
                        </Layout>
                      }
                    />

                    <Route
                      path='/faq'
                      element={
                        <Layout>
                          <Header />
                          <Faq />
                          <Footer />
                        </Layout>
                      }
                    />

                    <Route
                      path='/checkout'
                      element={
                        <Layout>
                          <Header />
                          <CarritoCompra />
                          <Footer />
                        </Layout>
                      }
                    />

                    <Route
                      path='/checkout/entrega'
                      element={
                        <Layout>
                          <InformacionEnvio />
                        </Layout>
                      }
                    />

                    <Route
                      path='/checkout/pago'
                      element={
                        <Layout>
                          <Pago />
                        </Layout>
                      }
                    />

                    <Route
                      path='/checkout/pago/success'
                      element={
                        <Layout>
                          <Header />
                          <PagoSuccess />
                          <Footer />
                        </Layout>
                      }
                    />

                    <Route
                      path='/administration'
                      element={
                        <Layout>
                          <Administracion />
                        </Layout>
                      }
                    />

                    <Route
                      path='/administration/orders'
                      element={
                        <Layout>
                          <div className='admin-container'>
                            <Sidebar pedidosNav />
                            <AdminPedidos />
                          </div>
                        </Layout>
                      }
                    />
                    <Route
                      path='/administration/products'
                      element={
                        <Layout>
                          <div className='admin-container'>
                            <Sidebar productsNav />
                            <AdminProductos />
                          </div>
                        </Layout>
                      }
                    />

                    <Route
                      path='/perfil/:id'
                      element={
                        <Layout>
                          <Header />
                          <Perfil />
                          <Footer />
                        </Layout>
                      }
                    />
                    <Route
                      path='/pedido/:id'
                      element={
                        <Layout>
                          <Header />
                          <PedidoForm />
                          <Footer />
                        </Layout>
                      }
                    />
                    <Route
                      path='/privacy-policy'
                      element={
                        <Layout>
                          <Header />
                          <PoliticasPrivacidad />
                          <Footer />
                        </Layout>
                      }
                    />

                    <Route
                      path='/terms-of-service'
                      element={
                        <Layout>
                          <Header />
                          <Terminos />
                          <Footer />
                        </Layout>
                      }
                    />

                    <Route
                      path='/returns-exchanges'
                      element={
                        <Layout>
                          <Header />
                          <CambiosDevoluciones />
                          <Footer />
                        </Layout>
                      }
                    />

                    <Route
                      path='/shipping-policy'
                      element={
                        <Layout>
                          <Header />
                          <PoliticasEnvio />
                          <Footer />
                        </Layout>
                      }
                    />

                    <Route element={<ProteccionRutas />}>
                      <Route
                        path='/productos-form'
                        element={
                          <Layout>
                            <Header />
                            <ProductosForm />
                            <Footer />
                          </Layout>
                        }
                      />
                    </Route>
                  </Routes>
                </BrowserRouter>
              </PedidoProvider>
            </FilterProvider>
          </MercadoPagoProvider>
        </CartProvider>
      </ProductProvider>
      <Toaster
        richColors
        position='bottom-left'
        expand={false}
      />
    </AuthProvider>
  );
}

export default App;
