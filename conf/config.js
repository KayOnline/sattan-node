module.exports = {
    secret: "random 128bytes string",
    monogo: {
        host: '127.0.0.2',
        port: '2006'
    },
    mysql: {
        host: '122.2.1.2',
        port: '2235'
    },
    user_list: [
    	{
    		uid: 1,
            email: '21156929@qq.com',
    		hashPwd: '5ee4c57d0147735b24d7dc6388527a02524ad1ac65891e30b62dd25a388598f52ba477b84a6815d92a18c4d5c7b2650ad26f85b314cd450a4a548fee27eb724b',
            salt: 'a3cb29ba6b1fe9ae4169299245d493bcb0dce317ffacd1b26e9943cecd85d94fe5b238ae545eb01830f51e3efe910741d3377ae2e36813c7db8c24b1f7d57a1e',
    	},
    	{
            uid: 2,
    		email: '476418809@qq.com',
    		hashPwd: '5ee4c57d0147735b24d7dc6388527a02524ad1ac65891e30b62dd25a388598f52ba477b84a6815d92a18c4d5c7b2650ad26f85b314cd450a4a548fee27eb724b',
            salt: 'a3cb29ba6b1fe9ae4169299245d493bcb0dce317ffacd1b26e9943cecd85d94fe5b238ae545eb01830f51e3efe910741d3377ae2e36813c7db8c24b1f7d57a1e',
    	}
    ]
};
