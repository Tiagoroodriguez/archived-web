import { Router } from 'express';
import { PLAID_CLIENT_ID, PLAID_SECRET } from '../config.js';

const router = Router();

const client = new plaid.Client({
  clientID: PLAID_CLIENT_ID,
  secret: PLAID_SECRET,
  env: plaid.environments.sandbox, // Cambia a 'plaid.environments.development' o 'plaid.environments.production' según sea necesario
});

// Endpoint para crear un link token
router.post('/create-link-token', async (req, res) => {
  const response = await client.createLinkToken({
    user: { client_user_id: 'unique_user_id' },
    client_name: 'Your App Name',
    products: ['auth', 'transactions'],
    country_codes: ['ARS'],
    language: 'en',
  });
  res.json(response);
});

// Endpoint para intercambiar el public token por un access token
router.post('/exchange-public-token', async (req, res) => {
  const { public_token } = req.body;
  try {
    const response = await client.exchangePublicToken(public_token);
    const access_token = response.access_token;
    res.json({ access_token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/transactions', async (req, res) => {
  const { access_token, start_date, end_date } = req.body;
  try {
    const response = await client.getTransactions(
      access_token,
      start_date,
      end_date
    );
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
