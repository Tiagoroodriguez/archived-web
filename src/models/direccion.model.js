import mongoose from 'mongoose';

const direccionSchema = new mongoose.Schema(
  {
    direccion: {
      type: String,
      required: true,
    },
    numero: {
      type: String,
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
      type: String,
      required: true,
    },
    cliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cliente',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Direccion', direccionSchema);
