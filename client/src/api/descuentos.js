import axios from './axios';

export const createDiscountRequest = (discount) => {
  axios.post('/discount', discount);
};
