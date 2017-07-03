const Mongoose = require('mongoose')
const Schema = Mongoose.Schema


const Notification= new Schema({
	table: {type: Schema.Types.ObjectId, ref: 'Table'},
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
	virtuals: true,
    transform: function(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
})


module.exports = Mongoose.model('Notification',Notification)
