var fs = require('fs');
var path  = require('path');
var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/user';
var client = new pg.Client(connectionString);


describe('database', function() {
  client.connect();
  // Drop the database
  var query = client.query('DROP DATABASE activeData');
  // Create the database
  var query = client.query('CREATE DATABASE activeData');
  // Create all the tables in the database
  var q = fs.readFileSync(path.join(__dirname, '../active.sql'), 'utf8');
  client.query(q);

  beforeEach(function(done) {
    client.query('INSERT INTO userInfo (username, password, name, email, age, gender, location) VALUES("kierston", "test", "tester", "test@gmail.com", 20, "female", "denver")');
  });

  it('should list all users', function(done) {
    client.query('SELECT * FROM userInfo', function(err, res){
        res.should.be.a('array');
        res[0].should.have.property('userId');
        res[0].should.have.property('username');
        res[0].should.have.property('password');
        res[0].should.have.property('name');
        res[0].should.have.property('email');
        res[0].should.have.property('age');
        res[0].should.have.property('gender');
        res[0].should.have.property('location');
        res[0].should.have.property('image');
        res[0].userId.should.equal('1');
        res[0].username.should.equal('kierston');
        done();
    });
  });


  after(client.end.bind(client));
});


