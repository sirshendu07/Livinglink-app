const express = require('express');
const router = express.Router();
const Notice = require('../models/Notice');

// GET all notices (For Residents & Admin)
router.get('/', async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.status(200).json(notices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new notice (For Admin)
router.post('/add', async (req, res) => {
  try {
    const newNotice = new Notice(req.body);
    await newNotice.save();
    res.status(201).json({ message: 'Notice posted successfully', notice: newNotice });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;