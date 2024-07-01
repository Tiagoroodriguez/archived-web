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

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: -2;
  height: 100%;
  min-height: 100vh;
  width: 100%;
  background-color: var(--color-primario);
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
                          <Header anuncio />
                          <Inicio />
                          <Footer />
                        </Layout>
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
      />
    </AuthProvider>
  );
}

export default App;
