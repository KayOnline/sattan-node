var express = require("express");
var router = express.Router();
var logger = require('log4js').getLogger(__filename);
var config = require('../conf/config.js');
var redis = require('redis');
var client = redis.createClient(config.redis.port, config.redis.host);

// 所有请求的入口
router.use(function(req, res, next) {

	logger.info("Welcome to The Great Gate");

	// 解析公用请求报文参数
	req.metaData = {
		xhr: req.xhr,
		baseUrl: req.baseUrl,
		ip: req.ip
	}


	// 异步接口调用频次控制
	if (req.xhr && req.originalUrl) {
		var key = 'api:call:' + req.originalUrl;
		var now = Date.now();
		var uid = req.session.uid;

		if (key.indexOf('/login') == -1) {
			client.zscore(key, uid, function(ex, lastInvokedTime) {
				if (ex) return logger.error(ex);
				if (lastInvokedTime && (now - lastInvokedTime < config.limit.xhr_limit)) {
					return res.status(200).json({code: 1, msg:"您的操作过于频繁!"});
				}
				client.zadd(key, now, uid);
			});
		}
	}

	// 登录检测
	if (req.baseUrl.indexOf('reg') > -1 
	 || req.baseUrl.indexOf('login') > -1 
	 //|| req.baseUrl.indexOf('topic') > -1
		) {
		return next();
	}

	// 路由
	if(req.session.isLogin) {
		return next();
	} else {
		res.redirect('/login');
	}

});

module.exports = router;
