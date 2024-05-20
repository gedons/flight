// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const { protect, admin } = require('./middlewares/authMiddleware');
const User = require('./models/User');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);

// Admin management routes (example)
app.get('/api/users', protect, admin, async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
