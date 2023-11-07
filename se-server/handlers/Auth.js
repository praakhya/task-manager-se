let mongoose = require('mongoose')
const UserModel = require('./../models/User')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const User = require('./../models/User')

const handleLogin = async (req, res) => {
	let data = req.body
	console.log("req at login:",req.body)
	var user = await User.findOne({ username: data.username }).exec()
	console.log("user in login:",user)
	if (!user) {
		res.send({ status: 'error', message: "User id doesn't exist" })
		return
	}

	const validPassword = await bcrypt.compare(req.body.password, user.password)
	console.log("validPassword in login:",validPassword)
	if (!validPassword) {
		res.send({ status: 'error', message: "Password doesn't match" })
		return
	}

	let accessToken = crypto.randomBytes(16).toString('hex')
	console.log("accessToken in login:",accessToken)
	updateStatus = await User.updateOne({ username: data.username }, { accessToken: accessToken }, { upsert: true }).exec()
	console.log("in callback:",updateStatus)
	user = await User.findOne({ username: data.username }).exec().then(
	res.send({ status: 'success', userInfo: { name: user.name, username: data.username, accessToken: accessToken, email: user.email, mobileNumber: user.mobileNumber } })
	).catch((err)=>{
		if (err) {
			res.send({ status: 'error', message: 'Error in Update' })
			return
		}
	})
}

const handleSignup = async (req, res) => {
	let data = req.body
	console.log("req in server signup:",req)
	const emailExists = await User.findOne({ email: data.email })
	if (emailExists) {
		res.send({ status: 'error', message: 'Email Name exists' })
		return
	}

	const usernameExists = await User.findOne({ username: data.username })
	if (usernameExists) {
		res.send({ status: 'error', message: 'User Name exists' })
		return
	}
	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(req.body.password, salt)

	let accessToken = crypto.randomBytes(16).toString('hex')

	var new_user = new UserModel({
		name: data.name,
		email: data.email,
		mobileNumber: data.mobileNumber,
		username: data.username,
		password: hashedPassword,
		accessToken: accessToken
	})

	new_user_save_result = await new_user.save().then(saved => {
		console.log("Saved user in signup:", saved)
		res.send({ status: 'success', userInfo: { name: data.name, username: data.username, accessToken: accessToken, email: data.email, mobileNumber: data.mobileNumber } })
	}).catch(err => {
		console.log("User could not be saved: ",err)
	})
	
}

const handleLogout = function (req, res) {
	res.send({})
}

const handleGetUsers = function (req, res) {
	UserModel.find({}, function (err, users) {
		res.send({ users: users })
	})
}

module.exports = {
	handleLogin,
	handleSignup,
	handleLogout,
	handleGetUsers
}
