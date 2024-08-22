const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: { type: String, default: null},
  email: { type: String, default: null},
  address: { type: String, default: null},
  phoneNumber: { type: String, default: null},
  password: { type: String, default: null},
  orders: {type: Array, default: []},
  cart: {type: Array, default: []},
});

module.exports = mongoose.model("Customer", customerSchema);