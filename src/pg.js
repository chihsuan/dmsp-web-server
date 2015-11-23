var Pgb = require("pg-bluebird");
var Config = require('config');
var util = require('util');
var tableName = "data";

exports.create = function (req, res, next) {

  var params = req.params ? req.params.data : req;
  var sql = util.format("INSERT INTO %s (data) VALUES ('%s')", tableName, params);
  global.pg.client.query(sql)
    .then(function(result) {
      if (!next) {
        return res.end();
      }

      res.send(200);
    })
    .catch(function (error) {
      console.log(error);
      next(error);
    });

};

exports.count = function (req, res, next) {

  var sql = util.format("SELECT COUNT(*) FROM %s;", tableName);

  global.pg.client.query(sql)
    .then(function(result) {
      var count = result.rows[0].count;
      if (!next) {
        return res.end(util.format("jsonpCallback(%s)", count));
      }
      res.send(util.format("jsonpCallback(%s)", count));
    })
    .catch(function (error) {
      console.log(error);
      next(error);
    });
};
