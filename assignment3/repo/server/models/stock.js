const mongoose = require("mongoose");
const validator = require("validator");
const { DateTime } = require("luxon");

let stock = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: true,
      unique: false,
      lowercase: false,
      validate: (value) => {
        return validator.isAscii(value);
      },
    },
    history: [
      {
        date: String,
        open: Number,
        high: Number,
        low: Number,
        close: Number,
        volume: Number,
      },
    ],
    createTime: {
      type: Date,
      required: true,
      unique: false,
      validate: (value) => {
        return validator.isDate(value);
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

stock.virtual("createTimeString").get(function () {
  return DateTime.fromJSDate(this.createTime).toLocaleString(
    DateTime.DATETIME_SHORT
  );
});

module.exports = mongoose.model("stock", stock);
