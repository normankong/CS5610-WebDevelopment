const mongoose = require("mongoose");
const { DateTime } = require("luxon");

let recommendation = new mongoose.Schema(
  {
    symbol : String,
    name : String,
    text : String,
    createTime : Date
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

recommendation.virtual("createTimeString").get(function () {
  return DateTime.fromJSDate(this.createTime).toLocaleString(
    DateTime.DATETIME_SHORT
  );
});

module.exports = mongoose.model("Recommendation", recommendation);
