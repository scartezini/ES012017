const Mongoose = require('mongoose')
const Schema = Mongoose.Schema


const Table = new Schema({
	name: String,
	token: String,

	status: String
})

Table.index({
	name: 'text',
	token: 'text'
	
})



Table.set('toJSON', {
	getters: true,
	virtuals: true
})


Mongoose.model('Table',Table)


		
