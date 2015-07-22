var express = require('express')
  , router = express.Router()
  , logger = require('log4js').getLogger(__filename)
  , fs = require('fs')
  , async = require('async')
  , path = require('path')
  , extend = require('extend')
  , marked = require('marked')
  ;

router.get('/', function(req, res, next) {
	var postRoot = fs.realpathSync("./posts/");
	fs.readdir(postRoot, function(ex, files) {
		if (ex) return logger.error(ex);
		var regex = /(\d{4}-\d{2}-\d{2})-(.+)(\.md)/;
		var posts = [];
		files.forEach(function(item, index) {
			var match = regex.exec(item);
			if (match === null) {
				logger.error(item);
			} else {
				posts.push({
					"create_at" : match[1],
					"title"	    : match[2],
					"ext"       : match[3]
				});
			}
		});
		async.map(posts, function(item, callback) {
			var filePath = path.join(postRoot, item.create_at + '-' + item.title + item.ext);
			logger.debug(filePath);
			var mdContent = fs.readFileSync(filePath).toString();
			marked(mdContent, function (err, content) {
			  	if (err) throw err;
			  	callback(null, extend(true, item, {"content" : content}));
			});
			//logger.debug(sfile.toString());
		}, function(err, result){
			result.forEach(function(item, index) {
				logger.warn(item);
			});
		});
		var data = {
			"session": req.session,
			  "posts": posts
		};
	  	res.status(200).render('post_list', data);
	});
});

module.exports = router;