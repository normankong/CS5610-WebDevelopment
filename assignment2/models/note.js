const mongoose = require("mongoose");
const validator = require("validator");
const { DateTime } = require("luxon");

let note = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: false,
    lowercase: false,
    validate: (value) => {
      return validator.isEmail(value);
    },
  },
  desc: {
    type: String,
    required: true,
    unique: false,
    lowercase: false,
    validate: (value) => {
      return validator.isAscii(value);
    },
  },
  subject: {
    type: String,
    required: true,
    unique: false,
    lowercase: false,
    validate: (value) => {
      return validator.isAscii(value);
    },
  },
  location: {
    type: String,
    required: true,
    unique: false,
    lowercase: false,
    validate: (value) => {
      return validator.isAscii(value);
    },
  },
  expiryTime: {
    type: Date,
    required: true,
    unique: false,
    validate: (value) => {
      return validator.isDate(value);
    },
  },
  createTime: {
    type: Date,
    required: true,
    unique: false,
    validate: (value) => {
      return validator.isDate(value);
    },
  }
});


note.virtual('expiryTimeString')
.get(function () {
  return DateTime.fromJSDate(this.expiryTime).toLocaleString(DateTime.DATETIME_SHORT);
});

note.virtual('createTimeString')
.get(function () {
  return DateTime.fromJSDate(this.createTime).toLocaleString(DateTime.DATETIME_SHORT);
});

module.exports = mongoose.model("Note", note);
