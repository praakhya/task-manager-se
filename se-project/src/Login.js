import React, { Suspense, useState } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './router.jsx'

import AppContext from './contexts/AppContext.js'
function Notes() {
	const _storedUserInfo = sessionStorage.getItem('userInfo')
	const [userInfo, setUserInfo] = useState((_storedUserInfo == null || _storedUserInfo == undefined) ? null : JSON.parse(_storedUserInfo))
	console.log("stored user info:",_storedUserInfo)

	const handleSetUserInfo = (_userInfo) => {
		sessionStorage.setItem('userInfo', JSON.stringify(_userInfo))
		setUserInfo(_userInfo)
	}

	const contextValue = {
		userInfo: userInfo,
		setUserInfo: handleSetUserInfo
	}
	return (
		<div className='app'>
			<AppContext.Provider value={contextValue}>
				<Suspense fallback={<div></div>}>
					<BrowserRouter>
						<AppRouter />						
					</BrowserRouter>
				</Suspense>
			</AppContext.Provider>
		</div>
	)
}

export default Notes
