/////////////////////
////  userInfo  ////
/////////////////////

var fs = require('fs');
var path  = require('path');
var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/activeData';
var client = new pg.Client(connectionString);

var http = require('http');
var server = require('../app.js');
var chaiHttp = require('chai-http');
var mocha = require('mocha');
var chai = require('chai');
var should = chai.should();
chai.use(chaiHttp);


describe('database', function() {
  client.connect();
  
  
  beforeEach(function(done) {

    // Drop the tables in the database
  var q = fs.readFileSync(path.join(__dirname, '../dropActive.sql'), 'utf8');
  client.query(q);
  // Create all the tables in the database
  var q = fs.readFileSync(path.join(__dirname, '../active.sql'), 'utf8');
  client.query(q);
    
    client.query('INSERT INTO userInfo (username, password, name, email, age, gender, location) VALUES (\'kierston\', \'test\', \'tester\', \'test@gmail.com\', 20, \'female\', \'denver\')');
    console.log('query finished'); 
    done();
  });

  // This is testing the connection from user to server
  it('should list all users for userInfo', function(done) {
    chai.request(server)
      .get('/api/users')
      .then(function(err, res) {
        console.log(res);
        console.log('inside the route');
        res.should.have.status(200);
        // console.log(res);
        console.log(res.body);
        res.should.be.json;
        console.log('after json');
        res.body.should.be.a('array');
        console.log(res.body);
        res.body[0].should.have.property('userId');
        res.body[0].should.have.property('username');
        res.body[0].should.have.property('password');
        res.body[0].should.have.property('name');
        res.body[0].should.have.property('email');
        res.body[0].should.have.property('age');
        res.body[0].should.have.property('gender');
        res.body[0].should.have.property('location');
      });
   
    // Testing the connection from server to database
  //   client.query('SELECT * FROM userInfo', function(err, res){
  //       res.should.be.a('object');
  //       res.rows[0].should.have.property('userid');
  //       res.rows[0].should.have.property('username');
  //       res.rows[0].should.have.property('password');
  //       res.rows[0].should.have.property('name');
  //       res.rows[0].should.have.property('email');
  //       res.rows[0].should.have.property('age');
  //       res.rows[0].should.have.property('gender');
  //       res.rows[0].should.have.property('location');
  //       res.rows[0].userid.should.equal(1);
  //       res.rows[0].username.should.equal('kierston');
  //       res.rows[0].password.should.equal('test');
  //       res.rows[0].name.should.equal('tester');
  //       res.rows[0].email.should.equal('test@gmail.com');
  //       res.rows[0].age.should.equal(20);
  //       res.rows[0].gender.should.equal('female');
  //       res.rows[0].location.should.equal('denver');
  //   });
    done();
  });

  // it('should add a single user for userInfo', function(done) {
  //   // client.query('INSERT INTO userInfo (username, password, name, email, age, gender, location) VALUES (\'nate\', \'fish\', \'nathan\', \'nate@gmail.com\', 30, \'male\', \'boulder\')', function(err, res) {
  //   //   console.log(res.rows[0]);
  //   //   console.log(res.rows[1]);
  //   // });
  //   // Testing the connection from server to database
  //   client.query('SELECT * FROM userInfo', function(err, res) {
  //     res.should.be.a('object');
  //     res.rows[2].should.have.property('userid');
  //     res.rows[2].should.have.property('username');
  //     res.rows[2].should.have.property('password');
  //     res.rows[2].should.have.property('name');
  //     res.rows[2].should.have.property('email');
  //     res.rows[2].should.have.property('age');
  //     res.rows[2].should.have.property('gender');
  //     res.rows[2].should.have.property('location');
  //     res.rows[2].userid.should.equal(3);
  //     res.rows[2].username.should.equal('nate');
  //     res.rows[2].password.should.equal('fish');
  //     res.rows[2].name.should.equal('nathan');
  //     res.rows[2].email.should.equal('nate@gmail.com');
  //     res.rows[2].age.should.equal(30);
  //     res.rows[2].gender.should.equal('male');
  //     res.rows[2].location.should.equal('boulder');
  //   });
  //   done();
  // });

  // it('should update a single user for userInfo', function(done) {
  //   // client.query('UPDATE userInfo SET username=\'sam\' WHERE username=\'kierston\'', function(err, res) {
  //   // });
  //   // Testing the connection from server to database
  //   client.query('SELECT * FROM userInfo', function(err, res) {
  //     res.should.be.a('object');
  //     res.rows[0].should.have.property('userid');
  //     res.rows[0].should.have.property('username');
  //     res.rows[0].should.have.property('password');
  //     res.rows[0].should.have.property('name');
  //     res.rows[0].should.have.property('email');
  //     res.rows[0].should.have.property('age');
  //     res.rows[0].should.have.property('gender');
  //     res.rows[0].should.have.property('location');
  //     res.rows[0].userid.should.equal(1);
  //     res.rows[0].username.should.equal('sam');
  //     res.rows[0].password.should.equal('test');
  //     res.rows[0].name.should.equal('tester');
  //     res.rows[0].email.should.equal('test@gmail.com');
  //     res.rows[0].age.should.equal(30);
  //     res.rows[0].gender.should.equal('female');
  //     res.rows[0].location.should.equal('denver');
  //   });
  //   done();
  // });

  // it('should delete a single user for userInfo', function(done) {
  //   // client.query('DELETE FROM userInfo WHERE userid=1', function(err, res) {   
  //   // });
  //   // Testing the connection from server to database
  //   client.query('SELECT * FROM userInfo', function(err, res) {
  //     res.should.be.a('object'); 
  //   });
  //   done();
  // });


  after(client.end.bind(client));
});


