var express = require('express');
var CONFIG = require('config');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var mongoose= require('mongoose');
var Promise= require('bluebird');
Promise.promisifyAll(require("mongoose"));
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Pgb = require("pg-bluebird");
//var hive = require('thrift-hive');
var pgb = new Pgb();

//mongodb
global.mongo= mongoose.createConnection(CONFIG.mongo);

var app = express();

pgb.connect(CONFIG.pg)
  .then(function(connection) {
    global.pg = connection;
  })
  .catch(function(err) {
    console.log('pg not connect');
  });
//global.hive = hive.createClient(CONFIG.hive);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var routes = require('./routes/index');
app.use('/', routes);

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
