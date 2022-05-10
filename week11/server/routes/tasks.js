var express = require("express");
var {ObjectId} = require("mongodb");
var router = express.Router();
var db = require("../db");

const {checkJWT} = require('../checkJWT.js');

// router.get("/", function (req, res, next) {
//   res.send("<h1>List of all the tasks</h1>");
// });

// router.post("/:name/:surname", function (req, res, next) {
//   db.insertRecord("cs5610", "tasks", {
//     name: req.params.name,
//     surname: req.params.surname,
//   });
//   res.send(`Record required ! : ${req.params.name} ${req.params.surname}`);
// });

// router.all("/*", checkJWT);

router.post("/", function (req, res, next) {
  let data = req.body;
  db.insertRecord("cs5610", "tasks", data).then((result) => {
    console.log(result)
    res.json({_id : result.insertedId});
    // res.send(`Record required ! ${JSON.stringify(data)}`);
    // res.render('result', 
    // { title: req.query.title, operation: 'POST', result: JSON.stringify(data)});
  });
});

router.get("/",  function (req, res, next) {
  db.selectRecords("cs5610", "tasks", {
  }).then((result) => {
    res.json(result)
  });
});

// router.get("/:name", function (req, res, next) {
//   db.selectRecords("cs5610", "tasks", {
//     name: req.params.name,
//   }).then((result) => {
//     res.send(
//       `Nice to meet you ${req.params.name} with result ${JSON.stringify(
//         result
//       )}`
//     );
//   });
// });

router.delete("/:id", checkJWT, function (req, res, next) {
  console.log(req.params.id)
  db.deleteRecord("cs5610", "tasks", {
    _id: ObjectId(req.params.id),
  }).then((result) => {
    res.json(result);
    // res.send(
    //   `Record has been delete ${req.params.name} with result ${JSON.stringify(
    //     result
    //   )}`
    // );
  });
});

module.exports = router;
