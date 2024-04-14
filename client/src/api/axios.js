import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://archived-web-1.onrender.com/api',
  withCredentials: true,
});

export default instance;
