const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');

// GET all payments (For Admin Dashboard)
router.get('/all', async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new payment (Triggered from PaymentGateway.jsx)
router.post('/add', async (req, res) => {
  try {
    const newPayment = new Payment(req.body);
    await newPayment.save();
    res.status(201).json({ message: 'Payment recorded successfully', payment: newPayment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;