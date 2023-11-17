let mongoose = require('mongoose')

var Schema = mongoose.Schema

var MusicSchema = new Schema({
	url: {
		type: String,
		default: ''
	},

	username: {
		type: String,
		default: ''
	}
})

MusicSchema.set('collection', 'music')

module.exports = mongoose.model('music', MusicSchema)
