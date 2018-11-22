const MySql = require('mysql');

const connection = MySql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'xxx',
    database : 'yyy'
});

module.exports = connection;
