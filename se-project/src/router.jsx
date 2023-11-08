import React from 'react'

import { Routes, Route } from 'react-router-dom'
import Pomodoro from "./components/Pomodoro/Pomodoro"
import ToDo from './components/ToDoList/ToDo'
import MiniDrawer from './components/MiniDrawer'
import UserHome from './UserHome'

const LandingView = React.lazy(() => import('./views/Landing/landing'))
const AuthView = React.lazy(() => import('./views/Auth/auth'))
const HomeView = React.lazy(() => import('./views/Home/home'))
const AllNotesView = React.lazy(() => import('./views/Home/partials/AllNotes'))
const FavouriteNotesView = React.lazy(() => import('./views/Home/partials/FavouriteNotes'))
const DeletedNotesView = React.lazy(() => import('./views/Home/partials/DeletedNotes'))
const NotFoundView = React.lazy(() => import('./views/NotFound/notFound'))

const AppLayout = React.lazy(() => import('./layouts/AppLayout'))

const AppRouter = () => {
	return (
		<Routes>
			<Route path='/' element={<AppLayout />}>
				<Route index element={<LandingView />} />
				<Route path='/auth' element={<AuthView />} />
				<Route path='/home' element={<MiniDrawer/>} />
					<Route index element={<UserHome/>}/>
					<Route path='/notes' element={<HomeView />}>
						<Route index element={<AllNotesView />} />
						<Route path='fav' element={<FavouriteNotesView />} />
						<Route path='deleted' element={<DeletedNotesView />} />
					</Route>
					<Route path='/pomodoro' element={<Pomodoro></Pomodoro>}/>
					<Route path='/todo' element={<ToDo/>}/>
				<Route path='*' element={<NotFoundView />} />
			</Route>
		</Routes>
	)
}

export default AppRouter
