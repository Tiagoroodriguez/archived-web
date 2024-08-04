import axios from './axios';

export const checkSubscriptionRequest = (email) =>
  axios.get('/check-subscription', { params: { email } });

export const subscribeRequest = ({ email, nombre }) =>
  axios.post('/subscribe', { email, nombre });
