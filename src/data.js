var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dataSchema= new Schema({
	data: String
}, { strict: false });
//console.log(global);

module.exports= global.mongo.model('data', dataSchema);
