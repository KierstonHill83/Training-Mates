var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../', 'config'));


// HTML will be rendered from the client side
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../client/views', 'index.html'));
});


module.exports = router;
