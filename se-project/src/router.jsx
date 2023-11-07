import React from 'react'

import { Routes, Route } from 'react-router-dom'
import Pomodoro from './Pomodoro/Pomodoro'

const LandingView = React.lazy(() => import('./Notes/views/Landing/landing'))
const AuthView = React.lazy(() => import('./Notes/views/Auth/auth'))
const HomeView = React.lazy(() => import('./Notes/views/Home/home'))
const AllNotesView = React.lazy(() => import('./Notes/views/Home/partials/AllNotes'))
const FavouriteNotesView = React.lazy(() => import('./Notes/views/Home/partials/FavouriteNotes'))
const DeletedNotesView = React.lazy(() => import('./Notes/views/Home/partials/DeletedNotes'))
const NotFoundView = React.lazy(() => import('./Notes/views/NotFound/notFound'))

const AppLayout = React.lazy(() => import('./Notes/layouts/AppLayout'))

const AppRouter = () => {
	return (
		<Routes>
			<Route path='/' element={<AppLayout />}>
				<Route index element={<LandingView />} />
				<Route path='/auth' element={<AuthView />} />
				<Route path='/notes' element={<HomeView />}>
					<Route index element={<AllNotesView />} />
					<Route path='fav' element={<FavouriteNotesView />} />
					<Route path='deleted' element={<DeletedNotesView />} />
				</Route>
				<Route path='/pomodoro' element={<Pomodoro></Pomodoro>}/>
				<Route path='*' element={<NotFoundView />} />
			</Route>
		</Routes>
	)
}

export default AppRouter
