import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/products.route.js';
import mercadopagoRoutes from './routes/mercadopago.route.js';
import pedidosRoutes from './routes/pedidos.route.js';
import discountCouponRoutes from './routes/discountCoupon.route.js';

const app = express();

app.use(
  cors({
    origin: 'https://archived-web-six.vercel.app',
    /* produccion: https://archived-web-six.vercel.app*/
    /* dev: http://localhost:5173*/
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.use('/api', authRoutes);
app.use('/api', productRoutes);
app.use('/api', mercadopagoRoutes);
app.use('/api', pedidosRoutes);
app.use('/api', discountCouponRoutes);

export default app;
