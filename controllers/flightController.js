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

// Search, filter, and sort flights
const searchFlights = async (req, res) => {
  try {
    const { departure, destination, departureDate, returnDate, sortBy, order } = req.query;

    let query = {};

    if (departure) {
      query.departure = { $regex: departure, $options: 'i' }; // Case-insensitive match
    }

    if (destination) {
      query.destination = { $regex: destination, $options: 'i' }; // Case-insensitive match
    }

    if (departureDate) {
      query.departureTime = { $gte: new Date(departureDate) };
    }

    if (returnDate) {
      query.arrivalTime = { $lte: new Date(returnDate) };
    }

    let sortCriteria = {};
    if (sortBy) {
      sortCriteria[sortBy] = order === 'desc' ? -1 : 1;
    }

    const flights = await Flight.find(query).populate('category').sort(sortCriteria);

    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: 'Error searching flights' });
  }
};

module.exports = { getAllFlights, getFlightById, searchFlights };
