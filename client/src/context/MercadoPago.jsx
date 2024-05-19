import { createContext } from 'react';
import { createOrderRequest, getOrderRequest } from '../api/mercadopago';

export const MercadoPagoContext = createContext();

export function MercadoPagoProvider({ children }) {
  const createOrder = async (productos) => {
    try {
      const res = await createOrderRequest(productos);
      const initPointUrl = res.data;
      window.location.href = initPointUrl;
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const getOrder = async (id) => {
    try {
      const res = await getOrderRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <MercadoPagoContext.Provider value={{ createOrder, getOrder}}>
      {children}
    </MercadoPagoContext.Provider>
  );
}
