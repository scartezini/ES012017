var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Restaurant = new Schema({
    email: String,
    password: String
});

Restaurant.plugin(passportLocalMongoose);

module.exports = mongoose.model('Restaurant', Restaurant);