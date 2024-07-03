import { Router } from 'express';
import {
  createPedido,
  getPedido,
  getPedidos,
  getPedidoUser,
} from '../controllers/pedidos.controller.js';

import { sendMail } from '../controllers/email.controller.js';

const router = Router();
//6660f750d0c59bdb5e181205
router.post('/pedido', createPedido);

router.get('/pedido/:id', getPedido);

router.get('/pedidos', getPedidos);

router.get('/pedido-user/:id', getPedidoUser);

router.post('/mail', sendMail);

export default router;
