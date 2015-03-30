/*
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

app.listen(process.env.PORT || 5000, function() {
  console.log('server is running');
})
*/

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.get('/square', function(request, response) {
  response.send(String(Math.pow(request.query.n, 2)));
});

module.exports = app;

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

