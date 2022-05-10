const fs = require("fs");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8080;
const featureRouter = require("./routes/feature.js");
const recommendationRouter = require("./routes/recommendation.js");
const stockRouter = require("./routes/stock.js");
const portfolioRouter = require("./routes/portfolio.js");

const searchRouter = require("./routes/search.js");

const bodyParser = require("body-parser");

const morgan = require("morgan");
const path = require("path");

// const fileupload = require("express-fileupload");

require("./utils/database.js");

// Template Engine
// app.engine("pug", require("pug").__express);
// app.set("view engine", "pug");
app.set("views", __dirname + "/views");

// Body Parser for JSON/Form
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Security Hardening
// app.use(helmet.contentSecurityPolicy());
app.use(helmet.crossOriginEmbedderPolicy());
app.use(helmet.crossOriginOpenerPolicy());
app.use(helmet.crossOriginResourcePolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.originAgentCluster());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());
app.use(cors());

// Static Files
app.use(express.static(__dirname + "/public"));

// File Upload
// app.use(fileupload());

// Logging
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "w" }
);
app.use(morgan("combined", { stream: accessLogStream }));

app.use("/feature", featureRouter);
app.use("/recommendation", recommendationRouter);
app.use("/profile", portfolioRouter);
app.use("/portfolio", portfolioRouter);
app.use("/stock", stockRouter);
app.use("/search", searchRouter);
// app.use("/detail", portfolioRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err)

  // render the error page
  res.status(err.status || 500);
  res.end("Sorry can't find that!");
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
  console.log(`http://localhost:${port}`);
});
