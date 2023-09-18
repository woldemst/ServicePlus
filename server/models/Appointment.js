const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  name: { type: String },
  worker: { type: String, required: true },
  order: { type: mongoose.Types.ObjectId, required: true, ref: 'Order'}, //ref: establish connection between two schemas
  date: { type: String, required: true },
  time: { type: String, required: true },
  customer: { type: String, required: true },
  // customer: { type: mongoose.Types.ObjectId, required: true, ref: 'Customer'}, //ref: establish connection between two schemas
  status: { type: String, required: true },
  description: { type: String, required: true },
  creator: { type: String, required: true },
  // creator: { type: mongoose.Types.ObjectId, required: true, ref: 'Customer'}, //ref: establish connection between two schemas
  
});

module.exports = mongoose.model("Appointment", appointmentSchema);



 