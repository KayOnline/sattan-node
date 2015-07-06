/*var scope = 'top';
var f1 = function() {
console.log(scope);
};
f1(); 
var f2 = function() {
var scope = 'f2';
f1();
};
f2(); 


var f = function() {
var scope = 'f0';
(function() {
//var scope = 'f1';
(function() {
console.log(scope); // 输出 f1
})();
})();
};
f();

var crypto = require("crypto");
function md5 (text) {
  return crypto.createHash('md5').update(text).digest('hex');
};

var emailHash = md5('kay21156929@gmail.com');
console.info(emailHash);
*/

var logger = require("log4js").getLogger(__filename);
var bcrypt = require("bcrypt-nodejs");
var p = require("../lib/cryptohelper.js");

var data = "vita120508221";
/*bcrypt.genSalt(9, function(err, salt) {
  if (err) logger.err(error);
  bcrypt.hash(data, salt, null, function(err, hash) {
    if (err) logger.info(err);
    logger.debug(hash);
    logger.debug(salt);
  });
});*/


/*var encrypted = '$2a$12$aBDxI7upBHdddIYdHzEBaeb5gei3vZ93MGc.WEBEtldl.Ful5LVri';
var salt = '$2a$12$aBDxI7upBHdddIYdHzEBae';
bcrypt.compare(data, encrypted, function(err, result) {
  if (err) logger.info(err);
  logger.debug(result);
});*/
var data = "123";
/*var salt = null;
p.pbkdf2(data, salt, function(ex, hashPwd, salt) {
  if (ex) logger.error(ex);
  logger.info(hashPwd);
  logger.info(salt);
});*/

var key = '37214e5dc911700241681db4182ac257accf97642669352eb1efb4d362c4af6399b21c01e9ac90839068512217ab84e51255e7b929cb4f403da64eab6afc3581';
var salt = '09a5bfef39443e005855f1c9a415832abdcd0e39e6adb9790050f985120a5295';
p.compare(data, key, salt, function(ex, flag) {
  if (ex) logger.error(ex);
  logger.info(flag);
});





