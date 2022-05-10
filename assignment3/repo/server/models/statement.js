const mongoose = require("mongoose");

let statement = new mongoose.Schema(
  {
    symbol: String
  }
);

module.exports = mongoose.model("statement", statement);
