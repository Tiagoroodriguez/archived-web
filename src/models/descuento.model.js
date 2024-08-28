import mongoose from 'mongoose';

const discountSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  discount_percentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
    default: 0,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const Discount = mongoose.model('Discount', discountSchema);
export default Discount;
