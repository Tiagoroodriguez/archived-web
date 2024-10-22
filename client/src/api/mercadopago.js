import axios from './axios';

export const createOrderRequest = ({
  productos,
  shippingCost,
  shippingDetails,
  userId,
}) =>
  axios.post('/create-order', {
    productos,
    shippingCost,
    shippingDetails,
    userId,
  });

export const getOrderRequest = (id) => axios.get(`/get-order/${id}`);
