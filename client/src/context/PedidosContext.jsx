import { createContext, useContext, useState, useEffect } from 'react';
import { updatePedidoRequest, getPedidoRequest } from '../api/pedidos';

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
  const [provinciaEnvio, setProvinciaEnvio] = useState('');
  const [provinciaFacturacion, setProvinciaFacturacion] = useState('');
  const [selectedMetodoEnvio, setSelectedMetodoEnvio] = useState('');
  const [mismaDireccion, setMismaDireccion] = useState(true);
  const [codigoPostal, setCodigoPostal] = useState(false);
  //console.log('Informacion envio:', envioInfo);
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

  return (
    <PedidosContext.Provider
      value={{
        envioInfo,
        setEnvioInfo,
        selectedMetodoEnvio,
        setSelectedMetodoEnvio,
        codigoPostal,
        setCodigoPostal,
        provinciaEnvio,
        setProvinciaEnvio,
        provinciaFacturacion,
        setProvinciaFacturacion,
        mismaDireccion,
        setMismaDireccion,
        getPedido,
        updatePedido,
        pedido,
      }}
    >
      {children}
    </PedidosContext.Provider>
  );
};
