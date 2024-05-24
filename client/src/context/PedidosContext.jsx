import { createContext, useContext, useState } from 'react';
import {
  updatePedidoRequest,
  createEnvioRequest,
  modificarEnvioRequest,
  getEnvioRequest,
  getPedidoRequest,
} from '../api/pedidos';

export const PedidosContext = createContext();

export const usePedido = () => {
  const context = useContext(PedidosContext);
  if (context === undefined) {
    throw new Error('usePedido must be used within a PedidoProvider');
  }
  return context;
};

export const PedidoProvider = ({ children }) => {
  const [pedido, setPedido] = useState(null);

  const getPedido = async (id) => {
    try {
      const res = await getPedidoRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const updatePedido = async (pedido) => {
    try {
      const res = await updatePedidoRequest(pedido);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const registrarEnvio = async (envio) => {
    try {
      const res = await createEnvioRequest(envio);
      setPedido(res.data);
      console.log('pedido', pedido);
      console.log('res.data', pedido._id);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getEnvio = async (id) => {
    try {
      const res = await getEnvioRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const modificarEnvio = async (id, envio) => {
    try {
      const res = await modificarEnvioRequest(id, envio);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return (
    <PedidosContext.Provider
      value={{
        getPedido,
        updatePedido,
        pedido,
        registrarEnvio,
        getEnvio,
        modificarEnvio,
      }}
    >
      {children}
    </PedidosContext.Provider>
  );
};
