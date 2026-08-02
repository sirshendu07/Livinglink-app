const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  visitorName: { type: String, required: true },
  phone: { type: String, required: true },
  flatToVisit: { type: String, required: true }, // e.g., "B-402"
  category: { type: String, enum: ['guest', 'delivery', 'staff'], required: true },
  status: { 
    type: String, 
    enum: ['waiting', 'pre-approved', 'approved', 'denied', 'inside', 'exited'], 
    default: 'waiting' 
  },
  enteredAt: { type: Date },
  exitedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Visitor', visitorSchema);