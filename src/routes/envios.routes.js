import express from 'express';
import { calculateShipment } from '../controllers/envios.controller.js';

const router = express.Router();

router.post('/calculate-shipping', calculateShipment);

export default router;
