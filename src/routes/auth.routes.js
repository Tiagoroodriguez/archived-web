import { Router } from 'express';
import Users from '../models/user.model.js';
import Cliente from '../models/cliente.model.js';
import Direccion from '../models/direccion.model.js';
import Coupon from '../models/cupones.model.js';
import {
  login,
  logout,
  profile,
  register,
  verifyToken,
  solicitarRecuperacion,
  recuperarPassword,
} from '../controllers/auth.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
import { validateShema } from '../middlewares/validator.middleware.js';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';

const router = Router();

router.post('/register', validateShema(registerSchema), register);

router.post('/login', validateShema(loginSchema), login);

router.post('/logout', logout);

router.get('/verify', verifyToken);

router.get('/profile', authRequired, profile);

router.post('/solicitar-recuperacion', solicitarRecuperacion);

router.post('/restablecer', recuperarPassword);

export default router;
