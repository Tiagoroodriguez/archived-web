import mongoose from 'mongoose';

const envioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },

    apellido: {
      type: String,
      required: true,
    },

    direccion: {
      type: String,
      required: true,
    },

    numero_direccion: {
      type: Number,
      required: true,
    },

    ciudad: {
      type: String,
      required: true,
    },

    codigo_postal: {
      type: Number,
      required: true,
    },

    telefono: {
      type: Number,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    numero_pedido: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Envio', envioSchema);
