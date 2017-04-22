const Mongoose = require('mongoose')
const Schema = Mongoose.Schema


const Product= new Schema({
	name: String,
	description:String,
	price:Number,

	status: String
})

Product.index({
	name: 'text',
	description: 'text',
	price: 'text'		
})



Product.set('toJSON', {
	getters: true,
	virtuals: true
})


module.exports = Mongoose.model('Product',Product)
