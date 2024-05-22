// backend/controllers/bookingController.js
const Booking = require('../models/Booking');
const Flight = require('../models/Flight');
const Passenger = require('../models/Passenger');

// Select Seats
const selectSeats = async (req, res) => {
  const { flightId, seatNumbers } = req.body;
  try {
    const flight = await Flight.findById(flightId);
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    // Check if seats are available
    const unavailableSeats = seatNumbers.filter(seat => !flight.seatsAvailable.includes(seat));
    if (unavailableSeats.length > 0) {
      return res.status(400).json({ message: 'Some seats are not available', unavailableSeats });
    }
    res.status(200).json({ message: 'Seats available' });
  } catch (error) {
    res.status(500).json({ message: 'Error selecting seats' });
  }
};

// Enter Passenger Details
const enterPassengerDetails = async (req, res) => {
  const { passengers } = req.body;
  try {
    const passengerDocs = await Passenger.insertMany(passengers);
    res.status(201).json(passengerDocs);
  } catch (error) {
    res.status(500).json({ message: 'Error entering passenger details' });
  }
};

// Confirm and Complete Booking
const confirmBooking = async (req, res) => {
  const { userId, flightId, passengerIds, seatNumbers, totalPrice } = req.body;
  try {
    const booking = new Booking({
      user: userId,
      flight: flightId,
      passengers: passengerIds,
      seatNumbers,
      totalPrice,
    });
    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);
  } catch (error) {
    res.status(500).json({ message: 'Error confirming booking' });
  }
};

// View Booking Confirmation
const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'name email')
      .populate('flight')
      .populate('passengers');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching booking' });
  }
};

module.exports = {
  selectSeats,
  enterPassengerDetails,
  confirmBooking,
  getBooking,
};
