import { Router } from 'express';
import { upload, uploadFiles } from '../controllers/files.controller.js';

const router = Router();

router.post('/upload', upload, uploadFiles);

export default router;
