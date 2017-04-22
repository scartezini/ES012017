const Mongoose = require('mongoose')
const Schema = Mongoose.Schema


const Menu = new Schema({
	name: String,
	sections: [{ type: Schema.Types.ObjectId, ref: 'Section' }],

	status: String
})

Menu.index({
	name: 'text'
})



Menu.set('toJSON', {
	getters: true,
	virtuals: true
})


 module.exports = Mongoose.model('Menu',Menu)
