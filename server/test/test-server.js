var fs = require('fs');
var path  = require('path');
var pg = require('pg');
var mocha = require('mocha');
var chai = require('chai');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/activeData';
var client = new pg.Client(connectionString);

var should = chai.should();
// var assert = require('assert');
// var http = require('http');
// var request = require('request');
// var exec = require('child_process').exec;

// function prepare_db(next) {
//   exec('createdb testdb', function(err) {
//     if (err !== null) {
//       console.log('exec error: ' + err);
//     }
//     exec('psql -d testdb -f test/testdb.sql', function(err) {
//       if (err !== null) {
//         console.log('exec error: ' + err);
//       }
//       next(err);
//     });
//   });
// }

// describe('database', function() {
//   before(function(done) {
//     prepare_db(function(err) {
//       if (err) {
        
//       }
//     });
//   });
//   after(function(done) {

//   });

//   it('should your tests', function(done) {

//     done();
//   });
// });






describe('database', function() {
  client.connect();
  // Drop the tables in the database
  var q = fs.readFileSync(path.join(__dirname, '../dropActive.sql'), 'utf8');
  client.query(q);
  // Create all the tables in the database
  var q = fs.readFileSync(path.join(__dirname, '../active.sql'), 'utf8');
  client.query(q);

  beforeEach(function() {
    client.query('INSERT INTO userInfo (username, password, name, email, age, gender, location) VALUES(\'kierston\', \'test\', \'tester\', \'test@gmail.com\', 20, \'female\', \'denver\')');
  });

  it('should list all users', function(done) {
    client.query('SELECT * FROM userInfo', function(err, res){
        // res.should.be.a('array');
        // res.rows[0].should.have.property('userId');
        res.rows[0].should.have.property('username');
        res.rows[0].should.have.property('password');
        res.rows[0].should.have.property('name');
        res.rows[0].should.have.property('email');
        res.rows[0].should.have.property('age');
        res.rows[0].should.have.property('gender');
        res.rows[0].should.have.property('location');
        // res.rows[0].userId.should.equal('1');
        // res.rows[0].username.should.equal('kierston');
        done();
    });
  });

  // it('should add a single user', function(done) {
  //   client.query('INSERT INTO userInfo (username, password, name, email, age, gender, location) VALUES (\'nate\', \'fish\', \'nathan\', \'nate@gmail.com\', 30, \'male\', \'boulder\')', function(err, res) {

  //     res.rows[1].should.have.property('username');
  //     res.rows[1].should.have.property('password');
  //     done();
  //   });
  // });

  after(client.end.bind(client));
});


