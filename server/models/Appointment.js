const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  orderId: { type: mongoose.Types.ObjectId, required: false, ref: 'Order' }, //ref: establish connection between two schemas
  // worker: { type: mongoose.Types.ObjectId, required: false, ref: 'Worker' }, //ref: establish connection between two schemas
  // customer: { type: mongoose.Types.ObjectId, required: false, ref: 'Customer' }, //ref: establish connection between two schemas
  // order: { type: String },
  worker: { type: String },
  customer: { type: String },
  // name: { type: String },
  // status: { type: String },
  date: { type: String },
  startTime: { type: String },
  finishTime: { type: String },
  description: { type: String },

});

module.exports = mongoose.model("Appointment", appointmentSchema);



