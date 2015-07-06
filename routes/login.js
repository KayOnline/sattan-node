var router = require('express').Router();
var logger = require('log4js').getLogger(__filename);
var async = require('async');
var config = require('../conf/config');
var cryptoHelper = require('../lib/cryptohelper');
var userRepository = require("../repository/userRepository");


router.get('/', function(req, res, next) {
  /*logger.debug("sssssssssssssssssssssssssss");
  if (req.session.isLogin) {
    return res.redirect('/index');
  } else {*/
    return res.render('login', {title: 'login'});
  /*}*/
});

router.post('/', function(req, res, next) {

  var email = req.body.email;
  var password = req.body.password;

  if (!email || !password) {
    return res.json({"code" : 1, "msg" : "登录信息不完整！"});
  }

  userRepository.findUser({
    "email" : email
  }, function(err, item) {
    if (err || !item) {
      return res.json({"code" : 1, "msg" : "用户名或密码错误！"});
    }
    cryptoHelper.compare(password, item.hashpwd, item.salt, function(ex, isValid) {
      if (err || !isValid) {
        return res.json({"code" : 1, "msg" : "用户名或密码错误！"});
      }

      req.session.user = item;
      req.session.uid = item.email;
      req.session.isLogin = true;

      return res.json({"code" : 0, "msg" : "登录成功！"});
    });
  });
  
});

module.exports = router;
