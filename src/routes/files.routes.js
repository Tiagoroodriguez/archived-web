import express from 'express';
import { uploadImage } from '../controllers/files.controller.js';
import multer from 'multer';

const router = express.Router();

// Configuración de Multer para manejar archivos en memoria
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // Limita el tamaño de la imagen a 5MB
});

// Ruta para subir una imagen
router.post('/upload', upload.single('image'), uploadImage);

export default router;
