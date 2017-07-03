var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Restaurant = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: String,
    address: String,
    number: String,
    cnpj: String,
    website: String,
    tables: [{type: Schema.Types.ObjectId, ref: 'Table'}],
    menu: {type: Schema.Types.ObjectId, ref: 'Menu'},
});


module.exports = mongoose.model('Restaurant', Restaurant);
