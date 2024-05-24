import { Router } from 'express';
import { registrarEnvio } from '../controllers/pedidos.controller.js';

const router = Router();

router.post('/envio', registrarEnvio);

export default router;
