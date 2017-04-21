const Mongoose = require('mongoose')
const Schema = Mongoose.Schema


const Notification= new Schema({

	table: { type: Schema.Types.ObjectId, ref: 'Table' },
	type: String,
	message: String,
	checked:Boolean,
	status: String
})

Notification.index({
	type: 'text',
	message: 'text',
	checked: 'text'		
})



Notification.set('toJSON', {
	getters: true,
	virtuals: true
})


Mongoose.model('Notification',Notification)
