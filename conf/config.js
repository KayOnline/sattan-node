module.exports = {
    secret: "random 128bytes string",
    mongo: {
         uri: 'mongodb://127.0.0.1:27017/sattan-php',
        opts: {
            mongos: true
        }
    },
    mysql: {
        host: '122.2.1.2',
        port: '2235'
    },
    mail: {
        host: 'smtp.163.com',
        auth: {
            user: 'lsk_robot@163.com',
            pass: 'fylxmlhuiytuwytt'
        }
    },
    redis: {
        host: '127.0.0.1',
        port: 6380
    },
    limit: {
        xhr_limit: 1000 // 异步接口调用频次限制
    }
};
