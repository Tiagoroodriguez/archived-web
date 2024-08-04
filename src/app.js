import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/products.route.js';
import mercadopagoRoutes from './routes/mercadopago.route.js';
import pedidosRoutes from './routes/pedidos.route.js';
import discountCouponRoutes from './routes/discountCoupon.route.js';
import searchRoutes from './routes/search.router.js';
import subscriberRoutes from './routes/subscriber.route.js';

const app = express();

const allowedOrigins = [
  'http://localhost:5173', // Dev
  'https://archived-web-six.vercel.app', // Producción
  'https://archived.com.ar', // Producción
  'https://www.archived.com.ar', // Producción
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Permitir solicitudes sin origen (como aplicaciones móviles o curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
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
app.use('/api', searchRoutes);
app.use('/api', subscriberRoutes);

export default app;
