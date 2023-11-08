import React, { useContext, useEffect } from 'react'
import SideMenu from '../../components/SideMenu'
import { Outlet } from 'react-router-dom'
const HomeView = () => {
	console.log("Navigated to home")
	return (
		<div className='home-view'>
			<div style={{ display: 'flex', flexDirection: "row", gap:"1em"}}>
					<SideMenu />
					<Outlet />
			</div>
		</div>
	)
}

export default HomeView
