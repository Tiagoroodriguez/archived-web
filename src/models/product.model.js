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
    precio: {
      type: Number,
      required: true,
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Product', productSchema);
