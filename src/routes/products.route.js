import { Router } from 'express';
import {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  updateProductStock,
} from '../controllers/products.controller.js';

const router = Router();

router.get('/products/:limit?/:categoria?', getProducts);

router.get('/product/:id', getProduct);

router.post('/product', createProduct);

router.delete('/product/:id', deleteProduct);

router.put('/product/update-stock/:id', updateProductStock);

export default router;
