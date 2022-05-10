const express = require("express");
const { param, body, validationResult } = require("express-validator");
// const fs = require("fs");
// const jwt = require("express-jwt");

const router = express.Router();
// const publicKey = fs.readFileSync("./key/public.key", "utf8");

const Note = require("../models/note.js");

// router.use(
//   jwt({ secret: publicKey, algorithms: ["RS256"] })
// );

router.post(
  "/",
  body("email").isLength({ min: 5 }).trim().withMessage("Email is required"),
  body("subject")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Subject is required"),
  body("desc")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Description is required"),
  body("location")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Location is required"),
  body("expiryTime")
    .isLength({ min: 10 })
    .trim()
    .withMessage("Expiry Time is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let note = new Note({
      email: req.body.email,
      subject: req.body.subject,
      desc: req.body.desc,
      location: req.body.location,
      expiryTime: req.body.expiryTime,
      createTime: new Date(),
    });

    note.save(function (err, result) {
      if (err || result == null)
        return handleError("Fail to save note", err, res);

      res.header("Content-Type", "application/json");
      res.status(201).json(result);
    });
  }
);

router.put(
  "/:id",
  param("id").isLength({ min: 5 }).trim().withMessage("ID is required"),
  body("email").isLength({ min: 5 }).trim().withMessage("Email is required"),
  body("subject")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Subject is required"),
  body("desc")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Description is required"),
  body("location")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Location is required"),
  body("expiryTime")
    .isLength({ min: 10 })
    .trim()
    .withMessage("Expiry Time is required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    Note.findOne({ _id: req.params.id }).exec(function (err, result) {
      if (err || result == null) handleError("Fail to select note", err, res);

      if (result.email !== req.body.email) {
        return res.status(403).end("You are not the owner of this note");
      }

      // Update the Field
      result.subject = req.body.subject;
      result.desc = req.body.desc;
      result.location = req.body.location;
      result.expiryTime = req.body.expiryTime;

      result.save(function (err, result) {
        if (err) return handleError("Fail to update note", err, res);

        res.header("Content-Type", "application/json");
        res.status(200).json(result);
      });
    });
  }
);

router.get("/", function (req, res, next) {
  Note.find({})
    .sort({ createTime: -1 })
    .exec(function (err, result) {
      if (err) return handleError("Fail to list all note", err, res);

      res.render("note", { notes: result });
    });
});

router.delete(
  "/:id",
  param("id").isLength({ min: 5 }).trim().withMessage("ID is required"),
  body("email").isLength({ min: 5 }).trim().withMessage("Email is required"),

  (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    Note.findOne({ _id: req.params.id }).exec(function (err, result) {
      if (err || result == null) handleError("Fail to select note", err, res);

      if (result.email !== req.body.email) {
        return res.status(403).end("You are not the owner of this note");
      }

      // Delete note
      result.delete(function (err, result) {
        if (err || result == null)
          return handleError("Fail to delete note" , err, res);

        res.header("Content-Type", "application/json");
        res.status(200).json(result);
      });
    });
  }
);

const handleError = (message, err, res) => {
  console.log(err);
  res.end(message);
  return;
};

module.exports = router;
