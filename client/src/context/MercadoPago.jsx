import { createContext, useCallback } from 'react';
import { createOrderRequest, getOrderRequest } from '../api/mercadopago';

export const MercadoPagoContext = createContext();

export function MercadoPagoProvider({ children }) {
  const createOrder = useCallback(async ({ productos, shippingCost }) => {
    try {
      const res = await createOrderRequest({ productos, shippingCost });
      const initPointUrl = res.data;
      window.location.href = initPointUrl;
    } catch (error) {
      console.error('Error creating order:', error);
    }
  }, []);

  const getOrder = useCallback(async (id) => {
    try {
      const res = await getOrderRequest(
        id + `?timestamp=${new Date().getTime()}`
      );
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <MercadoPagoContext.Provider value={{ createOrder, getOrder }}>
      {children}
    </MercadoPagoContext.Provider>
  );
}
