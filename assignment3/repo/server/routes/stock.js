const express = require("express");
const { param, validationResult } = require("express-validator");
const moment = require("moment");

const router = express.Router();

const Stock = require("../models/stock.js");
const apiHelper = require("../utils/apiHelper.js");

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

    let symbol= req.params.symbol

    let stock = await Stock.findOne({ symbol }).exec();
    if (stock == null) {
      stock = await createNewStock(symbol);
    };

    // Fetch Stock History (Caching to save trigger count)
    const today = getLastTradingDate();
    let isRefresh = (stock.history.length == 0 || stock.history[0].date !== today)
    if (isRefresh) {
      console.log("Fetching Stock History")
      let history = await apiHelper.getStockHistory(symbol);
      stock.history = history;
      await stock.save();
    }

    console.log("Get Stock Real Time Info");
    let quote = await apiHelper.getStockInfo(symbol);

    let data = stock["_doc"];
        data.quote = quote;
    res.header("Content-Type", "application/json");
    res.status(200).json(data);
  }
);

router.get("/",  async (req, res, next) => {
    let data = await apiHelper.getETFInfo();
    res.header("Content-Type", "application/json");
    res.status(200).json(data);
  }
);

function getLastTradingDate(){
  return moment(new Date()).format("YYYY-MM-DD");
}

const createNewStock = async (symbol) => {

  let newStock = new Stock({
    symbol,
    data : [],
    createTime: new Date(),
  });

  let result = await newStock.save();
    return result;
};

module.exports = router;
