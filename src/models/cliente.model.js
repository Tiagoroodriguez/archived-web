import mongoose from 'mongoose';

const clienteSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    apellido: {
      type: String,
      required: true,
    },
    documento: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    telefono: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Cliente', clienteSchema);
