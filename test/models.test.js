var Blog = require('../models/index').Blog;
var logger = require('log4js').getLogger(__filename);

var blog = new Blog();
blog.title = "Node.js入门";
blog.author = "Kay";
blog.body = "教你快速入门";

blog.save(function (err, product) {
	if (err) {
		logger.info("save comments error!", err.getMessage());
		process.exit();
	} 
	product.speak();
	
});