// config
var CONFIG= require('config');
var db= global.db;

// models
var dataModel= require('./data');

//create
exports.create= function (req, res, next) {
  var params = req.params ? req.params.data : req;
	var data = new dataModel({ data: params});

  data.save(function (err) {
    if (err) {
      console.log('Mongodb: Error', err);
    }

    if (!next) {
      return res.end();
    }

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

