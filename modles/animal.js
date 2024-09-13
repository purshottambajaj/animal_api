const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  species: { type: String, required: true },
  age: { type: Number, required: true }
});

module.exports = mongoose.model('Animal', animalSchema);
 
