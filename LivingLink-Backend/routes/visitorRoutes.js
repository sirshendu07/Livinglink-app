const express = require('express');
const router = express.Router();
const Visitor = require('../models/Visitor');

// 1. SECURITY: Log a new visitor at the gate (Status defaults to 'waiting')
router.post('/log-entry', async (req, res) => {
  try {
    const { visitorName, phone, flatToVisit, category } = req.body;
    
    const newVisitor = new Visitor({
      visitorName,
      phone,
      flatToVisit,
      category
    });

    const savedVisitor = await newVisitor.save();
    res.status(201).json({ message: 'Visitor logged, waiting for flat approval', visitor: savedVisitor });
  } catch (error) {
    res.status(500).json({ message: 'Error logging visitor', error: error.message });
  }
});

// 2. GET: Fetch all active visitors (For the Security Dashboard)
router.get('/active', async (req, res) => {
  try {
    const activeVisitors = await Visitor.find({ status: { $ne: 'exited' } }).sort({ createdAt: -1 });
    res.status(200).json(activeVisitors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching visitors', error: error.message });
  }
});

// 3. GET: Fetch visitors for a specific flat (For the Resident Gate page)
router.get('/flat/:flatNumber', async (req, res) => {
  try {
    const { flatNumber } = req.params;
    const visitors = await Visitor.find({ flatToVisit: flatNumber }).sort({ createdAt: -1 });
    res.status(200).json(visitors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching visitors', error: error.message });
  }
});

// 4. PUT: Update a visitor's status (Resident approves/denies)
router.put('/update-status/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedVisitor = await Visitor.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    );
    res.status(200).json({ message: `Visitor status updated to ${status}`, visitor: updatedVisitor });
  } catch (error) {
    res.status(500).json({ message: 'Error updating status', error: error.message });
  }
});

module.exports = router;