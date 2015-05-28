var User = require("../model/index.js").User;

// 保存用户
exports.saveUser = function (email, username, hashpwd, salt, active, callback) {
	var user = new User();
	user.email = email;
	user.username = username;
	user.hashpwd = hashpwd;
	user.salt = salt;
	user.active = active || false;
	user.save(callback);
}

// 查找用户
exports.findUser = function (params, callback) {
	User.findOne(params, callback);
}