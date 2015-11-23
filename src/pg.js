var Pgb = require("pg-bluebird");
var Config = require('config');
var util = require('util');
var tableName = "data";

exports.insert = function (req, res, next) {

  var sql = util.format("INSERT INTO %s (data) VALUES ('%s')", tableName, req.params.data);
  global.db.client.query(sql)
    .then(function(result) {
      res.send(200);
    })
    .catch(function (error) {
      console.log(error);
      next(error);
    });

};

exports.select = function (req, res, next) {

  var sql = util.format("SELECT COUNT(*) FROM %s;", tableName);

  global.db.client.query(sql)
    .then(function(result) {
      var count = result.rows[0].count; 
      res.send(util.format("jsonpCallback(%s)", count));
    })
    .catch(function (error) {
      console.log(error);
      next(error);
    });
};
