// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
 

dotenv.config();

connectDB();

const app = express();

const corsOptions = {
    //origin: 'https://www.daeds.uk', 
    origin: 'http://localhost:5173', 
    credentials: true,
  };

app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
