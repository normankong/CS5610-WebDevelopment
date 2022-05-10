const fs = require("fs");
const util = require("util");

// Activity 1a - Write File Asynchronize
fs.writeFile("async.txt", "This is my first file", "utf8", function (err) {
    // Read File Asynchronize
  fs.readFile("async.txt", "utf8", function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    console.log(data);
  });
});

// Activity 1b - Read/Write File using promises
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
writeFile("promise.txt", "Write in Promise.txt", "utf8")
  .then(() => readFile("promise.txt", "utf8"))
  .then((result) => console.log(result))
  .catch((error) => {
    // Handle error in Write / Read
    console.log("Some Write error");
  });

// Activity 2 - Logger Module
const logger = require ('./logger.js');
logger.log("Testing Logger");