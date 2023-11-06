let NotesModel = require('../models/Notes')

//---------------Get Notes --------------------
const handleGetNotes = function (req, res) {
	console.log('Note:get notes',req.body)
	NotesModel.find(
		{
			username: req.userInfo.username
		},
		function (err, notes) {
			res.send({ notes: notes })
		}
	)
}

//---------------Get Note --------------------
const handleGetNote = function (req, res) {
	NotesModel.find({}, function (err, notes) {
		res.send({ notes: notes })
	})
}

//---------------Create Note --------------------
const handleCreateNote = function (req, res) {
	let data = req.body
	console.log('Note:Create: Request Data:', JSON.stringify(data))

	var new_note = new NotesModel({
		title: data.title,
		description: data.description,
		username: req.userInfo.username
	})

	new_note.save(function (err, result) {
		if (err) {
			res.send({ status: 'error' })
		} else {
			res.send({ status: 'success' })
		}
	})
}

//---------------Update Note --------------------
const handleUpdateNote = async (req, res) => {
	let data = req.body
	console.log('Note:update: Request Data:', JSON.stringify(data))

	if (!data.noteId) {
		res.send({ status: 'error', message: 'Note Id is required!' })
		return
	}

	NotesModel.findOneAndUpdate({ _id: data.noteId }, { title: data.title, description: data.description }, { upsert: true }, (err, doc) => {
		if (err) {
			console.log('Note:Update -  Error: ', err)
			res.send({ status: 'error', message: 'Error in Update' })
			return
		}
		res.send({ status: 'success' })
	})
}

//---------------Delete Note --------------------
const handleDeleteNote = function (req, res) {
	let data = req.params
	console.log('Note:delete: Request Data:', JSON.stringify(data))

	if (!data.noteId) {
		res.send({ status: 'error', message: 'Note Id is required!' })
		return
	}

	NotesModel.find({ _id: data.noteId }).deleteOne((err) => {
		if (err) {
			console.log('Note:delete -  Error: ', err)
			res.send({ status: 'error', message: 'Error in delete' })
			return
		}
		res.send({ status: 'success' })
	})
}

//---------------Mark As Favourite --------------------
const handleMarkAsFavourite = (req, res) => {
	console.log('Note:Mark as Favourite: Request Data:', JSON.stringify(req.body))

	let data = req.body

	if (!data.noteId) {
		res.send({ status: 'error', message: 'Note Id is required!' })
		return
	}

	NotesModel.findOneAndUpdate({ _id: data.noteId }, { isFavourite: data.isFavourite }, { upsert: true }, (err, doc) => {
		if (err) {
			console.log('Note:Update -  Error: ', err)
			res.send({ status: 'error', message: 'Error in Update' })
			return
		}
		res.send({ status: 'success' })
	})
}

module.exports = {
	handleGetNotes,
	handleGetNote,
	handleCreateNote,
	handleUpdateNote,
	handleDeleteNote,
	handleMarkAsFavourite
}
