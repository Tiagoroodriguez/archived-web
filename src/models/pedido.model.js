import mongoose from 'mongoose';

const pedidoSchema = new mongoose.Schema(
  {
    numero_pedido: {
      type: Number,
      required: true,
    },
    estado: {
      type: String,
      required: true,
      default: 'pendiente',
    },
    informacion_envio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Envio',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Pedido', pedidoSchema);
