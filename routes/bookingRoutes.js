// backend/routes/bookingRoutes.js
const express = require('express');
const { createBooking, getUserBookings } = require('../controllers/bookingController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/create').post(protect, createBooking);
router.route('/view').get(protect, getUserBookings);
 

module.exports = router;
