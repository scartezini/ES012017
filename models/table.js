const Mongoose = require('mongoose')
const Schema = Mongoose.Schema


const Table = new Schema({
	name: {type: String, required:true, unique:true},
	token: {type: String, required:true, unique:true},
	status: String
})

Table.index({
	name: 'text',
	token: 'text'
	
})


Table.set('toJSON', {
	getters: true,
	virtuals: true,
    transform: function(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
})




module.exports = Mongoose.model('Table',Table)


		
