import React from 'react'
import { useContext } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import AppContext from '../contexts/AppContext'
import "../App.css"
import MiniDrawer from '../MiniDrawer'
const AppLayout = () => {
	const { userInfo, setUserInfo } = useContext(AppContext)
	console.log(userInfo)
	const navigate = useNavigate()

	const handleLogoutClick = (e) => {
		setUserInfo(null)
		sessionStorage.clear()
		navigate('/')
	}

	const handleLoginClick = (e) => {
		navigate('/auth')
	}

	return (
		<div className="appDiv">
			<Navbar className='app-nav-bar' style={{ paddingTop: 0, paddingBottom: 0, margin: "none", width:"100vw" }}>
				<Container style={{ background: 'white' }}>
					<Navbar.Brand href='/'>
						<span style={{ fontSize: 24, fontWeight: 'bold', color: 'var(--sage)' }}>
							Ze<span style={{ color: 'var(--dark-green)' }}>Me</span>
						</span>
					</Navbar.Brand>
					<Navbar.Toggle />
					<Navbar.Collapse className='justify-content-end'>
						{userInfo && userInfo.name ? (
							<Navbar.Text style={{ marginRight: 24 }}>
								<span style={{ color: '#7b7b7b' }}>Welcome {userInfo.name}</span>
								<span style={{ borderRight: '1px solid #7b7b7b', marginLeft: 24, color: '#7b7b7b' }}></span>
							</Navbar.Text>
						) : null}

						<Navbar.Text style={{ marginRight: 24 }}>
							<span style={{ cursor: 'pointer', color: '#7b7b7b' }}>About</span>
						</Navbar.Text>
						{userInfo && userInfo.name ? (
							<Navbar.Text onClick={handleLogoutClick}>
								<span style={{ cursor: 'pointer', color: '#7b7b7b' }}>Logout</span>
							</Navbar.Text>
						) : (
							<Navbar.Text onClick={handleLoginClick}>
								<span style={{ cursor: 'pointer', color: '#7b7b7b' }}>Login</span>
							</Navbar.Text>
						)}
					</Navbar.Collapse>
				</Container>
			</Navbar>

			{userInfo && userInfo.accessToken ? <MiniDrawer></MiniDrawer>: <div></div>}
			<div className='app-content container'>
				<Outlet />
			</div>
		</div>
	)
}

export default AppLayout
