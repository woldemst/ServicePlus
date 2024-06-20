const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  firmId: { type: mongoose.Types.ObjectId, ref: 'Firm'}, //ref: establish connection between two schemas
  name: { type: String, required: true },
  orders: [{type: mongoose.Types.ObjectId, required: false, ref: 'Order'}],
  email: { type: String, required: true },
  // customerNr: { type: String, required: false },
  organisation: { type: String, required: false },
  street: { type: String, required: true },
  houseNr: { type: String, required: true },
  zip: { type: String, required: true },
  place: { type: String, required: true },
  phone: { type: String, required: false },
  contact: { type: String, required: false },
  worker: { type: String, required: false },
  nextAppointment: { type: String, required: false },
  website: { type: String, required: false },
  description: { type: String, required: false },
  profileImg: { data: Buffer, contentType: String },


  // creator: { type: mongoose.Types.ObjectId, required: true, ref: 'Customer'}, //ref: establish connection between two schemas
  
});

module.exports = mongoose.model("Customer", customerSchema);


