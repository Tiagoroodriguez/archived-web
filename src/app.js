import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/products.route.js';

const app = express();

app.use(
  cors({
    origin: 'https://archived-5b6qewm5p-tiagoroodriguezs-projects.vercel.app/',
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.use('/api', authRoutes);
app.use('/api', productRoutes);

export default app;
