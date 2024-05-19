import { config } from 'dotenv';
config();

export const TOKEN_SECRET = 'some secret key';

export const MERCADOPAGO_ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN;
