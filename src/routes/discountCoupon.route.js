import { Router } from 'express';
import {
  getDiscounts,
  createDiscount,
  updateDiscount,
  deleteDiscount,
  getCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
} from '../controllers/discountCoupon.controller.js';

const router = Router();

// Rutas para descuentos
router.get('/discounts', getDiscounts);
router.post('/discount', createDiscount);
router.put('/discount/:id', updateDiscount);
router.delete('/discount/:id', deleteDiscount);

// Rutas para cupones
router.get('/coupons', getCoupons);
router.post('/coupon', createCoupon);
router.put('/coupon/:id', updateCoupon);
router.delete('/coupon/:id', deleteCoupon);

export default router;