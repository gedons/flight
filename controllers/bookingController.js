// backend/controllers/bookingController.js
const Booking = require('../models/Booking');
const Flight = require('../models/Flight');

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const { flightId, seats } = req.body;
    const flight = await Flight.findById(flightId);

    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    if (seats > flight.seatsAvailable) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    const totalPrice = seats * flight.price;

    const booking = new Booking({
      user: req.user._id,
      flight: flightId,
      seats,
      totalPrice,
    });

    flight.seatsAvailable -= seats;
    await flight.save();
    const createdBooking = await booking.save();
    
    res.status(201).json(createdBooking);
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking' });
  }
};

// Get all bookings for the logged-in user
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('flight');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings' });
  }
};

module.exports = { createBooking, getUserBookings };
