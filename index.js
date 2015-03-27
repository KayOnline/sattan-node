var express = require('express');

var app = new express();
app.get('/test', function(req, res) {
  res.send('Hello world');
});

app.listen(3000, function() {
  console.log('server is running');
})
