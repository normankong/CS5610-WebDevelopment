const mongoose = require("mongoose");
const validator = require("validator");
const { DateTime } = require("luxon");

let structure = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: false,
      lowercase: false,
      validate: (value) => {
        return validator.isEmail(value);
      },
    },
    createTime: {
      type: Date,
      required: true,
      unique: false,
      validate: (value) => {
        return validator.isDate(value);
      },
    },

    transactions: [
      {
        symbol: {
          type: String,
          required: true,
          unique: false,
          validate: (value) => {
            return validator.isAscii(value);
          },
        },
        action: {
          type: String,
          required: true,
          unique: false,
          validate: (value) => {
            return validator.isAscii(value);
          },
        },
        price: Number,
        quantity: Number,
        date: Date,
      },
    ],
    historical: [{ date: Date, price: Number }],
    portfolios: [
      {
        symbol: {
          type: String,
          required: true,
          unique: false,
          validate: (value) => {
            return validator.isAscii(value);
          },
        },
        holding: Number,
        avgCost: Number,
        mktValue: Number,
        pnlAmt: Number,
        pnlPerc: Number,
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

structure.virtual("createTimeString").get(function () {
  return DateTime.fromJSDate(this.createTime).toLocaleString(
    DateTime.DATETIME_SHORT
  );
});

module.exports = mongoose.model("Portfolio", structure);
