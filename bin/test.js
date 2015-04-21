#!/usr/bin/env node

var debug1 = require('debug')('worker:a');
var debug2 = require('debug')('worker:error'); 
setInterval(function(){
  debug1('doing some work');
  debug2('test some work');
}, 1000);
