// backend/routes/flightRoutes.js
const express = require('express');
const { getAllFlights, getFlightById, searchFlights  } = require('../controllers/flightController');

const router = express.Router();

router.route('/').get(getAllFlights);
router.route('/search').get(searchFlights); 
router.route('/:id').get(getFlightById);

module.exports = router;
