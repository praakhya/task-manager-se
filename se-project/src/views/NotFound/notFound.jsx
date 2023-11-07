import React from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const NotFoundView = () => {
	const navigate = useNavigate()

	return (
		<div style={{ marginTop: 32 }}>
			<h3>404 Not Found</h3>
			<hr style={{ margin: '12px 0px' }} />
			<NavLink to={'/'}>Home</NavLink>
		</div>
	)
}

export default NotFoundView
