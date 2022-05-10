const express = require("express");
const { checkJWT } = require("../utils/checkJWT.js");
const ApiHelper = require("../utils/apiHelper.js");

const router = express.Router();

const Portfolio = require("../models/portfolio.js");
const apiHelper = require("../utils/apiHelper.js");

router.get("/", checkJWT, async function (req, res, next) {
  // Token must be present after checkJWT
  let userInfo = await ApiHelper.getUserInfo(req.headers.authorization);
  let email = userInfo.email;

  // Get Portfolio 
  let result = await Portfolio.findOne({ email }).lean().exec();
  if (result == null){
    // Create new Portfolio if not exist
    result = await createNewPortfolio(email);
  }

  // Update Mark to Market Information
  await updateMarketValue(result);

  // Return to caller
  res.header("Content-Type", "application/json");
  res.status(200).json(result);
});

router.post("/", checkJWT, async function (req, res, next) {
  // Token must be present after checkJWT
  let userInfo = await ApiHelper.getUserInfo(req.headers.authorization);
  let email = userInfo.email;

  Portfolio.findOne({ email }).exec(function (err, data) {
    if (err || data == null) {
      return handleError("Fail to select portfolio", err, res);
    }

    // Update Transaction
    if (data.transactions == null) {
      data.transactions = [];
    }
    let newTransaction = {
      action: req.body.action,
      date: req.body.date,
      price: parseFloat(req.body.price),
      quantity: parseFloat(req.body.quantity),
      symbol: req.body.symbol,
    };

    data.transactions.push(newTransaction);

    // Update Portfolio
    if (data.portfolios == null) {
      data.portfolios = [];
    }
    let stockPortfolio = data.portfolios.filter(
      (item) => item.symbol == req.body.symbol
    );

    // New Stock Portfolio
    if (stockPortfolio.length == 0) {
      let newPortfolio = {
        symbol: req.body.symbol,
        holding: parseFloat(req.body.quantity),
        avgCost: parseFloat(req.body.price),
      };
      data.portfolios.push(newPortfolio);
    } else {

      // Update Stock Portfolio 
      let index = data.portfolios.indexOf(stockPortfolio[0]);
      let sign = req.body.action == "Buy" ? 1 : -1;
      let txnQuantity = parseFloat(req.body.quantity);
      let txnPrice = parseFloat(req.body.price);
      let txnAmount = txnQuantity * txnPrice;
      let finalQuantity = data.portfolios[index].holding + (txnQuantity * sign);
      if (finalQuantity == 0) {
        data.portfolios.splice(index, 1);
      }
      else{
        data.portfolios[index].avgCost = Math.round(((data.portfolios[index].avgCost * data.portfolios[index].holding) + (txnAmount * sign)) / finalQuantity);
        data.portfolios[index].holding = finalQuantity;
      }
    }

    // Update to database
    data.save(function (err, result) {
      if (err) return handleError("Fail to update note", err, res);

      res.header("Content-Type", "application/json");
      res.status(200).json(result);
    });
  });
});

const handleError = (message, err, res) => {
  console.log(`Error : ${err}`);
  res.end(message);
  return;
};

const createNewPortfolio = async (email) => {

  let newPortfolio = new Portfolio({
    email,
    historical: [],
    portfolios: [],
    transactions: [],
    createTime: new Date(),
  });

  let result = await newPortfolio.save();
  return result;
};

const updateMarketValue = async (data) => {

  let totalMktValue = 0;
  for (let i = 0; i < data.portfolios.length; i++) {
    let portfolio = data.portfolios[i];
    let symbol = portfolio.symbol;
    let holding = portfolio.holding;
    let avgCost = portfolio.avgCost;

    let stock = await apiHelper.getStockInfo(symbol);
    let stockInfo = stock[0];
    let price = stockInfo?.price;
    let name = stockInfo?.name;
    let mktValue = holding * price;
    let pnlAmt = mktValue - (holding * avgCost);
    let pnlPerc = (pnlAmt / (holding * avgCost)) * 100;

    portfolio.stock = stock;
    portfolio.name = name;
    portfolio.pnlPerc = pnlPerc.toFixed(2);
    portfolio.mktValue = mktValue.toFixed(2);
    portfolio.pnlAmt = pnlAmt.toFixed(2);
    portfolio.price = price.toFixed(2);
    totalMktValue += mktValue;
  }

  let currentAUM = { date : new Date(), price : Math.round(totalMktValue)};
  data.historical.push(currentAUM);
};

module.exports = router;
