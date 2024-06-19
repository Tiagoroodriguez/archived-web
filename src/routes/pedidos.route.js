import { Router } from 'express';
import { createPedido, getPedido } from '../controllers/pedidos.controller.js';

const router = Router();
//6660f750d0c59bdb5e181205
router.post('/pedido', createPedido);

router.get('/pedido/:id', getPedido);

export default router;
