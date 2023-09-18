const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: { type: String },
  creator: {type: mongoose.Types.ObjectId, required: true, ref: 'User' }, // establish connecrion between two shemas
  worker: { type: String},
  date: { type: Number, required: true}, 
  customer: { type: String, required: true},
  status: { type: String},
  contact: {type: String, required: true},
  description: {type: String},
  streetAndHouse: {type: String},
  zipCode: {type: Number},
  city: {type: String},

});

module.exports = mongoose.model("Order", orderSchema);

