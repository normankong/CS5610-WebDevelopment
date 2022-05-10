const express = require("express");

const router = express.Router();

const apiHelper = require("../utils/apiHelper.js");

router.get("/", async function (req, res, next) {

  let result = await apiHelper.getMostActiveStock();
  res.header("Content-Type", "application/json");
  res.json(result);

});

module.exports = router;
