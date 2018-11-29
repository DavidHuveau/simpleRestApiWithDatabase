const MySql = require('mysql');
const config = require('./config.db');

const connection = MySql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
});

// connection.connect((err) => {
//     if (err)
//         console.log(err.message);
//     else
//         console.log('Connected with DB');
// });
// connection.query('SELECT * FROM students;', function (error, results, fields) {
//     console.log('The solution is: ', results[0]);
// });
// connection.end();

module.exports = connection;
