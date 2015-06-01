var express = require('express');
var router = express.Router();
var logger = require("log4js").getLogger(__filename);
var cryptoHelper = require('../lib/cryptohelper');
var userRepository = require("../repository/userRepository");

router.get('/', function(req, res, next) {
    return res.render('reg', {});
});

router.post('/', function(req, res, next) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    cryptoHelper.pbkdf2(password, null, function(err, hashPwd, salt) {
        if (err) return res.render('reg_result', {msg: '注册失败！'});
        userRepository.saveUser(email, username, hashPwd, salt, false, function(err, obj) {
            if (err) return res.render('reg_result', {msg: '注册失败！'});
            return res.render('reg_result', {msg: '注册成功！'});
        });
    });
});

module.exports = router;