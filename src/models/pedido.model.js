import mongoose from 'mongoose';

const pedidoSchema = new mongoose.Schema(
  {
    numero_pedido: {
      type: String,
      required: true,
      unique: true,
    },
    cliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cliente',
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
        producto_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Producto',
        },
        cantidad: {
          type: Number,
          required: true,
        },
        precio: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Pedido', pedidoSchema);
