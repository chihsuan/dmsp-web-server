// config
var CONFIG= require('config');
var db= global.db;

// models
var dataModel= require('./data');

//create
exports.create= function (req, res, next) {

	var data = new dataModel({ data: req.params.data});
  data.save(function (err) {
    if(err) return next(err);
    res.send(200);
  });
};

exports.count = function (req, res, next) {
	// find latest
	dataModel.count({}).exec()
	  .then(function(result) {
      res.send("jsonpCallback("+result+")");
	  });
};

