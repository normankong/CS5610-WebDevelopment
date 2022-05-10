require("./utils/database.js");
const moment = require("moment");

const Portfolio = require("./models/portfolio.js");
const apiHelper = require("./utils/apiHelper.js");

async function main() {
  let dataList = await Portfolio.find().exec();
  for (let data of dataList) {
    console.log(`Revaluating : ${data.email}`);

    let holdingHash = [];
    let stockList = [];
    let prevDate = null;
    let transactions = data.transactions.sort((a, b) => {
      return moment(a.date) - moment(b.date);
    });

    for (let transaction of transactions) {
      let symbol = transaction.symbol;
      let quantity = transaction.quantity;
      let action = transaction.action;
      let date = moment(transaction.date).format("YYYY-MM-DD");

      if (holdingHash[date] === undefined && prevDate === null) {
        holdingHash[date] = [];
      } else {
        holdingHash[date] = clonedeep(holdingHash[prevDate]);
      }
      if (holdingHash[date][symbol] === undefined) {
        holdingHash[date][symbol] = 0;
      }
      if (!stockList.includes(symbol)) {
        stockList.push(symbol);
      }

      holdingHash[date][symbol] += action == "Buy" ? quantity : -quantity;
      prevDate = date;
    }
    console.log(stockList);

    await calculateMarketValue(data, stockList, holdingHash);

    // Update to database
    data.save(function (err, result) {
        if (err) console.log(`Error : ${err}`);
        console.log(`Saved for portfolio : ${result.email}`);
    });
    
  }
}

async function calculateMarketValue(data, stockList, holdingHash) {
  let totalMktValue = [];
  for (let symbol of stockList) {
    let history = await apiHelper.getStockHistory(symbol, 9);

    for (let i = 0; i < history.length; i++) {
      let date = history[i].date;
      let price = history[i].close;
      let holding = getHolding(holdingHash, date, symbol);
      if (holding === null) continue;
      let mktValue = parseFloat((price * holding).toFixed(2));

      console.log(`${symbol} : ${date} : ${price} : ${holding} : ${mktValue}`);

      // Initialize the date if it's the first time
      if (totalMktValue[date] === undefined) {
        totalMktValue[date] = 0;
      }
      totalMktValue[date] += mktValue;
    }
  }

  data.historical = [];
  for (let key in totalMktValue) {
    let currentAUM = { date: key, price: Math.round(totalMktValue[key]) };
    console.log(currentAUM);
    data.historical.push(currentAUM);
  }
}

function getHolding(holdingHash, date, symbol) {
  let tmpHolding = null;
  for (let key in holdingHash) {
    // Save the previous holding for fallback
    if (key <= date) {
      tmpHolding = holdingHash[key][symbol];
    }
    // Exact Match
    if (key == date) {
      return holdingHash[key][symbol];
    }
  }
  return tmpHolding;
}

function clonedeep(list) {
  let result = [];
  for (let symbol in list) {
    result[symbol] = list[symbol];
  }
  return result;
}

main();
