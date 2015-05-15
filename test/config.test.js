var config = require('../conf/config');


console.info(config.user_list);
var user_list = config.user_list;
console.info(user_list instanceof Array);
if (user_list.length > 0) {
    for (var i = 0, len = user_list.length; i < len; i++) {
        console.info(user_list[i].email);
    }
}
