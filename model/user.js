var mongoose = require('mongoose');
var crypto = require("crypto");
var Schema = mongoose.Schema;


var schemaOptions = {
  	toObject: { virtuals: true }, 
  	toJSON: { virtuals: true },
  	autoIndex: false
};

var userSchema = new Schema({
	username: { type: String},
	email: { type: String},
	hashpwd: { type: String },
	salt: { type: String },
	avatar: { type: String },
	githubId: { type: String},
	githubUsername: {type: String},
	githubAccessToken: {type: String},
	createTime: { type: Date, default: Date.now },
	updateTime: { type: Date, default: Date.now },
	active: { type: Boolean, default: false },
	accessToken: {type: String},
});

userSchema.virtual('avatar_url').get(function() {
	var emailHash = crypto.createHash('md5').update(this.email).digest('hex'); 
	var url = "http://s.gravatar.com/avatar/" + emailHash + "?s=80";
	return url;
});

userSchema.method('getAvatarUrl', function(cb) {
	cb("SSSS");
});

userSchema.index({username: 1}, {unique: true});
userSchema.index({email: 1}, {unique: true});
userSchema.index({githubId: 1});
userSchema.index({accessToken: 1});

module.exports = userSchema;
