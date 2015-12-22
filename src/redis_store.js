var key = 'data';

exports.set = function(req, res, next) {
  return global.redis.getAsync(key).then(function(result) {
    var count = parseInt(result) + 1;
    return global.redis.setAsync(key, count);
  }).then(function() {
    console.log('update');
    res.end();
  }).catch(function(error) {
    console.log(error);
    res.end();
  });
};

exports.get = function(req, res, next) {

  return global.redis.getAsync(key).then(function(result) {
    res.end("jsonpCallback("+result+")");
  });
};
