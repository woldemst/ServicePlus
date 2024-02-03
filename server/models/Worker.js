const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema({
  firmId: { type: mongoose.Types.ObjectId, ref: 'Firm'}, //ref: establish connection between two schemas
  name: { type: String, required: true },
  email: { type: String, required: true },
  street: { type: String, required: true },
  houseNr: { type: String, required: true },
  zip: { type: String, required: true },
  place: { type: String, required: true },
  phone: { type: String, required: false },
  description: { type: String, required: false },
  // orders: { type: Array, required: false },

  
});

module.exports = mongoose.model("Worker", workerSchema);


