var mongoose = require('mongoose');
var config = require('../conf/config.js');
var logger = require('log4js').getLogger(__filename);

// Create Connection
var conn = mongoose.createConnection(config.mongo.uri, config.mongo.opts);
conn.on('error', console.error.bind(console, 'connection error:'));

//var BlogScheme = require('./blog');
//var Blog = conn.model('Blog', BlogScheme);
exports.Blog = conn.model('Blog', require('./blog'));
exports.User = conn.model('User', require('./user'));
exports.Topic = conn.model('Topic', require('./topic'));
exports.Reply = conn.model('Reply', require('./reply'));
exports.TopicCollect = conn.model('TopicCollect', require('./topic_collect'));
exports.Message = conn.model('Message', require('./message'));

/*mongoose.disconnect(function(err) {
	if (err) {
		console.info("fail to disconnect!", err.getMessage());
		process.exit(1);
	}
});*/

// Del Comments
/*comment.find({}, function (err, docs) {
	docs
});
*/




