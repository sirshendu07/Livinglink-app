const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  type: { type: String, enum: ['URGENT', 'INFO', 'EVENT'], default: 'INFO' },
  author: { type: String, default: 'Admin' }
}, { timestamps: true });

module.exports = mongoose.model('Notice', noticeSchema);