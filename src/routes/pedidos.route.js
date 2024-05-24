import { Router } from 'express';
import {
  createPedido,
  getPedido,
  updatePedido,
  registrarEnvio,
  getEnvio,
  modificarEnvio,
} from '../controllers/pedidos.controller.js';

const router = Router();

router.post('/pedido', createPedido);

router.get('/pedido/:id', getPedido);

router.put('/pedido/:id', updatePedido);

router.post('/envio', registrarEnvio);

router.put('/envio/:id', modificarEnvio);

router.get('/envio/:id', getEnvio);

export default router;
