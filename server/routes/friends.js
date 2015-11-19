var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../', 'config'));


router.get('/friends', function(req, res) {
  var results = [];
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    var query = client.query("SELECT * FROM friends ORDER BY userId ASC;");
    query.on('row', function(row) {
      results.push(row);
    });
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});


router.post('/friends', function(req, res) {
  var results = [];
  var data = { status: req.body.status };
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    client.query("INSERT INTO friends (status) VALUES ($1)", [data.status]);
    var query = client.query("SELECT * FROM friends ORDER BY userId ASC;");
    query.on('row', function(row) {
      results.push(row);
    });
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});


router.put('/friends/:friends_id', function(req, res) {
  var results = [];
  var id = req.params.friends_id;
  var data = { status: req.body.status };
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    client.query("UPDATE friends SET status=($1)", [data.status, id]);
    var query = client.query("SELECT * FROM friends ORDER BY userId ASC;");
    query.on('row', function(row) {
      results.push(row);
    });
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});


router.delete('/friends/:friends_id', function(req, res) {
  var results = [];
  var id = req.params.friends_id;
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    client.query("DELETE FROM friends WHERE id=($1)", [id]);
    var query = client.query("SELECT * FROM friends ORDER BY userId ASC;");
    query.on('row', function(row) {
      results.push(row);
    });
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});


module.exports = router;