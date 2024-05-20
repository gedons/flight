// backend/routes/adminRoutes.js
const express = require('express');
const { getUsers, deleteUser, addFlight, updateFlight, deleteFlight, getBookings } = require('../controllers/adminController');
const { getCategories, addCategory, updateCategory, deleteCategory } = require('../controllers/flightCategoryController');
const { protect, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

// User management
router.route('/users').get(protect, admin, getUsers);
router.route('/users/:id').delete(protect, admin, deleteUser);

// Flight management
router.route('/flights')
    .post(protect, admin, addFlight)
    .get(protect, admin, getBookings);

router.route('/flights/:id')
    .put(protect, admin, updateFlight)
    .delete(protect, admin, deleteFlight);

// Booking management
router.route('/bookings').get(protect, admin, getBookings);

// Flight Category management
router.route('/categories')
    .get(protect, admin, getCategories)
    .post(protect, admin, addCategory);

router.route('/categories/:id')
    .put(protect, admin, updateCategory)
    .delete(protect, admin, deleteCategory);

module.exports = router;
