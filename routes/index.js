var express = require('express');
var router = express.Router();
var CONFIG = require('config');
var pg= require(CONFIG.Controllers('pg'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/RESTful-Interface/IMISDBMS/:data', pg.insert);

router.get('/RESTful-Interface/IMISDBMS/SelectCurrentData', pg.select);

module.exports = router;
