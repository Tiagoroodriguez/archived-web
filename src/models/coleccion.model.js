import mongoose from 'mongoose';

const coleccionSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  oversize_medidas: {
    type: Array,
  },
  boxy_medidas: {
    type: Array,
  },
  buzo_medidas: {
    type: Array,
  },
});

export default mongoose.model('Coleccion', coleccionSchema);
