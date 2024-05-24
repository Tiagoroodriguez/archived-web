import axios from './axios';

export const createEnvioRequest = (envio) => axios.post('/envio', envio);
