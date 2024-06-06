import mongoose from 'mongoose';

const pedidoSchema = new mongoose.Schema(
  {
    numero_pedido: {
      type: String,
      required: true,
    },

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

    direcciones: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Direccion',
    },

    informacion_pago: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pago',
    },

    productos: [
      {
        type: Array,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Pedido', pedidoSchema);
