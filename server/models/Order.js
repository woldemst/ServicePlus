const mongoose = require("mongoose");

const orderShema = new mongoose.Schema({
  name: { type: String },
  date: { type: Number, required: true}, 
  worker: { type: String},
  password: { type: String, required: true },
});

module.exports = mongoose.model("Order", orderShema);