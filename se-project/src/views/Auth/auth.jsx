import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import AppContext from '../../contexts/AppContext'
import "../../App.css"
const LoginView = () => {
	const appContext = useContext(AppContext)
	const [authType, setAuthType] = useState('login') //login | signup

	const [lUserName, setLUserName] = useState('')
	const [lPassword, setLPassword] = useState('')

	const [sName, setSName] = useState('')
	const [sMobileNumber, setSMobileNumber] = useState('')
	const [sEmail, setSEmail] = useState('')
	const [sUserName, setSUserName] = useState('')
	const [sPassword, setSPassword] = useState('')

	const [loginError, setLoginError] = useState(false)
	const [loginErrorMessage, setLoginErrorMessage] = useState('Please fill the fields!')
	const [signupError, setSignupError] = useState(false)
	const [signupErrorMessage, setSignupErrorMessage] = useState('Please fill the fields!')

	const navigate = useNavigate()

	const handleSignUpBtnClick = (e) => {
		if (!sName || !sMobileNumber || !sEmail || !sUserName || !sPassword) {
			setSignupError(true)
			return
		} else {
			setSignupError(false)
		}
		axios
			.post('/api/signup', {
				name: sName,
				mobileNumber: sMobileNumber,
				email: sEmail,
				username: sUserName,
				password: sPassword
			})
			.then((response) => {
				if (response && response.data) {
					if (response.data.status == 'error') {
						console.log("received:",response)
						setLoginErrorMessage(response.data.message ? response.data.message : 'Error in signup!')
						setLoginError(true)
						return
					}
					setSignupError(false)
					appContext.setUserInfo(response.data.userInfo)
					navigate('/home')
				}
			})
			.catch((error) => {
				console.log("error in signup:",error)
				setSignupErrorMessage('Error in user Registration! Please contact Admin for more Info!')
				setSignupError(true)
			})
	}

	const handleLoginBtnClick = (e) => {
		console.log("lusername, lpassword", lUserName, lPassword)
		if (!lUserName || !lPassword) {
			setLoginErrorMessage('Please fill the required fields!')
			setLoginError(true)
			return
		} else {
			setLoginError(false)
		}

		axios
			.post('/api/login', {
				username: lUserName,
				password: lPassword
			})
			.then((response) => {
				console.log("Repsonse in post /api/login:",response)
				if (response && response.data) {
					if (response.data.status == 'error') {
						setLoginErrorMessage(response.data.message ? response.data.message : 'Error in login!')
						setLoginError(true)
						return
					}
					setLoginError(false)
					appContext.setUserInfo(response.data.userInfo)
					sessionStorage.setItem('userInfo', JSON.stringify(response.data.userInfo))
					console.log("User info after setting in client:",appContext.userInfo)
					navigate('/notes')
					
				}
			})
			.catch((error, res) => {
				console.log("error in login client:",error)
				setLoginErrorMessage('Error in user login!')
				setLoginError(true)
				//appContext.setUserInfo({ name: 'Pranathi' })
				//navigate('/notes')
			})
	}

	return (
		<>
			<div className='auth-view'>
				<div className='auth-form-wrap'>
					{authType == 'login' ? (
						<div>
							<div style={{ fontSize: 28, marginBottom: 20 }}>Sign In</div>
							{loginError && <label style={{ color: 'red' }}>{loginErrorMessage}</label>}
							<Form>
								<Form.Group className='mb-3 inputField'>
									<Form.Label>Username</Form.Label>
									<Form.Control
										type='text'
										placeholder='Enter username'
										value={lUserName ? lUserName : ''}
										onChange={(e) => {
											setLUserName(e.target.value)
										}}
									/>
								</Form.Group>

								<Form.Group className='mb-3 inputField'>
									<Form.Label>Password</Form.Label>
									<Form.Control
										type='password'
										placeholder='Password'
										value={lPassword ? lPassword : ''}
										onChange={(e) => {
											setLPassword(e.target.value)
										}}
									/>
								</Form.Group>
								<Button variant='primary' type='button' onClick={handleLoginBtnClick} style={{ backgroundColor: "var(--dark-green)", borderColor: "var(--dark-green)"}} className='notesButton'>
									Submit
								</Button>
							</Form>
							<div style={{ marginTop: 12 }}>
								Not yet Registered?{'  '}
								<span
									onClick={(e) => {
										setAuthType('signup')
									}}
									style={{cursor: 'pointer'}}
									className='notesLink'
								>
									Create New Account
								</span>
							</div>
						</div>
					) : (
						<div>
							<div style={{ fontSize: 28, marginBottom: 20 }}>Registration</div>
							{signupError && <label style={{ color: 'red' }}>{signupErrorMessage}</label>}
							<Form>
								<Form.Group className='mb-3 inputField'>
									<Form.Label>Name</Form.Label>
									<Form.Control
										type='text'
										placeholder='Enter name'
										value={sName ? sName : ''}
										onChange={(e) => {
											setSName(e.target.value)
										}}
									/>
								</Form.Group>

								<Form.Group className='mb-3 inputField'>
									<Form.Label>Email address</Form.Label>
									<Form.Control
										type='email'
										placeholder='Enter email'
										value={sEmail ? sEmail : ''}
										onChange={(e) => {
											setSEmail(e.target.value)
										}}
									/>
								</Form.Group>

								<Form.Group className='mb-3 inputField'>
									<Form.Label>Mobile Number</Form.Label>
									<Form.Control
										type='text'
										placeholder='Enter mobile number'
										value={sMobileNumber ? sMobileNumber : ''}
										onChange={(e) => {
											setSMobileNumber(e.target.value)
										}}
									/>
								</Form.Group>

								<Form.Group className='mb-3 inputField'>
									<Form.Label>Username</Form.Label>
									<Form.Control
										type='text'
										placeholder='Username'
										value={sUserName ? sUserName : ''}
										onChange={(e) => {
											setSUserName(e.target.value)
										}}
									/>
								</Form.Group>

								<Form.Group className='mb-3 inputField'>
									<Form.Label>Password</Form.Label>
									<Form.Control
										type='password'
										placeholder='Password'
										value={sPassword ? sPassword : ''}
										onChange={(e) => {
											setSPassword(e.target.value)
										}}
									/>
								</Form.Group>

								<Button variant='primary' type='button' onClick={handleSignUpBtnClick} style={{ backgroundColor: "var(--dark-green)", borderColor: "var(--dark-green)", width: 180 }}>
									Submit
								</Button>
							</Form>
							<span>
								Already Registered?
								<Button
									variant='link'
									type='button'
									style={{ textDecoration: 'none', color: "var(--sage)" }}
									onClick={(e) => {
										setAuthType('login')
									}}
								>
									Login
								</Button>
							</span>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default LoginView
