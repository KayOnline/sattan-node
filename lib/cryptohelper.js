'use strict';

var crypto = require('crypto');
var logger = require('log4js').getLogger();

var cryptoHelper = (function() {

	var iterations = 10000;
	var keylen = 64;
	var digest = 'sha256'; 

	return {
		md5: function(text) {
			return crypto.createHash('md5').update(text).digest('hex');
		},
		genSalt : function (callback) {
			crypto.randomBytes(32, function(ex, buf) {
				if (ex) return callback(ex);
				callback(null, buf.toString('hex'));
			});
		},
		pbkdf2 : function (data, salt, callback) {

			if (data === null || data.lengh === 1) {
				return callback('Invalid data');
			}

			if (salt === null) {
				this.genSalt(function(ex, salt) {
					if (ex) return callback(ex);
					if (typeof salt === 'string') {
						salt = Buffer(salt, 'hex');
					}
					crypto.pbkdf2(data, salt, iterations, keylen, digest, function(ex, key) {
						if (ex) return callback(ex);
						callback(null, key.toString('hex'), salt.toString('hex'));
					});
				});
			} else {
				if (typeof salt === 'string') {
					salt = Buffer(salt, 'hex');
				}
				crypto.pbkdf2(data, salt, iterations, keylen, digest, function(ex, key) {
					if (ex) return callback(ex);
					callback(null, key.toString('hex'), salt.toString('hex'));
				});
			}
			
		},
		compare : function (data, key, salt, callback) {

			if (typeof salt === 'string') {
				salt = Buffer(salt, 'hex');
			}

			this.pbkdf2(data, salt, function(ex, newKey, salt) {
				if (ex) return callback(ex, false);
				callback(null, key === newKey);
			});
		}
	};
})();

module.exports = cryptoHelper;