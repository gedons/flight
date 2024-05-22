// backend/controllers/adminController.js
const User = require('../models/User');
const Flight = require('../models/Flight');
const Booking = require('../models/Booking');

// Manage Users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {    
      res.json({ message: 'User removed' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};

// Manage Flight
const getFlights = async (req, res) => {
  try {
    const flights = await Flight.find({}).populate('category');
    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching flights' });
  }
};

const addFlight = async (req, res) => {
  try {
    const { flightNumber, departure, destination, departureTime, arrivalTime, price, seatsAvailable, category } = req.body;
    const flight = new Flight({ flightNumber, departure, destination, departureTime, arrivalTime, price, seatsAvailable, category });
    const createdFlight = await flight.save();
    res.status(201).json(createdFlight);
  } catch (error) {
    res.status(500).json({ message: 'Error adding flight', error: error.message });
  }
};

const updateFlight = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (flight) {
      flight.flightNumber = req.body.flightNumber || flight.flightNumber;
      flight.departure = req.body.departure || flight.departure;
      flight.destination = req.body.destination || flight.destination;
      flight.departureTime = req.body.departureTime || flight.departureTime;
      flight.arrivalTime = req.body.arrivalTime || flight.arrivalTime;
      flight.price = req.body.price || flight.price;
      flight.seatsAvailable = req.body.seatsAvailable || flight.seatsAvailable;
      flight.category = req.body.category || flight.category;

      const updatedFlight = await flight.save();
      res.json(updatedFlight);
    } else {
      res.status(404).json({ message: 'Flight not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating flight' });
  }
};

const deleteFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndDelete(req.params.id);     
    if (flight) {    
      res.json({ message: 'Flight removed' });
    } else {
      res.status(404).json({ message: 'Flight not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting flight' });
  }
};

// View Bookings
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({}).populate('user').populate('flight');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings' });
  }
};

module.exports = {
  getUsers,
  deleteUser,
  getFlights,
  addFlight,
  updateFlight,
  deleteFlight,
  getBookings,
};
