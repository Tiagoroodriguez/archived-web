import { Router } from 'express';
import {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  updateProductStock,
  getRecommendations,
} from '../controllers/products.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
import { checkRoleAuth } from '../middlewares/roleAuth.js';

const router = Router();

router.get('/products/:limit?/:categoria?', getProducts);

router.get('/product/:id', getProduct);

router.post('/product', authRequired, checkRoleAuth, createProduct);

router.delete('/product/:id', authRequired, checkRoleAuth, deleteProduct);

router.put('/product/:id', updateProduct);

router.put('/product/update-stock/:id', updateProductStock);

router.get('/recommendations/:id', getRecommendations);

export default router;
