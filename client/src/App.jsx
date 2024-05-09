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
          <Background />
          <BrowserRouter>
            <Routes>
              <Route
                path='/'
                element={
                  <Layout>
                    <Header />
                    <Inicio />
                    <Footer />
                  </Layout>
                }
              />
              <Route
                path='/login'
                element={
                  <Layout>
                    <Header />
                    <IniciarSesion />
                    <Footer />
                  </Layout>
                }
              />
              <Route
                path='/register'
                element={
                  <Layout>
                    <Header />
                    <CrearCuenta />
                    <Footer />
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
                path='/checkout/informacion/dev'
                element={
                  <Layout>
                    <InformacionEnvio />
                  </Layout>
                }
              />

              <Route
                path='/checkout/dev'
                element={
                  <Layout>
                    <Header />
                    <CarritoCompra />
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
                  path='/checkout/informacion'
                  element={
                    <Layout>
                      <InformacionEnvio />
                    </Layout>
                  }
                />
              </Route>
            </Routes>
          </BrowserRouter>
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
