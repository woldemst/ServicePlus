const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  workerNr: { type: String, required: false },
  street: { type: String, required: true },
  houseNr: { type: String, required: true },
  zip: { type: String, required: true },
  place: { type: String, required: true },
  phone: { type: String, required: false },
  mobilePhone: { type: String, required: false },
  description: { type: String, required: false },
  // orders: { type: Array, required: false },

  // creator: { type: mongoose.Types.ObjectId, required: true, ref: 'Customer'}, //ref: establish connection between two schemas
  
});

module.exports = mongoose.model("Worker", workerSchema);


