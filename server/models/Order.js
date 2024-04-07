const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  firmId: { type: mongoose.Types.ObjectId, ref: 'Firm' }, //ref: establish connection between two schemas
  appointments: [{ type: mongoose.Types.ObjectId, ref: 'Appointment' }], //ref: establish connection between two schemas
  customerId: { type: mongoose.Types.ObjectId, ref: 'Customer' }, //ref: establish connection between two schemas
  c_name: { type: String },
  name: { type: String },
  street: { type: String },
  houseNr: { type: String },
  zip: { type: String },
  place: { type: String },
  // creator: {type: mongoose.Types.ObjectId, required: true, ref: 'User' }, // establish connecrion between two shemas
  // creator: {type: String},
  worker: { type: String },
  // date: { type: String}, 
  // customer: { type: String },
  // status: { type: String},
  contact: { type: String },
  description: { type: String },

});

module.exports = mongoose.model("Order", orderSchema);

