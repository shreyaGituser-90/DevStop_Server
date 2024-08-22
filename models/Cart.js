const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  customerId: { type: String, default: null},
  id:{ type: String, default: null},
  name:{ type: String, default: null},
  desc: { type: String, default: null},
  cost: { type: Number, default: null},
  quantity: { type: Number, default: null},
  image: { type: String, default: null},
});

module.exports = mongoose.model("Carts", cartSchema);