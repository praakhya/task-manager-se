exports.user = {
	ensureAuthenticated: function (req, res, next) {
		var authorizationHeader = req.headers['authorization'] || req.headers['Authorization']
		let accessTokenMap = authorizationHeader.split(';')[0]
		let usernameMap = authorizationHeader.split(';')[1]
		let accessToken = accessTokenMap.split('=')[1]
		let username = usernameMap.split('=')[1]

		UserModel.findOne({
			username: username
		}).exec(function (err, user) {
			if (err) {
				res.status(200).send({ status: 'error', message: 'We are facing error at the moment try later!' })
				return
			}

			if (!user) {
				res.status(401).json({
					status: 'Error',
					message: 'Un-Authorized!'
				})
				return
			}

			if (user && user.accessToken !== accessToken) {
				res.status(401).json({
					status: 'un-authorized',
					message: 'Your session has expired'
				})
				return
			}

			req.userInfo = user

			next()
		})
	}
}
