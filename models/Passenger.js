// backend/models/Passenger.js
const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  passportNumber: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
});

const Passenger = mongoose.model('Passenger', passengerSchema);
module.exports = Passenger;
