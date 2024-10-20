import axios from './axios';

export const createOrderRequest = ({
  productos,
  shippingCost,
  shippingDetails,
}) => axios.post('/create-order', { productos, shippingCost, shippingDetails });

export const getOrderRequest = (id) => axios.get(`/get-order/${id}`);
