import { Router } from 'express';
import Coleccion from '../models/coleccion.model.js';

const router = Router();

router.post('/coleccion', async (req, res) => {
  const { nombre, descripcion, oversize_medidas, boxy_medidas, buzo_medidas } =
    req.body;
  try {
    const newColeccion = new Coleccion({
      nombre,
      descripcion,
      oversize_medidas: oversize_medidas ? oversize_medidas : null,
      boxy_medidas: boxy_medidas ? boxy_medidas : null,
      buzo_medidas: -buzo_medidas ? buzo_medidas : null,
    });
    await newColeccion.save();
    res.status(201).json(newColeccion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.get('/colecciones', async (req, res) => {
  try {
    const coleccion = await Coleccion.find();
    res.json(coleccion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/coleccion/:id', async (req, res) => {
  try {
    const coleccion = await Coleccion.findById(req.params.id);
    if (!coleccion) {
      return res.status(404).json({ message: 'Colección no encontrada' });
    }
    res.json(coleccion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
