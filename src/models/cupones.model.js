import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  discount_percentage: {
    type: Number,
    required: true,
  },
  valid_from: {
    type: Date,
    required: true,
  },
  valid_until: {
    type: Date,
    required: true,
  },
  max_uses: {
    type: Number,
    required: true,
  },
  used_count: {
    type: Number,
    default: 0,
  },
});

const Coupon = mongoose.model('Coupon', couponSchema);
export default Coupon;
