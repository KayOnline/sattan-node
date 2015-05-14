var cryptoHelper = require('../lib/cryptohelper');
var expect = require('chai').expect;

describe('Crypto Helper', function() {
	describe('Hash creation', function() {

		it('should return a verified as: true', function (done) {
			var secret = 'mypassword';
			var salt = null;
			cryptoHelper.pbkdf2(secret, salt, function(ex, key, gensalt) {
				if (!ex) {
					salt = gensalt;
					cryptoHelper.validate(secret, key, salt, function(ex, verified) {
						if (ex) console.info(ex);
						expect(verified).to.equal(true);
						done();
					});
				} else {
					console.info(ex);
				}
			});
		});

		it('should return a verified as: true', function(done) {
			var secret = 'mypassword';
			var salt = 'a3cb29ba6b1fe9ae4169299245d493bcb0dce317ffacd1b26e9943cecd85d94fe5b238ae545eb01830f51e3efe910741d3377ae2e36813c7db8c24b1f7d57a1e';
			var key  = '5ee4c57d0147735b24d7dc6388527a02524ad1ac65891e30b62dd25a388598f52ba477b84a6815d92a18c4d5c7b2650ad26f85b314cd450a4a548fee27eb724b';
			cryptoHelper.validate(secret, key, salt, function(ex, verified) {
				expect(ex).to.be.null;
				expect(verified).to.equal(true);
				done();
			});
		});

		it('should return a hash string', function(done) {
			cryptoHelper.gensalt(function(ex, salt) {
				expect(ex).to.be.null;
				expect(salt.toString('hex')).to.exist;
				done();
			});
		});
	});
});

