var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next){
    res.send("<h1>List of all the users</h1>");
});

router.get('/:name/:surname', function(req, res, next){
    res.send(`Nice to meet you ${req.params.name} ${req.params.surname}`);
});

module.exports = router;