import { Router } from 'express';
import {
  createOrder,
  reciverWebhook,
  getOrder,
} from '../controllers/mercadopago.controller.js';

const router = Router();

router.post('/create-order', createOrder);
router.get('/get-order/:id', getOrder);
router.post('/mercado-pago/webhook', reciverWebhook);

export default router;
