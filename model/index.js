require('babel-register');
// module.exports = require('./database');

// to no longer need the connection in the controller!
const connection = require('./database');
module.exports = require('./classes/students-class')(connection);
