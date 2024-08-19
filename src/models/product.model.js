import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    categoria: {
      type: String,
      required: true,
    },
    coleccion: {
      type: String,
      required: true,
    },
    precio: {
      type: Number,
      required: true,
    },
    precio_con_descuento: {
      type: Number,
    },
    discount: {
      type: Number,
      default: 0,
    },
    cant_s: {
      type: Number,
    },
    cant_m: {
      type: Number,
    },
    cant_l: {
      type: Number,
    },
    cant_xl: {
      type: Number,
    },
    cant_xxl: {
      type: Number,
    },
    ventas: {
      type: Number,
      default: 0,
    },
    descripcion: {
      type: String,
      required: true,
    },
    img_small_1: {
      type: String,
      required: true,
    },
    img_small_2: {
      type: String,
    },
    img_big_1: {
      type: String,
      required: true,
    },
    img_big_2: {
      type: String,
      required: true,
    },
    img_big_3: {
      type: String,
      required: true,
    },
    img_big_4: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Product', productSchema);
