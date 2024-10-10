import axios from './axios';

export const calculateShipment = (zipCode, weight) => {
  axios.post('/calculate-shipping', { zipCode, weight });
};
