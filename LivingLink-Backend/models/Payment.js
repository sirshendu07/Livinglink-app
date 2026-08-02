const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  residentName: { type: String, required: true },
  flatNumber: { type: String, required: true },
  paymentType: { type: String, required: true }, // e.g., 'Maintenance' or 'Gym'
  amount: { type: Number, required: true },
  plan: { type: String }, // Used for gym plans (e.g., 'Monthly')
  status: { type: String, default: 'Success' },
  transactionId: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);