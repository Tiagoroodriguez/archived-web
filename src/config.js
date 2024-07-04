import { config } from 'dotenv';
config();

export const TOKEN_SECRET = process.env.TOKEN_SECRET_KEY;

export const MERCADOPAGO_ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN;

export const EMAIL_KEY = process.env.EMAIL_KEY;
