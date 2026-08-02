const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const SOS = require('../models/SOS');

/* ==========================================
   COMPLAINTS MODULE
========================================== */

// 1. POST: Resident lodges a new complaint
router.post('/complaint', async (req, res) => {
  try {
    const newComplaint = new Complaint(req.body);
    await newComplaint.save();
    res.status(201).json({ message: 'Complaint registered successfully', complaint: newComplaint });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. GET: Fetch all complaints (For Resident History & Admin Dashboard)
router.get('/complaints', async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. PUT: Update complaint status (For Admin to mark as 'Resolved' or 'In Progress')
router.put('/complaint/:id', async (req, res) => {
  try {
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.status(200).json({ message: 'Status updated', complaint: updatedComplaint });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


/* ==========================================
   SOS EMERGENCY MODULE
========================================== */

// 1. POST: Resident triggers an SOS Alert
router.post('/sos', async (req, res) => {
  try {
    const newSOS = new SOS(req.body);
    await newSOS.save();
    res.status(201).json({ message: 'SOS Alert Sent!', sos: newSOS });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. GET: Fetch Active SOS alerts (For Security Dashboard to sound alarms)
router.get('/sos/active', async (req, res) => {
  try {
    const activeAlerts = await SOS.find({ status: 'Active' }).sort({ createdAt: -1 });
    res.status(200).json(activeAlerts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. PUT: Resolve SOS Alert (For Security to clear the alarm)
router.put('/sos/:id', async (req, res) => {
  try {
    const resolvedSOS = await SOS.findByIdAndUpdate(
      req.params.id,
      { status: 'Resolved' },
      { new: true }
    );
    res.status(200).json({ message: 'SOS Resolved', sos: resolvedSOS });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;