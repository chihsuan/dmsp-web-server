var key = 'data';
var count = 1;

exports.set = function(req, res, next) {
  return global.redis.setAsync(key, count).then(function() {
    console.log('update');
    count += 1;
    res.end();
  });
};

exports.get = function(req, res, next) {

  return global.redis.getAsync(key).then(function(result) {
    res.end("jsonpCallback("+result+")");
  });
};
