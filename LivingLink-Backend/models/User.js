const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ['admin', 'resident', 'security'], required: true },
  flatNumber: { type: String }, // e.g., "B-402"
  password: { type: String, default: 'livinglink123' },
  isFirstLogin: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);