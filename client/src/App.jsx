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
import Checkout from './layout/Checkout/Checkout';

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
            <Header />
            <Routes>
              <Route
                path='/'
                element={
                  <Layout>
                    <Inicio />
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
                    <Tienda />
                  </Layout>
                }
              />
              <Route
                path='/detalle-producto/:id'
                element={
                  <Layout>
                    <DetalleProducto />
                  </Layout>
                }
              />

              <Route
                path='/checkout'
                element={
                  <Layout>
                    <Checkout />
                  </Layout>
                }
              />

              <Route
                path='/guia-de-talles'
                element={
                  <Layout>
                    <GuiaTalles />
                  </Layout>
                }
              />

              <Route
                path='/contacto'
                element={
                  <Layout>
                    <Contacto />
                  </Layout>
                }
              />

              <Route element={<ProteccionRutas />}>
                <Route
                  path='/productos-form'
                  element={
                    <Layout>
                      <ProductosForm />
                    </Layout>
                  }
                />
              </Route>
            </Routes>
            <Footer />
          </BrowserRouter>
        </CartProvider>
      </ProductProvider>
      <Toaster richColors />
    </AuthProvider>
  );
}

export default App;
