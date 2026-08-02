const mongoose = require('mongoose');

const sosSchema = new mongoose.Schema({
  residentName: { type: String, required: true },
  flatNumber: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Active', 'Resolved'], 
    default: 'Active' 
  }
}, { timestamps: true });

module.exports = mongoose.model('SOS', sosSchema);