import { Router } from 'express';
import {
  createPedido,
  getPedido,
  getPedidos,
  getPedidoUser,
  getPedidoNroPago,
  updatePedido,
} from '../controllers/pedidos.controller.js';

import { sendMail } from '../controllers/email.controller.js';

const router = Router();

router.post('/pedido', createPedido);

router.get('/pedido/:id', getPedido);

router.get('/pedidos', getPedidos);

router.get('/pedido-user/:id', getPedidoUser);

router.get('/pedido-pago/:id', getPedidoNroPago);

router.put('/pedido/:id', updatePedido);

router.post('/mail', sendMail);

export default router;
