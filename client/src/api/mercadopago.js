import axios from './axios';

export const createOrderRequest = ({ productos, shippingCost }) =>
  axios.post('/create-order', { productos, shippingCost });

export const getOrderRequest = (id) => axios.get(`/get-order/${id}`);
