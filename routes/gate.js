var express = require("express");
var router = express.Router();
var logger = require('log4js').getLogger(__filename);

// 所有请求的入口
router.use(function(req, res, next) {
	logger.info("Welcome to The Great Gate");
	logger.debug(req.headers);

	// 解析公用请求报文参数
	req.metaData = {
		async: req.headers['x-requested-with'] ? true : false,
		baseUrl: req.baseUrl
	}

	// 登录检测
	if (req.baseUrl.indexOf('reg') > -1) {
		return next();
	}
	if (req.baseUrl.indexOf('login') > -1) {
		return next();
	}

	if(req.session.isLogin) {
		return next();
	} else {
		res.redirect('/login');
	}

});

module.exports = router;
