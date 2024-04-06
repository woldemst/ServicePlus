const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  firmId: { type: mongoose.Types.ObjectId, ref: 'Firm' }, //ref: establish connection between two schemas
  orderId: { type: mongoose.Types.ObjectId, required: false, ref: 'Order' }, //ref: establish connection between two schemas
  customerId: { type: mongoose.Types.ObjectId, required: false, ref: 'Customer' }, //ref: establish connection between two schemas
  // worker: { type: mongoose.Types.ObjectId, required: false, ref: 'Worker' }, //ref: establish connection between two schemas
  // order: { type: String },
  worker: { type: String },
  // customer: { type: String },
  // name: { type: String },
  // status: { type: String },
  c_street: { type: String },
  c_houseNr: { type: String },
  c_zip: { type: String },
  c_place: { type: String },
  o_name: { type: String },
  date: { type: String },
  time: { type: String },
  description: { type: String },

});

module.exports = mongoose.model("Appointment", appointmentSchema);



