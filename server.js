var CONFIG = require('config');
var mongoose= require('mongoose');
var Promise= require('bluebird');
Promise.promisifyAll(require("mongoose"));
var redis = require("redis");
var http = require('http');
Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

var db = {
  redis: true,
  mongo: false,
  pg: false
}

if (db.redis) {
  var redisClient = redis.createClient();
  redisClient.on("error", function (err) {
    console.log("Error " + err);
  });

  global.redis = redisClient;
  var redisStore = require(CONFIG.Controllers('redis_store'));
}

if (db.mongo) {
  // mongodb
  global.mongo= mongoose.createConnection(CONFIG.mongo);
  var mongo= require(CONFIG.Controllers('mongo'));
}

if (db.pg) {
  var Pgb = require("pg-bluebird");
  var pgb = new Pgb();
  CONFIG.pg = "postgres://{username}:{passwd}@{ip:port}/{dbname}";
  pgb.connect(CONFIG.pg)
    .then(function(connection) {
      global.pg = connection;
    })
    .catch(function(err) {
      console.log('pg not connect');
    });
  var pg= require(CONFIG.Controllers('pg'));
}


http.createServer(function(req, res) {
  var arr = req.url.split('/');

  if (arr.length === 5 && arr[3] == 'DataInsertion') {
    //mongo.create(arr[4], res);
    //pg.create(arr[4], res);
    redisStore.set(arr[4], res);
  }
  else if (arr.length === 4 && arr[3].indexOf('SelectCurrentData') >= 0) {
    //mongo.count(req, res);
    //pg.count(req, res);
    redisStore.get(arr[4], res);
  }
  else if (arr.length === 2 && arr[1] == 'testip'){
    require('dns').lookup(require('os').hostname(), function (err, add, fam) {
      res.end(add);
    });
  }
}).listen(8080, '0.0.0.0', function() {
  console.log('listening on 8080');
});
