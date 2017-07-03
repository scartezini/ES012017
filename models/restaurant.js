var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Restaurant = new Schema({
    email: String,
    password: String
});


module.exports = mongoose.model('Restaurant', Restaurant);
