import { Router } from "express";
import {
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from '../controllers/products.controller.js';
 
const router = Router()

router.get('/products', getProducts)

router.get('/product/:id', getProduct)

router.post('/product', createProduct)

router.delete('/product/:id', deleteProduct)

router.put('/product/:id', updateProduct)


export default router
