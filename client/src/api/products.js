import axios from './axios';

export const getProductsRequest = (limit = null, categoria = null) => {
  let url = '/products';

  if (limit !== null || categoria !== null) {
    url += `/`;
    if (limit !== null) {
      url += `${limit}`;
      if (categoria !== null) {
        url += `/`;
      }
    }
    if (categoria !== null) {
      url += `${categoria}`;
    }
  }
  return axios.get(url);
};

export const getProductRequest = (id) => axios.get(`/product/${id}`);

export const createProductRequest = (product) =>
  axios.post('/product', product);

export const updateProductRequest = (product) =>
  axios.put(`/product/${product._id}`, product);

export const updateProductStockRequest = (id, talle, quantity) =>
  axios.put(`/product/update-stock/${id}`, { talle, quantity });

export const deleteProductsRequest = (id) => axios.delete(`/product/${id}`);
