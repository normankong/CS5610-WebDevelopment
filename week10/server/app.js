const express = require('express');
const db = require('./db');
const app = express();
const cors = require("cors");
const userRouter = require('./routes/users.js');
const tasksRouter = require('./routes/tasks.js');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
require("dotenv").config(); 

app.engine('pug', require('pug').__express);
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.use(cors());

// http://localhost:3000/?name=norman&title=Hello
app.get('/', (req, res) => {
    res.render('index', { title: req.query.title, message: 'Hello there!', name: req.query.name });
  });

app.use("/users", userRouter);
app.use('/tasks/', tasksRouter);

app.listen(port, function(){
    console.log(`Listening on port ${port}`);
    console.log(`http://localhost:${port}`);

    // Activity 2 Connect to MongoDB
    db.connectDb();
})