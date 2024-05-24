import axios from './axios';

export const updatePedidoRequest = (pedido) =>
  axios.put(`/pedido/${pedido._id}`, pedido);

export const getPedidoRequest = (id) => axios.get(`/pedido/${id}`);

export const createEnvioRequest = (envio) => axios.post('/envio', envio);

export const getEnvioRequest = (id) => axios.get(`/envio/${id}`);

export const modificarEnvioRequest = (envio) =>
  axios.put(`/envio/${envio._id}`, envio);
