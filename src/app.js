import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import mime from 'mime-types';

import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/products.route.js';
import mercadopagoRoutes from './routes/mercadopago.route.js';
import pedidosRoutes from './routes/pedidos.route.js';
import discountCouponRoutes from './routes/discountCoupon.route.js';
import searchRoutes from './routes/search.router.js';
import subscriberRoutes from './routes/subscriber.route.js';
import fileRoutes from './routes/files.routes.js';

const app = express();

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Middleware para establecer el tipo de contenido manualmente (si es necesario)
app.use((req, res, next) => {
  const fileType = mime.lookup(req.path);
  if (fileType) {
    res.setHeader('Content-Type', fileType);
  }
  next();
});

app.use('/api', authRoutes);
app.use('/api', productRoutes);
app.use('/api', mercadopagoRoutes);
app.use('/api', pedidosRoutes);
app.use('/api', discountCouponRoutes);
app.use('/api', searchRoutes);
app.use('/api', subscriberRoutes);
app.use('/api', fileRoutes);

export default app;
