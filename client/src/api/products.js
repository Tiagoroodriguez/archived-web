import axios from './axios';

export const getProductsRequest = () => axios.get('/products');

export const getProductRequest = (id) => axios.get(`/product/${id}`);

export const createProductRequest = (product) =>
  axios.post('/product', product);

export const updateProductRequest = (product) =>
  axios.put(`/product/${product._id}`, product);

export const deleteProductsRequest = (id) => axios.delete(`/product/${id}`);
