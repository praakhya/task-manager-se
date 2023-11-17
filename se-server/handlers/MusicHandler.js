let MusicModel = require('../Models/Music')
const http = require('http')

const handleGetMusicList = function (req, res) {
	var headers = req.get("Authorization").split(";")
	var accessToken = headers[0].split("=")[1]
	var username = headers[1].split("=")[1]
	console.log('Music:get music',accessToken, username)
	if (accessToken) {
	MusicModel.find(
		{
			username: username
		}
	).exec().then((musiclist) => {
		res.send({ music: musiclist })
	}).catch((err)=>{
		console.log("error in handleGetMusic")
		throw new Error(err)
	})
}
}

const handleGetMusic = function (req, res) {
	MusicModel.find({}, function (err, music) {
		res.send({ music: music })
	})
}

const handleCreateMusic = function (req, res) {
	var headers = req.get("Authorization").split(";")
	console.log("in handle create music:",headers)
	var accessToken = headers[0].split("=")[1]
	var username = headers[1].split("=")[1]
	let data = req.body
	console.log(username,accessToken)
	console.log('Music:Create: Request Data:', data)
	if (accessToken) {
		var new_music = new MusicModel({
			url: data.url,
			username: username
		})

		new_music.save().then((result)=>{
			console.log("result of save:",result)
			res.send(new_music)
		}).catch((err)=>{
			console.log("error in save",err)
			res.send({ status: 'error' })
		})
	}
}

const handleDeleteMusic = function (req, res) {
	let data = req.params
	console.log('Music:delete: Request Data:', JSON.stringify(data))


	MusicModel.find({ _id: data._id }).deleteOne().then((delStatus) => {
		console.log("Delete status:",delStatus)
		res.send({ status: 'success' })
	}).catch((err)=>{
		console.log('Music:delete -  Error: ', err)
		res.send({ status: 'error', message: 'Error in delete' })
	})
}


module.exports = {
	handleGetMusicList,
	handleCreateMusic,
	handleDeleteMusic
}
