import mongoose from 'mongoose';

const subClienteSchema = new mongoose.Schema(
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

const clienteSchema = new mongoose.Schema(
  {
    envio: {
      type: subClienteSchema,
      required: false,
    },
    facturacion: {
      type: subClienteSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Cliente', clienteSchema);
