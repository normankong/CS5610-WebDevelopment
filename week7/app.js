const express = require('express');
const db = require('./db');
const app = express();
const port = 3000;
const userRouter = require('./routes/users.js');
const bodyParser = require('body-parser');

app.engine('pug', require('pug').__express);
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));

// http://localhost:3000/?name=norman&title=Hello
app.get('/', (req, res) => {
    res.render('index', { title: req.query.title, message: 'Hello there!', name: req.query.name });
  });

app.use("/users", userRouter);

app.listen(port, function(){
    console.log(`Listening on port ${port}`);
    console.log(`http://localhost:${port}`);

    // Activity 2 Connect to MongoDB
    db.connectDb();
})