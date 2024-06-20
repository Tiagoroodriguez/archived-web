import mongoose from 'mongoose';

const pedidoSchema = new mongoose.Schema(
  {
    numero_pedido: {
      type: String,
      required: true,
    },
    cliente_facturacion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cliente',
      required: true,
    },
    direccion_facturacion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Direccion',
      required: true,
    },
    cliente_envio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cliente',
      required: false,
    },
    direccion_envio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Direccion',
      required: false,
    },
    productos: [
      {
        producto_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Producto',
          required: true,
        },
        cantidad: {
          type: Number,
          required: true,
        },
        precio: {
          type: Number,
          required: true,
        },
        talle: {
          type: String,
          required: true,
        },
      },
    ],
    fecha: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Pedido', pedidoSchema);
