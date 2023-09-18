const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  orders: { type: mongoose.Types.ObjectId, required: true, ref: 'Order'} //ref: establish connection between two schemas
});

module.exports = mongoose.model("User", userSchema);