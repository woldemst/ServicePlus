const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema({
  firmId: { type: mongoose.Types.ObjectId, ref: 'Firm' }, //ref: establish connection between two schemas
  appointments: [{ type: mongoose.Types.ObjectId, ref: 'Appointment' }],
  name: { type: String },
  email: { type: String },
  password: { type: String },
  street: { type: String },
  houseNr: { type: String },
  zip: { type: String },
  place: { type: String },
  phone: { type: String },
  description: { type: String },
  // orders: { type: Array, required: false },
  profileImg: { data: Buffer, contentType: String },


});

module.exports = mongoose.model("Worker", workerSchema);


