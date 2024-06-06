import mongoose from 'mongoose';

const direccionSchema = new mongoose.Schema(
  {
    direccion_envio: {
      type: String,
      required: true,
    },

    numero_direccion_envio: {
      type: Number,
      required: false,
    },

    departamento_envio: {
      type: String,
      required: false,
    },

    ciudad_envio: {
      type: String,
      required: true,
    },

    provincia_envio: {
      type: String,
      required: true,
    },

    codigo_postal_envio: {
      type: Number,
      required: true,
    },

    direccion_facturacion: {
      type: String,
      required: true,
    },

    numero_direccion_facturacion: {
      type: Number,
      required: false,
    },

    departamento_envio_facturacion: {
      type: String,
      required: false,
    },

    ciudad_facturacion: {
      type: String,
      required: true,
    },

    codigo_postal_facturacion: {
      type: Number,
      required: false,
    },

    provincia_facturacion: {
      type: String,
      required: true,
    },

    numero_pedido: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Direccion', direccionSchema);
