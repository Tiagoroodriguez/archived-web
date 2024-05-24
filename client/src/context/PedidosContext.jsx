import { createContext, useContext } from 'react';
import { createEnvioRequest } from '../api/pedidos';

export const PedidosContext = createContext();

export const usePedido = () => {
  const context = useContext(PedidosContext);
  if (context === undefined) {
    throw new Error('usePedido must be used within a PedidoProvider');
  }
  return context;
};

export const PedidoProvider = ({ children }) => {
  const registrarEnvio = async (envio) => {
    try {
      const res = await createEnvioRequest(envio);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return (
    <PedidosContext.Provider value={{ registrarEnvio }}>
      {children}
    </PedidosContext.Provider>
  );
};
