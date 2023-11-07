import React, { useContext, useEffect } from 'react'
import SideMenu from '../../components/SideMenu'
import { Outlet } from 'react-router-dom'

const HomeView = () => {
	console.log("Navigated to home")
	return (
		<div className='home-view' style={{ minHeight: 400 }}>
			<div style={{ display: 'flex' }}>
				<div style={{ width: 220, height: 'calc(100vh - 60px)', paddingTop: 20, borderRight: '0.25px solid #ececec' }}>
					<SideMenu />
				</div>
				<div style={{ flex: 1, paddingTop: 24 }}>
					<Outlet />
				</div>
			</div>
		</div>
	)
}

export default HomeView
