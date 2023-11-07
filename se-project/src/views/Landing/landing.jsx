import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import landingPageImg from '../../assets/landingPageImg.jpg'
import "../../App.css"
const LandingView = () => {
	const navigate = useNavigate()

	const handleTryNowClick = () => {
		navigate('/auth')
	}

	return (
		<div className="landingDiv">
				<div className="column">
					<div style={{ fontSize: 40 }}>Forget about your messy Notes!</div>
					<div style={{ fontSize: 20, color: '#7b7b7b' }}>NoteBook is a Note taking app developed for the ease of users!</div>
					<div>
						<Button
							className="notesButton"
							style={{ backgroundColor: 'var(--dark-green)', borderColor: 'var(--dark-green)'}}
							onClick={() => {
								handleTryNowClick()
							}}
						>
							Try Now!
						</Button>
					</div>
				</div>
				<div className="column img-column">
					<img src={landingPageImg} style={{ height: '100%'}} />
				</div>
		</div>
	)
}

export default LandingView
