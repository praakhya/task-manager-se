import React from 'react'
import { useContext, useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import AppContext from '../contexts/AppContext'
import { BsCheck2Circle, BsList, BsStickies, BsStopwatch } from 'react-icons/bs'
import "../App.css"
import MiniDrawer from '../components/MiniDrawer'
import Dropdown from 'react-bootstrap/Dropdown'
const AppLayout = () => {
	const { userInfo, setUserInfo } = useContext(AppContext)
	const [navBar, setNavBar] = useState(false)
	const appContext = useContext(AppContext)
	console.log(userInfo)
	const navigate = useNavigate()
	const toggleNavBar = () => {
		setNavBar(!navBar)
	}
	const goToNotes = () => {
		navigate("/notes")
	}
	const goToToDo = () => {
		console.log("appContext:", appContext.userInfo)
		if (appContext.userInfo && appContext.userInfo.accessToken)
			navigate("/todo")
		else {
			navigate("/home")
		}
	}
	const goToPomodoro = () => {
		navigate("/pomodoro")
	}
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
			<div className="myNav">
				<Dropdown>
				{userInfo && userInfo.name ? <Dropdown.Toggle id="dropdown-basic" style={{ backgroundColor: "transparent", color: "var(--dark-green)", border: "none" }}>
						<BsList className="icons menu"></BsList>
					</Dropdown.Toggle> : <span></span>}

					<Dropdown.Menu>
						<Dropdown.Item href="/notes">
							<BsStickies className="icons highestElevation" onClick={goToNotes}></BsStickies>
							Notes
						</Dropdown.Item>
						<Dropdown.Item href="/todo">
							<BsCheck2Circle className="icons highestElevation" onClick={goToToDo}></BsCheck2Circle>

							To Do List
						</Dropdown.Item>
						<Dropdown.Item href="/pomodoro">
							<BsStopwatch className="icons highestElevation" onClick={goToPomodoro}></BsStopwatch>

							Pomodoro
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
				<div className='appLogo'>
					<span style={{ color: 'var(--dark-green)' }}>
						Ze
					</span>
					<span style={{ color: 'var(--sage)' }}>
						Me
					</span>
				</div>
				<div style={{ display: "flex", gap: "1em" }}>
					<div>
						{userInfo && userInfo.name ? (
							<span>
								<span>Welcome {userInfo.name}</span>
								<span></span>
							</span>
						) : null}
					</div>
					<div>
						{userInfo && userInfo.name ? (
							<span onClick={handleLogoutClick}>
								<span>Logout</span>
							</span>
						) : (
							<span onClick={handleLoginClick}>
								<span>Login</span>
							</span>
						)}
					</div>
				</div>
			</div>
			{/* <Navbar className='app-nav-bar' style={{ paddingTop: 0, paddingBottom: 0, margin: "none", width:"100vw" }}>
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
			</Navbar> */}


			<div className='app-content container'>
				<Outlet />
			</div>
		</div>
	)
}

export default AppLayout
