var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');

var Controllers= function (filePath) {
  return path.normalize(rootPath+'/src/'+filePath);
};


module.exports= {
  //port
  port: 3000,
	mongo: 'mongodb://localhost/dmsp',
  pg: process.env.PG_PATH,
  hive: {
    version: '0.7.1-cdh3u2',
    server: '',
    port: 22,
    timeout: 1000
  },

  //path
  rootPath: rootPath,
  Controllers: Controllers
};

