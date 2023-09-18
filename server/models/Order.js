const mongoose = require("mongoose");

const orderShema = new mongoose.Schema({
  name: { type: String },
  date: { type: Number, required: true}, 
  worker: { type: String},
});

module.exports = mongoose.model("Order", orderShema);