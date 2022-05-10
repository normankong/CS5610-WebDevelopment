const fs = require("fs");
const express = require("express");
const helmet = require("helmet");

const app = express();
const port = process.env.PORT || 8080;
const noteRouter = require("./routes/note.js");
const indexRouter = require("./routes/index.js");

const bodyParser = require("body-parser");

const morgan = require("morgan");
const path = require("path");

const fileupload = require("express-fileupload");

require("./utils/database.js");

// Template Engine
app.engine("pug", require("pug").__express);
app.set("view engine", "pug");
app.set("views", __dirname + "/views");

// Body Parser for JSON/Form
app.use(bodyParser.urlencoded({ extended: false }));
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

// Static Files
app.use(express.static(__dirname + "/public"));

// File Upload
app.use(fileupload());

// Logging
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "w" }
);
app.use(morgan("combined", { stream: accessLogStream }));

app.use("/", indexRouter);
app.use("/notes", noteRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
  console.log(`http://localhost:${port}`);
});
