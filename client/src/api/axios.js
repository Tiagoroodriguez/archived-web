import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://archived-web-1.onrender.com/api',
  /* produccion: https://archived-web-1.onrender.com/api*/
  /* dev: http://localhost:3000/api */
  withCredentials: true,
});

export default instance;
