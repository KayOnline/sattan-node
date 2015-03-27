/*
var express = require('express');

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

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
