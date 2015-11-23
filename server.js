var CONFIG = require('config');
var mongoose= require('mongoose');
var Promise= require('bluebird');
Promise.promisifyAll(require("mongoose"));
var http = require('http');
//mongodb
global.mongo= mongoose.createConnection(CONFIG.mongo);
var mongo= require(CONFIG.Controllers('mongo'));


http.createServer(function(req, res) {
  var arr = req.url.split('/');
  if (arr.length === 5 && arr[3] == 'DataInsertion') {
    mongo.create(arr[4], res);
  }
  else if (arr.length === 4 && arr[3] == 'SelectCurrentData') {
    mongo.count(req, res);
  }
}).listen(8080, function() {
  console.log('listening on 8080');
});
