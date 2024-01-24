
const mongoose = require("mongoose");

const firmSchema = new mongoose.Schema({
  ownerName: { type: String, required: false},
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  street: { type: String, required: true },
  houseNr: { type: String, required: true },
  zip: { type: String, required: true },
  place: { type: String, required: true }, 
  phone: { type: String, required: true },
  website: { type: String, required: true }, 
  // customer: { type: mongoose.Types.ObjectId, required: true, ref: 'Customer'}, //ref: establish connection between two schemas
  workers: [{type: mongoose.Types.ObjectId, required: false, ref: 'Worker'}],
  userId: {type: mongoose.Types.ObjectId, required: false, ref: 'User'}

});

module.exports = mongoose.model("Firm", firmSchema);