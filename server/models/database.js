// var pg = require('pg');
// var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/user';

// var client = new pg.Client(connectionString);
// client.connect();

// var query = client.query('CREATE TABLE userInfo(id SERIAL PRIMARY KEY, username VARCHAR not null, password VARCHAR not null, name VARCHAR not null, email VARCHAR not null, age INTEGER not null, gender VARCHAR not null, location VARCHAR not null)');
// query.on('end', function() {
//   client.end();
// });

// var query = client.query('');