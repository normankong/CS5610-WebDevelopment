const express = require('express');
const app = express();
const port = 3000;
const userRouter = require('./routes/users.js');

// Activity 5 Static Web Server
app.use(express.static(__dirname + '/public'));

// app.get('/', function(req, res) {
//     res.send('Hello World!');
// });

// // Activity 3:
// app.get('/users', function (req, res){
//     res.send("<h1>List of all the users</h1>");
// });

// // Activity 4
// app.get('/users/:name/:surname', function(req, res){
//     res.send(`Nice to meet you ${req.params.name} ${req.params.surname}`);
// });

// Activity 6 change to app.use
app.use("/users", userRouter);

// Activity 7 pug
app.engine('pug', require('pug').__express);
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// http://localhost:3000/?name=norman&title=Hello
app.get('/', (req, res) => {
    res.render('index', { title: req.query.title, message: 'Hello there!', name: req.query.name });
  })


app.listen(port, function(){
    console.log(`Listening on port ${port}`);
    console.log(`http://localhost:${port}`);
})