const Mongoose = require('mongoose')
const Schema = Mongoose.Schema


const Table = new Schema({
	name: {type: String, required:true},
	token: {type: String, required:true, unique:true},
    notifications: [{type: Schema.Types.ObjectId, ref: 'Notification'}],
	status: String
})

Table.index({
	name: 'text',
	token: 'text'
	
})


Table.set('toJSON', {
	getters: true,
	virtuals: true,
})

module.exports = Mongoose.model('Table',Table)


		
