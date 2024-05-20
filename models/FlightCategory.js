// backend/models/FlightCategory.js
const mongoose = require('mongoose');

const flightCategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

const FlightCategory = mongoose.model('FlightCategory', flightCategorySchema);
module.exports = FlightCategory;
