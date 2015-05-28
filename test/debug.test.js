#!/usr/bin/env node

var debug1 = require('debug')('worker:a');
var debug2 = require('debug')('worker:b');

debug1('aaaaaaaaaaaaa');
debug2('bbbbbbbbbbbbb');

function rec(n) {
	if (n === 1) return 1;
	return n * rec(n - 1);
}

function recSum(s) {
	var tmp = 0;
	for (var i=1; i <= s; i++) {
		tmp += rec(i);
	}
	return tmp;
}

console.info(recSum(3));