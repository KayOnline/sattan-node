'use strict';

var crypto = require('crypto');

var cryptoHelper = (function() {
	var iterations = 10000;
	var keylen = 64;
	var digest = 'sha256'; 
	return {
		pbkdf2 : function (secret, salt, callback) {

			if (secret == '') {
				return callback('secret should not empty!');
			}

			if (typeof salt === 'string') {
				salt = Buffer(salt, 'hex');
			}

			crypto.randomBytes(64, function(ex, buf) {
				if (ex) return callback(ex);

				if (salt === null) {
					salt = buf;
				}

				crypto.pbkdf2(secret, salt, iterations, keylen, digest, function(ex, key) {
					if (ex) return callback(ex);
				  	callback(null, key.toString('hex'), salt.toString('hex'));
				});
			});
			
		},
		gensalt : function (callback) {
			crypto.randomBytes(64, function(ex, buf) {
				if (ex) return callback(ex);
				callback(ex, buf);
			});

		},
		validate : function (secret, key, salt, callback) {
			this.pbkdf2(secret, salt, function(ex, newKey, salt) {
				if (ex) return callback(ex, false);
				callback(null, key === newKey);
			});
		}
	};
})();

module.exports = cryptoHelper;