var express = require('express');
var router = express.Router();
var logger = require('log4js').getLogger(__filename);
var config = require('../conf/config');
var cryptoHelper = require('../lib/cryptohelper');


router.get('/', function(req, res, next) {
    if (req.session.uid) {
        res.redirect('/index');
    } else {
        res.render('login', {title: 'login'});            
    }
});

router.post('/', function(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    var user_list = config.user_list;
    if (user_list.length > 0) {
        for (var i = 0, len = user_list.length; i < len; i++) {
            if (email === user_list[i].email) {
                var salt = user_list[i].salt;
                var hashPwd = user_list[i].hashPwd;
                cryptoHelper.validate(password, hashPwd, salt, function(ex, verified) {
                    // 登录成功
                    if (verified) {
                        req.session.uid = email;
                        res.redirect('/index');
                    }
                });
            }
        }
    }
    logger.debug("login failure");
    res.type('json'); 
    res.json({"title": "login"});
});

module.exports=router;
