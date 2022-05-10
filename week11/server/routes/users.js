var express = require("express");
var router = express.Router();
var db = require("../db");

router.get("/", function (req, res, next) {
  res.send("<h1>List of all the users</h1>");
});

router.post("/:name/:surname", function (req, res, next) {
  db.insertRecord("cs5610", "users", {
    name: req.params.name,
    surname: req.params.surname,
  });
  res.send(`Record required ! : ${req.params.name} ${req.params.surname}`);
});

router.post("/", function (req, res, next) {
  let data = req.body;
  db.insertRecord("cs5610", "users", data).then((result) => {
    // res.send(`Record required ! ${JSON.stringify(data)}`);
    res.render('result', 
    { title: req.query.title, operation: 'POST', result: JSON.stringify(data)});
  });
});

router.get("/:name/:surname", function (req, res, next) {
  db.selectRecord("cs5610", "users", {
    name: req.params.name,
    surname: req.params.surname,
  }).then((result) => {
    res.send(
      `Nice to meet you ${req.params.name} ${
        req.params.surname
      } with result ${JSON.stringify(result)}`
    );
  });
});

router.get("/:name", function (req, res, next) {
  db.selectRecords("cs5610", "users", {
    name: req.params.name,
  }).then((result) => {
    res.send(
      `Nice to meet you ${req.params.name} with result ${JSON.stringify(
        result
      )}`
    );
  });
});

router.delete("/:name/:surname", function (req, res, next) {
  db.deleteRecord("cs5610", "users", {
    name: req.params.name,
    surname: req.params.surname,
  }).then((result) => {
    res.send(
      `Record has been delete ${req.params.name} with result ${JSON.stringify(
        result
      )}`
    );
  });
});

module.exports = router;
