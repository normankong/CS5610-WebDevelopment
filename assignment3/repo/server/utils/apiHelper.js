"use strict";

require("dotenv").config();

const MOCK_API = "true"===process.env.MOCK_API;
const fetch = require("node-fetch");
const jwt_decode = require("jwt-decode");
const FMP_API_KEY_LIST=process.env.FINANCIAL_MODEL_API_KEY.split(",");
const SLEEP_TIME=parseInt(process.env.SLEEP_TIME, 10);

class ApiHelper {

  _apiCounter = 0;

  /**
   * Get User Info from JWT
   */
  getUserInfo = async (token) => {
    var decoded = jwt_decode(token);
    let url = decoded.aud[1];

    let json = await this._fetch(url, {
      method: "GET",
      headers: this._getHeader(token),
    });

    return json;
  };

  /**
   * Get Stock Info
   */
  getStockInfo = async (symbol) => {

    if (MOCK_API) return require('../mock/getStockInfo.json')

    let apiKey = this._getFMPAPIKey();
    let url = `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${apiKey}`;

    let json = await this._fetch(url, {
      method: "GET",
      headers: this._getHeader(),
    });

    return json;
  };

  /**
   * Get Stock History
   */
  getStockHistory = async (symbol, limit = 30) => {
    let json = null;
    if (MOCK_API) {
      let tmp = require('../mock/getStockHistory.json');
      json = tmp.slice(0);
    } 
    else {
      let apiKey = this._getFMPAPIKey();
      let url = `https://financialmodelingprep.com/api/v3/technical_indicator/daily/${symbol}?apikey=${apiKey}`;

      json = await this._fetch(url, {
        method: "GET",
        headers: this._getHeader(),
      });
    }

    let list = this._splice(json, 0, limit);

    list.reverse();

    // console.log(list)

    return list;
  }

  /**
   * Get ETF Info
   */
  getETFInfo = async (symbol, limit = 20) => {

    if (MOCK_API) return require('../mock/getETFInfo.json')

    let apiKey = this._getFMPAPIKey();
    let url = `https://financialmodelingprep.com/api/v3/etf/list?apikey=${apiKey}`;

    let json = await this._fetch(url, {
      method: "GET",
      headers: this._getHeader(),
    });

    
    return this._splice(json, 0, limit);
  }

  getTwitterInfo = async (symbol, limit = 3) => {
    let url = `https://api.twitter.com/2/tweets/search/recent?max_results=10&tweet.fields=text,author_id&query=${symbol}%20is:verified%20lang:en`;

    let json = await this._fetch(url, {
      method: "GET",
      headers: this._getHeader(`Bearer ${process.env.TWITTER_BEARER_TOKEN}`),
    });

    return json.data.splice(0, limit);
  }

  getTwitterUser = async (idList) => {

    let ids = idList.join(",");

    let url = `https://api.twitter.com/2/users?ids=${ids}`;

    let json = await this._fetch(url, {
      method: "GET",
      headers: this._getHeader(`Bearer ${process.env.TWITTER_BEARER_TOKEN}`),
    });

    return json.data;
  }
  

  getMostActiveStock = async (limit = 2) => {

    if (MOCK_API) return require('../mock/getMostActiveStock.json')
    let apiKey = this._getFMPAPIKey();
    let url = `https://financialmodelingprep.com/api/v3/stock_market/actives?apikey=${apiKey}`;

    let json = await this._fetch(url, {
      method: "GET",
      headers: this._getHeader()
    });

    let result = this._splice(json, 0, limit);

    return result;
  }

  /**
   * Utility Function
   */

  _getHeader = (token) => {
    var myHeaders = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Authorization: `${token}`,
    };
    return myHeaders;
  };

  _fetch = async (url, options) => {
    console.log(`Request  : ${url}`);
    // console.log(`Options  : ${JSON.stringify(options)}`);
    const response = await fetch(url, options);
    const json = await response.json();
    // console.log(`Response :`);
    // console.table(json);

    this._sleep();
    return json;
  };

  _splice = (json, start, end) => {

    if (Object.prototype.toString.call(json) === '[object Array]'){
      return json.splice(start, end);
    }
    else{
      console.log(`Error: ${json} is not an array`);
      console.log(json);
      return json;
    }
  }

  _sleep = (ms = SLEEP_TIME) =>{
    console.log(`Manual sleep for ${ms} ms`);
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }


  _getFMPAPIKey = () => {
    return FMP_API_KEY_LIST[this._apiCounter++ % FMP_API_KEY_LIST.length];
  }


}
module.exports = new ApiHelper();
