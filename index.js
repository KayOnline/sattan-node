var express = require('express');
var mongoose = require('mongoose');


mongoose.connect('mongodb://192.168.214.137:27017/mydb');
var User = mongoose.model('User', {name: String, age: Number});

var user1 = new User({name: 'vita', age: 25});
user1.save(function(err) {
  if (err) console.info(err);
});

var app = new express();
app.get('/test', function(req, res) {
  res.send('Hello world');
});

app.listen(3000, function() {
  console.log('server is running');
})
