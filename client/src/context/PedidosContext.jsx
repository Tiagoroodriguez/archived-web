import { createContext, useContext, useState, useEffect } from 'react';
import {
  createPedidoRequest,
  getPedidoRequest,
  getPedidoUserRequest,
  getPedidosRequest,
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

const loadPedidoCreated = (merchantOrderId) => {
  const savedStatus = localStorage.getItem(`pedidoCreated_${merchantOrderId}`);
  return savedStatus === 'true';
};

const savePedidoCreated = (merchantOrderId, status) => {
  localStorage.setItem(`pedidoCreated_${merchantOrderId}`, status);
};

export const PedidoProvider = ({ children }) => {
  const [pedido, setPedido] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [pedidoUser, setPedidoUser] = useState([]);
  const [envioInfo, setEnvioInfo] = useState(loadEnvioInfo);
  const [provinciaEnvio, setProvinciaEnvio] = useState('');
  const [provinciaFacturacion, setProvinciaFacturacion] = useState('');
  const [selectedMetodoEnvio, setSelectedMetodoEnvio] = useState('');
  const [mismaDireccion, setMismaDireccion] = useState(true);
  const [codigoPostal, setCodigoPostal] = useState(false);
  const [isPedidoCreated, setPedidoCreated] = useState(false);

  useEffect(() => {
    if (Object.keys(envioInfo).length > 0) {
      saveEnvioInfo(envioInfo);
    }
  }, [envioInfo]);

  const createPedido = async (pedido) => {
    try {
      const res = await createPedidoRequest(pedido);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getPedido = async (id) => {
    try {
      const res = await getPedidoRequest(id);
      setPedido(res.data);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getPedidos = async () => {
    try {
      const res = await getPedidosRequest();
      setPedidos(res.data);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getPedidoUser = async (id) => {
    try {
      const res = await getPedidoUserRequest(id);
      setPedidoUser(res.data);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    const merchantOrderId = new URLSearchParams(window.location.search).get(
      'merchant_order_id'
    );
    if (merchantOrderId) {
      const pedidoCreated = loadPedidoCreated(merchantOrderId);
      setPedidoCreated(pedidoCreated);
    }
  }, []);

  useEffect(() => {
    const merchantOrderId = new URLSearchParams(window.location.search).get(
      'merchant_order_id'
    );
    if (merchantOrderId) {
      savePedidoCreated(merchantOrderId, isPedidoCreated);
    }
  }, [isPedidoCreated]);

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
        getPedidoUser,
        getPedidos,
        pedidoUser,
        pedidos,
        setPedidos,
        pedido,
        setPedido,
        createPedido,
        isPedidoCreated,
        setPedidoCreated,
      }}
    >
      {children}
    </PedidosContext.Provider>
  );
};
