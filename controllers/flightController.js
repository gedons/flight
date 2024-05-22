// backend/controllers/flightController.js
const Flight = require('../models/Flight');

// Get all flights
const getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.find({}).populate('category');
    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching flights' });
  }
};

// Get a single flight by ID
const getFlightById = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id).populate('category');
    if (flight) {
      res.json(flight);
    } else {
      res.status(404).json({ message: 'Flight not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching flight details' });
  }
};

module.exports = { getAllFlights, getFlightById };
