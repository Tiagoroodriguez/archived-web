import mongoose from 'mongoose';

const subscriberSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'is invalid'], // Validación básica de correo
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Subscriber', subscriberSchema);