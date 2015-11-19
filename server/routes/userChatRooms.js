var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../', 'config'));


router.get('/chatRooms', function(req, res) {
  var results = [];
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    var query = client.query("SELECT * FROM userChatRooms ORDER BY userId ASC;");
    query.on('row', function(row) {
      results.push(row);
    });
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});


router.post('/chatRooms', function(req, res) {
  var results = [];
  var data = { name: req.body.name, conversation: req.body.conversation };
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    client.query("INSERT INTO userChatRooms (name, conversation) VALUES ($1, $2)", [data.name, data.conversation]);
    var query = client.query("SELECT * FROM userChatRooms ORDER BY userId ASC;");
    query.on('row', function(row) {
      results.push(row);
    });
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});


router.put('/chatRooms/:chatRooms_id', function(req, res) {
  var results = [];
  var id = req.params.chatRooms_id;
  var data = { name: req.body.name, conversation: req.body.conversation };
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    client.query("UPDATE userChatRooms SET name=($1), conversation=($2)", [data.name, data.conversation, id]);
    var query = client.query("SELECT * FROM userChatRooms ORDER BY userId ASC;");
    query.on('row', function(row) {
      results.push(row);
    });
  });
});


router.delete('/chatRooms/:chatRooms_id', function(req, res) {
  var results = [];
  var id = req.params.chatRooms_id;
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    client.query("DELETE FROM userChatRooms WHERE id=($1)", [id]);
    var query = client.query("SELECT * FROM userChatRooms ORDER BY userId ASC;");
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