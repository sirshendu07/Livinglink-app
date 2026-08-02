const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Routes Imports
const visitorRoutes = require('./routes/visitorRoutes');
const userRoutes = require('./routes/UserRoutes'); // Matches your capital "U" filename
const noticeRoutes = require('./routes/noticeRoutes');   // <-- ADD THIS
const paymentRoutes = require('./routes/paymentRoutes'); // <-- ADD THIS
const actionRoutes = require('./routes/actionRoutes');

// Middleware
app.use(cors()); // Allows React to talk to this server
app.use(express.json()); // Allows server to read JSON data

// Apply Routes
app.use('/api/visitors', visitorRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notices', noticeRoutes);   
app.use('/api/payments', paymentRoutes); 
app.use('/api/actions', actionRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB!'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});