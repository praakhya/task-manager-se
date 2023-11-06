let mongoose = require('mongoose')

var Schema = mongoose.Schema

var UserSchema = new Schema({
	name: {
		type: String,
		default: ''
	},

	email: {
		type: String,
		default: ''
	},

	mobileNumber: {
		type: String,
		default: ''
	},

	username: {
		type: String,
		default: ''
	},

	password: {
		type: String,
		default: ''
	},

	accessToken: {
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

UserSchema.set('collection', 'users')

module.exports = mongoose.model('User', UserSchema)
