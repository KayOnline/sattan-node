var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	var articles = [{
		title: "",
		author: "",
		content: "",
	}, {
		title: "",
		author: "",
		content: "",
	}];
	res.render('index', { title: 'index' });
});

module.exports = router;
