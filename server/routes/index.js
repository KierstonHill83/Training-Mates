var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../', 'config'));


// HTML will be rendered from the client side
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../client/views', 'index.html'));
});


// ALL ROUTES FOR USERINFO TABLE
// Get route, postgres will connect, if there is an error, send the error and console.log it.
// Otherwise, grab everything from the userInfo table and put it into the results array. Return that array.
router.get('/activate', function(req, res) {
  var results = [];
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    var query = client.query("SELECT * FROM userInfo ORDER BY id ASC;");
    query.on('row', function(row) {
      results.push(row);
    });
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});


// Post route, setting an object with all the data that is in that table. Connect to postgres, if error, send it.
// Otherwise, insert the data into the table. Grab all the data in the table and push it in an array. Return the array.
router.post('/activate', function(req, res) {
  var results = [];
  var data = { username: req.body.username, password: req.body.password, name: req.body.name, email: req.body.email, age: req.body.age, gender: req.body.gender, location: req.body.location, image: req.body.image };
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    client.query("INSERT INTO userInfo (username, password, name, email, age, gender, location, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [data.username, data.password, data.name, data.email, data.age, data.gender, data.location, data.image]);
    var query = client.query("SELECT * FROM userInfo ORDER BY userId ASC");
    query.on('row', function(row) {
      results.push(row);
    });
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});


// Put route, grab the id from the url. Set an object equal to the data for the user. Connect to postgres, if not, send the error.
// Otherwise, update that users info. Grab all the data from the table and push it into an array. Return the array.
router.put('/activate/:activate_id', function(req, res) {
  var results = [];
  var id = req.params.activate_id;
  var data = { username: req.body.username, password: req.body.password, name: req.body.name, email: req.body.email, age: req.body.age, gender: req.body.gender, location: req.body.location, image: req.body.image };
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      done();
      console.log(err);
      return res.status(500).send(json({ success: false, data: err }));
    }
    client.query("UPDATE userInfo SET username=($1), password=($2), name=($3), email=($4), age=($5), gender=($6), location=($7), image=($8)", [data.username, data.password, data.name, data.email, data.age, data.gender, data.location, data.image, id]);
    var query = client.query("SELECT * FROM userInfo ORDER BY userId ASC");
    query.on('row', function(row) {
      results.push(row);
    });
  });
});


// Delete route, get user by id in the url. Connect to postgres, if error, send the error.
// Otherwise, delete the user where the id matches. Grab all the other users and push them into an array. Return the array.
router.delete('/activate/:activate_id', function(req, res) {
  var results = [];
  var id = req.params.activate_id;
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    client.query("DELETE FROM userInfo WHERE id=($1)", [id]);
    var query = client.query("SELECT * FROM userInfo ORDER BY userId ASC");
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
