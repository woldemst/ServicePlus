const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  customerNr: { type: String, required: true },
  organisation: { type: String, required: false },
  street: { type: String, required: true },
  houseNr: { type: String, required: true },
  zip: { type: String, required: true },
  place: { type: String, required: true },
  phone: { type: String, required: false },
  mobilePhone: { type: String, required: true },
  contact: { type: String, required: true },
  worker: { type: String, required: true },
  nextAppointment: { type: String, required: false },
  description: { type: String, required: false },
  // orders: { type: Array, required: false },

  // creator: { type: mongoose.Types.ObjectId, required: true, ref: 'Customer'}, //ref: establish connection between two schemas
  
});

module.exports = mongoose.model("Customer", customerSchema);


