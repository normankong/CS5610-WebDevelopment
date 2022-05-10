const express = require("express");
const { param, body, validationResult } = require("express-validator");
const Statement = require("../models/statement.js");

const router = express.Router();

router.get(
  "/:symbol",
  param("symbol")
    .isLength({ min: 1, max: 20 })
    .trim()
    .withMessage("Symbol is required"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    console.log(`Searching for ${req.params.symbol}`);
    let symbol= req.params.symbol
    const data = await Statement.find({symbol: {$regex: symbol, $options: 'i'}}).limit(20);
    res.header("Content-Type", "application/json");
    res.status(200).json(data);
  }
);

module.exports = router;
