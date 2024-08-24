import axios from './axios';

export const createDiscountRequest = (discount) => {
  axios.post('/discount', discount);
};

export const deleteDiscountRequest = (id) => {
  axios.delete(`/discount/${id}`);
};
