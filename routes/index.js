var express = require('express');
var router = express.Router();
var CONFIG = require('config');
var pg= require(CONFIG.Controllers('pg'));
var mongo= require(CONFIG.Controllers('mongo'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/RESTful-Interface/IMISDBMS/DataInsertion/:data', mongo.create)
      .get('/RESTful-Interface/IMISDBMS/DataInsertion/:data', mongo.create);

router.get('/RESTful-Interface/IMISDBMS/SelectCurrentData', mongo.count);


module.exports = router;
