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

// 用户列表
exports.findUsers = function (params, callback) {
	User.find(params, callback);
}

// 更新用户
exports.updateUser = function(doc, options, callback) {
	User.findOneAndUpdate(doc, options, callback);
}