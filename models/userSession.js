const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  customerId: { type: String, default: null},
  accessToken: { type: String, default: null},
  accessTokenExpiry: {type: String, default: null},
});

module.exports = mongoose.model("CustomerSession", sessionSchema);