// backend/models/Flight.js
const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true, unique: true },
  departure: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'FlightCategory', required: true },
  destination: { type: String, required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  price: { type: Number, required: true },
  seatsAvailable: { type: Number, required: true },
});

const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;
