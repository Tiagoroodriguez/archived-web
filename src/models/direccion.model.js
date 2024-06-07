import mongoose from 'mongoose';

const subDireccionSchema = new mongoose.Schema({
  direccion: {
    type: String,
    required: true,
  },
  numero: {
    type: Number,
    required: false,
  },
  departamento: {
    type: String,
    required: false,
  },
  ciudad: {
    type: String,
    required: true,
  },
  provincia: {
    type: String,
    required: true,
  },
  codigo_postal: {
    type: Number,
    required: true,
  },
});

const direccionSchema = new mongoose.Schema(
  {
    envio: {
      type: subDireccionSchema,
      required: true,
    },
    facturacion: {
      type: subDireccionSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Direccion', direccionSchema);
