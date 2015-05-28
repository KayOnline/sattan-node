var router = require('express').Router();
var logger = require('log4js').getLogger(__filename);
var async = require('async');
var config = require('../conf/config');
var cryptoHelper = require('../lib/cryptohelper');
var userRepository = require("../repository/userRepository");

router.get('/reg', function(req, res, next) {
    return res.render('reg', {title: 'login'});
});

router.post('/reg', function(req, res, next) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    cryptoHelper.pbkdf2(password, "", function(err, hashPwd, salt) {
        if (err) return res.render('reg_result', {msg: '注册失败！'});
        userRepository.saveUser(email, username, hashPwd, salt, false, function(err, obj) {
            if (err) return res.render('reg_result', {msg: '注册失败！'});
            return res.render('reg_result', {msg: '注册成功！'});
        });
    });
});

router.get('/', function(req, res, next) {
    console.info("A PATH");
    if (req.session.uid) {
        return res.redirect('/index');
    } else {
        return res.render('login', {title: 'login'});            
    }
});

router.post('/', function(req, res, next) {

    var email = req.body.email;
    var password = req.body.password;

    if (!email || !password) {
        return res.json({"code":1, "msg":"登录信息不完整！"});
    }

    async.each(config.user_list, function(item, callback) {
        if (email === item.email) {
            cryptoHelper.validate(password, item.hashPwd, item.salt, function(ex, verified) {
                callback(verified);
            });
        } else {
            callback(false)
        }
    }, function(verified) {
        if (verified) {
            req.session.uid = email;
            return res.json({"code" : 0});
        } else {
            return res.json({"code" : 1, "msg" : "登录认证失败！"});
        }
    });
    
});


module.exports=router;
