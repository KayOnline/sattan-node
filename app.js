var express = require('express');
var fs = require('fs');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('flash');
var moment = require('moment');

var config = require('./conf/config');


var app = express();

// global variables
global.__base = __dirname + '/';

// view engine setup
app.engine('html', require("ejs").renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));


// Log Stream
var accessLogStream = fs.createWriteStream(__dirname + '/logs/access.log', {flags: 'a'});
var errorLogfile    = fs.createWriteStream(__dirname + '/logs/error.log', {flags: 'a'});

// Middleware
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(morgan('dev', {
  stream: accessLogStream
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: config.secret,
  cookie: {maxAge: 60 * 1000}
}));
app.use(flash());

// Routes
var reg = require("./routes/reg");
var login = require('./routes/login');
var index = require('./routes/index');
var gate = require('./routes/gate');
var post = require('./routes/post');
app.use('/*', gate);
app.use('/', index);
app.use('/index', index);
app.use('/login', login);
app.use('/reg', reg);
app.use('/post', post);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next){
  var meta = '[' + new Date() + '] ' + req.url + '\n';
  errorLogfile.write(meta + err.stack + '\n');
  next();
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
