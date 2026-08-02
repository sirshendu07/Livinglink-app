const express = require('express');
const router = express.Router();
const User = require('../models/User');

// 1. Add a single member
router.post('/add', async (req, res) => {
  try {
    const { name, phone, role, flatNumber } = req.body;
    const newUser = new User({ name, phone, role, flatNumber });
    await newUser.save();
    res.status(201).json({ message: 'Member added successfully!', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error adding member', error: error.message });
  }
});

// 2. MAGIC ROUTE: Bulk generate specific Sanju profiles
router.post('/seed', async (req, res) => {
  try {
    const dummyUsers = [];
    
    // Create 3 Admins
    for (let i = 1; i <= 3; i++) {
      dummyUsers.push({
        name: `Admin Sanju ${i}`,
        phone: `999999990${i}`,
        role: 'admin',
        password: 'livinglink123'
      });
    }

    // Create 5 Security Guards
    for (let i = 1; i <= 5; i++) {
      dummyUsers.push({
        name: `Security Sanju ${i}`,
        phone: `888888880${i}`,
        role: 'security',
        password: 'livinglink123'
      });
    }

    // Create test Residents so Gate Management works
    dummyUsers.push({ name: 'Rahul Sharma', phone: '9876543210', role: 'resident', flatNumber: 'B-402' });
    dummyUsers.push({ name: 'Amit Roy', phone: '9876543211', role: 'resident', flatNumber: 'A-105' });

    // Insert all into the database at once
    await User.insertMany(dummyUsers);
    res.status(201).json({ message: 'Successfully inserted Admins, Security, and Residents!' });
  } catch (error) {
    res.status(500).json({ message: 'Error seeding users', error: error.message });
  }
});

// 3. Get total count of users
router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.status(200).json({ total: totalUsers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// POST: User Login (Verify phone and password)
router.post('/login', async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid phone number or password' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: {
        _id: user._id,
        name: user.name,
        phone: user.phone,
        role: user.role,
        flatNumber: user.flatNumber || 'N/A'
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
}); 

module.exports = router;