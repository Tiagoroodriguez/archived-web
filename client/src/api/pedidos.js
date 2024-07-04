import axios from './axios';

export const createPedidoRequest = (pedido) => axios.post('/pedido', pedido);

export const getPedidoRequest = (id) => axios.get(`/pedido/${id}`);

export const getPedidosRequest = () => axios.get('/pedidos');

export const getPedidoUserRequest = (id) => axios.get(`/pedido-user/${id}`);

export const sendMailRequest = ({ to, subject, html }) => axios.post('/mail', { to, subject, html });
