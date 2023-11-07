let NotesModel = require('../models/Notes')
const http = require('http')

//---------------Get Notes --------------------
const handleGetNotes = function (req, res) {
	var headers = req.get("Authorization").split(";")
	var accessToken = headers[0].split("=")[1]
	var username = headers[1].split("=")[1]
	console.log('Note:get notes',accessToken, username)
	if (accessToken) {
	NotesModel.find(
		{
			username: username
		}
	).exec().then((notes) => {
		res.send({ notes: notes })
	}).catch((err)=>{
		console.log("error in handleGetNotes")
		throw new err
	})
}
}

//---------------Get Note --------------------
const handleGetNote = function (req, res) {
	NotesModel.find({}, function (err, notes) {
		res.send({ notes: notes })
	})
}

//---------------Create Note --------------------
const handleCreateNote = function (req, res) {
	var headers = req.get("Authorization").split(";")
	console.log("in handle create note:",headers)
	var accessToken = headers[0].split("=")[1]
	var username = headers[1].split("=")[1]
	let data = req.body
	console.log(username,accessToken)
	console.log('Note:Create: Request Data:', data)
	if (accessToken) {
		var new_note = new NotesModel({
			title: data.title,
			description: data.description,
			username: username
		})

		new_note.save().then((result)=>{
			console.log("result of save:",result)
			res.send({ status: 'success' })
		}).catch((err)=>{
			console.log("error in save",err)
			res.send({ status: 'error' })
		})
	}
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

	NotesModel.find({ _id: data.noteId }).deleteOne().then((delStatus) => {
		console.log("Delete status:",delStatus)
		res.send({ status: 'success' })
	}).catch((err)=>{
		console.log('Note:delete -  Error: ', err)
		res.send({ status: 'error', message: 'Error in delete' })
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

	NotesModel.findOneAndUpdate({ _id: data.noteId }, { isFavourite: data.isFavourite }, { upsert: true }).exec().then((doc) => {
		console.log('found and update response:',doc)
			res.send({ status: 'success' })
	}).catch(()=>{
		res.send({ status: 'error', message: 'Error in Update' })
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
