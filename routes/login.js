var express = require('express');
var router = express.Router();
var logger = require('log4js').getLogger(__filename);
var crypto = require('crypto');

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

    if (email == '21156929@qq.com' && password == '123') {
        //res.cookie('uid', email, {maxAge: 60 * 1000});
        req.session.uid = email;
        res.redirect('/index');
    } else {
        //req.flash('error', 'login failure!');
        res.render('login', {title: 'login'});
    }
});

module.exports=router;
