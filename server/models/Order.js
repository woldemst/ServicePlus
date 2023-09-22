const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: { type: String },
  // creator: {type: mongoose.Types.ObjectId, required: true, ref: 'User' }, // establish connecrion between two shemas
  creator: {type: String, required: true},
  worker: { type: String},
  date: { type: String, required: true}, 
  customer: { type: String, required: true},
  status: { type: String},
  contact: {type: String, required: true},
  description: {type: String},

});

module.exports = mongoose.model("Order", orderSchema);

