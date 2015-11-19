var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../', 'config'));


router.get('/activityProperty', function(req, res) {
  var results = [];
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      done();
      console.log(err);
      res.status(500).json({ success: false, data: err });
    }
    var query = client.query("SELECT * FROM activityProperty ORDER BY userId ASC;");
    query.on('row', function(row) {
      results.push(row);
    });
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});


router.post('/activityProperty', function(req, res) {
  var result = [];
  var data = { userActivity: req.body.userActivity, propertyName: req.body.propertyName, propertyValue: req.body.propertyValue };
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    client.query("INSERT INTO activityProperty (userActivity, propertyName, propertyValue) VALUES ($1, $2, $3)", [data.userActivity, data.propertyName, data.propertyValue]);
    var query = client.query("SELECT * FROM activityProperty ORDER BY userId ASC;");
    query.on('row', function(row) {
      results.push(row);
    });
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});


router.put('/activityProperty/:activityProperty_id', function(req, res) {
  var results = [];
  var id = req.params.activityProperty_id;
  var data = { userActivity: req.body.userActivity, propertyName: req.body.propertyName, propertyValue: req.body.propertyValue };
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    client.query("UPDATE activityProperty SET userActivity=($1), propertyName=($2), propertyValue=($3)", [data.activityProperty, data.propertyName, data.propertyValue, id]);
    var query = client.query("SELECT * FROM activityProperty ORDER BY userId ASC;");
    query.on('row', function(row) {
      results.push(row);
    });
  });
});


router.delete('/activityProperty/:activityProperty_id', function(req, res) {
  var results = [];
  var id = req.params.activityProperty_id;
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    client.query("DELETE FROM activityProperty WHERE id=($1)", [id]);
    var query = client.query("SELECT * FROM activityProperty ORDER BY userId ASC;");
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