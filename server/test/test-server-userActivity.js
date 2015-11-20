////////////////////////
////  userActivity  ////
////////////////////////

// var fs = require('fs');
// var path  = require('path');
// var pg = require('pg');
// var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/activeData';
// var client = new pg.Client(connectionString);

// var http = require('http');
// var server = require('../app.js');
// var chaiHttp = require('chai-http');
// var mocha = require('mocha');
// var chai = require('chai');
// var should = chai.should();
// chai.use(chaiHttp);


// describe('database', function() {
//   client.connect();

//   // Drop the tables in the database
//   var q = fs.readFileSync(path.join(__dirname, '../dropActive.sql'), 'utf8');
//   client.query(q);
//   // Create all the tables in the database
//   var q = fs.readFileSync(path.join(__dirname, '../active.sql'), 'utf8');
//   client.query(q);
  
//   beforeEach(function() {

//     client.query('INSERT INTO userActivity (userActivity) VALUES (\'running\')');

//   });

//   it('should list all activities for userActivity', function(done) {
//       client.query('SELECT * FROM userActivity', function(err, res) {
//         res.should.be.a('object');
//         console.log(res.rows[0]);
//         // res.rows[0].should.have.property('userActivity');
//         // res.rows[0].userActivity.should.equal('running');
        
//       });
//       done();
//     });

//   after(client.end.bind(client));
// });