import { createContext, useContext, useState, useEffect } from 'react';
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

const saveEnvioInfo = (data) => {
  const now = new Date().getTime();
  const envioData = {
    data,
    timestamp: now,
  };
  localStorage.setItem('envioInfo', JSON.stringify(envioData));
};

const loadEnvioInfo = () => {
  const savedEnvio = localStorage.getItem('envioInfo');
  if (!savedEnvio) return {};

  const { data, timestamp } = JSON.parse(savedEnvio);
  const now = new Date().getTime();

  if (now - timestamp > 3 * 60 * 60 * 1000) {
    localStorage.removeItem('envioInfo');
    return {};
  }

  return data;
};

export const PedidoProvider = ({ children }) => {
  const [pedido, setPedido] = useState(null);
  const [envioInfo, setEnvioInfo] = useState(loadEnvioInfo);
  const [selectedMetodoEnvio, setSelectedMetodoEnvio] = useState('');
  const [selectedProvincia, setSelectedProvincia] = useState('');
  const [mismaDireccion, setMismaDireccion] = useState(true);

  useEffect(() => {
    if (Object.keys(envioInfo).length > 0) {
      saveEnvioInfo(envioInfo);
    }
  }, [envioInfo]);

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
        envioInfo,
        setEnvioInfo,
        selectedMetodoEnvio,
        setSelectedMetodoEnvio,
        selectedProvincia,
        setSelectedProvincia,
        mismaDireccion,
        setMismaDireccion,
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
