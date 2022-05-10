"use strict";

require("dotenv").config();

const mongoose = require("mongoose");

let uri =`mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOSTNAME}/${process.env.DATABASE}?retryWrites=true&w=majority`;

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose
      .connect(uri)
      .then(() => {
        console.log("Database connection successful");
      })
      .catch((err) => {
        console.error("Database connection error");
      });
  }
}
module.exports = new Database();
