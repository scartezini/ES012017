const Mongoose = require('mongoose')
const Schema = Mongoose.Schema


const Section = new Schema({
	name: String,
	products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],

	status: String
})

Section.index({
	name: 'text'
})



Section.set('toJSON', {
	getters: true,
	virtuals: true
})


module.exports = Mongoose.model('Section',Section)
