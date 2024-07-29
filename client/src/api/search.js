import axios from './axios';

export const searchRequest = (query) =>
  axios.get(`/search`, {
    params: { query },
  });
