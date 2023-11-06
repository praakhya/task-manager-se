let mongoose = require('mongoose')

var Schema = mongoose.Schema

var NoteSchema = new Schema({
	title: {
		type: String,
		default: ''
	},

	description: {
		type: String,
		default: ''
	},

	isFavourite: {
		type: Boolean,
		default: false
	},

	username: {
		type: String,
		default: ''
	},

	createdAt: {
		type: Date,
		default: Date.now
	},

	updatedAt: {
		type: Date,
		default: Date.now
	}
})

NoteSchema.set('collection', 'notes')

module.exports = mongoose.model('note', NoteSchema)
