var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../', 'config'));


// ALL ROUTES FOR USERACTIVITY TABLE
router.get('/userActivity', function(req, res) {
  var results = [];
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    var query = client.query("SELECT * FROM userActivity ORDER BY userId ASC;");
    query.on('row', function(row) {
      results.push(row);
    });
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});


router.post('/userActivity', function(req, res) {
  var results = [];
  var data = { userActivity: req.body.userActivity };
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    client.query("INSERT INTO userActivity (userActivity) VALUES ($1)", [data.userActivity]);
    var query = client.query("SELECT * FROM userActivity ORDER BY userId ASC;");
    query.on('row', function(row) {
      results.push(row);
    });
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});


router.put('/userActivity/:userActivity_id', function(req, res) {
  var result = [];
  var id = req.params.userActivity_id;
  var data = { userActivity: req.body.userActivity };
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      done();
      console.log(err);
      return res.status(500).send(json({ success: false, data: err }));
    }
    client.query("UPDATE userActivity SET userActivity=($1)", [data.userActivity, id]);
    var query = client.query("SELECT * FROM userActivity ORDER BY userId ASC;");
    query.on('row', function(row) {
      results.push(row);
    });
  });
});


router.delete('/userActivity/:userActivity_id', function(req, res) {
  var results = [];
  var id = req.params.userActivity_id;
  pg.connectionString(connectionString, function(err, client, done) {
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    client.query("DELETE FROM userActivity WHERE id=($1)", [id]);
    var query = client.query("SELECT * FROM userActivity ORDER BY userId ASC;");
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
