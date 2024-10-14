import axios from './axios';

export const getProductsRequest = (
  limit = null,
  categoria = null,
  coleccion = null
) => {
  let url = '/products';
  const params = {};

  if (limit !== null) params.limit = limit;
  if (categoria !== null) params.categoria = categoria;
  if (coleccion !== null) params.coleccion = coleccion;

  return axios.get(url, { params });
};

export const getProductRequest = (id) => axios.get(`/product/${id}`);

export const createProductRequest = (product) =>
  axios.post('/product', product);

export const updateProductRequest = (product) =>
  axios.put(`/product/${product._id}`, product);

export const updateProductStockRequest = (id, talle, quantity) =>
  axios.put(`/product/update-stock/${id}`, { talle, quantity });

export const deleteProductsRequest = (id) => axios.delete(`/product/${id}`);
