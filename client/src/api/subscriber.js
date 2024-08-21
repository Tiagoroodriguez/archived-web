import axios from './axios';

export const checkSubscriptionRequest = (email) =>
  axios.get('/check-subscription', { params: { email } });

export const subscribeRequest = ({ email }) =>
  axios.post('/subscribe', { email });

export const getSuscriptoresRequest = () => axios.get('/subscribers');
