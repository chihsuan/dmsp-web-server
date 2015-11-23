var CONFIG = require('config');
var mongoose= require('mongoose');
var Promise= require('bluebird');
Promise.promisifyAll(require("mongoose"));
var http = require('http');
//mongodb
global.mongo= mongoose.createConnection(CONFIG.mongo);
var mongo= require(CONFIG.Controllers('mongo'));
var Pgb = require("pg-bluebird");
var pgb = new Pgb();
CONFIG.pg = "postgres://chihsuan@localhost/dmsp";
pgb.connect(CONFIG.pg)
  .then(function(connection) {
    global.pg = connection;
  })
  .catch(function(err) {
    console.log('pg not connect');
  });
var pg= require(CONFIG.Controllers('pg'));


http.createServer(function(req, res) {
  var arr = req.url.split('/');
  if (arr.length === 5 && arr[3] == 'DataInsertion') {
    //mongo.create(arr[4], res);
    pg.create(arr[4], res);
  }
  else if (arr.length === 4 && arr[3] == 'SelectCurrentData') {
    //mongo.count(req, res);
    pg.count(req, res);
  }
}).listen(8080, function() {
  console.log('listening on 8080');
});
