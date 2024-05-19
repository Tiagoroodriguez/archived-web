import axios from './axios';

export const createOrderRequest = (productos) =>
  axios.post('/create-order', productos);

export const getOrderRequest = (id) => axios.get(`/get-order/${id}`);
