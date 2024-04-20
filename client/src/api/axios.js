import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  /*https://archived-web-1.onrender.com/api*/
  withCredentials: true,
});

export default instance;
