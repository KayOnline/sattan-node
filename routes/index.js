var express = require('express');
var router = express.Router();
var logger = require('log4js').getLogger(__filename);
var moment = require('moment');
var userRepository = require("../repository/userRepository");
var mailHelper = require('../lib/mailhelper');
var cryptoHelper = require('../lib/cryptohelper');

router.get('/', function(req, res, next) {
	logger.debug(req.metaData);
	userRepository.findUsers({}, function(ex, items) {
		if (ex) return logger.error(ex);
		items.forEach(function(item) {
			item.createTimeStr = moment(item.createTime).format('YYYY-MM-DD');
			item.updateTimeStr = moment(item.updateTime).format('YYYY-MM-DD');
			item.activeStr = item.active == true ? "是" : "否";
		});
	  	var data = {
			"session": req.session,
			  "items": items
		};
	  	res.render('index', data);
	});
});

router.get('/sendmail', function(req, res, next) {
	logger.debug(req.metaData);
	var params = {'username': req.query.u};
	userRepository.findUser(params, function(ex, item) {
		if (ex) return logger.error(ex);
		var token_tx = moment().format('X');
		var token = cryptoHelper.md5(item.username + item.hashpwd + token_tx);
		item.token = token;
		item.token_tx = token_tx;
		userRepository.updateUser({username: item.username}, item, function(ex, user) {
			if (ex) return logger.error(ex);
			mailHelper.sendMail("21156929@qq.com", "激活邮件", "<html><a href=\"http://192.168.214.138:3000/index/active?token="+ token + "\">" + token + "</a></html>");
		});
	});
});

router.get('/active', function(req, res, next) {
	var token = req.query.token;
	userRepository.findUser({token: token}, function(ex, user) {
		if (ex) return logger.error(ex);
		logger.debug(token);
		logger.debug(user);
		if (user != null) {
			var token_tx = user.token_tx;
			var cur_tx = moment().format("X");

			logger.debug(token_tx);

			// 超时作废
			if (token_tx - cur_tx > 24 * 60 * 60) {
				logger.error("token超时失效");
				return res.json({"code" : 2, "msg" : "token超时失效！"});
			} else {
				user.active = true;
				userRepository.updateUser({username: user.username}, user, function(ex, user) {
					if (ex) return logger.error(ex);
					logger.debug("token验证成功");
					return res.json({"code" : 2, "msg" : "token超时失效！"});
				});
			}
		} else {
			return res.json({"code" : 1, "msg" : "token无效"});
		}
	});
});

module.exports = router;
