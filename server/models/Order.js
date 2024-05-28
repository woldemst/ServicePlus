const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  firmId: { type: mongoose.Types.ObjectId, ref: 'Firm' }, //ref: establish connection between two schemas
  customerId: { type: mongoose.Types.ObjectId, ref: 'Customer' }, //ref: establish connection between two schemas
  appointments: [{ type: mongoose.Types.ObjectId, ref: 'Appointment' }], //ref: establish connection between two sche
 
  c_name: { type: String },
  name: { type: String },
  street: { type: String },
  houseNr: { type: String },
  zip: { type: String },
  place: { type: String },
  // creator: {type: mongoose.Types.ObjectId, required: true, ref: 'User' }, // establish connecrion between two shemas
  // creator: {type: String},
  // date: { type: String}, 
  status: { type: String},
  // archived: { type: Boolean},
  contact: { type: String },
  description: { type: String },
});

module.exports = mongoose.model("Order", orderSchema);

