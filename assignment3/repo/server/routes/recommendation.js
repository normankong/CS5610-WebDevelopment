const express = require("express");
const moment = require("moment");

const router = express.Router();

const Recommendation = require("../models/recommendation.js");
const apiHelper = require("../utils/apiHelper.js");

router.get("/", async function (req, res, next) {
  let result = await Recommendation.find({}).sort({ createTime: -1 }).exec();

  let expiryTime = moment().add(+1, "m");
  if (result.length == 0 || moment(result[0].createTime).isBefore(expiryTime)) {

    console.log("Removing old tweets")
    result.forEach((item) => { item.remove(); });

    console.log("Refresh Recommendation");
    let newTweet = await refreshRecommendation();
    newTweet.forEach((item) => {
      createNewRecommendation(item);
    });

    result = newTweet;
  }

  res.header("Content-Type", "application/json");
  res.json(result);
});

const refreshRecommendation = async () => {
  let result = [];
  let activeStocks = await apiHelper.getMostActiveStock();
  for (item of activeStocks) {
    let symbol = item.symbol;
    let tweets = await apiHelper.getTwitterInfo(symbol);

    let userSet = new Set();
    tweets.forEach((tweet) => {
      userSet.add(tweet.author_id);
    });
    let idList = Array.from(userSet);
    let userList = await apiHelper.getTwitterUser(idList);

    tweets = tweets.map((tweet) => {
      let user = userList.find((user) => {
        return user.id == tweet.author_id;
      });
      tweet.symbol = symbol;
      tweet.name = user.name;
      return tweet;
    });
    result.push(...tweets);
  }

  return result;
};

const createNewRecommendation = async (data) => {
  let newRecommendation = new Recommendation({
    createTime: new Date(),
    ...data,
  });

  let result = await newRecommendation.save();
  return result;
};

module.exports = router;
