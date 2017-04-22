const Mongoose = require('mongoose')
const Schema = Mongoose.Schema


const Notification= new Schema({

	table: { type: Schema.Types.ObjectId, ref: 'Table'},
	type: String,
	message: String,
	status: String
})

Notification.index({
	type: 'text',
	message: 'text',
})



Notification.set('toJSON', {
	getters: true,
	virtuals: true
})


module.exports = Mongoose.model('Notification',Notification)
