// module.exports = require('./database');

// to no longer need the connection in the controller!
const connection = require('./database');

// module.exports = require('./classes/Students-class')(connection);
exports.Students = require('./classes/Students-class')(connection);
exports.ClassRoom = require('./classes/ClassRoom-class');
