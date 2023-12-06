
const mongoose = require("mongoose");

const firmSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  street: { type: String, required: true },
  houseNr: { type: String, required: true },
  zip: { type: String, required: true },
  place: { type: String, required: true }, 
  phone: { type: String, required: true },
  website: { type: String, required: true }, 
});

module.exports = mongoose.model("Firm", firmSchema);