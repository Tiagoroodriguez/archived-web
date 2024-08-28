import mongoose from 'mongoose';
import Counter from './counter.model.js';

const pedidoSchema = new mongoose.Schema(
  {
    numero_pedido: {
      type: String,
      required: true,
      unique: true,
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
        nombre: {
          type: String,
          required: true,
        },
        cantidad: {
          type: Number,
          required: true,
        },
        talle: {
          type: String,
          required: true,
        },
        categoria: {
          type: String,
          required: true,
        },
        precio: {
          type: Number,
          required: true,
        },
        precio_con_descuento: {
          type: Number,
          default: 0,
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
    estado_envio: {
      type: String,
      default: 'Pendiente',
    },
    estado_pago: {
      type: String,
      default: 'Pendiente',
    },
    numero_pago: {
      type: String,
    },
    tipo_pago: {
      type: String,
    },
    codigo_seguimiento: {
      type: String,
    },
    coupon: {
      type: String,
    },
    total: {
      type: Number,
      required: true,
    },
    total_con_descuento: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Pedido', pedidoSchema);
