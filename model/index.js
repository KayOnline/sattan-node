var mongoose = require('mongoose');
var config = require('../conf/config.js');
var logger = require('log4js').getLogger(__filename);

// Create Connection
var conn = mongoose.createConnection(config.mongo.uri, config.mongo.opts);
conn.on('error', console.error.bind(console, 'connection error:'));


exports.User = conn.model('User', require('./user'));





