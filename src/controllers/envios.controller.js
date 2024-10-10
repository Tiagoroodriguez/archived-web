import axios from 'axios';
import { SHIPNOW_API_KEY } from '../config.js';

const apiKey = SHIPNOW_API_KEY;

export const calculateShipment = async (req, res) => {
  const { zipCode, weight } = req.body;

  try {
    const url = `${process.env.SHIPNOW_API_URL}/shipping_options?weight=${weight}&to_zip_code=${zipCode}&types=ship_pas`; // Assuming SHIPNOW_API_URL is set in your config

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    return res.json(response.data.results[0]);
  } catch (error) {
    console.error('Error calculating shipping:', error);
    res.status(500).json({ error: 'Error al calcular el envío' });
  }
};
