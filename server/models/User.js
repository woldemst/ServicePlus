const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  admin: { type: Boolean },
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firmId: {type: mongoose.Types.ObjectId, required: false, ref: 'Firm'},
  // orders: { type: mongoose.Types.ObjectId, ref: 'Order'} //ref: establish connection between two schemas
});

module.exports = mongoose.model("User", userSchema);